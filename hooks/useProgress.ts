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

export function useProgress(weekId: number, totalDays: number) {
  const [store, setStore] = useState<ProgressStore>({});

  useEffect(() => {
    setStore(loadProgress());
  }, []);

  const toggle = useCallback(
    (dayNum: number) => {
      const current = loadProgress();
      const next = toggleDay(current, weekId, dayNum);
      saveProgress(next);
      setStore(next);
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

  return store;
}
