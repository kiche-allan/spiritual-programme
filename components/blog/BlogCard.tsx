// components/blog/BlogCard.tsx
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

  const statusLabel =
    post.readingTime < 5 ? "Quick read"
    : post.readingTime < 10 ? `${post.readingTime} min read`
    : `${post.readingTime} min read`;

  return (
    <Link href={`/blog/${post.slug}`} className="blog-card">

      {/* Accent bar */}
      <div style={{ height: featured ? 5 : 3, background: post.coverColor }} />

      <div style={{ padding: featured ? "22px 26px 24px" : "18px 20px 20px" }}>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 11 }}>
          {post.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: "Lato,sans-serif",
              fontSize: 9, fontWeight: 700, letterSpacing: ".1em",
              textTransform: "uppercase", padding: "2px 8px", borderRadius: 2,
              background: `${post.coverColor}14`,
              color: post.coverColor,
              border: `1px solid ${post.coverColor}35`,
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontSize: featured
            ? "clamp(1.3rem,2.5vw,1.65rem)"
            : "clamp(1.1rem,2vw,1.35rem)",
          fontWeight: 400, lineHeight: 1.28,
          color: "var(--t1)", marginBottom: 8,
        }}>
          {post.title}
        </h2>

        {/* Subtitle */}
        {post.subtitle && (
          <p style={{
            fontFamily: "'Cormorant Garamond',Georgia,serif",
            fontSize: 14, fontStyle: "italic",
            color: "var(--tm)", marginBottom: 10, lineHeight: 1.55,
          }}>
            {post.subtitle}
          </p>
        )}

        {/* Excerpt */}
        <p style={{
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontSize: 14, lineHeight: 1.7,
          color: "var(--tm)", marginBottom: 14,
        }}>
          {post.excerpt}
        </p>

        {/* Footer */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", paddingTop: 12,
          borderTop: "1px solid var(--border)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{
              width: 24, height: 24, borderRadius: "50%",
              background: post.coverColor,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "Lato,sans-serif",
              fontSize: 10, color: "#fff", fontWeight: 700, flexShrink: 0,
            }}>
              {post.author.charAt(0)}
            </div>
            <span style={{
              fontFamily: "Lato,sans-serif",
              fontSize: 11, color: "var(--t2)", fontWeight: 600,
            }}>
              {post.author}
            </span>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{
              fontFamily: "Lato,sans-serif",
              fontSize: 10, color: "var(--tl)", fontWeight: 600,
            }}>
              {statusLabel}
            </span>
            <span style={{ fontFamily: "Lato,sans-serif", fontSize: 10, color: "var(--tl)" }}>
              {date}
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
}

