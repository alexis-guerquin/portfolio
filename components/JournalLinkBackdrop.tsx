"use client";

import { useRef } from "react";
import { BookOpen } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import styles from "./ProjectJournals.module.css";

gsap.registerPlugin(useGSAP);

/** Decorative motion stays idle offscreen, in hidden tabs and behind project dialogs. */
export default function JournalLinkBackdrop() {
  const root = useRef<HTMLSpanElement>(null);
  const book = useRef<SVGSVGElement>(null);
  useGSAP(() => {
    if (!root.current || !book.current) return;
    const element = root.current;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const motion = gsap.fromTo(book.current, { yPercent: -50, y: 3, rotation: -12 }, {
        yPercent: -50, y: -3, rotation: -6, duration: 3.6, ease: "sine.inOut", repeat: -1, yoyo: true, paused: true,
      });
      let visible = false;
      const update = () => {
        const active = visible && !document.hidden && !document.body.classList.contains("modal-open");
        if (active) motion.resume();
        else motion.pause();
      };
      const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
      observer.observe(element);
      document.addEventListener("visibilitychange", update);
      window.addEventListener("portfolio:project-visibility", update);
      return () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", update);
        window.removeEventListener("portfolio:project-visibility", update);
      };
    });
    return () => media.revert();
  }, { scope: root });

  return <span ref={root} className={styles.backdrop} aria-hidden="true"><BookOpen ref={book} className={styles.book} strokeWidth={1.25} /></span>;
}
