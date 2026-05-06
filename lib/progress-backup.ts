// lib/progress-backup.ts
import { loadProgress, saveProgress, type ProgressStore } from "@/lib/weeks";

// ── EXPORT ───────────────────────────────────────────────────────────────────

export function exportProgress(): void {
  const store = loadProgress();
  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    progress: store,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `spiritual-programme-progress-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── IMPORT ───────────────────────────────────────────────────────────────────

export type ImportResult =
  | { ok: true; weeksImported: number }
  | { ok: false; error: string };

export function importProgress(file: File): Promise<ImportResult> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const raw = JSON.parse(e.target?.result as string);

        // Accept both the wrapped format and a raw ProgressStore
        const store: ProgressStore =
          raw.version === 1 && raw.progress ? raw.progress : raw;

        // Validate — must be an object of objects of booleans
        if (typeof store !== "object" || Array.isArray(store)) {
          resolve({ ok: false, error: "Invalid file format." });
          return;
        }

        // Merge with existing progress rather than overwriting
        const existing = loadProgress();
        const merged: ProgressStore = { ...existing };

        for (const [weekId, days] of Object.entries(store)) {
          if (typeof days !== "object" || Array.isArray(days)) continue;
          merged[weekId] = { ...(merged[weekId] ?? {}), ...days };
        }

        saveProgress(merged);
        const weeksImported = Object.keys(store).length;
        resolve({ ok: true, weeksImported });
      } catch {
        resolve({ ok: false, error: "Could not read file. Make sure it is a valid progress backup." });
      }
    };

    reader.onerror = () => {
      resolve({ ok: false, error: "Could not read file." });
    };

    reader.readAsText(file);
  });
}
