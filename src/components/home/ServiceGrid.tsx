import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { services } from "@/lib/services";
import { cn } from "@/lib/utils";

export function ServiceGrid({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3", className)}>
      {services.map((service, index) => (
        <article
          key={service.slug}
          className={cn(
            "group relative flex flex-col bg-white p-7 transition-colors duration-300 hover:bg-ice/40 md:p-8",
            index === 4 && "lg:col-span-1",
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <ServiceIcon name={service.icon} />
            <span className="tabular text-[0.6875rem] font-medium tracking-[0.16em] text-slate/45">
              {service.number}
            </span>
          </div>

          <h3 className="heading-card mt-6">
            <Link href={`/services#${service.slug}`} className="after:absolute after:inset-0">
              {service.title}
            </Link>
          </h3>

          <p className="mt-3 flex-1 text-[0.875rem] leading-[1.72] text-slate">
            {service.summary}
          </p>

          <ul className="mt-5 space-y-1.5 border-t border-line pt-4">
            {service.capabilities.slice(0, 3).map((capability) => (
              <li
                key={capability}
                className="flex items-start gap-2 text-[0.6875rem] leading-snug text-slate/80"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.45rem] h-px w-2 shrink-0 bg-blue/60"
                />
                {capability}
              </li>
            ))}
          </ul>

          <span className="mt-6 inline-flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-navy transition-colors group-hover:text-blue">
            Learn More
            <ArrowRight
              aria-hidden="true"
              className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
              strokeWidth={1.75}
            />
          </span>
        </article>
      ))}

      <div className="relative hidden flex-col justify-between overflow-hidden bg-navy p-8 lg:flex">
        <div aria-hidden="true" className="absolute inset-0 grid-blueprint opacity-80" />
        <div className="relative">
          <p className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-mist">
            Not sure where to start?
          </p>
          <p className="mt-4 font-heading text-[1.375rem] font-semibold leading-[1.3] tracking-[-0.015em] text-white">
            Describe the decision. We will frame the analysis.
          </p>
        </div>
        <Link
          href="/contact"
          className="relative mt-8 inline-flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:text-mist"
        >
          Start a Conversation
          <ArrowRight aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
        </Link>
      </div>
    </div>
  );
}
