import Image from "next/image";
import { BookOpen, BriefcaseBusiness, Layers3, Phone } from "lucide-react";
import { Locale } from "@/data/site";

function LinkedInIcon() {
  return <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 3H3.55C3.25 3 3 3.25 3 3.55v16.9c0 .3.25.55.55.55h16.9c.3 0 .55-.25.55-.55V3.55c0-.3-.25-.55-.55-.55ZM8.34 18.34H5.67V9.75h2.67v8.59ZM7 8.58a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1Zm11.35 9.76h-2.66v-4.18c0-1 0-2.28-1.39-2.28-1.39 0-1.6 1.08-1.6 2.2v4.26H10.04V9.75h2.56v1.17h.04c.36-.67 1.23-1.39 2.53-1.39 2.7 0 3.2 1.78 3.2 4.1v4.71Z" /></svg>;
}

type HeaderProps = {
  locale: Locale;
  setLocale?: (locale: Locale) => void;
  /** Static pages switch language by navigating to the same page in the other locale. */
  localeHrefs?: Record<Locale, string>;
  portfolioPath?: string;
};

export default function Header({ locale, setLocale, localeHrefs, portfolioPath = "" }: HeaderProps) {
  const isFrench = locale === "fr";
  return (
    <header className="site-header mx-auto flex w-full max-w-[560px] items-center justify-center px-5 pt-8 sm:pt-10">
      <nav aria-label={isFrench ? "Navigation du portfolio" : "Portfolio navigation"} className="flex w-full items-center justify-between rounded-full border border-black/[.14] bg-white/85 p-1.5 shadow-[0_3px_16px_rgba(0,0,0,.04)] backdrop-blur">
        <div className="flex items-center gap-1 text-sm font-semibold">
          <a className="relative block size-8 overflow-hidden rounded-full border border-black/[.14] transition hover:opacity-80" href={portfolioPath || "#top"} aria-label={isFrench ? "Accueil du portfolio" : "Portfolio home"}>
            <Image src="/1739529957561.jpeg" alt="Alexis Guerquin" fill sizes="32px" className="object-cover" priority />
          </a>
          <a className="nav-icon" href={`${portfolioPath}#work`} aria-label={isFrench ? "Projets" : "Projects"}><Layers3 className="size-3.5" /></a>
          <a className="nav-icon bg-[#edf3e3] text-[#36562c]" href={`${portfolioPath}#journals`} aria-label={isFrench ? "Blogs des projets" : "Project journals"} title={isFrench ? "Blogs des projets" : "Project journals"}><BookOpen className="size-3.5" /></a>
          <a className="nav-icon" href={`${portfolioPath}#about`} aria-label={isFrench ? "Expériences" : "Experience"}><BriefcaseBusiness className="size-3.5" /></a>
          <a className="nav-icon max-sm:!hidden" href="https://www.linkedin.com/in/alexis-guerquin/" target="_blank" rel="noreferrer" aria-label={isFrench ? "Ouvrir mon profil LinkedIn" : "Open my LinkedIn profile"}><LinkedInIcon /></a>
        </div>
        <div className="flex items-center gap-1.5">
          {(setLocale || localeHrefs) && <div className="header-locale-switch" aria-label={isFrench ? "Choisir la langue" : "Choose language"}>
            {([["fr", "Français", "🇫🇷"], ["en", "English", "🇬🇧"]] as const).map(([code, name, flag]) => {
              const active = locale === code;
              const content = <><span aria-hidden="true">{flag}</span><span className="sr-only">{name}</span></>;
              return localeHrefs
                ? <a key={code} href={localeHrefs[code]} className={active ? "is-active" : ""} hrefLang={code} lang={code} aria-label={name} aria-current={active ? "true" : undefined}>{content}</a>
                : <button key={code} type="button" className={active ? "is-active" : ""} onClick={() => setLocale?.(code)} aria-label={name}>{content}</button>;
            })}
          </div>}
          <a href={`${portfolioPath}#contact`} className="contact-link button-motion group flex shrink-0 items-center gap-1.5 rounded-full bg-[#171717] px-4 py-2 text-sm font-semibold text-white">
            {isFrench ? "Me contacter" : "Contact me"}
            <Phone className="phone-vibrate size-3" aria-hidden="true" />
          </a>
        </div>
      </nav>
    </header>
  );
}
