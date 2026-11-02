"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { JournalImageItem } from "./JournalImage";
import { useJournalCopy } from "./JournalLocale";
import JournalText from "./JournalText";
import styles from "./Journal.module.css";

export default function JournalImageModal({ item, onClose }: { item: JournalImageItem; onClose: () => void }) {
  const copy = useJournalCopy();
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const captionId = useId();
  const [closing, setClosing] = useState(false);
  const requestClose = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) onClose();
    else setClosing(true);
  }, [onClose]);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const previousGutter = root.style.scrollbarGutter;
    root.style.scrollbarGutter = "stable";
    root.style.overflow = "hidden";
    // A native modal supplies the focus trap and makes the underlying page inert.
    element.showModal();
    closeButton.current?.focus({ preventScroll: true });
    return () => {
      element.close();
      root.style.overflow = previousOverflow;
      root.style.scrollbarGutter = previousGutter;
      if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    if (!closing) return;
    // Also completes if the reduced-motion preference changes during the exit.
    const timeout = window.setTimeout(onClose, 160);
    return () => window.clearTimeout(timeout);
  }, [closing, onClose]);

  return createPortal(<dialog ref={dialog} lang={copy.htmlLang} className={styles.imageDialog} data-closing={closing} aria-modal="true" aria-labelledby={titleId} aria-describedby={item.caption ? captionId : undefined} onCancel={(event) => {
    event.preventDefault();
    requestClose();
  }} onPointerDown={(event) => {
    if (event.target === event.currentTarget) requestClose();
  }}>
    <div className={styles.imageDialogToolbar}>
      <p id={titleId} className={styles.imageDialogTitle}>{item.alt}</p>
      <button ref={closeButton} type="button" className={styles.imageDialogClose} aria-label={copy.closeImage} onClick={requestClose}><X size={20} aria-hidden="true" /></button>
    </div>
    <figure className={styles.imageDialogFigure}>
      <Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes={`(max-width: 700px) calc(100vw - 32px), ${Math.min(item.width, 1180)}px`} className={styles.imageDialogImage} loading="eager" />
      {item.caption && <figcaption id={captionId}><JournalText>{item.caption}</JournalText></figcaption>}
    </figure>
  </dialog>, document.body);
}
