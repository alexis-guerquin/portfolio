"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, X } from "lucide-react";
import ProjectMediaGrid from "./ProjectMediaGrid";
import type { Locale, PortfolioProject } from "@/data/site";

const copy = { fr: { close: "Fermer", appleStore: "Apple Store", playStore: "Google Play", role: "Mon rôle", contribution: "Participation", technologies: "Technologies" }, en: { close: "Close", appleStore: "Apple Store", playStore: "Google Play", role: "My role", contribution: "Contribution", technologies: "Technologies" } };

function GooglePlayIcon() {
  return <svg className="store-icon store-icon--play" viewBox="0 0 48 48" aria-hidden="true"><path fill="#00a0ff" d="M5 3.4v41.2L28.3 24z" /><path fill="#ff3a44" d="m28.3 24 6.9-6.9L10.6 3.6z" /><path fill="#ffe000" d="M10.6 44.4 35.2 30.9 28.3 24z" /><path fill="#00d084" d="M35.2 17.1 41.8 21c1.6.9 1.6 3.1 0 4l-6.6 3.9-6.9-4.9z" /></svg>;
}

function AppleStoreIcon() {
  return <svg className="store-icon store-icon--apple" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.72 12.28c.02 2.08 1.83 2.77 1.85 2.78-.02.05-.29 1-.96 1.98-.58.84-1.18 1.68-2.13 1.7-.93.02-1.23-.55-2.3-.55-1.08 0-1.41.53-2.28.57-.92.03-1.62-.92-2.2-1.76-1.19-1.72-2.1-4.86-.88-6.98.61-1.05 1.68-1.72 2.84-1.74.89-.02 1.72.6 2.3.6.57 0 1.65-.74 2.78-.63.47.02 1.79.19 2.64 1.44-.07.04-1.58.92-1.56 2.57ZM15.27 5.79c.49-.59.82-1.41.73-2.23-.71.03-1.57.47-2.08 1.06-.46.53-.86 1.36-.75 2.16.79.06 1.6-.4 2.1-.99Z" /></svg>;
}

export default function ProjectModal({ project, close, locale }: { project: PortfolioProject; close: () => void; locale: Locale }) {
  const t = copy[locale];
  const projectLinks = <div className="project-links"><a className="project-cta" href={project.url} target="_blank" rel="noreferrer">{project.cta[locale]} <ArrowUpRight size={17} aria-hidden="true" /></a>{project.storeLinks && <div className="project-store-links" aria-label={locale === "fr" ? "Applications mobiles" : "Mobile apps"}><a href={project.storeLinks.apple} target="_blank" rel="noreferrer"><AppleStoreIcon /><span><strong>{t.appleStore}</strong></span><ArrowUpRight size={15} aria-hidden="true" /></a><a href={project.storeLinks.google} target="_blank" rel="noreferrer"><GooglePlayIcon /><span><strong>{t.playStore}</strong></span><ArrowUpRight size={15} aria-hidden="true" /></a></div>}</div>;
  return <div className="project-overlay" role="presentation" onMouseDown={close}>
    <article role="dialog" aria-modal="true" aria-labelledby="project-title" className="project-modal" onMouseDown={(event) => event.stopPropagation()}>
      <header className="project-modal-header"><div><p className="project-eyebrow">{project.type[locale]}</p><div className="project-title-row"><h2 id="project-title">{project.title}</h2><span className={`project-status project-status--${project.status.tone}`}>{project.status.label[locale]}</span></div></div><div className="project-modal-actions">{projectLinks}<button type="button" onClick={close} className="modal-close" aria-label={t.close}><X className="size-4" /></button></div></header>
      <div className="project-modal-content">
        <p className="project-tagline">{project.tagline[locale]}</p>
        {project.journal && <Link href={locale === "fr" ? `/fr${project.journal}` : project.journal} className="project-journal-link"><BookOpen size={18} aria-hidden="true" /><span><strong>{locale === "fr" ? "Journal de bord" : "Project journal"}</strong><small>{locale === "fr" ? `Les avancées de ${project.title}, semaine par semaine` : `Building ${project.title}, week by week`}</small></span><ArrowUpRight size={18} aria-hidden="true" /></Link>}
        <div className="project-intro">{project.description.map((paragraph) => <p key={paragraph.en}>{paragraph[locale]}</p>)}</div>
        {project.evolution?.map((step) => <section className="project-evolution" key={step.heading.en}><p className="project-eyebrow">{step.heading[locale]}</p><h3>{step.title[locale]}</h3>{step.description.map((paragraph) => <p key={paragraph.en}>{paragraph[locale]}</p>)}<ProjectMediaGrid visuals={step.visuals} locale={locale} className="project-visuals--evolution" /></section>)}
        <section className="project-role"><p className="section-label">{t.role}</p><h3>{project.role[locale]}</h3><p>{project.roleDescription[locale]}</p></section>
        <section><p className="section-label">{t.contribution}</p><div className="project-tags">{project.contributions.map((item) => <span key={item}>{item}</span>)}</div></section>
        {project.technologies && <section><p className="section-label">{t.technologies}</p><div className="project-tags">{project.technologies.map((item) => <span key={item}>{item}</span>)}</div></section>}
        {project.additionalNote && <section className="project-note"><p className="section-label">{project.additionalNote.heading[locale]}</p><p>{project.additionalNote.text[locale]}</p></section>}
        <ProjectMediaGrid visuals={project.visuals} locale={locale} className={`project-visuals--${project.id}`} />
        {project.id === "pocha" && <div className="pocha-app-icons" aria-label="POCHA"><Image src="/pocha/app-icon-1.webp" alt="Icône POCHA 1" width={88} height={88} /><Image src="/pocha/app-icon-2.webp" alt="Icône POCHA 2" width={88} height={88} /><Image src="/pocha/app-icon-3.webp" alt="Icône POCHA 3" width={88} height={88} /></div>}
      </div>
    </article>
  </div>;
}

