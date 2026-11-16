import type { MetadataRoute } from "next";
import { articles } from "@/lib/insights";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.url}/industries`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/insights`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${siteConfig.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  // Draft articles are noindex and intentionally excluded from the sitemap.
  // Publishing an article (status: "published") adds it automatically.
  const articleRoutes: MetadataRoute.Sitemap = articles
    .filter((article) => article.status === "published")
    .map((article) => ({
      url: `${siteConfig.url}/insights/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "yearly",
      priority: 0.6,
    }));

  return [...staticRoutes, ...articleRoutes];
}
