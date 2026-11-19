import {
  Calculator,
  ChartLine,
  Construction,
  Landmark,
  Percent,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIconKey } from "@/lib/services";
import { cn } from "@/lib/utils";

const icons: Record<ServiceIconKey, LucideIcon> = {
  acquisition: Calculator,
  development: Construction,
  valuation: Landmark,
  portfolio: ChartLine,
  debt: Percent,
};

interface ServiceIconProps {
  name: ServiceIconKey;
  className?: string;
  size?: "sm" | "md";
}

export function ServiceIcon({ name, className, size = "md" }: ServiceIconProps) {
  const Icon = icons[name];

  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center border border-line bg-white text-navy transition-colors duration-200",
        size === "md" ? "size-12" : "size-10",
        className,
      )}
    >
      <Icon strokeWidth={1.4} className={size === "md" ? "size-[22px]" : "size-[18px]"} />
    </span>
  );
}
