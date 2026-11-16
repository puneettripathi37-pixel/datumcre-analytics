# DatumCRE Analytics

Corporate website for **DatumCRE Analytics** — independent commercial real estate
financial modelling, underwriting, investment analytics and valuation support.

> Clarity in Numbers. Confidence in Decisions.

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`) |
| Icons | Lucide React |
| Validation | Zod (shared client/server schema) |
| Email | Nodemailer over SMTP (environment configured) |
| Fonts | Montserrat (headings) + Inter (body) via `next/font` |

No database, CMS or client-side state library is required. All content is typed
data in `src/lib`.

---

## Requirements

- Node.js **20.9+** (developed on Node 24 LTS)
- npm 10+

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

### Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build (after `build`) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (flat config, Next.js core web vitals + TypeScript) |

---

## Environment variables

Copy `.env.example` to `.env.local` (never commit `.env.local`).

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes (production) | Absolute origin without trailing slash. Used for `metadataBase`, canonical URLs, sitemap, robots and JSON-LD. Set it **before building**. |
| `SMTP_HOST` | For email | SMTP hostname of your email provider |
| `SMTP_PORT` | For email | Default `587` (STARTTLS). Port `465` implies implicit TLS. |
| `SMTP_SECURE` | No | `true` for implicit TLS on non-465 ports; otherwise leave `false` |
| `SMTP_USER` | For email | SMTP username / mailbox |
| `SMTP_PASSWORD` | For email | SMTP password or app-specific password |
| `CONTACT_TO_EMAIL` | For email | Destination inbox for enquiries |
| `CONTACT_FROM_EMAIL` | No | Defaults to `SMTP_USER`. Must be an address your provider permits you to send from. |
| `CONTACT_REPLY_TO_EMAIL` | No | Defaults to the enquirer's business email |

There are **no hardcoded credentials** anywhere in the codebase.

---

## Contact form

### Flow

1. `ContactForm` (`src/components/contact/ContactForm.tsx`) validates on blur and
   on submit using `contactSchema` (`src/lib/contact-schema.ts`).
2. The payload is POSTed as JSON to `/api/contact`
   (`src/app/api/contact/route.ts`).
3. The route applies, in order:
   - payload size guard,
   - honeypot check (hidden `companyWebsite` field),
   - timing check (submissions under 2.5 s are rejected),
   - in-memory rate limit (5 submissions / 15 min per IP),
   - the same Zod schema (authoritative validation).
4. If SMTP is configured, a formatted HTML + plain-text email is sent with the
   enquirer's address as `Reply-To`. A reference (`DCR-YYYYMMDD-XXXXX`) is
   returned and shown to the user.

### Development without SMTP

If `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD` or `CONTACT_TO_EMAIL` are missing,
the route still validates the submission, logs a redacted copy to the server
console, and returns success with `delivered: false`. This lets you test the full
form flow locally without credentials.

> **Before launch:** configure SMTP and submit a real test enquiry. A form that
> silently only logs to the console must not go live.

### Rate limiting

The limiter is an in-memory `Map`, which is correct for a single long-running
instance but **not shared** across serverless invocations. On Vercel or any
multi-instance host, replace `isRateLimited()` with a shared store (Upstash
Redis, a database table, or the platform's edge rate limiting).

### Spam protection

- Hidden honeypot field (accepted silently so bots do not retry)
- Minimum completion time
- Per-IP rate limit
- Strict server-side schema validation and length limits
- No file uploads, no HTML injection into email (all values escaped)

If stronger protection is needed, add a CAPTCHA/Turnstile token verification step
inside the POST handler before sending mail.

---

## Deployment

### Vercel (recommended)

1. Push the repository to your Git host and import it into Vercel.
2. Add the environment variables above for the Production environment.
3. Set `NEXT_PUBLIC_SITE_URL` to the final domain (for example
   `https://www.datumcre.com`).
4. Deploy. Framework preset: Next.js. No custom build command needed.

### Self-hosted Node

```bash
npm ci
npm run build
NEXT_PUBLIC_SITE_URL=https://www.datumcre.com npm run start
```

Run behind a reverse proxy with TLS. Forward `X-Forwarded-For` so the rate limiter
sees real client IPs.

### Static export

Not supported as configured: the contact API route and dynamic metadata require a
Node server. Deploy as a Node/edge-hosted Next.js app.

---

## Content editing

All copy that recurs across pages lives in typed data files.

| File | Contents |
| --- | --- |
| `src/lib/site.ts` | Brand name, tagline, description, **contact email**, navigation, form dropdown options |
| `src/lib/services.ts` | Five services: overview, capabilities, client requirements, deliverables, business value |
| `src/lib/industries.ts` | Six industries: overview, metrics, considerations, support |
| `src/lib/insights.ts` | Six articles: body sections, images, related links, publication status |
| `src/lib/founder.ts` | Founder profile placeholders |
| `src/app/*/page.tsx` | Page-level copy and layout |

### Publishing an insight

Articles default to `status: "draft"`. Drafts:

- show a visible "Draft" badge and editorial notice,
- emit `robots: noindex`,
- are excluded from the sitemap.

To publish, in `src/lib/insights.ts` set:

```ts
status: "published",
date: "2026-12-01", // real publication date
```

Then rebuild. No other change is required.

### Founder section

`src/lib/founder.ts` contains deliberate placeholders — no name, credentials,
tenure or client history has been invented. Replace each value with verified
information and set `isPlaceholder: false` to remove the draft notice. Do not
publish unverified professional claims.

---

## Images

Images live in `public/images/` and are served through `next/image` (AVIF/WebP,
responsive sizes, lazy loading; the hero uses `priority`).

| File | Usage |
| --- | --- |
| `hero-architecture.jpg` | Homepage hero (portrait crop) |
| `about-architecture.jpg` | About page editorial image |
| `industry-*.jpg` | Industry cards and sections |
| `insight-*.jpg` | Article featured images |
| `og-default.jpg` | Default Open Graph / Twitter image (1200×630) |

To replace an image, overwrite the file with the same name (or update the path in
the relevant data file). Recommended: JPEG/WebP, 1200–2000 px on the long edge,
under ~400 KB. Keep alt text meaningful and specific.

Credits and licence notes: `public/images/CREDITS.md`. All photography is
Unsplash-sourced and illustrative — it does not depict DatumCRE projects, clients
or advised assets. If the business supplies its own photography, remove the
"illustrative" captions that apply.

> There was no logo asset in the repository. The current wordmark
> (`src/components/brand/Logo.tsx`) is a temporary text lockup. Replace it with the
> official DatumCRE logo when available — do not redesign an existing mark.

---

## SEO

Implemented per page:

- Unique `<title>` and meta description
- Canonical URLs via `metadataBase` + `buildMetadata()`
- Open Graph and Twitter card metadata with a 1200×630 image
- Semantic landmarks, single `h1`, ordered heading hierarchy
- `sitemap.xml` (`src/app/sitemap.ts`), `robots.txt` (`src/app/robots.ts`)
- Organization/WebSite JSON-LD in the root layout; Article JSON-LD on articles
- Descriptive alt text, `next/image` sizing, lazy loading
- Clean, lowercase URLs and in-page anchors for services/industries

Set `NEXT_PUBLIC_SITE_URL` correctly — canonical URLs, OG URLs and the sitemap all
derive from it.

---

## Accessibility

- Skip link to `#main`
- Visible focus styles, keyboard-operable navigation and mobile menu
- Form labels, `aria-invalid`, `aria-describedby` and error text tied to inputs
- Live regions only where needed; no motion beyond subtle fades, disabled under
  `prefers-reduced-motion`
- Colour contrast checked against the brand palette (navy/white primary pairings)

---

## Pre-launch checklist

- [ ] Replace `siteConfig.contactEmail` (currently `inquiries@datumcre.example`)
      and set `contactEmailIsPlaceholder: false`
- [ ] Complete `src/lib/founder.ts` with verified details; set `isPlaceholder: false`
- [ ] Review `src/app/privacy/page.tsx` with counsel; remove the publication note
- [ ] Configure SMTP and send a live test enquiry
- [ ] Replace the rate limiter with a shared store if deploying multi-instance
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain
- [ ] Replace the temporary text logo if an official asset exists
- [ ] Review draft insights and publish approved articles
- [ ] Confirm image licensing or swap in owned photography
- [ ] Verify the privacy policy covers any analytics added later

---

## Project structure

```
src/
  app/
    layout.tsx            Root layout, fonts, metadata, JSON-LD
    page.tsx              Home
    services/page.tsx     Services (anchored sections)
    industries/page.tsx   Industries
    about/page.tsx        About + founder placeholders
    insights/             Index + [slug] article template
    contact/page.tsx      Contact page
    api/contact/route.ts  Validated enquiry endpoint
    privacy/page.tsx      Privacy policy
    sitemap.ts, robots.ts, not-found.tsx, icon.svg
    globals.css           Brand tokens + design system
  components/
    brand/ layout/ ui/ home/ contact/
  lib/
    site.ts services.ts industries.ts insights.ts founder.ts
    seo.ts contact-schema.ts utils.ts
public/images/            Photography + CREDITS.md
```

---

© DatumCRE Analytics. DatumCRE provides independent analytical, modelling and
research support and does not provide investment, legal, tax, accounting or
lending advice.
