"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SubscribeSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) { setStatus("err"); return; }
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("err");
    }
  };

  return (
    <section
      id="subscribe"
      className="bg-card border-y border-border py-16 px-6 text-center"
    >
      <div className="max-w-[500px] mx-auto">
        <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-3">
          Never miss a week
        </div>

        <h2 className="font-serif text-4xl font-light text-foreground leading-tight mb-3">
          A new week, every Monday
        </h2>

        <p className="text-muted-foreground text-[15px] leading-relaxed mb-7 font-serif italic">
          Subscribe and receive the programme in your inbox every Monday morning.
        </p>

        {status === "ok" ? (
          <div className="bg-emerald-50 border border-emerald-600 rounded-lg px-5 py-4 text-emerald-800 text-sm dark:bg-emerald-950 dark:text-emerald-200">
            ✓ You&apos;re subscribed! New weeks land in your inbox every Monday.
          </div>
        ) : (
          <form onSubmit={submit} className="flex gap-2.5 max-w-[400px] mx-auto">
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className={`flex-1 ${status === "err" ? "border-destructive" : ""}`}
            />
            <Button type="submit" className="whitespace-nowrap">
              Subscribe
            </Button>
          </form>
        )}

        {status === "err" && (
          <p className="text-destructive text-xs mt-2 font-semibold">
            Please enter a valid email address.
          </p>
        )}

        <p className="text-muted-foreground text-xs mt-3">
          No spam. Unsubscribe any time.
        </p>
      </div>
    </section>
  );
}
