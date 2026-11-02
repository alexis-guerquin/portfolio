"use client";

import { useEffect, useRef } from "react";

type DemoVideoProps = {
  src: string;
  poster?: string;
  label: string;
  className: string;
};

/** Mounted only after opening a demo; never decodes video in the scrolling gallery. */
export default function DemoVideo({ src, poster, label, className }: DemoVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Restore the source when React replays effects in development.
    if (video.getAttribute("src") !== src) { video.src = src; video.load(); }
    void video.play().catch(() => { /* Native controls remain available. */ });
    video.focus({ preventScroll: true });
    const pauseWhenHidden = () => { if (document.hidden) video.pause(); };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => {
      document.removeEventListener("visibilitychange", pauseWhenHidden);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [src]);

  return <video ref={videoRef} src={src} className={className} poster={poster} aria-label={label}
    tabIndex={0} preload="none" autoPlay muted playsInline controls />;
}
