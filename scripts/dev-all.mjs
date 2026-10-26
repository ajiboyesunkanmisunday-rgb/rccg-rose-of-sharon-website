#!/usr/bin/env node
/* Starts all four sites for local development: main 3002, youth 3003, training 3004, media 3005. */
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const sites = process.argv.slice(2).length ? process.argv.slice(2) : ["main", "youth", "training", "media"];
const colours = { main: "\x1b[36m", youth: "\x1b[35m", training: "\x1b[33m", media: "\x1b[32m" };
const children = sites.map((site) => {
  const child = spawn("npm", ["run", "dev", "-w", `@ros/${site}`], { cwd: root, stdio: ["ignore", "pipe", "pipe"], env: process.env });
  const tag = `${colours[site] ?? ""}[${site}]\x1b[0m `;
  const pipe = (stream, out) => stream.on("data", (d) => String(d).split("\n").filter(Boolean).forEach((l) => out.write(tag + l + "\n")));
  pipe(child.stdout, process.stdout);
  pipe(child.stderr, process.stderr);
  return child;
});
const stop = () => children.forEach((c) => c.kill("SIGTERM"));
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
