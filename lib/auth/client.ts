// lib/auth/client.ts — browser-side auth state (optional accounts; reading never needs one).
"use client";
import { useSyncExternalStore } from "react";
import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

export const KEYS = {
  queue: "wwg_sync_queue",
  lastSync: "wwg_last_sync",
  wasSignedIn: "wwg_was_signed_in",
  nudgeDismissed: "wwg_nudge_dismissed_at",
  freshStart: "wwg_fresh_start",
} as const;

export const EMAIL_LINK_ENABLED = process.env.NEXT_PUBLIC_ENABLE_EMAIL_LINK === "true";

// ── Safe localStorage ───────────────────────────────────────────────────────
export function lsGet(key: string): string | null {
  try { return window.localStorage.getItem(key); } catch { return null; }
}
export function lsSet(key: string, value: string): void {
  try { window.localStorage.setItem(key, value); } catch { /* storage unavailable */ }
}
export function lsRemove(key: string): void {
  try { window.localStorage.removeItem(key); } catch { /* storage unavailable */ }
}

// ── Supabase browser client (null when env is missing, e.g. CI) ─────────────
let client: SupabaseClient | null | undefined;
export function getAuthClient(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  try {
    client = url && anon ? createBrowserClient(url, anon) : null;
  } catch {
    client = null;
  }
  return client;
}

// ── Auth state store ────────────────────────────────────────────────────────
export type AuthState =
  | { status: "loading"; email: null }
  | { status: "signedOut"; email: null }
  | { status: "signedIn"; email: string };

const LOADING: AuthState = { status: "loading", email: null };
let state: AuthState = LOADING;
const listeners = new Set<() => void>();

function setState(next: AuthState) {
  if (next.status === state.status && next.email === state.email) return;
  state = next;
  listeners.forEach(l => l());
}

export function getAuthState(): AuthState {
  return state;
}

export function useAuthState(): AuthState {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => { listeners.delete(cb); }; },
    () => state,
    () => LOADING
  );
}

let started = false;
/** Starts listening once. `onSignedIn` runs on app open with a session and after each sign-in. */
export function startAuth(onSignedIn: () => void): void {
  const c = getAuthClient();
  if (!c) { setState({ status: "signedOut", email: null }); return; }
  if (started) return;
  started = true;

  const apply = (email: string | undefined | null, fire: boolean) => {
    if (email !== undefined && email !== null) {
      lsSet(KEYS.wasSignedIn, "1");
      setState({ status: "signedIn", email });
      if (fire) onSignedIn();
    } else {
      setState({ status: "signedOut", email: null });
    }
  };

  c.auth.getSession()
    .then(({ data }) => apply(data.session ? (data.session.user.email ?? "") : null, true))
    .catch(() => setState({ status: "signedOut", email: null }));

  c.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT") { setState({ status: "signedOut", email: null }); return; }
    if (event === "SIGNED_IN") apply(session ? (session.user.email ?? "") : null, true);
  });
}

/** True when this device has signed in before: the flag, or a surviving Supabase session cookie. */
export function wasSignedInBefore(): boolean {
  if (lsGet(KEYS.wasSignedIn)) return true;
  try { return /(?:^|;\s*)sb-[^=]*-auth-token/.test(document.cookie); } catch { return false; }
}

export async function signOut(): Promise<void> {
  lsRemove(KEYS.queue);
  try { await getAuthClient()?.auth.signOut(); } catch { /* ignore */ }
  setState({ status: "signedOut", email: null });
}

export function callbackUrl(next: string): string {
  return `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
}
