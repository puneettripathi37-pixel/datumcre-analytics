import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Disclaimer",
  description:
    "Important information about the scope of DatumCRE Analytics services and the limitations of the analysis published on this website.",
  path: "/disclaimer",
});

const sections = [
  {
    id: "analytical-support",
    title: "1. Analytical and modelling support only",
    paragraphs: [
      "DatumCRE Analytics provides independent analytical and modelling support for US Multifamily real estate. Our work is intended to assist clients and their professional advisers in evaluating financial information, investment assumptions and transaction structures.",
      "We do not provide investment, securities, legal, tax or accounting advice, lending commitments, or formal appraisal opinions. Nothing on this website or in any deliverable constitutes a recommendation to buy, sell, hold or finance any property or security.",
    ],
  },
  {
    id: "no-advice",
    title: "2. No advisory or fiduciary relationship",
    paragraphs: [
      "Submitting an enquiry, reading an article or receiving preliminary analysis does not create an advisory, fiduciary, brokerage, lending or client relationship. A client relationship exists only where a written engagement has been agreed by both parties.",
      "DatumCRE Analytics is not a registered investment adviser, broker-dealer, lender, appraiser, law firm or accounting firm.",
    ],
  },
  {
    id: "assumptions",
    title: "3. Assumptions and client information",
    paragraphs: [
      "Analysis is prepared from information supplied by the client and from stated assumptions. We do not independently verify the accuracy or completeness of client-supplied rent rolls, operating statements, budgets, loan terms or other materials unless a verification scope is expressly agreed.",
      "Conclusions are sensitive to the assumptions used. Different assumptions, data or market conditions may produce materially different results. Clients are responsible for reviewing assumptions and for obtaining their own legal, tax, accounting, valuation and investment advice.",
    ],
  },
  {
    id: "illustrative",
    title: "4. Illustrative examples",
    paragraphs: [
      "Financial figures, model outputs and examples shown on this website are fictional and illustrative only. They are not forecasts, market benchmarks, client transactions or representations of investment performance, and they should not be relied on for any decision.",
      "Photography on this website is illustrative. It does not depict properties owned, advised on or otherwise associated with DatumCRE Analytics unless expressly stated.",
    ],
  },
  {
    id: "third-party",
    title: "5. Third-party information",
    paragraphs: [
      "Where analysis refers to market data, comparable transactions, lending terms or third-party research, those materials are used for context and may not be complete, current or applicable to a particular asset. No warranty is given as to their accuracy.",
    ],
  },
  {
    id: "liability",
    title: "6. Limitation of reliance",
    paragraphs: [
      "To the extent permitted by applicable law, DatumCRE Analytics accepts no liability for decisions made in reliance on general website content or on analysis used outside the scope and assumptions agreed in a written engagement. Any engagement is governed by its own terms.",
    ],
  },
  {
    id: "contact",
    title: "7. Contact",
    paragraphs: [
      `Questions about this disclaimer can be submitted through the contact form. Coverage: ${siteConfig.coverage}.`,
    ],
  },
];

export default function DisclaimerPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Disclaimer"
        description="The scope and limitations of DatumCRE Analytics services and website content."
        crumbs={[{ label: "Disclaimer" }]}
      />

      <section className="section bg-white">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-32">
                <p className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-slate/70">
                  On this page
                </p>
                <nav aria-label="Disclaimer sections" className="mt-4">
                  <ul className="space-y-2.5">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <Link
                          href={`#${section.id}`}
                          className="text-[0.75rem] leading-snug text-slate transition-colors hover:text-navy"
                        >
                          {section.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <p className="mt-7 border-t border-line pt-5 text-[0.625rem] leading-relaxed text-slate/70">
                  Last updated: 19 November 2026
                </p>
              </div>
            </aside>

            <div className="lg:col-span-8 lg:col-start-5">
              <div className="article-body max-w-none">
                {sections.map((section) => (
                  <section key={section.id} id={section.id}>
                    <h2>{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                ))}
              </div>

              <div className="mt-12 border-t border-line pt-6">
                <p className="text-[0.6875rem] leading-relaxed text-slate/65">
                  {siteConfig.legalDisclaimer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
