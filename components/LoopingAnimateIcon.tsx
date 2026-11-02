"use client";

import { useEffect, useRef, type ForwardRefExoticComponent, type RefAttributes } from "react";

type AnimateIconHandle = { startAnimation: () => void; stopAnimation: () => void };
type AnimateIconProps = { className?: string; color?: string; duration?: number; isAnimated?: boolean; size?: number };
type AnimateIconComponent = ForwardRefExoticComponent<AnimateIconProps & RefAttributes<AnimateIconHandle>>;

export default function LoopingAnimateIcon({ icon: Icon, duration = 1, ...props }: AnimateIconProps & { icon: AnimateIconComponent }) {
  const icon = useRef<AnimateIconHandle>(null);
  const element = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = element.current;
    if (!root) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let interval: ReturnType<typeof setInterval> | undefined;
    const update = () => {
      const covered = document.body.classList.contains("modal-open") && !root.closest(".project-overlay, .media-lightbox");
      const active = visible && !document.hidden && !reducedMotion.matches && !covered;
      if (active && !interval) {
        icon.current?.startAnimation();
        interval = setInterval(() => icon.current?.startAnimation(), duration * 1000 + 600);
      } else if (!active) {
        clearInterval(interval);
        interval = undefined;
        icon.current?.stopAnimation();
      }
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(root);
    document.addEventListener("visibilitychange", update);
    window.addEventListener("portfolio:project-visibility", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      observer.disconnect();
      clearInterval(interval);
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("portfolio:project-visibility", update);
      reducedMotion.removeEventListener("change", update);
      icon.current?.stopAnimation();
    };
  }, [duration]);

  return <span ref={element} className="inline-flex shrink-0" aria-hidden="true"><Icon ref={icon} duration={duration} {...props} /></span>;
}
