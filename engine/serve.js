import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, extname } from "node:path";

const PORT = 8080;
const ROOT = "_site";

const MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
};

const server = createServer(async (req, res) => {
  let path = req.url.split("?")[0];
  if (path.endsWith("/")) path += "index.html";

  const file = join(ROOT, path);
  try {
    const data = await readFile(file);
    res.writeHead(200, { "Content-Type": MIME[extname(file)] || "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Serving ${ROOT}/ at http://localhost:${PORT}/`);
});
