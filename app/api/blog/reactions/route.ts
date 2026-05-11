import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getServiceClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

  const { data, error } = await supabase
    .from("post_reactions")
    .select("reaction")
    .eq("post_slug", slug);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Count each reaction type
  const counts: Record<string, number> = { like: 0, fire: 0, pray: 0, amen: 0 };
  for (const row of data ?? []) {
    if (counts[row.reaction] !== undefined) counts[row.reaction]++;
  }

  return NextResponse.json({ counts });
}

export async function POST(req: NextRequest) {
  const { slug, reaction } = await req.json();

  if (!slug || !reaction) {
    return NextResponse.json({ error: "Missing slug or reaction" }, { status: 400 });
  }

  const validReactions = ["like", "fire", "pray", "amen"];
  if (!validReactions.includes(reaction)) {
    return NextResponse.json({ error: "Invalid reaction" }, { status: 400 });
  }

  const db = getServiceClient();
  const { error } = await db
    .from("post_reactions")
    .insert({ post_slug: slug, reaction });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
