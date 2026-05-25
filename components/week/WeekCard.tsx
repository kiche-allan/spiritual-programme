import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
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
    <Link href={`/week/${week.id}`} className="block group">
      <Card className="overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">

        <div className="h-1 w-full" style={{ background: week.accentColor }} />

        <CardHeader className="pb-3 relative">
          {isLatest && (
            <span
              className="absolute top-4 right-4 text-[9px] font-bold tracking-widest uppercase text-white px-3 py-1 rounded-full"
              style={{ background: week.accentColor }}
            >
              This Week
            </span>
          )}
          <p
            className="text-[10px] font-bold tracking-[0.18em] uppercase mb-1"
            style={{ color: week.accentColor }}
          >
            {week.subtitle}
          </p>
          <h2 className="font-serif text-xl font-normal leading-tight text-foreground">
            {week.title}
          </h2>
          <p className="font-serif text-sm italic text-muted-foreground leading-relaxed mt-1">
            &ldquo;{week.heroVerse}&rdquo; — {week.heroRef}
          </p>
        </CardHeader>

        <CardContent className="pb-3">
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {week.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {week.themes.map(t => (
              <Badge
                key={t.label}
                variant="outline"
                className="text-[9px] font-bold tracking-wide uppercase rounded-full"
                style={{
                  color: t.color,
                  borderColor: `${t.color}50`,
                  backgroundColor: `${t.color}12`,
                }}
              >
                {t.label}
              </Badge>
            ))}
          </div>
        </CardContent>

        <Separator />

        <CardFooter className="pt-3 flex flex-col gap-2">
          <div className="flex justify-between items-center w-full">
            <span className="text-[11px] font-bold tracking-wide text-muted-foreground">
              {statusLabel}
            </span>
            <span className="text-[11px] text-muted-foreground">{date}</span>
          </div>
          <Progress value={pct} className="h-1.5 w-full" />
        </CardFooter>

      </Card>
    </Link>
  );
}
