import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import type { JournalConclusion as Conclusion } from "@/data/project-journal";
import type { Locale } from "@/data/site";
import { journalCopy } from "./journal-copy";
import JournalText from "./JournalText";
import styles from "./Journal.module.css";

export default function JournalConclusion({ conclusion, dateLabel, locale }: { conclusion: Conclusion; dateLabel: string; locale: Locale }) {
  const copy = journalCopy[locale];
  return <div className={styles.monthEnd}>
    <section className={styles.monthSummary} aria-labelledby="month-summary-title">
      <h2 id="month-summary-title">{copy.monthInBrief}</h2>
      <p><JournalText>{conclusion.summary}</JournalText></p>
    </section>

    <section className={styles.conclusion} aria-labelledby="conclusion-title">
      <header className={styles.conclusionHeader}>
        <div><p className={styles.eyebrow}>{copy.statusAt(dateLabel)}</p><h2 id="conclusion-title">{copy.conclusionTitle}</h2></div>
        <ArrowDownRight size={42} strokeWidth={1.5} aria-hidden="true" />
      </header>
      <ul className={styles.conclusionList}>{conclusion.takeaways.map((item) => <li key={item.title} data-tone={item.tone}>
        <span className={styles.conclusionArrow}><ArrowRight size={19} aria-hidden="true" /></span>
        <div>
          <div className={styles.conclusionItemHeading}><h3><JournalText>{item.title}</JournalText></h3><span className={styles.conclusionState}>{item.state}</span></div>
          <p><JournalText>{item.detail}</JournalText></p>
          {item.cta && <a className={styles.conclusionCta} href={item.cta.url} target="_blank" rel="noreferrer">{item.cta.label}<ArrowUpRight size={17} aria-hidden="true" /><span className="sr-only">{copy.newTab}</span></a>}
        </div>
      </li>)}</ul>

      <section className={styles.nextMonth} aria-labelledby="next-month-title">
        <p className={styles.eyebrow}>{copy.nextMonth}</p>
        <h3 id="next-month-title">{conclusion.nextMonth.title}</h3>
        <ul>{conclusion.nextMonth.goals.map((goal) => <li key={goal}><ArrowRight size={18} aria-hidden="true" /><span><JournalText>{goal}</JournalText></span></li>)}</ul>
        {conclusion.nextMonth.personalChallenges && <section className={styles.personalChallenges} aria-labelledby="personal-challenges-title">
          <h4 id="personal-challenges-title">{copy.personalChallenges}</h4>
          <ul>{conclusion.nextMonth.personalChallenges.map((challenge) => <li key={challenge}><ArrowRight size={18} aria-hidden="true" /><span><JournalText>{challenge}</JournalText></span></li>)}</ul>
        </section>}
        {conclusion.nextMonth.target && <section className={styles.monthTarget} aria-labelledby="month-target-title">
          <h4 id="month-target-title">{conclusion.nextMonth.target.title}</h4>
          <p className={styles.targetMetric}><strong>{conclusion.nextMonth.target.value}</strong><span>{conclusion.nextMonth.target.label}</span></p>
          <p className={styles.targetDetail}><JournalText>{conclusion.nextMonth.target.detail}</JournalText></p>
        </section>}
      </section>
    </section>
  </div>;
}
