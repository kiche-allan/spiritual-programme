// lib/content/index.ts
import type { DayContent } from "./types";

const WEEK_LOADERS: Record<number, () => Promise<{ default: DayContent[] }>> = {
  1: () => import("./week-1"),
  2: () => import("./week-2"),
  3: () => import("./week-3"),
  4: () => import("./week-4"),
  5: () => import("./week-5"),
  6: () => import("./week-6"),
  7: () => import("./week-7"),
};

export async function getWeekContentAsync(weekId: number): Promise<DayContent[] | null> {
  const loader = WEEK_LOADERS[weekId];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}

// Synchronous version still works for server-side rendering
export { getWeekContent } from "./registry";
export type { DayContent };