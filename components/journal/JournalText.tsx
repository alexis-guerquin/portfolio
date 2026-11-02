"use client";

import { Fragment, type ReactNode } from "react";
import { useJournalCopy } from "./JournalLocale";
import styles from "./Journal.module.css";

/** Small, safe inline format: emphasis and explicit links; never renders raw HTML. */
function inlineText(text: string, links: boolean, newTab: string): ReactNode {
  return text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g).map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      if (!links || !/^(https?:\/\/|\/(?!\/))/.test(href)) return <Fragment key={index}>{inlineText(label, false, newTab)}</Fragment>;
      const external = /^https?:\/\//.test(href);
      return <a key={index} className={styles.textLink} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
        {inlineText(label, false, newTab)}{external && <span className="sr-only">{newTab}</span>}
      </a>;
    }
    return part.startsWith("**") && part.endsWith("**") ? <strong key={index}>{part.slice(2, -2)}</strong> : part;
  });
}

export default function JournalText({ children, links = true }: { children: string; links?: boolean }) {
  return inlineText(children, links, useJournalCopy().newTab);
}
