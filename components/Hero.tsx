import Image from "next/image";
import { ArrowDown, Phone, RotateCcw } from "lucide-react";
import { Locale } from "@/data/site";

const expertise = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js", "NestJS", "React Native", "Flutter", "Swift", "SwiftUI", "iOS", "Angular", "HTML / CSS", "Firebase",
  "Product Design", "UX / UI", "Design System", "Gamification", "Illustration", "Motion", "Figma", "Photoshop", "Git", "GitHub", "GitLab", "Azure DevOps", "Jira",
];

export default function Hero({ locale, selectedSkills, onToggleSkill, onReset }: { locale: Locale; selectedSkills: string[]; onToggleSkill: (skill: string) => void; onReset: () => void }) {
  const t = locale === "fr" ? { greeting: <>Hey, je suis Alexis,<br />travaillons <span className="relative inline-block whitespace-nowrap">ensemble !<span className="ml-1.5 inline-block rotate-[-7deg] align-middle text-xs font-medium tracking-normal text-black/55 sm:absolute sm:left-[calc(100%+.5rem)] sm:top-1/2 sm:ml-0 sm:-translate-y-1/2 sm:text-sm">sur vos projets</span></span></>, available: "Disponible pour de nouvelles opportunités", contact: "Me contacter", discover: "Découvrez ce que je sais faire", expertise: "Technologies & expertises", reset: "Réinitialiser", label: "Technologies et expertises maîtrisées" } : { greeting: <>Hey, I&apos;m Alexis,<br />let&apos;s build <span className="relative inline-block whitespace-nowrap">together!<span className="ml-1.5 inline-block rotate-[-7deg] align-middle text-xs font-medium tracking-normal text-black/55 sm:absolute sm:left-[calc(100%+.5rem)] sm:top-1/2 sm:ml-0 sm:-translate-y-1/2 sm:text-sm">your projects</span></span></>, available: "Available for new opportunities", contact: "Contact me", discover: "Discover what I can do", expertise: "Technologies & expertise", reset: "Reset", label: "Technologies and areas of expertise" };
  return (
    <section id="top" className="mx-auto flex w-full max-w-[920px] flex-col items-center justify-start px-5 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-24">
      <div className="w-full max-w-[520px]">
        <div className="mb-6 flex items-center gap-2">
          <div className="relative size-[72px] overflow-hidden rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,.16)]">
            <Image src="/1739529957561.jpeg" alt="Alexis Guerquin" fill sizes="72px" className="object-cover" priority />
          </div>
        </div>
        <h1 className="max-w-[600px] text-[2.15rem] font-black leading-[1.05] tracking-tightest sm:text-5xl">
          {t.greeting}
        </h1>
        <div className="mt-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.055em] text-[#438d20] sm:text-sm sm:tracking-[.07em]">
          <span className="size-2 rounded-full bg-[#6acf35] shadow-[0_0_0_4px_rgba(106,207,53,.12)]" />
          {t.available}
        </div>
        <a href="#contact" className="button-motion group mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-[8px] bg-[#171717] text-sm font-semibold text-white shadow-sm">
          {t.contact}
          <Phone className="phone-vibrate size-3.5" aria-hidden="true" />
        </a>
        <a href="#expertises" className="skills-discovery-button group mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-[8px] border border-black/15 text-sm font-semibold text-[#171717]">
          {t.discover}
          <ArrowDown className="skills-discovery-arrow size-4" aria-hidden="true" />
        </a>
        <section id="expertises" className="expertise-tags scroll-mt-8" aria-label={t.label}>
          <div className="expertise-tags-heading"><p>{t.expertise}</p>{selectedSkills.length > 0 && <button type="button" onClick={onReset} className="skill-reset"><RotateCcw className="size-3" /> {t.reset}</button>}</div>
          <ul>{expertise.map((item) => <li key={item}><button type="button" className={`skill-tag ${selectedSkills.includes(item) ? "is-active" : ""}`} aria-pressed={selectedSkills.includes(item)} onClick={() => onToggleSkill(item)}>{item}</button></li>)}</ul>
        </section>
      </div>
    </section>
  );
}
