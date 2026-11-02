import type { MetadataRoute } from "next";
import { portfolio, siteUrl, type Locale } from "@/data/site";
import { journalUpdated, projectJournals } from "@/data/project-journal";
import { journalHref } from "@/components/journal/journal-copy";

const locales: Locale[] = ["en", "fr"];

function journalEntries(locale: Locale): MetadataRoute.Sitemap {
  const projects = [...new Set(projectJournals.map(({ project }) => project))];
  return [
    ...projects.map((project) => ({ url: `${siteUrl}${journalHref(locale, project)}`, lastModified: new Date(projectJournals.filter((journal) => journal.project === project).map(journalUpdated).sort().at(-1)!), changeFrequency: "weekly" as const, priority: 0.7 })),
    ...projectJournals.map((journal) => ({ url: `${siteUrl}${journalHref(locale, journal.project, journal.slug)}`, lastModified: new Date(journalUpdated(journal)), changeFrequency: "weekly" as const, priority: 0.7 })),
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: siteUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    ...portfolio.map((project) => ({ url: `${siteUrl}/${project.id}`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${siteUrl}/fr`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    ...portfolio.map((project) => ({ url: `${siteUrl}/fr/${project.id}`, lastModified, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...locales.flatMap(journalEntries),
  ];
}
