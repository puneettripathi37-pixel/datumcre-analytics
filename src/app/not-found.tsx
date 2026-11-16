import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 lg:block"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(29,63,90,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(29,63,90,0.05) 1px, transparent 1px)",
          backgroundSize: "76px 76px",
          maskImage: "linear-gradient(90deg, transparent 0%, black 70%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 70%)",
        }}
      />
      <div className="container-page relative py-20 md:py-28 lg:py-32">
        <div className="max-w-2xl">
          <span className="eyebrow">Error 404</span>
          <h1 className="display-2 mt-5">This page could not be found.</h1>
          <p className="lead mt-5">
            The link may be outdated, or the page may have moved. The sections
            below will take you back to the main parts of the site.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/" variant="primary" withArrow>
              Return Home
            </Button>
            <Button href="/contact" variant="secondary">
              Contact Us
            </Button>
          </div>

          <nav aria-label="Suggested pages" className="mt-12 border-t border-line pt-6">
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Services", href: "/services", detail: "Modelling, analytics, valuation and debt" },
                { label: "Industries", href: "/industries", detail: "Sector-specific underwriting" },
                { label: "Insights", href: "/insights", detail: "Notes on underwriting practice" },
                { label: "About", href: "/about", detail: "Approach and independence" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-start justify-between gap-4 border border-line px-4 py-3.5 transition-colors hover:border-navy"
                  >
                    <span>
                      <span className="block text-[0.8125rem] font-medium text-navy">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-[0.6875rem] text-slate">
                        {item.detail}
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="mt-1 size-3.5 shrink-0 text-slate/50 transition-transform group-hover:translate-x-1"
                      strokeWidth={1.75}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
