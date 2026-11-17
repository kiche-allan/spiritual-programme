import { NextResponse } from "next/server";
import { z } from "zod";
import { getRequestUser } from "@/lib/supabase/server";
import { MAX_ITEMS } from "@/lib/progress-sync";

const BodySchema = z.object({
  items: z
    .array(
      z.object({
        week: z.number().int().positive(),
        day: z.number().int().min(1).max(7),
        completed_at: z.string().datetime({ offset: true }).optional(),
      })
    )
    .min(1)
    .max(MAX_ITEMS),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Body must be valid JSON" }, { status: 400 });
  }
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid body. Expected { items: [{ week, day }] } with 1 to 500 items." },
      { status: 400 }
    );
  }

  // Body is validated first so a malformed request is a 400 whoever sends it.
  const session = await getRequestUser(req);
  if (!session) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const { user, client } = session;
  // De-duplicate within the request so one batch cannot conflict with itself.
  const seen = new Map<string, { user_id: string; week: number; day: number; completed_at?: string }>();
  for (const it of parsed.data.items) {
    seen.set(`${it.week}:${it.day}`, {
      user_id: user.id,
      week: it.week,
      day: it.day,
      ...(it.completed_at ? { completed_at: it.completed_at } : {}),
    });
  }

  const { error: upsertError } = await client
    .from("progress")
    .upsert([...seen.values()], { onConflict: "user_id,week,day", ignoreDuplicates: true });
  if (upsertError) {
    return NextResponse.json({ error: "Could not save progress" }, { status: 500 });
  }

  const { data, error } = await client
    .from("progress")
    .select("week, day, completed_at")
    .order("week")
    .order("day");
  if (error) {
    return NextResponse.json({ error: "Could not read progress" }, { status: 500 });
  }
  return NextResponse.json({ items: data ?? [] });
}
