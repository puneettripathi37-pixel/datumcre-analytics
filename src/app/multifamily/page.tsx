import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { CTABand } from "@/components/layout/CTABand";
import { buildMetadata } from "@/lib/seo";
import { multifamily } from "@/lib/industries";
import { services } from "@/lib/services";

export const metadata: Metadata = buildMetadata({
  title: "Multifamily Real Estate Analytics & Underwriting",
  description:
    "Multifamily real estate analytics and underwriting for US apartment investments: rent roll and T-12 analysis, NOI normalisation, valuation support, development modelling and portfolio reporting.",
  path: "/multifamily",
  image: "/images/industry-multifamily.jpg",
  imageAlt:
    "Garden-style US multifamily apartment community with brick and metal balconies",
});

export default function MultifamilyPage() {
  return (
    <>
      <PageHero
        eyebrow="Multifamily"
        title="Multifamily Real Estate Analytics & Underwriting"
        description="Specialist financial analysis for US apartment investments — from unit-level revenue assumptions and operating expenses to valuation, development and portfolio reporting."
        crumbs={[{ label: "Multifamily" }]}
      >
        <div className="mt-7 flex flex-wrap gap-2">
          {multifamily.segments.slice(0, 4).map((segment) => (
            <span
              key={segment.name}
              className="border border-line bg-white px-3 py-1.5 text-[0.625rem] font-medium uppercase tracking-[0.08em] text-slate"
            >
              {segment.name}
            </span>
          ))}
        </div>
      </PageHero>

      {/* Overview */}
      <section className="section bg-white">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <figure className="lg:sticky lg:top-32">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy">
                  <Image
                    src={multifamily.image}
                    alt={multifamily.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="img-tone object-cover"
                  />
                  <span className="absolute left-4 top-4 bg-white/95 px-2.5 py-1 text-[0.5625rem] font-semibold uppercase tracking-[0.16em] text-navy">
                    Multifamily
                  </span>
                </div>
                <figcaption className="mt-3 text-[0.625rem] leading-relaxed text-slate/70">
                  Illustrative architectural photography. Not a DatumCRE project
                  or client asset.
                </figcaption>
              </figure>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <span className="eyebrow">Sector focus</span>
              <h2 className="heading-section mt-5">
                Apartment economics, analysed from the unit up
              </h2>
              <div className="mt-6 space-y-3.5">
                {multifamily.overview.map((paragraph) => (
                  <p key={paragraph} className="body-copy">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-9 border-l-2 border-blue pl-6">
                <p className="font-heading text-[1.0625rem] font-medium leading-[1.6] text-navy">
                  The objective is a financial model that reflects how the asset
                  actually operates — and that can be explained to an investment
                  committee, lender or capital partner.
                </p>
              </div>

              <div className="mt-9">
                <Link href="/services" className="link-arrow">
                  Explore Multifamily services
                  <ArrowRight
                    aria-hidden="true"
                    className="size-3.5"
                    strokeWidth={1.75}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Segments */}
      <section className="section border-y border-line bg-ice/40">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <span className="eyebrow">Coverage</span>
              <h2 className="heading-section mt-5">
                Multifamily property types
              </h2>
              <p className="body-copy mt-5">
                Analytical scope across the apartment spectrum. Coverage reflects
                the analysis DatumCRE is structured to support, not a claim of
                specialist experience in every subcategory.
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
                {multifamily.segments.map((segment) => (
                  <div key={segment.name} className="bg-white p-5">
                    <h3 className="font-heading text-[0.875rem] font-semibold leading-snug text-navy">
                      {segment.name}
                    </h3>
                    <p className="mt-2 text-[0.75rem] leading-[1.65] text-slate">
                      {segment.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Considerations + metrics */}
      <section className="section bg-white">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <span className="eyebrow">Analytical considerations</span>
              <h2 className="heading-section mt-5">
                What determines the underwriting outcome
              </h2>
              <p className="body-copy mt-5">
                Small changes in renewal assumptions, concessions or the expense
                base can materially shift value. Each driver is modelled
                explicitly and tested where the evidence is uncertain.
              </p>

              <div className="mt-9 border border-line bg-white">
                <div className="hidden grid-cols-5 border-b border-navy bg-ice px-4 py-2.5 sm:grid">
                  <span className="col-span-2 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-navy">
                    Metric
                  </span>
                  <span className="col-span-3 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-navy">
                    What we examine
                  </span>
                </div>
                <dl className="divide-y divide-line">
                  {multifamily.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="grid gap-1 px-4 py-3 sm:grid-cols-5 sm:gap-4"
                    >
                      <dt className="tabular text-[0.8125rem] font-medium text-navy sm:col-span-2">
                        {metric.label}
                      </dt>
                      <dd className="text-[0.8125rem] leading-[1.55] text-slate sm:col-span-3">
                        {metric.detail}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-navy">
                Multifamily underwriting considerations
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {multifamily.considerations.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 border-t border-line pt-3 text-[0.8125rem] leading-[1.6] text-slate"
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-1 size-3.5 shrink-0 text-blue"
                      strokeWidth={2}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section border-t border-line bg-ice/30">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <span className="eyebrow">Support</span>
              <h2 className="heading-section mt-5">
                Where DatumCRE can help
              </h2>
              <p className="body-copy mt-5">
                Engage a single analysis or combine several disciplines around a
                transaction, a portfolio or a recurring reporting cycle.
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <ul className="divide-y divide-line border-y border-line">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services#${service.slug}`}
                      className="group flex items-center justify-between gap-6 py-4"
                    >
                      <span>
                        <span className="tabular mr-3 text-[0.625rem] font-semibold tracking-[0.14em] text-blue">
                          {service.number}
                        </span>
                        <span className="font-heading text-[0.9375rem] font-semibold text-navy">
                          {service.title}
                        </span>
                      </span>
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 shrink-0 text-slate/50 transition-transform group-hover:translate-x-1 group-hover:text-blue"
                        strokeWidth={1.75}
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-[0.6875rem] leading-relaxed text-slate/65">
                DatumCRE provides analytical and modelling support only. We do not
                provide investment advice, formal appraisal opinions, or lending
                commitments.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Multifamily analytical support"
        title="Tell us about the asset and the decision."
        description="Share the market, unit count, investment stage and the analysis you need. We will outline a suggested scope, deliverables and timeline."
        buttonLabel="Discuss Your Requirements"
      />
    </>
  );
}
