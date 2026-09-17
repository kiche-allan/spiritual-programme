// app/blog/page.tsx
"use client";
import { Suspense, useCallback, useMemo, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Pagination } from "@/components/ui/Pagination";
import { BlogCard } from "@/components/blog/BlogCard";
import { TagFilterTabs } from "@/components/blog/TagFilterTabs";
import { SeriesPanel } from "@/components/blog/SeriesPanel";
import { getStandalonePosts, type BlogPost } from "@/lib/blog-content";

const ARTICLES_PER_PAGE = 8;
const STORIES_PER_PAGE = 8;

const BIBLE_STORY_SLUGS = new Set([
  "joseph-and-the-pit",
  "hagar-in-the-wilderness",
  "mephibosheth",
  "hannahs-prayer",
  "ruth-and-boaz",
  "moses-and-the-red-sea",
  "zacchaeus",
  "the-prodigal-father",
  "bartimaeus",
  "the-emmaus-road",
]);

function isBibleStory(post: BlogPost): boolean {
  if (BIBLE_STORY_SLUGS.has(post.slug)) return true;
  return post.tags.some(t => t.toLowerCase().replace(/[\s-]+/g, "") === "biblestory");
}

export default function BlogIndexPage() {
  return (
    <Suspense fallback={null}>
      <BlogIndexContent />
    </Suspense>
  );
}

function BlogIndexContent() {
  const posts = getStandalonePosts();
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const blogPage = Math.max(1, parseInt(searchParams.get("blogPage") ?? "1", 10) || 1);
  const storyPage = Math.max(1, parseInt(searchParams.get("storyPage") ?? "1", 10) || 1);

  const setPageParam = useCallback((key: "blogPage" | "storyPage", value: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value <= 1) params.delete(key);
    else params.set(key, String(value));
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [router, pathname, searchParams]);

  const tags = useMemo(() => {
    const all = posts.flatMap(p => p.tags);
    return [...new Set(all)].sort();
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(p => {
      const matchesTag = !activeTag || p.tags.includes(activeTag);
      const matchesQuery = !q
        || p.title.toLowerCase().includes(q)
        || p.excerpt.toLowerCase().includes(q)
        || p.tags.some(t => t.toLowerCase().includes(q));
      return matchesTag && matchesQuery;
    });
  }, [posts, query, activeTag]);

  const articles = useMemo(() => filtered.filter(p => !isBibleStory(p)), [filtered]);
  const stories = useMemo(() => filtered.filter(isBibleStory), [filtered]);

  const articleTotalPages = Math.max(1, Math.ceil(articles.length / ARTICLES_PER_PAGE));
  const storyTotalPages = Math.max(1, Math.ceil(stories.length / STORIES_PER_PAGE));

  const safeBlogPage = Math.min(blogPage, articleTotalPages);
  const safeStoryPage = Math.min(storyPage, storyTotalPages);

  const pagedArticles = articles.slice(
    (safeBlogPage - 1) * ARTICLES_PER_PAGE, safeBlogPage * ARTICLES_PER_PAGE
  );
  const pagedStories = stories.slice(
    (safeStoryPage - 1) * STORIES_PER_PAGE, safeStoryPage * STORIES_PER_PAGE
  );

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

      {/* ── FILTER BAR ── */}
      <div style={{
        maxWidth: 1440, margin: "0 auto", padding: "28px 48px 0",
        display: "flex", flexDirection: "column", gap: 16,
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "var(--bg2)",
          border: "1px solid var(--border)",
          borderRadius: 8, padding: "10px 14px",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="var(--tl)" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search posts by topic or keyword..."
            style={{
              flex: 1, border: "none", outline: "none", background: "transparent",
              fontFamily: "Lato,sans-serif", fontSize: 13, color: "var(--t1)",
            }}
          />
        </div>

        <TagFilterTabs tags={tags} active={activeTag} onChange={setActiveTag} />
      </div>

      {/* ── LAYOUT: SECTIONS + SIDEBAR ── */}
      <div className="blog-layout" style={{
        maxWidth: 1440, margin: "0 auto", padding: "24px 48px 64px",
        display: "grid", gridTemplateColumns: "1fr 280px", gap: 40,
        alignItems: "start",
      }}>
        <main>

          {/* ── SECTION 1: REFLECTIONS & TEACHING ── */}
          <section>
            <Eyebrow text="The Blog" />
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "flex-end", flexWrap: "wrap", gap: 8, marginBottom: 4,
            }}>
              <SectionTitle text="Reflections & Teaching" />
              <span style={{
                fontFamily: "Lato,sans-serif",
                fontSize: 9, fontWeight: 700, letterSpacing: ".18em",
                textTransform: "uppercase", color: "var(--tl)", marginBottom: 20,
              }}>
                {articles.length} article{articles.length !== 1 ? "s" : ""}
              </span>
            </div>

            {articles.length === 0 ? (
              <p style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: "1.3rem", color: "var(--tm)",
                fontStyle: "italic", textAlign: "center", padding: "60px 0",
              }}>
                No posts match your search yet.
              </p>
            ) : (
              <>
                <div className="blog-card-grid">
                  {pagedArticles.map(post => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
                <Pagination
                  page={safeBlogPage}
                  totalPages={articleTotalPages}
                  onChange={p => setPageParam("blogPage", p)}
                />
              </>
            )}
          </section>

          {/* ── DIVIDER ── */}
          <div style={{
            display: "flex", alignItems: "center", gap: 14,
            margin: "16px 0 40px",
          }}>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            <span style={{
              fontFamily: "Lato,sans-serif",
              fontSize: 10, fontWeight: 700, letterSpacing: ".2em",
              textTransform: "uppercase", color: "var(--tl)",
            }}>
              ✦
            </span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>

          {/* ── SECTION 2: BIBLE STORIES ── */}
          <section>
            <Eyebrow text="Stories Retold" />
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "flex-end", flexWrap: "wrap", gap: 8, marginBottom: 4,
            }}>
              <SectionTitle text="Bible Stories" />
              <span style={{
                fontFamily: "Lato,sans-serif",
                fontSize: 9, fontWeight: 700, letterSpacing: ".18em",
                textTransform: "uppercase", color: "var(--tl)", marginBottom: 20,
              }}>
                {stories.length} stor{stories.length !== 1 ? "ies" : "y"}
              </span>
            </div>
            <p style={{
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              fontSize: "1.1rem", fontStyle: "italic",
              color: "var(--tm)", marginTop: -12, marginBottom: 24,
            }}>
              Faith, failure, and hope
            </p>

            {stories.length === 0 ? (
              <p style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: "1.3rem", color: "var(--tm)",
                fontStyle: "italic", textAlign: "center", padding: "60px 0",
              }}>
                No stories match your search yet.
              </p>
            ) : (
              <>
                <div className="blog-card-grid">
                  {pagedStories.map(post => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
                <Pagination
                  page={safeStoryPage}
                  totalPages={storyTotalPages}
                  onChange={p => setPageParam("storyPage", p)}
                />
              </>
            )}
          </section>

        </main>

        <aside className="blog-sidebar" style={{ position: "sticky", top: 76 }}>
          <SeriesPanel />
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

      <style>{`
        @media (max-width: 1024px) {
          .blog-layout {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .blog-sidebar {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
