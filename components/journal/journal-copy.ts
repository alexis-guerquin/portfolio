import type { Locale } from "@/data/site";

const plural = (count: number, one: string, many: string) => (count > 1 ? many : one);

export const journalCopy = {
  fr: {
    htmlLang: "fr", dateLocale: "fr-FR", ogLocale: "fr_FR", portfolioPath: "/fr", journalPath: "/fr",
    skipLink: "Aller au contenu", breadcrumb: "Fil d’Ariane", portfolio: "Portfolio", journal: "Journal", backToPortfolio: "Retour au portfolio",
    indexEyebrow: "Dans les coulisses du produit", indexTitle: "Journal de bord.", indexIntro: ["Les changements, les décisions et les observations.", "Un point chaque mois, les avancées chaque semaine."],
    indexCardEyebrow: (weeks: number) => `Journal de construction · ${weeks} semaines`, readJournal: "Lire le journal",
    indexTitleMeta: (project: string) => `${project} — Journal de bord`,
    indexDescription: (project: string) => `Les avancées de ${project} : changements produit, décisions de design, itérations et observations, mois après mois.`,
    articleTitleMeta: (project: string, month: string) => `${project} — ${month}, journal de bord`,
    buildJournal: "Journal de construction", issue: "N°", productLabel: "PRODUIT", previewOf: (project: string) => `Aperçu de ${project}`,
    onEachPlatform: (project: string) => `${project} sur chaque plateforme`, openOn: (project: string, platform: string) => `${project} sur ${platform} (nouvel onglet)`,
    monthSummaryLabel: (project: string) => `Résumé du mois · ${project}`, thisMonth: "Ce mois-ci",
    weeksEyebrow: "Les avancées", weeksTitle: "Semaine par semaine.", weeksHint: "Ouvrir pour explorer",
    metricsEyebrow: "Les premiers signaux", metricsTitle: "Ce que l’on observe.", statsLabel: "Usage observé et périodes de mesure", sourceSummary: "Source et périmètre des chiffres",
    closingTitle: "Le projet derrière le journal.", closingText: "Concept, design et expérience produit.", discover: (project: string) => `Découvrir ${project}`,
    tocTitle: "Sommaire de l’article", tocLabel: (month: string) => `Sommaire · ${month}`, tocInThisArticle: "Dans cet article", tocOverview: "Résumé du mois", tocWeek: (n: number) => `Semaine ${n} : `,
    tocConclusion: "Conclusion du mois", tocNextGoals: "Objectifs du mois prochain", tocTop: "Retour en haut",
    week: "Semaine", mainProgress: "Avancée principale", visuals: (n: number) => `${n} ${plural(n, "visuel", "visuels")}`,
    otherCaptures: "Autres captures et démonstrations", defaultMediaLabel: "Captures et démonstrations", inImages: (title: string) => `En images : ${title}`, featureLabel: (title: string) => `Avancée principale : ${title}`,
    enlarge: (alt: string) => `Agrandir : ${alt}`, closeImage: "Fermer l’image", playVideo: "Lire la vidéo", play: (caption: string) => `Lire : ${caption}`, newTab: " (nouvel onglet)",
    before: "Avant", after: "Après", why: "Pourquoi",
    monthInBrief: "Le mois en bref.", statusAt: (date: string) => `Bilan au ${date}`, conclusionTitle: "Conclusion du mois.", nextMonth: "Objectifs du mois prochain", personalChallenges: "Défis personnels.",
  },
  en: {
    htmlLang: "en", dateLocale: "en-GB", ogLocale: "en_GB", portfolioPath: "/", journalPath: "",
    skipLink: "Skip to content", breadcrumb: "Breadcrumb", portfolio: "Portfolio", journal: "Journal", backToPortfolio: "Back to portfolio",
    indexEyebrow: "Behind the scenes of the product", indexTitle: "Progress journal.", indexIntro: ["The changes, the decisions and the observations.", "A recap every month, the progress every week."],
    indexCardEyebrow: (weeks: number) => `Build journal · ${weeks} weeks`, readJournal: "Read the journal",
    indexTitleMeta: (project: string) => `${project} — Progress journal`,
    indexDescription: (project: string) => `The progress of ${project}: product changes, design decisions, iterations and observations, month after month.`,
    articleTitleMeta: (project: string, month: string) => `${project} — ${month}, progress journal`,
    buildJournal: "Build journal", issue: "No.", productLabel: "PRODUCT", previewOf: (project: string) => `Preview of ${project}`,
    onEachPlatform: (project: string) => `${project} on each platform`, openOn: (project: string, platform: string) => `${project} on ${platform} (new tab)`,
    monthSummaryLabel: (project: string) => `Month summary · ${project}`, thisMonth: "This month",
    weeksEyebrow: "The progress", weeksTitle: "Week by week.", weeksHint: "Open to explore",
    metricsEyebrow: "The first signals", metricsTitle: "What we observe.", statsLabel: "Observed usage and measurement periods", sourceSummary: "Source and scope of the figures",
    closingTitle: "The project behind the journal.", closingText: "Concept, design and product experience.", discover: (project: string) => `Discover ${project}`,
    tocTitle: "Article contents", tocLabel: (month: string) => `Contents · ${month}`, tocInThisArticle: "In this article", tocOverview: "Month summary", tocWeek: (n: number) => `Week ${n}: `,
    tocConclusion: "Month conclusion", tocNextGoals: "Next month's goals", tocTop: "Back to top",
    week: "Week", mainProgress: "Key progress", visuals: (n: number) => `${n} ${plural(n, "visual", "visuals")}`,
    otherCaptures: "Other screenshots and demos", defaultMediaLabel: "Screenshots and demos", inImages: (title: string) => `In pictures: ${title}`, featureLabel: (title: string) => `Key progress: ${title}`,
    enlarge: (alt: string) => `Enlarge: ${alt}`, closeImage: "Close image", playVideo: "Play video", play: (caption: string) => `Play: ${caption}`, newTab: " (new tab)",
    before: "Before", after: "After", why: "Why",
    monthInBrief: "The month in brief.", statusAt: (date: string) => `Status as of ${date}`, conclusionTitle: "Month conclusion.", nextMonth: "Next month's goals", personalChallenges: "Personal challenges.",
  },
} satisfies Record<Locale, Record<string, unknown>>;

export type JournalCopy = (typeof journalCopy)[Locale];

/** Journal URLs: English lives at the root, French under /fr, like the portfolio itself. */
export const journalHref = (locale: Locale, project: string, month?: string) => `${journalCopy[locale].journalPath}/${project}/blog${month ? `/${month}` : ""}`;
export const projectHref = (locale: Locale, project: string) => `${journalCopy[locale].journalPath}/${project}`;
