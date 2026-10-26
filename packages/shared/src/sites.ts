/*
 * The Rose of Sharon family of sites.
 *
 * Every page is written with ONE canonical path (for example /youth/about or /trainings/water-baptism),
 * whichever site actually serves it. resolveHref() turns a canonical path into the right address for the
 * site that is currently rendering:
 *   - a page this site owns   -> a plain local path        (youth site: /youth/about  ->  /about)
 *   - a page another site owns -> that site's full address  (main site:  /youth/about  ->  https://youth.rccgros.org/about)
 * so the sites are reachable from one another, and each one also works on its own address.
 */

export type SiteKey = "main" | "youth" | "training" | "media";

export const SITE_KEYS: SiteKey[] = ["main", "youth", "training", "media"];

/** Local development ports (npm run dev starts all four). */
export const DEV_PORTS: Record<SiteKey, number> = { main: 3002, youth: 3003, training: 3004, media: 3005 };

/** Public addresses used in production when no environment variable overrides them. */
const PRODUCTION_URLS: Record<SiteKey, string> = {
  main: "https://www.rccgros.org",
  youth: "https://youth.rccgros.org",
  training: "https://training.rccgros.org",
  media: "https://media.rccgros.org",
};

// NEXT_PUBLIC_* values must be written out in full so Next can inline them at build time.
const ENV_URLS: Record<SiteKey, string | undefined> = {
  main: process.env.NEXT_PUBLIC_URL_MAIN,
  youth: process.env.NEXT_PUBLIC_URL_YOUTH,
  training: process.env.NEXT_PUBLIC_URL_TRAINING,
  media: process.env.NEXT_PUBLIC_URL_MEDIA,
};

export function siteUrl(site: SiteKey): string {
  const fromEnv = ENV_URLS[site];
  const base = fromEnv || (process.env.NODE_ENV === "production" ? PRODUCTION_URLS[site] : `http://localhost:${DEV_PORTS[site]}`);
  return base.replace(/\/+$/, "");
}

/** The site this build is. Each app sets NEXT_PUBLIC_SITE in its next.config. */
export const CURRENT_SITE: SiteKey = (process.env.NEXT_PUBLIC_SITE as SiteKey) || "main";

interface Rule { site: SiteKey; test: RegExp; map: (path: string) => string }

/** Which site owns which canonical path, and where that page lives inside the owning site. */
const RULES: Rule[] = [
  { site: "youth", test: /^\/youth(\/|$)/, map: (p) => p.replace(/^\/youth/, "") || "/" },
  { site: "training", test: /^\/trainings(\/|$)/, map: (p) => p.replace(/^\/trainings/, "") || "/" },
  { site: "training", test: /^\/csr(\/|$)/, map: (p) => p },
  { site: "media", test: /^\/media(\/|$)/, map: (p) => p.replace(/^\/media/, "") || "/" },
  { site: "media", test: /^\/(events|announcements|testimonies|gallery)(\/|$)/, map: (p) => p },
];

function isPlain(href: string) {
  return !href || href.startsWith("#") || /^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("//");
}

/** Which site owns a canonical path. */
export function ownerOf(path: string): SiteKey {
  return RULES.find((r) => r.test.test(path))?.site ?? "main";
}

/** Canonical path -> the path inside the site that owns it (without the address). */
export function localPath(href: string): string {
  const [path] = href.split(/[?#]/);
  const rule = RULES.find((r) => r.test.test(path));
  return rule ? rule.map(path) : path;
}

/** Canonical href -> the real href for the site that is rendering it. */
export function resolveHref(href: string, current: SiteKey = CURRENT_SITE): string {
  if (isPlain(href)) return href;
  const m = href.match(/^([^?#]*)(.*)$/)!;
  const path = m[1];
  const rest = m[2];
  const rule = RULES.find((r) => r.test.test(path));
  const owner: SiteKey = rule?.site ?? "main";
  const local = (rule ? rule.map(path) : path) + rest;
  return owner === current ? local : siteUrl(owner) + local;
}

/** True when `pathname` (as the router reports it on this site) is the page `href` points to. */
export function isHere(pathname: string, href: string, current: SiteKey = CURRENT_SITE): boolean {
  if (ownerOf(href.split(/[?#]/)[0]) !== current) return false;
  return pathname === localPath(href);
}

/** True when `pathname` is the page `href` points to, or sits below it (used for tab strips). */
export function isUnder(pathname: string, href: string, current: SiteKey = CURRENT_SITE): boolean {
  if (ownerOf(href.split(/[?#]/)[0]) !== current) return false;
  const l = localPath(href);
  return pathname === l || (l !== "/" && pathname.startsWith(l + "/"));
}
