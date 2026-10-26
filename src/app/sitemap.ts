import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/portfolio";
import { industries } from "@/content/industries";
import { articles } from "@/content/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    "/services",
    "/work",
    "/about",
    "/process",
    "/insights",
    "/contact",
    "/estimate",
  ];

  const staticPages = routes.map((r) => ({
    url: `${site.url}${r}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : 0.8,
  }));

  const work = projects.map((p) => ({
    url: `${site.url}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const industryPages = industries.map((i) => ({
    url: `${site.url}/industries/${i.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const articlePages = articles.map((a) => ({
    url: `${site.url}/insights/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...work, ...industryPages, ...articlePages];
}
