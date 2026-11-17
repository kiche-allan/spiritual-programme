// lib/progress-sync-client.ts — background sync. Never blocks the UI; failures stay queued.
"use client";
import { loadProgress, saveProgress } from "@/lib/weeks";
import {
  KEYS, getAuthClient, getAuthState, lsGet, lsSet,
} from "@/lib/auth/client";
import {
  chunk, enqueue, mergeStores, parseQueue, storeToItems,
  type ProgressItem, type QueueOp,
} from "@/lib/progress-sync";

export const PROGRESS_EVENT = "wwg:progress-changed";

function readQueue(): QueueOp[] {
  try { return parseQueue(JSON.parse(lsGet(KEYS.queue) ?? "[]")); } catch { return []; }
}
function writeQueue(q: QueueOp[]) {
  lsSet(KEYS.queue, JSON.stringify(q));
}
function dequeueDone(done: QueueOp[]) {
  const fresh = readQueue().filter(q => !done.some(d => d.op === q.op && d.week === q.week && d.day === q.day));
  writeQueue(fresh);
}

export function getLastSync(): Date | null {
  const raw = lsGet(KEYS.lastSync);
  const d = raw ? new Date(raw) : null;
  return d && !Number.isNaN(d.getTime()) ? d : null;
}

let persistAsked = false;
function requestPersistOnce() {
  if (persistAsked) return;
  persistAsked = true;
  try { void navigator.storage?.persist?.(); } catch { /* best effort */ }
}

let inFlight: Promise<boolean> | null = null;
let again = false;

/** Push local days, pull the merged set, write it locally. Resolves false if offline or failing. */
export function syncNow(): Promise<boolean> {
  if (inFlight) { again = true; return inFlight; }
  inFlight = runSync().finally(() => {
    inFlight = null;
    if (again) { again = false; void syncNow(); }
  });
  return inFlight;
}

async function runSync(): Promise<boolean> {
  const client = getAuthClient();
  if (!client || typeof navigator !== "undefined" && navigator.onLine === false) return false;
  try {
    const { data } = await client.auth.getSession();
    const session = data.session;
    if (!session) return false;

    // 1. Un-finished days: delete those rows first.
    const removes = readQueue().filter(q => q.op === "remove");
    for (const r of removes) {
      const { error } = await client.from("progress").delete().match({ week: r.week, day: r.day });
      if (error) return false;
      dequeueDone([r]);
    }

    // 2. Push everything finished on this device; the server ignores duplicates.
    const pendingRemovals = readQueue().filter(q => q.op === "remove");
    const adds = readQueue().filter(q => q.op === "add");
    const skip = new Set(pendingRemovals.map(q => `${q.week}:${q.day}`));
    const items: ProgressItem[] = storeToItems(loadProgress()).filter(i => !skip.has(`${i.week}:${i.day}`));

    let server: ProgressItem[] | null = null;
    for (const part of chunk(items)) {
      const res = await fetch("/api/progress/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ items: part }),
      });
      if (!res.ok) return false;
      server = ((await res.json()) as { items: ProgressItem[] }).items;
    }
    if (server === null) {
      const { data: rows, error } = await client.from("progress").select("week, day, completed_at");
      if (error) return false;
      server = rows as ProgressItem[];
    }
    dequeueDone(adds);

    // 3. Union merge into localStorage (nothing is ever removed by a sync).
    const merged = mergeStores(loadProgress(), server, readQueue());
    saveProgress(merged);
    lsSet(KEYS.lastSync, new Date().toISOString());
    window.dispatchEvent(new Event(PROGRESS_EVENT));
    return true;
  } catch {
    return false;
  }
}

/** Called after a day is toggled. Local write has already happened. */
export function afterToggle(week: number, day: number, done: boolean): void {
  if (typeof window === "undefined") return;
  if (done) requestPersistOnce();
  if (getAuthState().status !== "signedIn") return;
  writeQueue(enqueue(readQueue(), { op: done ? "add" : "remove", week, day }));
  void syncNow();
}
