"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type StickerState = "idle" | "playing" | "ended";

type InteractiveVideoStickerProps = {
  previewSrc: string;
  videoSrc: string;
  previewAlt: string;
  hint?: string;
  className?: string;
  globalCount?: number;
  interactionLabel?: string;
  onInteraction?: () => void;
};

const QUEUE_TARGET_DURATION_MS = 4_000;
const QUEUE_BURST_TARGET_DURATION_MS = 1_500;
const FALLBACK_VIDEO_DURATION_SECONDS = 3.05;

function AnimatedInteractionCount({ count, label }: { count: number; label: string }) {
  const [displayedCount, setDisplayedCount] = useState(count);
  const displayedCountRef = useRef(count);

  useEffect(() => {
    const from = displayedCountRef.current;
    const difference = count - from;
    const duration = Math.min(650, Math.max(260, Math.abs(difference) * 70));
    const startedAt = window.performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      // Ease out keeps the counter lively without drawing attention away from the hero.
      const easedProgress = 1 - (1 - progress) ** 3;
      const nextValue = Math.round(from + difference * easedProgress);
      displayedCountRef.current = nextValue;
      setDisplayedCount(nextValue);

      if (progress < 1) frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [count]);

  return <>{displayedCount} {label}</>;
}

/**
 * A lightweight, reusable video sticker. The video is only played after an
 * explicit interaction; metadata is preloaded so the first click feels prompt.
 */
export default function InteractiveVideoSticker({
  previewSrc,
  videoSrc,
  previewAlt,
  hint = "hey! click me",
  className = "",
  globalCount,
  interactionLabel = "crocs",
  onInteraction,
}: InteractiveVideoStickerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isPlayingRef = useRef(false);
  const playbackRateRef = useRef(1);
  const queuedReplaysRef = useRef(0);
  const queueStartedAtRef = useRef<number | null>(null);
  const [state, setState] = useState<StickerState>("idle");
  const [playbackRate, setPlaybackRate] = useState(1);
  const [videoUnavailable, setVideoUnavailable] = useState(false);

  // Keeps a burst of clicks very compact: every queued full replay is preserved,
  // while its speed is adjusted to clear the remaining queue in about 1.5 seconds.
  const adaptPlaybackRateToQueue = () => {
    const video = videoRef.current;
    if (!video) return;

    const duration = Number.isFinite(video.duration) && video.duration > 0
      ? video.duration
      : FALLBACK_VIDEO_DURATION_SECONDS;
    const elapsed = queueStartedAtRef.current === null
      ? 0
      : window.performance.now() - queueStartedAtRef.current;
    const remainingTime = Math.max(
      150,
      Math.min(QUEUE_BURST_TARGET_DURATION_MS, QUEUE_TARGET_DURATION_MS - elapsed),
    ) / 1_000;
    const remainingVideoTime = Math.max(duration - video.currentTime, 0) + queuedReplaysRef.current * duration;
    const nextRate = Math.max(1, remainingVideoTime / remainingTime);

    video.playbackRate = nextRate;
    playbackRateRef.current = nextRate;
    setPlaybackRate(nextRate);
  };

  const play = () => {
    const video = videoRef.current;
    if (!video || videoUnavailable) return;

    onInteraction?.();

    if (isPlayingRef.current) {
      queuedReplaysRef.current += 1;
      adaptPlaybackRateToQueue();
      return;
    }

    isPlayingRef.current = true;
    queueStartedAtRef.current = window.performance.now();
    video.currentTime = 0;
    video.playbackRate = 1;
    playbackRateRef.current = 1;
    setPlaybackRate(1);
    setState("playing");
    void video.play().catch(() => {
      isPlayingRef.current = false;
      setVideoUnavailable(true);
      setState("idle");
    });
  };

  const handleEnded = () => {
    const video = videoRef.current;

    if (video && queuedReplaysRef.current > 0) {
      queuedReplaysRef.current -= 1;
      video.currentTime = 0;
      adaptPlaybackRateToQueue();
      void video.play().catch(() => {
        isPlayingRef.current = false;
        queueStartedAtRef.current = null;
        setVideoUnavailable(true);
        setState("idle");
      });
      return;
    }

    isPlayingRef.current = false;
    playbackRateRef.current = 1;
    queueStartedAtRef.current = null;
    setState("ended");
    setPlaybackRate(1);
    window.requestAnimationFrame(() => setState("idle"));
  };

  const isPlaying = state === "playing";

  return (
    <div className={`group/sticker relative isolate w-[132px] sm:w-[158px] ${className}`}>
      <button
        type="button"
        role="button"
        onClick={play}
        className="relative block aspect-square w-full cursor-pointer rounded-[24%] text-left outline-none transition-transform duration-500 ease-out hover:-translate-y-1 hover:scale-[1.025] focus-visible:ring-2 focus-visible:ring-[#181818] focus-visible:ring-offset-4 active:scale-[0.985]"
        aria-label={isPlaying ? `La vidéo est en lecture à vitesse ${playbackRate}x. Cliquez pour accélérer.` : "Lire la vidéo de présentation d’Alexis"}
      >
        <Image
          src={previewSrc}
          alt={previewAlt}
          fill
          sizes="(max-width: 640px) 132px, 158px"
          className={`rounded-[24%] object-cover shadow-[0_12px_28px_rgba(0,0,0,0.12)] transition-opacity duration-200 ${isPlaying ? "opacity-0" : "opacity-100"}`}
        />
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload="metadata"
          onEnded={handleEnded}
          onError={() => setVideoUnavailable(true)}
          className={`absolute inset-0 size-full rounded-[24%] object-cover shadow-[0_12px_28px_rgba(0,0,0,0.12)] transition-opacity duration-200 ${isPlaying ? "opacity-100" : "pointer-events-none opacity-0"}`}
          aria-hidden="true"
        />
      </button>

      <div
        className={`pointer-events-none absolute -right-10 -top-5 origin-bottom-left text-[#777]/80 transition-all duration-300 sm:-right-12 ${isPlaying ? "translate-y-1 opacity-0" : "translate-y-0 opacity-100 group-hover/sticker:-translate-y-0.5"}`}
        aria-hidden="true"
      >
        <svg className="absolute -bottom-8 -left-7 h-10 w-11 -rotate-[23deg]" viewBox="0 0 48 40" fill="none">
          <path d="M43 4C31 5 19 11 12 27M12 27l-2-8m2 8 8-1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="block -rotate-[7deg] whitespace-nowrap font-serif text-sm italic tracking-[-0.04em]">{hint}</span>
      </div>

      {typeof globalCount === "number" && (
        <p className="absolute -bottom-5 left-1/2 m-0 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.12em] text-black/35" aria-live="polite">
          <AnimatedInteractionCount count={globalCount} label={interactionLabel} />
        </p>
      )}
      {videoUnavailable && <span className="sr-only">La vidéo n’est pas disponible. L’image de présentation reste affichée.</span>}
    </div>
  );
}
