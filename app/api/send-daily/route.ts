// app/api/send-daily/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getServiceClient } from "@/lib/supabase";
import { getWeekContent } from "@/lib/content";
import { WEEKS_META } from "@/lib/weeks";
import { buildDailyEmail } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);
const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

// Protect this route with a secret so only your cron can call it
const CRON_SECRET = process.env.CRON_SECRET ?? "change-me";

export async function POST(req: NextRequest) {
  // Auth check — accept either a bearer token or Vercel's cron header
  const auth = req.headers.get("authorization");
  const isVercelCron = req.headers.get("x-vercel-cron") === "1";
  if (!isVercelCron && auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getServiceClient();

  // Get all confirmed subscribers
  const { data: subscribers, error } = await db
    .from("subscribers")
    .select("id, email, current_week_id, current_day_num, unsubscribe_token")
    .eq("confirmed", true);

  if (error || !subscribers) {
    return NextResponse.json({ error: "Could not fetch subscribers" }, { status: 500 });
  }

  let sent = 0;
  let failed = 0;

  for (const sub of subscribers) {
    const weekMeta = WEEKS_META.find(w => w.id === sub.current_week_id);
    const days = weekMeta ? getWeekContent(sub.current_week_id) : null;
    const day = days?.find(d => d.num === sub.current_day_num);

    if (!weekMeta || !day) {
      // Subscriber has finished all weeks — skip
      continue;
    }

    const { subject, html } = buildDailyEmail({
      day,
      week: weekMeta,
      appUrl: APP_URL,
      unsubscribeToken: sub.unsubscribe_token,
    });

    try {
      await resend.emails.send({
        from: "Walking With God <devotional@resend.dev>",
        to: sub.email,
        subject,
        html,
      });

      // Advance their position for tomorrow
      let nextWeekId = sub.current_week_id;
      let nextDayNum = sub.current_day_num + 1;

      if (nextDayNum > (days?.length ?? 7)) {
        nextDayNum = 1;
        nextWeekId = sub.current_week_id + 1;
        // If they've gone past the last week, loop back to week 1
        if (!WEEKS_META.find(w => w.id === nextWeekId)) {
          nextWeekId = 1;
        }
      }

      await db
        .from("subscribers")
        .update({ current_week_id: nextWeekId, current_day_num: nextDayNum })
        .eq("id", sub.id);

      sent++;
    } catch (err) {
      console.error(`Failed to send to ${sub.email}:`, err);
      failed++;
    }
  }

  return NextResponse.json({ sent, failed, total: subscribers.length });
}
