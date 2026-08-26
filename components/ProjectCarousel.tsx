"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { ExternalLinkIcon } from "@animateicons/react/lucide";
import LoopingAnimateIcon from "@/components/LoopingAnimateIcon";
import { getProjectById, Locale, portfolio, PortfolioProject } from "@/data/site";

const copy = { fr: { role: "Mon rôle", contribution: "Participation", technologies: "Technologies", visuals: "Visuels", close: "Fermer", enlarge: "Agrandir le média", appleStore: "Apple Store", playStore: "Google Play", comingSoon: "Prochainement" }, en: { role: "My role", contribution: "Contribution", technologies: "Technologies", visuals: "Visuals", close: "Close", enlarge: "Enlarge media", appleStore: "Apple Store", playStore: "Google Play", comingSoon: "Coming soon" } };

function Media({ item, locale, className = "project-media" }: { item: PortfolioProject["visuals"][number]; locale: Locale; className?: string }) {
  return item.kind === "video" ? <video key={item.src} className={className} src={item.src} aria-label={item.alt[locale]} autoPlay loop muted playsInline /> : <Image src={item.src} alt={item.alt[locale]} fill sizes="(max-width: 640px) 100vw, 920px" className={className} />;
}

function GooglePlayIcon() {
  return <svg className="store-icon store-icon--play" viewBox="0 0 48 48" aria-hidden="true"><path fill="#00a0ff" d="M5 3.4v41.2L28.3 24z" /><path fill="#ff3a44" d="m28.3 24 6.9-6.9L10.6 3.6z" /><path fill="#ffe000" d="M10.6 44.4 35.2 30.9 28.3 24z" /><path fill="#00d084" d="M35.2 17.1 41.8 21c1.6.9 1.6 3.1 0 4l-6.6 3.9-6.9-4.9z" /></svg>;
}

function AppleStoreIcon() {
  return <svg className="store-icon store-icon--apple" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.72 12.28c.02 2.08 1.83 2.77 1.85 2.78-.02.05-.29 1-.96 1.98-.58.84-1.18 1.68-2.13 1.7-.93.02-1.23-.55-2.3-.55-1.08 0-1.41.53-2.28.57-.92.03-1.62-.92-2.2-1.76-1.19-1.72-2.1-4.86-.88-6.98.61-1.05 1.68-1.72 2.84-1.74.89-.02 1.72.6 2.3.6.57 0 1.65-.74 2.78-.63.47.02 1.79.19 2.64 1.44-.07.04-1.58.92-1.56 2.57ZM15.27 5.79c.49-.59.82-1.41.73-2.23-.71.03-1.57.47-2.08 1.06-.46.53-.86 1.36-.75 2.16.79.06 1.6-.4 2.1-.99Z" /></svg>;
}

function ProjectMediaGrid({ visuals, locale, className = "" }: { visuals: PortfolioProject["visuals"]; locale: Locale; className?: string }) {
  const [expandedItem, setExpandedItem] = useState<PortfolioProject["visuals"][number] | null>(null);
  if (!visuals.length) return null;
  const portraitMedia = visuals.filter((item) => item.format === "portrait");
  const additionalMedia = visuals.filter((item) => item.format !== "portrait");
  return <section className={`project-visuals ${className}`} aria-label={copy[locale].visuals}>
    {portraitMedia.length > 0 && <div className="project-portrait-media">{portraitMedia.map((item) => <button key={item.src} type="button" className="project-gallery project-gallery--portrait" style={{ aspectRatio: item.aspectRatio }} aria-label={copy[locale].enlarge} onClick={() => setExpandedItem(item)}><Media item={item} locale={locale} /></button>)}</div>}
    {additionalMedia.length > 0 && <div className="project-additional-media">{additionalMedia.map((item) => <button key={item.src} type="button" className={`project-gallery project-gallery--${item.format}`} style={{ aspectRatio: item.aspectRatio }} aria-label={copy[locale].enlarge} onClick={() => setExpandedItem(item)}><Media item={item} locale={locale} /></button>)}</div>}
    {expandedItem && createPortal(<div className="media-lightbox" role="presentation" onMouseDown={() => setExpandedItem(null)}><div className={`media-lightbox-content media-lightbox-content--${expandedItem.format}`} style={{ aspectRatio: expandedItem.aspectRatio }} role="dialog" aria-modal="true" aria-label={expandedItem.alt[locale]} onMouseDown={(event) => event.stopPropagation()}><button className="media-lightbox-close" type="button" onClick={() => setExpandedItem(null)} aria-label={copy[locale].close}><X className="size-5" /></button><Media item={expandedItem} locale={locale} className="media-lightbox-media" /></div></div>, document.body)}
  </section>;
}

function ProjectModal({ project, close, locale }: { project: PortfolioProject; close: () => void; locale: Locale }) {
  const t = copy[locale];
  const projectLinks = <div className="project-links"><a className="project-cta" href={project.url} target="_blank" rel="noreferrer">{project.cta[locale]} <LoopingAnimateIcon icon={ExternalLinkIcon} size={17} color="currentColor" /></a>{project.storeLinks && <div className="project-store-links" aria-label={locale === "fr" ? "Applications mobiles" : "Mobile apps"}><a href={project.storeLinks.apple} target="_blank" rel="noreferrer"><AppleStoreIcon /><span><strong>{t.appleStore}</strong><small>{t.comingSoon}</small></span><LoopingAnimateIcon icon={ExternalLinkIcon} size={15} color="currentColor" /></a><a href={project.storeLinks.google} target="_blank" rel="noreferrer"><GooglePlayIcon /><span><strong>{t.playStore}</strong><small>{t.comingSoon}</small></span><LoopingAnimateIcon icon={ExternalLinkIcon} size={15} color="currentColor" /></a></div>}</div>;
  return <div className="project-overlay" role="presentation" onMouseDown={close}>
    <article role="dialog" aria-modal="true" aria-labelledby="project-title" className="project-modal" onMouseDown={(event) => event.stopPropagation()}>
      <header className="project-modal-header"><div><p className="project-eyebrow">{project.type[locale]}</p><div className="project-title-row"><h2 id="project-title">{project.title}</h2><span className={`project-status project-status--${project.status.tone}`}>{project.status.label[locale]}</span></div></div><div className="project-modal-actions">{projectLinks}<button type="button" onClick={close} className="modal-close" aria-label={t.close}><X className="size-4" /></button></div></header>
      <div className="project-modal-content">
        <p className="project-tagline">{project.tagline[locale]}</p>
        <div className="project-intro">{project.description.map((paragraph) => <p key={paragraph.en}>{paragraph[locale]}</p>)}</div>
        {project.evolution?.map((step) => <section className="project-evolution" key={step.heading.en}><p className="project-eyebrow">{step.heading[locale]}</p><h3>{step.title[locale]}</h3>{step.description.map((paragraph) => <p key={paragraph.en}>{paragraph[locale]}</p>)}<ProjectMediaGrid visuals={step.visuals} locale={locale} className="project-visuals--evolution" /></section>)}
        <section className="project-role"><p className="section-label">{t.role}</p><h3>{project.role[locale]}</h3><p>{project.roleDescription[locale]}</p></section>
        <section><p className="section-label">{t.contribution}</p><div className="project-tags">{project.contributions.map((item) => <span key={item}>{item}</span>)}</div></section>
        {project.technologies && <section><p className="section-label">{t.technologies}</p><div className="project-tags">{project.technologies.map((item) => <span key={item}>{item}</span>)}</div></section>}
        {project.additionalNote && <section className="project-note"><p className="section-label">{project.additionalNote.heading[locale]}</p><p>{project.additionalNote.text[locale]}</p></section>}
        <ProjectMediaGrid visuals={project.visuals} locale={locale} className={`project-visuals--${project.id}`} />
        {project.id === "pocha" && <div className="pocha-app-icons" aria-label="POCHA"><Image src="/pocha/POCHA-ICON1.png" alt="Icône POCHA 1" width={88} height={88} /><Image src="/pocha/POCHA-ICON2.png" alt="Icône POCHA 2" width={88} height={88} /><Image src="/pocha/POCHA-ICON3.png" alt="Icône POCHA 3" width={88} height={88} /></div>}
      </div>
    </article>
  </div>;
}

export default function ProjectCarousel({ selectedSkills = [], locale, initialProjectId }: { selectedSkills?: string[]; locale: Locale; initialProjectId?: string }) {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const openProject = (project: PortfolioProject) => {
    window.history.pushState({ project: project.id }, "", `/${project.id}`);
    setSelectedProject(project);
  };
  const closeProject = () => {
    window.history.replaceState({}, "", "/");
    setSelectedProject(null);
  };
  useEffect(() => { const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") closeProject(); }; window.addEventListener("keydown", closeOnEscape); return () => window.removeEventListener("keydown", closeOnEscape); }, []);
  useEffect(() => {
    if (initialProjectId) setSelectedProject(getProjectById(initialProjectId) ?? null);
  }, [initialProjectId]);
  useEffect(() => {
    const onPopState = () => setSelectedProject(getProjectById(window.location.pathname.slice(1)) ?? null);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
  useEffect(() => {
    const isOpen = Boolean(selectedProject);
    document.body.classList.toggle("modal-open", isOpen);
    document.documentElement.classList.toggle("modal-open", isOpen);
    return () => {
      document.body.classList.remove("modal-open");
      document.documentElement.classList.remove("modal-open");
    };
  }, [selectedProject]);
  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
  const filteredProjects = selectedSkills.length ? portfolio.filter((project) => selectedSkills.some((skill) => [...project.contributions, ...(project.technologies || [])].some((item) => normalize(item) === normalize(skill)))) : portfolio;
  const label = locale === "fr" ? "Projets persos ou clients" : "Personal or client projects";
  return <section id="work" className="relative border-y border-black/[.10] bg-[#f7f7f7] py-16 sm:py-20"><div className="mx-auto mb-8 w-full max-w-[920px] px-5 sm:px-6"><h2 className="text-3xl font-black tracking-[-.04em] sm:text-4xl">{label}</h2></div><div className="marquee" aria-label={label}><div className="marquee-track">{[...filteredProjects, ...filteredProjects].map((item, index) => <article key={`${item.id}-${index}`} className={`group relative shrink-0 ${selectedSkills.length ? "skill-match" : ""}`} data-match-tooltip="Correspond aux compétences sélectionnées"><button type="button" onClick={() => openProject(item)} className="relative block text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4" aria-label={`${locale === "fr" ? "Ouvrir le projet" : "Open project"} ${item.title}`}><div className={`relative h-[285px] overflow-hidden rounded-[13px] border border-black/10 bg-[#e8e8e8] p-3 shadow-card sm:h-[340px] ${item.cardFormat === "portrait" ? "w-[220px] sm:w-[270px]" : "w-[380px] sm:w-[500px]"}`}><Image src={item.src} alt={item.alt} fill sizes={item.cardFormat === "portrait" ? "270px" : "500px"} priority={index < 3} className="object-contain p-3 transition duration-500 group-hover:scale-[1.045]" /><div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 rounded-[9px] border border-black/[.12] bg-white px-3 py-2.5 shadow-[inset_0_0_0_1px_rgba(0,0,0,.035)]"><span className="min-w-0 text-base font-black tracking-[-.02em]">{item.title}</span><span className={`project-status project-status--${item.status.tone} project-card-status`}>{item.status.label[locale]}</span></div></div></button></article>)}</div></div><div className="mx-auto mt-12 h-[3px] w-10 rounded-full bg-black" />{selectedProject && createPortal(<ProjectModal project={selectedProject} close={closeProject} locale={locale} />, document.body)}</section>;
}
