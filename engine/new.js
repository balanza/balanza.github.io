import { writeFileSync, existsSync } from "fs";
import { join } from "path";

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Usage: npm run new -- <title>");
  process.exit(1);
}

const title = args.join(" ");
const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, "")
  .trim()
  .replace(/\s+/g, "-");

const now = new Date();
const date = now.toISOString().slice(0, 10);
const dateCompact = date.replace(/-/g, "");

const filename = `${dateCompact}-${slug}.md`;
const filepath = join("posts", filename);

if (existsSync(filepath)) {
  console.error(`File already exists: ${filepath}`);
  process.exit(1);
}

const content = `---
title: "${title}"
date: ${date}
status: draft
---

`;

writeFileSync(filepath, content);
console.log(`Created: ${filepath}`);
