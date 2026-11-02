import type { Metadata } from "next";
import { getProjectJournal, getProjectJournals, journalUpdated } from "@/data/project-journal";
import { getProjectById, siteUrl, type Locale } from "@/data/site";
import { journalCopy, journalHref } from "./journal-copy";
import { plainJournalText } from "./plain-text";

const locales: Locale[] = ["fr", "en"];
const languages = (project: string, month?: string) => Object.fromEntries(locales.map((locale) => [locale, `${siteUrl}${journalHref(locale, project, month)}`]));

export function journalIndexMetadata(project: string, locale: Locale): Metadata {
  const copy = journalCopy[locale];
  const info = getProjectById(project);
  const journals = getProjectJournals(project, locale);
  if (!info || !journals.length) return {};
  const title = copy.indexTitleMeta(info.title);
  const description = copy.indexDescription(info.title);
  const url = journalHref(locale, project);
  const cover = journals[0].cover;
  return { title, description, alternates: { canonical: url, languages: languages(project), types: { "application/rss+xml": `${siteUrl}${copy.portfolioPath === "/" ? "" : copy.portfolioPath}/feed.xml` } }, openGraph: { type: "website", locale: copy.ogLocale, title, description, url, images: [cover.src] }, twitter: { card: "summary_large_image", title, description, images: [cover.src] } };
}

export function journalArticleMetadata(project: string, month: string, locale: Locale): Metadata {
  const copy = journalCopy[locale];
  const journal = getProjectJournal(project, month, locale);
  if (!journal) return {};
  const title = copy.articleTitleMeta(journal.projectName, journal.month);
  const description = plainJournalText(journal.description);
  const url = `${siteUrl}${journalHref(locale, project, month)}`;
  return {
    title, description,
    alternates: { canonical: url, languages: languages(project, month) },
    openGraph: { type: "article", locale: copy.ogLocale, url, title, description, publishedTime: journal.published, modifiedTime: journalUpdated(journal), authors: ["Alexis Guerquin"], images: [{ url: journal.cover.src, alt: journal.cover.alt }] },
    twitter: { card: "summary_large_image", title, description, images: [journal.cover.src] },
  };
}
