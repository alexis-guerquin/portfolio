"use client";

import { useState } from "react";
import { BriefcaseBusiness, Check } from "lucide-react";
import { CopyIcon, ExternalLinkIcon, SendIcon } from "@animateicons/react/lucide";
import LoopingAnimateIcon from "@/components/LoopingAnimateIcon";
import { Locale } from "@/data/site";

const email = "alexis.guerquin@gmail.com";
const maltUrl = "https://www.malt.fr/profile/alexisguerquin1";

export default function ContactForm({ locale }: { locale: Locale }) {
  const [copied, setCopied] = useState<"contact" | "cdi" | null>(null);
  const isFrench = locale === "fr";

  const copyEmail = async (type: "contact" | "cdi") => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const field = document.createElement("textarea");
      field.value = email;
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    setCopied(type);
    window.setTimeout(() => setCopied(null), 2600);
  };

  return (
    <section id="contact" className="site-column px-5 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-[560px]">
        <p className="text-sm font-bold uppercase tracking-[.12em] text-[#438d20]">{isFrench ? "Me contacter" : "Contact me"}</p>
        <h2 className="mt-3 text-3xl font-black tracking-[-.045em] sm:text-4xl">{isFrench ? "Comment puis-je vous aider ?" : "How can I help you?"}</h2>
        <p className="mt-3 max-w-[470px] text-base leading-relaxed text-black/65">{isFrench ? "Choisissez simplement le contexte de votre prise de contact." : "Simply choose the context for getting in touch."}</p>
        <div className="mt-7 grid gap-3">
          <button type="button" onClick={() => copyEmail("contact")} className="contact-choice group" aria-describedby="copy-status">
            <span className="contact-icon"><LoopingAnimateIcon icon={SendIcon} size={24} duration={1} color="#ffffff" /></span>
            <span className="text-left"><b>{isFrench ? "Simple prise de contact" : "General enquiry"}</b><small>{isFrench ? "Mon adresse e-mail est copiée." : "My email address is copied."}</small></span>
            <LoopingAnimateIcon icon={CopyIcon} className="contact-arrow" size={18} duration={1} color="currentColor" />
          </button>
          <a href={maltUrl} target="_blank" rel="noreferrer" className="contact-choice group">
            <span className="contact-icon"><BriefcaseBusiness className="size-5" /></span>
            <span><b>{isFrench ? "Mission freelance" : "Freelance project"}</b><small>{isFrench ? "Voir mon profil Malt." : "View my Malt profile."}</small></span>
            <LoopingAnimateIcon icon={ExternalLinkIcon} className="contact-arrow" size={18} color="currentColor" />
          </a>
          <button type="button" onClick={() => copyEmail("cdi")} className="contact-choice group" aria-describedby="copy-status">
            <span className="contact-icon"><BriefcaseBusiness className="size-5" /></span>
            <span className="text-left"><b>{isFrench ? "Opportunité de CDI" : "Full-time opportunity"}</b><small>{isFrench ? "Mon adresse e-mail est copiée." : "My email address is copied."}</small></span>
            <LoopingAnimateIcon icon={CopyIcon} className="contact-arrow" size={18} duration={1} color="currentColor" />
          </button>
        </div>
        <div id="copy-status" className={`copy-tooltip ${copied ? "is-visible" : ""}`} role="status" aria-live="polite">
          <Check className="size-4" /> {copied === "cdi" ? (isFrench ? "E-mail copié — parlons de votre opportunité." : "Email copied — let's discuss your opportunity.") : (isFrench ? "E-mail copié dans le presse-papiers." : "Email copied to the clipboard.")}
        </div>
      </div>
    </section>
  );
}
