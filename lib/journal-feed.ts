import { journalUpdated, projectJournals, getProjectJournals } from "@/data/project-journal";
import { journalCopy, journalHref } from "@/components/journal/journal-copy";
import { plainJournalText } from "@/components/journal/plain-text";
import { getProjectById, siteUrl, type Locale } from "@/data/site";

const escape = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** RSS 2.0 feed of every project journal, newest update first. */
export function journalFeed(locale: Locale) {
  const copy = journalCopy[locale];
  const feedPath = `${copy.portfolioPath === "/" ? "" : copy.portfolioPath}/feed.xml`;
  const items = [...new Set(projectJournals.map(({ project }) => project))]
    .flatMap((project) => getProjectJournals(project, locale))
    .sort((a, b) => journalUpdated(b).localeCompare(journalUpdated(a)));
  const title = locale === "fr" ? "Alexis Guerquin — Journaux de bord" : "Alexis Guerquin — Progress journals";
  const description = locale === "fr" ? "Les avancées hebdomadaires de Focus-Train, Pocha et des autres projets." : "Weekly progress on Focus-Train, Pocha and other projects.";
  const body = items.map((journal) => {
    const url = `${siteUrl}${journalHref(locale, journal.project, journal.slug)}`;
    const name = getProjectById(journal.project)?.title ?? journal.projectName;
    return `<item><title>${escape(copy.articleTitleMeta(name, journal.month))}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${new Date(journalUpdated(journal)).toUTCString()}</pubDate><description>${escape(plainJournalText(journal.description))}</description></item>`;
  }).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${escape(title)}</title><link>${siteUrl}${copy.portfolioPath === "/" ? "" : copy.portfolioPath}</link><description>${escape(description)}</description><language>${copy.htmlLang}</language><atom:link href="${siteUrl}${feedPath}" rel="self" type="application/rss+xml"/>${body}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
