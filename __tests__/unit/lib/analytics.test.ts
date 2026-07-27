import { getWeekStats, getDayStats, getStreakStats } from "@/lib/analytics";
import type { ProgressStore } from "@/lib/weeks";

describe("getStreakStats", () => {
  it("returns zero stats when no progress exists", () => {
    const store: ProgressStore = {};
    const stats = getStreakStats(store);

    expect(stats.current).toBe(0);
    expect(stats.longest).toBe(0);
    expect(stats.totalDaysRead).toBe(0);
    expect(stats.totalWeeksStarted).toBe(0);
    expect(stats.totalWeeksCompleted).toBe(0);
  });

  it("calculates current streak correctly for consecutive days", () => {
    const store: ProgressStore = {
      "1": { "1": true, "2": true, "3": true, "4": true, "5": true, "6": true, "7": true },
    };
    const stats = getStreakStats(store);
    expect(stats.current).toBe(7);
    expect(stats.longest).toBe(7);
  });

  it("breaks streak on incomplete day", () => {
    const store: ProgressStore = {
      "1": { "1": true, "2": true, "3": false, "4": true, "5": true },
    };
    const stats = getStreakStats(store);
    expect(stats.current).toBe(2);
    expect(stats.longest).toBe(2);
  });

  it("counts total days read across multiple weeks", () => {
    const store: ProgressStore = {
      "1": { "1": true, "2": true, "3": true },
      "2": { "1": true, "2": true },
    };
    const stats = getStreakStats(store);
    expect(stats.totalDaysRead).toBe(5);
  });

  it("identifies weeks started vs completed", () => {
    const store: ProgressStore = {
      "1": { "1": true, "2": true, "3": true, "4": true, "5": true, "6": true, "7": true },
      "2": { "1": true, "2": true },
    };
    const stats = getStreakStats(store);
    expect(stats.totalWeeksStarted).toBe(2);
    expect(stats.totalWeeksCompleted).toBe(1);
  });
});

describe("getDayStats", () => {
  it("returns 7 entries, one per day of the week", () => {
    const store: ProgressStore = {};
    const stats = getDayStats(store);
    expect(stats).toHaveLength(7);
  });

  it("counts completions per day number correctly", () => {
    const store: ProgressStore = {
      "1": { "1": true, "2": true },
      "2": { "1": true },         // day 1 completed in 2 weeks
    };
    const stats = getDayStats(store);
    expect(stats.find(d => d.dayNum === 1)?.timesCompleted).toBe(2);
    expect(stats.find(d => d.dayNum === 2)?.timesCompleted).toBe(1);
    expect(stats.find(d => d.dayNum === 3)?.timesCompleted).toBe(0);
  });
});
