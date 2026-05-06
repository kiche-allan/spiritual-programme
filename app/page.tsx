"use client";
import { useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SubscribeSection } from "@/components/layout/SubscribeSection";
import { WeekCard } from "@/components/week/WeekCard";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProgressBackup } from "@/components/ui/ProgressBackup";
import { useAllProgress } from "@/hooks/useProgress";
import { WEEKS_META, weekProgress } from "@/lib/weeks";

export default function HomePage() {
  const store = useAllProgress();

  const sorted = useMemo(
    () => [...WEEKS_META].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    ),
    []
  );

  const latest = sorted[0];
  const rest = sorted.slice(1);

  const getProgress = (id: number) => {
    const pct = weekProgress(store, id, WEEKS_META.find(w => w.id === id)?.totalDays ?? 7);
    const done = Object.values(store[String(id)] ?? {}).filter(Boolean).length;
    return { pct, done };
  };

  const totalDone = Object.values(store).reduce(
    (sum, week) => sum + Object.values(week).filter(Boolean).length,
    0
  );
  const weeksStarted = sorted.filter(w => (getProgress(w.id).done ?? 0) > 0).length;

  return (
    <>
      <Navbar />

      {/* HERO */}
      <header style={{
        background: "var(--hero)", color: "var(--hero-t)",
        padding: "110px 24px 72px", textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: .03,
          backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)",
          backgroundSize: "50px 50px", pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 660, margin: "0 auto", position: "relative" }}>
          <div className="fade-up d1" style={{
            fontSize: 11, fontWeight: 700, letterSpacing: ".22em",
            textTransform: "uppercase", color: "var(--hero-a)", marginBottom: 14,
          }}>
            Weekly Devotional Programme
          </div>

          <h1 className="fade-up d2" style={{
            fontFamily: "'Cormorant Garamond',Georgia,serif",
            fontSize: "clamp(2.6rem,6vw,4rem)",
            fontWeight: 300, lineHeight: 1.15, marginBottom: 18,
          }}>
            Walking With God,<br />
            <em style={{ fontStyle: "italic", color: "#E8C97A" }}>Week by Week</em>
          </h1>

          <p className="fade-up d3" style={{
            fontSize: 16, color: "var(--hero-a)", lineHeight: 1.75,
            maxWidth: 500, margin: "0 auto 28px", fontWeight: 300,
          }}>
            A new 7-day spiritual programme every week — scripture, deep revelation,
            morning prayer, and daily practices.
          </p>

          {/* Stats */}
          <div className="fade-up d4" style={{
            display: "inline-flex", borderRadius: 12,
            border: "1px solid rgba(255,255,255,.12)",
            overflow: "hidden", marginBottom: 28,
          }}>
            {[
              [WEEKS_META.length, "Weeks Published"],
              [totalDone, "Days You've Read"],
              [weeksStarted, "Weeks Started"],
            ].map(([v, l], i) => (
              <div key={i} style={{
                padding: "12px 22px",
                borderRight: i < 2 ? "1px solid rgba(255,255,255,.12)" : "none",
                textAlign: "center",
              }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond',Georgia,serif",
                  fontSize: 26, color: "#E8C97A",
                }}>{v}</div>
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: ".1em",
                  textTransform: "uppercase", color: "var(--hero-a)", opacity: .7, marginTop: 2,
                }}>{l}</div>
              </div>
            ))}
          </div>

          <div className="fade-up d5" style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <Link href={`/week/${latest.id}`} style={{
              padding: "13px 28px", borderRadius: 8,
              background: "#E8C97A", color: "#1A1610",
              fontSize: 13, fontWeight: 700, letterSpacing: ".06em",
              textTransform: "uppercase", textDecoration: "none",
              fontFamily: "Lato,sans-serif",
            }}>
              This Week →
            </Link>
            <a href="#weeks" style={{
              padding: "13px 28px", borderRadius: 8,
              border: "1.5px solid rgba(255,255,255,.2)",
              color: "rgba(255,255,255,.8)",
              fontSize: 13, fontWeight: 700, letterSpacing: ".06em",
              textTransform: "uppercase", textDecoration: "none",
              fontFamily: "Lato,sans-serif",
            }}>
              All Weeks
            </a>
          </div>
        </div>
      </header>

      {/* WEEK LIBRARY */}
      <section id="weeks" style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px 20px" }}>
        <Eyebrow text="Featured" />
        <SectionTitle text="This Week's Programme" />
        <div style={{ marginBottom: 48 }}>
          <WeekCard week={latest} progress={getProgress(latest.id)} isLatest />
        </div>

        {rest.length > 0 && (
          <>
            <Eyebrow text="Archive" />
            <SectionTitle text="Previous Weeks" />
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
              gap: 20, marginBottom: 56,
            }}>
              {rest.map(w => (
                <WeekCard key={w.id} week={w} progress={getProgress(w.id)} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* PROGRESS SETTINGS */}
      <section style={{
        maxWidth: 1200, margin: "0 auto",
        padding: "0 24px 48px",
      }}>
        <div style={{
          background: "var(--bg2)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}>
          <div>
            <div style={{
              fontSize: 13, fontWeight: 700,
              color: "var(--t1)", marginBottom: 4,
            }}>
              Your Reading Progress
            </div>
            <div style={{ fontSize: 12, color: "var(--tm)" }}>
              Back up your progress or restore it on another device.
            </div>
          </div>
          <ProgressBackup onImported={() => window.location.reload()} />
        </div>
      </section>

      <SubscribeSection />
      <Footer />
    </>
  );
}
