import Image from "next/image";
import { BriefcaseBusiness, Layers3, Phone } from "lucide-react";
import { Locale } from "@/data/site";

function LinkedInIcon() {
  return <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 3H3.55C3.25 3 3 3.25 3 3.55v16.9c0 .3.25.55.55.55h16.9c.3 0 .55-.25.55-.55V3.55c0-.3-.25-.55-.55-.55ZM8.34 18.34H5.67V9.75h2.67v8.59ZM7 8.58a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1Zm11.35 9.76h-2.66v-4.18c0-1 0-2.28-1.39-2.28-1.39 0-1.6 1.08-1.6 2.2v4.26H10.04V9.75h2.56v1.17h.04c.36-.67 1.23-1.39 2.53-1.39 2.7 0 3.2 1.78 3.2 4.1v4.71Z" /></svg>;
}

export default function Header({ locale, setLocale }: { locale: Locale; setLocale: (locale: Locale) => void }) {
  const isFrench = locale === "fr";
  return (
    <header className="site-header mx-auto flex w-full max-w-[560px] items-center justify-center px-5 pt-8 sm:pt-10">
      <div className="flex w-full items-center justify-between rounded-full border border-black/[.14] bg-white/85 p-1.5 shadow-[0_3px_16px_rgba(0,0,0,.04)] backdrop-blur">
        <div className="flex items-center gap-1 text-sm font-semibold">
          <a className="relative block size-8 overflow-hidden rounded-full border border-black/[.14] transition hover:opacity-80" href="#top" aria-label={isFrench ? "Accueil" : "Home"}>
            <Image src="/1739529957561.jpeg" alt="Alexis Guerquin" fill sizes="32px" className="object-cover" priority />
          </a>
          <a className="nav-icon" href="#work" aria-label={isFrench ? "Projets" : "Projects"}><Layers3 className="size-3.5" /></a>
          <a className="nav-icon" href="#about" aria-label={isFrench ? "Expériences" : "Experience"}><BriefcaseBusiness className="size-3.5" /></a>
          <a className="nav-icon" href="https://www.linkedin.com/in/alexis-guerquin/" target="_blank" rel="noreferrer" aria-label={isFrench ? "Ouvrir mon profil LinkedIn" : "Open my LinkedIn profile"}><LinkedInIcon /></a>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="header-locale-switch" aria-label={isFrench ? "Choisir la langue" : "Choose language"}>
            <button type="button" className={isFrench ? "is-active" : ""} onClick={() => setLocale("fr")} aria-label="Français"><span aria-hidden="true">🇫🇷</span><span className="sr-only">Français</span></button>
            <button type="button" className={!isFrench ? "is-active" : ""} onClick={() => setLocale("en")} aria-label="English"><span aria-hidden="true">🇬🇧</span><span className="sr-only">English</span></button>
          </div>
          <a href="#contact" className="contact-link button-motion group flex shrink-0 items-center gap-1.5 rounded-full bg-[#171717] px-4 py-2 text-sm font-semibold text-white">
            {isFrench ? "Me contacter" : "Contact me"}
            <Phone className="phone-vibrate size-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
}
