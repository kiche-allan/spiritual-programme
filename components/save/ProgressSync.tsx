"use client";
import { useEffect } from "react";
import { startAuth } from "@/lib/auth/client";
import { syncNow } from "@/lib/progress-sync-client";

/** Mount once in the root layout. Starts auth listening and retries queued syncs. */
export function ProgressSync() {
  useEffect(() => {
    startAuth(() => { void syncNow(); });
    const onOnline = () => { void syncNow(); };
    window.addEventListener("online", onOnline);
    return () => window.removeEventListener("online", onOnline);
  }, []);
  return null;
}
