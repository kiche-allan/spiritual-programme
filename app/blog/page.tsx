// app/blog/page.tsx
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getStandalonePosts, getSeriesList, getAllTags } from "@/lib/blog-content";

export const metadata = {
  title: "Blog · Walking With God",
  description: "Spiritual reflections, insights and encouragement.",
};

export default function BlogIndexPage() {
  const posts      = getStandalonePosts();
  const seriesList = getSeriesList();
  const tags       = getAllTags();
  const latestWeekData = {
    id: 10,
    subtitle: "Week Ten",
    title: "Prayer, Submission, Trust & Holy Living",
    heroVerse: "Yet not my will, but yours be done.",
    heroRef: "Luke 22:42",
    publishedAt: "2026-05-25",
    accentColor: "#2C3E5A",
  };

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

      {/* ── THREE COLUMN LAYOUT ── */}
      <div
        className="blog-three-col"
        style={{
          maxWidth: 1160, margin: "0 auto",
          padding: "0 16px 64px",
          display: "grid",
          gridTemplateColumns: "200px 1fr 240px",
          gap: 0,
          alignItems: "start",
        }}
      >

        {/* ── LEFT SIDEBAR ── */}
        <aside style={{
          borderRight: "1px solid var(--border)",
          paddingTop: 28, paddingBottom: 28,
          position: "sticky", top: 60,
          height: "calc(100vh - 60px)",
          overflowY: "auto",
        }}>
          {/* Branding */}
          <div style={{
            padding: "0 16px 16px",
            borderBottom: "1px solid var(--border)",
            marginBottom: 16,
          }}>
            <p style={{
              fontFamily: "Lato,sans-serif",
              fontSize: 9, fontWeight: 700, letterSpacing: ".18em",
              textTransform: "uppercase", color: "var(--tl)", marginBottom: 6,
            }}>
              Walking With God
            </p>
            <p style={{
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              fontSize: 20, fontWeight: 300, color: "var(--t1)", lineHeight: 1.2,
            }}>
              Blog &amp; Series
            </p>
          </div>

          {/* Navigation */}
          <div style={{ padding: "0 8px", marginBottom: 20 }}>
            {[
              { label: "All Posts", count: posts.length, active: true },
              { label: "Series", count: seriesList.length, active: false },
            ].map(item => (
              <div
                key={item.label}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "8px 10px", borderRadius: 8, marginBottom: 2,
                  background: item.active ? "var(--bg2)" : "transparent",
                  cursor: "pointer",
                }}
              >
                <span style={{
                  fontFamily: "Lato,sans-serif",
                  fontSize: 13,
                  fontWeight: item.active ? 700 : 400,
                  color: item.active ? "var(--t1)" : "var(--tm)",
                  flex: 1,
                }}>
                  {item.label}
                </span>
                <span style={{
                  fontFamily: "Lato,sans-serif",
                  fontSize: 10, fontWeight: 700, color: "var(--tl)",
                }}>
                  {item.count}
                </span>
              </div>
            ))}
          </div>

          {/* Topics */}
          <div style={{
            padding: "16px 16px 0",
            borderTop: "1px solid var(--border)",
          }}>
            <p style={{
              fontFamily: "Lato,sans-serif",
              fontSize: 9, fontWeight: 700, letterSpacing: ".18em",
              textTransform: "uppercase", color: "var(--tl)", marginBottom: 10,
            }}>
              Browse by topic
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "Lato,sans-serif",
                    fontSize: 9, fontWeight: 700, letterSpacing: ".1em",
                    textTransform: "uppercase", padding: "2px 8px",
                    borderRadius: 3,
                    background: "var(--bg2)",
                    border: "0.5px solid var(--border)",
                    color: "var(--tm)",
                    cursor: "pointer",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* ── CENTRE: POSTS ── */}
        <main style={{
          borderRight: "1px solid var(--border)",
          padding: "28px 24px",
        }}>
          {/* Search */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "var(--bg2)",
            border: "1px solid var(--border)",
            borderRadius: 8, padding: "9px 14px",
            marginBottom: 20,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="var(--tl)" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <span style={{
              fontFamily: "Lato,sans-serif",
              fontSize: 13, color: "var(--tl)",
            }}>
              Search posts by topic or keyword...
            </span>
          </div>

          {/* Count */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", marginBottom: 16,
          }}>
            <span style={{
              fontFamily: "Lato,sans-serif",
              fontSize: 9, fontWeight: 700, letterSpacing: ".18em",
              textTransform: "uppercase", color: "var(--tl)",
            }}>
              {posts.length} article{posts.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Posts list */}
          {posts.length === 0 ? (
            <p style={{
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              fontSize: "1.3rem", color: "var(--tm)",
              fontStyle: "italic", textAlign: "center", padding: "60px 0",
            }}>
              The first post is coming soon.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {posts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <article
                    className="post-card"
                    style={{
                      border: "1px solid var(--border)",
                      borderLeft: `3px solid ${post.coverColor}`,
                      borderRadius: 10,
                      padding: 16,
                      background: i === 0 ? "var(--bg2)" : "var(--bg)",
                      cursor: "pointer",
                    }}
                  >
                    {/* Author row */}
                    <div style={{
                      display: "flex", alignItems: "center",
                      gap: 6, marginBottom: 8,
                    }}>
                      <div style={{
                        width: 24, height: 24, borderRadius: "50%",
                        background: `${post.coverColor}18`,
                        border: `1px solid ${post.coverColor}40`,
                        display: "flex", alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "Lato,sans-serif",
                        fontSize: 10, fontWeight: 700,
                        color: post.coverColor, flexShrink: 0,
                      }}>
                        {post.author.charAt(0)}
                      </div>
                      <span style={{
                        fontFamily: "Lato,sans-serif",
                        fontSize: 11, color: "var(--tm)", fontWeight: 600,
                      }}>
                        {post.author}
                      </span>
                      <span style={{ color: "var(--tl)", fontSize: 10 }}>·</span>
                      <span style={{
                        fontFamily: "Lato,sans-serif",
                        fontSize: 11, color: "var(--tl)",
                      }}>
                        {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                          day: "numeric", month: "short", year: "numeric",
                        })}
                      </span>
                      <span style={{ color: "var(--tl)", fontSize: 10 }}>·</span>
                      <span style={{
                        fontFamily: "Lato,sans-serif",
                        fontSize: 11, color: "var(--tl)",
                      }}>
                        {post.readingTime} min
                      </span>
                    </div>

                    {/* Title */}
                    <h2 style={{
                      fontFamily: "'Cormorant Garamond',Georgia,serif",
                      fontSize: "clamp(1.1rem,1.8vw,1.3rem)",
                      fontWeight: 400, lineHeight: 1.35,
                      color: "var(--t1)", marginBottom: 6,
                    }}>
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p style={{
                      fontFamily: "'Cormorant Garamond',Georgia,serif",
                      fontSize: 13, lineHeight: 1.65,
                      color: "var(--tm)", marginBottom: 10,
                    }}>
                      {post.excerpt.slice(0, 140)}...
                    </p>

                    {/* Tags */}
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                      {post.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          style={{
                            fontFamily: "Lato,sans-serif",
                            fontSize: 9, fontWeight: 700,
                            letterSpacing: ".1em", textTransform: "uppercase",
                            padding: "2px 8px", borderRadius: 3,
                            background: `${post.coverColor}12`,
                            color: post.coverColor,
                            border: `0.5px solid ${post.coverColor}35`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </main>

        {/* ── RIGHT SIDEBAR ── */}
        <aside style={{
          padding: "28px 16px",
          position: "sticky", top: 60,
          height: "calc(100vh - 60px)",
          overflowY: "auto",
          display: "flex", flexDirection: "column", gap: 20,
        }}>

          {/* Latest Week */}
          <div>
            <p style={{
              fontFamily: "Lato,sans-serif",
              fontSize: 9, fontWeight: 700, letterSpacing: ".18em",
              textTransform: "uppercase", color: "var(--tl)", marginBottom: 10,
            }}>
              Latest Week
            </p>
            <Link
              href={`/week/${latestWeekData.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                className="week-card-hover"
                style={{
                  border: "1px solid var(--border)",
                  borderTop: `3px solid ${latestWeekData.accentColor}`,
                  borderRadius: 8, padding: 14,
                  background: "var(--bg2)",
                  cursor: "pointer",
                }}
              >
                <p style={{
                  fontFamily: "Lato,sans-serif",
                  fontSize: 9, fontWeight: 700, letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: latestWeekData.accentColor, marginBottom: 4,
                }}>
                  {latestWeekData.subtitle}
                </p>
                <p style={{
                  fontFamily: "'Cormorant Garamond',Georgia,serif",
                  fontSize: 14, fontWeight: 400,
                  color: "var(--t1)", lineHeight: 1.35, marginBottom: 6,
                }}>
                  {latestWeekData.title}
                </p>
                <p style={{
                  fontFamily: "'Cormorant Garamond',Georgia,serif",
                  fontSize: 12, fontStyle: "italic",
                  color: "var(--tm)", lineHeight: 1.5, marginBottom: 10,
                }}>
                  &ldquo;{latestWeekData.heroVerse}&rdquo; — {latestWeekData.heroRef}
                </p>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <span style={{
                    fontFamily: "Lato,sans-serif",
                    fontSize: 10, color: "var(--tl)",
                  }}>
                    7 days · {new Date(latestWeekData.publishedAt).toLocaleDateString("en-GB", {
                      day: "numeric", month: "short",
                    })}
                  </span>
                  <span style={{
                    fontFamily: "Lato,sans-serif",
                    fontSize: 10, fontWeight: 700,
                    color: latestWeekData.accentColor,
                  }}>
                    Begin →
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Series */}
          {seriesList.map(series => (
            <div key={series.name}>
              <p style={{
                fontFamily: "Lato,sans-serif",
                fontSize: 9, fontWeight: 700, letterSpacing: ".18em",
                textTransform: "uppercase", color: "var(--tl)", marginBottom: 10,
              }}>
                Series
              </p>
              <div style={{
                border: "1px solid var(--border)",
                borderTop: `3px solid ${series.color}`,
                borderRadius: 8, overflow: "hidden",
                background: "var(--bg)",
              }}>
                {/* Series header */}
                <div style={{
                  padding: "12px 14px",
                  borderBottom: "1px solid var(--border)",
                }}>
                  <p style={{
                    fontFamily: "Lato,sans-serif",
                    fontSize: 9, fontWeight: 700, letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: series.color, marginBottom: 3,
                  }}>
                    {series.posts.length} parts
                  </p>
                  <p style={{
                    fontFamily: "'Cormorant Garamond',Georgia,serif",
                    fontSize: 14, fontWeight: 400,
                    color: "var(--t1)", lineHeight: 1.3,
                  }}>
                    {series.name}
                  </p>
                </div>

                {/* Parts list — show first 4 */}
                <div style={{ padding: "6px 0" }}>
                  {series.posts.slice(0, 4).map(post => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        className="series-part-row"
                        style={{
                          display: "flex", alignItems: "flex-start",
                          gap: 8, padding: "6px 14px",
                          cursor: "pointer",
                        }}
                      >
                        <div style={{
                          width: 18, height: 18, borderRadius: "50%",
                          background: `${series.color}18`,
                          border: `1px solid ${series.color}50`,
                          display: "flex", alignItems: "center",
                          justifyContent: "center", flexShrink: 0,
                          fontFamily: "Lato,sans-serif",
                          fontSize: 8, fontWeight: 700,
                          color: series.color, marginTop: 1,
                        }}>
                          {post.seriesPart}
                        </div>
                        <p style={{
                          fontFamily: "'Cormorant Garamond',Georgia,serif",
                          fontSize: 12, color: "var(--tm)",
                          lineHeight: 1.4, flex: 1,
                        }}>
                          {post.title}
                        </p>
                      </div>
                    </Link>
                  ))}

                  {series.posts.length > 4 && (
                    <p style={{
                      fontFamily: "Lato,sans-serif",
                      fontSize: 10, color: "var(--tl)",
                      textAlign: "center", padding: "4px 0 6px",
                      borderTop: "1px solid var(--border)",
                      marginTop: 4,
                    }}>
                      + {series.posts.length - 4} more parts
                    </p>
                  )}
                </div>

                {/* Progress bar */}
                <div style={{ padding: "0 14px 12px" }}>
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
                  <p style={{
                    fontFamily: "Lato,sans-serif",
                    fontSize: 10, color: "var(--tl)", marginTop: 4,
                  }}>
                    {series.posts.length} of {series.posts[0]?.seriesTotal ?? series.posts.length} published
                  </p>
                </div>
              </div>
            </div>
          ))}

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

      {/* Responsive + hover styles */}
      <style>{`
        @media (max-width: 900px) {
          .blog-three-col {
            grid-template-columns: 1fr !important;
          }
        }
        .post-card {
          transition: box-shadow .2s, border-color .2s;
        }
        .post-card:hover {
          box-shadow: var(--sh2);
          border-color: var(--tl) !important;
        }
        .week-card-hover {
          transition: box-shadow .2s;
        }
        .week-card-hover:hover {
          box-shadow: var(--sh);
        }
        .series-part-row {
          transition: background .15s;
        }
        .series-part-row:hover {
          background: var(--bg2);
        }
      `}</style>
    </>
  );
}

