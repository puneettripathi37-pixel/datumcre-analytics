"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, MapPin, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { primaryNav, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <div className="hidden border-b border-white/10 bg-navy-deep lg:block">
        <div className="container-page flex h-9 items-center justify-between">
          <p className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-white/55">
            Independent Commercial Real Estate Analytics
          </p>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 text-[0.625rem] font-medium uppercase tracking-[0.18em] text-white/55">
              <MapPin aria-hidden="true" className="size-3" strokeWidth={1.5} />
              United States
            </span>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-white/85 transition-colors hover:text-white"
            >
              Discuss Your Requirements
              <ArrowUpRight
                aria-hidden="true"
                className="size-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.75}
              />
            </Link>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b border-line bg-white/[0.97] backdrop-blur-md transition-shadow duration-300",
          scrolled ? "shadow-[0_10px_34px_-24px_rgba(23,43,58,0.45)]" : "",
        )}
      >
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-6 lg:h-[5.25rem]">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "relative inline-block py-2 text-[0.8125rem] font-medium tracking-[0.01em] transition-colors",
                      isActive(item.href)
                        ? "text-navy"
                        : "text-slate hover:text-navy",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-0 -bottom-px h-px origin-left bg-navy transition-transform duration-300",
                        isActive(item.href) ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              href="/contact"
              variant="primary"
              className="hidden px-5 py-3.5 xl:inline-flex"
            >
              Start a Conversation
            </Button>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex size-11 items-center justify-center border border-line text-navy transition-colors hover:border-navy lg:hidden"
            >
              {open ? (
                <X aria-hidden="true" className="size-5" strokeWidth={1.5} />
              ) : (
                <Menu aria-hidden="true" className="size-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        <div
          id="mobile-navigation"
          hidden={!open}
          className="border-t border-line bg-white lg:hidden"
        >
          <nav aria-label="Mobile primary" className="container-page py-2">
            <ul className="divide-y divide-line">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between py-4 text-[0.9375rem] font-medium",
                      isActive(item.href) ? "text-blue" : "text-navy",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 text-slate/60"
                      strokeWidth={1.5}
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="py-5">
              <Button
                href="/contact"
                variant="primary"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Discuss Your Requirements
              </Button>
              <p className="mt-4 text-center text-[0.75rem] text-slate">
                {siteConfig.region} · Independent analytical support
              </p>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
