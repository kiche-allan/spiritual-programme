// components/blog/SeriesNav.tsx
import Link from "next/link";
import { getBlogPosts, type BlogPost } from "@/lib/blog-content";

interface Props {
  post: BlogPost;
}

export function SeriesNav({ post }: Props) {
  if (!post.series || !post.seriesPart) return null;

  const allPosts = getBlogPosts();
  const seriesPosts = allPosts
    .filter(p => p.series === post.series)
    .sort((a, b) => (a.seriesPart ?? 0) - (b.seriesPart ?? 0));

  if (seriesPosts.length <= 1) return null;

  return (
    <div style={{
      background: "var(--bg2)",
      border: "1px solid var(--border)",
      borderLeft: `3px solid ${post.coverColor}`,
      borderRadius: 4,
      padding: "20px 24px",
      marginBottom: 32,
    }}>
      {/* Series label */}
      <div style={{
        fontFamily: "Lato,sans-serif",
        fontSize: 9, fontWeight: 700, letterSpacing: ".18em",
        textTransform: "uppercase", color: post.coverColor, marginBottom: 10,
      }}>
        Series · {post.series}
      </div>

      {/* Part indicator */}
      <p style={{
        fontFamily: "'Cormorant Garamond',Georgia,serif",
        fontSize: 14, color: "var(--tm)", marginBottom: 14,
        lineHeight: 1.6,
      }}>
        Part {post.seriesPart} of {post.seriesTotal ?? seriesPosts.length}
      </p>

      {/* All parts list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {seriesPosts.map(p => {
          const isCurrent = p.slug === post.slug;
          return (
            <div
              key={p.slug}
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              {/* Part number dot */}
              <div style={{
                width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                background: isCurrent ? post.coverColor : "var(--border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "Lato,sans-serif",
                fontSize: 9, fontWeight: 700,
                color: isCurrent ? "#fff" : "var(--tl)",
              }}>
                {p.seriesPart}
              </div>

              {isCurrent ? (
                <span style={{
                  fontFamily: "'Cormorant Garamond',Georgia,serif",
                  fontSize: 14, color: "var(--t1)", fontWeight: 500,
                }}>
                  {p.title}{" "}
                  <span style={{ color: post.coverColor, fontSize: 11 }}>← you are here</span>
                </span>
              ) : (
                <Link
                  href={`/blog/${p.slug}`}
                  style={{
                    fontFamily: "'Cormorant Garamond',Georgia,serif",
                    fontSize: 14, color: "var(--tm)",
                    textDecoration: "none",
                  }}
                >
                  {p.title}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
