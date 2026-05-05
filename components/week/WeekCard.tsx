import Link from "next/link";
import { ThemeBadge } from "@/components/ui/ThemeBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatDate } from "@/lib/utils";
import type { WeekMeta } from "@/lib/weeks";

interface Props {
  week: WeekMeta;
  progress?: { pct: number; done: number };
  isLatest?: boolean;
}

export function WeekCard({ week, progress, isLatest }: Props) {
  const date = formatDate(week.publishedAt);
  const { pct = 0, done = 0 } = progress ?? {};

  const statusLabel =
    done === 0 ? "Not started"
    : done === week.totalDays ? "✓ Complete"
    : `${done} / ${week.totalDays} days`;

  return (
    <Link href={`/week/${week.id}`} className="week-card">
      <div style={{ height: 4, background: week.accentColor }} />
      <div style={{ padding: "18px 22px 20px", position: "relative" }}>

        {isLatest && (
          <div style={{
            position: "absolute", top: 18, right: 18,
            background: week.accentColor, color: "#fff",
            fontSize: 9, fontWeight: 700, letterSpacing: ".12em",
            textTransform: "uppercase", padding: "3px 10px", borderRadius: 20,
          }}>
            This Week
          </div>
        )}

        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: ".18em",
          textTransform: "uppercase", color: week.accentColor, marginBottom: 6,
        }}>
          {week.subtitle}
        </div>

        <h2 style={{
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontSize: "clamp(1.2rem,2.5vw,1.55rem)",
          fontWeight: 400, lineHeight: 1.25, color: "var(--t1)", marginBottom: 8,
        }}>
          {week.title}
        </h2>

        <p style={{
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontSize: 13, fontStyle: "italic",
          color: "var(--tm)", lineHeight: 1.6, marginBottom: 12,
        }}>
          &ldquo;{week.heroVerse}&rdquo; — {week.heroRef}
        </p>

        <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--tm)", marginBottom: 14 }}>
          {week.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
          {week.themes.map(t => <ThemeBadge key={t.label} theme={t} />)}
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ fontSize: 11, color: "var(--tl)", fontWeight: 700, letterSpacing: ".06em" }}>
              {statusLabel}
            </span>
            <span style={{ fontSize: 11, color: "var(--tl)" }}>{date}</span>
          </div>
          <ProgressBar pct={pct} />
        </div>

      </div>
    </Link>
  );
}
