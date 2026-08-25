import { Locale } from "@/data/site";

export default function ServiceConfigurator({ locale }: { locale: Locale }) {
  const isFrench = locale === "fr";
  return (
    <section id="services" className="site-column px-5 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto w-full max-w-[560px]">
        <h2 className="text-3xl font-black leading-[1.05] tracking-[-.04em] sm:text-4xl">{isFrench ? "Un profil pour faire" : "A profile to move"}</h2>
        <div className="editorial mt-1 text-4xl italic leading-none sm:text-5xl">{isFrench ? "avancer vos projets" : "your projects forward"}</div>

        <div className="mt-7 rounded-[20px] border border-black/[.12] bg-[#f4f4f4] p-4 shadow-[0_12px_26px_rgba(0,0,0,.08),0_4px_0_white] sm:p-5">
          <div className="rounded-[15px] bg-white p-4 shadow-[inset_0_0_0_1px_rgba(0,0,0,.035)] sm:p-5">
            <h3 className="text-2xl font-black leading-tight tracking-[-.04em] sm:text-3xl">{isFrench ? <>Développeur full stack,<br /><span className="editorial font-normal italic">chef de projet</span></> : <>Full-stack developer,<br /><span className="editorial font-normal italic">project lead</span></>}</h3>
            <p className="mt-3 max-w-[460px] text-base leading-relaxed text-black/70">{isFrench ? "J’interviens du cadrage à la mise en ligne : développement, intégration, coordination et suivi produit. Avec une sensibilité UX/UI pour créer des interfaces claires et utiles." : "I work from discovery to launch: development, integration, coordination and product follow-up, with a UX/UI sensibility for clear and useful interfaces."}</p>
            <div className="mt-6 grid gap-5 border-t border-black/[.12] pt-5 text-sm min-[390px]:grid-cols-2">
              <div>
                <div className="mb-2 font-bold">{isFrench ? "Compétences" : "Skills"}</div>
                <ul className="space-y-2 text-black/60">
                  <li>○ Frontend & backend</li>
                  <li>○ {isFrench ? "Intégration web" : "Web integration"}</li>
                  <li>○ UX & UI</li>
                </ul>
              </div>
              <div>
                <div className="mb-2 font-bold">{isFrench ? "Ce que je veux faire" : "What I want to do"}</div>
                <ul className="space-y-2 text-black/60">
                  <li>○ Product owner</li>
                  <li>○ {isFrench ? "Gestion de projet" : "Project management"}</li>
                  <li>○ {isFrench ? "Développement web" : "Web development"}</li>
                </ul>
              </div>
            </div>
            <a href="#contact" className="button-motion group mt-6 flex h-11 items-center justify-center gap-2 rounded-[8px] bg-[#171717] text-sm font-semibold text-white">{isFrench ? "Choisir un mode de contact" : "Choose how to get in touch"} <span className="button-icon">→</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
