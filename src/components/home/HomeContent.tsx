import { ArrowLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceGrid } from "@/components/home/ServiceGrid";
import { IndustryCards } from "@/components/home/IndustryCards";

const differentiators = [
  {
    title: "Structured and transparent models",
    body: "Inputs, calculations and outputs are separated, documented and traceable to a source assumption — so the model can be reviewed, challenged and maintained.",
  },
  {
    title: "Detailed assumption analysis",
    body: "Every material assumption is identified, evidenced where possible, and sensitised where it is not. The output is a range of outcomes, not a single number.",
  },
  {
    title: "Investment-focused insight",
    body: "Analysis is framed around the decision: pricing discipline, capital structure, downside exposure and what would have to be true for the investment to underperform.",
  },
  {
    title: "Flexible analytical support",
    body: "Engagements range from a single model build to recurring portfolio reporting, structured around your timetable rather than a fixed service package.",
  },
  {
    title: "Quality-focused deliverables",
    body: "Internal consistency checks, cross-referencing and second review are part of the process. Deliverables are built to be read by investment committees.",
  },
  {
    title: "Confidential handling",
    body: "Client information is treated as confidential by default. Access is limited to the work required, and no client detail is published or reused.",
  },
];

const approach = [
  {
    step: "01",
    title: "Scope",
    body: "We clarify the decision, the audience and the constraints, then agree the analytical framework and deliverables before work begins.",
  },
  {
    step: "02",
    title: "Structure",
    body: "Assumptions are gathered and documented, with sources noted and gaps flagged early rather than resolved silently.",
  },
  {
    step: "03",
    title: "Analyse",
    body: "The model is built, tested and sensitised. Outputs are reconciled against source data and sanity-checked on a per-unit or per-square-foot basis.",
  },
  {
    step: "04",
    title: "Communicate",
    body: "Findings are presented with the underlying assumptions, the range of outcomes, and a clear view of the risks that matter.",
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
                Your Analytical Partner in Commercial Real Estate
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="lead">
                DatumCRE Analytics provides structured financial analysis,
                underwriting support and investment modelling services to real
                estate professionals seeking reliable analytical resources and
                greater clarity in their investment decisions.
              </p>
              <p className="body-copy mt-5">
                We work alongside investment, asset management and finance teams
                across the United States — extending analytical capacity without
                adding permanent headcount, and applying institutional standards
                to every model, schedule and report we produce.
              </p>

              <dl className="mt-9 grid gap-px border border-line bg-line sm:grid-cols-3">
                {[
                  { term: "Independent", detail: "No product, brokerage or lending interest" },
                  { term: "Analytical", detail: "Assumption-led, not template-led" },
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
            title="Analytical support across the investment lifecycle"
            description="Five connected disciplines covering acquisition, development, financing, valuation and reporting — delivered as standalone engagements or ongoing analytical support."
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
                Analytical Precision. Investment Perspective.
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

      {/* ----------------------------------------------------------- Industries */}
      <section className="section bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Industries"
            title="Sector-aware underwriting"
            description="Assumptions that hold for one property type rarely transfer cleanly to another. Our analysis reflects the income drivers, lease structures and capital requirements specific to each sector."
            action={{ label: "Explore Industries", href: "/industries" }}
          />
          <IndustryCards className="mt-12" />
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
    </>
  );
}
