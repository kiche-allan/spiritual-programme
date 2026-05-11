import Navbar from "@/components/Navbar";
import { BlogCard } from "@/components/blog/BlogCard";
import { getBlogPosts, getAllTags } from "@/lib/blog-content";

export const metadata = {
  title: "Blog · Walking With God",
  description: "Spiritual reflections, insights, and encouragement from the Walking With God programme.",
};

export default function BlogIndexPage() {
  const posts = getBlogPosts();
  const tags = getAllTags();
  const featured = posts[0];
  const rest = posts.slice(1);

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
        <div style={{ maxWidth: 600, margin: "0 auto", position: "relative" }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: ".22em",
            textTransform: "uppercase", color: "var(--hero-a)", marginBottom: 14,
          }}>
            Spiritual Blog
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond',Georgia,serif",
            fontSize: "clamp(2.4rem,5vw,3.6rem)",
            fontWeight: 300, lineHeight: 1.15, marginBottom: 16,
          }}>
            Thoughts on the<br />
            <em style={{ fontStyle: "italic", color: "#E8C97A" }}>Walking Life</em>
          </h1>
          <p style={{
            fontSize: 15, color: "var(--hero-a)",
            lineHeight: 1.75, fontWeight: 300,
          }}>
            Reflections on faith, prayer, Scripture, and what it means
            to walk with God in the ordinary and the extraordinary.
          </p>
        </div>
      </header>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 24px 80px" }}>

        {posts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              fontSize: "1.4rem", color: "var(--tm)", fontStyle: "italic",
            }}>
              The first post is coming soon.
            </p>
          </div>
        ) : (
          <>
            {/* Featured post */}
            {featured && (
              <div style={{ marginBottom: 48 }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: ".2em",
                  textTransform: "uppercase", color: "var(--tl)", marginBottom: 6,
                }}>
                  Latest Post
                </div>
                <BlogCard post={featured} featured />
              </div>
            )}

            {/* Tags filter */}
            {tags.length > 0 && (
              <div style={{
                display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32,
              }}>
                {tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: ".08em",
                    textTransform: "uppercase", padding: "4px 12px",
                    borderRadius: 20, background: "var(--bg2)",
                    border: "1px solid var(--border)", color: "var(--tm)",
                    cursor: "default",
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Rest of posts */}
            {rest.length > 0 && (
              <>
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: ".2em",
                  textTransform: "uppercase", color: "var(--tl)", marginBottom: 6,
                }}>
                  All Posts
                </div>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
                  gap: 20,
                }}>
                  {rest.map(post => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer style={{
        background: "var(--bg2)", borderTop: "1px solid var(--border)",
        padding: "36px 24px", textAlign: "center",
      }}>
        <p style={{
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontSize: 17, fontStyle: "italic", color: "var(--tm)", marginBottom: 6,
        }}>
          &ldquo;Let the message of Christ dwell among you richly.&rdquo;
        </p>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--tl)" }}>
          Colossians 3:16
        </p>
      </footer>
    </>
  );
}
