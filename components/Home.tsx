import HomeClient from "./HomeClient";
import { getProjectJournals, projectJournals } from "@/data/project-journal";
import { journalHref } from "@/components/journal/journal-copy";
import type { Locale } from "@/data/site";

export default function Home({ initialProjectId, initialLocale = "en" }: { initialProjectId?: string; initialLocale?: Locale }) {
  // Keep the articles on the server; send only the latest link and app logo per project.
  const journals = [...new Set(projectJournals.map(({ project }) => project))].map((project) => {
    const journal = getProjectJournals(project, "en")[0];
    return {
      project, name: project === "focus-train" ? "Focus-Train" : journal.projectName,
      href: { fr: journalHref("fr", project, journal.slug), en: journalHref("en", project, journal.slug) }, icon: journal.icon,
    };
  });
  return <HomeClient initialProjectId={initialProjectId} initialLocale={initialLocale} journals={journals} />;
}
