import Image from "next/image";
import { Locale } from "@/data/site";

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
type Experience = { period: string; title: string; description: string; skills: string[]; logo: string; logoAlt: string };

export default function About({ locale, selectedSkills = [] }: { locale: Locale; selectedSkills?: string[] }) {
  const experiences: Experience[] = locale === "fr" ? [
    { period: "juil. 2022 — aujourd’hui", title: "Freelance web", description: "ALEXIS GUERQUIN · Conception et développement web, de consoles web, logiciels et applications mobiles, direction artistique et outils digitaux.", skills: ["React", "Next.js", "JavaScript", "TypeScript", "HTML / CSS", "Product Design", "UX / UI", "Figma", "Photoshop"], logo: "/1739529957561.jpeg", logoAlt: "Alexis Guerquin" },
    { period: "déc. 2024 — mars 2025", title: "Développeur web", description: "The Tech Nation · Contrat à distance", skills: ["React", "Next.js", "TypeScript", "HTML / CSS"], logo: "/company-logos/the-tech-nation.ico", logoAlt: "Logo The Tech Nation" },
    { period: "mars 2024 — août 2024", title: "Consultant, développeur fullstack", description: "Capgemini · React, TypeScript, Next.js, NestJS et Flutter.", skills: ["React", "TypeScript", "Next.js", "NestJS", "Flutter"], logo: "/company-logos/capgemini.png", logoAlt: "Logo Capgemini" },
    { period: "mars 2022 — juil. 2022", title: "Développeur logiciels", description: "Touch & Sell (Zélit) · Développement front-end.", skills: ["React", "TypeScript", "HTML / CSS"], logo: "/company-logos/zelit.png", logoAlt: "Logo Zélit" },
  ] : [
    { period: "Jul. 2022 — present", title: "Freelance web developer", description: "ALEXIS GUERQUIN · Design and development of websites, web consoles, software and mobile apps, art direction and digital tools.", skills: ["React", "Next.js", "JavaScript", "TypeScript", "HTML / CSS", "Product Design", "UX / UI", "Figma", "Photoshop"], logo: "/1739529957561.jpeg", logoAlt: "Alexis Guerquin" },
    { period: "Dec. 2024 — Mar. 2025", title: "Web developer", description: "The Tech Nation · Remote contract", skills: ["React", "Next.js", "TypeScript", "HTML / CSS"], logo: "/company-logos/the-tech-nation.ico", logoAlt: "The Tech Nation logo" },
    { period: "Mar. 2024 — Aug. 2024", title: "Consultant, full-stack developer", description: "Capgemini · React, TypeScript, Next.js, NestJS and Flutter.", skills: ["React", "TypeScript", "Next.js", "NestJS", "Flutter"], logo: "/company-logos/capgemini.png", logoAlt: "Capgemini logo" },
    { period: "Mar. 2022 — Jul. 2022", title: "Software developer", description: "Touch & Sell (Zélit) · Front-end development.", skills: ["React", "TypeScript", "HTML / CSS"], logo: "/company-logos/zelit.png", logoAlt: "Zélit logo" },
  ];
  const filteredExperiences = selectedSkills.length ? experiences.filter(({ skills }) => selectedSkills.some((skill) => skills.some((item) => normalize(item) === normalize(skill)))) : experiences;
  return (
    <section id="about" className="site-column px-5 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-[560px]">
        <h2 className="text-3xl font-black leading-[1.05] tracking-[-.04em] sm:text-4xl">{locale === "fr" ? "Expériences en entreprises" : "Professional experience"}</h2>
        <div className="mt-8 divide-y divide-black/[.12] border-y border-black/[.12]">
          {filteredExperiences.map(({ period, title, description, logo, logoAlt }) => (
            <article key={title} className={`experience-row group grid gap-2 py-5 text-base sm:grid-cols-[180px_1fr] sm:gap-6 ${selectedSkills.length ? "skill-match" : ""}`} data-match-tooltip="Correspond aux compétences sélectionnées">
              <span className="experience-period">{period}</span>
              <div className="flex items-center gap-3"><div className="relative size-11 shrink-0 overflow-hidden rounded-[9px] border border-black/[.12] bg-white"><Image src={logo} alt={logoAlt} fill sizes="44px" className={logo === "/1739529957561.jpeg" ? "object-cover" : "object-contain p-1.5"} /></div><div><h3 className="font-bold">{title}</h3><p className="mt-1 text-black/55">{description}</p></div></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
