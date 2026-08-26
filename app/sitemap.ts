import type { MetadataRoute } from "next";
import { portfolio, siteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: siteUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    ...portfolio.map((project) => ({ url: `${siteUrl}/${project.id}`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
