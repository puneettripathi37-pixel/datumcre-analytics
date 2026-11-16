import {
  Calculator,
  ChartLine,
  FileSpreadsheet,
  Landmark,
  Percent,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIconKey } from "@/lib/services";
import { cn } from "@/lib/utils";

const icons: Record<ServiceIconKey, LucideIcon> = {
  model: Calculator,
  analytics: ChartLine,
  valuation: Landmark,
  debt: Percent,
  reporting: FileSpreadsheet,
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
