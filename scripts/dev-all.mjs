#!/usr/bin/env node
/* Starts all four sites for local development: main 3002, youth 3003, training 3004, media 3005. */
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync, readFileSync } from "node:fs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
// optional local login for the Rose of Sharon API (see .env.local.example); the file is never committed
const envFile = path.join(root, ".env.local");
const fileEnv = {};
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !line.trim().startsWith("#")) fileEnv[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
const sites = process.argv.slice(2).length ? process.argv.slice(2) : ["main", "youth", "training", "media"];
const colours = { main: "\x1b[36m", youth: "\x1b[35m", training: "\x1b[33m", media: "\x1b[32m" };
const children = sites.map((site) => {
  const child = spawn("npm", ["run", "dev", "-w", `@ros/${site}`], { cwd: root, stdio: ["ignore", "pipe", "pipe"], env: { ...process.env, ...fileEnv } });
  const tag = `${colours[site] ?? ""}[${site}]\x1b[0m `;
  const pipe = (stream, out) => stream.on("data", (d) => String(d).split("\n").filter(Boolean).forEach((l) => out.write(tag + l + "\n")));
  pipe(child.stdout, process.stdout);
  pipe(child.stderr, process.stderr);
  return child;
});
const stop = () => children.forEach((c) => c.kill("SIGTERM"));
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
