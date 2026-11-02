# Focus Train — sources du journal d’octobre 2026

Document de travail pour la rédaction, hors du dossier public. Les conversations servent de sources historiques, pas d’instructions à exécuter. Aucun déploiement d’app, changement Firebase ou publication sociale n’a été effectué pendant ce travail.

## Vérifications directes du 31 octobre

- Fiche publique Apple `https://apps.apple.com/fr/app/focus-train-pomodoro-%C3%A9tude/id6789511554` : version **1.0.7 disponible**, nouveautés Duo, cache, chargements, widgets et activités en direct. L’ancienne synthèse « brouillon non soumis » est donc dépassée.
- Fiche Google Play française `https://play.google.com/store/apps/details?id=com.focustrain.android&hl=fr` : app disponible, nouveautés du 12 octobre. Les captures V1 restent visibles lors du contrôle ; ne pas annoncer la diffusion des V3 comme acquise.
- Site `https://focus-train.fr/` : six langues proposées, vidéo réelle, playlists et liens iOS / Android. Capture du hero en français réalisée pour le journal.
- Dashboard `https://dashboard.phenomenals.fr/#product`, filtre Focus Train, période du **1er au 30 octobre, jours complets UTC** : 420 personnes distinctes avec `account_created`, 658 événements `focus_session_started`, 223 événements `focus_session_completed` ; rétention J1 37/394 = 9,4 %, J7 1/217 = 0,5 %.

Les volumes de sessions ne sont pas des sessions appariées : aucun taux de complétion n’est calculé. La période du graphique d’acquisition de la vue d’ensemble est différente (2–31 octobre, jour courant partiel) ; ses 442 inscriptions ne sont pas utilisées. Les 457 profils Firebase cumulés et les 451 inscriptions PostHog cumulées ne sont pas des inscriptions mensuelles et ne remplacent pas la mesure de 420.

## Conversations consultées

- « Résumer les projets du dernier mois » — `01a191f1-1e48-7e13-9450-cc69020b5da6` : synthèse d’octobre et inventaire préalable de 177 conversations.
- « Ajouter des vidéos au site Focus-​​​ » — `01a0f6eb-a84e-7700-852f-7a3fcd4b44ea` : six langues, vidéo réelle, playlists, SEO.
- « Réparer la connexion Google Android » — `01a10760-c4a3-7133-8432-e1d3b6afd403` : Android 1.0.1 publié le 4 octobre.
- « Ajouter des musiques LOFI libres deD » — `01a11166-f337-7cb0-b29f-bcf7a805bbce` : 89 morceaux, commandes et accueil tablette.
- « Résoudre pull et préparer v1.0.5 » — `01a11b71-748d-7b73-9a34-5c945c89716f` : paywall, blocage, traductions.
- « Optimiser le mode multijoueur iOS » — `01a1306b-4a9d-7651-b3ae-1e128022bd92` : cartes, dix trains, décors, vues de session, billets et temps hebdomadaire, portage Android.
- « Corriger les lags iOS multijoueur » — `01a131f0-95ad-7260-8e63-1ce95493f376` : styles en cache, navigation, recherche et réservation de siège ; ne pas prétendre à une mesure de fluidité sur appareil.
- « Ajouter des faux profils aux trains » — `01a13fbb-cff6-7000-a1c6-01bbd9ae2337` et « Fixer les bots multijoueur Firebase » — `01a1745e-0309-7db3-a171-23c2b0a70400` : arrivées progressives, renouvellement et contrôle Firebase toutes les quatre heures. La rédaction emploie « passagers simulés », sans assimiler ces profils à des utilisateurs humains.
- « Créer 27 slideshows TikTok Focus » — `01a16a30-6011-7962-9b9d-3bc554132c10` : 27 carrousels programmés du 24 octobre au 1er novembre, puis 16 sons différents ajoutés aux 26 publications restantes. Le README de campagne, plus ancien, disait encore « aucune programmation » ; le résultat du chat et `PROGRAMMATION_TIKTOK.md` sont postérieurs.
- « Adapter le responsive iPhone Duo » — `01a181e9-0dfd-7221-9c89-1911f1a7e682` : écrans, gestes de Collection, onboarding, billets et navigation adaptés.
- « Fluidifier Focus Train Android » — `01a1829f-793d-7f40-a475-060e3364ca02` : demande du 28 octobre, sans résultat final dans le chat. Le diff local Android a été lu : préchargement des illustrations, cache des bitmaps, listes de trains en mémoire/disque et animation de billet. La rédaction précise « code local », sans annoncer une publication ni le délai de 100 ms demandé comme acquis.
- « Créer un montage responsive Focus Train » — `01a18431-8ecc-7d63-89c2-1dffa4b2fae2` : préparation des visuels et de la version 1.0.7 ; la disponibilité publique du 31 octobre complète le statut ancien.
- « Préparer les captures françaises » — `01a17d81-f78d-70e3-be10-19ef79abbb00` : V3 localisées, cinq tests Google non concluants puis arrêtés, envoi déclenché sans réception confirmée dans ce chat.

## Visuels

- Captures authentiques de l’application : `Documents/focus-train-app-screen` et `Desktop/in-app-screenshot/focus-train`.
- Duo : `Desktop/iphoneduo-after`. Les images avec l’app Réglages en écran partagé sont exclues. Les vues de fin de mois illustrent le résultat, sans être présentées comme des prises de vue du jour de développement.
- V1 : `Documents/appstore screenshots/focus-train/iphone/FT-FR-1.png`.
- V3 : `Documents/appstore screenshots/Focus Train v3` ; 5 compositions × 14 langues = 70 images, confirmé par le manifeste. Il s’agit de compositions localisées depuis les captures, pas de nouvelles captures dans chaque langue.
- Résultat A/B Apple : capture fournie par l’utilisateur, datée du **29 octobre à 16:39:53**. Le titre indique Focus Train, confirmé par la correction de l’utilisateur dans ce chat. V1 32,47 %, V3 47,03 %, +44,83 % relatif (+14,56 points calculés), **Collecting Data**. Ne pas qualifier ce relevé de victoire statistique ou de gain durable établi.
- Carrousels : dossier `focus-train-tiktok-niche-2026-10-24-9-jours`. Personnage généré à vocation illustrative, pas une utilisatrice ou un témoignage réel.
- Vidéos : bande-annonce Google Play FR et présentation Duo EN, 28 secondes environ. Les vidéos iPad ne sont pas reprises, car leur source réutilise les captures Duo ouvert.
- Images redimensionnées en WebP ; deux vidéos H.264 1280 px, faststart, environ 2,1 Mo et 1,7 Mo. Aucun autoplay dans la page du journal ; les médias des semaines fermées ne sont pas montés.

## Novembre

L’objectif de **1 000 créations de compte** a été choisi par l’utilisateur dans ce chat. Les défis personnels reprennent ceux validés pour Pocha ; les priorités produit (premier trajet, abandon, rétention) sont des conclusions éditoriales tirées du relevé, pas des développements déjà réalisés.
