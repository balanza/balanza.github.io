import { h } from "../engine/jsx-runtime.js";
import { siteTitle, siteDescription } from "../config.json";
import { renderHeader } from "./header.jsx";

export function renderIndex(posts) {
  return (
    "<!DOCTYPE html>\n" +
    (
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>{siteTitle}</title>
          <link rel="stylesheet" href="style.css" />
        </head>
        <body>
          <div className="container">
            {renderHeader()}
            <p>
              {siteDescription}
            </p>
            <hr />
            <ul className="post-list">
              {posts.map((post) => {
                const dateStr = post.date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
                return (
                  <li>
                    <span className="post-date">{dateStr}</span>
                    <a href={`posts/${post.slug}.html`} className="post-title">{post.title}</a>
                    {post.description && (
                      <span className="post-description">
                        {post.description}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </body>
      </html>
    )
  );
}
