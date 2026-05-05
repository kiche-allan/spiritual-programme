// ─────────────────────────────────────────────────────────────────────────────
// CONTENT REGISTRY
// This is the only file you touch when adding a new week.
//
// ADDING A NEW WEEK:
//   1. Create:  lib/content/week-N.ts   (copy week-6.ts as your template)
//   2. Import it below and add it to the registry
//   3. Add the metadata entry to lib/weeks.ts  (WEEKS_META array)
//   Done. The landing page and week page both pick it up automatically.
// ─────────────────────────────────────────────────────────────────────────────

import type { DayContent } from "./types";

// ── Import each week's content
import week1 from "./week-1";
import week2 from "./week-2";  
import week3 from "./week-3";
import week4 from "./week-4";
import week5 from "./week-5";
import week6 from "./week-6";
import week7 from "./week-7";


// ── Registry: maps week ID → day content array
const CONTENT_REGISTRY: Record<number, DayContent[]> = {
  1: week1,
  2: week2,
  3: week3,
  4: week4,
  5: week5,
  6: week6,
  7: week7,
};

export function getWeekContent(weekId: number): DayContent[] | null {
  return CONTENT_REGISTRY[weekId] ?? null;
}

export type { DayContent };
