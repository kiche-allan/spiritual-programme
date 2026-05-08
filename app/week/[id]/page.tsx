// app/week/[id]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WEEKS_META } from "@/lib/weeks";
import { getWeekContent } from "@/lib/content/registry";
import { DayReader } from "./DayReader";

export const revalidate = 86400; // rebuild once per day

export async function generateStaticParams() {
  return WEEKS_META.map(w => ({ id: String(w.id) }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const meta = WEEKS_META.find(w => w.id === Number(params.id));
  if (!meta) return {};
  return {
    title: `${meta.title} · Walking With God`,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
    },
  };
}

export default function WeekPage({ params }: { params: { id: string } }) {
  const weekId = Number(params.id);
  const meta = WEEKS_META.find(w => w.id === weekId);
  const days = getWeekContent(weekId);

  if (!meta) notFound();

  return <DayReader meta={meta} days={days ?? []} />;
}

