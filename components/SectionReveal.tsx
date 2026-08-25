"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function SectionReveal({ children }: { children: ReactNode }) {
  const section = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !section.current) return;

    gsap.from(section.current, {
      autoAlpha: 0,
      y: 24,
      duration: 0.72,
      ease: "power3.out",
      scrollTrigger: { trigger: section.current, start: "top 88%", once: true },
    });
  }, { scope: section });

  return <div ref={section}>{children}</div>;
}
