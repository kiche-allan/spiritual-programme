"use client";
import { useState, useEffect } from "react";

const REACTIONS = [
  { key: "like",  emoji: "👍", label: "Like"  },
  { key: "fire",  emoji: "🔥", label: "Fire"  },
  { key: "pray",  emoji: "🙏", label: "Pray"  },
  { key: "amen",  emoji: "✝️",  label: "Amen"  },
];

interface Props { slug: string; }

export function PostReactions({ slug }: Props) {
  const [counts, setCounts] = useState<Record<string, number>>(
    { like: 0, fire: 0, pray: 0, amen: 0 }
  );
  const [reacted, setReacted] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load reaction counts
    fetch(`/api/blog/reactions?slug=${slug}`)
      .then(r => r.json())
      .then(d => { setCounts(d.counts ?? {}); setLoading(false); });

    // Load which reactions this user has already made (localStorage)
    try {
      const stored = JSON.parse(
        localStorage.getItem(`spp_blog_reactions_${slug}`) ?? "[]"
      );
      setReacted(new Set(stored));
    } catch {}
  }, [slug]);

  const handleReact = async (reaction: string) => {
    if (reacted.has(reaction)) return;

    // Optimistic update
    setCounts(prev => ({ ...prev, [reaction]: (prev[reaction] ?? 0) + 1 }));
    const next = new Set(reacted).add(reaction);
    setReacted(next);
    localStorage.setItem(
      `spp_blog_reactions_${slug}`,
      JSON.stringify([...next])
    );

    await fetch("/api/blog/reactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, reaction }),
    });
  };

  const total = Object.values(counts).reduce((s, v) => s + v, 0);

  return (
    <div style={{
      background: "var(--bg2)",
      border: "1px solid var(--border)",
      borderRadius: 14, padding: "20px 24px",
      textAlign: "center",
    }}>
      <p style={{
        fontSize: 13, color: "var(--tm)",
        marginBottom: 16, lineHeight: 1.5,
      }}>
        Did this post speak to you?
      </p>

      <div style={{
        display: "flex", justifyContent: "center",
        gap: 12, marginBottom: 14, flexWrap: "wrap",
      }}>
        {REACTIONS.map(r => {
          const hasReacted = reacted.has(r.key);
          return (
            <button
              key={r.key}
              onClick={() => handleReact(r.key)}
              disabled={loading}
              title={r.label}
              style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", gap: 4,
                padding: "10px 16px", borderRadius: 10,
                border: `1.5px solid ${hasReacted ? "#BF8B3A" : "var(--border)"}`,
                background: hasReacted ? "#FDF5E0" : "var(--bg)",
                cursor: hasReacted ? "default" : "pointer",
                transition: "all .2s",
                minWidth: 60,
              }}
            >
              <span style={{ fontSize: 22 }}>{r.emoji}</span>
              <span style={{
                fontSize: 11, fontWeight: 700,
                color: hasReacted ? "#BF8B3A" : "var(--tl)",
                letterSpacing: ".04em",
              }}>
                {counts[r.key] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      {total > 0 && (
        <p style={{ fontSize: 12, color: "var(--tl)" }}>
          {total} {total === 1 ? "person has" : "people have"} responded to this post
        </p>
      )}
    </div>
  );
}
