import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
  href?: string;
}

/**
 * Temporary text-based wordmark (no logo asset supplied).
 * Replace with the official DatumCRE lockup when available.
 */
export function Logo({ variant = "dark", className, href = "/" }: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link
      href={href}
      aria-label="DatumCRE Analytics — home"
      className={cn("group inline-flex items-stretch gap-3", className)}
    >
      <span
        aria-hidden="true"
        className={cn(
          "mt-[3px] w-px self-stretch",
          isLight ? "bg-white/30" : "bg-line",
        )}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading text-[1.1875rem] font-semibold tracking-[0.17em] transition-colors sm:text-[1.3125rem]",
            isLight ? "text-white" : "text-navy",
          )}
        >
          DATUMCRE
        </span>
        <span
          className={cn(
            "mt-[0.4rem] text-[0.5rem] font-semibold tracking-[0.44em] sm:text-[0.5625rem]",
            isLight ? "text-mist" : "text-blue",
          )}
        >
          ANALYTICS
        </span>
      </span>
    </Link>
  );
}
