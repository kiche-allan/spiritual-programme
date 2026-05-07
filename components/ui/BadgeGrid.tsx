// components/ui/BadgeGrid.tsx
"use client";
import type { Badge } from "@/lib/badges";

interface Props { badges: Badge[]; }

export function BadgeGrid({ badges }: Props) {
  const earned = badges.filter(b => b.earned);
  const unearned = badges.filter(b => !b.earned);

  return (
    <div>
      {earned.length === 0 && (
        <p style={{ fontSize: 13, color: "var(--tl)", fontStyle: "italic", marginBottom: 20 }}>
          Start reading to earn your first badge.
        </p>
      )}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 10, marginBottom: 20,
      }}>
        {/* Earned badges first */}
        {earned.map(b => (
          <BadgeCard key={b.id} badge={b} />
        ))}
        {/* Locked badges */}
        {unearned.map(b => (
          <BadgeCard key={b.id} badge={b} locked />
        ))}
      </div>
    </div>
  );
}

function BadgeCard({ badge, locked }: { badge: Badge; locked?: boolean }) {
  const earnedDate = badge.earnedAt
    ? new Date(badge.earnedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : null;

  return (
    <div style={{
      background: locked ? "var(--bg2)" : "var(--bg2)",
      border: `1px solid ${locked ? "var(--border)" : "#BF8B3A"}`,
      borderRadius: 12, padding: "16px",
      opacity: locked ? 0.45 : 1,
      transition: "opacity .2s",
      position: "relative",
    }}>
      {!locked && (
        <div style={{
          position: "absolute", top: 8, right: 8,
          width: 8, height: 8, borderRadius: "50%",
          background: "#2E6B50",
        }} />
      )}
      <div style={{ fontSize: 32, marginBottom: 8 }}>{badge.emoji}</div>
      <div style={{
        fontSize: 12, fontWeight: 700, color: locked ? "var(--tl)" : "var(--t1)",
        marginBottom: 4,
      }}>
        {badge.title}
      </div>
      <div style={{ fontSize: 11, color: "var(--tm)", lineHeight: 1.5 }}>
        {badge.description}
      </div>
      {earnedDate && (
        <div style={{
          fontSize: 10, color: "#BF8B3A", fontWeight: 700,
          letterSpacing: ".06em", marginTop: 8,
        }}>
          Earned {earnedDate}
        </div>
      )}
    </div>
  );
}
