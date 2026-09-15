"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SubscribeSection } from "@/components/layout/SubscribeSection";
import { WeekCard } from "@/components/week/WeekCard";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProgressBackup } from "@/components/ui/ProgressBackup";
import { Pagination } from "@/components/ui/Pagination";
import { BibleStories } from "@/components/home/BibleStories";
import { useAllProgress } from "@/hooks/useProgress";
import { WEEKS_META, weekProgress } from "@/lib/weeks";

const WEEKS_PER_PAGE = 10;

export default function HomePage() {
  const store = useAllProgress();
  const [page, setPage] = useState(1);

  const sorted = useMemo(
    () => [...WEEKS_META].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    ),
    []
  );

  const latest = sorted[0];
  const rest = sorted.slice(1);
  const totalPages = Math.max(1, Math.ceil(rest.length / WEEKS_PER_PAGE));
  const pagedRest = rest.slice((page - 1) * WEEKS_PER_PAGE, page * WEEKS_PER_PAGE);

  const goToPage = (p: number) => {
    setPage(Math.min(Math.max(1, p), totalPages));
    document.getElementById("weeks")?.scrollIntoView({ block: "start" });
  };

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
        <div style={{ marginBottom: 16 }}>
  {/* Hope · Faith · Purpose */}
      <div style={{
        fontFamily: "Lato,sans-serif",
        fontSize: 10, fontWeight: 700, letterSpacing: ".32em",
        textTransform: "uppercase",
        color: "#E8C97A",
        marginBottom: 8,
      }}>
        Hope &nbsp;·&nbsp; Faith &nbsp;·&nbsp; Purpose
      </div>
      {/* Weekly Devotional Programme */}
      <div style={{
        fontFamily: "Lato,sans-serif",
        fontSize: 11, fontWeight: 700, letterSpacing: ".22em",
        textTransform: "uppercase", color: "var(--hero-a)",
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
      <section id="weeks" className="home-library" style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px 20px" }}>
        <div className="featured-week-intro">
          <div>
            <Eyebrow text="Begin here" />
            <SectionTitle text="This Week's Programme" />
            <p className="featured-week-lede">
              Seven days to slow down, listen closely, and make room for what God is doing in you now.
            </p>
          </div>
          <Link className="text-link" href={`/week/${latest.id}`}>
            Open this week <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="featured-week-layout">
          <div className="featured-week-note">
            <span className="featured-week-kicker">{latest.subtitle}</span>
            <h2>{latest.title}</h2>
            <p>{latest.description}</p>
            <div className="featured-week-statline">
              <span><strong>{latest.totalDays}</strong> days</span>
              <span><strong>{getProgress(latest.id).done}</strong> completed</span>
            </div>
          </div>
          <WeekCard week={latest} progress={getProgress(latest.id)} isLatest />
        </div>

        {rest.length > 0 && (
          <>
            <Eyebrow text="Archive" />
            <SectionTitle text="Previous Weeks" />
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
              gap: 20, marginBottom: 20,
            }}>
              {pagedRest.map(w => (
                <WeekCard key={w.id} week={w} progress={getProgress(w.id)} />
              ))}
            </div>
            <Pagination page={page} totalPages={totalPages} onChange={goToPage} />
          </>
        )}
      </section>

      <BibleStories />

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
