#!/usr/bin/env node

/**
 * scripts/validate-content.js
 *
 * Validates that all content markdown files are properly structured:
 * - All 7 days exist for each week
 * - No empty revelations, prayers, or practices
 * - Verses are properly formatted with label, text, and ref
 *
 * Run: node scripts/validate-content.js
 * Or:  npm run validate-content
 */

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const CONTENT_ROOT = path.join(__dirname, "..", "content");

let totalErrors = 0;
let totalWarnings = 0;

// ── Helpers ──────────────────────────────────────────────────────────────────

function error(msg) {
  console.log(`  ✗ ${msg}`);
  totalErrors++;
}

function warning(msg) {
  console.log(`  ⚠ ${msg}`);
  totalWarnings++;
}

function success(msg) {
  console.log(`  ✓ ${msg}`);
}

/**
 * Split a markdown body into named sections by ## headings.
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
 */
function toParagraphs(text) {
  return text
    .split(/\n{2,}/)
    .map((p) => p.replace(/\n/g, " ").replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

/**
 * Parse a bullet list section into an array of strings.
 */
function toBullets(text) {
  return text
    .split("\n")
    .map((line) => line.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean);
}

// ── Validation ───────────────────────────────────────────────────────────────

function validateDay(weekName, file, filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data: fm, content: body } = matter(raw);

  const sections = parseSections(body);

  // Validate frontmatter
  if (!fm.num) error(`${file}: Missing 'num' in frontmatter`);
  if (!fm.abbr) error(`${file}: Missing 'abbr' in frontmatter`);
  if (!fm.name) error(`${file}: Missing 'name' in frontmatter`);
  if (!fm.title) error(`${file}: Missing 'title' in frontmatter`);
  if (!fm.theme) error(`${file}: Missing 'theme' in frontmatter`);
  if (!fm.accent) error(`${file}: Missing 'accent' in frontmatter`);
  if (!fm.bg) error(`${file}: Missing 'bg' in frontmatter`);

  // Validate verses
  if (!fm.verses || !Array.isArray(fm.verses)) {
    error(`${file}: Missing or invalid 'verses' array in frontmatter`);
  } else {
    for (let i = 0; i < fm.verses.length; i++) {
      const verse = fm.verses[i];
      if (!verse.label) error(`${file}: Verse ${i + 1} missing 'label'`);
      if (!verse.text) error(`${file}: Verse ${i + 1} missing 'text'`);
      if (!verse.ref) error(`${file}: Verse ${i + 1} missing 'ref'`);
    }
  }

  // Validate sections
  const revelation = toParagraphs(sections["revelation"] ?? "");
  const prayers = toParagraphs(
    sections["morning prayer"] ?? sections["prayer"] ?? "",
  );
  const amen = (sections["amen"] ?? "In Jesus' name, Amen.").trim();
  const practices = toBullets(
    sections["daily practices"] ?? sections["practices"] ?? "",
  );

  if (!sections["revelation"]) {
    error(`${file}: Missing '## Revelation' section`);
  } else if (revelation.length === 0) {
    error(`${file}: '## Revelation' section is empty`);
  }

  if (!sections["morning prayer"] && !sections["prayer"]) {
    error(`${file}: Missing '## Morning Prayer' section`);
  } else if (prayers.length === 0) {
    error(`${file}: '## Morning Prayer' section is empty`);
  }

  if (!sections["amen"]) {
    warning(`${file}: Using default Amen (missing '## Amen' section)`);
  }

  if (!sections["daily practices"] && !sections["practices"]) {
    error(`${file}: Missing '## Daily Practices' section`);
  } else if (practices.length === 0) {
    error(`${file}: '## Daily Practices' section is empty`);
  }
}

function validateWeek(weekDir) {
  const weekName = path.basename(weekDir);
  console.log(`\n📖  Checking ${weekName}...`);

  const expectedDays = 7;
  const dayFiles = fs
    .readdirSync(weekDir)
    .filter((f) => f.endsWith(".md") && /day-\d+/.test(f))
    .sort((a, b) => {
      const na = parseInt(a.match(/\d+/)[0]);
      const nb = parseInt(b.match(/\d+/)[0]);
      return na - nb;
    });

  // Check all 7 days exist
  if (dayFiles.length !== expectedDays) {
    error(
      `${weekName}: Expected ${expectedDays} days, found ${dayFiles.length}`,
    );
  } else {
    // Check for gaps in day numbering
    for (let i = 1; i <= expectedDays; i++) {
      if (!dayFiles.some((f) => f === `day-${i}.md`)) {
        error(`${weekName}: Missing day-${i}.md`);
      }
    }
  }

  // Validate each day
  for (const file of dayFiles) {
    const filePath = path.join(weekDir, file);
    validateDay(weekName, file, filePath);
  }

  if (dayFiles.length > 0) {
    success(`${weekName}: ${dayFiles.length} days validated`);
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────

function main() {
  console.log("\n🔍  Validating content structure...\n");

  if (!fs.existsSync(CONTENT_ROOT)) {
    error(`content/ directory not found at ${CONTENT_ROOT}`);
    process.exit(1);
  }

  const weekDirs = fs
    .readdirSync(CONTENT_ROOT)
    .filter(
      (d) =>
        d.startsWith("week-") &&
        fs.statSync(path.join(CONTENT_ROOT, d)).isDirectory(),
    )
    .sort((a, b) => {
      const na = parseInt(a.split("-")[1]);
      const nb = parseInt(b.split("-")[1]);
      return na - nb;
    });

  if (weekDirs.length === 0) {
    error("No week directories found in content/");
    process.exit(1);
  }

  for (const weekDir of weekDirs) {
    validateWeek(path.join(CONTENT_ROOT, weekDir));
  }

  console.log("\n" + "─".repeat(50));
  if (totalErrors === 0 && totalWarnings === 0) {
    console.log("\n✅  All content is valid!\n");
    process.exit(0);
  } else {
    console.log(`\n${totalErrors} error(s), ${totalWarnings} warning(s)\n`);
    process.exit(totalErrors > 0 ? 1 : 0);
  }
}

main();
