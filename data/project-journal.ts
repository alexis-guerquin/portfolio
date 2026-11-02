import type { Locale } from "./site";
import { focusTrainOctober2026 } from "./journals/focus-train-october-2026";
import { focusTrainOctober2026En } from "./journals/focus-train-october-2026.en";
import { pochaOctober2026 } from "./journals/pocha-october-2026";
import { pochaOctober2026En } from "./journals/pocha-october-2026.en";

export type JournalMedia = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  video?: string;
  fullWidth?: boolean;
};

export type JournalEntry = { period: string; title: string; changes: string[]; why: string };

export type JournalWeekFeature = { summary: string; media: JournalMedia[]; layout?: "comparison" };

export type JournalComparison = {
  title: string;
  period: string;
  description: string;
  beforeLabel: string;
  afterLabel: string;
  before: JournalMedia;
  after: JournalMedia;
  changes: string[];
  layout?: "columns";
  source?: { url: string; label: string };
};

export type JournalWeek = {
  id: string;
  dates: string;
  title: string;
  tags: string[];
  entries: JournalEntry[];
  feature: JournalWeekFeature;
  media: JournalMedia[];
  comparisons?: JournalComparison[];
};

export type JournalConclusion = {
  summary: string;
  takeaways: {
    title: string;
    state: string;
    detail: string;
    tone: "success" | "measure" | "attention";
    cta?: { label: string; url: string };
  }[];
  nextMonth: {
    title: string;
    goals: string[];
    personalChallenges?: string[];
    target?: { title: string; value: string; label: string; detail: string };
  };
};

export type ProjectJournal = {
  project: string;
  projectName: string;
  issue: number;
  cover: JournalMedia;
  hero: JournalMedia[];
  heroCaption?: string;
  platforms?: { label: string; url: string }[];
  icon?: string;
  metrics: { stats: { value: string; label: string; period: string }[]; observation: string; source: string };
  slug: string;
  month: string;
  published: string;
  /** Date of the latest weekly update (ISO). Drives dateModified, the sitemap and the feeds. */
  updated?: string;
  description: string;
  overview: string;
  weeks: JournalWeek[];
  conclusion: JournalConclusion;
};

const journalsByLocale: Record<Locale, ProjectJournal[]> = {
  fr: [pochaOctober2026, focusTrainOctober2026],
  en: [pochaOctober2026En, focusTrainOctober2026En],
};

/** Both locales share the same projects and slugs, so this list drives static params and the sitemap. */
export const projectJournals = journalsByLocale.fr;

export const journalUpdated = (journal: ProjectJournal) => journal.updated ?? journal.published;

export function getProjectJournals(project: string, locale: Locale) {
  return journalsByLocale[locale].filter((journal) => journal.project === project).sort((a, b) => b.published.localeCompare(a.published));
}

export function getProjectJournal(project: string, month: string, locale: Locale) {
  return journalsByLocale[locale].find((journal) => journal.project === project && journal.slug === month);
}
