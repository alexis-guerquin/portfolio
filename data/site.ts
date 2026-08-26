export type Locale = "fr" | "en";

type LocalizedText = { fr: string; en: string };
type Visual = { label: LocalizedText; alt: LocalizedText; src: string; kind: "image" | "video"; format: "portrait" | "landscape"; aspectRatio: string };
type ProjectStatus = { label: LocalizedText; tone: "production" | "development" | "completed" };
type StoreLinks = { apple: string; google: string };

export type PortfolioProject = {
  id: "focus-train" | "pocha" | "iduerp" | "endless-power";
  title: string; src: string; alt: string; cardFormat: "portrait" | "landscape"; type: LocalizedText; status: ProjectStatus; tagline: LocalizedText;
  description: LocalizedText[]; role: LocalizedText; roleDescription: LocalizedText; contributions: string[]; technologies?: string[];
  visuals: Visual[]; cta: LocalizedText; url: string;
  storeLinks?: StoreLinks;
  evolution?: { heading: LocalizedText; title: LocalizedText; description: LocalizedText[]; visuals: Visual[] }[];
  additionalNote?: { heading: LocalizedText; text: LocalizedText };
};

export const siteUrl = "https://alexis-guerquin.fr";

const visual = (src: string, fr: string, en: string, kind: Visual["kind"] = "image", format: Visual["format"] = "landscape", aspectRatio = format === "portrait" ? "792 / 1548" : "3016 / 1548"): Visual => ({ src, kind, format, aspectRatio, label: { fr, en }, alt: { fr, en } });

export const portfolio: PortfolioProject[] = [
  {
    id: "focus-train", title: "Focus-Train",
    src: "/focus-train/home-screen.png",
    alt: "Aperçu du projet Focus-Train", cardFormat: "portrait", type: { fr: "Side project · Produit", en: "Side project · Product" }, status: { label: { fr: "En cours de développement", en: "In development" }, tone: "development" },
    tagline: { fr: "Transformer une session de concentration en voyage à travers le Japon.", en: "Turn a focus session into a journey across Japan." },
    description: [{ fr: "Focus-Train est une application de concentration gamifiée dans laquelle chaque session fait avancer un train vers une nouvelle destination.", en: "Focus-Train is a gamified focus app where every session moves a train toward a new destination." }, { fr: "Les utilisateurs explorent le Japon et débloquent des villes, cartes postales et timbres — sans ajouter de distractions.", en: "Users explore Japan and unlock cities, postcards and collectible stamps — without adding distractions." }],
    role: { fr: "Product Design, UX/UI & iOS Development", en: "Product Design, UX/UI & iOS Development" }, roleDescription: { fr: "Projet développé à deux. J'ai porté le produit de l'idée au lancement : concept, expérience, direction visuelle, gamification, iOS, illustrations, motion, abonnements, App Store, landing page et marketing.", en: "Built by a team of two. I worked across the product journey from idea to launch: concept, experience, visual direction, gamification, iOS, illustrations, motion, subscriptions, App Store, landing page and marketing." },
    contributions: ["Product Design", "UX/UI", "iOS Development", "Gamification", "Design System", "Illustration", "Motion", "App Store", "Marketing"], technologies: ["Swift", "SwiftUI", "iOS"], visuals: [visual("/focus-train/home-screen.png", "Écran d’accueil Focus-Train", "Focus-Train home screen", "image", "portrait"), visual("/focus-train/focustrain-demo.mov", "Démo Focus-Train", "Focus-Train demo", "video", "portrait"), visual("/focus-train/japan-map.png", "Carte du Japon Focus-Train", "Focus-Train Japan map", "image", "portrait")], cta: { fr: "Voir le site", en: "Visit website" }, url: "https://focus-train.fr/", storeLinks: { apple: "https://apps.apple.com/", google: "https://play.google.com/store" },
  },
  {
    id: "pocha", title: "POCHA",
    src: "/pocha/pocha-figma.png",
    alt: "Aperçu du projet POCHA et POMOCHA", cardFormat: "landscape", type: { fr: "Side project · Produit", en: "Side project · Product" }, status: { label: { fr: "En cours de développement", en: "In development" }, tone: "development" }, tagline: { fr: "Un compagnon conçu pour mieux se concentrer et réduire les distractions.", en: "A focus companion designed to reduce distractions." },
    description: [{ fr: "POCHA est une application web et mobile qui combine sessions de focus, réduction des distractions, progression et défis quotidiens autour d'une mascotte qui accompagne l'utilisateur.", en: "POCHA is a web and mobile focus app combining focus sessions, distraction reduction, progression and daily challenges around a mascot that accompanies the user." }], role: { fr: "Product Design, UX/UI & Mobile Product", en: "Product Design, UX/UI & Mobile Product" }, roleDescription: { fr: "Projet développé à deux. J'ai travaillé sur la conception produit, l'UX/UI, le redesign mobile, la mascotte, l'onboarding, le paywall, la gamification, la progression et les micro-interactions.", en: "Built by a team of two. I worked on product design, UX/UI, the mobile redesign, mascot design, onboarding, paywall, gamification, progression systems and micro-interactions." }, contributions: ["Product Design", "UX/UI", "Mobile Redesign", "Gamification", "Onboarding", "Paywall", "Mascot Design", "Micro-interactions"], technologies: ["Swift", "SwiftUI", "iOS"], visuals: [visual("/pocha/complete-flow.mov", "Parcours complet POCHA", "POCHA complete flow", "video", "portrait"), visual("/pocha/mission-collection.mov", "Collection de missions POCHA", "POCHA mission collection", "video", "portrait"), visual("/pocha/session-end.mov", "Fin de session POCHA", "POCHA session end", "video", "portrait")], cta: { fr: "Voir le site", en: "Visit website" }, url: "https://www.pomocha.io/", storeLinks: { apple: "https://apps.apple.com/", google: "https://play.google.com/store" },
    evolution: [{ heading: { fr: "01 · POMOCHA", en: "01 · POMOCHA" }, title: { fr: "La première version web.", en: "The first web version." }, description: [{ fr: "POMOCHA a commencé comme un side project autour de la méthode Pomodoro. Lancée publiquement, cette première version accueille toujours de nouveaux utilisateurs.", en: "POMOCHA started as a web side project built around the Pomodoro method. Released publicly, this first version continues to attract new users." }], visuals: [visual("/pocha/pocha-web.png", "Interface web POMOCHA", "POMOCHA web interface")] }, { heading: { fr: "02 · POCHA Mobile", en: "02 · POCHA Mobile" }, title: { fr: "Repenser l'expérience pour le mobile.", en: "Redesigning the experience for mobile." }, description: [{ fr: "Le mobile ouvre la voie à une expérience plus présente au quotidien, avec la réduction des distractions, le blocage d'applications et une nouvelle identité construite autour de la mascotte.", en: "Mobile creates room for a more everyday experience, with distraction reduction, app blocking and a new identity built around the mascot." }], visuals: [visual("/pocha/pocha-figma.png", "Maquette POCHA", "POCHA design")] }],
  },
  {
    id: "iduerp", title: "iDuerp · OSHAid",
    src: "/iduerp/iduerp-console.png",
    alt: "Aperçu public du projet iDuerp et OSHAid", cardFormat: "landscape", type: { fr: "Mission client · SaaS", en: "Client work · SaaS" }, status: { label: { fr: "En production", en: "Live product" }, tone: "production" }, tagline: { fr: "Simplifier la gestion de la sécurité en entreprise.", en: "Making workplace safety management simpler." }, description: [{ fr: "iDuerp est un SaaS B2B qui aide les entreprises à gérer les processus de sécurité des salariés et les obligations administratives associées.", en: "iDuerp is a B2B SaaS platform helping companies manage workplace safety processes and related administrative requirements." }], role: { fr: "Full Stack Developer & Product Contributor", en: "Full Stack Developer & Product Contributor" }, roleDescription: { fr: "J'interviens en freelance au sein d'une petite équipe sur la console web, l'expérience utilisateur et l'amélioration continue des parcours produit.", en: "I work as a freelance developer within a small team on the web console, user experience and continuous improvement of product flows." }, contributions: ["Frontend Development", "Product UX", "User Flows", "Onboarding", "Payments", "User Tracking", "SEO"], visuals: [visual("/iduerp/iduerp-console.png", "Console iDuerp", "iDuerp console")], cta: { fr: "Voir iDuerp", en: "Visit iDuerp" }, url: "https://iduerp.com/", additionalNote: { heading: { fr: "D'iDuerp à OSHAid", en: "From iDuerp to OSHAid" }, text: { fr: "Le produit a aussi été adapté au marché américain avec OSHAid. J'ai participé directement à cette adaptation.", en: "The product was also adapted for the US market through OSHAid. I contributed directly to this adaptation." } },
  },
  {
    id: "endless-power", title: "The Endless Power",
    src: "/tep/tep-landing.png",
    alt: "Aperçu du projet The Endless Power", cardFormat: "landscape", type: { fr: "Mission client · Site web", en: "Client work · Website" }, status: { label: { fr: "Terminé", en: "Completed" }, tone: "completed" }, tagline: { fr: "Créer l'identité digitale d'une entreprise photovoltaïque.", en: "Creating the digital identity of a solar energy company." }, description: [{ fr: "The Endless Power est une société spécialisée dans les projets photovoltaïques. Pour cette mission freelance, j'ai conçu sa direction artistique et son site vitrine.", en: "The Endless Power specializes in photovoltaic projects. For this freelance project, I designed its visual direction and corporate website." }], role: { fr: "Art Direction, UX/UI & Web Development", en: "Art Direction, UX/UI & Web Development" }, roleDescription: { fr: "J'ai réalisé seul la direction artistique, la charte graphique, l'expérience du site et son développement, y compris un simulateur d'estimation interactif.", en: "I independently created the art direction, visual identity, website experience and development, including an interactive estimate simulator." }, contributions: ["Art Direction", "Brand Identity", "UX/UI", "Web Development", "Interactive Simulator"], technologies: ["React", "Firebase"], visuals: [visual("/tep/tep-landing.png", "Landing page The Endless Power", "The Endless Power landing page")], cta: { fr: "Voir le site", en: "Visit website" }, url: "https://www.theendlesspower.com/",
  },
];

export function getProjectById(id: string) {
  return portfolio.find((project) => project.id === id);
}
