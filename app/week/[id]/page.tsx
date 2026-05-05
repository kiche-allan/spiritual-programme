"use client";
import { useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { DaySidebar } from "@/components/week/DaySidebar";
import { VerseCard } from "@/components/week/VerseCard";
import { DayPractices } from "@/components/week/DayPractices";
import { ThemeBadge } from "@/components/ui/ThemeBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Toast } from "@/components/ui/Toast";
import ShareButton from "@/components/ShareButton";
import { useProgress } from "@/hooks/useProgress";
import { useToast } from "@/hooks/useToast";
import { WEEKS_META } from "@/lib/weeks";
import { getWeekContent } from "@/lib/content";
import { scrollToContent } from "@/lib/utils";

export default function WeekPage() {
  const { id } = useParams();
  const weekId = Number(id);
  const meta = WEEKS_META.find(w => w.id === weekId);
  const days = getWeekContent(weekId) ?? [];

  const [cur, setCur] = useState(0);
  const { toggle, doneCount, pct, isDone } = useProgress(weekId, days.length);
  const { message: toastMsg, show: showToast } = useToast();

  const handleToggle = useCallback((dayNum: number) => {
    toggle(dayNum);
    const nowDone = !isDone(dayNum);
    showToast(nowDone ? "✓ Day marked complete" : "Day unmarked");
  }, [toggle, isDone, showToast]);

  const handleSelect = (i: number) => {
    setCur(i);
    scrollToContent();
  };

  const prevW = WEEKS_META.find(w => w.id === weekId - 1);
  const nextW = WEEKS_META.find(w => w.id === weekId + 1);

  // ── Guards ──────────────────────────────────────────────────────────────────
  if (!meta) return (
    <div style={{ padding: "120px 24px", textAlign: "center", color: "var(--tm)" }}>
      Week not found. <a href="/" style={{ color: "var(--t1)" }}>← Home</a>
    </div>
  );

  if (days.length === 0) return (
    <>
      <Navbar />
      <div style={{ padding: "120px 24px", textAlign: "center", color: "var(--tm)" }}>
        <h2 style={{
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontSize: "2rem", color: "var(--t1)", marginBottom: 12,
        }}>
          {meta.title}
        </h2>
        <p>Content for this week is coming soon.</p>
        <a href="/" style={{ display: "inline-block", marginTop: 20, color: "var(--t1)", fontWeight: 700 }}>
          ← All Weeks
        </a>
      </div>
    </>
  );

  const day = days[cur];
  const dayDone = isDone(day.num);

  return (
    <>
      <Navbar />

      {/* WEEK HERO */}
      <header style={{
        background: "var(--hero)", color: "var(--hero-t)",
        padding: "90px 24px 52px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <a href="/" style={{
            display: "inline-block", fontSize: 12, fontWeight: 700,
            letterSpacing: ".08em", textTransform: "uppercase",
            color: "var(--hero-a)", textDecoration: "none",
            marginBottom: 18, opacity: .7,
          }}>
            ← All Weeks
          </a>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: ".2em",
            textTransform: "uppercase", color: "var(--hero-a)", marginBottom: 8,
          }}>
            {meta.subtitle}
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond',Georgia,serif",
            fontSize: "clamp(2rem,5vw,3.2rem)",
            fontWeight: 300, lineHeight: 1.18, marginBottom: 10,
          }}>
            {meta.title}
          </h1>
          <p style={{
            fontFamily: "'Cormorant Garamond',Georgia,serif",
            fontSize: "1rem", fontStyle: "italic",
            color: "var(--hero-a)", opacity: .8, marginBottom: 22,
          }}>
            &ldquo;{meta.heroVerse}&rdquo; — {meta.heroRef}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
            {meta.themes.map(t => (
              <ThemeBadge key={t.label} theme={t} showDays
                // Override colours for hero (white text on dark bg)
              />
            ))}
          </div>
          <div style={{ maxWidth: 380 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{
                fontSize: 11, color: "var(--hero-a)",
                fontWeight: 700, letterSpacing: ".06em", opacity: .8,
              }}>
                {doneCount === 0 ? "Not started"
                  : doneCount === days.length ? "✓ Complete!"
                  : `${doneCount} of ${days.length} days`}
              </span>
              <span style={{ fontSize: 11, color: "var(--hero-a)", opacity: .6 }}>{pct}%</span>
            </div>
            <ProgressBar pct={pct} />
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", minHeight: "70vh" }}>

        <DaySidebar
          days={days}
          current={cur}
          progress={isDone}
          onSelect={handleSelect}
          onToggle={handleToggle}
        />

        {/* DAY CONTENT */}
        <main style={{
          flex: 1, padding: "2.5rem 2rem 4rem",
          borderLeft: "1px solid var(--border)", minWidth: 0,
        }}>
          {/* Day header */}
          <div style={{
            display: "flex", alignItems: "flex-start", gap: 16,
            marginBottom: "2rem", paddingBottom: "1.5rem",
            borderBottom: "1px solid var(--border)", flexWrap: "wrap",
          }}>
            <div style={{
              width: 60, height: 60, borderRadius: 14, flexShrink: 0,
              background: day.bg, border: `1.5px solid ${day.accent}`,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", lineHeight: 1.1,
            }}>
              <span style={{
                fontSize: 10, fontWeight: 700,
                textTransform: "uppercase", letterSpacing: ".1em", color: day.accent,
              }}>
                {day.abbr}
              </span>
              <span style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: 28, fontWeight: 600, color: day.accent,
              }}>
                {day.num}
              </span>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: "clamp(1.5rem,3vw,2.2rem)",
                fontWeight: 400, color: "var(--t1)", lineHeight: 1.2, marginBottom: 4,
              }}>
                {day.title}
              </h2>
              <div style={{
                fontSize: 11, fontWeight: 700,
                letterSpacing: ".1em", textTransform: "uppercase", color: day.accent,
              }}>
                {day.theme}
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
              <ShareButton title={`Day ${day.num}: ${day.title}`} text={day.revelation[0]} />
              <button
                onClick={() => handleToggle(day.num)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "7px 14px", borderRadius: 8,
                  border: `1.5px solid ${dayDone ? day.accent : "var(--border)"}`,
                  background: dayDone ? day.accent : "transparent",
                  color: dayDone ? "#fff" : "var(--tm)",
                  fontSize: 12, fontWeight: 700, letterSpacing: ".06em",
                  textTransform: "uppercase", cursor: "pointer",
                  fontFamily: "Lato,sans-serif", transition: "all .2s",
                }}
              >
                {dayDone ? "✓ Done" : "Mark Done"}
              </button>
            </div>
          </div>

          {/* Scriptures */}
          <section style={{ marginBottom: "1.75rem" }}>
            <SectionLabel label="Three Scriptures" color={day.accent} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {day.verses.map(v => (
                <VerseCard key={v.label} verse={v} accent={day.accent} bg={day.bg} />
              ))}
            </div>
          </section>

          {/* Revelation */}
          <section style={{ marginBottom: "1.75rem" }}>
            <SectionLabel label="Revelation" color={day.accent} />
            <div style={{ fontSize: 15, lineHeight: 1.85, color: "var(--t2)" }}>
              {day.revelation.map((p, i) => (
                <p key={i} style={{ marginBottom: ".9rem" }}>{p}</p>
              ))}
            </div>
          </section>

          {/* Prayer */}
          <section style={{ marginBottom: "1.75rem" }}>
            <SectionLabel label="Morning Prayer" color={day.accent} />
            <div style={{
              background: "var(--bg2)", border: "1px solid var(--border)",
              borderRadius: 12, padding: "1.5rem",
            }}>
              {day.prayers.map((p, i) => (
                <p key={i} style={{
                  fontFamily: "'Cormorant Garamond',Georgia,serif",
                  fontSize: "1.1rem", lineHeight: 1.9,
                  color: "var(--t2)", fontStyle: "italic", marginBottom: ".85rem",
                }}>
                  {p}
                </p>
              ))}
              <p style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: "1rem", fontStyle: "normal",
                fontWeight: 600, color: "var(--t1)",
              }}>
                {day.amen}
              </p>
            </div>
          </section>

          {/* Practices */}
          <section style={{ marginBottom: "1.75rem" }}>
            <SectionLabel label="Daily Practices" color={day.accent} />
            <DayPractices practices={day.practices} accent={day.accent} />
          </section>

          {/* Day navigation */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginTop: "2.5rem", paddingTop: "1.5rem",
            borderTop: "1px solid var(--border)",
          }}>
            <NavBtn
              label="← Previous"
              disabled={cur === 0}
              onClick={() => handleSelect(cur - 1)}
            />
            <span style={{
              fontSize: 12, color: "var(--tl)", fontWeight: 700,
              letterSpacing: ".08em", textTransform: "uppercase",
            }}>
              Day {cur + 1} of {days.length}
            </span>
            <NavBtn
              label="Next →"
              disabled={cur === days.length - 1}
              onClick={() => handleSelect(cur + 1)}
            />
          </div>
        </main>
      </div>

      {/* WEEK NAVIGATION */}
      <div style={{
        background: "var(--bg2)", borderTop: "1px solid var(--border)",
        padding: "28px 24px",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", gap: 16, flexWrap: "wrap",
        }}>
          {prevW ? (
            <a href={`/week/${prevW.id}`} style={{ textDecoration: "none" }}>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: ".14em",
                textTransform: "uppercase", color: "var(--tl)", marginBottom: 4,
              }}>← Previous Week</div>
              <div style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: "1.1rem", color: "var(--t1)",
              }}>{prevW.title}</div>
            </a>
          ) : <div />}

          <a href="/" style={{
            fontSize: 12, fontWeight: 700, letterSpacing: ".08em",
            textTransform: "uppercase", color: "var(--tm)", textDecoration: "none",
          }}>
            All Weeks
          </a>

          {nextW ? (
            <a href={`/week/${nextW.id}`} style={{ textDecoration: "none", textAlign: "right" }}>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: ".14em",
                textTransform: "uppercase", color: "var(--tl)", marginBottom: 4,
              }}>Next Week →</div>
              <div style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: "1.1rem", color: "var(--t1)",
              }}>{nextW.title}</div>
            </a>
          ) : <div />}
        </div>
      </div>

      <footer style={{
        background: "var(--hero)", color: "var(--hero-a)",
        textAlign: "center", padding: "28px 24px", fontSize: 13,
      }}>
        <p style={{
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontSize: "1.05rem", fontStyle: "italic", marginBottom: 6,
        }}>
          &ldquo;{meta.heroVerse}&rdquo;
        </p>
        <p style={{
          fontSize: 11, fontWeight: 700,
          letterSpacing: ".1em", textTransform: "uppercase", opacity: .6,
        }}>
          {meta.heroRef}
        </p>
      </footer>

      <Toast message={toastMsg} />

      <style>{`
        @media(max-width:720px){
          .hide-mobile{display:none!important}
          main{border-left:none!important;padding:1.5rem 1rem 3rem!important}
        }
      `}</style>
    </>
  );
}

function NavBtn({ label, disabled, onClick }: {
  label: string; disabled: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "10px 20px", borderRadius: 8,
        border: "1.5px solid var(--border)",
        background: "transparent", color: "var(--tm)",
        fontSize: 13, fontWeight: 700, letterSpacing: ".05em",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? .3 : 1,
        fontFamily: "Lato,sans-serif", transition: "all .2s",
      }}
    >
      {label}
    </button>
  );
}

