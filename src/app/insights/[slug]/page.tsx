import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CTABand } from "@/components/layout/CTABand";
import { buildMetadata } from "@/lib/seo";
import {
  articles,
  getArticle,
  getRelatedArticles,
} from "@/lib/insights";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { founder } from "@/lib/founder";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return articles
    .filter((article) => article.status === "published")
    .map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return buildMetadata({
      title: "Article Not Found",
      description: "The requested insight could not be found.",
      path: `/insights/${slug}`,
      noindex: true,
    });
  }

  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/insights/${article.slug}`,
    image: article.image,
    imageAlt: article.imageAlt,
    type: "article",
    publishedTime: article.date,
    noindex: article.status === "draft",
  });
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article || article.status !== "published") notFound();

  const related = getRelatedArticles(article);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    image: `${siteConfig.url}${article.image}`,
    articleSection: article.category,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.role,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: `${siteConfig.url}/insights/${article.slug}`,
    isAccessibleForFree: true,
  };

  return (
    <>
      <article>
        <header className="border-b border-line bg-[linear-gradient(180deg,#f4f8f8_0%,#ffffff_100%)]">
          <div className="container-page pb-10 pt-8 md:pb-14">
            <Breadcrumbs
              items={[
                { label: "Insights", href: "/insights" },
                { label: article.category },
              ]}
            />

            <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-blue">
                    {article.category}
                  </span>
                </div>

                <h1 className="display-2 mt-5 max-w-[24ch]">{article.title}</h1>

                <p className="lead mt-5 max-w-2xl">{article.excerpt}</p>

                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5 text-[0.6875rem] text-slate/80">
                  <time dateTime={article.date}>{formatDate(article.date)}</time>
                  <span aria-hidden="true" className="hidden size-1 bg-slate/40 sm:block" />
                  <span className="inline-flex items-center gap-1.5">
                    <Clock aria-hidden="true" className="size-3" strokeWidth={1.75} />
                    {article.readingTime}
                  </span>
                  <span aria-hidden="true" className="hidden size-1 bg-slate/40 sm:block" />
                  <span>DatumCRE Analytics</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="bg-white">
          <div className="container-page py-10 md:py-14">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-8">
                <figure className="mb-10">
                  <div className="relative aspect-[3/2] w-full overflow-hidden bg-navy">
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      className="img-tone object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-[0.625rem] leading-relaxed text-slate/70">
                    Illustrative architectural photography. Not a property
                    associated with DatumCRE Analytics.
                  </figcaption>
                </figure>

                <div className="article-body max-w-[68ch]">
                  {article.body.map((section, index) => (
                    <section key={index}>
                      {section.heading ? <h2>{section.heading}</h2> : null}
                      {section.paragraphs?.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      {section.list ? (
                        <ul>
                          {section.list.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ) : null}
                      {section.quote ? (
                        <blockquote>{section.quote}</blockquote>
                      ) : null}
                    </section>
                  ))}
                </div>

                <div className="mt-14 border-t border-line pt-7">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Link href="/insights" className="link-arrow">
                      <ArrowLeft
                        aria-hidden="true"
                        className="size-3.5"
                        strokeWidth={1.75}
                      />
                      All Insights
                    </Link>
                    <Link href="/contact" className="link-arrow">
                      Discuss your requirements
                      <ArrowRight
                        aria-hidden="true"
                        className="size-3.5"
                        strokeWidth={1.75}
                      />
                    </Link>
                  </div>
                </div>
              </div>

              <aside className="lg:col-span-4">
                <div className="border border-line bg-ice/40 p-6 lg:sticky lg:top-32">
                  <h2 className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-navy">
                    About this insight
                  </h2>
                  <dl className="mt-4 divide-y divide-line text-[0.75rem]">
                    <div className="flex items-baseline justify-between gap-4 py-2.5">
                      <dt className="text-slate">Topic</dt>
                      <dd className="text-navy">{article.category}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 py-2.5">
                      <dt className="text-slate">Published</dt>
                      <dd className="text-navy">{formatDate(article.date)}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 py-2.5">
                      <dt className="text-slate">Reading time</dt>
                      <dd className="text-navy">{article.readingTime}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 py-2.5">
                      <dt className="text-slate">Status</dt>
                      <dd className="text-navy">Published</dd>
                    </div>
                  </dl>
                  <p className="mt-5 border-t border-navy/10 pt-4 text-[0.6875rem] leading-relaxed text-slate/80">
                    {siteConfig.legalDisclaimer}
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </div>

        {related.length ? (
          <section className="border-t border-line bg-ice/30 py-14 md:py-16">
            <div className="container-page">
              <div className="flex items-end justify-between gap-6">
                <h2 className="heading-card">Related insights</h2>
                <Link href="/insights" className="link-arrow">
                  View all
                  <ArrowRight aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
                </Link>
              </div>

              <div className="mt-7 grid gap-6 md:grid-cols-3">
                {related.map((item) => (
                  <article
                    key={item.slug}
                    className="group flex flex-col border border-line bg-white"
                  >
                    <div className="relative aspect-[3/2] overflow-hidden bg-navy">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="img-tone object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span className="text-[0.5625rem] font-semibold uppercase tracking-[0.16em] text-blue">
                        {item.category}
                      </span>
                      <h3 className="mt-2.5 font-heading text-[0.9375rem] font-semibold leading-snug text-navy">
                        <Link href={`/insights/${item.slug}`} className="hover:text-blue">
                          {item.title}
                        </Link>
                      </h3>
                      <p className="mt-3 flex-1 text-[0.75rem] leading-[1.65] text-slate">
                        {item.excerpt}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </article>

      <CTABand
        eyebrow="Multifamily analytical support"
        title="Applying these ideas to a live Multifamily transaction?"
        description="We can build or review the model behind the decision — acquisition, development, refinancing or valuation."
        buttonLabel="Discuss Your Requirements"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
