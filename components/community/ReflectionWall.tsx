// components/community/ReflectionWall.tsx
"use client";
import { useState, useEffect, useCallback } from "react";

interface Reflection {
  id: string;
  created_at: string;
  content: string;
  display_name: string;
  likes: number;
}

interface Props {
  weekId: number;
  dayNum: number;
}

export function ReflectionWall({ weekId, dayNum }: Props) {
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/reflections?weekId=${weekId}&dayNum=${dayNum}`);
    const data = await res.json();
    setReflections(data.reflections ?? []);
    setLoading(false);
  }, [weekId, dayNum]);

  useEffect(() => { load(); }, [load]);

  // Load liked IDs from localStorage
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("spp_liked_reflections") ?? "[]");
      setLikedIds(new Set(stored));
    } catch {}
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim().length < 10) return;
    setSubmitting(true);
    await fetch("/api/reflections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weekId, dayNum, content, displayName }),
    });
    setSubmitting(false);
    setSubmitted(true);
    setContent("");
    setDisplayName("");
    load();
  };

  const like = async (id: string) => {
    if (likedIds.has(id)) return;
    const next = new Set(likedIds).add(id);
    setLikedIds(next);
    localStorage.setItem("spp_liked_reflections", JSON.stringify([...next]));
    setReflections(prev => prev.map(r => r.id === id ? { ...r, likes: r.likes + 1 } : r));
    await fetch("/api/reflections/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  };

  const charCount = content.length;
  const overLimit = charCount > 500;

  return (
    <div style={{ marginTop: 32 }}>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: ".2em",
        textTransform: "uppercase", color: "var(--tl)", marginBottom: 16,
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <span>Community Reflections</span>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        <span>{reflections.length}</span>
      </div>

      {/* Submit form */}
      {!submitted ? (
        <form onSubmit={submit} style={{ marginBottom: 24 }}>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Share a brief reflection from today's reading..."
            rows={3}
            style={{
              width: "100%", padding: "12px 14px",
              borderRadius: 8, border: `1.5px solid ${overLimit ? "#7A1A1A" : "var(--border)"}`,
              background: "var(--bg)", color: "var(--t1)",
              fontSize: 14, lineHeight: 1.6, resize: "vertical",
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              outline: "none", boxSizing: "border-box",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, gap: 10, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 8, flex: 1 }}>
              <input
                type="text"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                placeholder="Your name (optional)"
                maxLength={40}
                style={{
                  padding: "8px 12px", borderRadius: 8,
                  border: "1.5px solid var(--border)",
                  background: "var(--bg)", color: "var(--t1)",
                  fontSize: 13, fontFamily: "Lato,sans-serif",
                  outline: "none", width: 180,
                }}
              />
              <span style={{ fontSize: 11, color: overLimit ? "#7A1A1A" : "var(--tl)", alignSelf: "center" }}>
                {charCount}/500
              </span>
            </div>
            <button
              type="submit"
              disabled={submitting || overLimit || content.trim().length < 10}
              style={{
                padding: "9px 18px", borderRadius: 8, border: "none",
                background: "#1A3A6E", color: "#fff",
                fontSize: 12, fontWeight: 700, letterSpacing: ".06em",
                textTransform: "uppercase", cursor: "pointer",
                fontFamily: "Lato,sans-serif",
                opacity: (submitting || overLimit || content.trim().length < 10) ? .5 : 1,
              }}
            >
              {submitting ? "Sharing..." : "Share"}
            </button>
          </div>
        </form>
      ) : (
        <div style={{
          background: "#EBF5EF", border: "1px solid #2E6B50",
          borderRadius: 8, padding: "12px 16px",
          fontSize: 13, color: "#1A3D2E", marginBottom: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span>✓ Your reflection has been shared.</span>
          <button
            onClick={() => setSubmitted(false)}
            style={{ background: "none", border: "none", color: "#1A3D2E", fontSize: 12, cursor: "pointer" }}
          >
            Share another
          </button>
        </div>
      )}

      {/* Reflection list */}
      {loading ? (
        <p style={{ fontSize: 13, color: "var(--tl)", textAlign: "center" }}>Loading reflections...</p>
      ) : reflections.length === 0 ? (
        <p style={{ fontSize: 13, color: "var(--tl)", fontStyle: "italic", textAlign: "center", padding: "20px 0" }}>
          Be the first to share a reflection from today&apos;s reading.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {reflections.map(r => (
            <div key={r.id} style={{
              background: "var(--bg2)", border: "1px solid var(--border)",
              borderRadius: 10, padding: "14px 16px",
            }}>
              <p style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: "1rem", lineHeight: 1.7,
                color: "var(--t2)", margin: "0 0 10px", fontStyle: "italic",
              }}>
                &ldquo;{r.content}&rdquo;
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--tl)" }}>
                  — {r.display_name}
                </span>
                <button
                  onClick={() => like(r.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 5,
                    background: "none", border: "none", cursor: likedIds.has(r.id) ? "default" : "pointer",
                    fontSize: 12, color: likedIds.has(r.id) ? "#8A2040" : "var(--tl)",
                    fontFamily: "Lato,sans-serif", padding: "4px 8px",
                    borderRadius: 6,
                    transition: "color .2s",
                  }}
                >
                  {likedIds.has(r.id) ? "♥" : "♡"} {r.likes}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
