import type { JournalWeekFeature } from "@/data/project-journal";
import type { Locale } from "@/data/site";
import { journalCopy } from "./journal-copy";
import JournalMedia from "./JournalMedia";
import JournalText from "./JournalText";
import styles from "./Journal.module.css";

export default function JournalFeature({ feature, title, locale }: { feature: JournalWeekFeature; title: string; locale: Locale }) {
  const copy = journalCopy[locale];
  return <section className={styles.weekFeature} aria-label={copy.featureLabel(title)}>
    <p className={styles.featureLead}><JournalText>{feature.summary}</JournalText></p>
    <JournalMedia items={feature.media} variant="feature" layout={feature.layout} label={copy.inImages(title)} />
  </section>;
}
