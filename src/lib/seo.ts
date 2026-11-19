import type { Metadata } from "next";
import { founder } from "@/lib/founder";
import { services } from "@/lib/services";
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
  image = "/images/og-multifamily.jpg",
  imageAlt = "DatumCRE Analytics — independent Multifamily real estate financial modelling and underwriting",
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

/** Organization, founder and service structured data, emitted in the root layout. */
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
        ...(siteConfig.contactEmailConfigured
          ? { email: siteConfig.contactEmail }
          : {}),
        ...(siteConfig.linkedinConfigured
          ? { sameAs: [siteConfig.linkedinUrl] }
          : {}),
        areaServed: {
          "@type": "Country",
          name: "United States",
        },
        knowsAbout: [
          "Multifamily underwriting",
          "Multifamily financial modelling",
          "Multifamily acquisition analysis",
          "Multifamily investment analytics",
          "US Multifamily underwriting",
          "Multifamily valuation support",
          "Real estate portfolio analytics",
          "Multifamily development modelling",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Multifamily analytical services",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.summary,
              provider: { "@id": `${siteConfig.url}/#organization` },
            },
          })),
        },
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#founder`,
        name: founder.name,
        jobTitle: founder.role,
        description:
          "Real estate finance and financial modelling professional focused on US Multifamily underwriting, valuation support and investment analytics.",
        worksFor: { "@id": `${siteConfig.url}/#organization` },
        ...(founder.imageEnabled
          ? { image: `${siteConfig.url}${founder.image}` }
          : {}),
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
