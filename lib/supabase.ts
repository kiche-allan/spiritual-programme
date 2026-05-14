
// lib/supabase.ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required.`);
  }
  return value;
}

let browserClient: SupabaseClient | null = null;

function getBrowserClient() {
  if (!browserClient) {
    const url = getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL");
    const anon = getRequiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
    browserClient = createClient(url, anon);
  }

  return browserClient;
}

// Browser-like shared client, initialized lazily so build-time imports do not fail.
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    const client = getBrowserClient();
    return Reflect.get(client as object, prop, receiver);
  },
});

// Server client — uses service role, bypasses RLS
// Only import this in API routes (server-side), never in components
export function getServiceClient() {
  const url = getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceKey = getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
