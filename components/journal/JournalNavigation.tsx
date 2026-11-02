"use client";

import { ArrowDown, ArrowUp, ChevronDown, List, X } from "lucide-react";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type MouseEvent } from "react";
import { useJournalCopy } from "./JournalLocale";
import { currentJournalSection, JOURNAL_SECTION_EVENT, scrollToJournalSection } from "./journal-section";
import styles from "./Journal.module.css";

export type JournalNavigationIssue = {
  month: string;
  weeks: { id: string; dates: string; title: string }[];
};

type Props = {
  issue: JournalNavigationIssue;
};

const compactQuery = "(max-width: 1359px)";
const subscribeCompact = (onChange: () => void) => {
  const media = window.matchMedia(compactQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};

export default function JournalNavigation({ issue }: Props) {
  const copy = useJournalCopy();
  const panelId = useId();
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const compact = useSyncExternalStore(subscribeCompact, () => window.matchMedia(compactQuery).matches, () => false);

  useEffect(() => {
    if ((compact && !open) || !panel.current) return;
    if (!activeSection || activeSection === "top") {
      panel.current.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const current = panel.current.querySelector<HTMLElement>('[aria-current="location"]');
    if (!current) return;
    const itemBounds = current.getBoundingClientRect();
    const panelBounds = panel.current.getBoundingClientRect();
    const offset = itemBounds.bottom > panelBounds.bottom ? itemBounds.bottom - panelBounds.bottom + 12
      : itemBounds.top < panelBounds.top ? itemBounds.top - panelBounds.top - 12 : 0;
    // Keep the selected week visible without changing the article's scroll position.
    if (offset) panel.current.scrollBy({ top: offset, behavior: "instant" });
  }, [activeSection, compact, open]);

  useEffect(() => {
    const ids = ["month-overview", ...issue.weeks.map(({ id }) => id), "conclusion-title", "next-month-title"];
    const sections = ids.map((id) => document.getElementById(id)).filter((element): element is HTMLElement => !!element);
    const followHash = () => setActiveSection(currentJournalSection());
    followHash();
    // Observe section boundaries rather than running work on every scroll frame.
    const observer = new IntersectionObserver(() => {
      const readingLine = Math.max(110, window.innerHeight * 0.35);
      const current = sections.filter((element) => element.getBoundingClientRect().top <= readingLine).at(-1);
      setActiveSection(current?.id ?? "");
    }, { rootMargin: "-80px 0px -60% 0px", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    window.addEventListener("hashchange", followHash);
    window.addEventListener(JOURNAL_SECTION_EVENT, followHash);
    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", followHash);
      window.removeEventListener(JOURNAL_SECTION_EVENT, followHash);
    };
  }, [issue]);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  function navigate(event: MouseEvent<HTMLAnchorElement>, id: string) {
    setOpen(false);
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    if (currentJournalSection() !== id) window.history.pushState(window.history.state, "", `#${id}`);
    setActiveSection(id);
    // The disclosure owns its state and deferred media; the menu only requests navigation.
    window.dispatchEvent(new CustomEvent(JOURNAL_SECTION_EVENT, { detail: { id } }));
    if (!target.matches("details")) scrollToJournalSection(target);
  }

  return <aside ref={root} className={styles.navigationRail} data-open={open} aria-label={copy.tocTitle} onKeyDown={(event) => {
    if (event.key === "Escape" && open) {
      setOpen(false);
      toggle.current?.focus();
    }
  }}>
    <button ref={toggle} className={styles.navigationToggle} type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((value) => !value)}>
      <span className={styles.navigationToggleIcon}>{open ? <X size={18} aria-hidden="true" /> : <List size={18} aria-hidden="true" />}</span>
      <span><strong>{copy.tocTitle}</strong><span>{issue.month}</span></span>
      <ChevronDown size={17} className={styles.navigationChevron} aria-hidden="true" />
    </button>

    <div ref={panel} id={panelId} className={styles.navigationPanel} inert={compact && !open} aria-hidden={compact && !open ? true : undefined}>
      <nav className={styles.navigationSections} aria-label={copy.tocLabel(issue.month)}>
        <p className={styles.navigationLabel}>{copy.tocInThisArticle}</p>
        <a className={styles.navigationOverview} href="#month-overview" aria-current={activeSection === "month-overview" ? "location" : undefined} onClick={(event) => navigate(event, "month-overview")}>{copy.tocOverview} <ArrowDown size={13} aria-hidden="true" /></a>
        <ol className={styles.navigationWeeks}>{issue.weeks.map((week, index) => <li key={week.id}>
          <a href={`#${week.id}`} aria-current={activeSection === week.id ? "location" : undefined} onClick={(event) => navigate(event, week.id)}>
            <span className={styles.navigationWeekNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <span><span className={styles.navigationWeekDate}><span className="sr-only">{copy.tocWeek(index + 1)}</span>{week.dates}</span><span className={styles.navigationWeekTitle}>{week.title}</span></span>
          </a>
        </li>)}</ol>
        <div className={styles.navigationEnd}>
          <a href="#conclusion-title" aria-current={activeSection === "conclusion-title" ? "location" : undefined} onClick={(event) => navigate(event, "conclusion-title")}>{copy.tocConclusion} <ArrowDown size={13} aria-hidden="true" /></a>
          <a href="#next-month-title" aria-current={activeSection === "next-month-title" ? "location" : undefined} onClick={(event) => navigate(event, "next-month-title")}>{copy.tocNextGoals} <ArrowDown size={13} aria-hidden="true" /></a>
        </div>
      </nav>
      <a className={styles.navigationTop} href="#top" onClick={() => setOpen(false)}>{copy.tocTop} <ArrowUp size={13} aria-hidden="true" /></a>
    </div>
  </aside>;
}
