import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getServiceClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

  const { data, error } = await supabase
    .from("post_comments")
    .select("id, created_at, content, display_name")
    .eq("post_slug", slug)
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ comments: data ?? [] });
}

export async function POST(req: NextRequest) {
  try {
    const { slug, content, displayName } = await req.json();

    if (!slug || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (content.length < 5 || content.length > 600) {
      return NextResponse.json(
        { error: "Comment must be between 5 and 600 characters" },
        { status: 400 }
      );
    }

    const db = getServiceClient();
    const { error } = await db
      .from("post_comments")
      .insert({
        post_slug: slug,
        content: content.trim(),
        display_name: displayName?.trim() || "Anonymous",
      });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
