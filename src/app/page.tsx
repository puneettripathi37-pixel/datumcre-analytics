import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeContent } from "@/components/home/HomeContent";
import { CTABand } from "@/components/layout/CTABand";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Multifamily Real Estate Financial Modelling & Underwriting",
  description:
    "DatumCRE Analytics provides independent Multifamily real estate financial modelling, acquisition underwriting, valuation support and portfolio analytics for US investors, owners, operators and developers.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeContent />
      <CTABand
        eyebrow="Get in touch"
        title="Let's Bring Greater Clarity to Your Multifamily Investments."
        description="Whether you need acquisition underwriting, development modelling, valuation support or portfolio analytics, let's discuss how DatumCRE can support your analytical requirements."
        buttonLabel="Discuss Your Requirements"
      />
    </>
  );
}
