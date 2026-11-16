import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

const markers = [
  "Independent analysis",
  "Institutional standards",
  "US commercial real estate",
];

/**
 * Illustrative model output.
 * Deliberately labelled: it is a structural example, not client data or a
 * performance claim.
 */
function ModelCard() {
  const rows = [
    { label: "Purchase price", value: "$42,500,000" },
    { label: "Going-in cap rate", value: "5.75%" },
    { label: "Levered IRR (base)", value: "14.2%" },
    { label: "Equity multiple", value: "1.94x" },
    { label: "Exit cap rate", value: "6.25%" },
  ];

  return (
    <figure className="w-full max-w-[23rem] border border-line bg-white/95 p-6 shadow-[0_28px_60px_-32px_rgba(20,43,63,0.55)] backdrop-blur-sm">
      <figcaption className="flex items-center justify-between gap-3 border-b border-line pb-4">
        <span className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-blue">
          Illustrative model output
        </span>
        <span className="text-[0.5625rem] uppercase tracking-[0.12em] text-slate/60">
          Not client data
        </span>
      </figcaption>
      <dl className="mt-4 divide-y divide-line/80">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-6 py-2.5">
            <dt className="text-[0.75rem] text-slate">{row.label}</dt>
            <dd className="tabular text-[0.8125rem] font-medium text-navy">{row.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-[0.625rem] leading-relaxed text-slate/70">
        Example structure for illustration only. Figures are not a forecast,
        benchmark or representation of any investment.
      </p>
    </figure>
  );
}

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="container-page">
        <div className="grid items-stretch gap-12 pb-14 pt-12 md:pb-20 md:pt-16 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-20">
          <div className="flex flex-col justify-center lg:col-span-6 lg:pr-8">
            <span className="eyebrow animate-fade-up">DatumCRE Analytics</span>

            <h1 className="display-1 mt-6 animate-fade-up delay-1">
              Clarity in Numbers.
              <br />
              <span className="text-blue">Confidence in Decisions.</span>
            </h1>

            <p className="lead mt-7 max-w-xl animate-fade-up delay-2">
              Independent commercial real estate financial modelling,
              underwriting and investment analytics for informed real estate
              decisions.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3 animate-fade-up delay-3">
              <Button href="/contact" variant="primary" withArrow>
                Discuss Your Requirements
              </Button>
              <Button href="/services" variant="secondary">
                Explore Our Services
              </Button>
            </div>

            <ul className="mt-11 flex flex-wrap gap-x-7 gap-y-3 border-t border-line pt-6 animate-fade-up delay-4">
              {markers.map((marker) => (
                <li
                  key={marker}
                  className="inline-flex items-center gap-2 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-slate"
                >
                  <Check aria-hidden="true" className="size-3.5 text-blue" strokeWidth={2} />
                  {marker}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative lg:col-span-6">
            <div className="relative h-[22rem] w-full overflow-hidden sm:h-[28rem] lg:h-full lg:min-h-[34rem]">
              <Image
                src="/images/hero-architecture.jpg"
                alt="Corner of a contemporary glass and stone commercial office tower against a deep blue sky"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="img-tone object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(200deg,rgba(29,63,90,0)_35%,rgba(20,43,63,0.30)_100%)]"
              />
            </div>

            <div className="relative -mt-16 ml-0 hidden pl-0 sm:-mt-20 sm:block lg:absolute lg:-left-16 lg:bottom-8 lg:mt-0 lg:pl-0">
              <ModelCard />
            </div>
          </div>
        </div>

        <div className="block pb-10 sm:hidden">
          <ModelCard />
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Acquisition underwriting", detail: "Screening through to IC materials" },
            { label: "Development modelling", detail: "Phased cash flow and capital calls" },
            { label: "Debt & loan sizing", detail: "DSCR, LTV and debt yield analysis" },
            { label: "Portfolio analytics", detail: "Consistent performance measurement" },
          ].map((item) => (
            <div key={item.label} className="bg-white px-1 py-5 sm:px-6">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-navy">
                {item.label}
              </p>
              <p className="mt-1.5 text-[0.75rem] text-slate">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
