export interface WeekMeta {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  heroVerse: string;
  heroRef: string;
  publishedAt: string;
  totalDays: number;
  themes: { label: string; days: string; color: string }[];
  accentColor: string;
  description: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// WEEKS REGISTRY
// When you publish a new week, add ONE entry here.
// Fields you need:
//   id          → next number in sequence
//   slug        → kebab-case name (used for the filename)
//   title       → full title shown on the card
//   subtitle    → "Week One", "Week Two", "Easter Week" etc.
//   heroVerse   → the anchor verse text (no quotation marks)
//   heroRef     → e.g. "Isaiah 43:19"
//   publishedAt → "YYYY-MM-DD" — the Monday you publish
//   totalDays   → always 7
//   accentColor → dominant hex colour for the card top bar
//   themes      → 3–4 theme pills shown on the card
//   description → 1–2 sentence summary shown on the card
// ─────────────────────────────────────────────────────────────────────────────

export const WEEKS_META: WeekMeta[] = [
  {
    id: 1,
    slug: "fresh-starts-strength-peace",
    title: "Fresh Starts, Strength & Peace",
    subtitle: "Week One",
    heroVerse: "See, I am doing a new thing! Now it springs up; do you not perceive it?",
    heroRef: "Isaiah 43:19",
    publishedAt: "2026-03-23",
    totalDays: 7,
    accentColor: "#2A4A35",
    themes: [
      { label: "Fresh Starts", days: "Mon–Tue", color: "#2A4A35" },
      { label: "Confidence & Strength", days: "Wed–Thu", color: "#1C3A5E" },
      { label: "Peace & Guidance", days: "Fri–Sun", color: "#854F0B" },
    ],
    description:
      "A week anchored in God's ability to make all things new, the strength that comes from waiting on Him, and the peace that follows surrender.",
  },
  {
    id: 2,
    slug: "fear-of-god-and-purpose",
    title: "The Fear of God & Walking in Purpose",
    subtitle: "Week Two",
    heroVerse: "The fear of the Lord is the beginning of wisdom.",
    heroRef: "Proverbs 9:10",
    publishedAt: "2026-03-30",
    totalDays: 7,
    accentColor: "#4A3170",
    themes: [
      { label: "Fear of the Lord", days: "Mon–Tue", color: "#4A3170" },
      { label: "Known & Called", days: "Wed–Thu", color: "#BF8B3A" },
      { label: "Purpose & Reverence", days: "Fri–Sun", color: "#2E6B6C" },
    ],
    description:
      "Holy awe as the foundation of wisdom, being known by name before time began, and walking in the purpose God prepared in advance.",
  },
  {
    id: 3,
    slug: "confession-repentance-holiness-trust",
    title: "Confession, Repentance, Holy Living & Trust",
    subtitle: "Week Four",
    heroVerse: "If we confess our sins, he is faithful and just and will forgive us.",
    heroRef: "1 John 1:9",
    publishedAt: "2026-04-13",
    totalDays: 7,
    accentColor: "#3A3580",
    themes: [
      { label: "Confession & Repentance", days: "Mon–Tue", color: "#3A3580" },
      { label: "Holy Living", days: "Wed–Thu", color: "#1E6060" },
      { label: "God in the Battle", days: "Fri", color: "#8A5A00" },
      { label: "Trust & Overcoming", days: "Sat–Sun", color: "#BF8B3A" },
    ],
    description:
      "The gift of honest confession, repentance as a complete turning, holiness in the ordinary, and the armour of God for every battle.",
  },
  {
    id: 4,
    slug: "easter-crucifixion-death-resurrection",
    title: "The Cross, The Tomb & The Resurrection",
    subtitle: "Easter Week",
    heroVerse: "He is not here; he has risen, just as he said.",
    heroRef: "Matthew 28:6",
    publishedAt: "2026-04-06",
    totalDays: 7,
    accentColor: "#7A1A1A",
    themes: [
      { label: "The Cross", days: "Mon–Tue", color: "#7A1A1A" },
      { label: "The Tomb", days: "Wed–Thu", color: "#2C3E5A" },
      { label: "The Resurrection", days: "Fri–Sat", color: "#BF8B3A" },
      { label: "Sent as Witnesses", days: "Sun", color: "#2E6B50" },
    ],
    description:
      "Sitting with the full weight of the cross before rushing to Sunday. The descent, the silence of Holy Saturday, and the world-changing reality of resurrection.",
  },
  {
    id: 5,
    slug: "beatitudes-blood-purpose",
    title: "The Beatitudes, The Blood & Walking in Purpose",
    subtitle: "Week Five",
    heroVerse: "Blessed are the poor in spirit, for theirs is the kingdom of heaven.",
    heroRef: "Matthew 5:3",
    publishedAt: "2026-04-20",
    totalDays: 7,
    accentColor: "#1A3A6E",
    themes: [
      { label: "The Beatitudes", days: "Mon–Fri", color: "#1A3A6E" },
      { label: "The Blood of Jesus", days: "Throughout", color: "#7A1A1A" },
      { label: "Walking in Purpose", days: "Sat–Sun", color: "#1E5C3A" },
    ],
    description:
      "The Beatitudes as a portrait of Christ reproduced in us, the blood that makes each quality possible, and the purpose that flows from a transformed life.",
  },
  {
    id: 6,
    slug: "identity-humility-forgiveness-peace",
    title: "Identity, Humility, Forgiveness & Peace",
    subtitle: "Week Six",
    heroVerse: "See what great love the Father has lavished on us, that we should be called children of God.",
    heroRef: "1 John 3:1",
    publishedAt: "2026-04-27",
    totalDays: 7,
    accentColor: "#5A2D82",
    themes: [
      { label: "Identity in Christ", days: "Mon–Tue", color: "#5A2D82" },
      { label: "Cultivating Humility", days: "Wed", color: "#1A6B55" },
      { label: "Forgiveness & Grace", days: "Thu–Fri", color: "#8A2040" },
      { label: "Peace, Joy & Purpose", days: "Sat–Sun", color: "#B8800A" },
    ],
    description:
      "Who you are in Christ as the unshakeable foundation, the freedom of limitation, releasing what you were never meant to carry, and the fruit of a settled heart.",
  },
  {
    id: 7,
    slug: "spiritual-disciplines-obedience",
    title: "Spiritual Disciplines & the Power of Obedience",
    subtitle: "Week Seven",
    heroVerse: "So then, just as you received Christ Jesus as Lord, continue to live your lives in him, rooted and built up in him.",
    heroRef: "Colossians 2:6–7",
    publishedAt: "2026-05-04",
    totalDays: 7,
    accentColor: "#1A3A6E",
    themes: [
      { label: "Bible & Prayer", days: "Mon–Tue", color: "#1A3A6E" },
      { label: "Worship", days: "Wed", color: "#1A3A6E" },
      { label: "Solitude & Fasting", days: "Thu", color: "#2E6B50" },
      { label: "Service & Fellowship", days: "Fri", color: "#2E6B50" },
      { label: "Obedience & Maturity", days: "Sat–Sun", color: "#8A2040" },
    ],
    description:
      "The essential building blocks of a strong Christian salvation — daily Bible reading, prayer and worship, solitude, fasting, service, fellowship, and the transforming power of obedience.",
  },
];

// ─── PROGRESS HELPERS (localStorage — swap for Supabase later) ───────────────

export type ProgressStore = Record<string, Record<string, boolean>>;

export function loadProgress(): ProgressStore {
  if (typeof window === "undefined") return {};
  try { const r = localStorage.getItem("spp_v1"); return r ? JSON.parse(r) : {}; } catch { return {}; }
}
export function saveProgress(store: ProgressStore): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("spp_v1", JSON.stringify(store));
}
export function toggleDay(store: ProgressStore, weekId: number, dayNum: number): ProgressStore {
  const k = String(weekId), d = String(dayNum);
  return { ...store, [k]: { ...(store[k] ?? {}), [d]: !(store[k]?.[d] ?? false) } };
}
export function weekProgress(store: ProgressStore, weekId: number, total: number): number {
  const done = Object.values(store[String(weekId)] ?? {}).filter(Boolean).length;
  return total > 0 ? Math.round((done / total) * 100) : 0;
}
