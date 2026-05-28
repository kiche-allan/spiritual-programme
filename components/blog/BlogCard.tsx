// components/blog/BlogCard.tsx
import Link from "next/link";
import type { BlogPost } from "@/lib/blog-content";

interface Props { post: BlogPost; }

export function BlogCard({ post }: Props) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <article style={{
        border: "1px solid var(--border)",
        borderLeft: `3px solid ${post.coverColor}`,
        borderRadius: 10, padding: 16,
        background: "var(--bg)",
        transition: "box-shadow .2s",
        cursor: "pointer",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <div style={{
            width: 24, height: 24, borderRadius: "50%",
            background: `${post.coverColor}18`,
            border: `1px solid ${post.coverColor}40`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "Lato,sans-serif",
            fontSize: 10, fontWeight: 700, color: post.coverColor,
          }}>
            {post.author.charAt(0)}
          </div>
          <span style={{ fontFamily: "Lato,sans-serif", fontSize: 11, color: "var(--tm)", fontWeight: 600 }}>
            {post.author}
          </span>
          <span style={{ color: "var(--tl)", fontSize: 10 }}>·</span>
          <span style={{ fontFamily: "Lato,sans-serif", fontSize: 11, color: "var(--tl)" }}>{date}</span>
          <span style={{ color: "var(--tl)", fontSize: 10 }}>·</span>
          <span style={{ fontFamily: "Lato,sans-serif", fontSize: 11, color: "var(--tl)" }}>{post.readingTime} min</span>
        </div>

        <h2 style={{
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontSize: "clamp(1.1rem,1.8vw,1.3rem)",
          fontWeight: 400, lineHeight: 1.35,
          color: "var(--t1)", marginBottom: 6,
        }}>
          {post.title}
        </h2>

        <p style={{
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontSize: 13, lineHeight: 1.65,
          color: "var(--tm)", marginBottom: 10,
        }}>
          {post.excerpt.slice(0, 140)}...
        </p>

        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {post.tags.slice(0, 3).map(tag => (
            <span key={tag} style={{
              fontFamily: "Lato,sans-serif",
              fontSize: 9, fontWeight: 700,
              letterSpacing: ".1em", textTransform: "uppercase",
              padding: "2px 8px", borderRadius: 3,
              background: `${post.coverColor}12`,
              color: post.coverColor,
              border: `0.5px solid ${post.coverColor}35`,
            }}>
              {tag}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}


interface Props {
  post: BlogPost;
  featured?: boolean;
}

