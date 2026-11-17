// hooks/useProgress.ts
"use client";
import { useState, useEffect, useCallback } from "react";
import {
  loadProgress,
  saveProgress,
  toggleDay,
  weekProgress,
  type ProgressStore,
} from "@/lib/weeks";
import { afterToggle, PROGRESS_EVENT } from "@/lib/progress-sync-client";

/** Re-reads progress when a background sync (or sign-in) changes it. */
function useRefreshOnSync(setStore: (s: ProgressStore) => void) {
  useEffect(() => {
    const fn = () => setStore(loadProgress());
    window.addEventListener(PROGRESS_EVENT, fn);
    return () => window.removeEventListener(PROGRESS_EVENT, fn);
  }, [setStore]);
}

export function useProgress(weekId: number, totalDays: number) {
  const [store, setStore] = useState<ProgressStore>({});

  useEffect(() => {
    setStore(loadProgress());
  }, []);
  useRefreshOnSync(setStore);

  const toggle = useCallback(
    (dayNum: number) => {
      const current = loadProgress();
      const next = toggleDay(current, weekId, dayNum);
      saveProgress(next);
      setStore(next);
      afterToggle(weekId, dayNum, next[String(weekId)]?.[String(dayNum)] === true);
    },
    [weekId]
  );

  const dayProgress = store[String(weekId)] ?? {};
  const doneCount = Object.values(dayProgress).filter(Boolean).length;
  const pct = weekProgress(store, weekId, totalDays);
  const isDone = (dayNum: number) => dayProgress[String(dayNum)] ?? false;

  return { toggle, doneCount, pct, isDone };
}

export function useAllProgress() {
  const [store, setStore] = useState<ProgressStore>({});

  useEffect(() => {
    setStore(loadProgress());
  }, []);
  useRefreshOnSync(setStore);

  return store;
}
