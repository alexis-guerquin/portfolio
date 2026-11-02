import { ArrowUpRight } from "lucide-react";
import type { JournalComparison as Comparison } from "@/data/project-journal";
import JournalText from "./JournalText";
import type { Locale } from "@/data/site";
import { journalCopy } from "./journal-copy";
import JournalImage from "./JournalImage";
import styles from "./Journal.module.css";

/** A readable before/after pair; mounted only when its week is expanded. */
export default function JournalComparison({ comparison, locale }: { comparison: Comparison; locale: Locale }) {
  const copy = journalCopy[locale];
  return <section className={styles.beforeAfter} aria-label={comparison.title}>
    <header>
      <p className={styles.entryPeriod}>{comparison.period}</p>
      <h4>{comparison.title}</h4>
      <p className={styles.comparisonIntro}><JournalText>{comparison.description}</JournalText></p>
    </header>
    <div className={`${styles.comparisonPair} ${comparison.layout === "columns" ? styles.comparisonPairColumns : ""}`}>
      {([
        { key: "before", label: copy.before, version: comparison.beforeLabel, item: comparison.before },
        { key: "after", label: copy.after, version: comparison.afterLabel, item: comparison.after },
      ]).map(({ key, label, version, item }) => <figure key={key} className={styles.comparisonFigure} data-version={key}>
        <div className={styles.comparisonLabel}><span>{label}</span><strong><JournalText>{version}</JournalText></strong></div>
        <div className={styles.mediaFrame}>
          <JournalImage item={item} sizes={comparison.layout === "columns" ? "(max-width: 480px) 45vw, 200px" : "(max-width: 520px) calc(100vw - 40px), 480px"} />
        </div>
        <figcaption><JournalText>{item.caption}</JournalText></figcaption>
      </figure>)}
    </div>
    <ul className={styles.comparisonChanges}>{comparison.changes.map((change) => <li key={change}><JournalText>{change}</JournalText></li>)}</ul>
    {comparison.source && <a className={styles.comparisonSource} href={comparison.source.url} target="_blank" rel="noreferrer">{comparison.source.label}<ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only">{copy.newTab}</span></a>}
  </section>;
}
