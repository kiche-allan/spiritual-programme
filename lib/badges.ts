// lib/badges.ts
import { type ProgressStore } from "@/lib/weeks";
import { WEEKS_META } from "@/lib/weeks";
import { getStreakStats } from "@/lib/analytics";

export interface Badge {
  id: string;
  emoji: string;
  title: string;
  description: string;
  earned: boolean;
  earnedAt?: string;   // ISO date string stored in localStorage
}

const BADGE_STORAGE_KEY = "spp_badges_v1";

// Load previously earned badge dates
function loadEarnedDates(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(BADGE_STORAGE_KEY) ?? "{}");
  } catch { return {}; }
}

function saveEarnedDate(badgeId: string): void {
  if (typeof window === "undefined") return;
  const current = loadEarnedDates();
  if (!current[badgeId]) {
    current[badgeId] = new Date().toISOString();
    localStorage.setItem(BADGE_STORAGE_KEY, JSON.stringify(current));
  }
}

export function evaluateBadges(store: ProgressStore): Badge[] {
  const streaks = getStreakStats(store);
  const earnedDates = loadEarnedDates();

  const allDaysRead = Object.values(store).flatMap(
    week => Object.values(week).filter(Boolean)
  ).length;

  const completedWeeks = WEEKS_META.filter(meta => {
    const week = store[String(meta.id)] ?? {};
    return Object.values(week).filter(Boolean).length === meta.totalDays;
  });

  const definitions: Omit<Badge, "earned" | "earnedAt">[] = [
    {
      id: "first_day",
      emoji: "🌱",
      title: "First Step",
      description: "Completed your first day.",
    },
    {
      id: "three_days",
      emoji: "🔥",
      title: "Getting Started",
      description: "Completed 3 days in a row.",
    },
    {
      id: "seven_day_streak",
      emoji: "⚡",
      title: "Full Week",
      description: "Completed 7 consecutive days.",
    },
    {
      id: "first_week_complete",
      emoji: "📖",
      title: "First Week Complete",
      description: "Finished all 7 days of a weekly programme.",
    },
    {
      id: "three_weeks_complete",
      emoji: "🏆",
      title: "Consistent",
      description: "Completed 3 full weeks.",
    },
    {
      id: "all_weeks_complete",
      emoji: "👑",
      title: "Full Journey",
      description: `Completed all ${WEEKS_META.length} published weeks.`,
    },
    {
      id: "fourteen_day_streak",
      emoji: "🌟",
      title: "Fortnight",
      description: "Completed 14 consecutive days.",
    },
    {
      id: "thirty_days",
      emoji: "📅",
      title: "Month of Devotion",
      description: "Read on 30 or more days total.",
    },
  ];

  const isEarned: Record<string, boolean> = {
    first_day:           allDaysRead >= 1,
    three_days:          streaks.longest >= 3,
    seven_day_streak:    streaks.longest >= 7,
    first_week_complete: completedWeeks.length >= 1,
    three_weeks_complete:completedWeeks.length >= 3,
    all_weeks_complete:  completedWeeks.length === WEEKS_META.length,
    fourteen_day_streak: streaks.longest >= 14,
    thirty_days:         allDaysRead >= 30,
  };

  // Persist any newly earned badges
  for (const [id, earned] of Object.entries(isEarned)) {
    if (earned) saveEarnedDate(id);
  }

  return definitions.map(def => ({
    ...def,
    earned: isEarned[def.id] ?? false,
    earnedAt: earnedDates[def.id],
  }));
}
