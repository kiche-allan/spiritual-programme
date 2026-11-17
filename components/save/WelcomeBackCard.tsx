"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAllProgress } from "@/hooks/useProgress";
import { KEYS, lsGet, lsRemove, lsSet, useAuthState, wasSignedInBefore } from "@/lib/auth/client";
import { countDone } from "@/lib/progress-sync";
import { TextButton } from "@/components/save/ui";

/** Screen 5: signed out, nothing stored on this device, but it was signed in before. */
export function WelcomeBackCard() {
  const auth = useAuthState();
  const store = useAllProgress();
  const [eligible, setEligible] = useState(false);

  useEffect(() => {
    setEligible(wasSignedInBefore() && !lsGet(KEYS.freshStart));
  }, []);

  if (!eligible || auth.status !== "signedOut" || countDone(store) > 0) return null;

  return (
    <section
      aria-labelledby="welcome-back-title"
      className="mx-auto my-6 w-full max-w-[720px] rounded-2xl border border-sp-tintline bg-sp-tint p-5 font-sans text-sp-ink"
    >
      <h2 id="welcome-back-title" className="font-serif text-[1.5rem] font-semibold">Welcome back</h2>
      <p className="mt-1 text-[15px] text-sp-muted">We cannot see any progress on this device.</p>
      <div className="mt-4 flex flex-col gap-1">
        <Link
          href="/save-progress?restore=1"
          className="inline-flex h-[52px] w-full items-center justify-center rounded-[14px] bg-sp-rust px-5 text-[16px] font-bold text-white hover:bg-[#8f3320] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sp-rust"
        >
          Restore my progress
        </Link>
        <TextButton
          className="self-center"
          onClick={() => { lsRemove(KEYS.wasSignedIn); lsSet(KEYS.freshStart, "1"); setEligible(false); }}
        >
          Start fresh on this phone
        </TextButton>
      </div>
    </section>
  );
}
