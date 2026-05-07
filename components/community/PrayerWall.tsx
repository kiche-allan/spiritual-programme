// components/community/PrayerWall.tsx
"use client";
import { useState, useEffect } from "react";

interface Prayer {
  id: string;
  created_at: string;
  content: string;
  display_name: string;
  prayer_count: number;
}

export function PrayerWall() {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [prayedIds, setPrayedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch("/api/prayers")
      .then(r => r.json())
      .then(d => { setPrayers(d.prayers ?? []); setLoading(false); });

    try {
      const stored = JSON.parse(localStorage.getItem("spp_prayed_for") ?? "[]");
      setPrayedIds(new Set(stored));
    } catch {}
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim().length < 10) return;
    setSubmitting(true);
    await fetch("/api/prayers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, displayName }),
    });
    setSubmitting(false);
    setSubmitted(true);
    setContent(""); setDisplayName("");
    const r = await fetch("/api/prayers");
    const d = await r.json();
    setPrayers(d.prayers ?? []);
  };

  const pray = async (id: string) => {
    if (prayedIds.has(id)) return;
    const next = new Set(prayedIds).add(id);
    setPrayedIds(next);
    localStorage.setItem("spp_prayed_for", JSON.stringify([...next]));
    setPrayers(prev => prev.map(p => p.id === id ? { ...p, prayer_count: p.prayer_count + 1 } : p));
    await fetch("/api/prayers/pray", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  };

  return (
    <div>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: ".2em",
        textTransform: "uppercase", color: "var(--tl)", marginBottom: 16,
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <span>Prayer Requests</span>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
      </div>

      {!submitted ? (
        <form onSubmit={submit} style={{ marginBottom: 24 }}>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Share a prayer request anonymously..."
            rows={3}
            style={{
              width: "100%", padding: "12px 14px", borderRadius: 8,
              border: "1.5px solid var(--border)",
              background: "var(--bg)", color: "var(--t1)",
              fontSize: 14, lineHeight: 1.6, resize: "vertical",
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              outline: "none", boxSizing: "border-box",
            }}
          />
          <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
            <input
              type="text"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              placeholder="Your name (optional)"
              maxLength={40}
              style={{
                flex: 1, padding: "8px 12px", borderRadius: 8,
                border: "1.5px solid var(--border)",
                background: "var(--bg)", color: "var(--t1)",
                fontSize: 13, fontFamily: "Lato,sans-serif", outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={submitting || content.trim().length < 10}
              style={{
                padding: "9px 18px", borderRadius: 8, border: "none",
                background: "#8A2040", color: "#fff",
                fontSize: 12, fontWeight: 700, letterSpacing: ".06em",
                textTransform: "uppercase", cursor: "pointer",
                fontFamily: "Lato,sans-serif",
                opacity: (submitting || content.trim().length < 10) ? .5 : 1,
              }}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      ) : (
        <div style={{
          background: "#FAF0F4", border: "1px solid #8A2040",
          borderRadius: 8, padding: "12px 16px",
          fontSize: 13, color: "#3D0A1A", marginBottom: 24,
        }}>
          ✓ Your prayer request has been shared. We are praying with you.
        </div>
      )}

      {loading ? (
        <p style={{ fontSize: 13, color: "var(--tl)", textAlign: "center" }}>Loading...</p>
      ) : prayers.length === 0 ? (
        <p style={{ fontSize: 13, color: "var(--tl)", fontStyle: "italic", textAlign: "center", padding: "20px 0" }}>
          No prayer requests yet. Be the first to share.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {prayers.map(p => (
            <div key={p.id} style={{
              background: "var(--bg2)", border: "1px solid var(--border)",
              borderRadius: 10, padding: "14px 16px",
            }}>
              <p style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: "1rem", lineHeight: 1.7,
                color: "var(--t2)", margin: "0 0 10px",
              }}>
                {p.content}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--tl)" }}>
                  — {p.display_name}
                </span>
                <button
                  onClick={() => pray(p.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 5,
                    background: "none", border: "none",
                    cursor: prayedIds.has(p.id) ? "default" : "pointer",
                    fontSize: 12,
                    color: prayedIds.has(p.id) ? "#8A2040" : "var(--tl)",
                    fontFamily: "Lato,sans-serif", padding: "4px 8px",
                  }}
                >
                  🙏 {p.prayer_count} {p.prayer_count === 1 ? "person praying" : "people praying"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
