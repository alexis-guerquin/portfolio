import { Locale } from "@/data/site";

const atouts = [
  ["Une vision d’ensemble", "pour relier les besoins métier, le produit et sa mise en œuvre technique."],
  ["De la polyvalence", "pour intervenir aussi bien sur le frontend, le backend que l’intégration web."],
  ["Un regard UX/UI", "pour garder des parcours simples, cohérents et agréables à utiliser."],
  ["De l’autonomie", "pour structurer une mission, communiquer clairement et faire progresser le projet."],
];

const approche = [
  "Comprendre le contexte, les utilisateurs et les objectifs du projet.",
  "Identifier les priorités et construire un plan d’action pragmatique.",
  "Développer, intégrer ou coordonner avec une attention constante à la qualité.",
  "Partager l’avancement, recueillir les retours et ajuster efficacement.",
  "Toujours donner un avis honnête sur le produit et ses fonctionnalités.",
  "Livrer une solution claire, maintenable et prête à évoluer.",
];

const strengthsEn = [["A broad perspective", "to connect business needs, product thinking and technical delivery."], ["Versatility", "to work across frontend, backend and web integration."], ["A UX/UI mindset", "to keep user flows simple, consistent and enjoyable."], ["Autonomy", "to structure a project, communicate clearly and move it forward."]];
const approachEn = ["Understand the project's context, users and goals.", "Identify priorities and create a practical action plan.", "Develop, integrate or coordinate with continuous attention to quality.", "Share progress, collect feedback and adjust efficiently.", "Always provide an honest opinion on the product and its features.", "Deliver a clear, maintainable solution that is ready to evolve."];

export default function InfoSections({ locale }: { locale: Locale }) {
  const isFrench = locale === "fr";
  const strengths = isFrench ? atouts : strengthsEn;
  const approach = isFrench ? approche : approachEn;
  return (
    <section className="site-column px-5 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-[560px]">
        <h2 className="text-3xl font-black leading-none tracking-[-.04em] sm:text-4xl">{isFrench ? "Un profil " : "A "}<span className="editorial font-normal italic">{isFrench ? "polyvalent" : "versatile profile"}</span></h2>
        <div className="mt-7 space-y-4 text-base leading-relaxed">
          {strengths.map(([title, copy]) => (
            <p key={title} className="info-line"><b>{title}</b> - {copy}</p>
          ))}
        </div>

        <div className="sparkle-divider my-12 flex justify-center gap-2 text-[16px] text-black/15" aria-hidden="true">{Array.from({ length: 5 }, (_, index) => <span key={index}>✦</span>)}</div>

        <h2 className="text-3xl font-black tracking-[-.04em] sm:text-4xl">{isFrench ? "Ma façon de travailler " : "How I work "}<span className="editorial font-normal italic">{isFrench ? "en freelance" : "as a freelancer"}</span></h2>
        <ol className="mt-7 space-y-4 text-base leading-relaxed">
          {approach.map((copy, index) => (
            <li key={copy} className="info-line flex gap-3"><span className="font-bold">{index + 1}.</span><span>{copy}</span></li>
          ))}
        </ol>
      </div>
    </section>
  );
}
