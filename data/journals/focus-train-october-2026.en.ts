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

export const focusTrainOctober2026En: ProjectJournal = {
  project: "focus-train",
  projectName: "Focus Train",
  issue: 1,
  slug: "october-2026",
  month: "October 2026",
  published: "2026-10-31",
  description: `${appLink("**iOS**", "apple")} and ${appLink("**Android**", "google")} made more reliable, **reworked multiplayer**, **iPhone Duo adaptation** and **V3 screenshots**. A month spent improving the journey, then getting it known.`,
  cover: photo("cover", "Focus Train presentation: a pink train crosses Japan between postcards and stamps", ""),
  hero: [
    photo("solo-map", "The Japan map in Focus Train", ""),
    photo("home", "The Focus Train home screen with the Solo and Multiplayer tickets", ""),
    photo("multiplayer-wagon", "A focus session on board a Focus Train wagon", ""),
  ],
  heroCaption: "Turning focus time into a journey, solo or together.",
  platforms: [
    { label: "iOS", url: apps.apple },
    { label: "Android", url: apps.google },
    { label: "Website", url: apps.site },
  ],
  icon: `${base}/icon.webp`,
  overview: `**Login, audio, maps and boarding** were improved on ${appLink("**iOS**", "apple")} and ${appLink("**Android**", "google")}. At the end of the month, the **iPhone Duo adaptation**, the **V3 screenshots** and the **promotional carousels** took over to make the product clearer and more visible.`,
  weeks: [
    {
      id: "week-1", dates: "October 1–7", title: "89 LOFI tracks to accompany sessions.", tags: ["Audio", "Google sign-in", "Marketing site"],
      feature: {
        summary: "The **LOFI playlist** grows to **89 tracks**, about **4 hours** of listening. The **current track**, the **next track** and **shuffle** are available during sessions.",
        media: [
          photo("solo-session", "Focus Train solo session with progress on the map and the music player at the bottom", "The music player during a solo session."),
          photo("multiplayer-wagon", "Focus Train wagon with next-track and shuffle controls", "The same controls in the multiplayer wagon."),
        ],
      },
      entries: [
        { period: "Work from October 4 to 8", title: "Making the way into the app more reliable", changes: [
          `${appLink("**Android Google sign-in**", "google")} fixed: clearer errors and a cleaned-up sign-out. **Version 1.0.1 published on October 4**.`,
          "**Tablet home screen** adapted and language choice grouped into a **dropdown menu**.",
          `${appLink("**iOS paywall**", "apple")} simplified, **app blocking** re-enabled and **RevenueCat** integrated.`,
        ], why: "Reduce blockers before the first session and make the subscription offer easier to understand." },
        { period: "Audio work from October 6 to 12", title: "Staying in your session", changes: [
          "**89 LOFI tracks** integrated, with **current track**, **next track** and **shuffle**.",
          "**Landscape scrolling** and loading reworked to limit visual pauses.",
        ], why: "Keep the useful controls within reach, without interrupting the journey." },
        { period: "October 1", title: "Showing the product on the website", changes: [
          `${appLink("**Marketing site**", "site")} available in **6 languages**, with a **real app video** and a **YouTube playlist carousel**.`,
          "Lighter navigation, enriched metadata and content for **SEO** and **AI assistants**.",
        ], why: "Explain the concept with the real screens before the download." },
      ],
      media: [
        photo("home", "Focus Train home screen and access to the Solo, Multiplayer and Collection modes", "The home screen and its entry tickets."),
        photo("solo-landscape", "Focus Train solo session showing the train in its landscape", "The landscape that accompanies focus."),
        photo("site-current", "Focus Train marketing site in French with a real video and the App Store and Google Play buttons", `${appLink("Marketing site", "site")} · screenshot from October 31, with the Android link added on the 21st.`, true),
      ],
    },
    {
      id: "week-2", dates: "October 8–14", title: "A smoother, clearer multiplayer flow.", tags: ["Maps", "Boarding", "Session tickets"],
      feature: {
        summary: "The **route choice**, the **wagon** and the **seat** are reworked. Maps show up to **10 French routes**, **visible tracks** and **country-specific scenery**.",
        media: [
          photo("multiplayer-map", "Focus Train multiplayer map with the routes available in France", "Finding a train on the map."),
          photo("multiplayer-route", "Route selection and travel information in Focus Train", "Reading the route information."),
          photo("multiplayer-seat", "Seat selection on board a Focus Train wagon", "Choosing a seat before boarding."),
        ],
      },
      entries: [
        { period: "Work from October 6 to 13", title: "Reducing the waits between screens", changes: [
          "**Maps**, **modals**, **route search** and **seat booking** optimized; loading indicators added.",
          "During the session: **map view**, **clear view** and music controls available in **solo as well as multiplayer**.",
          "**Session history as punched tickets** and **weekly focus time** saved in the Collection.",
          `Changes brought to ${appLink("**iOS**", "apple")} and ${appLink("**Android**", "google")}. **Blocking modal** aligned with the language chosen in the app.`,
        ], why: "Make boarding simpler and keep a record of the time actually spent focusing." },
        { period: "October 8–13", title: "Preparing and shipping updates", changes: [
          `${appLink("**iOS 1.0.5**", "apple")} published on **October 10**, then ${appLink("**iOS 1.0.6**", "apple")} on **October 13**.`,
          `${appLink("**Android 1.0.6**", "google")} submitted then published on **October 12**, according to the dashboard milestones.`,
          "**Localized V2 screenshots** and first **presentation A/B tests** prepared. **Product Hunt draft** created.",
        ], why: "Ship the improvements and start testing how to present the product." },
      ],
      media: [
        photo("solo-route", "Choosing the route and duration of a Focus Train solo session", "Choosing the route in solo mode."),
        photo("multiplayer-boarding", "Boarding ticket for a Focus Train multiplayer route", "The boarding ticket."),
        photo("multiplayer-focus", "Close-up of your seat during a Focus Train multiplayer session", "The focus view inside the wagon."),
        photo("collection", "Focus Train Collection with postcards from the Tohoku region", "The Collection keeps the memories of the journey."),
        photo("solo-ticket", "Ticket to punch before a Focus Train solo session", "The solo ticket · the same visual vocabulary as the history."),
      ],
    },
    {
      id: "week-3", dates: "October 15–21", title: "Simulated passengers arriving gradually.", tags: ["Presence", "Wagons", "Firebase"],
      feature: {
        summary: "**Simulated passengers**, distinct from real users, join the trains with **spaced-out arrivals**. Their presence corresponds to an **occupied seat** in the wagon.",
        media: [
          photo("duo-wagon", "Focus Train wagon with several characters sitting in neighboring seats", "The wagon at the end of the month · some occupants are simulated passengers.", true),
        ],
      },
      entries: [
        { period: "Work from October 15 to 25", title: "Making presence feel less mechanical", changes: [
          "**Simulated passengers** added with profiles, avatars, presence duration and progress.",
          "First iteration: arrivals after departure. Then **arrivals one by one**, spaced about **1 to 4 minutes** apart, including during renewals.",
          "**Automatic renewal**, seat checks and a **Firebase check every 4 hours**.",
        ], why: "Avoid grouped arrivals and occupied seats with no character. Real user tracking must stay separate from this simulation." },
        { period: "October 21", title: "Linking the website to the Android version", changes: [
          `The ${appLink("**Google Play link**", "google")} replaces the “coming soon” notice on the ${appLink("**marketing site**", "site")}.`,
        ], why: "Let people download the right version directly from the website." },
      ],
      media: [
        photo("duo-multiplayer", "Focus Train multiplayer map with traveler counters for the trains", "Presence counters on the map · screenshot from the end of the month.", true),
      ],
    },
    {
      id: "week-4", dates: "October 22–28", title: "27 TikTok carousels to test formats.", tags: ["Communication", "TikTok", "Distribution"],
      feature: {
        summary: "**27 carousels** prepared and scheduled, at a rate of **3 per day** from **October 24 to November 1**. **7 editorial structures** are tested around studying, Japan and focus.",
        media: [
          photo("carousel-grid", "Focus Train grid cover showing four focus scenes", "Grid format · one session in four scenes."),
          photo("carousel-infographic", "Focus Train educational cover presenting three gestures to get back to work", "Educational format · three small gestures."),
          photo("carousel-curiosity", "Focus Train cover using a question to make people want to read on", "Curiosity format · revealing the idea gradually."),
        ],
      },
      entries: [
        { period: "Work from October 21 to 24", title: "Varying the angles, keeping the product visible", changes: [
          "**27 carousels of 5 slides**, i.e. **135 slides**, created with app screenshots at the end of each sequence.",
          "Varied formats: **grid**, **tip**, **creation story**, **list**, **curiosity**, **expertise** and **before / after**.",
          "Scheduled at **11 am, 4 pm and 9 pm**, then **16 different sounds** added to the **26 posts still scheduled**.",
        ], why: "Compare the formats on views, shares and profile visits. Scheduling alone does not prove they work." },
        { period: "October 21–24", title: "Opening other discovery points", changes: [
          "**Pinterest board and pin** created; **AlternativeTo submission** and outreach to directories.",
          "The AlternativeTo approval is still to be confirmed in the messages found.",
        ], why: "Get the project known on several channels and measure which ones bring users." },
      ],
      media: [
        photo("carousel-reveal", "Last slide of the Focus Train carousel showing an app screenshot", "The last slide leads back to the product · generated illustrative character, not a real testimonial."),
        video("play-trailer", "Focus Train presentation montage for Google Play: map, ticket, session and memories", "Google Play trailer · French version · 28 s."),
      ],
    },
    {
      id: "week-5", dates: "October 29–31", title: "Adapting to iPhone Duo formats.", tags: ["iPhone Duo", "V3 screenshots", "A/B test"],
      feature: {
        summary: "The **iPhone Duo adaptation** covers the **home screen**, the **onboarding**, the **maps**, the **Collection** and the **session controls**, in **closed**, **open**, **portrait** and **landscape** formats.",
        layout: "comparison",
        media: [
          photo("duo-closed", "Focus Train home screen on the outer screen of the closed iPhone Duo", "Closed format · legible tickets and controls."),
          photo("duo-map", "Focus Train solo map on the inner screen of the open iPhone Duo", "Open format · more room for the map."),
        ],
      },
      entries: [
        { period: "Work from October 25 to 31", title: "Adapting space and gestures", changes: [
          "**Navigation and back actions** restored, buttons harmonized and **home tickets** resized.",
          "**Two-part onboarding in landscape**, a single one in portrait. **Collection**: horizontal swipe between pages and vertical scrolling inside.",
          "**Cache**, **loading indicators**, **widgets** and **live activities** integrated into the Duo update.",
          `${appLink("**iOS 1.0.7 available on October 31**", "apple")}: availability verified on the public Apple listing.`,
        ], why: "Use the extra space while keeping text, controls and flows accessible." },
        { period: "October 28", title: "Continuing the Android optimizations", changes: [
          `${appLink("**Android**", "google")}: **image preloading**, **map and train caching**, and the **ticket-tearing animation** reworked in the local code.`,
          "**Loading gain to be measured**; the release of this second work item is not confirmed.",
        ], why: "Display the data already available without waiting for each network response, then check smoothness on a device." },
        { period: "October 25–31", title: "Iterating on the store presentation", changes: [
          "**5 V3 screenshots in 14 languages**, i.e. **70 visuals**, with more direct titles, stronger contrast and localized screenshots.",
          "**Presentation videos** and variants for several formats prepared. The localized visuals are compositions built from the real screenshots.",
          `On ${appLink("**Google Play**", "google")}, **5 A/B tests stopped with no established winner** and V3 upload triggered. **The old screenshots are still visible on the French listing as of October 31**.`,
        ], why: "Make the promise understandable in a few seconds and check the effect of the new visuals." },
      ],
      comparisons: [{
        period: "Apple A/B test · snapshot from October 29",
        title: "V1 / V3 screenshots: a first signal.",
        description: "The test screenshot shows **32.47% for V1** and **47.03% for V3**: **+14.56 points**, or **+44.83% relative**. The status is still **“Collecting Data”**: this is an observed signal, not a confirmed conversion gain.",
        beforeLabel: "V1 · the map first",
        afterLabel: "V3 · the promise first",
        before: photo("store-v1", "First Focus Train V1 screenshot: Explore Japan step by step, with a map inside a phone", "V1 · showing the map first."),
        after: photo("store-v3-01", "First Focus Train V3 screenshot: Your focus. Your journey., with the pink train in the foreground", "V3 · announcing the benefit and the universe."),
        layout: "columns",
        changes: [
          "**Shorter promise** and **more legible titles** at small sizes.",
          "**Train and visual universe** put forward before the feature details.",
          "Apple and Google Play results to be read separately: the **5 Google tests did not separate the versions**.",
        ],
      }],
      media: [
        photo("ab-ios-result", "Provisional Focus Train Apple test result: V1 conversion at 32.47%, V3 at 47.03%, data still being collected", "Apple snapshot from October 29 · data collection still in progress.", true),
        photo("store-v3-02", "Focus Train V3 screenshot presenting trip preparation and seat choice", "V3 · preparing the trip."),
        photo("store-v3-03", "Focus Train V3 screenshot showing the timer and the wagon", "V3 · focusing on board."),
        photo("store-v3-04", "Focus Train V3 screenshot presenting the train's progress on the map", "V3 · watching your route advance."),
        photo("store-v3-05", "Focus Train V3 screenshot presenting postcards and stamps", "V3 · collecting memories."),
        photo("store-v3-en", "First Focus Train V3 screenshot in English", "The English version."),
        photo("store-v3-ja", "First Focus Train V3 screenshot in Japanese", "The Japanese version."),
        photo("duo-collection", "Focus Train Collection adapted to the open iPhone Duo screen", "Duo open · postcards and stamps better distributed."),
        photo("duo-closed-collection", "Focus Train Collection on the closed iPhone Duo screen", "Duo closed · keeping the controls accessible."),
        video("duo-preview", "Focus Train montage showing the Duo opening, the map and sessions", "iPhone Duo presentation · English montage · 28 s."),
      ],
    },
  ],
  metrics: {
    stats: [
      { value: "420", label: "tracked sign-ups", period: "October 1–30" },
      { value: "658", label: "sessions started", period: "October 1–30" },
      { value: "223", label: "sessions completed", period: "October 1–30" },
    ],
    observation: "Acquisition is starting to show, but **retention remains low**: **9.4% on D1** and **0.5% on D7** across eligible cohorts. Priority: **understand drop-offs** and make people want to start another trip.",
    source: "PostHog, iOS + Android, production. Snapshot taken on October 31, 2026 from the Phenomenals dashboard. Period: full days from October 1 to 30, in UTC. The 420 sign-ups correspond to 420 distinct people with account_created; the 658 starts and 223 completions are event volumes, not a completion rate of paired sessions. Retention on the exact day: D1 = 37 / 394 eligible sign-ups; D7 = 1 / 217. Immature cohorts excluded, partial tracking. These figures are not downloads. Simulated passengers must not be treated as new human accounts.",
  },
  conclusion: {
    summary: `${appLink("**iOS**", "apple")} and ${appLink("**Android**", "google")} improved, **clearer multiplayer**, **richer playlist**, **27 scheduled carousels** and **localized V3 presentation**. October was used to consolidate the experience and test its visibility.`,
    takeaways: [
      {
        title: appLink("iOS 1.0.7 available", "apple"), state: "Live", tone: "success",
        detail: "The **iPhone Duo** update, the loading optimizations and the widgets appear in the release notes of the public Apple listing.",
        cta: { label: "Discover Focus Train on the App Store", url: apps.apple },
      },
      {
        title: "The V3 screenshots give a first signal", state: "To confirm", tone: "measure",
        detail: "The Apple snapshot goes from **32.47% to 47.03%**. Data collection was still in progress; the lasting effect and that of the new content remain to be measured.",
      },
      {
        title: appLink("Google Play: tracking the V3 rollout", "google"), state: "To verify", tone: "measure",
        detail: "The upload was triggered. **The old screenshots are still visible on the French listing** at the October 31 check.",
      },
      {
        title: "Bringing users back", state: "November priority", tone: "attention",
        detail: "The **420 tracked sign-ups** confirm the start of acquisition. The **low retention** calls for work on the first trip, drop-offs and resuming a session.",
      },
    ],
    nextMonth: {
      title: "November: visibility and coming back to the app.",
      goals: [
        "**All-in on communication**: test short formats and identify the ones that bring **sign-ups**.",
        "**Measure ASO and SEO**, then compare screenshots and channels over consistent periods.",
        "**Improve the first trip and the return to the app**: examine drop-offs and follow the **D1 / D7** cohorts.",
      ],
      personalChallenges: [
        "**1 tweet a day** to share progress.",
        "**1 long-form YouTube video** over the month.",
        "**At least 1 video or 1 carousel a day**. **Automation to explore** to keep up the pace.",
      ],
      target: {
        title: "Focus Train goal · November",
        value: "1,000",
        label: "account creations",
        detail: `**In total in November**, across ${appLink("**iOS / App Store**", "apple")} and ${appLink("**Android / Google Play**", "google")}.`,
      },
    },
  },
};
