import type { JournalMedia, ProjectJournal } from "../project-journal";

const pochaApps = {
  web: "https://www.pomocha.io/",
  apple: "https://apps.apple.com/fr/app/pocha-minuteur-pomodoro/id6802377633",
  google: "https://play.google.com/store/apps/details?id=com.pocha.android",
};
const appLink = (label: string, platform: keyof typeof pochaApps) => `[${label}](${pochaApps[platform]})`;

const base = "/pocha/blog/october-2026";
const photo = (name: string, width: number, height: number, alt: string, caption: string, fullWidth = false): JournalMedia => ({ src: `${base}/${name}.webp`, width, height, alt, caption, ...(fullWidth ? { fullWidth: true } : {}) });

export const pochaOctober2026: ProjectJournal = {
  project: "pocha",
  projectName: "Pocha",
  issue: 1,
  cover: photo("cover", 1400, 955, "Maquettes et parcours de l’application Pocha", ""),
  hero: [
    photo("mobile-streak", 800, 1732, "Le calendrier de série Pocha", ""),
    photo("mobile-home", 800, 1732, "L’accueil Pocha et son compagnon", ""),
    photo("mobile-stats", 800, 1732, "Les statistiques de concentration Pocha", ""),
  ],
  heroCaption: "Un même compagnon, plusieurs façons de se concentrer.",
  platforms: [
    { label: "iOS", url: pochaApps.apple },
    { label: "Android", url: pochaApps.google },
    { label: "Mac", url: pochaApps.apple },
    { label: "Web", url: pochaApps.web },
  ],
  icon: `${base}/icon.webp`,
  metrics: {
    stats: [
      { value: "7", label: "inscriptions suivies", period: "Depuis le 10 octobre" },
      { value: "26", label: "sessions démarrées", period: "Du 1er au 30 octobre" },
      { value: "14", label: "sessions terminées", period: "Du 1er au 30 octobre" },
    ],
    observation: "Le suivi commence à donner des repères. Le **volume reste trop faible** pour conclure sur l’effet des changements.",
    source: "PostHog, iOS + Android, production. Relevé du 31 octobre 2026 sur le dashboard Phenomenals. Les 7 inscriptions sont le cumul observé depuis la première inscription suivie, le 10 octobre. Les sessions couvrent les jours complets du 1er au 30 octobre, en UTC. Couverture partielle : les comptes antérieurs au tracking et les événements non reçus sont absents. Ces chiffres ne sont pas des téléchargements.",
  },
  slug: "october-2026",
  month: "Octobre 2026",
  published: "2026-10-31",
  description: `${appLink("**iOS**", "apple")} et ${appLink("**Android**", "google")} fiabilisés, ${appLink("**version Mac disponible**", "apple")}, ${appLink("**refonte web**", "web")} et **nouveaux visuels pour les stores**. Le journal de construction de Pocha, semaine par semaine.`,
  overview: `Le mois a commencé par la **fiabilisation** de ${appLink("**iOS**", "apple")} et ${appLink("**Android**", "google")}, puis s’est étendu au lancement de ${appLink("**Pocha pour Mac**", "apple")} et à la ${appLink("**refonte web**", "web")}. En parallèle, les **captures des stores** et les **formats de communication** ont été revus pour mieux présenter le produit.`,
  weeks: [
    {
      id: "week-1", dates: "1er–7 octobre", title: "Refonte de la page Série / Freezes.", tags: ["Connexion", "Onboarding", "Premium"],
      entries: [{ period: "Chantier du 1er au 8 octobre", title: "De la connexion à la première session", changes: [
        "**Connexion Google** et **onboarding** améliorés.",
        "Page **Série / Freezes** retravaillée, **widgets** améliorés.",
        "Présentation de l’**abonnement Premium** revue.",
      ], why: "Rendre le démarrage, la progression et l’offre Premium plus lisibles." }],
      feature: {
        summary: "Le **calendrier de série**, les **Freezes** et les vues de **régularité** rendent la progression plus lisible au quotidien.",
        media: [
          photo("mobile-streak", 800, 1732, "Calendrier de la série Pocha avec le nombre de Freezes disponibles", "Série et Freezes disponibles."),
          photo("mobile-consistency", 800, 1732, "Vue de régularité Pocha présentant la progression des sessions", "La régularité en un coup d’œil."),
          photo("mobile-year", 800, 1732, "Calendrier annuel de concentration Pocha", "Le suivi sur l’année."),
        ],
      },
      media: [
        photo("onboarding-start", 800, 1778, "Début de l’onboarding Android Pocha : découvrir le produit ou se connecter", `${appLink("Onboarding Android", "google")} · le point d’entrée.`),
        photo("onboarding-goal", 800, 1778, "Choix de l’objectif de concentration dans l’onboarding Android Pocha", `${appLink("Onboarding Android", "google")} · le choix de l’objectif.`),
        photo("onboarding-mascot", 800, 1778, "Découverte du compagnon pendant l’onboarding Android Pocha", `${appLink("Onboarding Android", "google")} · la découverte du compagnon.`),
        photo("mobile-widget", 800, 1732, "Widget iOS Pocha affichant les sessions, la série et les Freezes", `Le widget sur l’écran d’accueil ${appLink("iOS", "apple")}.`),
        photo("mobile-home", 800, 1732, "Accueil mobile Pocha avec la mascotte et le démarrage de session", "L’accueil de l’application."),
        { src: "/pocha/complete-flow-poster.jpg", width: 792, height: 1548, alt: "Démonstration du parcours mobile Pocha", caption: "Le parcours mobile · vidéo.", video: "/pocha/complete-flow.mp4" },
      ],
    },
    {
      id: "week-2", dates: "8–14 octobre", title: "Refonte des statistiques et de la communauté.", tags: ["RevenueCat", "Statistiques", "Contenus"],
      entries: [
        { period: "8–13 octobre", title: "Abonnements et parcours quotidiens", changes: [
          "**RevenueCat** intégré. **Notifications** et **récompenses répétitives** corrigées.",
          "**Statistiques**, **profils**, **communauté** et **classements** repensés.",
          `Changements adaptés sur ${appLink("**Android**", "google")} et **connexion Apple** réparée.`,
        ], why: "Fiabiliser les abonnements et les récompenses, et mieux lire sa progression." },
        { period: "Chantiers du 9–20 et du 12–17 octobre", title: "Des captures réelles, des formats courts", changes: [
          "**Site vitrine** enrichi de **vraies captures**, d’une **démo vidéo**, d’une **galerie animée** et des liens de téléchargement.",
          "**Vidéos promotionnelles** et plusieurs séries de carrousels créées, dont **14 carrousels Pocha : 70 slides**.",
          "Carrousels itérés : **photo dominante**, **capture de l’application entière et lisible**, appel à rejoindre ses amis en fin de séquence.",
        ], why: "Montrer les usages et les écrans du produit avant de demander un téléchargement." },
      ],
      feature: {
        summary: "Les **statistiques**, le **fil communautaire** et les **classements entre amis** sont repensés pour mieux suivre et partager sa progression.",
        media: [
          photo("mobile-stats", 800, 1732, "Écran des statistiques de concentration Pocha avec les tendances", "Les statistiques et les tendances."),
          photo("mobile-community", 800, 1732, "Fil général de la communauté Pocha et publications des membres", "Le fil de la communauté."),
          photo("mobile-ranking", 800, 1732, "Classement hebdomadaire des amis dans Pocha", "Le classement hebdomadaire des amis."),
        ],
      },
      media: [
        photo("mobile-friends", 800, 1732, "Fil des amis dans Pocha avec leur progression", "Le fil des amis."),
        photo("mobile-add-friend", 800, 1732, "Interface d’ajout d’un ami dans Pocha", "Le parcours d’ajout d’un ami."),
        photo("mobile-missions", 800, 1732, "Missions quotidiennes de Pocha et récompenses à récupérer", "Les missions et les récompenses."),
        photo("carousel-02", 600, 1067, "Slide promotionnelle Pocha avec photo d’étude et capture de l’application en incrustation", "Carrousel · photo et capture entière."),
        { ...photo("promo-poster", 600, 1067, "Aperçu de la vidéo promotionnelle Pocha", "Vidéo promotionnelle · 21 s."), video: `${base}/pocha-promo.mp4` },
      ],
    },
    {
      id: "week-3", dates: "15–21 octobre", title: "Création de Pocha pour Mac.", tags: ["macOS", "Encoche", "App Store"],
      entries: [
        { period: "15–21 octobre", title: "Une version pour le bureau", changes: [
          `${appLink("**Pocha pour Mac**", "apple")} développé : **minuteur**, **projets**, **statistiques** et **communauté**.`,
          "**Compagnon** et session de concentration accessibles près de l’**encoche**.",
          `**84 captures** préparées dans **14 langues**. ${appLink("**Version Mac soumise à Apple**", "apple")}.`,
        ], why: "Accompagner les sessions sur l’ordinateur et garder le minuteur à portée de vue." },
        { period: "Fin du chantier vitrine · 9–20 octobre", title: "Expliquer chaque plateforme", changes: [
          `**Trois articles publiés** : présentation ${appLink("**iOS**", "apple")}, présentation ${appLink("**Android**", "google")} et arrivée sur ${appLink("**Mac**", "apple")}.`,
          `Captures ${appLink("**iPhone et Mac**", "apple")} réunies sur le site vitrine, avec les **liens des stores**.`,
        ], why: "Permettre de comprendre l’expérience sur chaque appareil avant de l’installer." },
      ],
      feature: {
        summary: `${appLink("**Pocha pour Mac**", "apple")} réunit minuteur, projets, statistiques et communauté, avec le **compagnon près de l’encoche**. La version est **validée par Apple** et **disponible sur le Mac App Store**.`,
        media: [
          photo("macbook-focus", 1440, 766, "Pocha pour Mac en session de concentration avec le compagnon et le minuteur près de l’encoche", `La ${appLink("version Mac", "apple")} et son compagnon près de l’encoche.`, true),
        ],
      },
      media: [
        photo("mac-projects", 762, 1066, "Écran des projets dans Pocha pour Mac", `Les projets sur ${appLink("Mac", "apple")}.`),
        photo("mac-statistics", 640, 910, "Statistiques de concentration de Pocha pour Mac en français", `Les statistiques sur ${appLink("Mac", "apple")}.`),
        photo("mac-community", 640, 910, "Communauté et fil des amis dans Pocha pour Mac en français", `La communauté sur ${appLink("Mac", "apple")}.`),
        photo("mac-collection", 640, 910, "Collection de récompenses dans Pocha pour Mac en français", "La collection de récompenses."),
        photo("mac-create-session", 1400, 814, "Création d’une session de concentration dans Pocha pour Mac", "La création d’une session.", true),
        photo("mac-notch", 1200, 784, "Compagnon et minuteur Pocha affichés dans l’encoche du Mac", "Le minuteur au plus près de l’encoche.", true),
      ],
    },
    {
      id: "week-4", dates: "22–28 octobre", title: "Adaptation aux formats iPhone Duo.", tags: ["Web", "iPhone Duo", "Distribution"],
      entries: [
        { period: "Chantier du 21 au 26 octobre", title: "Une identité commune, les outils conservés", changes: [
          `${appLink("**Version web**", "web")} repensée autour de l’**identité iOS / Mac**.`,
          "**Séries**, **Freezes**, **missions** et **onboarding traduit** ajoutés, tout en conservant les **projets** et les **todolists**.",
          "**Adaptation iPhone Duo** : formats **fermé et ouvert** pris en charge.",
        ], why: "Retrouver les mêmes repères entre appareils, sans perdre les outils de travail du web." },
        { period: "21–26 octobre", title: "Élargir les points de découverte", changes: [
          "**Supports Pinterest** créés et **soumissions à des annuaires** effectuées.",
        ], why: "Ouvrir de nouveaux points d’entrée vers l’application." },
      ],
      feature: {
        summary: "L’**adaptation iPhone Duo** se lit en trois visuels : format **fermé**, appareil **en cours d’ouverture** et format **ouvert**.",
        layout: "comparison",
        media: [
          photo("duo-closed", 736, 970, "Pocha sur l’écran extérieur de l’iPhone Duo fermé", "01 · Format fermé : écran extérieur."),
          photo("duo-opening", 1250, 970, "Pocha sur l’iPhone Duo pendant l’ouverture de l’appareil", "02 · L’appareil en cours d’ouverture."),
          photo("duo-open", 1250, 970, "Pocha sur l’écran intérieur de l’iPhone Duo complètement ouvert", "03 · Format ouvert : écran intérieur.", true),
        ],
      },
      comparisons: [{
        period: "Chantier du 21 au 26 octobre",
        title: "Refonte web : avant / après.",
        description: `${appLink("Le web", "web")} reprend les **repères visuels iOS / Mac**. Le **minuteur**, les **projets** et la **todolist** gardent leur place dans le parcours.`,
        beforeLabel: `${appLink("Pomocha", "web")} · première interface`,
        afterLabel: `${appLink("Pocha", "web")} · nouvelle version web`,
        before: photo("web-original", 1400, 719, "Ancienne interface Pomocha avec le compte à rebours, le panneau des projets à gauche et le résumé de concentration à droite", "Avant · compte à rebours et outils répartis sur trois colonnes."),
        after: photo("web-current", 1400, 713, "Nouvelle interface Pocha sur pomocha.io : navigation latérale, série, compagnon minuteur et todolist", "Après · compagnon au centre, série en haut et todolist à droite. Capture du 31 octobre 2026."),
        changes: [
          "**Navigation latérale** pour accéder aux projets, statistiques, séries et à la communauté.",
          "**Compagnon minuteur** au centre et **série de la semaine** visible dès l’accueil.",
          "**Projets et todolist conservés**, avec les **missions quotidiennes** accessibles depuis l’accueil.",
        ],
        source: { url: "https://www.pomocha.io/app", label: "Captures sur pomocha.io · 31 octobre 2026" },
      }],
      media: [
        photo("web-streak", 1400, 713, "Nouvelle page Série web Pocha avec les Freezes, le calendrier et les paliers de progression", "Série et Freezes · les mêmes repères que sur mobile.", true),
        photo("web-missions", 1400, 713, "Missions quotidiennes ouvertes depuis l’accueil de la nouvelle version web Pocha", "Missions quotidiennes · panneau accessible depuis l’accueil.", true),
      ],
    },
    {
      id: "week-5", dates: "29–31 octobre", title: "Création des captures V3 dans 14 langues.", tags: ["Captures V3", "Localisation", "iOS 1.0.9"],
      entries: [{ period: "Chantier du 24 au 31 octobre", title: "Visuels, fiches et prochaine version", changes: [
        "**Captures V3** créées et **fiches des stores** optimisées.",
        "**Visuels et vidéos** préparés dans **14 langues**.",
        `${appLink("**Version iOS 1.0.9**", "apple")} et **dossier de mise en avant éditoriale Apple** préparés.`,
      ], why: "Présenter plus clairement le produit dans chaque langue et préparer la prochaine sortie." }],
      feature: {
        summary: "Une série de **six captures V3** présente la promesse et les fonctionnalités. Les visuels sont déclinés dans **14 langues** pour les fiches des stores.",
        media: [
          photo("store-v3-01", 800, 1739, "Capture Pocha V3 présentant la promesse Transformer le travail en jeu", "La promesse : transformer le travail en jeu."),
          photo("store-v3-02", 800, 1739, "Capture Pocha V3 présentant le blocage des applications distrayantes", "Bloquer les applications distrayantes."),
          photo("store-v3-03", 800, 1739, "Capture Pocha V3 montrant le calendrier de série et les récompenses", "Série, habitudes et récompenses."),
          photo("store-v3-04", 800, 1739, "Capture Pocha V3 présentant les badges et les récompenses de motivation", "Badges et motivation."),
          photo("store-v3-05", 800, 1739, "Capture Pocha V3 présentant le fil communautaire et le partage des progrès", "Partager ses progrès avec la communauté."),
          photo("store-v3-06", 800, 1739, "Capture Pocha V3 montrant le widget et le suivi des habitudes", "Widget et suivi des habitudes."),
        ],
      },
      media: [
        photo("store-v3-en", 800, 1739, "Première capture Pocha V3 localisée en anglais", "La déclinaison en anglais."),
        photo("store-v3-de", 800, 1739, "Première capture Pocha V3 localisée en allemand", "La déclinaison en allemand."),
        photo("store-v3-jp", 800, 1739, "Première capture Pocha V3 localisée en japonais", "La déclinaison en japonais."),
      ],
    },
  ],
  conclusion: {
    summary: `${appLink("**iOS**", "apple")} et ${appLink("**Android**", "google")} fiabilisés, ${appLink("**Pocha pour Mac disponible**", "apple")}, ${appLink("**refonte web en ligne**", "web")} et **visuels déclinés dans 14 langues**. Le prochain chantier : faire connaître le produit.`,
    takeaways: [
      {
        title: appLink("Pocha pour Mac", "apple"), state: "Disponible", tone: "success",
        detail: "Version **validée par Apple** et disponible sur le **Mac App Store**.",
        cta: { label: "Télécharger Pocha pour Mac", url: pochaApps.apple },
      },
      {
        title: appLink("Refonte web", "web"), state: "Impact à mesurer", tone: "measure",
        detail: "La nouvelle interface est **en ligne**. Son **impact sur l’usage reste à mesurer**.",
      },
      {
        title: "Un trafic encore irrégulier", state: "À stabiliser", tone: "attention",
        detail: "Le **trafic reste trop peu régulier** pour dégager une tendance fiable.",
      },
    ],
    nextMonth: {
      title: "Novembre : priorité à la visibilité.",
      goals: [
        "**Communication à fond** : tester des formats et trouver ceux qui deviennent **viraux**.",
        "**Mesurer l’évolution de l’ASO et du SEO** : visibilité sur les stores et les moteurs de recherche.",
      ],
      personalChallenges: [
        "**1 tweet par jour**.",
        "**1 vidéo YouTube au format long** sur le mois.",
        "**1 vidéo ou 1 carrousel par jour minimum**. **Automatisation à explorer** pour tenir le rythme.",
      ],
      target: {
        title: "Objectif Pocha · Novembre",
        value: "100",
        label: "créations de compte",
        detail: `**Au total en novembre**, sur ${appLink("**l’App Store**", "apple")}, ${appLink("**Google Play**", "google")} et ${appLink("**le web**", "web")}.`,
      },
    },
  },
};
