"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SignInPanel } from "@/components/save/SignInPanel";
import { Shell } from "@/components/save/ui";
import { useAuthState, wasSignedInBefore } from "@/lib/auth/client";
import { countDone } from "@/lib/progress-sync";
import { loadProgress } from "@/lib/weeks";

export function SaveProgressScreen() {
  const params = useSearchParams();
  const router = useRouter();
  const auth = useAuthState();
  const [mode, setMode] = useState<"save" | "restore" | "welcomeBack" | null>(null);

  useEffect(() => {
    const empty = countDone(loadProgress()) === 0;
    if (empty && (wasSignedInBefore() || params.get("restore") === "1")) setMode("welcomeBack");
    else setMode(params.get("restore") === "1" ? "restore" : "save");
  }, [params]);

  useEffect(() => {
    if (auth.status === "signedIn") router.replace("/settings");
  }, [auth.status, router]);

  return (
    <Shell>
      {mode && auth.status !== "signedIn" && <SignInPanel mode={mode} hadError={params.get("error") === "1"} />}
    </Shell>
  );
}
