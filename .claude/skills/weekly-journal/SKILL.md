---
name: weekly-journal
description: Weekly update of a project's build journal (Pocha, Focus Train, any project with a journal). Interviews the user about the week, then writes the French and English content, optimizes media, refreshes SEO surfaces (sitemap, RSS, llms.txt, JSON-LD) and verifies the build. Use when the user says "journal de la semaine", "weekly journal", "update the blog", "ajouter une semaine au blog" or similar.
---

# Weekly journal update

Each project has one journal per month (`data/journals/<project>-<month>-<year>.ts` in French, `.en.ts` in English) containing up to five `weeks`. Every weekly run adds or extends one week in **both languages**, keeps SEO metadata fresh and verifies the build. Run from the repository root.

Never invent facts. Every number, release status and date comes from the user or a source they point to. Keep the existing distinction between *prepared*, *submitted* and *published*, and say "to measure" rather than claiming results.

## 1. Orient yourself (no questions yet)

1. List `data/journals/` and read `data/project-journal.ts` (types and `journalsByLocale`).
2. Read the latest journal pair of the target project to copy its voice, `photo()` helper style and tag/caption conventions. Pocha's file uses inline dimensions; Focus Train uses the shared `*-assets.ts` dimensions file. For a new month, follow the Pocha style (inline dimensions).
3. Check `git log --oneline -5` and `git status` so you know what is already committed.

## 2. Interview the user

Use `AskUserQuestion` (max 4 questions per call, options plus free text). Ask in French. Skip what you already know, and offer sensible defaults (next week range, same project as last time).

**Round 1 – scope**
- Project (list the projects that have a journal).
- Week: which dates (default: the next uncovered range, 1–7, 8–14, 15–21, 22–28, 29–end of month) and whether it extends the current month or starts a new month.
- The headline: the one main progress of the week (becomes the week `title` and `feature.summary`).

**Round 2 – what happened** (repeat per work item, ask "anything else?")
- What changed (concrete bullets) and **why**.
- Period of that work if it spans several weeks (the text keeps the original period).
- Release status for each store/platform: prepared, submitted, published, verified? On which date and version?
- Tags (2–3 short topic words).

**Round 3 – proof**
- Media: absolute paths of screenshots or videos, and which is the lead visual for the `feature`. Ask for a one-line caption idea per file, or propose captions yourself from the file names.
- Metrics: new PostHog (or other) numbers, with period and source. Only at month end, or if the user wants to refresh them. Ask what counts and what does not (downloads vs sign-ups, partial coverage).
- Before/after comparison or A/B result to feature? If yes: both images, labels, what changed.

**Round 4 – month end only**
- Takeaways (state: success / measure / attention), next-month goals, personal challenges, numeric target.

Summarize the plan back in two or three lines and get a go before writing files.

## 3. Media

Run for every file (images become WebP ≤ 800 px, names containing `wide` ≤ 1400 px, videos become faststart MP4 plus WebP poster):

```bash
scripts/journal-media.sh <project> <month-slug> <file>...
```

It writes to `public/<project>/blog/<month-slug>/` and prints a ready-to-paste `photo("name", w, h, "ALT", "CAPTION"),` line per image. Never commit originals. Alt texts describe the screen for someone who cannot see it (not "screenshot 3"). Captions are short. Mark real-vs-illustrative visuals honestly.

## 4. Write the content (FR and EN in the same pass)

For the month files `<project>-<month>-<year>.ts` and `.en.ts`:

- Add or extend `weeks[]` with `id: "week-N"`, `dates`, `title` (ends with a period), `tags`, `feature` (`summary` plus 1–3 media, `layout: "comparison"` only for open/closed style triptychs), `entries[]` (`period`, `title`, `changes[]`, `why`), `media[]`, and optional `comparisons[]`.
- Inline format: `**bold**` for the key nouns, links with the file's `appLink(label, platform)` helper, no raw HTML. Entry `why` is one sentence.
- Update `updated` to today's ISO date (add the field if the journal does not have it yet; `published` stays the original date). Update `description` (plain text ≤ 160 characters once `**` and links are stripped, starting with the strongest keywords of the month), `overview`, and `metrics`/`conclusion` when the user supplied new data.
- French typography: `’` apostrophes, `1er–7 octobre`, `9,4 %` with a non-breaking space, `1 000`. English: `October 1–7`, `9.4%`, `1,000`, `4 pm`, British spelling.
- Translate, do not transliterate: reword so the English reads naturally, but keep the same structure, ids, tags count, media names and numbers in both files.

**New month:** create both new files (copy the previous pair, reset `weeks`, increment `issue`, new `slug` like `november-2026`, new `month`, `published`, media `base` path), import them in `data/project-journal.ts` and add them to **both** arrays of `journalsByLocale`. `getProjectJournals` sorts by `published`, so the home links and indexes pick the newest month automatically.

**New project:** add its `journal: "/<id>/blog"` field in `data/site.ts`, a journal file pair and the registration above.

Also keep `docs/journals/<project>-<month>.md` (internal sources note, French) up to date: sources consulted, figures and their provenance, items deliberately left out.

## 5. SEO checklist

Most surfaces are generated from the data, so a correct data change updates them; confirm each:

- `app/sitemap.ts` – article and index `lastModified` use `updated`; priority and `weekly` frequency are already set. Both locales are listed.
- `/feed.xml` and `/fr/feed.xml` (`lib/journal-feed.ts`) – newest `updated` first; advertised through `alternates.types` on journal pages.
- `/llms.txt` (`app/llms.txt/route.ts`) – lists every journal with its update date.
- Article metadata (`components/journal/journal-metadata.ts`) – unique `<title>` (project, month), description from `description`, canonical, `hreflang` fr/en, Open Graph `modifiedTime`.
- JSON-LD `BlogPosting` (`JournalArticle.tsx`) – `dateModified`, `keywords` from the week tags, `isPartOf` Blog.
- Content: each week title carries a real search phrase (what changed, platform, feature), alt text on every image, links from the journal to the project page and store pages (already in `appLink`).
- If you notice a gap (missing `updated`, description too long, empty alt), fix it rather than reporting it.

Do not claim ranking effects. After deploy, suggest the user submits the new URLs in Google Search Console and Bing Webmaster Tools (you cannot do this yourself).

## 6. Verify

```bash
npx tsc --noEmit
npx next build
git checkout tsconfig.tsbuildinfo   # tsc rewrites this tracked file
```

Then inspect `.next/server/app/{,fr/}<project>/blog/<month>.html` for the right `<html lang>`, title, `hreflang` links and no leftover French text in the English page (and vice versa), plus `.next/server/app/feed.xml.body`. Fix failures before reporting. If the dev server is useful, open `/<project>/blog/<month>` and `/fr/<project>/blog/<month>` and check the new week opens, images load and captions fit.

## 7. Wrap up

Report in French: what was added (week, files, media count), what is still unverified or marked "to measure", and what the user must do after deploy (Search Console). Do **not** commit or push unless asked; when asked, make separate commits: media (`content:`), journal data (`feat:`/`content:`), docs (`docs:`), with the repository's `type:` prefix convention.
