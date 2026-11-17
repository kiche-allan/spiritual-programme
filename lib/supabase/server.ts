// lib/supabase/server.ts — user-scoped Supabase client for route handlers (RLS applies).
import { createServerClient } from "@supabase/ssr";
import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export function hasSupabaseEnv(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

/**
 * Resolves the signed-in user for a request. Accepts either a Bearer token
 * (API clients, Postman) or the Supabase session cookie (the browser).
 * Returns the user and a client that acts as that user, or null when signed out.
 */
export async function getRequestUser(
  req: Request
): Promise<{ user: User; client: SupabaseClient } | null> {
  if (!hasSupabaseEnv()) return null;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

  const auth = req.headers.get("authorization") ?? "";
  const bearer = /^Bearer\s+(.+)$/i.exec(auth)?.[1];
  if (bearer) {
    const client = createClient(url, anon, {
      global: { headers: { Authorization: `Bearer ${bearer}` } },
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { data, error } = await client.auth.getUser(bearer);
    if (error || !data.user) return null;
    return { user: data.user, client };
  }

  const cookieStore = await cookies();
  const client = createServerClient(url, anon, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (list) => {
        try {
          list.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // read-only context; the browser client refreshes cookies itself
        }
      },
    },
  });
  const { data, error } = await client.auth.getUser();
  if (error || !data.user) return null;
  return { user: data.user, client };
}
