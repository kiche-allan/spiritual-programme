// app/blog/page.tsx
"use client";
import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import { BlogCard } from "@/components/blog/BlogCard";
import { TagFilterTabs } from "@/components/blog/TagFilterTabs";
import { SeriesPanel } from "@/components/blog/SeriesPanel";
import { getStandalonePosts } from "@/lib/blog-content";

export default function BlogIndexPage() {
  const posts = getStandalonePosts();
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = useMemo(() => {
    const all = posts.flatMap(p => p.tags);
    return [...new Set(all)].sort();
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(p => {
      const matchesTag = !activeTag || p.tags.includes(activeTag);
      const matchesQuery = !q
        || p.title.toLowerCase().includes(q)
        || p.excerpt.toLowerCase().includes(q)
        || p.tags.some(t => t.toLowerCase().includes(q));
      return matchesTag && matchesQuery;
    });
  }, [posts, query, activeTag]);

  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <header style={{
        background: "var(--hero)", color: "var(--hero-t)",
        padding: "72px 24px 48px", textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: .03,
          backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)",
          backgroundSize: "50px 50px", pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 600, margin: "0 auto", position: "relative" }}>
          <div style={{
            fontFamily: "Lato,sans-serif",
            fontSize: 10, fontWeight: 700, letterSpacing: ".22em",
            textTransform: "uppercase", color: "var(--hero-a)", marginBottom: 12,
          }}>
            Spiritual Blog
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond',Georgia,serif",
            fontSize: "clamp(2.2rem,5vw,3.2rem)",
            fontWeight: 300, lineHeight: 1.15, marginBottom: 12,
          }}>
            Thoughts on the{" "}
            <em style={{ fontStyle: "italic", color: "#E8C97A" }}>Walking Life</em>
          </h1>
          <p style={{
            fontFamily: "'Cormorant Garamond',Georgia,serif",
            fontSize: "clamp(1rem,1.5vw,1.1rem)",
            color: "var(--hero-a)", lineHeight: 1.75,
            fontStyle: "italic", fontWeight: 300,
          }}>
            Reflections on faith, prayer, Scripture, and what it means to walk with God.
          </p>
        </div>
      </header>

      {/* ── FILTER BAR ── */}
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "28px 24px 0",
        display: "flex", flexDirection: "column", gap: 16,
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "var(--bg2)",
          border: "1px solid var(--border)",
          borderRadius: 8, padding: "10px 14px",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="var(--tl)" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search posts by topic or keyword..."
            style={{
              flex: 1, border: "none", outline: "none", background: "transparent",
              fontFamily: "Lato,sans-serif", fontSize: 13, color: "var(--t1)",
            }}
          />
        </div>

        <TagFilterTabs tags={tags} active={activeTag} onChange={setActiveTag} />
      </div>

      {/* ── LAYOUT: GRID + SIDEBAR ── */}
      <div className="blog-layout" style={{
        maxWidth: 1200, margin: "0 auto", padding: "24px 24px 64px",
        display: "grid", gridTemplateColumns: "1fr 300px", gap: 40,
        alignItems: "start",
      }}>
        <main>
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", marginBottom: 18,
          }}>
            <span style={{
              fontFamily: "Lato,sans-serif",
              fontSize: 9, fontWeight: 700, letterSpacing: ".18em",
              textTransform: "uppercase", color: "var(--tl)",
            }}>
              {filtered.length} article{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {filtered.length === 0 ? (
            <p style={{
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              fontSize: "1.3rem", color: "var(--tm)",
              fontStyle: "italic", textAlign: "center", padding: "60px 0",
            }}>
              No posts match your search yet.
            </p>
          ) : (
            <div className="blog-card-grid">
              {filtered.map(post => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </main>

        <aside style={{ position: "sticky", top: 76 }}>
          <SeriesPanel />
        </aside>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{
        background: "var(--bg2)", borderTop: "1px solid var(--border)",
        padding: "32px 24px", textAlign: "center",
      }}>
        <p style={{
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontSize: 17, fontStyle: "italic",
          color: "var(--tm)", marginBottom: 5,
        }}>
          &ldquo;Let the message of Christ dwell among you richly.&rdquo;
        </p>
        <p style={{
          fontFamily: "Lato,sans-serif",
          fontSize: 11, fontWeight: 700, letterSpacing: ".1em",
          textTransform: "uppercase", color: "var(--tl)",
        }}>
          Colossians 3:16
        </p>
      </footer>

      <style>{`
        @media (max-width: 900px) {
          .blog-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
