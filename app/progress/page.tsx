// app/progress/page.tsx
"use client";
import { useMemo } from "react";
import Navbar from "@/components/Navbar";
import { useAllProgress } from "@/hooks/useProgress";
import { getWeekStats, getDayStats, getStreakStats } from "@/lib/analytics";
import { ProgressBackup } from "@/components/ui/ProgressBackup";

export default function ProgressPage() {
  const store = useAllProgress();

  const weekStats  = useMemo(() => getWeekStats(store),  [store]);
  const dayStats   = useMemo(() => getDayStats(store),   [store]);
  const streaks    = useMemo(() => getStreakStats(store), [store]);

  const mostCompleted  = [...dayStats].sort((a, b) => b.timesCompleted - a.timesCompleted)[0];
  const leastCompleted = [...dayStats].sort((a, b) => a.timesCompleted - b.timesCompleted)[0];
  const maxDayCount    = Math.max(...dayStats.map(d => d.timesCompleted), 1);

  return (
    <>
      <Navbar />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "96px 24px 64px" }}>

        {/* Page header */}
        <div style={{ marginBottom: 40 }}>
          <a href="/" style={{
            fontSize: 11, fontWeight: 700, letterSpacing: ".1em",
            textTransform: "uppercase", color: "var(--tl)",
            textDecoration: "none", display: "inline-block", marginBottom: 16,
          }}>
            ← Back Home
          </a>
          <h1 style={{
            fontFamily: "'Cormorant Garamond',Georgia,serif",
            fontSize: "clamp(2rem,4vw,3rem)",
            fontWeight: 300, color: "var(--t1)", marginBottom: 8,
          }}>
            Your Progress
          </h1>
          <p style={{ fontSize: 14, color: "var(--tm)", lineHeight: 1.6 }}>
            A record of your journey through the weekly programmes.
          </p>
        </div>

        {/* ── STREAK SUMMARY CARDS ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 12, marginBottom: 48,
        }}>
          {[
            { value: streaks.totalDaysRead,       label: "Days Read",          color: "#1A3A6E" },
            { value: streaks.totalWeeksStarted,   label: "Weeks Started",      color: "#2E6B50" },
            { value: streaks.totalWeeksCompleted, label: "Weeks Completed",    color: "#8A2040" },
            { value: streaks.current,             label: "Current Streak",     color: "#BF8B3A" },
            { value: streaks.longest,             label: "Longest Streak",     color: "#5A2D82" },
          ].map(stat => (
            <div key={stat.label} style={{
              background: "var(--bg2)",
              border: `1px solid var(--border)`,
              borderTop: `3px solid ${stat.color}`,
              borderRadius: 12, padding: "18px 16px",
              textAlign: "center",
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: 42, fontWeight: 400,
                color: stat.color, lineHeight: 1,
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: ".12em",
                textTransform: "uppercase", color: "var(--tl)", marginTop: 6,
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── COMPLETION BY WEEK ── */}
        <Section title="Completion by Week">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {weekStats.map(w => (
              <div key={w.weekId} style={{
                background: "var(--bg2)",
                border: "1px solid var(--border)",
                borderRadius: 10, padding: "14px 16px",
              }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "flex-start", marginBottom: 8, gap: 12,
                }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: ".14em",
                      textTransform: "uppercase", color: w.accentColor, marginBottom: 3,
                    }}>
                      {w.subtitle}
                    </div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond',Georgia,serif",
                      fontSize: "1.05rem", color: "var(--t1)",
                      lineHeight: 1.3,
                    }}>
                      {w.title}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{
                      fontFamily: "'Cormorant Garamond',Georgia,serif",
                      fontSize: 22, fontWeight: 400,
                      color: w.completionRate === 100 ? "#2E6B50" : "var(--t1)",
                    }}>
                      {w.completionRate}%
                    </div>
                    <div style={{ fontSize: 11, color: "var(--tl)" }}>
                      {w.completedDays}/{w.totalDays} days
                    </div>
                  </div>
                </div>
                {/* Progress bar */}
                <div style={{
                  height: 6, background: "var(--bg3)",
                  borderRadius: 3, overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%",
                    width: `${w.completionRate}%`,
                    background: w.completionRate === 100
                      ? "linear-gradient(90deg,#2E6B50,#48A878)"
                      : `linear-gradient(90deg,${w.accentColor},${w.accentColor}CC)`,
                    borderRadius: 3,
                    transition: "width .6s ease",
                  }} />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── DAY OF WEEK BREAKDOWN ── */}
        <Section title="Completion by Day of Week">
          <p style={{ fontSize: 13, color: "var(--tm)", marginBottom: 20, lineHeight: 1.6 }}>
            How many times you have completed each day across all weeks.
            {mostCompleted?.timesCompleted > 0 && (
              <> Your strongest day is <strong style={{ color: "var(--t1)" }}>{mostCompleted.dayName}</strong>
              {leastCompleted?.timesCompleted < mostCompleted?.timesCompleted &&
                <>, your least completed is <strong style={{ color: "var(--t1)" }}>{leastCompleted.dayName}</strong></>
              }.</>
            )}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {dayStats.map(d => (
              <div key={d.dayNum} style={{
                display: "flex", alignItems: "center", gap: 12,
              }}>
                <div style={{
                  width: 90, fontSize: 12, fontWeight: 700,
                  color: "var(--t2)", flexShrink: 0,
                }}>
                  {d.dayName}
                </div>
                <div style={{
                  flex: 1, height: 28, background: "var(--bg2)",
                  border: "1px solid var(--border)",
                  borderRadius: 6, overflow: "hidden",
                  position: "relative",
                }}>
                  <div style={{
                    height: "100%",
                    width: `${(d.timesCompleted / maxDayCount) * 100}%`,
                    background: "linear-gradient(90deg,#1A3A6E,#2E5FA8)",
                    borderRadius: 6,
                    transition: "width .6s ease",
                    minWidth: d.timesCompleted > 0 ? 8 : 0,
                  }} />
                </div>
                <div style={{
                  width: 24, fontSize: 13, fontWeight: 700,
                  color: "var(--t1)", textAlign: "right", flexShrink: 0,
                }}>
                  {d.timesCompleted}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── STREAK DETAIL ── */}
        <Section title="Streak Details">
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16,
          }}>
            <div style={{
              background: "var(--bg2)", border: "1px solid var(--border)",
              borderRadius: 10, padding: "20px",
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: 48, color: "#BF8B3A", lineHeight: 1,
              }}>
                {streaks.current}
              </div>
              <div style={{
                fontSize: 11, fontWeight: 700, letterSpacing: ".12em",
                textTransform: "uppercase", color: "var(--tl)", marginTop: 6,
              }}>
                Current Streak
              </div>
              <p style={{ fontSize: 12, color: "var(--tm)", marginTop: 8, lineHeight: 1.5 }}>
                {streaks.current === 0
                  ? "Start reading today to begin your streak."
                  : streaks.current === 1
                  ? "You read yesterday. Keep going!"
                  : `${streaks.current} consecutive days completed.`}
              </p>
            </div>

            <div style={{
              background: "var(--bg2)", border: "1px solid var(--border)",
              borderRadius: 10, padding: "20px",
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: 48, color: "#5A2D82", lineHeight: 1,
              }}>
                {streaks.longest}
              </div>
              <div style={{
                fontSize: 11, fontWeight: 700, letterSpacing: ".12em",
                textTransform: "uppercase", color: "var(--tl)", marginTop: 6,
              }}>
                Longest Streak
              </div>
              <p style={{ fontSize: 12, color: "var(--tm)", marginTop: 8, lineHeight: 1.5 }}>
                {streaks.longest === 0
                  ? "Your longest streak will appear here."
                  : `Your best run so far. Beat it by reading consistently.`}
              </p>
            </div>
          </div>
        </Section>

        {/* ── BACKUP ── */}
        <Section title="Backup & Restore">
          <p style={{ fontSize: 13, color: "var(--tm)", marginBottom: 16, lineHeight: 1.6 }}>
            Export your progress as a JSON file to back it up or transfer it to another device.
            Importing merges with your existing progress rather than replacing it.
          </p>
          <ProgressBackup onImported={() => window.location.reload()} />
        </Section>

      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <h2 style={{
        fontFamily: "'Cormorant Garamond',Georgia,serif",
        fontSize: "1.6rem", fontWeight: 400,
        color: "var(--t1)", marginBottom: 20,
        paddingBottom: 10,
        borderBottom: "1px solid var(--border)",
      }}>
        {title}
      </h2>
      {children}
    </div>
  );
}
