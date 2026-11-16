import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { industries } from "@/lib/industries";
import { cn } from "@/lib/utils";

export function IndustryCards({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {industries.map((industry) => (
        <Link
          key={industry.slug}
          href={`/industries#${industry.slug}`}
          className="group relative block overflow-hidden bg-navy"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={industry.image}
              alt={industry.imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="img-tone object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,43,63,0.05)_0%,rgba(20,43,63,0.35)_48%,rgba(20,43,63,0.88)_100%)] transition-opacity duration-500 group-hover:opacity-95"
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h3 className="font-heading text-[1.0625rem] font-semibold tracking-[-0.01em] text-white">
                  {industry.name}
                </h3>
                <p className="mt-2 max-w-[26ch] text-[0.75rem] leading-[1.6] text-white/65">
                  {industry.summary}
                </p>
              </div>
              <span className="flex size-9 shrink-0 items-center justify-center border border-white/25 text-white transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-navy">
                <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
