"use client";
import Link from "next/link";
import { useAuthState } from "@/lib/auth/client";

/** Always available while signed out, so a fully cleared phone can still get to Restore. */
export function SignInLink({ className, color, short }: { className?: string; color?: string; short?: boolean }) {
  const auth = useAuthState();
  if (auth.status === "signedIn") {
    return (
      <Link href="/settings" className={className} style={{ minHeight: 44, display: "inline-flex", alignItems: "center", color, textDecoration: color ? "none" : undefined }}>
        Settings
      </Link>
    );
  }
  return (
    <Link
      href="/save-progress?restore=1"
      className={className}
      style={{ minHeight: 44, display: "inline-flex", alignItems: "center", color, textDecoration: color ? "none" : undefined }}
    >
      {short ? "Sign in" : "Already saved your progress? Sign in"}
    </Link>
  );
}
