// components/blog/BlogCard.tsx
import Link from "next/link";
import type { BlogPost } from "@/lib/blog-content";
import { BlogCover } from "./BlogCover";

interface Props { post: BlogPost; }

export function BlogCard({ post }: Props) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });

  const category = post.tags[0] || "Reflection";

  return (
    <Link href={`/blog/${post.slug}`} className="blog-grid-card">
      <BlogCover color={post.coverColor} title={post.title} eyebrow={category} />

      <div style={{ padding: "16px 18px 18px", display: "flex", flexDirection: "column", flex: 1 }}>
        <p style={{
          fontFamily: "Lato,sans-serif",
          fontSize: 13, lineHeight: 1.6,
          color: "var(--tm)", marginBottom: 14,
        }}>
          {post.excerpt.slice(0, 120)}{post.excerpt.length > 120 ? "…" : ""}
        </p>

        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          paddingTop: 12, borderTop: "1px solid var(--border)",
          marginTop: "auto",
        }}>
          <div style={{
            width: 22, height: 22, borderRadius: "50%",
            background: `${post.coverColor}18`,
            border: `1px solid ${post.coverColor}40`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "Lato,sans-serif",
            fontSize: 10, fontWeight: 700, color: post.coverColor, flexShrink: 0,
          }}>
            {post.author.charAt(0)}
          </div>
          <span style={{ fontFamily: "Lato,sans-serif", fontSize: 11, color: "var(--tl)", fontWeight: 600 }}>
            {post.author}
          </span>
          <span style={{ color: "var(--tl)", fontSize: 10 }}>·</span>
          <span style={{ fontFamily: "Lato,sans-serif", fontSize: 11, color: "var(--tl)" }}>{date}</span>
          <span style={{ color: "var(--tl)", fontSize: 10 }}>·</span>
          <span style={{ fontFamily: "Lato,sans-serif", fontSize: 11, color: "var(--tl)" }}>{post.readingTime} min</span>
        </div>
      </div>
    </Link>
  );
}
