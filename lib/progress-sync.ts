// lib/progress-sync.ts
// Pure helpers for syncing finished days. No I/O here so they are easy to test.
import type { ProgressStore } from "@/lib/weeks";

export interface ProgressItem {
  week: number;
  day: number;
  completed_at?: string;
}

export type QueueOp = { op: "add" | "remove"; week: number; day: number };

export const MAX_ITEMS = 500;
export const NUDGE_MIN_DAYS = 3;
export const NUDGE_SNOOZE_MS = 14 * 24 * 60 * 60 * 1000;

export function isValidWeekDay(week: unknown, day: unknown): boolean {
  return (
    typeof week === "number" && Number.isInteger(week) && week > 0 &&
    typeof day === "number" && Number.isInteger(day) && day >= 1 && day <= 7
  );
}

/** Finished days in a store as a flat, de-duplicated list. Invalid entries are skipped. */
export function storeToItems(store: ProgressStore): ProgressItem[] {
  const out: ProgressItem[] = [];
  if (!store || typeof store !== "object") return out;
  for (const [w, days] of Object.entries(store)) {
    if (!days || typeof days !== "object") continue;
    for (const [d, done] of Object.entries(days)) {
      if (done !== true) continue;
      const week = Number(w);
      const day = Number(d);
      if (isValidWeekDay(week, day)) out.push({ week, day });
    }
  }
  return out;
}

export function itemsToStore(items: ProgressItem[]): ProgressStore {
  const store: ProgressStore = {};
  for (const it of items) {
    if (!isValidWeekDay(it?.week, it?.day)) continue;
    const k = String(it.week);
    store[k] = { ...(store[k] ?? {}), [String(it.day)]: true };
  }
  return store;
}

export function countDone(store: ProgressStore): number {
  return storeToItems(store).length;
}

/**
 * Union merge. A day finished on either side stays finished. Days listed in
 * `pendingRemovals` (un-finished locally, not yet confirmed by the server) are
 * left out so a pull does not resurrect them. Existing `false` entries are kept
 * so older data keeps its shape.
 */
export function mergeStores(
  local: ProgressStore,
  server: ProgressItem[],
  pendingRemovals: QueueOp[] = []
): ProgressStore {
  const merged: ProgressStore = {};
  for (const [w, days] of Object.entries(local ?? {})) {
    if (days && typeof days === "object" && !Array.isArray(days)) merged[w] = { ...days };
  }
  const removed = new Set(
    pendingRemovals.filter(q => q.op === "remove").map(q => `${q.week}:${q.day}`)
  );
  for (const it of server ?? []) {
    if (!isValidWeekDay(it?.week, it?.day)) continue;
    if (removed.has(`${it.week}:${it.day}`)) continue;
    const k = String(it.week);
    merged[k] = { ...(merged[k] ?? {}), [String(it.day)]: true };
  }
  return merged;
}

/** Add an operation to the offline queue. A later op on the same day replaces the earlier one. */
export function enqueue(queue: QueueOp[], op: QueueOp): QueueOp[] {
  if (!isValidWeekDay(op.week, op.day)) return queue;
  const rest = queue.filter(q => !(q.week === op.week && q.day === op.day));
  return [...rest, { op: op.op, week: op.week, day: op.day }];
}

/** Read a queue from untrusted storage, dropping anything malformed. */
export function parseQueue(raw: unknown): QueueOp[] {
  if (!Array.isArray(raw)) return [];
  let q: QueueOp[] = [];
  for (const r of raw) {
    if (r && (r.op === "add" || r.op === "remove")) q = enqueue(q, r);
  }
  return q;
}

export function chunk<T>(arr: T[], size = MAX_ITEMS): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export function shouldShowNudge(input: {
  signedOut: boolean;
  doneCount: number;
  dismissedAt: number | null;
  now?: number;
}): boolean {
  const now = input.now ?? Date.now();
  if (!input.signedOut || input.doneCount < NUDGE_MIN_DAYS) return false;
  if (input.dismissedAt !== null && Number.isFinite(input.dismissedAt) && now - input.dismissedAt < NUDGE_SNOOZE_MS) {
    return false;
  }
  return true;
}

/** Only same-origin relative paths are allowed as redirect targets. */
export function safeNext(next: string | null | undefined, fallback = "/"): string {
  if (!next || typeof next !== "string") return fallback;
  if (!next.startsWith("/") || next.startsWith("//") || next.includes("\\")) return fallback;
  // eslint-disable-next-line no-control-regex
  if (/[\x00-\x1f]/.test(next)) return fallback;
  return next;
}
