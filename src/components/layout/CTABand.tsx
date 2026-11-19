import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface CTABandProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}

export function CTABand({
  eyebrow = "Next step",
  title = "Let's Bring Greater Clarity to Your Multifamily Investments.",
  description =
    "Whether you need acquisition underwriting, development modelling, valuation support or portfolio analytics, let's discuss how DatumCRE can support your analytical requirements.",
  buttonLabel = "Discuss Your Requirements",
  buttonHref = "/contact",
  secondaryLabel,
  secondaryHref,
  className,
}: CTABandProps) {
  return (
    <section className={cn("relative overflow-hidden bg-navy", className)}>
      <div aria-hidden="true" className="absolute inset-0 grid-blueprint opacity-70" />
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-40 hidden h-[30rem] w-[30rem] rounded-full border border-white/10 lg:block"
      />
      <div
        aria-hidden="true"
        className="absolute -right-20 -top-24 hidden h-[22rem] w-[22rem] rounded-full border border-white/[0.07] lg:block"
      />
      <div className="container-page relative py-16 md:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <span className="eyebrow text-mist">{eyebrow}</span>
            <h2 className="mt-5 max-w-3xl font-heading text-[clamp(1.75rem,3.3vw,2.75rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-white">
              {title}
            </h2>
            <p className="mt-5 max-w-2xl text-[0.96875rem] leading-[1.75] text-white/70 md:text-base">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 lg:col-span-4 lg:justify-end">
            <Button href={buttonHref} variant="light" withArrow>
              {buttonLabel}
            </Button>
            {secondaryLabel && secondaryHref ? (
              <Button href={secondaryHref} variant="outlineLight">
                {secondaryLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
