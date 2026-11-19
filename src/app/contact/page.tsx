import type { Metadata } from "next";
import { ExternalLink, Mail, MapPin, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact — Multifamily Investment Analytics Requirements",
  description:
    "Discuss Multifamily acquisition underwriting, development modelling, valuation support, portfolio analytics or debt analysis with DatumCRE Analytics.",
  path: "/contact",
});

const included = [
  "Asset strategy, market and approximate unit count",
  "The decision or deliverable you need to support",
  "Any investment committee, closing or reporting deadline",
  "Whether a model exists and needs review or rebuilding",
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Discuss Your Multifamily Investment Analytics Requirements."
        description="Share the context and we will respond with a suggested scope, the deliverables involved and any information we would need to begin."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="section bg-white">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <span className="eyebrow">Get in touch</span>
              <h2 className="heading-section mt-5">
                A short brief is enough to start
              </h2>
              <p className="body-copy mt-5">
                You do not need a finished brief. A description of the asset, the
                investment stage, the decision and the deadline is enough for an
                initial conversation about scope.
              </p>

              <div className="mt-9 border-y border-line py-6">
                <h3 className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-navy">
                  Helpful to include
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {included.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[0.8125rem] leading-[1.6] text-slate"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.55rem] size-1 shrink-0 bg-blue"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <dl className="mt-7 space-y-6">
                {siteConfig.contactEmailConfigured ? (
                  <div className="flex items-start gap-3">
                    <Mail
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-blue"
                      strokeWidth={1.5}
                    />
                    <div>
                      <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-slate/70">
                        Email
                      </dt>
                      <dd className="mt-1">
                        <a
                          href={`mailto:${siteConfig.contactEmail}`}
                          className="text-[0.8125rem] text-navy underline decoration-line underline-offset-4 transition-colors hover:text-blue"
                        >
                          {siteConfig.contactEmail}
                        </a>
                      </dd>
                    </div>
                  </div>
                ) : null}

                {siteConfig.linkedinConfigured ? (
                  <div className="flex items-start gap-3">
                    <ExternalLink
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-blue"
                      strokeWidth={1.5}
                    />
                    <div>
                      <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-slate/70">
                        LinkedIn
                      </dt>
                      <dd className="mt-1">
                        <a
                          href={siteConfig.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[0.8125rem] text-navy underline decoration-line underline-offset-4 transition-colors hover:text-blue"
                        >
                          Puneet Tripathi
                        </a>
                      </dd>
                    </div>
                  </div>
                ) : null}

                <div className="flex items-start gap-3">
                  <MapPin
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-blue"
                    strokeWidth={1.5}
                  />
                  <div>
                    <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-slate/70">
                      Coverage
                    </dt>
                    <dd className="mt-1 text-[0.8125rem] text-slate">
                      {siteConfig.coverage}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-blue"
                    strokeWidth={1.5}
                  />
                  <div>
                    <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-slate/70">
                      Confidentiality
                    </dt>
                    <dd className="mt-1 text-[0.8125rem] leading-[1.6] text-slate">
                      Enquiries are treated as confidential. Please share only the
                      information needed for an initial scope discussion; a
                      confidentiality agreement can be put in place before
                      documents are exchanged.
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-8 border border-line bg-ice/40 p-5">
                <p className="text-[0.6875rem] leading-[1.7] text-slate">
                  <strong className="font-semibold text-navy">
                    Scope of services:
                  </strong>{" "}
                  DatumCRE Analytics provides independent analytical and modelling
                  support. We do not provide investment advice, securities
                  recommendations, legal, tax or accounting advice, formal
                  appraisal opinions, or lending commitments.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ice/40 py-12 md:py-14">
        <div className="container-page">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Initial review",
                body: "We read the brief and identify the analytical framework the decision requires.",
              },
              {
                title: "Scope discussion",
                body: "A short conversation to confirm deliverables, assumptions and timing.",
              },
              {
                title: "Proposal",
                body: "A written scope with deliverables, timetable and fee basis before work begins.",
              },
            ].map((step, index) => (
              <div key={step.title} className="border-t border-navy/15 pt-5">
                <span className="tabular text-[0.625rem] font-semibold tracking-[0.16em] text-blue">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-3 font-heading text-[0.9375rem] font-semibold text-navy">
                  {step.title}
                </h2>
                <p className="mt-2 text-[0.8125rem] leading-[1.65] text-slate">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
