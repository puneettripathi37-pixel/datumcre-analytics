import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema } from "@/lib/contact-schema";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Simple in-memory rate limiter.
 *
 * This is adequate for a single-instance deployment and for local development.
 * On a multi-instance or serverless host, replace with a shared store
 * (Redis, Upstash, a database table, or the platform's edge rate limiting).
 */
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 500) {
    for (const [entryKey, times] of hits) {
      if (times.every((time) => now - time > WINDOW_MS)) hits.delete(entryKey);
    }
  }

  return recent.length > MAX_REQUESTS;
}

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function buildReference() {
  const date = new Date();
  const stamp = `${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(2, "0")}${String(
    date.getUTCDate(),
  ).padStart(2, "0")}`;
  const suffix = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `DCR-${stamp}-${suffix}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function redactEmail(email: string) {
  const [name, domain] = email.split("@");
  if (!domain) return "[invalid]";
  return `${name.slice(0, 2)}***@${domain}`;
}

function smtpConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASSWORD &&
      process.env.CONTACT_TO_EMAIL,
  );
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") ?? "0");
    if (contentLength > 32_000) {
      return NextResponse.json(
        { ok: false, message: "The submitted enquiry is too large." },
        { status: 413 },
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, message: "Invalid request format." },
        { status: 400 },
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, message: "Invalid request format." },
        { status: 400 },
      );
    }

    const candidate = body as Record<string, unknown>;

    // 1. Honeypot. Bots fill hidden fields; accept silently so they do not retry.
    if (typeof candidate.companyWebsite === "string" && candidate.companyWebsite.trim() !== "") {
      return NextResponse.json({ ok: true, reference: buildReference() });
    }

    // 2. Timing check. A genuine human cannot complete the form instantly.
    const startedAt = Number(candidate.startedAt);
    if (Number.isFinite(startedAt) && Date.now() - startedAt < 2500) {
      return NextResponse.json(
        {
          ok: false,
          message: "Please take a moment to complete the form before submitting.",
        },
        { status: 400 },
      );
    }

    // 3. Rate limit.
    if (isRateLimited(clientKey(request))) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Too many submissions from this connection. Please wait a few minutes and try again.",
        },
        { status: 429 },
      );
    }

    // 4. Server-side validation using the same schema as the client.
    const parsed = contactSchema.safeParse(candidate);
    if (!parsed.success) {
      const fields: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "");
        if (key && !fields[key]) fields[key] = issue.message;
      }
      return NextResponse.json(
        {
          ok: false,
          message: "Please review the highlighted fields and submit again.",
          fields,
        },
        { status: 422 },
      );
    }

    const data = parsed.data;
    const reference = buildReference();

    const lines = [
      `Reference:        ${reference}`,
      `Full name:        ${data.fullName}`,
      `Business email:   ${data.businessEmail}`,
      `Company:          ${data.companyName}`,
      `Job title:        ${data.jobTitle}`,
      `Service required: ${data.service}`,
      `Property type:    ${data.propertyType}`,
      "",
      "Requirements:",
      data.requirements,
      "",
      `Submitted: ${new Date().toISOString()}`,
    ];

    if (!smtpConfigured()) {
      // Structured integration point: no credentials configured, so the enquiry
      // is validated and logged in redacted form instead of being emailed.
      // See README → "Contact form configuration".
      console.warn(
        "[contact] SMTP is not configured — enquiry validated but not delivered.\n" +
          lines.join("\n").replace(data.businessEmail, redactEmail(data.businessEmail)),
      );

      return NextResponse.json({
        ok: true,
        reference,
        delivered: false,
        message:
          "Your enquiry has been received. Email delivery is not configured on this environment; see the deployment notes.",
      });
    }

    const port = Number(process.env.SMTP_PORT ?? 587);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: process.env.SMTP_SECURE === "true" || port === 465,
      auth: {
        user: process.env.SMTP_USER as string,
        pass: process.env.SMTP_PASSWORD as string,
      },
      tls: { minVersion: "TLSv1.2" },
    });

    const to = process.env.CONTACT_TO_EMAIL as string;
    const from = process.env.CONTACT_FROM_EMAIL || (process.env.SMTP_USER as string);
    const replyTo = process.env.CONTACT_REPLY_TO_EMAIL || data.businessEmail;

    const html = `
      <div style="font-family:Inter,Arial,sans-serif;color:#172B3A;line-height:1.6">
        <h2 style="font-family:Montserrat,Arial,sans-serif;color:#1D3F5A;margin:0 0 4px">New website enquiry</h2>
        <p style="margin:0 0 20px;color:#4C6170;font-size:13px">Reference ${escapeHtml(reference)}</p>
        <table style="border-collapse:collapse;font-size:13px">
          ${[
            ["Full name", data.fullName],
            ["Business email", data.businessEmail],
            ["Company", data.companyName],
            ["Job title", data.jobTitle],
            ["Service required", data.service],
            ["Property type", data.propertyType],
          ]
            .map(
              ([label, value]) =>
                `<tr><td style="padding:6px 16px 6px 0;color:#4C6170;vertical-align:top">${escapeHtml(
                  label,
                )}</td><td style="padding:6px 0;font-weight:500">${escapeHtml(value)}</td></tr>`,
            )
            .join("")}
        </table>
        <h3 style="font-family:Montserrat,Arial,sans-serif;color:#1D3F5A;font-size:14px;margin:24px 0 8px">Requirements</h3>
        <p style="font-size:13px;white-space:pre-wrap;margin:0">${escapeHtml(data.requirements)}</p>
        <hr style="border:none;border-top:1px solid #DDE5E9;margin:24px 0" />
        <p style="font-size:11px;color:#6B7C88;margin:0">
          Submitted ${escapeHtml(new Date().toUTCString())} via ${escapeHtml(siteConfig.url)}.
          Reply directly to this email to respond to the enquirer.
        </p>
      </div>
    `;

    await transporter.sendMail({
      to,
      from,
      replyTo,
      subject: `Website enquiry — ${data.companyName} — ${data.service}`,
      text: lines.join("\n"),
      html,
    });

    return NextResponse.json({ ok: true, reference, delivered: true });
  } catch (error) {
    console.error("[contact] Unhandled submission error", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "We could not process your enquiry due to a server error. Please try again shortly.",
      },
      { status: 500 },
    );
  }
}

export function GET() {
  return NextResponse.json(
    { ok: false, message: "Method not allowed." },
    { status: 405, headers: { Allow: "POST" } },
  );
}
