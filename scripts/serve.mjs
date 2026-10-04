import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, extname } from "node:path";
const root = resolve("public");
const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
};
createServer(async (req, res) => {
  try {
    const path = resolve(
      root,
      "." + decodeURIComponent(new URL(req.url, "http://localhost").pathname),
    );
    if (path !== root && !path.startsWith(root + "/"))
      throw Error("Invalid path");
    const file = path === root ? root + "/index.html" : path;
    const content = await readFile(file);
    res.writeHead(200, {
      "Content-Type":
        (types[extname(file)] || "application/octet-stream") +
        "; charset=utf-8",
    });
    res.end(content);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
}).listen(4173, "0.0.0.0", () => console.log("Verso: http://localhost:4173"));
