import Image from "next/image";
import { BriefcaseBusiness, Layers3, Phone } from "lucide-react";
import { ExternalLinkIcon } from "@animateicons/react/lucide";
import LoopingAnimateIcon from "@/components/LoopingAnimateIcon";
import { Locale } from "@/data/site";

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
          <a className="nav-icon" href="https://www.linkedin.com/in/alexis-guerquin/" target="_blank" rel="noreferrer" aria-label={isFrench ? "Ouvrir mon profil LinkedIn" : "Open my LinkedIn profile"}><LoopingAnimateIcon icon={ExternalLinkIcon} size={17} color="currentColor" /></a>
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
