"use client";

// components/blog/SeriesPanel.tsx
import Link from "next/link";
import { getSeriesList } from "@/lib/blog-content";

export function SeriesPanel() {
  const seriesList = getSeriesList();

  if (seriesList.length === 0) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Section eyebrow */}
      <div style={{
        fontFamily: "Lato,sans-serif",
        fontSize: 10, fontWeight: 700, letterSpacing: ".2em",
        textTransform: "uppercase", color: "var(--tl)",
      }}>
        Series
      </div>

      {seriesList.map(series => (
        <div
          key={series.name}
          style={{
            background: "var(--bg2)",
            border: "1px solid var(--border)",
            borderTop: `3px solid ${series.color}`,
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          {/* Series header */}
          <div style={{ padding: "16px 18px 12px" }}>
            <p style={{
              fontFamily: "Lato,sans-serif",
              fontSize: 9, fontWeight: 700, letterSpacing: ".18em",
              textTransform: "uppercase",
              color: series.color, marginBottom: 6,
            }}>
              {series.posts.length} parts
            </p>
            <h3 style={{
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              fontSize: "1.15rem", fontWeight: 400,
              color: "var(--t1)", lineHeight: 1.3, marginBottom: 0,
            }}>
              {series.name}
            </h3>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "var(--border)" }} />

          {/* Parts list */}
          <div style={{ padding: "10px 0" }}>
            {series.posts.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  style={{
                    display: "flex", alignItems: "flex-start",
                    gap: 10, padding: "8px 18px",
                    transition: "background .15s",
                  }}
                  onMouseEnter={e =>
                    (e.currentTarget.style.background = "var(--bg)")
                  }
                  onMouseLeave={e =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  {/* Part number */}
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%",
                    background: `${series.color}18`,
                    border: `1.5px solid ${series.color}50`,
                    display: "flex", alignItems: "center",
                    justifyContent: "center", flexShrink: 0, marginTop: 1,
                    fontFamily: "Lato,sans-serif",
                    fontSize: 9, fontWeight: 700,
                    color: series.color,
                  }}>
                    {post.seriesPart}
                  </div>

                  {/* Title */}
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontFamily: "'Cormorant Garamond',Georgia,serif",
                      fontSize: 13, lineHeight: 1.45,
                      color: "var(--t2)", margin: 0,
                    }}>
                      {post.title}
                    </p>
                    <p style={{
                      fontFamily: "Lato,sans-serif",
                      fontSize: 10, color: "var(--tl)",
                      margin: "3px 0 0",
                    }}>
                      {post.readingTime} min
                    </p>
                  </div>

                  {/* Arrow */}
                  <span style={{
                    fontSize: 12, color: "var(--tl)",
                    marginTop: 4, flexShrink: 0,
                  }}>
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Progress bar */}
          <div style={{ padding: "0 18px 14px" }}>
            <div style={{
              display: "flex", justifyContent: "space-between",
              marginBottom: 5,
            }}>
              <span style={{
                fontFamily: "Lato,sans-serif",
                fontSize: 9, fontWeight: 700, letterSpacing: ".1em",
                textTransform: "uppercase", color: "var(--tl)",
              }}>
                Progress
              </span>
              <span style={{
                fontFamily: "Lato,sans-serif",
                fontSize: 9, color: "var(--tl)",
              }}>
                {series.posts.length} / {series.posts[0]?.seriesTotal ?? series.posts.length} parts
              </span>
            </div>
            <div style={{
              height: 3, background: "var(--border)",
              borderRadius: 2, overflow: "hidden",
            }}>
              <div style={{
                height: "100%", borderRadius: 2,
                background: series.color,
                width: `${(series.posts.length / (series.posts[0]?.seriesTotal ?? series.posts.length)) * 100}%`,
                transition: "width .3s ease",
              }} />
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}
