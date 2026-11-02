import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { journalUpdated, type ProjectJournal } from "@/data/project-journal";
import { siteUrl, type Locale } from "@/data/site";
import JournalShell from "./JournalShell";
import JournalWeek from "./JournalWeek";
import JournalDisclosure from "./JournalDisclosure";
import JournalConclusion from "./JournalConclusion";
import { JournalEntry, JournalSectionHeading, JournalStats } from "./JournalBlocks";
import JournalText from "./JournalText";
import { journalCopy, journalHref, projectHref } from "./journal-copy";
import { plainJournalText } from "./plain-text";
import styles from "./Journal.module.css";

export default function JournalArticle({ journal, locale }: { journal: ProjectJournal; locale: Locale }) {
  const copy = journalCopy[locale];
  const publishedLabel = new Intl.DateTimeFormat(copy.dateLocale, { dateStyle: "long", timeZone: "UTC" }).format(new Date(journal.published));
  const schema = {
    "@context": "https://schema.org", "@type": "BlogPosting",
    headline: `${journal.projectName} — ${journal.month}`, description: plainJournalText(journal.description),
    datePublished: journal.published, dateModified: journalUpdated(journal),
    keywords: [...new Set(journal.weeks.flatMap((week) => week.tags))].join(", "),
    isPartOf: { "@type": "Blog", name: `${journal.projectName} — ${copy.journal}`, url: `${siteUrl}${journalHref(locale, journal.project)}` }, inLanguage: copy.dateLocale,
    mainEntityOfPage: `${siteUrl}${journalHref(locale, journal.project, journal.slug)}`,
    author: { "@type": "Person", name: "Alexis Guerquin", url: siteUrl },
    image: `${siteUrl}${journal.cover.src}`,
  };
  return <JournalShell project={journal.project} month={journal.slug} locale={locale}>
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <header className={styles.articleHeader}>
        <div className={styles.eyebrow}><span className={styles.liveDot} /> {copy.buildJournal} <span className={styles.issue}>{copy.issue} {String(journal.issue).padStart(2, "0")}</span></div>
        <h1>{journal.projectName}.<br /><em>{journal.month}.</em></h1>
        <p className={styles.intro}><JournalText>{journal.description}</JournalText></p>
        <div className={styles.byline}><Image src="/1739529957561.jpeg" width={26} height={26} alt="" sizes="26px" /><span>Alexis Guerquin</span><span aria-hidden="true">·</span><time dateTime={journal.published}>{publishedLabel}</time></div>
      </header>

      <figure className={styles.heroFigure}>
        <div className={styles.heroStage} aria-label={copy.previewOf(journal.projectName)}>
          <span className={styles.heroLabel}>{journal.projectName.toUpperCase()} / {copy.productLabel}</span>
          <div className={styles.heroScreens}>
            {journal.hero.map((item, index) => <Image key={item.src} className={[styles.heroScreenLeft, styles.heroScreenCenter, styles.heroScreenRight][index]} src={item.src} width={item.width} height={item.height} alt={item.alt} sizes="(max-width: 600px) 33vw, 210px" priority />)}
          </div>
          {journal.platforms && <nav className={styles.heroPlatforms} aria-label={copy.onEachPlatform(journal.projectName)}>{journal.platforms.map((platform) => <a key={platform.label} href={platform.url} target="_blank" rel="noreferrer" aria-label={copy.openOn(journal.projectName, platform.label)}>{platform.label}<ArrowUpRight size={11} aria-hidden="true" /></a>)}</nav>}
        </div>
        {journal.heroCaption && <figcaption>{journal.heroCaption}</figcaption>}
      </figure>

      <section id="month-overview" className={styles.monthOverview} aria-label={copy.monthSummaryLabel(journal.projectName)}>
        <p className={styles.eyebrow}>{copy.thisMonth}</p>
        <p><JournalText>{journal.overview}</JournalText></p>
      </section>

      <section className={styles.weeks} aria-labelledby="weeks-title">
        <JournalSectionHeading id="weeks-title" eyebrow={copy.weeksEyebrow} title={copy.weeksTitle} hint={copy.weeksHint} />
        {journal.weeks.map((week, index) => <JournalWeek key={week.id} id={week.id} dates={week.dates} title={week.title} tags={week.tags} feature={week.feature} media={week.media} comparisons={week.comparisons} number={index + 1} initiallyOpen={index === 0} locale={locale}>
          {week.entries.map((entry) => <JournalEntry key={entry.title} entry={entry} locale={locale} />)}
        </JournalWeek>)}
      </section>

      <section className={styles.metricsSection} aria-labelledby="metrics-title">
        <JournalSectionHeading id="metrics-title" eyebrow={copy.metricsEyebrow} title={copy.metricsTitle} />
        <JournalStats stats={journal.metrics.stats} label={copy.statsLabel} />
        <p className={styles.observation}><JournalText>{journal.metrics.observation}</JournalText></p>
        <JournalDisclosure className={styles.source} summary={<span>{copy.sourceSummary}</span>}><p><JournalText>{journal.metrics.source}</JournalText></p></JournalDisclosure>
      </section>

      <JournalConclusion conclusion={journal.conclusion} dateLabel={publishedLabel} locale={locale} />

      <aside className={styles.closing}><div>{journal.icon && <Image src={journal.icon} alt="" width={44} height={44} sizes="44px" />}<div><p>{copy.closingTitle}</p><span>{copy.closingText}</span></div></div><Link href={projectHref(locale, journal.project)}>{copy.discover(journal.projectName)} <ArrowUpRight size={16} aria-hidden="true" /></Link></aside>
    </article>
  </JournalShell>;
}
