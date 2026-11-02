import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getProjectJournals } from "@/data/project-journal";
import { getProjectById, type Locale } from "@/data/site";
import JournalText from "./JournalText";
import JournalShell from "./JournalShell";
import { journalCopy, journalHref } from "./journal-copy";
import styles from "./Journal.module.css";

export default function JournalIndex({ project: id, locale }: { project: string; locale: Locale }) {
  const copy = journalCopy[locale];
  const project = getProjectById(id);
  const journals = getProjectJournals(id, locale);
  if (!project || !journals.length) notFound();
  return <JournalShell project={id} locale={locale}>
    <header className={`${styles.articleHeader} ${styles.indexHeader}`}><p className={styles.eyebrow}>{copy.indexEyebrow}</p><h1>{project.title}.<br /><em>{copy.indexTitle}</em></h1><p className={styles.intro}>{copy.indexIntro[0]}<br />{copy.indexIntro[1]}</p></header>
    <div className={styles.indexList}>{journals.map((journal) => <Link href={journalHref(locale, id, journal.slug)} className={styles.journalCard} key={journal.slug}>
      <div className={styles.cardImage}><Image src={journal.cover.src} alt={journal.cover.alt} width={journal.cover.width} height={journal.cover.height} sizes="(max-width: 600px) 100vw, 760px" priority /></div>
      <div className={styles.cardBody}><p className={styles.eyebrow}>{copy.indexCardEyebrow(journal.weeks.length)}</p><h2>{journal.month}<ArrowUpRight size={24} aria-hidden="true" /></h2><p><JournalText links={false}>{journal.description}</JournalText></p><span className={styles.cardRead}>{copy.readJournal} <span aria-hidden="true">→</span></span></div>
    </Link>)}</div>
  </JournalShell>;
}
