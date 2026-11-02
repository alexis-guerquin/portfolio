import type { JournalMedia, ProjectJournal } from "../project-journal";
import { focusTrainOctoberMedia as dimensions } from "./focus-train-october-2026-assets";

const base = "/focus-train/blog/october-2026";
const apps = {
  apple: "https://apps.apple.com/fr/app/focus-train-pomodoro-%C3%A9tude/id6789511554",
  google: "https://play.google.com/store/apps/details?id=com.focustrain.android",
  site: "https://focus-train.fr/",
};
const appLink = (label: string, platform: keyof typeof apps) => `[${label}](${apps[platform]})`;
const photo = (name: keyof typeof dimensions, alt: string, caption: string, fullWidth = false): JournalMedia => ({
  src: `${base}/${name}.webp`, ...dimensions[name], alt, caption, ...(fullWidth ? { fullWidth: true } : {}),
});
const video = (name: "play-trailer" | "duo-preview", alt: string, caption: string): JournalMedia => ({
  ...photo(`${name}-poster`, alt, caption, true), video: `${base}/${name}.mp4`,
});

export const focusTrainOctober2026: ProjectJournal = {
  project: "focus-train",
  projectName: "Focus Train",
  issue: 1,
  slug: "october-2026",
  month: "Octobre 2026",
  published: "2026-10-31",
  description: `${appLink("**iOS**", "apple")} et ${appLink("**Android**", "google")} fiabilisés, **multijoueur retravaillé**, **adaptation iPhone Duo** et **captures V3**. Un mois pour améliorer le voyage, puis le faire connaître.`,
  cover: photo("cover", "Présentation Focus Train : un train rose parcourt le Japon entre les cartes postales et les timbres", ""),
  hero: [
    photo("solo-map", "La carte du Japon dans Focus Train", ""),
    photo("home", "L’accueil Focus Train avec les billets Solo et Multijoueur", ""),
    photo("multiplayer-wagon", "Une session de concentration à bord du wagon Focus Train", ""),
  ],
  heroCaption: "Transformer le temps de concentration en voyage, seul ou à plusieurs.",
  platforms: [
    { label: "iOS", url: apps.apple },
    { label: "Android", url: apps.google },
    { label: "Site", url: apps.site },
  ],
  icon: `${base}/icon.webp`,
  overview: `**Connexion, audio, cartes et embarquement** ont été améliorés sur ${appLink("**iOS**", "apple")} et ${appLink("**Android**", "google")}. En fin de mois, l’**adaptation iPhone Duo**, les **captures V3** et les **carrousels promotionnels** ont pris le relais pour rendre le produit plus clair et plus visible.`,
  weeks: [
    {
      id: "week-1", dates: "1er–7 octobre", title: "89 morceaux LOFI pour accompagner les sessions.", tags: ["Audio", "Connexion Google", "Site vitrine"],
      feature: {
        summary: "La **playlist LOFI** passe à **89 morceaux**, soit environ **4 heures** d’écoute. Le **titre en cours**, la **piste suivante** puis la **lecture aléatoire** sont accessibles pendant les sessions.",
        media: [
          photo("solo-session", "Session solo Focus Train avec la progression sur la carte et le lecteur musical en bas", "Le lecteur musical pendant une session solo."),
          photo("multiplayer-wagon", "Wagon Focus Train avec les commandes piste suivante et lecture aléatoire", "Les mêmes commandes dans le wagon multijoueur."),
        ],
      },
      entries: [
        { period: "Chantiers du 4 au 8 octobre", title: "Fiabiliser l’entrée dans l’application", changes: [
          `${appLink("**Connexion Google Android**", "google")} corrigée : erreurs plus lisibles et déconnexion nettoyée. **Version 1.0.1 publiée le 4 octobre**.`,
          "**Accueil tablette** adapté et choix de langue regroupé dans un **menu déroulant**.",
          `${appLink("**Paywall iOS**", "apple")} simplifié, **blocage d’applications** réactivé et **RevenueCat** intégré.`,
        ], why: "Réduire les blocages avant la première session et rendre l’offre d’abonnement plus lisible." },
        { period: "Chantier audio du 6 au 12 octobre", title: "Rester dans sa session", changes: [
          "**89 morceaux LOFI** intégrés, avec **titre en cours**, **piste suivante** et **lecture aléatoire**.",
          "**Défilement des paysages** et chargements retravaillés pour limiter les pauses visuelles.",
        ], why: "Garder les commandes utiles à portée de main, sans interrompre le voyage." },
        { period: "1er octobre", title: "Montrer le produit sur le site", changes: [
          `${appLink("**Site vitrine**", "site")} décliné en **6 langues**, avec une **vraie vidéo de l’application** et un **carrousel de playlists YouTube**.`,
          "Navigation allégée, métadonnées et contenus pour le **SEO** et les **assistants IA** enrichis.",
        ], why: "Faire comprendre le concept avec les vrais écrans avant le téléchargement." },
      ],
      media: [
        photo("home", "Accueil Focus Train et accès aux modes Solo, Multijoueur et Collection", "L’accueil et ses billets d’entrée."),
        photo("solo-landscape", "Session solo Focus Train présentant le train dans son paysage", "Le paysage qui accompagne la concentration."),
        photo("site-current", "Site vitrine Focus Train en français avec une vidéo réelle et les boutons App Store et Google Play", `${appLink("Site vitrine", "site")} · capture du 31 octobre, avec le lien Android ajouté le 21.`, true),
      ],
    },
    {
      id: "week-2", dates: "8–14 octobre", title: "Un parcours multijoueur plus fluide et plus lisible.", tags: ["Cartes", "Embarquement", "Billets de session"],
      feature: {
        summary: "Le **choix du trajet**, le **wagon** et la **place** sont retravaillés. Les cartes affichent jusqu’à **10 trajets français**, des **tracés visibles** et des **décors propres aux pays**.",
        media: [
          photo("multiplayer-map", "Carte multijoueur Focus Train avec les trajets disponibles en France", "Trouver un train sur la carte."),
          photo("multiplayer-route", "Sélection du trajet et des informations de voyage dans Focus Train", "Lire les informations du trajet."),
          photo("multiplayer-seat", "Choix de la place à bord d’un wagon Focus Train", "Choisir une place avant d’embarquer."),
        ],
      },
      entries: [
        { period: "Chantier du 6 au 13 octobre", title: "Réduire les attentes entre les écrans", changes: [
          "**Cartes**, **modales**, **recherche de trajets** et **réservation du siège** optimisées ; indicateurs de chargement ajoutés.",
          "Pendant la session : **vue carte**, **vue claire** et commandes musicales accessibles en **solo comme en multijoueur**.",
          "**Historique des sessions sous forme de billets compostés** et **temps de concentration hebdomadaire** enregistrés dans la Collection.",
          `Évolutions portées sur ${appLink("**iOS**", "apple")} et ${appLink("**Android**", "google")}. **Modale de blocage** alignée sur la langue choisie dans l’app.`,
        ], why: "Rendre l’embarquement plus simple et conserver une trace du temps réellement passé à se concentrer." },
        { period: "8–13 octobre", title: "Préparer et distribuer les mises à jour", changes: [
          `${appLink("**iOS 1.0.5**", "apple")} publié le **10 octobre**, puis ${appLink("**iOS 1.0.6**", "apple")} le **13 octobre**.`,
          `${appLink("**Android 1.0.6**", "google")} soumis puis publié le **12 octobre**, selon les repères du dashboard.`,
          "**Captures V2 localisées** et premiers **tests A/B de présentation** préparés. **Brouillon Product Hunt** créé.",
        ], why: "Distribuer les améliorations et commencer à tester la façon de présenter le produit." },
      ],
      media: [
        photo("solo-route", "Choix du trajet et de la durée d’une session solo Focus Train", "Le choix du trajet en mode solo."),
        photo("multiplayer-boarding", "Billet d’embarquement d’un trajet multijoueur Focus Train", "Le billet d’embarquement."),
        photo("multiplayer-focus", "Vue rapprochée de sa place pendant une session multijoueur Focus Train", "La vue de concentration dans le wagon."),
        photo("collection", "Collection Focus Train avec les cartes postales de la région Tohoku", "La Collection conserve les souvenirs du voyage."),
        photo("solo-ticket", "Billet à poinçonner avant une session solo Focus Train", "Le billet solo · le même vocabulaire visuel que l’historique."),
      ],
    },
    {
      id: "week-3", dates: "15–21 octobre", title: "Des passagers simulés qui arrivent progressivement.", tags: ["Présence", "Wagons", "Firebase"],
      feature: {
        summary: "Des **passagers simulés**, distincts des utilisateurs réels, rejoignent les trains avec des **arrivées espacées**. Leur présence correspond à une **place occupée** dans le wagon.",
        media: [
          photo("duo-wagon", "Wagon Focus Train avec plusieurs personnages installés à des places voisines", "Le wagon en fin de mois · certains occupants sont des passagers simulés.", true),
        ],
      },
      entries: [
        { period: "Chantier du 15 au 25 octobre", title: "Rendre la présence moins mécanique", changes: [
          "**Passagers simulés** ajoutés avec profils, avatars, durée de présence et progression.",
          "Première itération : arrivées après le départ. Puis **arrivées un par un**, espacées d’environ **1 à 4 minutes**, y compris lors des renouvellements.",
          "**Renouvellement automatique**, contrôle des places et **vérification Firebase toutes les 4 heures**.",
        ], why: "Éviter les arrivées groupées et les places occupées sans personnage. Le suivi des utilisateurs réels doit rester distinct de cette simulation." },
        { period: "21 octobre", title: "Relier le site à la version Android", changes: [
          `Le ${appLink("**lien Google Play**", "google")} remplace l’annonce « bientôt » sur le ${appLink("**site vitrine**", "site")}.`,
        ], why: "Permettre de télécharger directement la bonne version depuis le site." },
      ],
      media: [
        photo("duo-multiplayer", "Carte multijoueur Focus Train avec les compteurs de voyageurs pour les trains", "Les compteurs de présence sur la carte · capture en fin de mois.", true),
      ],
    },
    {
      id: "week-4", dates: "22–28 octobre", title: "27 carrousels TikTok pour tester les formats.", tags: ["Communication", "TikTok", "Distribution"],
      feature: {
        summary: "**27 carrousels** préparés et programmés, à raison de **3 par jour** du **24 octobre au 1er novembre**. **7 structures éditoriales** sont testées autour des études, du Japon et de la concentration.",
        media: [
          photo("carousel-grid", "Couverture Focus Train en grille montrant quatre scènes de concentration", "Format grille · une session en quatre scènes."),
          photo("carousel-infographic", "Couverture pédagogique Focus Train présentant trois gestes pour se remettre au travail", "Format pédagogique · trois petits gestes."),
          photo("carousel-curiosity", "Couverture Focus Train utilisant une question pour donner envie de lire la suite", "Format curiosité · dévoiler l’idée progressivement."),
        ],
      },
      entries: [
        { period: "Chantier du 21 au 24 octobre", title: "Varier les angles, garder le produit visible", changes: [
          "**27 carrousels de 5 slides**, soit **135 slides**, créés avec des captures de l’application en fin de séquence.",
          "Formats variés : **grille**, **conseil**, **histoire de création**, **liste**, **curiosité**, **expertise** et **avant / après**.",
          "Programmation à **11 h, 16 h et 21 h**, puis ajout de **16 sons différents** aux **26 publications encore programmées**.",
        ], why: "Comparer les formats sur la lecture, les partages et les visites du profil. La programmation seule ne prouve pas leur efficacité." },
        { period: "21–24 octobre", title: "Ouvrir d’autres points de découverte", changes: [
          "**Tableau et épingle Pinterest** créés ; **soumission à AlternativeTo** et démarches auprès d’annuaires.",
          "La validation AlternativeTo reste à confirmer dans les échanges retrouvés.",
        ], why: "Faire connaître le projet sur plusieurs canaux et mesurer lesquels amènent des utilisateurs." },
      ],
      media: [
        photo("carousel-reveal", "Dernière slide du carrousel Focus Train montrant une capture de l’application", "La dernière slide ramène au produit · personnage illustratif généré, pas un témoignage réel."),
        video("play-trailer", "Montage de présentation Focus Train pour Google Play : carte, billet, session et souvenirs", "Bande-annonce Google Play · version française · 28 s."),
      ],
    },
    {
      id: "week-5", dates: "29–31 octobre", title: "Adaptation aux formats iPhone Duo.", tags: ["iPhone Duo", "Captures V3", "A/B test"],
      feature: {
        summary: "L’**adaptation iPhone Duo** reprend l’**accueil**, l’**onboarding**, les **cartes**, la **Collection** et les **commandes de session**, en format **fermé**, **ouvert**, **portrait** et **paysage**.",
        layout: "comparison",
        media: [
          photo("duo-closed", "Accueil Focus Train sur l’écran extérieur de l’iPhone Duo fermé", "Format fermé · des billets et des commandes lisibles."),
          photo("duo-map", "Carte solo Focus Train sur l’écran intérieur de l’iPhone Duo ouvert", "Format ouvert · davantage d’espace pour la carte."),
        ],
      },
      entries: [
        { period: "Chantier du 25 au 31 octobre", title: "Adapter l’espace et les gestes", changes: [
          "**Navigation et retours** rétablis, boutons harmonisés et **billets d’accueil** redimensionnés.",
          "**Onboarding en deux parties en paysage**, une seule en portrait. **Collection** : balayage horizontal entre les pages et défilement vertical à l’intérieur.",
          "**Cache**, **indicateurs de chargement**, **widgets** et **activités en direct** intégrés à la mise à jour Duo.",
          `${appLink("**iOS 1.0.7 disponible le 31 octobre**", "apple")} : disponibilité vérifiée sur la fiche publique Apple.`,
        ], why: "Utiliser l’espace supplémentaire tout en gardant les textes, commandes et parcours accessibles." },
        { period: "28 octobre", title: "Poursuivre les optimisations Android", changes: [
          `${appLink("**Android**", "google")} : **préchargement des visuels**, **cache des cartes et des trains**, et **animation de déchirure des billets** retravaillés dans le code local.`,
          "**Gain de chargement à mesurer** ; la publication de ce second chantier n’est pas confirmée.",
        ], why: "Afficher les données déjà disponibles sans attendre chaque réponse du réseau, puis vérifier la fluidité sur appareil." },
        { period: "25–31 octobre", title: "Itérer la présentation dans les stores", changes: [
          "**5 captures V3 dans 14 langues**, soit **70 visuels**, avec titres plus directs, contraste renforcé et captures localisées.",
          "**Vidéos de présentation** et variantes pour plusieurs formats préparées. Les visuels localisés sont des compositions à partir des captures réelles.",
          `Sur ${appLink("**Google Play**", "google")}, **5 tests A/B arrêtés sans gagnant établi** et envoi des V3 déclenché. **Les anciennes captures restent visibles sur la fiche française au 31 octobre**.`,
        ], why: "Rendre la promesse compréhensible en quelques secondes et vérifier l’effet des nouveaux visuels." },
      ],
      comparisons: [{
        period: "A/B test Apple · relevé du 29 octobre",
        title: "Captures V1 / V3 : un premier signal.",
        description: "La capture du test indique **32,47 % pour la V1** et **47,03 % pour la V3** : **+14,56 points**, soit **+44,83 % en relatif**. Le statut reste **« Collecting Data »** : c’est un signal observé, pas un gain de conversion confirmé.",
        beforeLabel: "V1 · la carte en premier",
        afterLabel: "V3 · la promesse en premier",
        before: photo("store-v1", "Première capture Focus Train V1 : Explore le Japon pas à pas, avec une carte dans un téléphone", "V1 · montrer d’abord la carte."),
        after: photo("store-v3-01", "Première capture Focus Train V3 : Votre focus. Votre voyage., avec le train rose au premier plan", "V3 · annoncer le bénéfice et l’univers."),
        layout: "columns",
        changes: [
          "**Promesse plus courte** et **titres plus lisibles** en petit format.",
          "**Train et univers visuel** mis en avant avant le détail des fonctionnalités.",
          "Résultats Apple et Google Play à lire séparément : les **5 tests Google ne départageaient pas les versions**.",
        ],
      }],
      media: [
        photo("ab-ios-result", "Résultat provisoire du test Apple Focus Train : conversion V1 à 32,47 %, V3 à 47,03 %, collecte en cours", "Relevé Apple du 29 octobre · collecte encore en cours.", true),
        photo("store-v3-02", "Capture Focus Train V3 présentant la préparation d’un voyage et le choix du siège", "V3 · préparer le voyage."),
        photo("store-v3-03", "Capture Focus Train V3 montrant le minuteur et le wagon", "V3 · se concentrer à bord."),
        photo("store-v3-04", "Capture Focus Train V3 présentant la progression du train sur la carte", "V3 · voir son trajet avancer."),
        photo("store-v3-05", "Capture Focus Train V3 présentant les cartes postales et les timbres", "V3 · collectionner les souvenirs."),
        photo("store-v3-en", "Première capture Focus Train V3 en anglais", "La déclinaison en anglais."),
        photo("store-v3-ja", "Première capture Focus Train V3 en japonais", "La déclinaison en japonais."),
        photo("duo-collection", "Collection Focus Train adaptée à l’écran ouvert de l’iPhone Duo", "Duo ouvert · cartes postales et timbres mieux répartis."),
        photo("duo-closed-collection", "Collection Focus Train sur l’écran fermé de l’iPhone Duo", "Duo fermé · garder les commandes accessibles."),
        video("duo-preview", "Montage Focus Train montrant l’ouverture du Duo, la carte et les sessions", "Présentation iPhone Duo · montage en anglais · 28 s."),
      ],
    },
  ],
  metrics: {
    stats: [
      { value: "420", label: "inscriptions suivies", period: "Du 1er au 30 octobre" },
      { value: "658", label: "sessions démarrées", period: "Du 1er au 30 octobre" },
      { value: "223", label: "sessions terminées", period: "Du 1er au 30 octobre" },
    ],
    observation: "L’acquisition commence à se voir, mais le **retour reste faible** : **9,4 % à J1** et **0,5 % à J7** sur les cohortes éligibles. Priorité : **comprendre les abandons** et donner envie de reprendre un trajet.",
    source: "PostHog, iOS + Android, production. Relevé du 31 octobre 2026 sur le dashboard Phenomenals. Période : jours complets du 1er au 30 octobre, en UTC. Les 420 inscriptions correspondent à 420 personnes distinctes avec account_created ; les 658 démarrages et 223 fins sont des volumes d’événements, pas un taux de complétion de sessions appariées. Rétention au jour exact : J1 = 37 / 394 inscrits éligibles ; J7 = 1 / 217. Cohortes immatures exclues, tracking partiel. Ces chiffres ne sont pas des téléchargements. Les passagers simulés ne doivent pas être assimilés à de nouveaux comptes humains.",
  },
  conclusion: {
    summary: `${appLink("**iOS**", "apple")} et ${appLink("**Android**", "google")} améliorés, **multijoueur plus lisible**, **playlist enrichie**, **27 carrousels programmés** et **présentation V3 localisée**. Octobre a servi à consolider l’expérience et à tester sa visibilité.`,
    takeaways: [
      {
        title: appLink("iOS 1.0.7 disponible", "apple"), state: "En ligne", tone: "success",
        detail: "La mise à jour **iPhone Duo**, les optimisations de chargement et les widgets sont visibles dans les nouveautés de la fiche publique Apple.",
        cta: { label: "Découvrir Focus Train sur l’App Store", url: apps.apple },
      },
      {
        title: "Les captures V3 donnent un premier signal", state: "À confirmer", tone: "measure",
        detail: "Le relevé Apple passe de **32,47 % à 47,03 %**. La collecte était encore en cours ; l’effet durable et celui des nouveaux contenus restent à mesurer.",
      },
      {
        title: appLink("Google Play : suivre la diffusion des V3", "google"), state: "À vérifier", tone: "measure",
        detail: "L’envoi a été déclenché. **Les anciennes captures restent visibles sur la fiche française** lors du contrôle du 31 octobre.",
      },
      {
        title: "Faire revenir les utilisateurs", state: "Priorité novembre", tone: "attention",
        detail: "Les **420 inscriptions suivies** confirment un début d’acquisition. La **faible rétention** demande de travailler le premier trajet, les abandons et la reprise d’une session.",
      },
    ],
    nextMonth: {
      title: "Novembre : visibilité et retour dans l’app.",
      goals: [
        "**Communication à fond** : tester les formats courts et identifier ceux qui amènent des **inscriptions**.",
        "**Mesurer l’ASO et le SEO**, puis comparer les captures et les canaux sur des périodes cohérentes.",
        "**Améliorer le premier trajet et le retour dans l’app** : examiner les abandons et suivre les cohortes **J1 / J7**.",
      ],
      personalChallenges: [
        "**1 tweet par jour** pour partager les avancées.",
        "**1 vidéo YouTube au format long** sur le mois.",
        "**1 vidéo ou 1 carrousel par jour minimum**. **Automatisation à explorer** pour tenir le rythme.",
      ],
      target: {
        title: "Objectif Focus Train · Novembre",
        value: "1 000",
        label: "créations de compte",
        detail: `**Au total en novembre**, sur ${appLink("**iOS / App Store**", "apple")} et ${appLink("**Android / Google Play**", "google")}.`,
      },
    },
  },
};
