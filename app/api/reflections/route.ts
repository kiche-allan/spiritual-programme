// app/api/reflections/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getServiceClient } from "@/lib/supabase";

// GET — fetch reflections for a specific week/day
export async function GET(req: NextRequest) {
  const weekId = req.nextUrl.searchParams.get("weekId");
  const dayNum = req.nextUrl.searchParams.get("dayNum");

  if (!weekId || !dayNum) {
    return NextResponse.json({ error: "Missing weekId or dayNum" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("reflections")
    .select("id, created_at, content, display_name, likes")
    .eq("week_id", Number(weekId))
    .eq("day_num", Number(dayNum))
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ reflections: data ?? [] });
}

// POST — submit a new reflection
export async function POST(req: NextRequest) {
  try {
    const { weekId, dayNum, content, displayName } = await req.json();

    if (!content || content.length < 10 || content.length > 500) {
      return NextResponse.json(
        { error: "Reflection must be between 10 and 500 characters." },
        { status: 400 }
      );
    }

    const db = getServiceClient();
    const { data, error } = await db
      .from("reflections")
      .insert({
        week_id: weekId,
        day_num: dayNum,
        content: content.trim(),
        display_name: displayName?.trim() || "Anonymous",
      })
      .select("id")
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, id: data.id });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
