import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // build output shown in your logs:
  // dist/public/index.html, dist/public/assets/...
  const distPath = path.resolve(process.cwd(), "dist", "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(`Could not find the build directory: ${distPath}`);
  }

  app.use(express.static(distPath));

  // SPA fallback (Express wildcard)
  app.get("*", (_req, res) => {
    res.type("html");
    res.sendFile(path.join(distPath, "index.html"));
  });
}
