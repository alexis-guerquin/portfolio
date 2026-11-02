"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { JournalMedia as Media } from "@/data/project-journal";
import { useJournalCopy } from "./JournalLocale";
import JournalText from "./JournalText";
import { plainJournalText } from "./plain-text";
import JournalImage from "./JournalImage";
import styles from "./Journal.module.css";

function JournalVideo({ item }: { item: Media }) {
  const copy = useJournalCopy();
  const [playing, setPlaying] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const element = video.current;
    if (!playing || !element) return;
    if (item.video && element.getAttribute("src") !== item.video) { element.src = item.video; element.load(); }
    void element.play().catch(() => { /* Native controls remain available. */ });
    element.focus({ preventScroll: true });
    const pauseOffscreen = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) element.pause(); }, { threshold: 0.1 });
    pauseOffscreen.observe(element);
    const pauseWhenHidden = () => { if (document.hidden) element.pause(); };
    const playOnlyThisVideo = () => {
      document.querySelectorAll("video").forEach((other) => { if (other !== element) other.pause(); });
    };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    element.addEventListener("play", playOnlyThisVideo);
    return () => {
      pauseOffscreen.disconnect();
      document.removeEventListener("visibilitychange", pauseWhenHidden);
      element.removeEventListener("play", playOnlyThisVideo);
      element.pause();
      element.removeAttribute("src");
      element.load();
    };
  }, [playing, item.video]);
  return playing ? (
    <video ref={video} tabIndex={0} className={styles.mediaImage} src={item.video} poster={item.src} width={item.width} height={item.height} controls autoPlay playsInline preload="none" aria-label={plainJournalText(item.caption)} />
  ) : (
    <button type="button" className={styles.videoPreview} onClick={() => setPlaying(true)} aria-label={copy.play(plainJournalText(item.caption))}>
      <Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes={item.fullWidth ? "(max-width: 520px) calc(100vw - 40px), 480px" : "(max-width: 480px) 45vw, 200px"} className={styles.mediaImage} loading="lazy" />
      <span className={styles.playButton}><Play size={20} fill="currentColor" aria-hidden="true" /><span>{copy.playVideo}</span></span>
    </button>
  );
}

type Props = {
  items: Media[];
  label?: string;
  variant?: "gallery" | "feature";
  layout?: "comparison";
};

export default function JournalMedia({ items, label, variant = "gallery", layout }: Props) {
  const copy = useJournalCopy();
  if (!items.length) return null;
  label ??= copy.defaultMediaLabel;
  return <section className={styles.gallerySection} aria-label={label}>
    {variant === "gallery" && <div className={styles.galleryHeading}><h4>{label}</h4><span>{copy.visuals(items.length)}</span></div>}
    <div className={`${styles.mediaGrid} ${variant === "feature" ? styles.featureMediaGrid : ""} ${layout === "comparison" ? styles.comparisonGrid : ""}`} data-count={items.length}>
      {items.map((item) => <figure key={item.src} className={`${styles.mediaFigure} ${item.fullWidth || items.length === 1 ? styles.mediaWide : ""}`}>
        <div className={styles.mediaFrame}>
          {item.video ? <JournalVideo item={item} /> : <JournalImage item={item} sizes={item.fullWidth || items.length === 1 ? "(max-width: 520px) calc(100vw - 40px), 480px" : "(max-width: 480px) 45vw, 200px"} />}
        </div>
        <figcaption><JournalText>{item.caption}</JournalText></figcaption>
      </figure>)}
    </div>
  </section>;
}
