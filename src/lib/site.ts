/**
 * Global site configuration.
 *
 * Central place for brand, navigation and contact details.
 * NOTE: contact details are placeholders until the business supplies real
 * information. The `.example` domain is reserved by IANA and will never
 * resolve, which makes it safe for staging deployments.
 */

export const siteConfig = {
  name: "DatumCRE Analytics",
  shortName: "DatumCRE",
  tagline: "Clarity in Numbers. Confidence in Decisions.",
  description:
    "Independent commercial real estate financial modelling, underwriting and investment analytics for informed real estate decisions.",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.datumcre.example",
  locale: "en_US",
  // TODO(content): replace with the published business email before launch.
  contactEmail: "inquiries@datumcre.example",
  contactEmailIsPlaceholder: true,
  region: "United States",
  legalDisclaimer:
    "DatumCRE Analytics provides independent analytical, modelling and research support. We do not provide investment advice, securities recommendations, legal, tax or accounting advice, or lending commitments. All analysis is prepared from information supplied by the client and stated assumptions, and should be independently reviewed before use in any transaction.",
} as const;

export const primaryNav = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = {
  services: [
    { label: "Real Estate Financial Modelling", href: "/services#financial-modelling" },
    { label: "Investment & Portfolio Analytics", href: "/services#investment-analytics" },
    { label: "Valuation & Asset Analysis", href: "/services#valuation-analysis" },
    { label: "Commercial Mortgage Underwriting", href: "/services#mortgage-underwriting" },
    { label: "Reporting & Financial Research", href: "/services#reporting-research" },
  ],
  industries: [
    { label: "Multifamily", href: "/industries#multifamily" },
    { label: "Industrial & Logistics", href: "/industries#industrial-logistics" },
    { label: "Retail", href: "/industries#retail" },
    { label: "Office", href: "/industries#office" },
    { label: "Hospitality", href: "/industries#hospitality" },
    { label: "Mixed-Use", href: "/industries#mixed-use" },
  ],
  company: [
    { label: "About DatumCRE", href: "/about" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
} as const;

export const serviceOptions = [
  "Financial Modelling",
  "Acquisition Underwriting",
  "Investment Analytics",
  "Valuation Support",
  "Mortgage Underwriting",
  "Portfolio Reporting",
  "Other",
] as const;

export const propertyTypeOptions = [
  "Multifamily",
  "Industrial",
  "Retail",
  "Office",
  "Hospitality",
  "Mixed-Use",
  "Other",
] as const;
