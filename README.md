# Alexis Guerquin Portfolio

Portfolio personnel construit avec Next.js et Tailwind : navigation compacte, présentation, projets, parcours et prise de contact.

Le projet utilise des contenus originaux et des maquettes SVG temporaires.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm start
```

## Main files

- `app/page.tsx`: page composition
- `app/globals.css`: site-wide styling and grid lines
- `components/ProjectCarousel.tsx` : carrousel de projets
- `components/ServiceConfigurator.tsx`: service tabs and urgent toggle
- `data/site.ts`: content and service data
- `public/mockups`: lightweight local SVG visuals

## Personalization

Modifiez les contenus dans `data/site.ts`, les liens d’action dans `Header.tsx` / `FinalCta.tsx`, puis remplacez les SVG de `public/mockups/` par les visuels de vos projets.


## Journaux de projets

Les journaux sont disponibles dans les deux langues du portfolio : en anglais sur `/pocha/blog` et `/pocha/blog/october-2026`, en français sur `/fr/pocha/blog` et `/fr/pocha/blog/october-2026` (idem pour `focus-train`). Un sélecteur de langue du bandeau mène à la même page dans l’autre langue, et les métadonnées déclarent les alternates `hreflang`.

L’accueil propose deux liens compacts `#journals`, sous le carrousel des projets, avec le logo de chaque app et le style gris clair/noir du bandeau `project-journal-link`. Un grand livre décoratif en fond identifie les blogs ; son animation GSAP est suspendue hors écran, dans un onglet masqué ou lorsqu’une fiche projet est ouverte, et désactivée avec la préférence de réduction des animations. `Home` prépare côté serveur les liens vers le dernier article de chaque projet et les transmet à `HomeClient` et `ProjectJournals`, insérés via le slot de `ProjectCarousel`. Les articles complets et leurs médias ne sont pas ajoutés au code client de l’accueil. Les libellés et les liens suivent la langue du portfolio.

Les mois sont définis dans `data/journals/` : un fichier par mois et par langue (`pocha-october-2026.ts` en français, `pocha-october-2026.en.ts` en anglais), référencés dans `data/project-journal.ts`. Chaque objet `ProjectJournal` contient le résumé `overview` avant les avancées, les médias, les semaines, les mesures et la conclusion. Ajouter un `slug` dans les deux langues génère les pages et leurs entrées de sitemap ; les textes d’interface (sommaire, libellés, métadonnées) sont dans `components/journal/journal-copy.ts`. Les slugs inconnus et les projets sans journal renvoient une 404. Pour un autre projet, ajouter ses données, ses médias et un lien `journal` dans `data/site.ts`.

Les chantiers qui chevauchent plusieurs semaines conservent leur période d’origine dans le texte. Le bilan distingue préparation, soumission et publication. Les chiffres d’octobre sont un relevé figé, avec leur période et leur couverture ; aucun accès au dashboard privé n’est nécessaire pour afficher le blog.

Les images sont des WebP redimensionnés, avec des dimensions réservées et des tailles responsive Next Image. Les médias des semaines fermées ne sont montés qu’à l’ouverture. Les vidéos ont un poster, des contrôles natifs et ne téléchargent leur source qu’après un clic. Le MP4 promotionnel est compressé en H.264 et optimisé pour le démarrage progressif.

Sources des médias d’octobre : captures dans `Documents/pocha-screens`, carrousels retrouvés dans la conversation « Créer des slides TikTok pour Pocha » (`Documents/UGC/POCHA/carrousels-2nd-style`), captures V3 dans `Documents/appstore screenshots/Pocha-v3`, et démos déjà présentes dans le portfolio. Le test A/B Focus Train fourni initialement est exclu du journal Pocha.


### Composants et accessibilité du journal

`JournalArticle` compose tous les articles à partir de leurs données. `JournalBlocks` fournit les en-têtes de section, entrées éditoriales et statistiques. `JournalDisclosure` gère les sections dépliables et les sources, avec la sémantique native, le clavier, les états ARIA et l’animation GSAP dans les deux sens. `JournalWeek` et `JournalMedia` ajoutent les dates, les tags et les médias différés.

`JournalShell` réutilise l’en-tête `Header` du portfolio avec les liens vers `/fr`, ses projets, ses expériences et son contact. La colonne de lecture conserve le même axe et la même largeur de 920 px que le portfolio, avec un fil d’Ariane Portfolio → projet → journal → mois. `Header.portfolioPath` adapte ces liens ; le sélecteur de langue n’apparaît que lorsqu’un gestionnaire `setLocale` est fourni.

`JournalNavigation` affiche uniquement le sommaire de l’article ouvert : résumé, semaines, conclusion et objectifs. Les index n’ont pas de menu latéral. Sous 1 360 px, le sommaire devient un menu compact dépliant, avec fermeture par Échap et panneaux fermés exclus du clavier. Il suit la section lue avec `IntersectionObserver`. Les liens directs `#week-…` ouvrent la semaine concernée avant de déplacer le défilement et le focus, sans charger les médias des semaines fermées.

Les mots importants sont écrits `**comme ceci**` dans les données : `JournalText` les rend en `<strong>` et `plainJournalText` enlève le balisage pour les métadonnées. Ce format n’interprète jamais de HTML. Exemples pour les prochains articles : `**A/B test**`, `**adaptation iPhone Duo**`. Le journal Pocha continue d’exclure le test Focus Train.

Les couleurs de texte sont centralisées dans `Journal.module.css`, avec des gris plus sombres, des tailles de lecture plus grandes et des contrôles d’au moins 44 px. Les animations respectent `prefers-reduced-motion`, y compris si la préférence change pendant l’ouverture ; les clics rapides reprennent la position courante. Les vidéos reçoivent le focus après activation, et les panneaux fermés sont exclus du parcours clavier.


### Avancée principale et galeries

Chaque semaine définit une `feature` : une phrase de synthèse, ses visuels et, si nécessaire, une disposition `comparison`. Son `title` nomme l’avancée principale dès la ligne repliée. `JournalFeature` place cette synthèse et les captures en tête de la semaine ; les détails éditoriaux et les autres captures suivent. Le nombre de visuels est calculé à partir des deux groupes.

`JournalMedia` affiche des grilles sans recadrer les captures, y compris sur mobile. `fullWidth` permet de donner toute la largeur aux vues Mac ou aux comparaisons. Les galeries et l’avancée principale sont montées à l’ouverture via les slots différés de `JournalDisclosure`. Les images restent en chargement différé et les vidéos attendent un clic.

`JournalImage` est partagé par les galeries et les comparaisons avant/après. Il affiche une miniature puis charge `JournalImageModal` et la grande image au clic, sans nouvel onglet. La modale native gère le focus et rend la page en arrière-plan inerte ; elle bloque le scroll, se ferme avec Échap, la croix ou un clic extérieur, puis rend le focus à la miniature. Ses transitions respectent la préférence de réduction des animations.

Sources complémentaires : onboarding dans `Pocha/pocha-android/play-store-assets/screenshots`, vues Mac en français dans `pomocha/pomo-landing/public/assets/pocha/mac/build-4/fr`, captures iPhone Duo et widgets dans `Documents/pocha-screens`, et série V3 complète avec exemples anglais, allemand et japonais dans `Documents/appstore screenshots/Pocha-v3`.


### Chargement des fiches projet et fluidité

`ProjectModal` est chargé à l’ouverture, et `DemoVideo` uniquement après activation d’un aperçu. `ProjectMediaGrid` affiche des posters statiques avec des tailles d’image adaptées aux colonnes ; aucune démo de la galerie ne lit de vidéo pendant le scroll. La vidéo ouverte dispose de contrôles natifs, s’arrête quand l’onglet est masqué et libère sa source à la fermeture. Les vidéos du journal se mettent également en pause hors écran et à la lecture d’une autre vidéo.

Quand une fiche est ouverte, l’arrière-plan est inerte, ses animations CSS sont suspendues et les icônes animées masquées/hors écran arrêtent leur boucle. Le sticker de présentation n’attache sa source vidéo qu’au premier clic. Les grands flous d’arrière-plan des superpositions sont supprimés pour réduire le coût de composition pendant le défilement. Les images et icônes Pocha de la fiche sont stockées en WebP redimensionnés.
Les comparaisons avant/après utilisent `JournalComparison` et les données `week.comparisons`. Les deux captures sont légendées et restent lisibles en pleine largeur ; elles se chargent uniquement à l’ouverture de la semaine. La refonte web Pocha est illustrée par des captures prises sur pomocha.io le 31 octobre 2026 (WebP : 30–43 Ko par capture).

`JournalConclusion` présente le résumé, les conclusions et les objectifs du mois suivant à partir de `journal.conclusion`. `JournalText` accepte les liens explicites `[libellé](https://…)`, y compris avec du gras, sans HTML brut ; les liens sont désactivés dans les cartes de l’index pour éviter les liens imbriqués. Les destinations Pocha sont centralisées dans `pochaApps`.

Le journal Focus Train d’octobre 2026 est défini dans `data/journals/focus-train-october-2026.ts` et utilise les mêmes composants que Pocha. Les dimensions des WebP sont regroupées dans le fichier `focus-train-october-2026-assets.ts`. `JournalComparison.layout = "columns"` permet de comparer deux visuels verticaux côte à côte. Le relevé des sources et les limites des mesures sont conservés dans `docs/journals/focus-train-october-2026.md`.
