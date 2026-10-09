"use client";

import { useEffect, useRef } from "react";

type DemoVideoProps = {
  src: string;
  poster?: string;
  label: string;
  className: string;
  suspended?: boolean;
};

export default function DemoVideo({ src, poster, label, className, suspended = false }: DemoVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let visible = false;
    let disposed = false;
    const shouldPlay = () => visible && !suspended && !document.hidden && !disposed;
    const updatePlayback = () => {
      if (!shouldPlay()) {
        video.pause();
        return;
      }

      // Omitting src until the first visible frame prevents offscreen downloads.
      if (!video.getAttribute("src")) {
        video.src = src;
        video.load();
      }
      void video.play().then(() => {
        if (!disposed && !shouldPlay()) video.pause();
      }).catch(() => {
        // Autoplay can be blocked; keep the poster and allow manual playback.
      });
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.1;
      updatePlayback();
    }, { threshold: [0, 0.1] });

    observer.observe(video);
    document.addEventListener("visibilitychange", updatePlayback);
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      video.pause();
    };
  }, [src, suspended]);

  // Release the decoder and any in-flight download when the media is unmounted.
  useEffect(() => {
    const video = videoRef.current;
    return () => {
      if (!video) return;
      video.removeAttribute("src");
      video.load();
    };
  }, [src]);

  return <video
    ref={videoRef}
    className={className}
    poster={poster}
    aria-label={label}
    preload="none"
    loop
    muted
    playsInline
    controls={className === "media-lightbox-media"}
  />;
}
