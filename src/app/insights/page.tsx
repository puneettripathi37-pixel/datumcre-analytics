import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, Info } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { CTABand } from "@/components/layout/CTABand";
import { buildMetadata } from "@/lib/seo";
import { sortedArticles } from "@/lib/insights";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Insights — Commercial Real Estate Analysis & Underwriting",
  description:
    "Practical notes on commercial real estate underwriting, financial modelling, lending metrics, waterfall structures and valuation assumptions from DatumCRE Analytics.",
  path: "/insights",
});

function DraftBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 border border-blue/30 bg-white/90 px-2 py-1 text-[0.5625rem] font-semibold uppercase tracking-[0.14em] text-blue">
      <span aria-hidden="true" className="size-1.5 bg-blue" />
      Draft
    </span>
  );
}

export default function InsightsPage() {
  const [featured, ...rest] = sortedArticles;

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Notes on the assumptions that decide outcomes"
        description="Practical commentary on underwriting, modelling, lending metrics and valuation — written for the people who have to defend the numbers."
        crumbs={[{ label: "Insights" }]}
      />

      <div className="border-b border-line bg-white">
        <div className="container-page py-6">
          <div className="flex items-start gap-3 border border-dashed border-blue/35 bg-ice/40 px-4 py-3">
            <Info
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-blue"
              strokeWidth={1.75}
            />
            <p className="text-[0.75rem] leading-[1.7] text-slate">
              <strong className="font-semibold text-navy">
                Editorial status:
              </strong>{" "}
              the articles below are working drafts prepared for internal review.
              They are published here as previews and should not be treated as
              final research, advice or a statement of DatumCRE&apos;s current
              views. Each article is labelled accordingly.
            </p>
          </div>
        </div>
      </div>

      <section className="section bg-white">
        <div className="container-page">
          {/* Featured */}
          <article className="group grid gap-0 border border-line lg:grid-cols-12">
            <div className="relative aspect-[16/10] overflow-hidden bg-navy lg:col-span-7 lg:aspect-auto lg:min-h-[26rem]">
              <Link href={`/insights/${featured.slug}`} className="absolute inset-0">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="img-tone object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span className="sr-only">Read {featured.title}</span>
              </Link>
            </div>
            <div className="flex flex-col justify-between p-7 lg:col-span-5 lg:p-10">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-blue">
                    {featured.category}
                  </span>
                  <DraftBadge />
                </div>
                <h2 className="mt-5 font-heading text-[clamp(1.375rem,2.2vw,1.875rem)] font-semibold leading-[1.24] tracking-[-0.025em] text-navy">
                  <Link href={`/insights/${featured.slug}`}>{featured.title}</Link>
                </h2>
                <p className="mt-4 text-[0.875rem] leading-[1.75] text-slate">
                  {featured.excerpt}
                </p>
              </div>

              <div className="mt-8 border-t border-line pt-5">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.6875rem] text-slate/75">
                  <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock aria-hidden="true" className="size-3" strokeWidth={1.75} />
                    {featured.readingTime}
                  </span>
                </div>
                <Link
                  href={`/insights/${featured.slug}`}
                  className="link-arrow mt-4"
                >
                  Read Article
                  <ArrowRight aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
                </Link>
              </div>
            </div>
          </article>

          {/* Grid */}
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((article) => (
              <article key={article.slug} className="group flex flex-col">
                <div className="relative aspect-[3/2] overflow-hidden bg-navy">
                  <Link href={`/insights/${article.slug}`} className="absolute inset-0">
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="img-tone object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="sr-only">Read {article.title}</span>
                  </Link>
                </div>
                <div className="flex flex-1 flex-col border border-t-0 border-line p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-blue">
                      {article.category}
                    </span>
                    <DraftBadge />
                  </div>
                  <h3 className="mt-4 font-heading text-[1.0625rem] font-semibold leading-[1.35] tracking-[-0.01em] text-navy">
                    <Link href={`/insights/${article.slug}`} className="transition-colors hover:text-blue">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="mt-3 flex-1 text-[0.8125rem] leading-[1.7] text-slate">
                    {article.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                    <span className="text-[0.625rem] text-slate/70">
                      {formatDate(article.date)} · {article.readingTime}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 text-slate/50 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:text-blue"
                      strokeWidth={1.75}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Beyond the notes"
        title="Have a live question these articles do not cover?"
        description="If you are working through a specific underwriting, financing or valuation issue, we can discuss how it would be analysed for your transaction."
        buttonLabel="Get in Touch"
      />
    </>
  );
}
