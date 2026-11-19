"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, CircleX, LoaderCircle } from "lucide-react";
import { contactSchema } from "@/lib/contact-schema";
import {
  investmentStageOptions,
  serviceOptions,
  siteConfig,
  timelineOptions,
} from "@/lib/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

interface FormState {
  fullName: string;
  businessEmail: string;
  companyName: string;
  jobTitle: string;
  service: string;
  investmentStage: string;
  units: string;
  market: string;
  requirements: string;
  timeline: string;
  consent: boolean;
  companyWebsite: string;
}

const initialState: FormState = {
  fullName: "",
  businessEmail: "",
  companyName: "",
  jobTitle: "",
  service: "",
  investmentStage: "",
  units: "",
  market: "",
  requirements: "",
  timeline: "",
  consent: false,
  companyWebsite: "",
};

const fieldOrder = [
  "fullName",
  "businessEmail",
  "companyName",
  "jobTitle",
  "service",
  "investmentStage",
  "units",
  "market",
  "requirements",
  "timeline",
  "consent",
] as const;

type FieldName = (typeof fieldOrder)[number];

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string>("");
  const [reference, setReference] = useState<string>("");
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);

  // Record the render time on mount; used by the API route's timing check.
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  /** Assemble the exact payload submitted to the API and validated locally. */
  function createPayload() {
    return {
      fullName: values.fullName,
      businessEmail: values.businessEmail,
      companyName: values.companyName,
      jobTitle: values.jobTitle,
      service: values.service,
      investmentStage: values.investmentStage,
      units: values.units,
      market: values.market,
      requirements: values.requirements,
      timeline: values.timeline,
      consent: values.consent,
      companyWebsite: values.companyWebsite,
      startedAt: startedAt.current,
    };
  }

  function validateField(name: FieldName) {
    const result = contactSchema.safeParse(createPayload());
    if (result.success) {
      setErrors((current) => ({ ...current, [name]: undefined }));
      return true;
    }
    const issue = result.error.issues.find((item) => item.path[0] === name);
    setErrors((current) => ({ ...current, [name]: issue?.message }));
    return !issue;
  }

  function handleBlur(name: FieldName) {
    setTouched((current) => ({ ...current, [name]: true }));
    validateField(name);
  }

  function updateValue<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    if (touched[key as FieldName]) {
      setErrors((current) => ({ ...current, [key as FieldName]: undefined }));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerMessage("");

    const submission = createPayload();
    const result = contactSchema.safeParse(submission);
    if (!result.success) {
      const next: Partial<Record<FieldName, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as FieldName;
        if (fieldOrder.includes(key) && !next[key]) {
          next[key] = issue.message;
        }
      }
      setErrors(next);
      setTouched(
        fieldOrder.reduce<Partial<Record<FieldName, boolean>>>((acc, name) => {
          acc[name] = true;
          return acc;
        }, {}),
      );
      setStatus("error");
      setServerMessage("Please review the highlighted fields and submit again.");

      const firstInvalid = fieldOrder.find((name) => next[name]);
      if (firstInvalid) {
        const element = formRef.current?.querySelector<HTMLElement>(
          `[name="${firstInvalid}"]`,
        );
        element?.focus();
      }
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });

      const data = (await response.json().catch(() => null)) as
        | {
            ok?: boolean;
            message?: string;
            reference?: string;
            delivered?: boolean;
            fields?: Record<string, string>;
          }
        | null;

      if (!response.ok || !data?.ok || data.delivered !== true) {
        if (data?.fields) {
          setErrors(data.fields as Partial<Record<FieldName, string>>);
        }
        setStatus("error");
        setServerMessage(
          data?.message ??
            (siteConfig.contactEmailConfigured
              ? "We could not submit your enquiry. Please try again, or email us directly."
              : "We could not submit your enquiry. Please try again shortly."),
        );
        return;
      }

      setStatus("success");
      setReference(data.reference ?? "");
      setValues(initialState);
      setErrors({});
      setTouched({});
      startedAt.current = Date.now();
    } catch {
      setStatus("error");
      setServerMessage(
        "A network error prevented submission. Please check your connection and try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="border border-line bg-white p-8 md:p-10">
        <span className="flex size-11 items-center justify-center border border-blue/30 bg-ice text-navy">
          <Check aria-hidden="true" className="size-5" strokeWidth={2} />
        </span>
        <h2 className="heading-card mt-6">Enquiry received</h2>
        <p className="mt-3 text-[0.875rem] leading-[1.75] text-slate">
          Thank you — your enquiry has been submitted successfully. We will review
          the details and respond with suggested next steps.
        </p>
        {reference ? (
          <p className="mt-4 border border-line bg-ice/40 px-4 py-3 text-[0.75rem] text-slate">
            Reference:{" "}
            <span className="tabular font-medium text-navy">{reference}</span>
          </p>
        ) : null}
        <div className="mt-7 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setReference("");
            }}
            className="btn btn-secondary"
          >
            Submit another enquiry
          </button>
          <Link href="/insights" className="btn btn-primary">
            Read our insights
          </Link>
        </div>
      </div>
    );
  }

  const describedBy = (name: FieldName) =>
    errors[name] ? `${name}-error` : undefined;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="border border-line bg-white p-6 md:p-8"
      aria-label="Multifamily enquiry form"
    >
      <div className="border-b border-line pb-5">
        <h2 className="heading-card">Tell us about your requirements</h2>
        <p className="mt-2 text-[0.8125rem] leading-[1.65] text-slate">
          Fields marked <span aria-hidden="true">*</span> are required. Please do
          not include confidential transaction documents at this stage.
        </p>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="field-label">
            Full name <span aria-hidden="true">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            value={values.fullName}
            onChange={(event) => updateValue("fullName", event.target.value)}
            onBlur={() => handleBlur("fullName")}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={describedBy("fullName")}
            className="field"
            placeholder="Jordan Ellis"
          />
          <FieldError name="fullName" message={errors.fullName} />
        </div>

        <div>
          <label htmlFor="businessEmail" className="field-label">
            Business email <span aria-hidden="true">*</span>
          </label>
          <input
            id="businessEmail"
            name="businessEmail"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={values.businessEmail}
            onChange={(event) => updateValue("businessEmail", event.target.value)}
            onBlur={() => handleBlur("businessEmail")}
            aria-invalid={Boolean(errors.businessEmail)}
            aria-describedby={describedBy("businessEmail")}
            className="field"
            placeholder="you@company.com"
          />
          <FieldError name="businessEmail" message={errors.businessEmail} />
        </div>

        <div>
          <label htmlFor="companyName" className="field-label">
            Company name <span aria-hidden="true">*</span>
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            autoComplete="organization"
            required
            value={values.companyName}
            onChange={(event) => updateValue("companyName", event.target.value)}
            onBlur={() => handleBlur("companyName")}
            aria-invalid={Boolean(errors.companyName)}
            aria-describedby={describedBy("companyName")}
            className="field"
            placeholder="Company or fund name"
          />
          <FieldError name="companyName" message={errors.companyName} />
        </div>

        <div>
          <label htmlFor="jobTitle" className="field-label">
            Job title <span aria-hidden="true">*</span>
          </label>
          <input
            id="jobTitle"
            name="jobTitle"
            type="text"
            autoComplete="organization-title"
            required
            value={values.jobTitle}
            onChange={(event) => updateValue("jobTitle", event.target.value)}
            onBlur={() => handleBlur("jobTitle")}
            aria-invalid={Boolean(errors.jobTitle)}
            aria-describedby={describedBy("jobTitle")}
            className="field"
            placeholder="e.g. Director, Investments"
          />
          <FieldError name="jobTitle" message={errors.jobTitle} />
        </div>

        <div>
          <label htmlFor="service" className="field-label">
            Service required <span aria-hidden="true">*</span>
          </label>
          <div className="relative">
            <select
              id="service"
              name="service"
              required
              value={values.service}
              onChange={(event) => updateValue("service", event.target.value)}
              onBlur={() => handleBlur("service")}
              aria-invalid={Boolean(errors.service)}
              aria-describedby={describedBy("service")}
              className={cn("field pr-10", !values.service && "text-slate/60")}
            >
              <option value="" disabled>
                Select a service
              </option>
              {serviceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <SelectChevron />
          </div>
          <FieldError name="service" message={errors.service} />
        </div>

        <div>
          <label htmlFor="investmentStage" className="field-label">
            Investment stage <span aria-hidden="true">*</span>
          </label>
          <div className="relative">
            <select
              id="investmentStage"
              name="investmentStage"
              required
              value={values.investmentStage}
              onChange={(event) =>
                updateValue("investmentStage", event.target.value)
              }
              onBlur={() => handleBlur("investmentStage")}
              aria-invalid={Boolean(errors.investmentStage)}
              aria-describedby={describedBy("investmentStage")}
              className={cn(
                "field pr-10",
                !values.investmentStage && "text-slate/60",
              )}
            >
              <option value="" disabled>
                Select an investment stage
              </option>
              {investmentStageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <SelectChevron />
          </div>
          <FieldError name="investmentStage" message={errors.investmentStage} />
        </div>

        <div>
          <label htmlFor="units" className="field-label">
            Number of units{" "}
            <span className="font-normal normal-case tracking-normal text-slate/60">
              (optional)
            </span>
          </label>
          <input
            id="units"
            name="units"
            type="text"
            inputMode="numeric"
            value={values.units}
            onChange={(event) => updateValue("units", event.target.value)}
            onBlur={() => handleBlur("units")}
            aria-invalid={Boolean(errors.units)}
            aria-describedby={describedBy("units")}
            className="field"
            placeholder="e.g. 180"
          />
          <FieldError name="units" message={errors.units} />
        </div>

        <div>
          <label htmlFor="market" className="field-label">
            Property location / market{" "}
            <span className="font-normal normal-case tracking-normal text-slate/60">
              (optional)
            </span>
          </label>
          <input
            id="market"
            name="market"
            type="text"
            value={values.market}
            onChange={(event) => updateValue("market", event.target.value)}
            onBlur={() => handleBlur("market")}
            aria-invalid={Boolean(errors.market)}
            aria-describedby={describedBy("market")}
            className="field"
            placeholder="City, state or submarket"
          />
          <FieldError name="market" message={errors.market} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="requirements" className="field-label">
            Brief description of requirements <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="requirements"
            name="requirements"
            required
            rows={6}
            value={values.requirements}
            onChange={(event) => updateValue("requirements", event.target.value)}
            onBlur={() => handleBlur("requirements")}
            aria-invalid={Boolean(errors.requirements)}
            aria-describedby={describedBy("requirements")}
            className="field resize-y"
            placeholder="Asset strategy, market, transaction stage, decision required and any deadline."
          />
          <div className="mt-1.5 flex items-start justify-between gap-4">
            <FieldError name="requirements" message={errors.requirements} />
            <span className="tabular shrink-0 text-[0.625rem] text-slate/60">
              {values.requirements.length}/3000
            </span>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="timeline" className="field-label">
            Expected timeline <span aria-hidden="true">*</span>
          </label>
          <div className="relative">
            <select
              id="timeline"
              name="timeline"
              required
              value={values.timeline}
              onChange={(event) => updateValue("timeline", event.target.value)}
              onBlur={() => handleBlur("timeline")}
              aria-invalid={Boolean(errors.timeline)}
              aria-describedby={describedBy("timeline")}
              className={cn("field pr-10", !values.timeline && "text-slate/60")}
            >
              <option value="" disabled>
                Select an expected timeline
              </option>
              {timelineOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <SelectChevron />
          </div>
          <FieldError name="timeline" message={errors.timeline} />
        </div>
      </div>

      {/* Honeypot — hidden from users and assistive technology. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="companyWebsite">Company website</label>
        <input
          id="companyWebsite"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.companyWebsite}
          onChange={(event) => updateValue("companyWebsite", event.target.value)}
        />
      </div>

      <div className="mt-6 border-t border-line pt-5">
        <label htmlFor="consent" className="flex cursor-pointer items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            checked={values.consent}
            onChange={(event) => updateValue("consent", event.target.checked)}
            onBlur={() => handleBlur("consent")}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy("consent")}
            className="mt-0.5 size-4 shrink-0 accent-[#1D3F5A]"
          />
          <span className="text-[0.75rem] leading-[1.65] text-slate">
            I understand that DatumCRE Analytics provides analytical support and
            that this enquiry does not create an advisory, fiduciary or lender
            relationship. I have read the{" "}
            <Link href="/privacy" className="text-blue underline underline-offset-2">
              privacy policy
            </Link>
            . <span aria-hidden="true">*</span>
          </span>
        </label>
        <FieldError name="consent" message={errors.consent} />
      </div>

      {status === "error" && serverMessage ? (
        <div
          role="alert"
          className="mt-5 flex items-start gap-2.5 border border-[#b4472f]/30 bg-[#fdf3f0] px-4 py-3 text-[0.8125rem] leading-[1.6] text-[#8f3623]"
        >
          <CircleX aria-hidden="true" className="mt-0.5 size-4 shrink-0" strokeWidth={1.75} />
          <span>{serverMessage}</span>
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-[0.625rem] leading-relaxed text-slate/65">
          Your details are used only to respond to this enquiry and are handled
          confidentially. Submissions are rate-limited and checked for automated
          abuse.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn btn-primary min-w-[11rem]"
        >
          {status === "submitting" ? (
            <>
              <LoaderCircle
                aria-hidden="true"
                className="size-4 animate-spin"
                strokeWidth={1.75}
              />
              Submitting
            </>
          ) : (
            "Submit Enquiry"
          )}
        </button>
      </div>
    </form>
  );
}

function FieldError({ name, message }: { name: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={`${name}-error`} className="mt-1.5 text-[0.6875rem] leading-snug text-[#a8442e]">
      {message}
    </p>
  );
}

function SelectChevron() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="pointer-events-none absolute right-3.5 top-1/2 size-3.5 -translate-y-1/2 text-slate/60"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="m4 6 4 4 4-4" />
    </svg>
  );
}
