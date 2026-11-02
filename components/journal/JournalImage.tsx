"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import type { JournalMedia } from "@/data/project-journal";
import { useJournalCopy } from "./JournalLocale";
import styles from "./Journal.module.css";

const JournalImageModal = dynamic(() => import("./JournalImageModal"), { ssr: false });

export type JournalImageItem = Pick<JournalMedia, "src" | "alt" | "width" | "height" | "caption">;

/** A lightweight thumbnail; the dialog and larger image load only after activation. */
export default function JournalImage({ item, sizes }: { item: JournalImageItem; sizes: string }) {
  const copy = useJournalCopy();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return <>
    <button type="button" className={styles.imagePreview} aria-label={copy.enlarge(item.alt)} aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}>
      <Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes={sizes} className={styles.mediaImage} loading="lazy" />
    </button>
    {open && <JournalImageModal item={item} onClose={close} />}
  </>;
}
