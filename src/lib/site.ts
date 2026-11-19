/**
 * Global site configuration.
 *
 * Central place for brand, navigation, contact details and form options.
 *
 * CONTACT DETAILS
 * ---------------
 * The business email and LinkedIn URL are intentionally empty until verified
 * values are supplied. When `NEXT_PUBLIC_CONTACT_EMAIL` is set, every email
 * link and display across the site updates automatically. Placeholder
 * addresses are never rendered to visitors.
 */

const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "";

const linkedinUrl =
  process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() || "";

const businessLocation =
  process.env.NEXT_PUBLIC_BUSINESS_LOCATION?.trim() || "United States";

const coverage = `${businessLocation} · Remote-first engagements`;

/**
 * Canonical site origin.
 *
 * Priority:
 *   1. NEXT_PUBLIC_SITE_URL (set this in production)
 *   2. VERCEL_PROJECT_PRODUCTION_URL (provided automatically by Vercel)
 *   3. localhost, so local builds never publish an invented domain
 */
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
const siteUrl = (
  configuredUrl || (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000")
).replace(/\/$/, "");

export const siteConfig = {
  name: "DatumCRE Analytics",
  shortName: "DatumCRE",
  tagline: "Clarity. Precision. Better Investment Decisions.",
  positioning:
    "Independent Multifamily Real Estate Financial Modelling, Underwriting & Investment Analytics.",
  description:
    "Independent Multifamily real estate financial modelling, acquisition underwriting and investment analytics for US investors, owners, operators and developers.",
  url: siteUrl,
  locale: "en_US",
  region: "United States",
  coverage,
  /** Business email. Empty until a verified address is supplied. */
  contactEmail,
  /** True when a real, publishable business email has been configured. */
  contactEmailConfigured: Boolean(contactEmail),
  /** Optional LinkedIn profile. Empty until a verified URL is supplied. */
  linkedinUrl,
  linkedinConfigured: Boolean(linkedinUrl),
  businessLocation,
  legalDisclaimer:
    "DatumCRE Analytics provides independent analytical and modelling support. We do not provide investment, securities, legal, tax, accounting or lending advice, or formal appraisal opinions. Our work is prepared from client-supplied information and stated assumptions, and should be independently reviewed before use in any transaction.",
} as const;

export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Multifamily", href: "/multifamily" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = {
  services: [
    {
      label: "Acquisition Underwriting",
      href: "/services#multifamily-acquisition-underwriting",
    },
    {
      label: "Development & Investment Modelling",
      href: "/services#development-investment-modelling",
    },
    {
      label: "Valuation & Asset-Level Analysis",
      href: "/services#valuation-asset-level-analysis",
    },
    {
      label: "Portfolio & Asset Management Analytics",
      href: "/services#portfolio-asset-management-analytics",
    },
    {
      label: "Debt & Financing Analysis",
      href: "/services#multifamily-debt-financing",
    },
  ],
  company: [
    { label: "About DatumCRE", href: "/about" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
} as const;

export const serviceOptions = [
  "Acquisition Underwriting",
  "Development Modelling",
  "Valuation Support",
  "Portfolio Analytics",
  "Debt & Financing Analysis",
  "Other Multifamily Analytical Support",
] as const;

export const investmentStageOptions = [
  "Acquisition",
  "Development",
  "Stabilised Operations",
  "Refinancing",
  "Disposition",
  "Portfolio Reporting",
  "Other",
] as const;

export const timelineOptions = [
  "Immediate (next 30 days)",
  "1–3 months",
  "3–6 months",
  "6+ months",
  "Ongoing analytical support",
] as const;
