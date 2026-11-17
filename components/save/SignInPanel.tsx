"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import {
  EMAIL_LINK_ENABLED, KEYS, callbackUrl, getAuthClient, lsRemove, lsSet,
} from "@/lib/auth/client";
import {
  GoogleIcon, Heading, PrimaryButton, SecondaryButton, TextButton, TextLink,
} from "@/components/save/ui";

const COOLDOWN_SECONDS = 60;
const inputCls =
  "h-[52px] w-full rounded-[14px] border border-sp-line bg-sp-surface px-4 text-[16px] text-sp-ink placeholder:text-sp-muted/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sp-rust";

export function SignInPanel({ mode, hadError }: { mode: "save" | "restore" | "welcomeBack"; hadError?: boolean }) {
  const [step, setStep] = useState<"form" | "sent">("form");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(hadError ? "That sign-in did not work. Please try again." : null);
  const [busy, setBusy] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const next = "/settings";
  const restoring = mode !== "save";

  const requireConsent = (): boolean => {
    if (consent) return true;
    setError("Please tick the box to agree before continuing.");
    return false;
  };

  const google = async () => {
    setError(null);
    if (!requireConsent()) return;
    const c = getAuthClient();
    if (!c) { setError("Saving is not available right now. Your reading still works."); return; }
    setBusy(true);
    const { error: e } = await c.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: callbackUrl(next) },
    });
    if (e) { setError("Could not start Google sign-in. Please try again."); setBusy(false); }
  };

  const sendLink = async () => {
    setError(null);
    const value = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      setError("Enter a valid email address.");
      emailRef.current?.focus();
      return;
    }
    if (!requireConsent()) return;
    const c = getAuthClient();
    if (!c) { setError("Saving is not available right now. Your reading still works."); return; }
    setBusy(true);
    const { error: e } = await c.auth.signInWithOtp({
      email: value,
      options: { emailRedirectTo: callbackUrl(next), shouldCreateUser: true },
    });
    setBusy(false);
    if (e) { setError("We could not send the link just now. Please wait a minute and try again."); return; }
    setEmail(value);
    setStep("sent");
    setCooldown(COOLDOWN_SECONDS);
  };

  if (step === "sent") {
    return (
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sp-tint text-sp-rust">
          <Mail size={30} aria-hidden="true" />
        </div>
        <Heading>Check your email</Heading>
        <p className="mt-3 text-[16px] leading-relaxed text-sp-muted" role="status">
          We sent a sign-in link to <strong className="break-all text-sp-ink">{email}</strong>. Open it on this phone to finish saving your progress.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <a
            href="mailto:"
            className="inline-flex h-[52px] w-full items-center justify-center rounded-[14px] bg-sp-rust px-5 text-[16px] font-bold text-white hover:bg-[#8f3320] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sp-rust"
          >
            Open my email app
          </a>
          <SecondaryButton onClick={sendLink} disabled={cooldown > 0 || busy}>
            {cooldown > 0 ? `Send it again in ${cooldown}s` : "Send it again"}
          </SecondaryButton>
          {error && <p role="alert" className="text-[14px] font-bold text-sp-danger">{error}</p>}
          <TextButton onClick={() => { setStep("form"); setError(null); }} className="self-center">
            Use a different email
          </TextButton>
        </div>
        <p className="mt-4 text-[14px] text-sp-muted">
          Cannot see it? Check your spam or junk folder. The link can take a minute to arrive.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Heading>{mode === "welcomeBack" ? "Welcome back" : restoring ? "Restore your progress" : "Save your progress"}</Heading>
      <p className="mt-2 text-[16px] leading-relaxed text-sp-muted">
        {mode === "welcomeBack"
          ? "We cannot see any progress on this device. Sign in to bring your finished days back."
          : restoring
          ? "Sign in the same way you did before and your finished days will come back."
          : "Free, with no password. Every day you finish will follow you to any phone."}
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <PrimaryButton onClick={google} disabled={busy}>
          <span className="rounded-full bg-white p-1"><GoogleIcon /></span>
          {mode === "welcomeBack" ? "Restore my progress with Google" : "Continue with Google"}
        </PrimaryButton>

        {EMAIL_LINK_ENABLED && (
          <>
            <div className="flex items-center gap-3 text-[14px] text-sp-muted" aria-hidden="true">
              <span className="h-px flex-1 bg-sp-line" />or<span className="h-px flex-1 bg-sp-line" />
            </div>
            <div>
              <label htmlFor="save-email" className="mb-1 block text-[15px] font-bold">Email address</label>
              <input
                id="save-email"
                ref={emailRef}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={inputCls}
              />
            </div>
            <SecondaryButton onClick={sendLink} disabled={busy}>{mode === "welcomeBack" ? "Email me a restore link" : "Email me a sign-in link"}</SecondaryButton>
          </>
        )}

        <label className="flex min-h-[44px] cursor-pointer items-start gap-3 text-[14px] leading-relaxed text-sp-muted">
          <input
            type="checkbox"
            checked={consent}
            onChange={e => setConsent(e.target.checked)}
            className="mt-0.5 h-6 w-6 shrink-0 accent-[#A63D24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sp-rust"
          />
          <span>
            I agree to my email address and finished days being stored so they can follow me to other phones, as described in the{" "}
            <Link href="/privacy" className="font-bold text-sp-rust underline">privacy notice</Link>{" "}
            (Kenya Data Protection Act, 2019).
          </span>
        </label>

        {error && <p role="alert" className="text-[14px] font-bold text-sp-danger">{error}</p>}
      </div>

      <p className="mt-4 text-[14px] leading-relaxed text-sp-muted">
        We only keep your email and the days you have finished. You can delete both at any time in Settings.
      </p>

      <div className="mt-2 flex flex-wrap gap-1">
        {mode === "welcomeBack" ? (
          <TextButton
            onClick={() => { lsRemove(KEYS.wasSignedIn); lsSet(KEYS.freshStart, "1"); window.location.assign("/"); }}
          >
            Start fresh on this phone
          </TextButton>
        ) : (
          <TextLink href="/">Not now</TextLink>
        )}
      </div>
    </div>
  );
}
