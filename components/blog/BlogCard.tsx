"use client";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog-content";

interface Props {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured }: Props) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <article
        style={{
          background: "var(--bg2)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          overflow: "hidden",
          transition: "transform .25s, box-shadow .25s",
          cursor: "pointer",
          boxShadow: "var(--sh)",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
          (e.currentTarget as HTMLElement).style.boxShadow = "var(--sh2)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLElement).style.boxShadow = "var(--sh)";
        }}
      >
        {/* Colour bar */}
        <div style={{ height: featured ? 6 : 4, background: post.coverColor }} />

        <div style={{ padding: featured ? "24px 28px 26px" : "18px 22px 20px" }}>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
            {post.tags.map(tag => (
              <span key={tag} style={{
                fontSize: 10, fontWeight: 700, letterSpacing: ".08em",
                textTransform: "uppercase", padding: "2px 8px",
                borderRadius: 20,
                background: `${post.coverColor}18`,
                color: post.coverColor,
                border: `1px solid ${post.coverColor}40`,
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily: "'Cormorant Garamond',Georgia,serif",
            fontSize: featured ? "clamp(1.5rem,3vw,2rem)" : "clamp(1.2rem,2.5vw,1.5rem)",
            fontWeight: 400, lineHeight: 1.25,
            color: "var(--t1)", marginBottom: 8,
          }}>
            {post.title}
          </h2>

          {/* Subtitle */}
          {post.subtitle && (
            <p style={{
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              fontSize: 14, fontStyle: "italic",
              color: "var(--tm)", marginBottom: 12, lineHeight: 1.5,
            }}>
              {post.subtitle}
            </p>
          )}

          {/* Excerpt */}
          <p style={{
            fontSize: 13, lineHeight: 1.65,
            color: "var(--tm)", marginBottom: 16,
          }}>
            {post.excerpt}
          </p>

          {/* Footer */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", paddingTop: 12,
            borderTop: "1px solid var(--border)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: post.coverColor,
                display: "flex", alignItems: "center",
                justifyContent: "center",
                fontSize: 12, color: "#fff", fontWeight: 700,
              }}>
                {post.author.charAt(0).toUpperCase()}
              </div>
              <span style={{ fontSize: 12, color: "var(--tm)", fontWeight: 600 }}>
                {post.author}
              </span>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "var(--tl)" }}>
                {post.readingTime} min read
              </span>
              <span style={{ fontSize: 11, color: "var(--tl)" }}>{date}</span>
            </div>
          </div>

        </div>
      </article>
    </Link>
  );
}
