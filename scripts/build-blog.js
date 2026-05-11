#!/usr/bin/env node

/**
 * scripts/build-blog.js
 *
 * Converts markdown files in content/blog/*.md
 * into a single TypeScript file: lib/blog-content.ts
 *
 * Run manually:   node scripts/build-blog.js
 * Auto-runs:      added to prebuild in package.json
 *
 * Markdown format:
 * ─────────────────
 * ---
 * slug: "your-post-slug"
 * title: "Post Title"
 * subtitle: "One line subtitle"
 * publishedAt: "2026-05-11"
 * author: "Allan"
 * tags: ["prayer", "faith"]
 * coverColor: "#2C3E5A"
 * excerpt: "One sentence shown on the index card."
 * ---
 *
 * ## Section Heading
 *
 * Paragraph content here. Write naturally.
 * Blank lines between paragraphs.
 *
 * ## Another Section
 *
 * More content.
 */

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const CONTENT_DIR = path.join(__dirname, "..", "content", "blog");
const OUTPUT_FILE = path.join(__dirname, "..", "lib", "blog-content.ts");

// ── Helpers ──────────────────────────────────────────────────────────────────

function escapeTS(str) {
  if (!str) return "";
  return str
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
}

/**
 * Parse markdown body into sections.
 * Returns { sectionName: [paragraph1, paragraph2, ...] }
 * Top-level content (before any ## heading) is stored as "intro"
 */
function parseBody(body) {
  const sections = {};
  const chunks = body.split(/^##\s+/m);

  for (const chunk of chunks) {
    const trimmed = chunk.trim();
    if (!trimmed) continue;

    const newline = trimmed.indexOf("\n");
    let heading, content;

    if (newline === -1) {
      // chunk is just a heading with no content
      heading = trimmed.toLowerCase();
      content = "";
    } else {
      heading = trimmed.slice(0, newline).trim().toLowerCase();
      content = trimmed.slice(newline + 1).trim();
    }

    // Split into paragraphs
    const paragraphs = content
      .split(/\n{2,}/)
      .map((p) => p.replace(/\n/g, " ").replace(/\s+/g, " ").trim())
      .filter(Boolean);

    sections[heading] = paragraphs;
  }

  // Content before first ## heading becomes "intro"
  const beforeFirstHeading = body.split(/^##\s+/m)[0].trim();
  if (beforeFirstHeading) {
    const introParagraphs = beforeFirstHeading
      .split(/\n{2,}/)
      .map((p) => p.replace(/\n/g, " ").replace(/\s+/g, " ").trim())
      .filter(Boolean);
    if (introParagraphs.length > 0) {
      sections["intro"] = introParagraphs;
    }
  }

  return sections;
}

/**
 * Convert parsed sections into a structured content array.
 * Each entry is { heading: string | null, paragraphs: string[] }
 */
function buildContentBlocks(body) {
  const blocks = [];
  const parts = body.split(/^(##\s+.+)$/m);

  let currentHeading = null;
  let buffer = [];

  for (const part of parts) {
    const headingMatch = part.match(/^##\s+(.+)$/);
    if (headingMatch) {
      if (buffer.length > 0) {
        blocks.push({ heading: currentHeading, paragraphs: buffer });
        buffer = [];
      }
      currentHeading = headingMatch[1].trim();
    } else {
      const paragraphs = part
        .trim()
        .split(/\n{2,}/)
        .map((p) => p.replace(/\n/g, " ").replace(/\s+/g, " ").trim())
        .filter(Boolean);
      buffer.push(...paragraphs);
    }
  }

  if (buffer.length > 0) {
    blocks.push({ heading: currentHeading, paragraphs: buffer });
  }

  return blocks.filter((b) => b.paragraphs.length > 0);
}

// ── Main ─────────────────────────────────────────────────────────────────────

function main() {
  console.log("\n✍️   Building blog content from markdown...\n");

  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
    console.log("  Created content/blog/ directory");
    console.log("  No posts found yet — add .md files to content/blog/\n");
    return;
  }

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();

  if (files.length === 0) {
    console.log("  No .md files found in content/blog/\n");
    return;
  }

  const posts = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data: fm, content: body } = matter(raw);

    if (!fm.slug || !fm.title) {
      console.warn(
        `  ⚠  ${file}: missing required frontmatter (slug, title) — skipping`,
      );
      continue;
    }

    const contentBlocks = buildContentBlocks(body);

    const blocksCode = contentBlocks
      .map(
        (b) => `    {
      heading: ${b.heading ? `\`${escapeTS(b.heading)}\`` : "null"},
      paragraphs: [
${b.paragraphs.map((p) => `        \`${escapeTS(p)}\``).join(",\n")}
      ],
    }`,
      )
      .join(",\n");

    const tagsCode = (fm.tags ?? []).map((t) => `"${t}"`).join(", ");

    posts.push(`  {
    slug: "${fm.slug}",
    title: \`${escapeTS(fm.title)}\`,
    subtitle: \`${escapeTS(fm.subtitle ?? "")}\`,
    publishedAt: "${fm.publishedAt ?? new Date().toISOString().slice(0, 10)}",
    author: "${fm.author ?? "Allan"}",
    tags: [${tagsCode}],
    coverColor: "${fm.coverColor ?? "#2C3E5A"}",
    excerpt: \`${escapeTS(fm.excerpt ?? "")}\`,
    readingTime: ${Math.ceil(body.split(/\s+/).length / 200)},
    content: [
${blocksCode}
    ],
  }`);

    console.log(`  ✓  ${fm.slug}  (${contentBlocks.length} sections)`);
  }

  const output = `// AUTO-GENERATED by scripts/build-blog.js
// Source: content/blog/
// Do not edit this file directly — edit the .md files instead,
// then run: node scripts/build-blog.js

export interface BlogContentBlock {
  heading: string | null;
  paragraphs: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  publishedAt: string;
  author: string;
  tags: string[];
  coverColor: string;
  excerpt: string;
  readingTime: number;
  content: BlogContentBlock[];
}

export const BLOG_POSTS: BlogPost[] = [
${posts.join(",\n\n")}
];

export function getBlogPost(slug: string): BlogPost | null {
  return BLOG_POSTS.find(p => p.slug === slug) ?? null;
}

export function getBlogPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return getBlogPosts().filter(p => p.tags.includes(tag));
}

export function getAllTags(): string[] {
  const tags = BLOG_POSTS.flatMap(p => p.tags);
  return [...new Set(tags)].sort();
}
`;

  fs.writeFileSync(OUTPUT_FILE, output, "utf8");
  console.log(
    `\n✅  Done — ${posts.length} post${posts.length !== 1 ? "s" : ""} written to lib/blog-content.ts\n`,
  );
}

main();
