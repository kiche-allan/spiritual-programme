// lib/content/registry.ts
// Synchronous registry for server-side rendering
// This keeps all imports static so getWeekContent is synchronous

import type { DayContent } from "./types";
import week1 from "./week-1";
import week2 from "./week-2";
import week3 from "./week-3";
import week4 from "./week-4";
import week5 from "./week-5";
import week6 from "./week-6";
import week7 from "./week-7";
import week_8 from "./week-8";
import week_9 from "./week-9";
import week_10 from "./week-10";
import week_11 from "./week-11";
import week_12 from "./week-12";
import week13 from "./week-13";
import week14 from "./week-14";
import week15 from "./week-15";


const CONTENT_REGISTRY: Record<number, DayContent[]> = {
  1: week1,
  2: week2,
  3: week3,
  4: week4,
  5: week5,
  6: week6,
  7: week7,
  8: week_8,
  9: week_9,
  10: week_10,
  11: week_11,
  12: week_12,
  13: week13,
  14: week14,
  15: week15,
};

export function getWeekContent(weekId: number): DayContent[] | null {
  return CONTENT_REGISTRY[weekId] ?? null;
}
