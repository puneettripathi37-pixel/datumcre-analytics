import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

const markers = [
  "Multifamily Focused",
  "Institutional Analytical Standards",
  "Independent & Confidential Support",
  "US Market Coverage",
];

/**
 * Illustrative Multifamily model output.
 * Clearly labelled: fictional figures, not client data or a performance claim.
 */
function ModelCard() {
  const rows = [
    { label: "Acquisition price", value: "$42,500,000" },
    { label: "Units", value: "168" },
    { label: "Going-in cap rate", value: "5.75%" },
    { label: "Year 1 NOI", value: "$2,443,750" },
    { label: "Stabilised NOI", value: "$2,980,000" },
    { label: "Levered IRR", value: "14.2%" },
    { label: "Equity multiple", value: "1.94x" },
    { label: "Exit cap rate", value: "6.25%" },
  ];

  return (
    <figure className="w-full max-w-[24rem] border border-line bg-white/95 p-5 shadow-[0_28px_60px_-32px_rgba(20,43,63,0.55)] backdrop-blur-sm sm:p-6">
      <figcaption className="flex items-start justify-between gap-4 border-b border-line pb-4">
        <span className="text-[0.625rem] font-semibold uppercase leading-relaxed tracking-[0.16em] text-blue">
          Illustrative Multifamily model
        </span>
        <span className="mt-0.5 shrink-0 border border-line bg-ice/60 px-2 py-0.5 text-[0.5rem] font-semibold uppercase tracking-[0.12em] text-slate/70">
          Illustrative only
        </span>
      </figcaption>

      <dl className="mt-3 divide-y divide-line/70">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-6 py-1.5"
          >
            <dt className="text-[0.6875rem] text-slate">{row.label}</dt>
            <dd className="tabular text-[0.75rem] font-medium text-navy">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-3 border-t border-line pt-3 text-[0.5625rem] leading-relaxed text-slate/65">
        Fictional figures for layout illustration only. Not a forecast, market
        benchmark, client transaction or representation of investment
        performance.
      </p>
    </figure>
  );
}

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="container-page">
        <div className="grid items-center gap-10 pb-14 pt-10 md:pb-20 md:pt-14 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-6 lg:pr-6">
            <span className="eyebrow animate-fade-up">
              Independent Multifamily Analytics
            </span>

            <h1 className="display-1 mt-6 animate-fade-up delay-1">
              Multifamily Real Estate Analytics.{" "}
              <br />
              <span className="text-blue">
                Built Around Better Investment Decisions.
              </span>
            </h1>

            <p className="lead mt-7 max-w-xl animate-fade-up delay-2">
              Independent financial modelling, acquisition underwriting and
              investment analytics for US Multifamily investors, owners,
              operators and developers.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3 animate-fade-up delay-3">
              <Button href="/contact" variant="primary" withArrow>
                Discuss Your Requirements
              </Button>
              <Button href="/services" variant="secondary">
                Explore Our Services
              </Button>
            </div>

            <ul className="mt-10 grid gap-x-6 gap-y-3 border-t border-line pt-6 animate-fade-up delay-4 sm:grid-cols-2">
              {markers.map((marker) => (
                <li
                  key={marker}
                  className="inline-flex items-start gap-2 text-[0.6875rem] font-medium uppercase leading-snug tracking-[0.1em] text-slate"
                >
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 size-3.5 shrink-0 text-blue"
                    strokeWidth={2}
                  />
                  {marker}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy sm:aspect-[16/10] lg:aspect-[4/5]">
              <Image
                src="/images/industry-multifamily.jpg"
                alt="Garden-style US multifamily apartment community with brick façades, balconies and landscaped walkways"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="img-tone object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(200deg,rgba(29,63,90,0)_40%,rgba(20,43,63,0.32)_100%)]"
              />
            </div>

            <div className="relative z-10 -mt-16 sm:-mt-20 lg:absolute lg:-left-20 lg:bottom-8 lg:mt-0">
              <ModelCard />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Acquisition underwriting", detail: "Rent roll through to IC materials" },
            { label: "Development modelling", detail: "Budget, draws and lease-up" },
            { label: "Valuation support", detail: "DCF and capitalisation analysis" },
            { label: "Portfolio analytics", detail: "Consistent asset-level reporting" },
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
