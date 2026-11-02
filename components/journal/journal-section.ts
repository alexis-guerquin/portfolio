export const JOURNAL_SECTION_EVENT = "journal:section";

export function currentJournalSection() {
  try { return decodeURIComponent(window.location.hash.slice(1)); }
  catch { return ""; }
}

/** Move reading and keyboard focus together, after an accordion has finished opening. */
export function scrollToJournalSection(element: HTMLElement) {
  const focusTarget = element.querySelector("summary") ?? element;
  if (!(focusTarget instanceof HTMLElement)) return;
  if (!focusTarget.matches("summary")) focusTarget.tabIndex = -1;
  focusTarget.focus({ preventScroll: true });
  element.scrollIntoView({
    block: "start",
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
  });
}
