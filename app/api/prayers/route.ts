// app/api/prayers/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getServiceClient } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("prayer_requests")
    .select("id, created_at, content, display_name, prayer_count")
    .order("created_at", { ascending: false })
    .limit(30);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(
    { prayers: data ?? [] },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    }
  );
}

export async function POST(req: NextRequest) {
  try {
    const { content, displayName } = await req.json();

    if (!content || content.length < 10 || content.length > 400) {
      return NextResponse.json(
        { error: "Prayer request must be between 10 and 400 characters." },
        { status: 400 }
      );
    }

    const db = getServiceClient();
    const { error } = await db
      .from("prayer_requests")
      .insert({
        content: content.trim(),
        display_name: displayName?.trim() || "Anonymous",
      });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
