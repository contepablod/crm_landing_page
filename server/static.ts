import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // assuming repo structure:
  // /client (vite app)
  // /server (express)
  // build output -> /client/dist
  const distPath = path.resolve(process.cwd(), "client", "dist");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}. Did you run the client build?`,
    );
  }

  app.use(express.static(distPath));

  // SPA fallback
  app.get("*", (_req, res) => {
    res.type("html");
    res.sendFile(path.join(distPath, "index.html"));
  });
}
