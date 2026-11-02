import type { JournalMedia, ProjectJournal } from "../project-journal";

const pochaApps = {
  web: "https://www.pomocha.io/",
  apple: "https://apps.apple.com/fr/app/pocha-minuteur-pomodoro/id6802377633",
  google: "https://play.google.com/store/apps/details?id=com.pocha.android",
};
const appLink = (label: string, platform: keyof typeof pochaApps) => `[${label}](${pochaApps[platform]})`;

const base = "/pocha/blog/october-2026";
const photo = (name: string, width: number, height: number, alt: string, caption: string, fullWidth = false): JournalMedia => ({ src: `${base}/${name}.webp`, width, height, alt, caption, ...(fullWidth ? { fullWidth: true } : {}) });

export const pochaOctober2026En: ProjectJournal = {
  project: "pocha",
  projectName: "Pocha",
  issue: 1,
  cover: photo("cover", 1400, 955, "Pocha app mockups and user flows", ""),
  hero: [
    photo("mobile-streak", 800, 1732, "The Pocha streak calendar", ""),
    photo("mobile-home", 800, 1732, "The Pocha home screen and its companion", ""),
    photo("mobile-stats", 800, 1732, "The Pocha focus statistics", ""),
  ],
  heroCaption: "One companion, several ways to focus.",
  platforms: [
    { label: "iOS", url: pochaApps.apple },
    { label: "Android", url: pochaApps.google },
    { label: "Mac", url: pochaApps.apple },
    { label: "Web", url: pochaApps.web },
  ],
  icon: `${base}/icon.webp`,
  metrics: {
    stats: [
      { value: "7", label: "tracked sign-ups", period: "Since October 10" },
      { value: "26", label: "sessions started", period: "October 1–30" },
      { value: "14", label: "sessions completed", period: "October 1–30" },
    ],
    observation: "Tracking is starting to give some reference points. The **volume is still too low** to draw conclusions about the effect of the changes.",
    source: "PostHog, iOS + Android, production. Snapshot taken on October 31, 2026 from the Phenomenals dashboard. The 7 sign-ups are the cumulative total observed since the first tracked sign-up on October 10. Sessions cover full days from October 1 to 30, in UTC. Partial coverage: accounts created before tracking and events that were not received are missing. These figures are not downloads.",
  },
  slug: "october-2026",
  month: "October 2026",
  published: "2026-10-31",
  description: `${appLink("**iOS**", "apple")} and ${appLink("**Android**", "google")} made more reliable, ${appLink("**Mac version available**", "apple")}, ${appLink("**web redesign**", "web")} and **new store visuals**. Pocha's build journal, week by week.`,
  overview: `The month started by making ${appLink("**iOS**", "apple")} and ${appLink("**Android**", "google")} more **reliable**, then expanded to the launch of ${appLink("**Pocha for Mac**", "apple")} and the ${appLink("**web redesign**", "web")}. In parallel, the **store screenshots** and **communication formats** were reworked to present the product better.`,
  weeks: [
    {
      id: "week-1", dates: "October 1–7", title: "Redesigning the Streak / Freezes page.", tags: ["Login", "Onboarding", "Premium"],
      entries: [{ period: "Work from October 1 to 8", title: "From login to the first session", changes: [
        "Improved **Google sign-in** and **onboarding**.",
        "**Streak / Freezes** page reworked, **widgets** improved.",
        "**Premium subscription** presentation revised.",
      ], why: "Make getting started, progression and the Premium offer easier to understand." }],
      feature: {
        summary: "The **streak calendar**, **Freezes** and **consistency** views make progress easier to read day to day.",
        media: [
          photo("mobile-streak", 800, 1732, "Pocha streak calendar showing the number of available Freezes", "Streak and available Freezes."),
          photo("mobile-consistency", 800, 1732, "Pocha consistency view showing session progress", "Consistency at a glance."),
          photo("mobile-year", 800, 1732, "Pocha yearly focus calendar", "Tracking across the year."),
        ],
      },
      media: [
        photo("onboarding-start", 800, 1778, "Start of the Pocha Android onboarding: discover the product or sign in", `${appLink("Android onboarding", "google")} · the entry point.`),
        photo("onboarding-goal", 800, 1778, "Choosing a focus goal in the Pocha Android onboarding", `${appLink("Android onboarding", "google")} · choosing a goal.`),
        photo("onboarding-mascot", 800, 1778, "Meeting the companion during the Pocha Android onboarding", `${appLink("Android onboarding", "google")} · meeting the companion.`),
        photo("mobile-widget", 800, 1732, "Pocha iOS widget showing sessions, streak and Freezes", `The widget on the ${appLink("iOS", "apple")} home screen.`),
        photo("mobile-home", 800, 1732, "Pocha mobile home screen with the mascot and session start", "The app's home screen."),
        { src: "/pocha/complete-flow-poster.jpg", width: 792, height: 1548, alt: "Demo of the Pocha mobile flow", caption: "The mobile flow · video.", video: "/pocha/complete-flow.mp4" },
      ],
    },
    {
      id: "week-2", dates: "October 8–14", title: "Redesigning statistics and the community.", tags: ["RevenueCat", "Statistics", "Content"],
      entries: [
        { period: "October 8–13", title: "Subscriptions and daily flows", changes: [
          "**RevenueCat** integrated. **Notifications** and **repeated rewards** fixed.",
          "**Statistics**, **profiles**, **community** and **leaderboards** redesigned.",
          `Changes adapted on ${appLink("**Android**", "google")} and **Apple sign-in** repaired.`,
        ], why: "Make subscriptions and rewards more reliable, and make progress easier to read." },
        { period: "Work from October 9–20 and October 12–17", title: "Real screenshots, short formats", changes: [
          "**Marketing site** enriched with **real screenshots**, a **video demo**, an **animated gallery** and download links.",
          "**Promotional videos** and several carousel series created, including **14 Pocha carousels: 70 slides**.",
          "Carousels iterated: **dominant photo**, **full and legible app screenshot**, call to join your friends at the end of the sequence.",
        ], why: "Show how the product is used and what its screens look like before asking for a download." },
      ],
      feature: {
        summary: "**Statistics**, the **community feed** and **friend leaderboards** are redesigned to make tracking and sharing progress easier.",
        media: [
          photo("mobile-stats", 800, 1732, "Pocha focus statistics screen showing trends", "Statistics and trends."),
          photo("mobile-community", 800, 1732, "Pocha community feed with members' posts", "The community feed."),
          photo("mobile-ranking", 800, 1732, "Weekly friends leaderboard in Pocha", "The weekly friends leaderboard."),
        ],
      },
      media: [
        photo("mobile-friends", 800, 1732, "Friends feed in Pocha showing their progress", "The friends feed."),
        photo("mobile-add-friend", 800, 1732, "Add-a-friend interface in Pocha", "The add-a-friend flow."),
        photo("mobile-missions", 800, 1732, "Pocha daily missions and rewards to claim", "Missions and rewards."),
        photo("carousel-02", 600, 1067, "Pocha promotional slide with a study photo and an app screenshot overlaid", "Carousel · photo and full screenshot."),
        { ...photo("promo-poster", 600, 1067, "Preview of the Pocha promotional video", "Promotional video · 21 s."), video: `${base}/pocha-promo.mp4` },
      ],
    },
    {
      id: "week-3", dates: "October 15–21", title: "Building Pocha for Mac.", tags: ["macOS", "Notch", "App Store"],
      entries: [
        { period: "October 15–21", title: "A desktop version", changes: [
          `${appLink("**Pocha for Mac**", "apple")} built: **timer**, **projects**, **statistics** and **community**.`,
          "**Companion** and focus session available near the **notch**.",
          `**84 screenshots** prepared in **14 languages**. ${appLink("**Mac version submitted to Apple**", "apple")}.`,
        ], why: "Support focus sessions on the computer and keep the timer within sight." },
        { period: "End of the marketing-site work · October 9–20", title: "Explaining each platform", changes: [
          `**Three articles published**: ${appLink("**iOS**", "apple")} presentation, ${appLink("**Android**", "google")} presentation and the arrival on ${appLink("**Mac**", "apple")}.`,
          `${appLink("**iPhone and Mac**", "apple")} screenshots brought together on the marketing site, with the **store links**.`,
        ], why: "Let people understand the experience on each device before installing it." },
      ],
      feature: {
        summary: `${appLink("**Pocha for Mac**", "apple")} brings together the timer, projects, statistics and community, with the **companion near the notch**. The version is **approved by Apple** and **available on the Mac App Store**.`,
        media: [
          photo("macbook-focus", 1440, 766, "Pocha for Mac during a focus session with the companion and timer near the notch", `The ${appLink("Mac version", "apple")} and its companion near the notch.`, true),
        ],
      },
      media: [
        photo("mac-projects", 762, 1066, "Projects screen in Pocha for Mac", `Projects on ${appLink("Mac", "apple")}.`),
        photo("mac-statistics", 640, 910, "Focus statistics in Pocha for Mac, in French", `Statistics on ${appLink("Mac", "apple")}.`),
        photo("mac-community", 640, 910, "Community and friends feed in Pocha for Mac, in French", `The community on ${appLink("Mac", "apple")}.`),
        photo("mac-collection", 640, 910, "Rewards collection in Pocha for Mac, in French", "The rewards collection."),
        photo("mac-create-session", 1400, 814, "Creating a focus session in Pocha for Mac", "Creating a session.", true),
        photo("mac-notch", 1200, 784, "Pocha companion and timer displayed in the Mac notch", "The timer as close to the notch as possible.", true),
      ],
    },
    {
      id: "week-4", dates: "October 22–28", title: "Adapting to iPhone Duo formats.", tags: ["Web", "iPhone Duo", "Distribution"],
      entries: [
        { period: "Work from October 21 to 26", title: "A shared identity, the tools kept", changes: [
          `${appLink("**Web version**", "web")} redesigned around the **iOS / Mac identity**.`,
          "**Streaks**, **Freezes**, **missions** and a **translated onboarding** added, while keeping **projects** and **to-do lists**.",
          "**iPhone Duo adaptation**: **closed and open** formats supported.",
        ], why: "Find the same landmarks across devices, without losing the web's work tools." },
        { period: "October 21–26", title: "Widening the discovery points", changes: [
          "**Pinterest assets** created and **directory submissions** made.",
        ], why: "Open new entry points to the app." },
      ],
      feature: {
        summary: "The **iPhone Duo adaptation** reads in three visuals: **closed** format, device **opening** and **open** format.",
        layout: "comparison",
        media: [
          photo("duo-closed", 736, 970, "Pocha on the outer screen of the closed iPhone Duo", "01 · Closed format: outer screen."),
          photo("duo-opening", 1250, 970, "Pocha on the iPhone Duo while the device is opening", "02 · The device opening."),
          photo("duo-open", 1250, 970, "Pocha on the inner screen of the fully open iPhone Duo", "03 · Open format: inner screen.", true),
        ],
      },
      comparisons: [{
        period: "Work from October 21 to 26",
        title: "Web redesign: before / after.",
        description: `${appLink("The web version", "web")} adopts the **iOS / Mac visual landmarks**. The **timer**, **projects** and **to-do list** keep their place in the flow.`,
        beforeLabel: `${appLink("Pomocha", "web")} · first interface`,
        afterLabel: `${appLink("Pocha", "web")} · new web version`,
        before: photo("web-original", 1400, 719, "Former Pomocha interface with the countdown, the projects panel on the left and the focus summary on the right", "Before · countdown and tools spread over three columns."),
        after: photo("web-current", 1400, 713, "New Pocha interface on pomocha.io: side navigation, streak, companion timer and to-do list", "After · companion in the center, streak at the top and to-do list on the right. Screenshot from October 31, 2026."),
        changes: [
          "**Side navigation** to reach projects, statistics, streaks and the community.",
          "**Companion timer** in the center and the **week's streak** visible from the home screen.",
          "**Projects and to-do list kept**, with **daily missions** reachable from the home screen.",
        ],
        source: { url: "https://www.pomocha.io/app", label: "Screenshots on pomocha.io · October 31, 2026" },
      }],
      media: [
        photo("web-streak", 1400, 713, "New Pocha web Streak page with Freezes, the calendar and progression milestones", "Streak and Freezes · the same landmarks as on mobile.", true),
        photo("web-missions", 1400, 713, "Daily missions opened from the home screen of the new Pocha web version", "Daily missions · panel reachable from the home screen.", true),
      ],
    },
    {
      id: "week-5", dates: "October 29–31", title: "Creating the V3 screenshots in 14 languages.", tags: ["V3 screenshots", "Localization", "iOS 1.0.9"],
      entries: [{ period: "Work from October 24 to 31", title: "Visuals, listings and the next version", changes: [
        "**V3 screenshots** created and **store listings** optimized.",
        "**Visuals and videos** prepared in **14 languages**.",
        `${appLink("**iOS 1.0.9**", "apple")} and an **Apple editorial feature pitch** prepared.`,
      ], why: "Present the product more clearly in each language and get ready for the next release." }],
      feature: {
        summary: "A series of **six V3 screenshots** presents the promise and the features. The visuals are adapted into **14 languages** for the store listings.",
        media: [
          photo("store-v3-01", 800, 1739, "Pocha V3 screenshot presenting the promise: turn work into a game", "The promise: turn work into a game."),
          photo("store-v3-02", 800, 1739, "Pocha V3 screenshot presenting distracting app blocking", "Block distracting apps."),
          photo("store-v3-03", 800, 1739, "Pocha V3 screenshot showing the streak calendar and rewards", "Streak, habits and rewards."),
          photo("store-v3-04", 800, 1739, "Pocha V3 screenshot presenting badges and motivational rewards", "Badges and motivation."),
          photo("store-v3-05", 800, 1739, "Pocha V3 screenshot presenting the community feed and progress sharing", "Share your progress with the community."),
          photo("store-v3-06", 800, 1739, "Pocha V3 screenshot showing the widget and habit tracking", "Widget and habit tracking."),
        ],
      },
      media: [
        photo("store-v3-en", 800, 1739, "First Pocha V3 screenshot localized in English", "The English version."),
        photo("store-v3-de", 800, 1739, "First Pocha V3 screenshot localized in German", "The German version."),
        photo("store-v3-jp", 800, 1739, "First Pocha V3 screenshot localized in Japanese", "The Japanese version."),
      ],
    },
  ],
  conclusion: {
    summary: `${appLink("**iOS**", "apple")} and ${appLink("**Android**", "google")} made more reliable, ${appLink("**Pocha for Mac available**", "apple")}, ${appLink("**web redesign live**", "web")} and **visuals adapted into 14 languages**. The next challenge: getting the product known.`,
    takeaways: [
      {
        title: appLink("Pocha for Mac", "apple"), state: "Available", tone: "success",
        detail: "Version **approved by Apple** and available on the **Mac App Store**.",
        cta: { label: "Download Pocha for Mac", url: pochaApps.apple },
      },
      {
        title: appLink("Web redesign", "web"), state: "Impact to measure", tone: "measure",
        detail: "The new interface is **live**. Its **impact on usage remains to be measured**.",
      },
      {
        title: "Traffic is still uneven", state: "To stabilize", tone: "attention",
        detail: "**Traffic is still too irregular** to show a reliable trend.",
      },
    ],
    nextMonth: {
      title: "November: visibility first.",
      goals: [
        "**All-in on communication**: test formats and find the ones that go **viral**.",
        "**Measure how ASO and SEO evolve**: visibility on the stores and search engines.",
      ],
      personalChallenges: [
        "**1 tweet a day**.",
        "**1 long-form YouTube video** over the month.",
        "**At least 1 video or 1 carousel a day**. **Automation to explore** to keep up the pace.",
      ],
      target: {
        title: "Pocha goal · November",
        value: "100",
        label: "account creations",
        detail: `**In total in November**, across the ${appLink("**App Store**", "apple")}, ${appLink("**Google Play**", "google")} and ${appLink("**the web**", "web")}.`,
      },
    },
  },
};
