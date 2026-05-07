"use client";
import { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

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
    <section id="subscribe" style={{
      background: "var(--bg2)",
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
      padding: "60px 24px", textAlign: "center",
    }}>
      <div style={{ maxWidth: 500, margin: "0 auto" }}>
        <Eyebrow text="Never miss a week" />
        <h2 style={{
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontSize: "clamp(1.8rem,4vw,2.6rem)",
          fontWeight: 300, color: "var(--t1)", lineHeight: 1.2, marginBottom: 12,
        }}>
          A new week, every Monday
        </h2>
        <p style={{ fontSize: 15, color: "var(--tm)", lineHeight: 1.7, marginBottom: 26 }}>
          Subscribe and receive the programme in your inbox every Monday morning.
        </p>

        {status === "ok" ? (
          <div style={{
            background: "#EBF5EF", border: "1px solid #2E6B50",
            borderRadius: 10, padding: "16px 20px", color: "#1A3D2E", fontSize: 14,
          }}>
            ✓ You&apos;re subscribed! New weeks land in your inbox every Monday.
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: "flex", gap: 10, maxWidth: 400, margin: "0 auto" }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                flex: 1, padding: "12px 16px", borderRadius: 8,
                border: `1.5px solid ${status === "err" ? "#7A1A1A" : "var(--border)"}`,
                background: "var(--bg)", color: "var(--t1)",
                fontSize: 14, outline: "none", fontFamily: "Lato,sans-serif",
              }}
            />
            <button type="submit" style={{
              padding: "12px 22px", borderRadius: 8, border: "none",
              background: "#5A2D82", color: "#fff",
              fontSize: 13, fontWeight: 700, letterSpacing: ".06em",
              textTransform: "uppercase", cursor: "pointer",
              fontFamily: "Lato,sans-serif", whiteSpace: "nowrap",
            }}>
              Subscribe
            </button>
          </form>
        )}

        <p style={{ fontSize: 12, color: "var(--tl)", marginTop: 12 }}>
          No spam. Unsubscribe any time.
        </p>
      </div>
    </section>
  );
}
