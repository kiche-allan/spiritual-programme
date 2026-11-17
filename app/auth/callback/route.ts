import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { safeNext } from "@/lib/progress-sync";

export async function GET(req: Request) {
  const { searchParams, origin } = new URL(req.url);
  const next = safeNext(searchParams.get("next"), "/settings");
  const code = searchParams.get("code");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!code || !url || !anon) {
    return NextResponse.redirect(`${origin}/save-progress?error=1`);
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (list) => list.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
    },
  });
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(`${origin}/save-progress?error=1`);
  }
  return NextResponse.redirect(`${origin}${next}`);
}
