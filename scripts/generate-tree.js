#!/usr/bin/env node

/**
 * scripts/generate-tree.js
 * Generates a text tree of the project structure
 */

const fs = require("fs");
const path = require("path");

const IGNORE = [
  "node_modules",
  ".next",
  "dist",
  "build",
  ".git",
  ".gitignore",
  ".DS_Store",
];

function generateTree(dir, prefix = "", maxDepth = 3, currentDepth = 0) {
  if (currentDepth >= maxDepth) return "";

  let output = "";

  try {
    const files = fs.readdirSync(dir).sort();
    const filtered = files.filter((f) => !IGNORE.includes(f));

    filtered.forEach((file, index) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      const isLast = index === filtered.length - 1;
      const connector = isLast ? "└── " : "├── ";
      const nextPrefix = prefix + (isLast ? "    " : "│   ");

      output += prefix + connector + file;
      if (stat.isDirectory()) {
        output += "/\n";
        output += generateTree(
          filePath,
          nextPrefix,
          maxDepth,
          currentDepth + 1,
        );
      } else {
        output += "\n";
      }
    });
  } catch (e) {
    // silently ignore permission errors
  }

  return output;
}

const root = path.join(__dirname, "..");
console.log(path.basename(root) + "/");
console.log(generateTree(root));
