import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "light" | "outlineLight";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  name?: string;
  onClick?: () => void;
  "aria-label"?: string;
}

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  light: "btn-light",
  outlineLight: "btn-outline-light",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  withArrow = false,
  external = false,
  type = "button",
  disabled,
  name,
  onClick,
  ...rest
}: ButtonProps) {
  const classes = cn("btn group/btn", variantClass[variant], className);
  const icon = withArrow ? (
    external ? (
      <ArrowUpRight
        aria-hidden="true"
        className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
        strokeWidth={1.75}
      />
    ) : (
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-200 group-hover/btn:translate-x-1"
        strokeWidth={1.75}
      />
    )
  ) : null;

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        aria-label={rest["aria-label"]}
        onClick={onClick}
      >
        <span>{children}</span>
        {icon}
      </Link>
    );
  }

  return (
    <button
      type={type}
      name={name}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      aria-label={rest["aria-label"]}
    >
      <span>{children}</span>
      {icon}
    </button>
  );
}

interface ArrowLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  tone?: "navy" | "light";
}

export function ArrowLink({
  href,
  children,
  className,
  tone = "navy",
}: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "link-arrow",
        tone === "light" && "text-white hover:text-mist",
        className,
      )}
    >
      <span>{children}</span>
      <ArrowRight aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
    </Link>
  );
}
