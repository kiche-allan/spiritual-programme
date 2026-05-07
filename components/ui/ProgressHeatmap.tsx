// components/ui/ProgressHeatmap.tsx
"use client";
import { useMemo } from "react";
import { WEEKS_META } from "@/lib/weeks";
import type { ProgressStore } from "@/lib/weeks";

interface Props { store: ProgressStore; }

export function ProgressHeatmap({ store }: Props) {
  // Build a flat grid: each cell = one day across all weeks in order
  const cells = useMemo(() => {
    const sorted = [...WEEKS_META].sort((a, b) => a.id - b.id);
    return sorted.flatMap(meta =>
      Array.from({ length: meta.totalDays }, (_, i) => ({
        weekId: meta.id,
        dayNum: i + 1,
        weekTitle: meta.subtitle,
        dayName: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i],
        done: !!(store[String(meta.id)]?.[String(i + 1)]),
        accentColor: meta.accentColor,
      }))
    );
  }, [store]);

  const totalDone = cells.filter(c => c.done).length;
  const totalCells = cells.length;

  // Group into rows of 7 (one week per row)
  const rows: typeof cells[] = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }

  return (
    <div>
      <div style={{
        fontSize: 12, color: "var(--tm)", marginBottom: 12,
      }}>
        {totalDone} of {totalCells} days completed
      </div>

      <div style={{ overflowX: "auto" }}>
        {/* Day labels */}
        <div style={{ display: "flex", gap: 4, marginBottom: 4, paddingLeft: 72 }}>
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
            <div key={d} style={{
              width: 28, fontSize: 9, fontWeight: 700, letterSpacing: ".06em",
              textTransform: "uppercase", color: "var(--tl)", textAlign: "center",
            }}>
              {d}
            </div>
          ))}
        </div>

        {/* Rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {rows.map((row, ri) => (
            <div key={ri} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {/* Week label */}
              <div style={{
                width: 68, fontSize: 10, fontWeight: 700,
                letterSpacing: ".08em", textTransform: "uppercase",
                color: "var(--tl)", flexShrink: 0, textAlign: "right",
                paddingRight: 8,
              }}>
                {row[0]?.weekTitle ?? `Wk ${ri + 1}`}
              </div>

              {/* Day cells */}
              {row.map((cell, ci) => (
                <div
                  key={ci}
                  title={`${cell.weekTitle} · ${cell.dayName}${cell.done ? " ✓" : ""}`}
                  style={{
                    width: 28, height: 28, borderRadius: 5,
                    background: cell.done ? cell.accentColor : "var(--bg3)",
                    border: `1px solid ${cell.done ? cell.accentColor : "var(--border)"}`,
                    opacity: cell.done ? 1 : 0.5,
                    transition: "opacity .2s",
                    flexShrink: 0,
                    cursor: "default",
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
          <span style={{ fontSize: 11, color: "var(--tl)" }}>Less</span>
          {["var(--bg3)", "#6B8FA8", "#3A6E8A", "#1A3A6E"].map((c, i) => (
            <div key={i} style={{
              width: 14, height: 14, borderRadius: 3,
              background: c, border: "1px solid var(--border)",
            }} />
          ))}
          <span style={{ fontSize: 11, color: "var(--tl)" }}>More</span>
        </div>
      </div>
    </div>
  );
}
