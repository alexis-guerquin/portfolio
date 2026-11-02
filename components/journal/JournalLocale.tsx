"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "@/data/site";
import { journalCopy, type JournalCopy } from "./journal-copy";

const JournalLocaleContext = createContext<Locale>("en");

/** Client components read the article language here; server components receive `locale` as a prop. */
export function JournalLocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <JournalLocaleContext.Provider value={locale}>{children}</JournalLocaleContext.Provider>;
}

export function useJournalCopy(): JournalCopy {
  return journalCopy[useContext(JournalLocaleContext)];
}
