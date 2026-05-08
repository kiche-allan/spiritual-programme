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
