import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/data/site";
import JournalLinkBackdrop from "./JournalLinkBackdrop";
import styles from "./ProjectJournals.module.css";

export type HomeJournalSummary = {
  project: string;
  name: string;
  href: Record<Locale, string>;
  icon?: string;
};

export default function ProjectJournals({ journals, locale }: { journals: HomeJournalSummary[]; locale: Locale }) {
  if (!journals.length) return null;
  const fr = locale === "fr";
  return <nav id="journals" className={styles.links} aria-label={fr ? "Blogs d’avancement des projets" : "Project progress blogs"}>
    {journals.map((journal) => <Link key={journal.project} href={journal.href[locale]} className={`project-journal-link ${styles.link}`}>
      <JournalLinkBackdrop />
      {journal.icon && <Image src={journal.icon} width={36} height={36} alt="" sizes="36px" loading="lazy" className={styles.icon} />}
      <strong>{fr ? `Blog d’avancement de ${journal.name}` : `${journal.name} progress blog`}</strong>
      <ArrowUpRight size={18} aria-hidden="true" className={styles.arrow} />
    </Link>)}
  </nav>;
}
