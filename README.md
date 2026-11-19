# DatumCRE Analytics

Corporate website for **DatumCRE Analytics** — an independent US Multifamily
real estate financial modelling, underwriting and investment analytics practice.

> Clarity. Precision. Better Investment Decisions.

The site is positioned exclusively around **US Multifamily**. It does not promote
industrial, retail, office, hospitality or mixed-use services.

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

### Public configuration

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes (production) | Absolute origin without trailing slash. Used for `metadataBase`, canonical URLs, sitemap, robots and JSON-LD. Set it **before building**. When unset, the app falls back to `VERCEL_PROJECT_PRODUCTION_URL` on Vercel, then to `http://localhost:3000` locally — it never publishes a placeholder domain. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | When available | Published business email. Every email link and display derives from it. If unset, email UI is hidden — no placeholder address is ever rendered. |
| `NEXT_PUBLIC_LINKEDIN_URL` | Optional | LinkedIn profile URL. Hidden when unset. |
| `NEXT_PUBLIC_BUSINESS_LOCATION` | Optional | Public location label. Defaults to `United States` in `src/lib/site.ts`. |

### Contact form email delivery

| Variable | Required | Notes |
| --- | --- | --- |
| `SMTP_HOST` | For email | SMTP hostname of your email provider |
| `SMTP_PORT` | For email | Default `587` (STARTTLS). Port `465` implies implicit TLS. |
| `SMTP_SECURE` | No | `true` for implicit TLS on non-465 ports; otherwise leave `false` |
| `SMTP_USER` | For email | SMTP username / mailbox |
| `SMTP_PASSWORD` | For email | SMTP password or app-specific password |
| `CONTACT_TO_EMAIL` | For email | Destination inbox for enquiries. Falls back to `NEXT_PUBLIC_CONTACT_EMAIL` when set. |
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

### Form fields

Full name, business email, company name, job title, service required,
investment stage, number of units (optional), property location / market
(optional), brief description of requirements, expected timeline, and a
confirmation checkbox linked to the privacy policy.

Service options: Acquisition Underwriting · Development Modelling · Valuation
Support · Portfolio Analytics · Debt & Financing Analysis · Other Multifamily
Analytical Support.

Investment stage options: Acquisition · Development · Stabilised Operations ·
Refinancing · Disposition · Portfolio Reporting · Other.

### Development without SMTP

If SMTP is not configured, the route validates the submission, logs a redacted
copy to the server console, and returns **HTTP 503 with `delivered: false`**. It
does **not** show a success message, because a logged-only enquiry has not
actually been delivered.

> **Before launch:** configure SMTP and submit a real test enquiry.

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

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home — Multifamily positioning, services, differentiators, illustrative model |
| `/services` | Five Multifamily service disciplines with anchored sections |
| `/multifamily` | Dedicated Multifamily page: segments, considerations, metrics |
| `/about` | Mission, founder profile, disciplines, principles, scope |
| `/insights` | Multifamily knowledge centre index |
| `/insights/[slug]` | Published article template |
| `/contact` | Enquiry form and contact details |
| `/privacy` | Privacy policy |
| `/disclaimer` | Service scope and limitations |
| `/industries` | Legacy route — permanent redirect to `/multifamily` |

`next.config.ts` also defines a permanent redirect from `/industries` to
`/multifamily`, so legacy links continue to resolve.

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
| `src/lib/site.ts` | Brand name, tagline, positioning, **contact email / LinkedIn / coverage**, navigation, footer links, form dropdown options |
| `src/lib/services.ts` | Five Multifamily services: overview, capabilities, client requirements, deliverables, business value |
| `src/lib/industries.ts` | Single-sector Multifamily data: segments, metrics, considerations, support |
| `src/lib/insights.ts` | Ten published Multifamily articles: body sections, images, related links, publication status |
| `src/lib/founder.ts` | Verified Puneet Tripathi profile, qualifications, expertise, philosophy, portrait config |
| `src/app/*/page.tsx` | Page-level copy and layout |

### Publishing an insight

Articles carry `status: "published" | "draft"`. Only published articles are:

- listed on `/insights`,
- generated as static routes,
- emitted with `robots: index`,
- included in the sitemap.

To publish a draft, in `src/lib/insights.ts` set:

```ts
status: "published",
date: "2026-12-01", // real publication date
```

Then rebuild. Drafts are never shown with a visible draft badge or draft notice.

### Founder section

`src/lib/founder.ts` contains the verified profile supplied by the business.
The founder-supplied portrait is enabled by default:

```ts
imageEnabled: true,
image: "/images/founder-puneet-tripathi.jpg",
```

Set `imageEnabled: false` to fall back to the designed monogram panel. Never
substitute a stock photograph for the founder.

Do not add employer names, certifications, transaction volumes, client names or
professional designations unless they have been verified and authorised.

---

## Images

Images live in `public/images/` and are served through `next/image` (AVIF/WebP,
responsive sizes, lazy loading; the hero uses `priority`).

| File | Usage |
| --- | --- |
| `industry-multifamily.jpg` | Hero image, Multifamily page, About, and article imagery source |
| `insight-rent-roll.jpg` | Rent roll article |
| `insight-noi.jpg` | NOI / T-12 article |
| `insight-expenses.jpg` | Operating expense article |
| `insight-development.jpg` | Development modelling article |
| `insight-lending.jpg` | DSCR / debt yield / LTV article |
| `insight-acquisition.jpg` | Acquisition article |
| `insight-concessions.jpg` | Loss to lease / concessions article |
| `insight-value-add.jpg` | Value-add renovation article |
| `insight-waterfall.jpg` | JV waterfall article |
| `insight-exit-cap.jpg` | Exit cap rate article |
| `og-multifamily.jpg` | Default Open Graph / Twitter image (1200×630) |
| `founder-puneet-tripathi.jpg` | Founder portrait on the About page (960×1200 JPEG, supplied by the founder) |

The article images are crops derived from the two existing Multifamily
photographs. To replace an image, overwrite the file with the same name (or
update the path in the relevant data file). Recommended: JPEG/WebP, 1200–2000 px
on the long edge, under ~400 KB. Keep alt text meaningful and specific.

Credits and licence notes: `public/images/CREDITS.md`. All photography is
Unsplash-sourced and illustrative — it does not depict DatumCRE projects, clients
or advised assets.

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
- ProfessionalService, Person (founder) and WebSite JSON-LD in the root layout;
  Article JSON-LD on published articles
- Descriptive alt text, `next/image` sizing, lazy loading
- Clean, lowercase URLs and in-page anchors for services

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

- [ ] Set `NEXT_PUBLIC_CONTACT_EMAIL` to the verified business email
- [ ] Set `NEXT_PUBLIC_LINKEDIN_URL` if a profile should be published
- [x] Add `public/images/founder-puneet-tripathi.jpg` (portrait enabled)
- [ ] Confirm the founder approves the published portrait and alt text
- [ ] Configure SMTP and send a live test enquiry (must return `delivered: true`)
- [ ] Replace the rate limiter with a shared store if deploying multi-instance
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain
- [ ] Replace the temporary text logo if an official asset exists
- [ ] Confirm image licensing or swap in owned photography
- [ ] Review privacy policy and disclaimer with counsel
- [ ] Verify the privacy policy covers any analytics added later

---

## Project structure

```
src/
  app/
    layout.tsx              Root layout, fonts, metadata, JSON-LD
    page.tsx                Home
    services/page.tsx       Five Multifamily services (anchored sections)
    multifamily/page.tsx    Multifamily sector page
    industries/page.tsx     Legacy redirect to /multifamily
    about/page.tsx          Mission + founder profile
    insights/               Index + [slug] article template
    contact/page.tsx        Contact page
    api/contact/route.ts    Validated enquiry endpoint
    privacy/page.tsx        Privacy policy
    disclaimer/page.tsx     Service scope and limitations
    sitemap.ts, robots.ts, not-found.tsx, icon.svg
    globals.css             Brand tokens + design system
  components/
    brand/ layout/ ui/ home/ contact/
  lib/
    site.ts services.ts industries.ts insights.ts founder.ts
    seo.ts contact-schema.ts utils.ts
public/images/              Photography + CREDITS.md
```

---

© DatumCRE Analytics. DatumCRE provides independent analytical, modelling and
research support and does not provide investment, securities, legal, tax,
accounting or lending advice or formal appraisal opinions.
