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
  {
    id: 8,
    slug: "trust-covenant-christ",
    title: "Trust, Covenant & Christ",
    subtitle: "Week Eight",
    heroVerse: "Hezekiah received the letter from the messengers and read it. Then he went up to the temple of the Lord and spread it out before the Lord.",
    heroRef: "Isaiah 37:14",
    publishedAt: "2026-05-11",
    totalDays: 7,
    accentColor: "#2C3E5A",
    themes: [
      { label: "Crisis & Trust", days: "Mon–Tue", color: "#2C3E5A" },
      { label: "Providence & Hesed", days: "Wed–Thu", color: "#2E6B50" },
      { label: "Prayer & Intercession", days: "Fri", color: "#7A1A1A" },
      { label: "Waiting & Hope", days: "Sat–Sun", color: "#BF8B3A" },
    ],
    description:
      "Four biblical witnesses to God's faithfulness: Hezekiah in crisis, Ruth in provision, Daniel in prayer, and Simeon & Anna in waiting — all pointing to the hope of Christ's return.",
  },
  {
  id: 9,
  slug: "purpose-esther-samaritan-job",
  title: "Created on Purpose, for a Purpose",
  subtitle: "Week Nine",
  heroVerse: "Before I formed you in the womb I knew you, before you were born I set you apart.",
  heroRef: "Jeremiah 1:5",
  publishedAt: "2026-05-18",
  totalDays: 7,
  accentColor: "#1A3A6E",
  themes: [
    { label: "Purpose Precedes Creation", days: "Mon",      color: "#1A3A6E" },
    { label: "The Good Samaritan",        days: "Tue–Wed",  color: "#2E6B50" },
    { label: "Job and Suffering",         days: "Thu & Sat",color: "#7A1A1A" },
    { label: "Esther",                    days: "Fri",      color: "#5A2D82" },
    { label: "Living Your Purpose",       days: "Sun",      color: "#1A3A6E" },
  ],
  description: "Myles Munroe's five principles of purpose woven through the stories of the Good Samaritan, Job, and Esther — created on purpose, for a purpose, to serve a purpose that will outlast you.",
},
  {
    id: 10,
    slug: "prayer-submission-trust-holy-living",
    title: "Prayer, Submission, Trust & Holy Living",
    subtitle: "Week Ten",
    heroVerse: "Yet not my will, but yours be done.",
    heroRef: "Luke 22:42",
    publishedAt: "2026-05-25",
    totalDays: 7,
    accentColor: "#2C3E5A",
    themes: [
      { label: "Submission",    days: "Mon",     color: "#2C3E5A" },
      { label: "Trust & Hope",  days: "Tue–Wed", color: "#2C3E5A" },
      { label: "Prayer",        days: "Thu–Fri", color: "#8A2040" },
      { label: "Holy Living",   days: "Sat",     color: "#2E6B50" },
      { label: "Maranatha",     days: "Sun",     color: "#5A2D82" },
    ],
    description: "The disciplines that shape a life oriented toward the coming King — submission in Gethsemane, trust in the waiting, patience in the refusal, prayer that moves heaven, and holy living as expectation made visible.",
  },
  {
    id: 11,
    slug: "community-spiritual-warfare-great-commission",
    title: "Community, Warfare & the Great Commission",
    subtitle: "Week Eleven",
    heroVerse: "As the Father has sent me, I am sending you.",
    heroRef: "John 20:21",
    publishedAt: "2026-06-01",
    totalDays: 7,
    accentColor: "#1A3A6E",
    themes: [
      { label: "Community",          days: "Mon–Tue", color: "#1A3A6E" },
      { label: "Spiritual Warfare",  days: "Wed–Thu", color: "#7A1A1A" },
      { label: "Great Commission",   days: "Fri–Sat", color: "#2E6B50" },
      { label: "The Sent Life",      days: "Sun",     color: "#5A2D82" },
    ],
    description: "Eleven weeks of inward formation culminating in the outward sending — equipped in community, armoured for battle, and commissioned to go.",
  },
  {
    id: 12,
    slug: "hell-faithfulness-holy-spirit-salvation-holiness",
    title: "Hell, Faithfulness, the Spirit & Salvation",
    subtitle: "Week Twelve",
    heroVerse: "Come near to God and he will come near to you.",
    heroRef: "James 4:8",
    publishedAt: "2026-06-08",
    totalDays: 7,
    accentColor: "#7A1A1A",
    themes: [
      { label: "The Dread of Hell",    days: "Mon–Tue", color: "#7A1A1A" },
      { label: "God's Faithfulness",   days: "Wed–Thu", color: "#2C3E5A" },
      { label: "The Holy Spirit",      days: "Fri",     color: "#2E6B50" },
      { label: "Salvation & Holiness", days: "Sat",     color: "#BF8B3A" },
      { label: "Leaning Toward God",   days: "Sun",     color: "#5A2D82" },
    ],
    description: "The stakes of eternity, the faithfulness of God in crisis, the person of the Holy Spirit, the full architecture of salvation, and the daily posture of a life leaning toward God.",
  },
  {
  id: 13,
  slug: "faith-tongue-humility-cross-holiness",
  title: "Faith, the Tongue, Humility, the Cross & Holiness",
  subtitle: "Week Thirteen",
  heroVerse: "Let perseverance finish its work so that you may be mature and complete, not lacking anything.",
  heroRef: "James 1:4",
  publishedAt: "2026-06-15",
  totalDays: 7,
  accentColor: "#1A3A6E",
  themes: [
    { label: "Steady-State Faith",     days: "Mon–Tue", color: "#1A3A6E" },
    { label: "The Tongue & Heart",     days: "Wed–Thu", color: "#8A2040" },
    { label: "The Cross Applied",      days: "Fri",     color: "#5A2D82" },
    { label: "Prayer & Holiness",      days: "Sat",     color: "#2E6B50" },
    { label: "The Integrated Life",    days: "Sun",     color: "#1A3A6E" },
  ],
  description: "Faith that builds in the comfortable season, a tongue and heart brought under the lordship of Christ, the cross applied to specific broken relationships, and a lifestyle of prayer and holiness that looks the same on the good days and the hard ones.",
},
{
  id: 14,
  slug: "crisis-waiting-trusting-the-unseen-god",
  title: "Hope, Waiting & Trusting the Unseen God",
  subtitle: "Week Fourteen",
  heroVerse: "I wait for the Lord, my whole being waits, and in his word I put my hope.",
  heroRef: "Psalm 130:5",
  publishedAt: "2026-06-22",
  totalDays: 7,
  accentColor: "#2C3E5A",
  themes: [
    { label: "Naming the Crisis",      days: "Mon–Tue", color: "#2C3E5A" },
    { label: "When Faith Falters",     days: "Wed",     color: "#7A1A1A" },
    { label: "The Theology of Waiting",days: "Thu",     color: "#2E6B50" },
    { label: "The Reward of Waiting",  days: "Fri",     color: "#BF8B3A" },
    { label: "Trusting the Unseen",    days: "Sat",     color: "#5A2D82" },
    { label: "The Integrated Life",    days: "Sun",     color: "#1A3A6E" },
  ],
  description: "For those battling crisis in health, family, work, marriage and need — and for those whose faith is faltering from waiting too long. A week on what it means to wait on the Lord, the reward of faithful waiting, and trusting the God you cannot see.",
},

{
  id: 15,
  slug: "grace-peace-identity-faith-fruit-forgiveness",
  title: "Grace, Peace, Identity, Faith, Fruit & Forgiveness",
  subtitle: "Week Fifteen",
  heroVerse: "I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit.",
  heroRef: "John 15:5",
  publishedAt: "2026-06-29",
  totalDays: 7,
  accentColor: "#5A2D82",
  themes: [
    { label: "Grace & Love",       days: "Mon", color: "#5A2D82" },
    { label: "Peace in Anxiety",   days: "Tue", color: "#2C3E5A" },
    { label: "Identity & Purpose", days: "Wed", color: "#BF8B3A" },
    { label: "Faith, Not Fear",    days: "Thu", color: "#7A1A1A" },
    { label: "Fruit of the Spirit",days: "Fri", color: "#2E6B50" },
    { label: "Forgiveness",        days: "Sat", color: "#8A2040" },
    { label: "Abiding",            days: "Sun", color: "#1A3A6E" },
  ],
  description: "A week tracing one continuous thread — grace as the foundation, and peace, identity, faith, fruit, and forgiveness as its natural expressions, all rooted in abiding in Christ.",
},
{
  id: 16,
  slug: "knowing-god-prince-of-peace-lords-supper-well-hezekiah",
  title: "Knowing God, Prince of Peace & Three Encounters",
  subtitle: "Week Sixteen",
  heroVerse: "I no longer call you servants. Instead, I have called you friends.",
  heroRef: "John 15:15",
  publishedAt: "2026-07-06",
  totalDays: 7,
  accentColor: "#5A2D82",
  themes: [
    { label: "Knowing God",         days: "Mon–Tue", color: "#5A2D82" },
    { label: "Prince of Peace",     days: "Wed",     color: "#1A3A6E" },
    { label: "The Lord's Supper",   days: "Thu",     color: "#8A2040" },
    { label: "Woman at the Well",   days: "Fri",     color: "#2E6B50" },
    { label: "Hezekiah's Prayer",   days: "Sat",     color: "#BF8B3A" },
    { label: "The Integrated Life", days: "Sun",     color: "#2C3E5A" },
  ],
  description: "Five encounters with the same Person — at the garden, at the storm, at the table, at the well, and at the wall — and the one thread running through all of them: a God who is present, specific, and genuinely knowable.",
},
{
  id: 17,
  slug: "enthroned-still-golden-rule-handle-blind-man-silence-anchored",
  title: "Enthroned, Still, the Golden Rule & the Anchored Life",
  subtitle: "Week Seventeen",
  heroVerse: "We have this hope as an anchor for the soul, firm and secure.",
  heroRef: "Hebrews 6:19",
  publishedAt: "2026-07-13",
  totalDays: 7,
  accentColor: "#1A3A6E",
  themes: [
    { label: "God Enthroned",       days: "Mon", color: "#1A3A6E" },
    { label: "Be Still",            days: "Tue", color: "#2C3E5A" },
    { label: "Do Unto Others",      days: "Wed", color: "#2E6B50" },
    { label: "More Than You Can Handle", days: "Thu", color: "#7A1A1A" },
    { label: "The Blind Man",       days: "Fri", color: "#5A2D82" },
    { label: "The Silence of God",  days: "Sat", color: "#8A2040" },
    { label: "Anchored",            days: "Sun", color: "#2E6B50" },
  ],
  description: "Seven truths for the person whose world is shaking — the enthroned God, the holy stillness, the golden rule, the more than you can handle, the blind man's persistent faith, the silence of God, and the anchor that holds through all of it.",
},

{
  id: 18,
  slug: "faithfulness-prayer-possibility-waiting-thanksgiving-ruth-fasting",
  title: "Faithfulness, Prayer, Possibility & Ruth",
  subtitle: "Week Eighteen",
  heroVerse: "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.",
  heroRef: "Lamentations 3:22–23",
  publishedAt: "2026-07-20",
  totalDays: 7,
  accentColor: "#1A3A6E",
  themes: [
    { label: "Great Is Thy Faithfulness", days: "Mon", color: "#1A3A6E" },
    { label: "Pray, Not Worry",           days: "Tue", color: "#2C3E5A" },
    { label: "You Are a Possibility",     days: "Wed", color: "#2E6B50" },
    { label: "Faithful in Waiting",       days: "Thu", color: "#BF8B3A" },
    { label: "Thanksgiving",              days: "Fri", color: "#5A2D82" },
    { label: "Ruth",                      days: "Sat", color: "#8A2040" },
    { label: "Prayer and Fasting",        days: "Sun", color: "#7A1A1A" },
  ],
  description: "Seven themes rooted in one truth — the faithfulness of a God whose character never changes — explored through prayer, possibility, waiting, thanksgiving, covenant love, and the disciplines that sustain everything.",
},

{
  id: 19,
  slug: "holiness-hiddenness-glory-cruciformity-intercession-theosis-eschaton",
  title: "Holiness, Glory, the Cross & the New Creation",
  subtitle: "Week Nineteen",
  heroVerse: "He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away.",
  heroRef: "Revelation 21:4",
  publishedAt: "2026-07-27",
  totalDays: 7,
  accentColor: "#7A1A1A",
  themes: [
    { label: "Holiness of God",       days: "Mon", color: "#7A1A1A" },
    { label: "Hiddenness of God",     days: "Tue", color: "#2C3E5A" },
    { label: "Weight of Glory",       days: "Wed", color: "#BF8B3A" },
    { label: "Cruciformity",          days: "Thu", color: "#5A2D82" },
    { label: "Intercession of Christ",days: "Fri", color: "#2E6B50" },
    { label: "Theosis",               days: "Sat", color: "#1A3A6E" },
    { label: "Eschatological Hope",   days: "Sun", color: "#8A2040" },
  ],
  description: "Seven of the deepest theological truths available to the Christian life — the holiness that restores awe, the hiddenness that produces depth, the glory that gives weight to the present, the cross that shapes everything, the intercession that never stops, the theosis that is the destination, and the new creation that is coming.",
},

{
  id: 20,
  slug: "el-roi-nothing-wasted-goodness-names-prodigal-surrender-benediction",
  title: "El Roi, Nothing Wasted & the Prodigal Father",
  subtitle: "Week Twenty",
  heroVerse: "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord turn his face toward you and give you peace.",
  heroRef: "Numbers 6:24–26",
  publishedAt: "2026-08-03",
  totalDays: 7,
  accentColor: "#2E6B50",
  themes: [
    { label: "El Roi",             days: "Mon", color: "#2E6B50" },
    { label: "Nothing Wasted",     days: "Tue", color: "#1A3A6E" },
    { label: "Goodness of God",    days: "Wed", color: "#BF8B3A" },
    { label: "Names of God",       days: "Thu", color: "#5A2D82" },
    { label: "Prodigal Father",    days: "Fri", color: "#8A2040" },
    { label: "Surrender",          days: "Sat", color: "#2C3E5A" },
    { label: "The Benediction",    days: "Sun", color: "#2E6B50" },
  ],
  description: "Seven truths about the God who sees the overlooked, wastes nothing, is unconditionally good, has a name for every crisis, runs toward the returning, receives surrender with grace, and sends His people into the week with His face turned toward them.",
},

{
  id: 21,
  slug: "fear-sovereignty-lament-new-creation-spirit-suffering-maranatha",
  title: "Fear, Sovereignty, Lament & Maranatha",
  subtitle: "Week Twenty-One",
  heroVerse: "He who testifies to these things says, 'Yes, I am coming soon.' Amen. Come, Lord Jesus.",
  heroRef: "Revelation 22:20",
  publishedAt: "2026-08-10",
  totalDays: 7,
  accentColor: "#7A1A1A",
  themes: [
    { label: "Fear of the Lord",      days: "Mon", color: "#7A1A1A" },
    { label: "Sovereignty of God",    days: "Tue", color: "#1A3A6E" },
    { label: "Lament",                days: "Wed", color: "#2C3E5A" },
    { label: "New Creation",          days: "Thu", color: "#2E6B50" },
    { label: "Holy Spirit",           days: "Fri", color: "#5A2D82" },
    { label: "Suffering and Glory",   days: "Sat", color: "#8A2040" },
    { label: "Maranatha",             days: "Sun", color: "#BF8B3A" },
  ],
  description: "Seven of the deepest and most practically urgent truths in the Christian life — the awe that is the beginning of everything, the sovereignty that governs all things, the lament the church forgot, the new creation identity, the Spirit's communion, the inseparable pair of suffering and glory, and the blessed hope of His return.",
},

{
  id: 22,
  slug: "garden-blood-wilderness-righteousness-tongue-discipleship-emmaus",
  title: "The Garden, the Blood, the Wilderness & Emmaus",
  subtitle: "Week Twenty-Two",
  heroVerse: "Were not our hearts burning within us while he talked with us on the road and opened the Scriptures to us?",
  heroRef: "Luke 24:32",
  publishedAt: "2026-08-17",
  totalDays: 7,
  accentColor: "#2E6B50",
  themes: [
    { label: "Garden to Glory",        days: "Mon", color: "#2E6B50" },
    { label: "Blood of the Covenant",  days: "Tue", color: "#7A1A1A" },
    { label: "The Wilderness",         days: "Wed", color: "#BF8B3A" },
    { label: "Righteousness",          days: "Thu", color: "#5A2D82" },
    { label: "Power of the Tongue",    days: "Fri", color: "#8A2040" },
    { label: "Discipleship",           days: "Sat", color: "#1A3A6E" },
    { label: "Table and the Road",     days: "Sun", color: "#2C3E5A" },
  ],
  description: "From the garden of Eden to the road to Emmaus — one week tracing the full arc of the Christian life through the blood that accomplished everything, the wilderness that prepares everything, the righteousness that secures everything, the tongue that expresses everything, and the discipleship that costs everything.",
},

{
  id: 23,
  slug: "beatitudes-secret-place-idolatry-resurrection-disciplines-church-amen",
  title: "The Beatitudes, the Secret Place & the Great Amen",
  subtitle: "Week Twenty-Three",
  heroVerse: "For no matter how many promises God has made, they are 'Yes' in Christ. And so through him the 'Amen' is spoken by us to the glory of God.",
  heroRef: "2 Corinthians 1:20",
  publishedAt: "2026-08-24",
  totalDays: 7,
  accentColor: "#2E6B50",
  themes: [
    { label: "The Beatitudes",      days: "Mon", color: "#2E6B50" },
    { label: "The Secret Place",    days: "Tue", color: "#1A3A6E" },
    { label: "Idolatry",            days: "Wed", color: "#7A1A1A" },
    { label: "Resurrection Body",   days: "Thu", color: "#5A2D82" },
    { label: "Spiritual Disciplines",days: "Fri", color: "#BF8B3A" },
    { label: "The Church",          days: "Sat", color: "#8A2040" },
    { label: "The Great Amen",      days: "Sun", color: "#2C3E5A" },
  ],
  description: "Seven dimensions of the fully inhabited Christian life — the upside-down kingdom of the Beatitudes, the hidden life of the secret place, the idols that must be dethroned, the resurrection body that is coming, the disciplines that form the soul, the church that cannot be replaced, and the Great Amen that says yes to all of it with the whole life.",
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
