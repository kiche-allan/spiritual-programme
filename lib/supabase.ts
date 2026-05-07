// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Browser client — safe, uses anon key, respects RLS
export const supabase = createClient(url, anon);

// Server client — uses service role, bypasses RLS
// Only import this in API routes (server-side), never in components
export function getServiceClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
