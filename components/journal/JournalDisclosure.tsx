"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import useReducedMotion from "./useReducedMotion";
import { currentJournalSection, JOURNAL_SECTION_EVENT, scrollToJournalSection } from "./journal-section";
import styles from "./Journal.module.css";

gsap.registerPlugin(useGSAP);

type Props = {
  id?: string;
  summary: ReactNode;
  children: ReactNode;
  deferredContent?: ReactNode;
  deferredLeadingContent?: ReactNode;
  initiallyOpen?: boolean;
  className?: string;
  summaryClassName?: string;
  contentClassName?: string;
};

/** Native disclosure semantics, animated in both directions; deferred media stays lazy. */
export default function JournalDisclosure({ id, summary, children, deferredContent, deferredLeadingContent, initiallyOpen = false, className = "", summaryClassName = "", contentClassName = "" }: Props) {
  const generatedId = useId();
  const rootId = id ?? `journal-disclosure-${generatedId}`;
  const root = useRef<HTMLDetailsElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const animation = useRef<gsap.core.Tween | null>(null);
  const expandedRef = useRef(initiallyOpen);
  const previouslyVisible = useRef(initiallyOpen);
  const pendingNavigation = useRef(false);
  const [expanded, setExpanded] = useState(initiallyOpen);
  const [visible, setVisible] = useState(initiallyOpen);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!id) return;
    let frame = 0;
    const navigate = () => {
      pendingNavigation.current = currentJournalSection() === id;
      if (!pendingNavigation.current) return;
      if (!expandedRef.current) {
        expandedRef.current = true;
        setVisible(true);
        setExpanded(true);
      } else if (!animation.current?.isActive()) {
        frame = requestAnimationFrame(() => {
          if (pendingNavigation.current && root.current) scrollToJournalSection(root.current);
          pendingNavigation.current = false;
        });
      }
    };
    navigate();
    window.addEventListener("hashchange", navigate);
    window.addEventListener(JOURNAL_SECTION_EVENT, navigate);
    return () => {
      cancelAnimationFrame(frame);
      pendingNavigation.current = false;
      window.removeEventListener("hashchange", navigate);
      window.removeEventListener(JOURNAL_SECTION_EVENT, navigate);
    };
  }, [id]);

  useGSAP((_, contextSafe) => {
    const element = panel.current;
    if (!element) return;
    animation.current?.kill();

    if (!visible) {
      gsap.set(element, { height: 0, autoAlpha: 0 });
      previouslyVisible.current = false;
      return;
    }

    if (!previouslyVisible.current && expanded) {
      gsap.set(element, { height: 0, autoAlpha: 0 });
    }
    previouslyVisible.current = true;

    gsap.set(element, { overflow: "hidden" });

    // Height moves the following sections naturally; only the active panel is measured.
    animation.current = gsap.to(element, {
      height: expanded ? "auto" : 0,
      autoAlpha: expanded ? 1 : 0,
      duration: reducedMotion ? 0 : expanded ? 0.4 : 0.28,
      ease: "power2.inOut",
      overwrite: true,
      onComplete: contextSafe!(() => {
        if (expandedRef.current) {
          element.style.removeProperty("height");
          element.style.overflow = "visible";
          if (pendingNavigation.current && root.current) {
            pendingNavigation.current = false;
            scrollToJournalSection(root.current);
          }
        } else {
          setVisible(false);
        }
      }),
    });
  }, { scope: root, dependencies: [expanded, visible, reducedMotion] });

  return <details ref={root} id={rootId} className={`${styles.disclosureRoot} ${className}`} open={visible} data-expanded={expanded}>
    <summary id={`${rootId}-trigger`} className={summaryClassName} aria-expanded={expanded} aria-controls={`${rootId}-panel`} onClick={(event) => {
      event.preventDefault();
      const nextExpanded = !expandedRef.current;
      pendingNavigation.current = false;
      expandedRef.current = nextExpanded;
      if (nextExpanded) setVisible(true);
      setExpanded(nextExpanded);
    }}>{summary}</summary>
    <div ref={panel} id={`${rootId}-panel`} className={styles.disclosurePanel} role="region" aria-labelledby={`${rootId}-trigger`} aria-hidden={!expanded} inert={!expanded}>
      <div className={contentClassName}>
        {visible && deferredLeadingContent}
        {children}
        {visible && deferredContent}
      </div>
    </div>
  </details>;
}
