import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ArrowLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceGrid } from "@/components/home/ServiceGrid";
import { founder } from "@/lib/founder";
import { multifamily } from "@/lib/industries";

const differentiators = [
  {
    title: "Multifamily Specialisation",
    body: "Focused understanding of apartment investment economics and the operating assumptions that drive value.",
  },
  {
    title: "Transparent Financial Models",
    body: "Structured Excel models with traceable assumptions, separated inputs and visible calculations.",
  },
  {
    title: "Investment-Oriented Analysis",
    body: "Focus on cash flow, NOI, returns, capital structure and downside risk — not presentation for its own sake.",
  },
  {
    title: "Independent Analytical Support",
    body: "Objective modelling without brokerage, lending or product-selling incentives.",
  },
  {
    title: "Flexible Engagements",
    body: "Project-based assignments and recurring analytical support, scoped around the decision and timetable.",
  },
  {
    title: "Confidentiality & Quality",
    body: "Documented assumptions, model checks and professional handling of client information.",
  },
];

const approach = [
  {
    step: "01",
    title: "Scope",
    body: "We clarify the investment decision, the audience and the constraints, then agree the analytical framework and deliverables.",
  },
  {
    step: "02",
    title: "Structure",
    body: "Assumptions are gathered and documented, with sources noted and information gaps flagged early rather than resolved silently.",
  },
  {
    step: "03",
    title: "Analyse",
    body: "The model is built, tested and sensitised. Outputs are reconciled to source data and checked on a per-unit basis.",
  },
  {
    step: "04",
    title: "Communicate",
    body: "Findings are presented with the underlying assumptions, the range of outcomes and the risks that matter most.",
  },
];

export function HomeContent() {
  return (
    <>
      {/* ---------------------------------------------------------------- Intro */}
      <section className="section bg-white">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <span className="eyebrow">Introduction</span>
              <h2 className="heading-section mt-5">
                Your Multifamily Analytical Partner
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="lead">
                DatumCRE Analytics provides specialised financial modelling,
                underwriting and investment analytics to Multifamily real estate
                professionals across the United States.
              </p>
              <p className="body-copy mt-5">
                We work alongside investment, asset management and finance teams
                to strengthen analytical capacity, improve underwriting
                transparency and support informed investment decisions.
              </p>
              <p className="body-copy mt-4">
                From acquisition underwriting and development modelling to
                valuation support and portfolio reporting, our work is built
                around the financial drivers that matter most to Multifamily
                investments.
              </p>

              <dl className="mt-9 grid gap-px border border-line bg-line sm:grid-cols-3">
                {[
                  { term: "Multifamily", detail: "One sector, analysed in depth" },
                  { term: "Independent", detail: "No brokerage or lending interest" },
                  { term: "Confidential", detail: "Client information handled as private" },
                ].map((item) => (
                  <div key={item.term} className="bg-white p-5">
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-navy">
                      {item.term}
                    </dt>
                    <dd className="mt-2 text-[0.75rem] leading-[1.6] text-slate">
                      {item.detail}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8">
                <ArrowLink href="/about">About DatumCRE</ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- Services */}
      <section id="services" className="section border-t border-line bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Services"
            title="Analytical support across the Multifamily investment lifecycle"
            description="Five specialist disciplines covering acquisition, development, valuation, portfolio management and financing — delivered as standalone engagements or ongoing analytical support."
            action={{ label: "All Services", href: "/services" }}
          />
          <ServiceGrid className="mt-12" />
        </div>
      </section>

      {/* ---------------------------------------------------------- Why DatumCRE */}
      <section className="section border-y border-line bg-ice/50">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <span className="eyebrow">Why DatumCRE</span>
              <h2 className="heading-section mt-5">
                Analytical Precision. Multifamily Perspective.
              </h2>
              <p className="body-copy mt-5">
                A model is only useful if it can be trusted, explained and
                defended. Our work is built around those three requirements.
              </p>
              <div className="mt-8">
                <ArrowLink href="/about">Our Approach</ArrowLink>
              </div>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {differentiators.map((item, index) => (
                  <div key={item.title} className="border-t border-navy/15 pt-5">
                    <div className="flex items-baseline gap-3">
                      <span className="tabular text-[0.625rem] font-semibold tracking-[0.16em] text-blue">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-heading text-[0.9375rem] font-semibold leading-snug text-navy">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-2.5 text-[0.8125rem] leading-[1.7] text-slate">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Multifamily */}
      <section className="section bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Multifamily"
            title="One sector. The full operating picture."
            description="Apartment investments are driven by unit-level revenue, a granular expense base and a capital plan. Our analysis reflects those drivers rather than applying a generic real estate template."
            action={{ label: "Explore Multifamily", href: "/multifamily" }}
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <figure>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy">
                  <Image
                    src={multifamily.image}
                    alt={multifamily.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="img-tone object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-[0.625rem] leading-relaxed text-slate/65">
                  Illustrative architectural photography. Not a DatumCRE project
                  or client asset.
                </figcaption>
              </figure>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-navy">
                Analytical focus
              </h3>
              <ul className="mt-4 space-y-3">
                {multifamily.considerations.slice(0, 6).map((item) => (
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

              <div className="mt-8 flex flex-wrap gap-2">
                {multifamily.segments.slice(0, 6).map((segment) => (
                  <span
                    key={segment.name}
                    className="border border-line bg-ice/40 px-2.5 py-1.5 text-[0.625rem] font-medium uppercase tracking-[0.08em] text-slate"
                  >
                    {segment.name}
                  </span>
                ))}
              </div>

              <div className="mt-8">
                <ArrowLink href="/multifamily">
                  Multifamily analytics and underwriting
                </ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- Approach */}
      <section className="section border-t border-line bg-white">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <span className="eyebrow">Approach</span>
              <h2 className="heading-section mt-5">
                A disciplined process, from scope to decision
              </h2>
              <p className="body-copy mt-5">
                Clear scope and documented assumptions are not administrative
                overhead. They are what make an analytical conclusion defensible
                when it is tested.
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <ol className="grid gap-px border border-line bg-line sm:grid-cols-2">
                {approach.map((item) => (
                  <li key={item.step} className="bg-white p-6 md:p-7">
                    <span className="tabular text-[0.6875rem] font-semibold tracking-[0.18em] text-blue">
                      {item.step}
                    </span>
                    <h3 className="mt-4 font-heading text-[1.0625rem] font-semibold text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[0.8125rem] leading-[1.7] text-slate">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- Founder */}
      <section className="border-t border-line bg-ice/40 py-14 md:py-16">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
            <div className="lg:col-span-4">
              <span className="eyebrow">Founder</span>
              <h2 className="heading-section mt-5">
                {founder.name}
              </h2>
              <p className="mt-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-blue">
                {founder.role}
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <blockquote className="border-l-2 border-blue pl-6">
                <p className="font-heading text-[1.0625rem] font-medium leading-[1.65] text-navy">
                  “{founder.philosophy}”
                </p>
              </blockquote>
              <div className="mt-6">
                <Link href="/about#founder" className="link-arrow">
                  Read the founder profile
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
    </>
  );
}
