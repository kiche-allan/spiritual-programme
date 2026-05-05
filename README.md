# Spiritual Programme

A modern, beautifully designed weekly devotional web application built with Next.js. Each week features 7 days of guided spiritual content including scripture, deep revelations, morning prayers, and daily practices.

## Features

- 📖 **Weekly Devotional Content** – Structured 7-day spiritual programmes with themes, scripture references, and guided practices
- 🎨 **Beautiful UI** – Responsive design with elegant typography and customizable accent colors per week
- 📊 **Progress Tracking** – Track your daily completion across all weeks with persistent local storage
- 🔗 **Share & Subscribe** – Built-in sharing functionality and email subscription support
- ⚡ **Type-Safe** – Full TypeScript support with strict typing for content structure
- 📱 **Mobile-Friendly** – Optimized for all screen sizes with Tailwind CSS

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 14.2.5
- **UI Library**: React 18
- **Styling**: Tailwind CSS 3.4.1
- **Type System**: TypeScript 5
- **Icons**: Lucide React
- **Fonts**: Cormorant Garamond (serif typography)

## Project Structure

```
spiritual-programme7/
├── app/
│   ├── layout.tsx              # Root layout with styles & fonts
│   ├── page.tsx                # Landing page (all weeks overview)
│   ├── globals.css             # Global styles & CSS variables
│   └── week/
│       └── [id]/
│           └── page.tsx        # Individual week detail page
├── components/
│   ├── Navbar.tsx              # Navigation component
│   └── ShareButton.tsx         # Share functionality
├── lib/
│   ├── weeks.ts                # Week metadata registry & progress tracking
│   └── content/
│       ├── types.ts            # TypeScript interfaces for content
│       ├── index.ts            # Content registry (maps week ID → content)
│       ├── week-1.ts           # Week 1 content (example)
│       ├── week-6.ts           # Week 6 content (example)
│       └── week-7.ts           # Week 7 content (example)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
└── postcss.config.mjs
```

## Content Structure

Each day includes:

- **Scripture** – Anchor verses with references
- **Theme** – Daily focus area (e.g., "Confidence & Strength")
- **Revelation** – Deep spiritual insights (multi-paragraph)
- **Prayer** – Guided morning prayer (multi-paragraph)
- **Practices** – 4 actionable daily practices
- **Visual Theming** – Custom accent color and background for each week

## Getting Started

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd spiritual-programme7

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Adding a New Week

The content system is designed to make adding new weeks simple and automatic:

### 1. Create the Week Content File

Create a new file `lib/content/week-N.ts` (copy `week-6.ts` or `week-7.ts` as a template):

```typescript
import { DayContent } from "./types";

const week2: DayContent[] = [
  {
    num: 1,
    abbr: "Mon",
    name: "Monday",
    title: "Your Day Title",
    theme: "The day's spiritual theme",
    accent: "#HEX_COLOR",
    bg: "#LIGHT_HEX_COLOR",
    verses: [
      {
        label: "Main Verse",
        text: "Full verse text here",
        ref: "Book Chapter:Verse",
      },
    ],
    revelation: ["First paragraph of revelation...", "Second paragraph..."],
    prayers: ["First paragraph of prayer...", "Second paragraph..."],
    amen: "Amen.",
    practices: ["Practice 1", "Practice 2", "Practice 3", "Practice 4"],
  },
  // ... repeat for days 2–7
];

export default week2;
```

### 2. Import and Register Content

Edit `lib/content/index.ts`:

```typescript
import week2 from "./week-2";

const CONTENT_REGISTRY: Record<number, DayContent[]> = {
  1: week1,
  2: week2, // ← Add this
  6: week6,
  7: week7,
};
```

### 3. Add Week Metadata

Edit `lib/weeks.ts` and add an entry to `WEEKS_META`:

```typescript
{
  id: 2,
  slug: "week-two-slug",
  title: "Week Two Title",
  subtitle: "Week Two",
  heroVerse: "Full verse text here",
  heroRef: "Book Chapter:Verse",
  publishedAt: "2026-04-06",
  totalDays: 7,
  accentColor: "#HEX_COLOR",
  themes: [
    { label: "Theme 1", days: "Mon–Tue", color: "#HEX_COLOR" },
    { label: "Theme 2", days: "Wed–Fri", color: "#HEX_COLOR" },
    { label: "Theme 3", days: "Sat–Sun", color: "#HEX_COLOR" },
  ],
  description: "1–2 sentence summary of the week's focus.",
}
```

**That's it!** The landing page and week pages automatically pick up the new content.

## Key Features

### Progress Tracking

- Users can mark days as complete
- Progress is stored in browser localStorage
- Week completion percentage displayed on landing page

### CSS Variables

Global theme customization via CSS variables in `globals.css`:

- `--hero` – Hero section background
- `--hero-t` – Hero text color
- `--hero-a` – Hero accent color

### Responsive Design

- Mobile-first approach with `clamp()` for fluid typography
- Touch-friendly interface
- Optimized images and animations

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled for full functionality

## License

[Add your license here]

## Contributing

[Add contribution guidelines here]

---

**Last Updated**: May 2026
