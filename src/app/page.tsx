import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeContent } from "@/components/home/HomeContent";
import { CTABand } from "@/components/layout/CTABand";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Commercial Real Estate Financial Modelling & Underwriting",
  description:
    "DatumCRE Analytics provides independent commercial real estate financial modelling, underwriting, investment analytics and valuation support for US real estate investors, lenders and asset managers.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeContent />
      <CTABand
        eyebrow="Get in touch"
        title="Let's Bring Greater Clarity to Your Real Estate Investments."
        description="Whether you need acquisition underwriting, financial modelling, valuation support or portfolio analytics, let's discuss how DatumCRE can support your analytical requirements."
        buttonLabel="Get in Touch"
      />
    </>
  );
}
