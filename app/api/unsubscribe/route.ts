// app/api/unsubscribe/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return new NextResponse("Missing token", { status: 400 });
  }

  const db = getServiceClient();
  const { error } = await db
    .from("subscribers")
    .delete()
    .eq("unsubscribe_token", token);

  if (error) {
    return new NextResponse("Could not unsubscribe. Please try again.", { status: 500 });
  }

  // Return a simple HTML confirmation page
  return new NextResponse(
    `<!DOCTYPE html><html><body style="font-family:sans-serif;text-align:center;padding:80px 24px;">
      <h2>You've been unsubscribed.</h2>
      <p style="color:#7A6E62;">You will no longer receive daily emails.</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color:#1A3A6E;">← Back to the programme</a>
    </body></html>`,
    { headers: { "Content-Type": "text/html" } }
  );
}
