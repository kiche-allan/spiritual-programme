// app/api/subscribe/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getServiceClient } from "@/lib/supabase";
import { buildWelcomeEmail } from "@/lib/email-templates";
import { log, logEvent } from "@/lib/logger";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    logEvent("subscribe.attempt", { email });

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
      logEvent("subscribe.failed", { email, error: error.message });
      await log.flush();
      return NextResponse.json({ error: "Could not subscribe" }, { status: 500 });
    }

    // Send welcome email
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://spiritual-programme.vercel.app";
    const { subject, html } = buildWelcomeEmail({ appUrl });
    const resend = getResendClient();

    if (resend) {
      await resend.emails.send({
        from: "Walking With God <onboarding@resend.dev>",
        to: email,
        subject,
        html,
      });
    } else {
      console.warn("RESEND_API_KEY is not set; skipping welcome email send.");
    }

    logEvent("subscribe.success", { email });
    await log.flush();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    logEvent("subscribe.failed", { error: err instanceof Error ? err.message : String(err) });
    await log.flush();
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
