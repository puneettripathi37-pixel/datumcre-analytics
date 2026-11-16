import { cn } from "@/lib/utils";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  crumbs: Crumb[];
  children?: React.ReactNode;
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-line bg-[linear-gradient(180deg,#f4f8f8_0%,#ffffff_78%)]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-0 hidden h-full w-[38%] opacity-[0.5] lg:block"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(29,63,90,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(29,63,90,0.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 45%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 45%, black 100%)",
        }}
      />
      <div className="container-page relative pb-14 pt-8 md:pb-20 md:pt-10 lg:pb-24">
        <Breadcrumbs items={crumbs} />
        <div className="mt-9 grid gap-8 lg:mt-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <span className="eyebrow">{eyebrow}</span>
            <h1 className="display-2 mt-5 max-w-[19ch]">{title}</h1>
          </div>
          {description || children ? (
            <div className="lg:col-span-5 lg:pt-12">
              {description ? <p className="lead">{description}</p> : null}
              {children}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
