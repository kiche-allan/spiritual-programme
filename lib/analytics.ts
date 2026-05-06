// lib/analytics.ts
import { type ProgressStore } from "@/lib/weeks";
import { WEEKS_META } from "@/lib/weeks";

export interface WeekStats {
  weekId: number;
  title: string;
  subtitle: string;
  totalDays: number;
  completedDays: number;
  completionRate: number;   // 0–100
  accentColor: string;
}

export interface DayStats {
  dayNum: number;
  dayName: string;
  timesCompleted: number;   // across all weeks
}

export interface StreakStats {
  current: number;          // current consecutive days streak
  longest: number;          // all-time longest streak
  totalDaysRead: number;
  totalWeeksStarted: number;
  totalWeeksCompleted: number;
}

// ── Week-level stats ─────────────────────────────────────────────────────────

export function getWeekStats(store: ProgressStore): WeekStats[] {
  return WEEKS_META.map((meta) => {
    const weekData = store[String(meta.id)] ?? {};
    const completedDays = Object.values(weekData).filter(Boolean).length;
    return {
      weekId: meta.id,
      title: meta.title,
      subtitle: meta.subtitle,
      totalDays: meta.totalDays,
      completedDays,
      completionRate: meta.totalDays > 0
        ? Math.round((completedDays / meta.totalDays) * 100)
        : 0,
      accentColor: meta.accentColor,
    };
  });
}

// ── Day-of-week stats ────────────────────────────────────────────────────────

const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function getDayStats(store: ProgressStore): DayStats[] {
  // Count how many times each day number (1–7) has been completed across all weeks
  const counts: Record<number, number> = { 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0 };

  for (const weekData of Object.values(store)) {
    for (const [dayNum, done] of Object.entries(weekData)) {
      if (done && counts[Number(dayNum)] !== undefined) {
        counts[Number(dayNum)]++;
      }
    }
  }

  return Object.entries(counts).map(([dayNum, timesCompleted]) => ({
    dayNum: Number(dayNum),
    dayName: DAY_NAMES[Number(dayNum) - 1],
    timesCompleted,
  }));
}

// ── Streak stats ─────────────────────────────────────────────────────────────

export function getStreakStats(store: ProgressStore): StreakStats {
  const totalDaysRead = Object.values(store).reduce(
    (sum, week) => sum + Object.values(week).filter(Boolean).length,
    0
  );

  const totalWeeksStarted = Object.values(store).filter(
    (week) => Object.values(week).some(Boolean)
  ).length;

  const totalWeeksCompleted = WEEKS_META.filter((meta) => {
    const week = store[String(meta.id)] ?? {};
    return Object.values(week).filter(Boolean).length === meta.totalDays;
  }).length;

  // Build a flat ordered list of [weekId, dayNum] pairs that are complete,
  // in the order they appear (week 1 day 1 → week 1 day 7 → week 2 day 1 ...)
  const sortedWeeks = [...WEEKS_META].sort((a, b) => a.id - b.id);
  const sequence: boolean[] = [];

  for (const meta of sortedWeeks) {
    for (let d = 1; d <= meta.totalDays; d++) {
      sequence.push(!!(store[String(meta.id)]?.[String(d)]));
    }
  }

  // Calculate current streak (from the end of the sequence)
  let current = 0;
  for (let i = sequence.length - 1; i >= 0; i--) {
    if (sequence[i]) current++;
    else break;
  }

  // Calculate longest streak
  let longest = 0;
  let running = 0;
  for (const done of sequence) {
    if (done) {
      running++;
      longest = Math.max(longest, running);
    } else {
      running = 0;
    }
  }

  return { current, longest, totalDaysRead, totalWeeksStarted, totalWeeksCompleted };
}
