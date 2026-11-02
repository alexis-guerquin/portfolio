"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Play, X } from "lucide-react";
import type { Locale, PortfolioProject } from "@/data/site";

const DemoVideo = dynamic(() => import("./DemoVideo"), {
  ssr: false,
  loading: () => <p role="status" className="media-loading">Chargement de la vidéo…</p>,
});

type Visual = PortfolioProject["visuals"][number];

function MediaLightbox({ item, locale, close }: { item: Visual; locale: Locale; close: () => void }) {
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const returnFocus = document.activeElement as HTMLElement | null;
    const scroller = document.querySelector<HTMLElement>(".project-modal-content");
    const previousOverflow = scroller?.style.overflowY;
    if (scroller) scroller.style.overflowY = "hidden";
    closeButton.current?.focus({ preventScroll: true });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        close();
      }
      if (event.key === "Tab") {
        const controls = dialog.current?.querySelectorAll<HTMLElement>("button, video[controls], a[href]");
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      if (scroller) scroller.style.overflowY = previousOverflow ?? "";
      if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    };
  }, [close]);

  return createPortal(<div className="media-lightbox" role="presentation" onMouseDown={close}>
    <div ref={dialog} className={`media-lightbox-content media-lightbox-content--${item.format}`} style={{ aspectRatio: item.aspectRatio }} role="dialog" aria-modal="true" aria-label={item.alt[locale]} onMouseDown={(event) => event.stopPropagation()}>
      <button ref={closeButton} className="media-lightbox-close" type="button" onClick={close} aria-label={locale === "fr" ? "Fermer le média" : "Close media"}><X className="size-5" /></button>
      {item.kind === "video" ? <DemoVideo key={item.src} src={item.src} poster={item.poster} label={item.alt[locale]} className="media-lightbox-media" /> : <Image src={item.src} alt={item.alt[locale]} fill sizes="(max-width: 640px) 100vw, 1180px" className="media-lightbox-media" />}
    </div>
  </div>, document.body);
}

export default function ProjectMediaGrid({ visuals, locale, className = "" }: { visuals: Visual[]; locale: Locale; className?: string }) {
  const [expandedItem, setExpandedItem] = useState<Visual | null>(null);
  const closeMedia = useCallback(() => setExpandedItem(null), []);
  if (!visuals.length) return null;
  const groups = [
    { name: "project-portrait-media", items: visuals.filter((item) => item.format === "portrait") },
    { name: "project-additional-media", items: visuals.filter((item) => item.format !== "portrait") },
  ];
  return <section className={`project-visuals ${className}`} aria-label={locale === "fr" ? "Visuels" : "Visuals"}>
    {groups.map((group) => group.items.length > 0 && <div className={group.name} key={group.name}>{group.items.map((item) => <button key={item.src} type="button" className={`project-gallery project-gallery--${item.format}`} style={{ aspectRatio: item.aspectRatio }} aria-label={`${item.kind === "video" ? (locale === "fr" ? "Lire la vidéo" : "Play video") : (locale === "fr" ? "Agrandir" : "Enlarge")} : ${item.alt[locale]}`} onClick={() => setExpandedItem(item)}>
      <Image src={item.kind === "video" ? item.poster! : item.src} alt={item.alt[locale]} fill sizes={item.format === "portrait" ? "(max-width: 640px) 45vw, 280px" : "(max-width: 640px) 100vw, 840px"} className="project-media" loading="lazy" />
      {item.kind === "video" && <span className="project-video-play"><Play size={18} fill="currentColor" aria-hidden="true" /><span>{locale === "fr" ? "Lire la démo" : "Play demo"}</span></span>}
    </button>)}</div>)}
    {expandedItem && <MediaLightbox item={expandedItem} locale={locale} close={closeMedia} />}
  </section>;
}
