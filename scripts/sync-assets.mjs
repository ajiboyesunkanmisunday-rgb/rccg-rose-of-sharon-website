#!/usr/bin/env node
/*
 * Builds apps/<app>/public from the single shared pool in packages/shared/public.
 *
 * Every image, font and stylesheet lives once, in packages/shared/public. Each app only receives the files it
 * actually uses: the base files every site needs, plus every /path/file.ext that the app's code (or the shared
 * code) mentions. Add extra files an app needs but never names literally to apps/<app>/assets.extra.json
 * (a list of paths or folders relative to the pool).
 *
 * Usage: node scripts/sync-assets.mjs [main|youth|training|media ...]   (no argument = all apps)
 * It runs automatically before `dev` and `build` in every app.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const pool = path.join(root, "packages/shared/public");
const ALL = ["main", "youth", "training", "media"];
const apps = process.argv.slice(2).length ? process.argv.slice(2) : ALL;

// needed by every site (the original stylesheets, fonts, logos, favicon and the hand icon)
const BASE = ["css", "logo.svg", "ros-logo.png", "favicon.ico", "hand.png", "seo.jpg", "signature.otf", "anton-regular.woff2"];
const BASE_PATTERNS = [/^lato-.*\.woff2$/];

const EXT = "png|jpe?g|gif|svg|webp|ico|woff2?|otf|ttf|mp4|mp3|pdf|avif";
const REF = new RegExp(`["'\`(]\\/((?!\\/)[A-Za-z0-9_\\-./%]+\\.(?:${EXT}))(?=["'\`)?#\\s])`, "g");

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name === ".next" || e.name === "public") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(tsx?|css|jsx?|mjs|json)$/.test(e.name)) out.push(p);
  }
  return out;
}

function copyRel(rel, dest, copied) {
  const src = path.join(pool, rel);
  if (!fs.existsSync(src)) return false;
  fs.cpSync(src, path.join(dest, rel), { recursive: true });
  copied.add(rel);
  return true;
}

for (const app of apps) {
  const appDir = path.join(root, "apps", app);
  const dest = path.join(appDir, "public");
  fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(dest, { recursive: true });
  const copied = new Set();
  const missing = new Set();

  for (const rel of BASE) copyRel(rel, dest, copied);
  for (const f of fs.readdirSync(pool)) if (BASE_PATTERNS.some((r) => r.test(f))) copyRel(f, dest, copied);

  const files = [...walk(path.join(appDir, "app")), ...walk(path.join(appDir, "components")), ...walk(path.join(root, "packages/shared/src"))];
  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    for (const m of text.matchAll(REF)) {
      let rel = decodeURIComponent(m[1]);
      if (!copyRel(rel, dest, copied)) missing.add(rel);
    }
  }

  const extraFile = path.join(appDir, "assets.extra.json");
  if (fs.existsSync(extraFile)) for (const rel of JSON.parse(fs.readFileSync(extraFile, "utf8"))) if (!copyRel(rel, dest, copied)) missing.add(rel);

  console.log(`[assets] ${app}: ${copied.size} files/folders copied${missing.size ? `, ${missing.size} referenced but not in the pool: ${[...missing].slice(0, 6).join(", ")}${missing.size > 6 ? " …" : ""}` : ""}`);
}
