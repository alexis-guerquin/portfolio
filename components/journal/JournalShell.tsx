import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import { getProjectJournal, getProjectJournals } from "@/data/project-journal";
import type { Locale } from "@/data/site";
import { JournalLocaleProvider } from "./JournalLocale";
import JournalNavigation from "./JournalNavigation";
import { journalCopy, journalHref, projectHref } from "./journal-copy";
import styles from "./Journal.module.css";

export default function JournalShell({ project, month, locale, children }: { project: string; month?: string; locale: Locale; children: ReactNode }) {
  const copy = journalCopy[locale];
  const journal = month ? getProjectJournal(project, month, locale) : undefined;
  const projectName = (journal ?? getProjectJournals(project, locale)[0])?.projectName ?? project;
  const portfolioPath = copy.portfolioPath;
  return <JournalLocaleProvider locale={locale}><div lang={copy.htmlLang} className={styles.journalLayout} id="top" data-has-toc={!!journal}>
    <a href="#journal-content" className={styles.skipLink}>{copy.skipLink}</a>
    <div className={`${styles.portfolioHeader} site-column`}><Header locale={locale} portfolioPath={portfolioPath} localeHrefs={{ fr: journalHref("fr", project, month), en: journalHref("en", project, month) }} /></div>
    <div className={styles.journalBody}>
      {journal && <JournalNavigation issue={{ month: journal.month, weeks: journal.weeks.map(({ id, dates, title }) => ({ id, dates, title })) }} />}
      <main className={`${styles.journal} site-column`}>
        <div className={styles.content} id="journal-content" tabIndex={-1}>
          <nav aria-label={copy.breadcrumb} className={styles.breadcrumb}>
            <ol>
              <li><Link href={portfolioPath}><ArrowLeft size={13} aria-hidden="true" /> {copy.portfolio}</Link></li>
              <li><ChevronRight size={11} aria-hidden="true" /><Link href={projectHref(locale, project)}>{projectName}</Link></li>
              <li><ChevronRight size={11} aria-hidden="true" /><Link href={journalHref(locale, project)} aria-current={!journal ? "page" : undefined}>{copy.journal}</Link></li>
              {journal && <li><ChevronRight size={11} aria-hidden="true" /><span aria-current="page">{journal.month}</span></li>}
            </ol>
          </nav>
          {children}
        </div>
        <footer className={styles.footer}>
          <span>© 2026 Alexis Guerquin</span>
          <Link href={portfolioPath}>{copy.backToPortfolio} <ArrowUpRight size={13} aria-hidden="true" /></Link>
        </footer>
      </main>
    </div>
  </div></JournalLocaleProvider>;
}
