import { ChevronDown, Images } from "lucide-react";
import type { ReactNode } from "react";
import type { JournalComparison as Comparison, JournalMedia as Media, JournalWeekFeature } from "@/data/project-journal";
import JournalDisclosure from "./JournalDisclosure";
import JournalFeature from "./JournalFeature";
import JournalMedia from "./JournalMedia";
import JournalComparison from "./JournalComparison";
import { journalCopy } from "./journal-copy";
import type { Locale } from "@/data/site";
import styles from "./Journal.module.css";

type Props = {
  id: string;
  number: number;
  dates: string;
  title: string;
  tags: string[];
  feature: JournalWeekFeature;
  media: Media[];
  comparisons?: Comparison[];
  children: ReactNode;
  initiallyOpen?: boolean;
  locale: Locale;
};

export default function JournalWeek({ id, number, dates, title, tags, feature, media, comparisons = [], children, initiallyOpen = false, locale }: Props) {
  const copy = journalCopy[locale];
  const visualCount = feature.media.length + media.length + comparisons.length * 2;
  return <JournalDisclosure id={id} initiallyOpen={initiallyOpen} className={styles.week} summaryClassName={styles.weekSummary} contentClassName={styles.weekContent}
    summary={<>
      <span className={styles.weekNumber} aria-hidden="true">{String(number).padStart(2, "0")}</span>
      <div className={styles.weekHeading}>
        <span className={styles.weekDate}>{copy.week} {number}{" "}<span aria-hidden="true">·</span>{" "}{dates}</span>
        <span className={styles.featureEyebrow}>{copy.mainProgress}</span>
        <h3>{title}</h3>
        <span className={styles.tags}>{tags.map((tag) => <span key={tag}>{tag}</span>)}<span className={styles.visualCount}><Images size={13} aria-hidden="true" />{copy.visuals(visualCount)}</span></span>
      </div>
      <span className={styles.disclosure}><ChevronDown size={20} aria-hidden="true" /></span>
    </>}
    deferredLeadingContent={<JournalFeature title={title} feature={feature} locale={locale} />}
    deferredContent={<>
      {comparisons.map((comparison) => <JournalComparison key={comparison.title} comparison={comparison} locale={locale} />)}
      <JournalMedia items={media} label={copy.otherCaptures} />
    </>}
  >{children}</JournalDisclosure>;
}
