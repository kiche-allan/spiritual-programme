import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { formatDate, shadeColor } from "@/lib/utils";
import type { WeekMeta } from "@/lib/weeks";

interface ContinueCta {
  label: string;
  href: string;
}

interface Props {
  week: WeekMeta;
  progress?: { pct: number; done: number };
  isLatest?: boolean;
  continueCta?: ContinueCta;
}

export function WeekCard({ week, progress, isLatest, continueCta }: Props) {
  const date = formatDate(week.publishedAt);
  const { pct = 0, done = 0 } = progress ?? {};
  const light = shadeColor(week.accentColor, 16);
  const dark = shadeColor(week.accentColor, -28);

  const statusLabel =
    done === 0 ? "Not started"
    : done === week.totalDays ? "✓ Complete"
    : `${done} / ${week.totalDays} days`;

  return (
    <div className={isLatest ? "week-gradient-card week-gradient-card--hero" : "week-gradient-card"}>
      <Link href={`/week/${week.id}`} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
        <div
          className="week-gradient-cover"
          style={{ background: `linear-gradient(135deg, ${light} 0%, ${week.accentColor} 45%, ${dark} 100%)` }}
        >
          <span className="blog-cover-pattern" aria-hidden="true" />
          {isLatest && <span className="week-gradient-badge">This Week</span>}
          <div className="week-gradient-text">
            <span className="week-gradient-label">{week.subtitle}</span>
            <h2 className="week-gradient-title">{week.title}</h2>
            <p className="week-gradient-verse">&ldquo;{week.heroVerse}&rdquo;</p>
            <span className="week-gradient-ref">{week.heroRef}</span>
          </div>
        </div>

        <div className="week-gradient-body">
          <p className="week-gradient-desc">{week.description}</p>

          <div className="week-gradient-tags">
            {week.themes.map(t => (
              <span
                key={t.label}
                className="week-gradient-tag"
                style={{
                  color: t.color,
                  borderColor: `${t.color}50`,
                  backgroundColor: `${t.color}12`,
                }}
              >
                {t.label}
              </span>
            ))}
          </div>

          <div className="week-gradient-meta">
            <span>{statusLabel}</span>
            <span>{date}</span>
          </div>
          <Progress value={pct} className="h-1.5 w-full" />
        </div>
      </Link>

      {continueCta && (
        <div style={{ padding: "0 20px 20px" }}>
          <Link href={continueCta.href} className="week-gradient-continue">
            {continueCta.label}
          </Link>
        </div>
      )}
    </div>
  );
}
