// components/blog/SeriesNav.tsx
import Link from "next/link";
import { getSeriesList, type BlogPost } from "@/lib/blog-content";

interface Props { post: BlogPost; }

export function SeriesNav({ post }: Props) {
  if (!post.series || !post.seriesPart) return null;

  const allSeries = getSeriesList();
  const thisSeries = allSeries.find(s => s.name === post.series);
  if (!thisSeries || thisSeries.posts.length <= 1) return null;

  const currentIndex = thisSeries.posts.findIndex(p => p.slug === post.slug);
  const prev = currentIndex > 0 ? thisSeries.posts[currentIndex - 1] : null;
  const next = currentIndex < thisSeries.posts.length - 1
    ? thisSeries.posts[currentIndex + 1] : null;

  return (
    <div style={{
      background: "var(--bg2)",
      border: "1px solid var(--border)",
      borderLeft: `3px solid ${post.coverColor}`,
      borderRadius: 4,
      padding: "18px 20px",
      marginBottom: 32,
    }}>
      {/* Series label */}
      <div style={{
        fontFamily: "Lato,sans-serif",
        fontSize: 9, fontWeight: 700, letterSpacing: ".18em",
        textTransform: "uppercase",
        color: post.coverColor, marginBottom: 4,
      }}>
        Series · {post.series}
      </div>

      {/* Part indicator */}
      <p style={{
        fontFamily: "Lato,sans-serif",
        fontSize: 12, color: "var(--tm)", marginBottom: 14,
      }}>
        Part {post.seriesPart} of {post.seriesTotal ?? thisSeries.posts.length}
      </p>

      {/* All parts */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 16 }}>
        {thisSeries.posts.map(p => {
          const isCurrent = p.slug === post.slug;
          return (
            <div key={p.slug} style={{
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: "50%",
                flexShrink: 0,
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
                  fontSize: 13, color: "var(--t1)", fontWeight: 500,
                }}>
                  {p.title}
                  <span style={{
                    fontFamily: "Lato,sans-serif",
                    fontSize: 9, color: post.coverColor,
                    fontWeight: 700, marginLeft: 6,
                    letterSpacing: ".06em", textTransform: "uppercase",
                  }}>
                    ← you are here
                  </span>
                </span>
              ) : (
                <Link
                  href={`/blog/${p.slug}`}
                  style={{
                    fontFamily: "'Cormorant Garamond',Georgia,serif",
                    fontSize: 13, color: "var(--tm)",
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

      {/* Prev / Next navigation */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        paddingTop: 12, borderTop: "1px solid var(--border)",
        gap: 10,
      }}>
        {prev ? (
          <Link href={`/blog/${prev.slug}`} style={{
            fontFamily: "Lato,sans-serif",
            fontSize: 11, fontWeight: 700, letterSpacing: ".06em",
            textTransform: "uppercase", color: post.coverColor,
            textDecoration: "none",
          }}>
            ← Part {prev.seriesPart}
          </Link>
        ) : <span />}

        {next ? (
          <Link href={`/blog/${next.slug}`} style={{
            fontFamily: "Lato,sans-serif",
            fontSize: 11, fontWeight: 700, letterSpacing: ".06em",
            textTransform: "uppercase", color: post.coverColor,
            textDecoration: "none",
          }}>
            Part {next.seriesPart} →
          </Link>
        ) : <span />}
      </div>
    </div>
  );
}
