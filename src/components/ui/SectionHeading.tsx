import Link from "next/link";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: { label: string; href: string };
  className?: string;
  titleClassName?: string;
  as?: "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
  className,
  titleClassName,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        action && "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div
        className={cn(
          "max-w-2xl",
          align === "center" && "flex flex-col items-center",
        )}
      >
        {eyebrow ? <span className="eyebrow mb-5">{eyebrow}</span> : null}
        <Heading className={cn("heading-section", titleClassName)}>
          {title}
        </Heading>
        {description ? (
          <p className={cn("lead mt-5", align === "center" && "max-w-xl")}>
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="link-arrow shrink-0 md:mb-2"
        >
          <span>{action.label}</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="size-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M2 8h11M9 3.5 13.5 8 9 12.5" />
          </svg>
        </Link>
      ) : null}
    </div>
  );
}
