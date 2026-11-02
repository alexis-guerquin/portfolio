"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { getProjectById, type Locale, portfolio, type PortfolioProject } from "@/data/site";

const ProjectModal = dynamic(() => import("./ProjectModal"), { ssr: false, loading: () => <div className="project-overlay"><p className="project-loading" role="status">Chargement du projet…</p></div> });

export default function ProjectCarousel({ selectedSkills = [], locale, initialProjectId, children }: { selectedSkills?: string[]; locale: Locale; initialProjectId?: string; children?: ReactNode }) {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const openProject = (project: PortfolioProject) => {
    window.history.pushState({ project: project.id }, "", `${locale === "fr" ? "/fr" : ""}/${project.id}`);
    setSelectedProject(project);
  };
  const closeProject = () => {
    window.history.replaceState({}, "", locale === "fr" ? "/fr" : "/");
    setSelectedProject(null);
  };
  useEffect(() => { const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") closeProject(); }; window.addEventListener("keydown", closeOnEscape); return () => window.removeEventListener("keydown", closeOnEscape); }, []);
  useEffect(() => {
    if (initialProjectId) setSelectedProject(getProjectById(initialProjectId) ?? null);
  }, [initialProjectId]);
  useEffect(() => {
    const onPopState = () => setSelectedProject(getProjectById(window.location.pathname.split("/").filter(Boolean).at(-1) ?? "") ?? null);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
  useEffect(() => {
    const isOpen = Boolean(selectedProject);
    document.body.classList.toggle("modal-open", isOpen);
    document.documentElement.classList.toggle("modal-open", isOpen);
    const background = document.querySelector<HTMLElement>("[data-portfolio-background]");
    if (background) {
      background.inert = isOpen;
      if (isOpen) background.setAttribute("aria-hidden", "true");
      else background.removeAttribute("aria-hidden");
    }
    window.dispatchEvent(new Event("portfolio:project-visibility"));
    return () => {
      document.body.classList.remove("modal-open");
      document.documentElement.classList.remove("modal-open");
      if (background) { background.inert = false; background.removeAttribute("aria-hidden"); }
      window.dispatchEvent(new Event("portfolio:project-visibility"));
    };
  }, [selectedProject]);
  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
  const filteredProjects = selectedSkills.length ? portfolio.filter((project) => selectedSkills.some((skill) => [...project.contributions, ...(project.technologies || [])].some((item) => normalize(item) === normalize(skill)))) : portfolio;
  const label = locale === "fr" ? "Projets persos ou clients" : "Personal or client projects";
  return <section id="work" className="relative border-y border-black/[.10] bg-[#f7f7f7] py-16 sm:py-20"><div className="mx-auto mb-8 w-full max-w-[920px] px-5 sm:px-6"><h2 className="text-3xl font-black tracking-[-.04em] sm:text-4xl">{label}</h2></div><div className="marquee" aria-label={label}><div className="marquee-track">{[...filteredProjects, ...filteredProjects].map((item, index) => <article key={`${item.id}-${index}`} className={`group relative shrink-0 ${selectedSkills.length ? "skill-match" : ""}`} data-match-tooltip="Correspond aux compétences sélectionnées"><button type="button" onClick={() => openProject(item)} className="relative block text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4" aria-label={`${locale === "fr" ? "Ouvrir le projet" : "Open project"} ${item.title}`}><div className={`relative h-[285px] overflow-hidden rounded-[13px] border border-black/10 bg-[#e8e8e8] p-3 shadow-card sm:h-[340px] ${item.cardFormat === "portrait" ? "w-[220px] sm:w-[270px]" : "w-[380px] sm:w-[500px]"}`}><Image src={item.src} alt={item.alt} fill sizes={item.cardFormat === "portrait" ? "270px" : "500px"} loading="lazy" className="object-contain p-3 transition duration-500 group-hover:scale-[1.045]" /><div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 rounded-[9px] border border-black/[.12] bg-white px-3 py-2.5 shadow-[inset_0_0_0_1px_rgba(0,0,0,.035)]"><span className="min-w-0 text-base font-black tracking-[-.02em]">{item.title}</span><span className={`project-status project-status--${item.status.tone} project-card-status`}>{item.status.label[locale]}</span></div></div></button></article>)}</div></div>{children && <div className="mx-auto mt-7 w-full max-w-[920px] px-5 sm:mt-8 sm:px-6">{children}</div>}<div className="mx-auto mt-12 h-[3px] w-10 rounded-full bg-black" />{selectedProject && createPortal(<ProjectModal project={selectedProject} close={closeProject} locale={locale} />, document.body)}</section>;
}
