import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Info } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { CTABand } from "@/components/layout/CTABand";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/lib/services";

export const metadata: Metadata = buildMetadata({
  title: "Services — Modelling, Underwriting, Analytics & Valuation Support",
  description:
    "Commercial real estate financial modelling, investment and portfolio analytics, valuation support, mortgage underwriting and reporting services for US real estate professionals.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Analytical support built around the investment decision"
        description="Engage a single discipline or combine several across the investment lifecycle. Each engagement is scoped to the transaction, the audience and the timetable."
        crumbs={[{ label: "Services" }]}
      >
        <div className="mt-7 flex flex-wrap gap-2">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`#${service.slug}`}
              className="border border-line bg-white px-3 py-1.5 text-[0.6875rem] font-medium text-slate transition-colors hover:border-navy hover:text-navy"
            >
              {service.navLabel}
            </Link>
          ))}
        </div>
      </PageHero>

      <div className="border-b border-line bg-white">
        <div className="container-page py-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
            <Info
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-blue"
              strokeWidth={1.75}
            />
            <p className="max-w-4xl text-[0.8125rem] leading-[1.75] text-slate">
              <strong className="font-semibold text-navy">Scope of work.</strong>{" "}
              DatumCRE Analytics provides analytical, modelling and research
              support. We are not a registered investment adviser, broker-dealer,
              lender, appraiser, law firm or accounting firm, and we do not
              provide investment recommendations, securities advice, legal, tax
              or accounting advice, or lending commitments. Analyses are prepared
              from client-supplied information and stated assumptions, and are
              intended to support — not replace — the client&apos;s own
              judgement, due diligence and professional advisers.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white">
        {services.map((service) => (
          <section
            key={service.slug}
            id={service.slug}
            aria-labelledby={`${service.slug}-heading`}
            className="border-b border-line py-16 md:py-20 lg:py-24"
          >
            <div className="container-page">
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
                {/* Left rail */}
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-32">
                    <div className="flex items-center gap-4">
                      <ServiceIcon name={service.icon} />
                      <span className="tabular text-[0.6875rem] font-medium tracking-[0.18em] text-slate/50">
                        Service {service.number}
                      </span>
                    </div>
                    <h2
                      id={`${service.slug}-heading`}
                      className="heading-section mt-6 max-w-[18ch]"
                    >
                      {service.title}
                    </h2>
                    <p className="mt-4 max-w-sm text-[0.9375rem] leading-[1.7] text-blue">
                      {service.tagline}
                    </p>

                    <dl className="mt-8 hidden gap-px border border-line bg-line lg:grid">
                      <div className="bg-white px-5 py-4">
                        <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-slate/70">
                          Engagement format
                        </dt>
                        <dd className="mt-1.5 text-[0.8125rem] text-navy">
                          Fixed-scope project or ongoing retainer
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-7 hidden lg:block">
                      <Button href="/contact" variant="secondary" withArrow>
                        Discuss This Service
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Right content */}
                <div className="lg:col-span-7 lg:col-start-6">
                  <div className="space-y-4">
                    {service.overview.map((paragraph) => (
                      <p key={paragraph} className="body-copy">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="mt-10 grid gap-8 sm:grid-cols-2">
                    <div>
                      <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-navy">
                        {service.capabilitiesHeading}
                      </h3>
                      <ul className="mt-4 space-y-2.5">
                        {service.capabilities.map((capability) => (
                          <li
                            key={capability}
                            className="flex items-start gap-2.5 text-[0.8125rem] leading-[1.6] text-slate"
                          >
                            <Check
                              aria-hidden="true"
                              className="mt-1 size-3.5 shrink-0 text-blue"
                              strokeWidth={2}
                            />
                            {capability}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-navy">
                        Typical client requirements
                      </h3>
                      <ul className="mt-4 space-y-2.5">
                        {service.clientRequirements.map((requirement) => (
                          <li
                            key={requirement}
                            className="flex items-start gap-2.5 text-[0.8125rem] leading-[1.6] text-slate"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[0.55rem] size-1 shrink-0 bg-blue"
                            />
                            {requirement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-10 border border-line bg-ice/50 p-6 md:p-7">
                    <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-navy">
                      Expected deliverables
                    </h3>
                    <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      {service.deliverables.map((deliverable) => (
                        <li
                          key={deliverable}
                          className="flex items-start gap-2.5 text-[0.8125rem] leading-[1.6] text-slate"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[0.55rem] size-1 shrink-0 bg-navy/60"
                          />
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 border-t border-navy/10 pt-4 text-[0.6875rem] leading-relaxed text-slate/80">
                      Deliverables are indicative and confirmed during scoping.
                      Formats are provided in Excel and PDF unless otherwise
                      agreed.
                    </p>
                  </div>

                  <div className="mt-8 border-l-2 border-blue pl-6">
                    <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-navy">
                      Business value
                    </h3>
                    <p className="mt-3 font-heading text-[1.0625rem] font-medium leading-[1.6] text-navy">
                      {service.value}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                      {service.valuePoints.map((point) => (
                        <li
                          key={point}
                          className="text-[0.75rem] text-slate"
                        >
                          — {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-9 flex flex-wrap items-center gap-4 border-t border-line pt-6 lg:hidden">
                    <Button href="/contact" variant="primary" withArrow>
                      Discuss This Service
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="bg-ice/50 py-14 md:py-16">
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="heading-card">Need a combination of services?</h2>
              <p className="mt-2 text-[0.875rem] leading-[1.7] text-slate">
                Acquisition underwriting, debt sizing and investment committee
                reporting are frequently commissioned together. We can scope a
                combined engagement around a single transaction timetable.
              </p>
            </div>
            <Link
              href="/contact"
              className="link-arrow shrink-0"
            >
              Discuss a combined scope
              <ArrowRight aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Next step"
        title="Tell us what you are evaluating."
        description="Share the transaction, portfolio or reporting requirement and we will respond with a suggested scope, timeline and deliverable list."
        buttonLabel="Start a Conversation"
      />
    </>
  );
}
