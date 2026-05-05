#!/usr/bin/env node

/**
 * scripts/build-content.js
 *
 * Converts markdown files in content/week-N/day-N.md
 * into TypeScript content files in lib/content/week-N.ts
 *
 * Run manually:   node scripts/build-content.js
 * Run at build:   added to package.json "prebuild" script
 *
 * Markdown file format:
 * ─────────────────────
 * ---
 * num: 1
 * abbr: "Mon"
 * name: "Monday"
 * title: "Your Day Title"
 * theme: "Theme Name · Subtitle"
 * accent: "#1A3A6E"
 * bg: "#EBF1FA"
 * verses:
 *   - label: "Anchor"
 *     text: "The verse text here"
 *     ref: "Book Chapter:Verse — NIV"
 *   - label: "Second Verse"
 *     text: "Another verse"
 *     ref: "Book Chapter:Verse — NIV"
 *   - label: "Third Verse"
 *     text: "Third verse"
 *     ref: "Book Chapter:Verse — NIV"
 * ---
 *
 * ## Revelation
 *
 * First paragraph of revelation. Write naturally with full
 * line breaks. No need to escape anything.
 *
 * Second paragraph. Each blank-line-separated block
 * becomes one entry in the revelation array.
 *
 * ## Morning Prayer
 *
 * First paragraph of prayer.
 *
 * Second paragraph of prayer.
 *
 * ## Amen
 *
 * In Jesus' name, Amen.
 *
 * ## Daily Practices
 *
 * - First practice description
 * - Second practice description
 * - Third practice description
 * - Fourth practice description
 */

const fs   = require("fs");
const path = require("path");
const matter = require("gray-matter");

const CONTENT_ROOT = path.join(__dirname, "..", "content");
const OUTPUT_ROOT  = path.join(__dirname, "..", "lib", "content");

// ── Helpers ──────────────────────────────────────────────────────────────────

function escapeTS(str) {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
}

/**
 * Split a markdown body into named sections by ## headings.
 * Returns { sectionName: rawText, ... }
 */
function parseSections(body) {
  const sections = {};
  const chunks = body.split(/^##\s+/m);
  for (const chunk of chunks) {
    if (!chunk.trim()) continue;
    const newline = chunk.indexOf("\n");
    if (newline === -1) continue;
    const heading = chunk.slice(0, newline).trim().toLowerCase();
    const content = chunk.slice(newline + 1).trim();
    sections[heading] = content;
  }
  return sections;
}

/**
 * Split a section into paragraphs (blank-line-separated blocks).
 * Collapses internal newlines within a paragraph into a single space.
 */
function toParagraphs(text) {
  return text
    .split(/\n{2,}/)
    .map(p => p.replace(/\n/g, " ").replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

/**
 * Parse a bullet list section into an array of strings.
 */
function toBullets(text) {
  return text
    .split("\n")
    .map(line => line.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean);
}

/**
 * Render a DayContent object as a TypeScript object literal string.
 */
function renderDay(day) {
  const versesStr = day.verses
    .map(v => `    {
      label: \`${escapeTS(v.label)}\`,
      text: \`${escapeTS(v.text)}\`,
      ref: \`${escapeTS(v.ref)}\`,
    }`)
    .join(",\n");

  const revelationStr = day.revelation
    .map(p => `    \`${escapeTS(p)}\``)
    .join(",\n");

  const prayersStr = day.prayers
    .map(p => `    \`${escapeTS(p)}\``)
    .join(",\n");

  const practicesStr = day.practices
    .map(p => `    \`${escapeTS(p)}\``)
    .join(",\n");

  return `  {
    num: ${day.num},
    abbr: "${day.abbr}",
    name: "${day.name}",
    title: \`${escapeTS(day.title)}\`,
    theme: \`${escapeTS(day.theme)}\`,
    accent: "${day.accent}",
    bg: "${day.bg}",
    verses: [
${versesStr}
    ],
    revelation: [
${revelationStr}
    ],
    prayers: [
${prayersStr}
    ],
    amen: \`${escapeTS(day.amen)}\`,
    practices: [
${practicesStr}
    ],
  }`;
}

// ── Main ─────────────────────────────────────────────────────────────────────

function processWeek(weekDir) {
  const weekName = path.basename(weekDir); // e.g. "week-2"
  const weekNum  = weekName.split("-")[1]; // e.g. "2"

  const dayFiles = fs
    .readdirSync(weekDir)
    .filter(f => f.endsWith(".md"))
    .sort((a, b) => {
      const na = parseInt(a.match(/\d+/)?.[0] ?? "0");
      const nb = parseInt(b.match(/\d+/)?.[0] ?? "0");
      return na - nb;
    });

  if (dayFiles.length === 0) {
    console.log(`  ⚠  ${weekName}: no .md files found, skipping`);
    return;
  }

  const days = [];

  for (const file of dayFiles) {
    const raw  = fs.readFileSync(path.join(weekDir, file), "utf8");
    const { data: fm, content: body } = matter(raw);

    const sections = parseSections(body);

    const revelation = toParagraphs(sections["revelation"] ?? "");
    const prayers    = toParagraphs(sections["morning prayer"] ?? sections["prayer"] ?? "");
    const amen       = (sections["amen"] ?? "In Jesus' name, Amen.").trim();
    const practices  = toBullets(sections["daily practices"] ?? sections["practices"] ?? "");

    if (revelation.length === 0) console.warn(`  ⚠  ${file}: no Revelation section found`);
    if (prayers.length === 0)    console.warn(`  ⚠  ${file}: no Morning Prayer section found`);
    if (practices.length === 0)  console.warn(`  ⚠  ${file}: no Daily Practices section found`);

    days.push({
      num:       fm.num,
      abbr:      fm.abbr,
      name:      fm.name,
      title:     fm.title,
      theme:     fm.theme,
      accent:    fm.accent,
      bg:        fm.bg,
      verses:    fm.verses ?? [],
      revelation,
      prayers,
      amen,
      practices,
    });
  }

  // Sort by num in case files are named oddly
  days.sort((a, b) => a.num - b.num);

  const daysCode = days.map(renderDay).join(",\n\n");

  const output = `// AUTO-GENERATED by scripts/build-content.js
// Source: content/${weekName}/
// Do not edit this file directly — edit the .md files instead,
// then run:  node scripts/build-content.js

import type { DayContent } from "./types";

const ${weekName.replace("-", "_")}: DayContent[] = [
${daysCode},
];

export default ${weekName.replace("-", "_")};
`;

  const outPath = path.join(OUTPUT_ROOT, `${weekName}.ts`);
  fs.writeFileSync(outPath, output, "utf8");
  console.log(`  ✓  ${weekName}.ts  (${days.length} days)`);
}

function main() {
  console.log("\n📖  Building content from markdown...\n");

  if (!fs.existsSync(CONTENT_ROOT)) {
    console.error(`  ✗  content/ directory not found at ${CONTENT_ROOT}`);
    process.exit(1);
  }

  const weekDirs = fs
    .readdirSync(CONTENT_ROOT)
    .filter(d => d.startsWith("week-"))
    .map(d => path.join(CONTENT_ROOT, d))
    .filter(d => fs.statSync(d).isDirectory())
    .sort();

  if (weekDirs.length === 0) {
    console.log("  No week directories found in content/");
    return;
  }

  for (const dir of weekDirs) {
    processWeek(dir);
  }

  console.log("\n✅  Done\n");
}

main();