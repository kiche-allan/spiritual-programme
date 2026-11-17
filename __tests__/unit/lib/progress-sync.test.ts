import {
  chunk, countDone, enqueue, isValidWeekDay, itemsToStore, mergeStores,
  parseQueue, safeNext, shouldShowNudge, storeToItems, NUDGE_SNOOZE_MS,
} from "@/lib/progress-sync";

describe("storeToItems / itemsToStore", () => {
  it("keeps only finished, valid days", () => {
    const items = storeToItems({ "1": { "1": true, "2": false, "9": true }, "0": { "1": true }, x: { "1": true } });
    expect(items).toEqual([{ week: 1, day: 1 }]);
  });
  it("round-trips and tolerates garbage", () => {
    expect(itemsToStore([{ week: 2, day: 3 }, { week: -1, day: 1 }, { week: 2, day: 8 }])).toEqual({ "2": { "3": true } });
    expect(storeToItems(null as never)).toEqual([]);
    expect(countDone({ "1": { "1": true, "2": true } })).toBe(2);
  });
});

describe("mergeStores (union only)", () => {
  it("combines local and server days", () => {
    const merged = mergeStores({ "1": { "1": true } }, [{ week: 1, day: 2 }, { week: 2, day: 1 }]);
    expect(merged).toEqual({ "1": { "1": true, "2": true }, "2": { "1": true } });
  });
  it("never removes a local day and handles duplicates", () => {
    const merged = mergeStores({ "1": { "1": true } }, [{ week: 1, day: 1 }, { week: 1, day: 1 }]);
    expect(merged).toEqual({ "1": { "1": true } });
    expect(mergeStores({ "3": { "4": true } }, [])).toEqual({ "3": { "4": true } });
  });
  it("ignores invalid server rows", () => {
    const merged = mergeStores({}, [{ week: 0, day: 1 }, { week: 1, day: 0 }, { week: 1.5, day: 1 }, null as never]);
    expect(merged).toEqual({});
  });
  it("does not resurrect a day un-finished offline", () => {
    const merged = mergeStores({ "1": { "1": false } }, [{ week: 1, day: 1 }], [{ op: "remove", week: 1, day: 1 }]);
    expect(merged["1"]["1"]).toBe(false);
  });
});

describe("offline queue", () => {
  it("later op on a day replaces the earlier one", () => {
    let q = enqueue([], { op: "add", week: 1, day: 1 });
    q = enqueue(q, { op: "remove", week: 1, day: 1 });
    q = enqueue(q, { op: "add", week: 1, day: 2 });
    expect(q).toEqual([{ op: "remove", week: 1, day: 1 }, { op: "add", week: 1, day: 2 }]);
  });
  it("rejects invalid ops and parses untrusted storage", () => {
    expect(enqueue([], { op: "add", week: 1, day: 9 })).toEqual([]);
    expect(parseQueue("nope")).toEqual([]);
    expect(parseQueue([{ op: "add", week: 1, day: 1 }, { op: "zap", week: 1, day: 1 }, null, { op: "remove", week: 0, day: 1 }]))
      .toEqual([{ op: "add", week: 1, day: 1 }]);
  });
});

describe("helpers", () => {
  it("validates week/day", () => {
    expect(isValidWeekDay(1, 7)).toBe(true);
    expect(isValidWeekDay(1, 8)).toBe(false);
    expect(isValidWeekDay("1", 1)).toBe(false);
  });
  it("chunks at the cap", () => {
    expect(chunk(Array.from({ length: 1100 }, (_, i) => i)).map(c => c.length)).toEqual([500, 500, 100]);
  });
  it("only allows same-origin redirect paths", () => {
    expect(safeNext("/settings")).toBe("/settings");
    expect(safeNext("//evil.com")).toBe("/");
    expect(safeNext("https://evil.com")).toBe("/");
    expect(safeNext("/\\evil.com")).toBe("/");
    expect(safeNext(null, "/settings")).toBe("/settings");
  });
});

describe("shouldShowNudge", () => {
  const now = 1_000_000_000_000;
  it("needs signed out and 3+ days", () => {
    expect(shouldShowNudge({ signedOut: true, doneCount: 3, dismissedAt: null, now })).toBe(true);
    expect(shouldShowNudge({ signedOut: true, doneCount: 2, dismissedAt: null, now })).toBe(false);
    expect(shouldShowNudge({ signedOut: false, doneCount: 9, dismissedAt: null, now })).toBe(false);
  });
  it("stays hidden for 14 days after dismissal", () => {
    expect(shouldShowNudge({ signedOut: true, doneCount: 5, dismissedAt: now - 1000, now })).toBe(false);
    expect(shouldShowNudge({ signedOut: true, doneCount: 5, dismissedAt: now - NUDGE_SNOOZE_MS - 1, now })).toBe(true);
  });
});
