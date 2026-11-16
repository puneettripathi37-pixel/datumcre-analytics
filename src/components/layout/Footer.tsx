import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { footerNav, siteConfig } from "@/lib/site";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white">
      <div className="container-page">
        <div className="grid gap-12 py-14 md:py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-7 max-w-xs text-[0.875rem] leading-[1.75] text-white/60">
              Independent commercial real estate financial modelling,
              underwriting and investment analytics for informed real estate
              decisions.
            </p>

            <dl className="mt-8 space-y-4 text-[0.8125rem]">
              <div className="flex items-start gap-3">
                <Mail
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-mist"
                  strokeWidth={1.5}
                />
                <div>
                  <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-white/40">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${siteConfig.contactEmail}`}
                      className="text-white/80 transition-colors hover:text-white"
                    >
                      {siteConfig.contactEmail}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-mist"
                  strokeWidth={1.5}
                />
                <div>
                  <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-white/40">
                    Coverage
                  </dt>
                  <dd className="mt-1 text-white/80">
                    United States · Remote-first engagements
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
            <div>
              <h2 className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-white/40">
                Services
              </h2>
              <ul className="mt-5 space-y-3">
                {footerNav.services.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[0.8125rem] leading-snug text-white/65 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-white/40">
                Industries
              </h2>
              <ul className="mt-5 space-y-3">
                {footerNav.industries.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[0.8125rem] leading-snug text-white/65 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-white/40">
                Company
              </h2>
              <ul className="mt-5 space-y-3">
                {footerNav.company.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[0.8125rem] leading-snug text-white/65 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-7 inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-mist transition-colors hover:text-white"
              >
                Start a Conversation
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-3.5"
                  strokeWidth={1.75}
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-8">
          <p className="max-w-4xl text-[0.6875rem] leading-[1.7] text-white/35">
            {siteConfig.legalDisclaimer}
          </p>
          <div className="mt-6 flex flex-col gap-3 text-[0.6875rem] text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <Link
                href="/privacy"
                className="transition-colors hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                href="/contact"
                className="transition-colors hover:text-white"
              >
                Contact
              </Link>
              <span className="hidden text-white/25 sm:inline">
                Clarity in Numbers. Confidence in Decisions.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
