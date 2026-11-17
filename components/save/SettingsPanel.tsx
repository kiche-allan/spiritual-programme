"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, ShieldCheck } from "lucide-react";
import { useAllProgress } from "@/hooks/useProgress";
import { KEYS, getAuthClient, lsRemove, signOut, useAuthState } from "@/lib/auth/client";
import { getLastSync, PROGRESS_EVENT, syncNow } from "@/lib/progress-sync-client";
import { countDone } from "@/lib/progress-sync";
import { WEEKS_META } from "@/lib/weeks";
import { Heading, PrimaryButton, SecondaryButton, Shell, TextButton } from "@/components/save/ui";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";

function syncedLabel(d: Date | null, now: number): string {
  if (!d) return "Not synced yet";
  const mins = Math.floor((now - d.getTime()) / 60000);
  if (mins < 1) return "Synced just now";
  if (mins < 60) return `Synced ${mins} minute${mins === 1 ? "" : "s"} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `Synced ${hrs} hour${hrs === 1 ? "" : "s"} ago`;
  return `Synced on ${d.toLocaleDateString("en-GB", { day: "numeric", month: "long" })}`;
}

export function SettingsPanel() {
  const auth = useAuthState();
  const store = useAllProgress();
  const [last, setLast] = useState<Date | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const refresh = () => { setLast(getLastSync()); setNow(Date.now()); };
    refresh();
    window.addEventListener(PROGRESS_EVENT, refresh);
    const t = setInterval(refresh, 30000);
    return () => { window.removeEventListener(PROGRESS_EVENT, refresh); clearInterval(t); };
  }, []);

  const total = countDone(store);
  const weeksWithDays = WEEKS_META.filter(w => Object.values(store[String(w.id)] ?? {}).some(Boolean));

  const deleteAccount = async () => {
    setBusy(true);
    setError(null);
    try {
      const { data } = (await getAuthClient()?.auth.getSession()) ?? { data: { session: null } };
      const res = await fetch("/api/account", {
        method: "DELETE",
        headers: data.session ? { Authorization: `Bearer ${data.session.access_token}` } : {},
      });
      if (res.status !== 204) throw new Error("failed");
      lsRemove(KEYS.wasSignedIn);
      lsRemove(KEYS.lastSync);
      await signOut();
      window.location.assign("/");
    } catch {
      setError("We could not delete your account just now. Please try again.");
      setBusy(false);
    }
  };

  if (auth.status === "loading") return <Shell><p className="text-sp-muted" role="status">Loading…</p></Shell>;

  if (auth.status === "signedOut") {
    return (
      <Shell>
        <Heading>Settings</Heading>
        <p className="mt-3 text-[16px] leading-relaxed text-sp-muted">
          You are not signed in. Your progress is saved on this phone only. You can save it to a free account whenever you like.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/save-progress"
            className="inline-flex h-[52px] w-full items-center justify-center rounded-[14px] bg-sp-rust px-5 text-[16px] font-bold text-white hover:bg-[#8f3320] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sp-rust"
          >
            Save my progress
          </Link>
          <Link href="/save-progress?restore=1" className="inline-flex min-h-[44px] items-center justify-center text-[15px] font-bold text-sp-muted underline underline-offset-4">
            Already saved your progress? Sign in
          </Link>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sp-green text-white">
          <Check size={32} aria-hidden="true" />
        </div>
        <Heading>Your progress is saved</Heading>
        <p className="mt-3 text-[16px] leading-relaxed text-sp-muted">
          {total} {total === 1 ? "day" : "days"} across {weeksWithDays.length} {weeksWithDays.length === 1 ? "week" : "weeks"} are now on your account as well as on this phone.
        </p>
      </div>

      <section aria-label="Progress by week" className="mt-6 rounded-2xl border border-sp-line bg-sp-surface p-4">
        <ul className="flex flex-col gap-3">
          {weeksWithDays.map(w => {
            const done = Object.values(store[String(w.id)] ?? {}).filter(Boolean).length;
            return (
              <li key={w.id}>
                <div className="flex justify-between gap-3 text-[14px]">
                  <span className="font-bold">{w.subtitle}: {w.title}</span>
                  <span className="shrink-0 text-sp-muted">{done}/{w.totalDays}</span>
                </div>
                <div
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={w.totalDays}
                  aria-valuenow={done}
                  aria-label={`${w.title}: ${done} of ${w.totalDays} days`}
                  className="mt-1 h-2 overflow-hidden rounded-full bg-sp-line"
                >
                  <div className="h-full rounded-full bg-sp-green" style={{ width: `${(done / w.totalDays) * 100}%` }} />
                </div>
              </li>
            );
          })}
          {weeksWithDays.length === 0 && <li className="text-[14px] text-sp-muted">No finished days yet.</li>}
        </ul>
      </section>

      <section className="mt-4 rounded-2xl border border-sp-line bg-sp-surface p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 shrink-0 text-sp-green" size={22} aria-hidden="true" />
          <div className="min-w-0">
            <p className="text-[14px] text-sp-muted">Signed in as</p>
            <p className="break-all text-[16px] font-bold">{auth.email}</p>
            <p className="mt-1 text-[14px] text-sp-green" role="status">{syncedLabel(last, now)}</p>
          </div>
        </div>
        <p className="mt-3 text-[14px] text-sp-muted">Works offline. We sync again when you are back online.</p>
        <SecondaryButton className="mt-3" onClick={() => { void syncNow(); }}>Sync now</SecondaryButton>
      </section>

      <div className="mt-6 flex flex-col items-center gap-2">
        <PrimaryButton onClick={async () => { await signOut(); window.location.assign("/"); }}>Sign out</PrimaryButton>
        <p className="text-center text-[13px] text-sp-muted">Signing out keeps your progress on this phone.</p>
        <TextButton onClick={() => setConfirming(true)} className="text-sp-danger">
          Delete my account and progress
        </TextButton>
        <Link href="/privacy" className="min-h-[44px] py-3 text-[14px] font-bold text-sp-muted underline underline-offset-4">Privacy notice</Link>
      </div>

      <Dialog open={confirming} onOpenChange={o => { if (!busy) setConfirming(o); }}>
        <DialogContent className="border-sp-line bg-sp-surface text-sp-ink">
          <DialogHeader>
            <DialogTitle className="font-serif text-[1.5rem]">Delete your account?</DialogTitle>
            <DialogDescription className="text-sp-muted">
              This permanently deletes your email address and the days saved on your account. It cannot be undone. Days saved on this phone are not removed.
            </DialogDescription>
          </DialogHeader>
          {error && <p role="alert" className="text-[14px] font-bold text-sp-danger">{error}</p>}
          <DialogFooter className="gap-2">
            <SecondaryButton onClick={() => setConfirming(false)} disabled={busy}>Keep my account</SecondaryButton>
            <button
              type="button"
              onClick={deleteAccount}
              disabled={busy}
              className="inline-flex h-[52px] w-full items-center justify-center rounded-[14px] bg-sp-danger px-5 text-[16px] font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sp-danger disabled:opacity-60"
            >
              {busy ? "Deleting…" : "Yes, delete everything"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Shell>
  );
}
