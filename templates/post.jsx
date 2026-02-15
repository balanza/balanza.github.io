import { h } from "../engine/jsx-runtime.js";
import { siteTitle } from "../config.json";
import { renderHeader } from "./header.jsx";

export function renderPost(post) {
  const dateStr = post.date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    "<!DOCTYPE html>\n" +
    (
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>
            {post.title} — {siteTitle}
          </title>
          <link rel="stylesheet" href="../style.css" />
        </head>
        <body>
          <div className="container">
            {renderHeader()}
            <hr />
            <article>
              <header>
                <h1>{post.title}</h1>
                <div className="post-meta">{dateStr}</div>
              </header>
              <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </article>
            <a href="../index.html" className="back-link">
              {"\u2190"} Back to all posts
            </a>
          </div>
        </body>
      </html>
    )
  );
}
