import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

interface MetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
}

/**
 * Produces consistent page metadata: canonical URL, Open Graph, Twitter card
 * and robots directives. `metadataBase` is set once in the root layout.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = "/images/og-default.jpg",
  imageAlt = "DatumCRE Analytics — commercial real estate financial modelling and investment analytics",
  noindex = false,
  type = "website",
  publishedTime,
}: MetadataInput): Metadata {
  const url = path === "/" ? "/" : path;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      type,
      url,
      siteName: siteConfig.name,
      title: `${title} | ${siteConfig.shortName}`,
      description,
      locale: siteConfig.locale,
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.shortName}`,
      description,
      images: [image],
    },
  };
}

/** Organization + WebSite structured data, emitted once in the root layout. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        alternateName: siteConfig.shortName,
        url: siteConfig.url,
        description: siteConfig.description,
        slogan: siteConfig.tagline,
        email: siteConfig.contactEmail,
        areaServed: {
          "@type": "Country",
          name: "United States",
        },
        knowsAbout: [
          "Commercial real estate financial modelling",
          "Real estate underwriting",
          "Investment analytics",
          "Valuation support",
          "Commercial mortgage underwriting",
          "Portfolio reporting",
        ],
        serviceType: [
          "Real estate financial modelling",
          "Investment and portfolio analytics",
          "Valuation and asset analysis",
          "Commercial mortgage underwriting",
          "Reporting and financial research",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { "@id": `${siteConfig.url}/#organization` },
        inLanguage: "en-US",
      },
    ],
  };
}
