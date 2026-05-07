// app/community/page.tsx
"use client";
import Navbar from "@/components/Navbar";
import { PrayerWall } from "@/components/community/PrayerWall";

export default function CommunityPage() {
  return (
    <>
      <Navbar />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "96px 24px 64px" }}>
        <a href="/" style={{
          fontSize: 11, fontWeight: 700, letterSpacing: ".1em",
          textTransform: "uppercase", color: "var(--tl)",
          textDecoration: "none", display: "inline-block", marginBottom: 16,
        }}>← Back Home</a>

        <h1 style={{
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontSize: "clamp(2rem,4vw,3rem)",
          fontWeight: 300, color: "var(--t1)", marginBottom: 8,
        }}>
          Community
        </h1>
        <p style={{ fontSize: 14, color: "var(--tm)", lineHeight: 1.6, marginBottom: 40 }}>
          You are not walking alone. Share what God is doing, and pray for others.
        </p>

        <PrayerWall />
      </div>
    </>
  );
}
