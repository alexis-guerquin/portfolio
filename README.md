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
