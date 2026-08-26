"use client";

import { useState } from "react";
import { ExternalLinkIcon } from "@animateicons/react/lucide";
import LoopingAnimateIcon from "@/components/LoopingAnimateIcon";
import About from "@/components/About";
import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoSections from "@/components/InfoSections";
import ProcessStrip from "@/components/ProcessStrip";
import ProjectCarousel from "@/components/ProjectCarousel";
import ServiceConfigurator from "@/components/ServiceConfigurator";
import SectionReveal from "@/components/SectionReveal";
import { Locale } from "@/data/site";

export default function Home({ initialProjectId }: { initialProjectId?: string }) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [locale, setLocale] = useState<Locale>("fr");

  return (
    <main className="min-h-screen bg-white text-[#181818]">
      <div className="site-column min-h-[1px]">
        <Header locale={locale} setLocale={setLocale} />
        <SectionReveal><Hero locale={locale} selectedSkills={selectedSkills} onToggleSkill={(skill) => setSelectedSkills((skills) => skills.includes(skill) ? skills.filter((item) => item !== skill) : [...skills, skill])} onReset={() => setSelectedSkills([])} /></SectionReveal>
      </div>
      <SectionReveal><ProjectCarousel locale={locale} selectedSkills={selectedSkills} initialProjectId={initialProjectId} /></SectionReveal>
      <SectionReveal><ServiceConfigurator locale={locale} /></SectionReveal>
      <SectionReveal><ProcessStrip locale={locale} /></SectionReveal>
      <SectionReveal><InfoSections locale={locale} /></SectionReveal>
      <SectionReveal><About locale={locale} selectedSkills={selectedSkills} /></SectionReveal>
      <SectionReveal><ContactForm locale={locale} /></SectionReveal>
      <footer className="border-t border-black/[.10] py-6 text-center text-sm text-black/55">© 2026 Alexis Guerquin · <a className="footer-link inline-flex items-center gap-1" href="https://www.linkedin.com/in/alexis-guerquin/" target="_blank" rel="noreferrer">LinkedIn <LoopingAnimateIcon icon={ExternalLinkIcon} size={14} color="currentColor" /></a></footer>
    </main>
  );
}
