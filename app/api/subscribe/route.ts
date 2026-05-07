// app/api/subscribe/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const db = getServiceClient();

    // Upsert — if they already subscribed, this is a no-op
    const { error } = await db
      .from("subscribers")
      .upsert({ email, confirmed: true }, { onConflict: "email" });

    if (error) {
      console.error("Subscribe error:", error);
      return NextResponse.json({ error: "Could not subscribe" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
