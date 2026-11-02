import type { JournalEntry as Entry } from "@/data/project-journal";
import type { Locale } from "@/data/site";
import { journalCopy } from "./journal-copy";
import JournalText from "./JournalText";
import styles from "./Journal.module.css";

export function JournalSectionHeading({ id, eyebrow, title, hint }: { id: string; eyebrow: string; title: string; hint?: string }) {
  return <div className={styles.sectionHeading}>
    <div><p className={styles.eyebrow}>{eyebrow}</p><h2 id={id}>{title}</h2></div>
    {hint && <span className={styles.sectionHint}>{hint} <span aria-hidden="true">↘</span></span>}
  </div>;
}

export function JournalEntry({ entry, locale }: { entry: Entry; locale: Locale }) {
  return <section className={styles.entry}>
    <p className={styles.entryPeriod}>{entry.period}</p>
    <h4>{entry.title}</h4>
    <ul>{entry.changes.map((change) => <li key={change}><JournalText>{change}</JournalText></li>)}</ul>
    <p className={styles.why}><span>{journalCopy[locale].why}</span><JournalText>{entry.why}</JournalText></p>
  </section>;
}

export function JournalStats({ stats, label }: { stats: { value: string; label: string; period?: string }[]; label: string }) {
  return <dl className={styles.metrics} aria-label={label}>{stats.map((stat) => <div key={stat.label}>
    <dt>{stat.label}</dt><dd>{stat.value}</dd>{stat.period && <span>{stat.period}</span>}
  </div>)}</dl>;
}
