// app/blog/page.tsx
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { BlogCard } from "@/components/blog/BlogCard";
import { getBlogPosts, getAllTags } from "@/lib/blog-content";

export const metadata = {
  title: "Blog · Walking With God",
  description: "Spiritual reflections, insights and encouragement.",
};

export default function BlogIndexPage() {
  const posts = getBlogPosts();
  const tags  = getAllTags();
  const featured = posts[0];
  const rest      = posts.slice(1);

  return (
    <>
      <Navbar />

      {/* Header */}
      <header style={{
        background: "var(--hero)", color: "var(--hero-t)",
        padding: "96px 24px 64px", textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: .03,
          backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)",
          backgroundSize: "50px 50px", pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 640, margin: "0 auto", position: "relative" }}>
          <div style={{
            fontFamily: "Lato,sans-serif",
            fontSize: 10, fontWeight: 700, letterSpacing: ".22em",
            textTransform: "uppercase", color: "var(--hero-a)", marginBottom: 14,
          }}>
            Spiritual Blog
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond',Georgia,serif",
            fontSize: "clamp(2.6rem,5.5vw,3.8rem)",
            fontWeight: 300, lineHeight: 1.15, marginBottom: 16,
          }}>
            Thoughts on the<br />
            <em style={{ fontStyle: "italic", color: "#E8C97A" }}>Walking Life</em>
          </h1>
          <p style={{
            fontFamily: "'Cormorant Garamond',Georgia,serif",
            fontSize: "clamp(1rem,1.5vw,1.2rem)",
            color: "var(--hero-a)", lineHeight: 1.75,
            fontStyle: "italic", fontWeight: 300,
          }}>
            Reflections on faith, prayer, Scripture, and what it means
            to walk with God in the ordinary and the extraordinary.
          </p>
        </div>
      </header>

      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "56px 24px 80px" }}>

        {posts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              fontSize: "1.5rem", color: "var(--tm)", fontStyle: "italic",
            }}>
              The first post is coming soon.
            </p>
          </div>
        ) : (
          <>
            {/* ── FEATURED ── */}
            {featured && (
              <div style={{ marginBottom: 52 }}>
                <div className="section-eyebrow">Latest Post</div>
                <Link href={`/blog/${featured.slug}`} className="featured-post-split">

                  {/* Colour panel */}
                  <div style={{
                    background: featured.coverColor,
                    padding: "40px 36px",
                    display: "flex", flexDirection: "column",
                    justifyContent: "space-between",
                  }}>
                    <div>
                      <div style={{
                        fontFamily: "Lato,sans-serif",
                        fontSize: 9, fontWeight: 700, letterSpacing: ".2em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,.55)", marginBottom: 16,
                      }}>
                        {featured.readingTime} min read
                      </div>

                      <h2 style={{
                        fontFamily: "'Cormorant Garamond',Georgia,serif",
                        fontSize: "clamp(1.5rem,2.8vw,2.1rem)",
                        fontWeight: 400, lineHeight: 1.25,
                        color: "#fff", marginBottom: 12,
                      }}>
                        {featured.title}
                      </h2>

                      {featured.subtitle && (
                        <p style={{
                          fontFamily: "'Cormorant Garamond',Georgia,serif",
                          fontSize: 15, fontStyle: "italic",
                          color: "rgba(255,255,255,.72)",
                          lineHeight: 1.6, marginBottom: 0,
                        }}>
                          {featured.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Author row */}
                    <div style={{
                      display: "flex", alignItems: "center",
                      gap: 10, marginTop: 28,
                      paddingTop: 20,
                      borderTop: "1px solid rgba(255,255,255,.15)",
                    }}>
                      <div style={{
                        width: 30, height: 30, borderRadius: "50%",
                        background: "rgba(255,255,255,.2)",
                        display: "flex", alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12, fontWeight: 700, color: "#fff",
                        fontFamily: "Lato,sans-serif",
                      }}>
                        {featured.author.charAt(0)}
                      </div>
                      <span style={{
                        fontFamily: "Lato,sans-serif",
                        fontSize: 12, color: "rgba(255,255,255,.6)",
                      }}>
                        {featured.author} · {new Date(featured.publishedAt).toLocaleDateString("en-GB", {
                          day: "numeric", month: "long", year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Excerpt panel */}
                  <div style={{
                    background: "var(--bg2)",
                    padding: "40px 36px",
                    display: "flex", flexDirection: "column",
                    justifyContent: "space-between",
                  }}>
                    <div>
                      <div style={{
                        fontFamily: "Lato,sans-serif",
                        fontSize: 9, fontWeight: 700, letterSpacing: ".2em",
                        textTransform: "uppercase", color: "var(--tl)", marginBottom: 16,
                      }}>
                        Opening Lines
                      </div>
                      <p style={{
                        fontFamily: "'Cormorant Garamond',Georgia,serif",
                        fontSize: "clamp(1rem,1.4vw,1.15rem)",
                        fontStyle: "italic", lineHeight: 1.85,
                        color: "var(--t2)",
                      }}>
                        &ldquo;{featured.excerpt}&rdquo;
                      </p>
                    </div>

                    {/* Tags + CTA */}
                    <div style={{ marginTop: 24 }}>
                      <div style={{
                        display: "flex", flexWrap: "wrap", gap: 6,
                        marginBottom: 16,
                      }}>
                        {featured.tags.map(tag => (
                          <span key={tag} style={{
                            fontFamily: "Lato,sans-serif",
                            fontSize: 9, fontWeight: 700,
                            letterSpacing: ".1em", textTransform: "uppercase",
                            padding: "3px 9px", borderRadius: 2,
                            background: `${featured.coverColor}14`,
                            color: featured.coverColor,
                            border: `1px solid ${featured.coverColor}35`,
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span style={{
                        fontFamily: "Lato,sans-serif",
                        fontSize: 11, fontWeight: 700,
                        letterSpacing: ".1em", textTransform: "uppercase",
                        color: featured.coverColor,
                      }}>
                        Read the full post →
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* ── TAG PILLS ── */}
            {tags.length > 0 && (
              <div style={{
                display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28,
              }}>
                {tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: "Lato,sans-serif",
                    fontSize: 10, fontWeight: 700, letterSpacing: ".1em",
                    textTransform: "uppercase", padding: "4px 12px",
                    borderRadius: 2, background: "var(--bg2)",
                    border: "1px solid var(--border)", color: "var(--tm)",
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* ── POST GRID ── */}
            {rest.length > 0 && (
              <>
                <div className="section-eyebrow">All Posts</div>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
                  gap: 20,
                }}>
                  {rest.map(post => <BlogCard key={post.slug} post={post} />)}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* ── FOOTER ── */}
      <footer style={{
        background: "var(--bg2)", borderTop: "1px solid var(--border)",
        padding: "36px 24px", textAlign: "center",
      }}>
        <p style={{
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontSize: 18, fontStyle: "italic",
          color: "var(--tm)", marginBottom: 6,
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
    </>
  );
}
