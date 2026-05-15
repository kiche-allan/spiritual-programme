// app/blog/[slug]/page.tsx
"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { PostReactions } from "@/components/blog/PostReactions";
import { PostComments } from "@/components/blog/PostComments";
import { getBlogPost } from "@/lib/blog-content";

export default function BlogPostPage() {
  const { slug } = useParams() as { slug: string };
  const post = getBlogPost(slug);
  const [readPct, setReadPct] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);

  // Reading progress tracker
  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const pct = Math.min(100, Math.max(0,
        Math.round(((window.innerHeight - top) / height) * 100)
      ));
      setReadPct(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!post) return (
    <div style={{
      padding: "120px 24px", textAlign: "center", color: "var(--tm)",
    }}>
      Post not found.{" "}
      <a href="/blog" style={{ color: "var(--t1)", fontWeight: 700 }}>← Blog</a>
    </div>
  );

  const date = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <>
      <Navbar />

      {/* Reading progress */}
      <div className="reading-progress-bar">
        <div className="reading-progress-fill" style={{ width: `${readPct}%` }} />
      </div>

      {/* ── HERO ── */}
      <header style={{
        background: "var(--hero)", color: "var(--hero-t)",
        padding: "96px 24px 60px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>

          <a href="/blog" style={{
            fontFamily: "Lato,sans-serif",
            fontSize: 10, fontWeight: 700, letterSpacing: ".14em",
            textTransform: "uppercase", color: "var(--hero-a)",
            textDecoration: "none", display: "inline-block",
            marginBottom: 26, opacity: .6,
          }}>
            ← Blog
          </a>

          {/* Tags */}
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 18 }}>
            {post.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: "Lato,sans-serif",
                fontSize: 9, fontWeight: 700, letterSpacing: ".12em",
                textTransform: "uppercase", padding: "3px 10px", borderRadius: 2,
                background: `${post.coverColor}28`, color: "#fff",
                border: `1px solid ${post.coverColor}55`,
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond',Georgia,serif",
            fontSize: "clamp(2rem,5vw,3.4rem)",
            fontWeight: 300, lineHeight: 1.18, marginBottom: 14,
          }}>
            {post.title}
          </h1>

          {/* Subtitle */}
          {post.subtitle && (
            <p style={{
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              fontSize: "clamp(1rem,1.5vw,1.2rem)",
              fontStyle: "italic", color: "var(--hero-a)",
              opacity: .82, marginBottom: 26, lineHeight: 1.6,
            }}>
              {post.subtitle}
            </p>
          )}

          {/* Meta row */}
          <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: post.coverColor,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "Lato,sans-serif",
                fontSize: 13, color: "#fff", fontWeight: 700, flexShrink: 0,
              }}>
                {post.author.charAt(0)}
              </div>
              <span style={{
                fontFamily: "Lato,sans-serif",
                fontSize: 13, color: "var(--hero-a)", fontWeight: 600,
              }}>
                {post.author}
              </span>
            </div>
            <span style={{ color: "var(--hero-a)", opacity: .35, fontSize: 14 }}>·</span>
            <span style={{
              fontFamily: "Lato,sans-serif",
              fontSize: 12, color: "var(--hero-a)", opacity: .65,
            }}>
              {date}
            </span>
            <span style={{ color: "var(--hero-a)", opacity: .35, fontSize: 14 }}>·</span>
            <span style={{
              fontFamily: "Lato,sans-serif",
              fontSize: 12, color: "var(--hero-a)", opacity: .65,
            }}>
              {post.readingTime} min read
            </span>
          </div>
        </div>
      </header>

      {/* ── ARTICLE ── */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "52px 24px 80px" }}>
        <article ref={articleRef} className="article-prose">
          {post.content.map((block, i) => (
            <div key={i}>
              {block.heading && <h2>{block.heading}</h2>}
              {block.paragraphs.map((p, j) => {
                // First paragraph of the whole post — make it the opening para
                const isOpener = i === 0 && j === 0;
                return (
                  <p key={j} className={isOpener ? "opening-para" : undefined}>
                    {p}
                  </p>
                );
              })}
            </div>
          ))}
        </article>

        {/* ── DIVIDER ── */}
        <div style={{
          display: "flex", alignItems: "center", gap: 14,
          margin: "44px 0",
        }}>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          <span style={{
            fontFamily: "Lato,sans-serif",
            fontSize: 10, fontWeight: 700, letterSpacing: ".2em",
            textTransform: "uppercase", color: "var(--tl)",
          }}>
            ✦
          </span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        {/* ── REACTIONS ── */}
        <PostReactions slug={post.slug} />

        {/* ── COMMENTS ── */}
        <PostComments slug={post.slug} />

        {/* ── BOTTOM NAV ── */}
        <div style={{
          marginTop: 52, paddingTop: 24,
          borderTop: "1px solid var(--border)",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: 12,
        }}>
          <a href="/blog" style={{
            fontFamily: "Lato,sans-serif",
            fontSize: 11, fontWeight: 700, letterSpacing: ".1em",
            textTransform: "uppercase", color: "var(--tm)", textDecoration: "none",
          }}>
            ← All Posts
          </a>
          <a href="/" style={{
            fontFamily: "Lato,sans-serif",
            fontSize: 11, fontWeight: 700, letterSpacing: ".1em",
            textTransform: "uppercase", color: "var(--tm)", textDecoration: "none",
          }}>
            Weekly Programme →
          </a>
        </div>
      </div>
    </>
  );
}


