"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useAllProgress } from "@/hooks/useProgress";
import { KEYS, lsGet, lsSet, useAuthState } from "@/lib/auth/client";
import { countDone, shouldShowNudge } from "@/lib/progress-sync";
import { TextButton } from "@/components/save/ui";

export function SaveProgressNudge() {
  const auth = useAuthState();
  const store = useAllProgress();
  const [dismissedAt, setDismissedAt] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = lsGet(KEYS.nudgeDismissed);
    const n = raw ? Number(raw) : NaN;
    setDismissedAt(Number.isFinite(n) ? n : null);
    setReady(true);
  }, []);

  const show =
    ready &&
    shouldShowNudge({
      signedOut: auth.status === "signedOut",
      doneCount: countDone(store),
      dismissedAt,
    });
  if (!show) return null;

  const dismiss = () => {
    const now = Date.now();
    lsSet(KEYS.nudgeDismissed, String(now));
    setDismissedAt(now);
  };

  return (
    <section
      aria-labelledby="save-nudge-title"
      data-testid="save-progress-nudge"
      className="mx-auto my-6 w-full max-w-[720px] rounded-2xl border border-sp-tintline bg-sp-tint p-5 font-sans text-sp-ink"
    >
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-1 shrink-0 text-sp-rust" size={26} aria-hidden="true" />
        <div>
          <h2 id="save-nudge-title" className="font-serif text-[1.35rem] font-semibold leading-snug">
            Your progress is only on this phone
          </h2>
          <p className="mt-1 text-[15px] leading-relaxed text-sp-muted">
            Clear your browser data or change phones and it is gone. Save it to a free account and it follows you.
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-1">
        <Link
          href="/save-progress"
          className="inline-flex h-[52px] w-full items-center justify-center rounded-[14px] bg-sp-rust px-5 text-[16px] font-bold text-white hover:bg-[#8f3320] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sp-rust"
        >
          Save my progress
        </Link>
        <TextButton onClick={dismiss} className="self-center">Maybe later</TextButton>
      </div>
    </section>
  );
}
