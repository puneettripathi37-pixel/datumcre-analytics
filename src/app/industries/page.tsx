import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { CTABand } from "@/components/layout/CTABand";
import { buildMetadata } from "@/lib/seo";
import { industries } from "@/lib/industries";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Industries — Multifamily, Industrial, Retail, Office & Hospitality",
  description:
    "Sector-specific commercial real estate underwriting and analytics for multifamily, industrial and logistics, retail, office, hospitality and mixed-use assets across the United States.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Every property type has its own analytical logic"
        description="Income drivers, lease structures and capital requirements differ materially across sectors. Our underwriting reflects those differences rather than applying a generic template."
        crumbs={[{ label: "Industries" }]}
      >
        <div className="mt-7 flex flex-wrap gap-2">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`#${industry.slug}`}
              className="border border-line bg-white px-3 py-1.5 text-[0.6875rem] font-medium text-slate transition-colors hover:border-navy hover:text-navy"
            >
              {industry.navLabel}
            </Link>
          ))}
        </div>
      </PageHero>

      <div className="bg-white">
        {industries.map((industry, index) => {
          const reversed = index % 2 === 1;

          return (
            <section
              key={industry.slug}
              id={industry.slug}
              aria-labelledby={`${industry.slug}-heading`}
              className={cn(
                "border-b border-line py-16 md:py-20 lg:py-24",
                index % 2 === 1 && "bg-ice/30",
              )}
            >
              <div className="container-page">
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
                  {/* Image */}
                  <div
                    className={cn(
                      "lg:col-span-5",
                      reversed ? "lg:order-2 lg:col-start-8" : "lg:order-1",
                    )}
                  >
                    <figure className="lg:sticky lg:top-32">
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy">
                        <Image
                          src={industry.image}
                          alt={industry.imageAlt}
                          fill
                          priority={index === 0}
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="img-tone object-cover"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,43,63,0)_60%,rgba(20,43,63,0.35)_100%)]"
                        />
                        <span className="absolute left-4 top-4 bg-white/95 px-2.5 py-1 text-[0.5625rem] font-semibold uppercase tracking-[0.16em] text-navy">
                          {String(index + 1).padStart(2, "0")} / {industry.navLabel}
                        </span>
                      </div>
                      <figcaption className="mt-3 flex items-start justify-between gap-4 text-[0.625rem] leading-relaxed text-slate/70">
                        <span>Illustrative architectural photography.</span>
                        <span className="shrink-0">Not a DatumCRE project.</span>
                      </figcaption>
                    </figure>
                  </div>

                  {/* Content */}
                  <div
                    className={cn(
                      "lg:col-span-6",
                      reversed ? "lg:order-1 lg:col-start-1" : "lg:col-start-7",
                    )}
                  >
                    <span className="eyebrow">{industry.navLabel}</span>
                    <h2
                      id={`${industry.slug}-heading`}
                      className="heading-section mt-4"
                    >
                      {industry.name}
                    </h2>
                    <p className="lead mt-4">{industry.summary}</p>

                    <div className="mt-6 space-y-3.5">
                      {industry.overview.map((paragraph) => (
                        <p key={paragraph} className="body-copy">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    <div className="mt-9">
                      <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-navy">
                        Relevant financial metrics
                      </h3>
                      <div className="mt-4 border border-line bg-white">
                        <div className="hidden grid-cols-5 border-b border-navy bg-ice px-4 py-2.5 sm:grid">
                          <span className="col-span-2 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-navy">
                            Metric
                          </span>
                          <span className="col-span-3 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-navy">
                            What we examine
                          </span>
                        </div>
                        <dl className="divide-y divide-line">
                          {industry.metrics.map((metric) => (
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

                    <div className="mt-9 grid gap-8 sm:grid-cols-2">
                      <div>
                        <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-navy">
                          Underwriting considerations
                        </h3>
                        <ul className="mt-4 space-y-2.5">
                          {industry.considerations.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-[0.8125rem] leading-[1.6] text-slate"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-[0.55rem] size-1 shrink-0 bg-blue"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-navy">
                          Analytical support
                        </h3>
                        <ul className="mt-4 space-y-2.5">
                          {industry.support.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-[0.8125rem] leading-[1.6] text-slate"
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

                    <div className="mt-9 border-t border-line pt-6">
                      <Link href="/contact" className="link-arrow">
                        Discuss {industry.navLabel.toLowerCase()} requirements
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
          );
        })}
      </div>

      <CTABand
        eyebrow="Sector experience"
        title="Underwriting that reflects the asset, not the template."
        description="Tell us the property type, market and investment strategy. We will outline the analytical framework and the assumptions that typically decide the outcome."
        buttonLabel="Get in Touch"
      />
    </>
  );
}
