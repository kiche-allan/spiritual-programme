import Navbar from "@/components/Navbar";
import { PostReactions } from "@/components/blog/PostReactions";
import { PostComments } from "@/components/blog/PostComments";
import { getBlogPost, getBlogPosts } from "@/lib/blog-content";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getBlogPosts().map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} · Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
    });
  };

  return (
    <>
      <Navbar />

      {/* Back link */}
      <div style={{
        maxWidth: 700, margin: "0 auto", padding: "24px",
      }}>
        <Link href="/blog" style={{
          fontSize: 12, fontWeight: 700, letterSpacing: ".08em",
          textTransform: "uppercase", color: "var(--tl)", textDecoration: "none",
        }}>
          ← Back to Blog
        </Link>
      </div>

      {/* Hero section */}
      <header style={{
        background: `linear-gradient(135deg,${post.coverColor}15 0%,${post.coverColor}08 100%)`,
        borderTop: `6px solid ${post.coverColor}`,
        padding: "48px 24px",
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div style={{
              display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16,
            }}>
              {post.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: ".1em",
                  textTransform: "uppercase", padding: "3px 10px",
                  borderRadius: 16, background: post.coverColor,
                  color: "#fff", opacity: .85,
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond',Georgia,serif",
            fontSize: "clamp(1.8rem,4vw,2.8rem)",
            fontWeight: 300, lineHeight: 1.2, marginBottom: 12, color: "var(--th)",
          }}>
            {post.title}
          </h1>

          {/* Subtitle */}
          {post.subtitle && (
            <p style={{
              fontStyle: "italic", fontSize: 15, color: "var(--tm)",
              marginBottom: 16, lineHeight: 1.6,
            }}>
              {post.subtitle}
            </p>
          )}

          {/* Meta */}
          <div style={{
            display: "flex", flexWrap: "wrap", gap: 20, fontSize: 12,
            color: "var(--tl)", alignItems: "center",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: post.coverColor, display: "flex",
                alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: 700,
              }}>
                {post.author.charAt(0).toUpperCase()}
              </div>
              <span style={{ fontWeight: 600 }}>{post.author}</span>
            </div>
            <span>
              {formatDate(new Date(post.publishedAt))}
            </span>
            <span>
              {post.readingTime} min read
            </span>
          </div>
        </div>
      </header>

      {/* Article content */}
      <article style={{
        maxWidth: 700, margin: "0 auto", padding: "56px 24px",
      }}>
        {post.content && post.content.length > 0 ? (
          post.content.map((block, idx) => (
            <div key={idx} style={{ marginBottom: 28 }}>
              {block.type === "heading" ? (
                <h2 style={{
                  fontFamily: "'Cormorant Garamond',Georgia,serif",
                  fontSize: 24, fontWeight: 600, color: "var(--th)",
                  marginBottom: 12, lineHeight: 1.3,
                }}>
                  {block.text}
                </h2>
              ) : (
                <p style={{
                  fontSize: 15, lineHeight: 1.75, color: "var(--tm)",
                }}>
                  {block.text}
                </p>
              )}
            </div>
          ))
        ) : (
          <p style={{ color: "var(--tm)" }}>No content available.</p>
        )}
      </article>

      {/* Divider */}
      <div style={{
        maxWidth: 700, margin: "0 auto", padding: "0 24px 32px",
      }}>
        <div style={{
          height: 1, background: "var(--border)", margin: "0 auto",
        }} />
      </div>

      {/* Reactions */}
      <div style={{
        maxWidth: 700, margin: "0 auto", padding: "32px 24px",
      }}>
        <PostReactions slug={post.slug} />
      </div>

      {/* Comments */}
      <div style={{
        maxWidth: 700, margin: "0 auto", padding: "0 24px 48px",
      }}>
        <PostComments slug={post.slug} />
      </div>

      {/* Back to blog */}
      <div style={{
        maxWidth: 700, margin: "0 auto", padding: "32px 24px 64px",
      }}>
        <Link href="/blog" style={{
          fontSize: 12, fontWeight: 700, letterSpacing: ".08em",
          textTransform: "uppercase", color: "var(--tl)", textDecoration: "none",
        }}>
          ← Back to Blog
        </Link>
      </div>
    </>
  );
}
