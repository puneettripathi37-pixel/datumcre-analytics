import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({
  items,
  tone = "dark",
}: {
  items: Crumb[];
  tone?: "dark" | "light";
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol
        className={cn(
          "flex flex-wrap items-center gap-2 text-[0.6875rem] uppercase tracking-[0.14em]",
          tone === "dark" ? "text-slate/80" : "text-white/60",
        )}
      >
        <li>
          <Link
            href="/"
            className={cn(
              "transition-colors",
              tone === "dark" ? "hover:text-navy" : "hover:text-white",
            )}
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              <ChevronRight
                aria-hidden="true"
                className="size-3 opacity-50"
                strokeWidth={1.5}
              />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors",
                    tone === "dark" ? "hover:text-navy" : "hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(
                    tone === "dark" ? "text-navy" : "text-white",
                  )}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
