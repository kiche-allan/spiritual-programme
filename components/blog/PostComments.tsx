"use client";
import { useState, useEffect, useCallback } from "react";

interface Comment {
  id: string;
  created_at: string;
  content: string;
  display_name: string;
}

interface Props { slug: string; }

export function PostComments({ slug }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/blog/comments?slug=${slug}`);
    const data = await res.json();
    setComments(data.comments ?? []);
    setLoading(false);
  }, [slug]);

  useEffect(() => { load(); }, [load]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (content.trim().length < 5) {
      setError("Please write at least a few words.");
      return;
    }

    setSubmitting(true);
    const res = await fetch("/api/blog/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, content, displayName }),
    });

    if (res.ok) {
      setSubmitted(true);
      setContent("");
      setDisplayName("");
      load();
    } else {
      const data = await res.json();
      setError(data.error ?? "Something went wrong.");
    }
    setSubmitting(false);
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric", month: "short", year: "numeric",
    });

  const charCount = content.length;
  const overLimit = charCount > 600;

  return (
    <div style={{ marginTop: 48 }}>

      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        marginBottom: 28,
      }}>
        <h3 style={{
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontSize: "1.5rem", fontWeight: 400, color: "var(--t1)",
        }}>
          Reflections
        </h3>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        <span style={{ fontSize: 12, color: "var(--tl)", fontWeight: 700 }}>
          {comments.length}
        </span>
      </div>

      {/* Submit form */}
      {!submitted ? (
        <form onSubmit={submit} style={{ marginBottom: 36 }}>
          <div style={{
            background: "var(--bg2)",
            border: "1px solid var(--border)",
            borderRadius: 12, padding: "16px",
            marginBottom: 0,
          }}>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Share what this post stirred in you..."
              rows={4}
              style={{
                width: "100%", padding: "10px 0",
                border: "none", borderBottom: `1px solid ${overLimit ? "#7A1A1A" : "var(--border)"}`,
                background: "transparent", color: "var(--t1)",
                fontSize: 15, lineHeight: 1.7, resize: "none",
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                outline: "none", boxSizing: "border-box",
                marginBottom: 12,
              }}
            />
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", gap: 10, flexWrap: "wrap",
            }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flex: 1 }}>
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
                <span style={{
                  fontSize: 11,
                  color: overLimit ? "#7A1A1A" : "var(--tl)",
                }}>
                  {charCount}/600
                </span>
              </div>
              <button
                type="submit"
                disabled={submitting || overLimit || content.trim().length < 5}
                style={{
                  padding: "9px 20px", borderRadius: 8, border: "none",
                  background: "#1A3A6E", color: "#fff",
                  fontSize: 12, fontWeight: 700, letterSpacing: ".06em",
                  textTransform: "uppercase", cursor: "pointer",
                  fontFamily: "Lato,sans-serif",
                  opacity: (submitting || overLimit || content.trim().length < 5) ? .5 : 1,
                  transition: "opacity .2s",
                }}
              >
                {submitting ? "Posting..." : "Post Reflection"}
              </button>
            </div>
          </div>
          {error && (
            <p style={{ fontSize: 12, color: "#7A1A1A", marginTop: 8, fontWeight: 600 }}>
              {error}
            </p>
          )}
        </form>
      ) : (
        <div style={{
          background: "#EBF5EF", border: "1px solid #2E6B50",
          borderRadius: 10, padding: "14px 18px",
          fontSize: 13, color: "#1A3D2E", marginBottom: 32,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span>✓ Your reflection has been posted.</span>
          <button
            onClick={() => setSubmitted(false)}
            style={{
              background: "none", border: "none",
              color: "#1A3D2E", fontSize: 12, cursor: "pointer",
            }}
          >
            Post another
          </button>
        </div>
      )}

      {/* Comments list */}
      {loading ? (
        <p style={{ fontSize: 13, color: "var(--tl)", textAlign: "center" }}>
          Loading reflections...
        </p>
      ) : comments.length === 0 ? (
        <p style={{
          fontSize: 13, color: "var(--tl)", fontStyle: "italic",
          textAlign: "center", padding: "24px 0",
        }}>
          No reflections yet. Be the first to share yours.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {comments.map(c => (
            <div key={c.id} style={{
              background: "var(--bg2)",
              border: "1px solid var(--border)",
              borderRadius: 12, padding: "16px 18px",
            }}>
              <p style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: "1.05rem", lineHeight: 1.75,
                color: "var(--t2)", margin: "0 0 10px",
              }}>
                {c.content}
              </p>
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center",
              }}>
                <span style={{
                  fontSize: 12, fontWeight: 700, color: "var(--tl)",
                }}>
                  — {c.display_name}
                </span>
                <span style={{ fontSize: 11, color: "var(--tl)" }}>
                  {formatDate(c.created_at)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
