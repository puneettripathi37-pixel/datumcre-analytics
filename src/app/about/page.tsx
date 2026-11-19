import type { Metadata } from "next";
import Image from "next/image";
import {
  Building2,
  ChartNoAxesCombined,
  Check,
  FileSpreadsheet,
  Layers,
  Scale,
  ShieldCheck,
  Target,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { CTABand } from "@/components/layout/CTABand";
import { ArrowLink } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import { founder } from "@/lib/founder";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "About DatumCRE — Independent Multifamily Analytics",
  description:
    "DatumCRE Analytics is an independent Multifamily real estate analytics practice founded by Puneet Tripathi, providing financial modelling, underwriting, valuation support and portfolio analytics to US real estate professionals.",
  path: "/about",
  image: "/images/industry-multifamily.jpg",
  imageAlt:
    "US multifamily apartment community with brick façades and landscaped grounds",
});

const disciplines = [
  {
    icon: Building2,
    title: "Multifamily acquisition underwriting",
    body: "Rent roll and T-12 analysis, normalised NOI, pricing and return analysis for apartment acquisitions.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Development & investment modelling",
    body: "Development budgets, sources and uses, construction cash flow, lease-up and JV waterfall modelling.",
  },
  {
    icon: FileSpreadsheet,
    title: "Rent roll & T-12 analysis",
    body: "Unit-level revenue reconstruction, loss to lease, concessions and operating expense normalisation.",
  },
  {
    icon: Target,
    title: "Valuation & DCF support",
    body: "Direct capitalisation, discounted cash flow and sensitivity analysis to support internal marks and pricing.",
  },
  {
    icon: Layers,
    title: "Portfolio analytics",
    body: "Consistent performance measurement, variance analysis and capital tracking across apartment portfolios.",
  },
  {
    icon: Scale,
    title: "Debt & financing analysis",
    body: "DSCR, debt yield, LTV and loan sizing analysis across base and stressed operating scenarios.",
  },
];

const principles = [
  {
    title: "Assumptions are the analysis",
    body: "Sophisticated arithmetic cannot rescue a weak assumption. We spend the time on the input set: what it is, where it came from, and what happens if it is wrong.",
  },
  {
    title: "Transparency over polish",
    body: "A model that hides its logic behind a clean dashboard is not useful in diligence. Inputs, calculations and outputs are kept visibly separate.",
  },
  {
    title: "Scope clarity before work begins",
    body: "We agree the decision, the deliverables and the timetable in writing. This protects both the quality of the output and the client's budget.",
  },
  {
    title: "Independent by design",
    body: "We hold no brokerage, lending or product interest in the transactions we analyse. The conclusion follows the analysis, not a commercial incentive.",
  },
];

function FounderPortrait() {
  if (founder.imageEnabled) {
    return (
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-navy">
        <Image
          src={founder.image}
          alt={founder.imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="img-tone object-cover"
        />
      </div>
    );
  }

  return (
    <div className="relative flex aspect-[4/5] w-full flex-col justify-between overflow-hidden bg-navy p-8 text-white">
      <div aria-hidden="true" className="absolute inset-0 grid-blueprint opacity-70" />
      <div
        aria-hidden="true"
        className="absolute -right-20 -top-20 size-64 rounded-full border border-white/10"
      />
      <div className="relative">
        <span className="text-[0.5625rem] font-semibold uppercase tracking-[0.2em] text-mist">
          DatumCRE Analytics
        </span>
      </div>
      <div className="relative">
        <span className="font-heading text-[5.5rem] font-semibold leading-none tracking-[-0.06em] text-white/90">
          PT
        </span>
        <p className="mt-6 font-heading text-[1.25rem] font-semibold text-white">
          {founder.name}
        </p>
        <p className="mt-1 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-mist">
          {founder.role}
        </p>
      </div>
      <div className="relative border-t border-white/15 pt-4">
        <p className="text-[0.6875rem] leading-relaxed text-white/60">
          Independent Multifamily real estate analytics · {siteConfig.region}
        </p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About DatumCRE"
        title="Independent Multifamily Analytics. Institutional Discipline."
        description="An independent Multifamily analytics practice built to give investment, asset management and finance teams reliable, transparent analytical capacity."
        crumbs={[{ label: "About" }]}
      />

      {/* Mission */}
      <section className="section bg-white">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <span className="eyebrow">Mission</span>
              <blockquote className="mt-6 border-l-2 border-blue pl-6">
                <p className="font-heading text-[clamp(1.25rem,2.1vw,1.625rem)] font-medium leading-[1.5] tracking-[-0.02em] text-navy">
                  To make high-quality Multifamily financial analysis,
                  underwriting and investment modelling accessible to US real
                  estate professionals through reliable, independent and flexible
                  analytical support.
                </p>
              </blockquote>

              <div className="mt-8 space-y-4">
                <p className="body-copy">
                  Multifamily investment decisions are made under time pressure,
                  with incomplete information and a small number of assumptions
                  that determine most of the outcome. The analytical work behind
                  those decisions is often compressed into whatever time the deal
                  timetable allows.
                </p>
                <p className="body-copy">
                  DatumCRE Analytics exists to provide a more disciplined
                  alternative: structured, documented analysis delivered by
                  someone who works on Multifamily underwriting and modelling
                  directly, without the overhead of a permanent hire or the
                  variability of an unstructured freelance arrangement.
                </p>
                <p className="body-copy">
                  We work with US-based Multifamily investment firms, private
                  equity funds, owners and operators, asset managers, developers
                  and sponsors, and real estate debt teams — as an extension of
                  their existing analytical capability.
                </p>
              </div>

              <div className="mt-9 flex flex-wrap gap-6">
                <ArrowLink href="/services">Explore Our Services</ArrowLink>
                <ArrowLink href="/contact">Discuss Your Requirements</ArrowLink>
              </div>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <figure>
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-navy lg:sticky lg:top-32">
                  <Image
                    src="/images/industry-multifamily.jpg"
                    alt="US multifamily apartment community with brick façades, balconies and landscaped grounds"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="img-tone object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-[0.625rem] leading-relaxed text-slate/70">
                  Illustrative architectural photography — not a property or
                  client asset associated with DatumCRE Analytics.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section id="founder" className="section border-y border-line bg-ice/40">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <span className="eyebrow">Founder</span>
              <div className="mt-6 max-w-sm">
                <FounderPortrait />
              </div>
              <div className="mt-6">
                <h2 className="heading-section">{founder.name}</h2>
                <p className="mt-3 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-blue">
                  {founder.role}
                </p>
                <p className="mt-4 text-[0.8125rem] leading-[1.7] text-slate">
                  {siteConfig.region} · Independent analytical support
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <div className="space-y-4">
                {founder.biography.map((paragraph) => (
                  <p key={paragraph} className="body-copy">
                    {paragraph}
                  </p>
                ))}
              </div>

              <dl className="mt-9 divide-y divide-line border-y border-line">
                {founder.qualifications.map((item) => (
                  <div
                    key={item.label}
                    className="grid gap-1 py-3.5 sm:grid-cols-3 sm:gap-4"
                  >
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-slate/70">
                      {item.label}
                    </dt>
                    <dd className="text-[0.8125rem] leading-[1.6] text-slate sm:col-span-2">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10">
                <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-navy">
                  Areas of expertise
                </h3>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {founder.expertise.map((item) => (
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

              <div className="mt-10 border-l-2 border-blue pl-6">
                <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-navy">
                  A note on the philosophy behind DatumCRE
                </h3>
                <p className="mt-3 font-heading text-[1.0625rem] font-medium leading-[1.65] text-navy">
                  “{founder.philosophy}”
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disciplines */}
      <section className="section bg-white">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <span className="eyebrow">What we do</span>
              <h2 className="heading-section mt-5">
                Analytical disciplines, applied with consistency
              </h2>
              <p className="body-copy mt-5">
                Our work sits across six connected Multifamily disciplines. Most
                engagements draw on more than one.
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
                {disciplines.map((discipline) => {
                  const Icon = discipline.icon;
                  return (
                    <div key={discipline.title} className="bg-white p-6">
                      <Icon
                        aria-hidden="true"
                        className="size-5 text-blue"
                        strokeWidth={1.5}
                      />
                      <h3 className="mt-4 font-heading text-[0.9375rem] font-semibold leading-snug text-navy">
                        {discipline.title}
                      </h3>
                      <p className="mt-2 text-[0.8125rem] leading-[1.7] text-slate">
                        {discipline.body}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="section border-y border-line bg-ice/40">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <span className="eyebrow">Analytical philosophy</span>
              <h2 className="heading-section mt-5">
                How we think about the work
              </h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {principles.map((principle, index) => (
                  <div key={principle.title} className="border-t border-navy/15 pt-5">
                    <div className="flex items-baseline gap-3">
                      <span className="tabular text-[0.625rem] font-semibold tracking-[0.16em] text-blue">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-heading text-[0.9375rem] font-semibold text-navy">
                        {principle.title}
                      </h3>
                    </div>
                    <p className="mt-2.5 text-[0.8125rem] leading-[1.7] text-slate">
                      {principle.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Independence / scope */}
      <section className="section bg-white">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <span className="eyebrow">Independence & scope</span>
              <h2 className="heading-section mt-5">
                Clear boundaries, stated plainly
              </h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <div className="grid gap-px border border-line bg-line">
                {[
                  {
                    icon: ShieldCheck,
                    title: "What we provide",
                    body: "Independent Multifamily analytical, modelling and research support, prepared from client-supplied information and documented assumptions. Deliverables are decision-support tools intended for review by the client and its professional advisers.",
                  },
                  {
                    icon: Scale,
                    title: "What we do not provide",
                    body: "Investment advice or recommendations, securities advice, legal, tax or accounting advice, formal appraisal opinions, or lending commitments. DatumCRE Analytics is not a registered investment adviser, broker-dealer, lender or appraiser.",
                  },
                  {
                    icon: Check,
                    title: "How information is handled",
                    body: "Client materials are treated as confidential by default and are not published, reused or shared beyond the work required. Engagements are subject to agreed confidentiality terms where required.",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="bg-white p-6 md:p-7">
                      <div className="flex items-center gap-3">
                        <Icon
                          aria-hidden="true"
                          className="size-4 text-blue"
                          strokeWidth={1.75}
                        />
                        <h3 className="font-heading text-[0.9375rem] font-semibold text-navy">
                          {item.title}
                        </h3>
                      </div>
                      <p className="mt-3 text-[0.8125rem] leading-[1.7] text-slate">
                        {item.body}
                      </p>
                    </div>
                  );
                })}
              </div>

              <p className="mt-6 text-[0.6875rem] leading-relaxed text-slate/65">
                {siteConfig.legalDisclaimer}
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Work with us"
        title="Let's discuss the Multifamily analysis you need."
        description="Whether you are evaluating a single acquisition or building a repeatable reporting process, we can outline a scope that fits the decision and the timetable."
        buttonLabel="Discuss Your Requirements"
        secondaryLabel="View Services"
        secondaryHref="/services"
      />
    </>
  );
}
