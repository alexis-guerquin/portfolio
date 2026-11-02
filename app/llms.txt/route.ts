import { getProjectJournals, journalUpdated, projectJournals } from "@/data/project-journal";
import { journalHref } from "@/components/journal/journal-copy";
import { portfolio, siteUrl } from "@/data/site";

export const dynamic = "force-static";

/** Generated so every new journal is listed for AI crawlers without manual edits. */
export function GET() {
  const projects = [...new Set(projectJournals.map(({ project }) => project))];
  const journals = projects.flatMap((project) => getProjectJournals(project, "en").map((journal) => `- [${journal.projectName} — ${journal.month}](${siteUrl}${journalHref("en", project, journal.slug)}) : weekly build journal, updated ${journalUpdated(journal)} ([FR](${siteUrl}${journalHref("fr", project, journal.slug)})).`));
  const body = `# Alexis Guerquin

> Portfolio d'Alexis Guerquin, Product Designer et développeur freelance basé en France.

## À propos

Alexis Guerquin conçoit et développe des produits numériques : expériences UX/UI, applications iOS, sites web et plateformes SaaS.

## Pages principales

- [Accueil](${siteUrl}/) : présentation, services, processus et contact.
${portfolio.map((project) => `- [${project.title}](${siteUrl}/${project.id}) : ${project.tagline.fr}`).join("\n")}

## Journaux de bord

${journals.join("\n")}
- [Flux RSS (EN)](${siteUrl}/feed.xml) · [Flux RSS (FR)](${siteUrl}/fr/feed.xml)

## Contact

Utiliser le formulaire de contact du site ou le profil LinkedIn : https://www.linkedin.com/in/alexis-guerquin/
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
