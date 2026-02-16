import { readdir, readFile, writeFile, mkdir, cp, rm } from "node:fs/promises";
import { join, basename } from "node:path";
import { build as esbuild } from "esbuild";
import matter from "gray-matter";
import { marked } from "marked";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const config = require("../config.json");

const POSTS_DIR = "posts";
const STATIC_DIR = "static";
const OUT_DIR = "_site";

// Compile a JSX template and return its exports
async function importJsx(entryPoint) {
  const result = await esbuild({
    entryPoints: [entryPoint],
    bundle: true,
    write: false,
    format: "esm",
    jsx: "transform",
    jsxFactory: "h",
    jsxFragment: "Fragment",
  });
  const url = `data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString("base64")}`;
  return import(url);
}

const [{ renderPost }, { renderIndex }] = await Promise.all([
  importJsx("templates/post.jsx"),
  importJsx("templates/index.jsx"),
]);

// Clean and recreate output directories
await rm(OUT_DIR, { recursive: true, force: true });
await mkdir(join(OUT_DIR, "posts"), { recursive: true });

// Write .nojekyll
await writeFile(join(OUT_DIR, ".nojekyll"), "");

// Read and parse all posts
const files = (await readdir(POSTS_DIR)).filter((f) => f.endsWith(".md"));
const posts = await Promise.all(
  files.map(async (file) => {
    const raw = await readFile(join(POSTS_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const html = marked(content);
    const slug = basename(file, ".md");
    return {
      title: data.title,
      date: new Date(data.date),
      description: data.description || "",
      slug,
      html,
    };
  })
);

// Sort newest first
posts.sort((a, b) => b.date - a.date);

// Generate post pages
for (const post of posts) {
  const html = renderPost(post);
  await writeFile(join(OUT_DIR, "posts", `${post.slug}.html`), String(html));
}

// Generate index
const indexHtml = renderIndex(posts);
await writeFile(join(OUT_DIR, "index.html"), String(indexHtml));

// Generate RSS feed
function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const rssItems = posts.map((post) => {
  const pubDate = post.date.toUTCString();
  const link = `${config.siteUrl}/posts/${post.slug}.html`;
  return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`;
}).join("\n");

const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(config.siteTitle)}</title>
    <link>${config.siteUrl}</link>
    <description>${escapeXml(config.siteDescription)}</description>
    <language>en</language>
    <atom:link href="${config.siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>
`;

await writeFile(join(OUT_DIR, "feed.xml"), rssFeed);

// Copy static files
await cp(STATIC_DIR, OUT_DIR, { recursive: true });

console.log(`Built ${posts.length} posts to ${OUT_DIR}/`);
