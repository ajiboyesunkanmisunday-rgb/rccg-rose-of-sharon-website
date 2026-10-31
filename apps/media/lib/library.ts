/*
 * Media uploaded in the ROSMS media section (Rose of Sharon API), read on the SERVER only: the API needs a token,
 * which comes from ROS_API_TOKEN or ROS_MEDIA_TOKEN and never reaches the browser. With no token, or on any API
 * error, every function returns nothing and the site shows what it always did.
 */
import { ALBUMS, ALBUM_CATEGORIES, type Album, type AlbumCategory } from "@ros/shared/kit/albums";

export interface LibraryMedia {
  id: string;
  title?: string;
  displayName?: string;
  displayUrl?: string;
  thumbnailUrl?: string;
  speaker?: string;
  description?: string;
  date?: string;
  createdOn?: string;
  tags?: string[];
}

export const libraryToken = () => process.env.ROS_API_TOKEN || process.env.ROS_MEDIA_TOKEN || undefined;
const origin = () => (process.env.ROS_API_ORIGIN || "http://137.184.72.16:6001").replace(/\/$/, "");

/** ROSMS tells videos from pictures by the file extension, or "/VIDEOS/" in the address. */
export const isVideoUrl = (url: string) => /\.(mp4|mov|webm|avi|mkv|m4v|ogv)(\?|$)/i.test(url) || url.includes("/VIDEOS/");

export async function fetchCategory(category: string): Promise<LibraryMedia[]> {
  const token = libraryToken();
  if (!token) return [];
  try {
    const res = await fetch(`${origin()}/api/v1/media/category?category=${encodeURIComponent(category)}&pageNo=0&pageSize=100`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json.content) ? json.content : [];
  } catch {
    return [];
  }
}

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function categoryFor(name: string, tags: string[]): AlbumCategory {
  const hit = ALBUM_CATEGORIES.find((c) => tags.some((t) => t.trim().toLowerCase() === c.toLowerCase()));
  if (hit) return hit;
  const s = `${name} ${tags.join(" ")}`;
  if (/crusade|outreach|light up|evangel/i.test(s)) return "Crusades & Outreach";
  if (/child|kids|teen|youth|school|ylp/i.test(s)) return "Children & Youth";
  if (/sunday|first service|second service|midweek|digging deep|prayer meeting/i.test(s)) return "Sunday Services";
  return "Special Services";
}

/** Turns the pictures in the media library into albums: one per first tag, or one per month when a picture has no tag. */
export function buildAlbums(images: LibraryMedia[], staticSlugs: string[] = ALBUMS.map((a) => a.slug)): Album[] {
  const groups = new Map<string, { title: string; items: LibraryMedia[]; tags: string[] }>();
  for (const m of images) {
    if (!m.displayUrl || isVideoUrl(m.displayUrl)) continue;
    const when = new Date(m.date || m.createdOn || 0);
    const valid = !Number.isNaN(when.getTime()) && when.getTime() > 0;
    const tag = (m.tags ?? []).map((t) => t.trim()).find(Boolean);
    const title = tag || (valid ? `${MONTHS[when.getUTCMonth()]} ${when.getUTCFullYear()}` : "More photos");
    const key = slugify(title) || "photos";
    const g = groups.get(key) ?? { title, items: [], tags: [] };
    g.items.push(m);
    for (const t of m.tags ?? []) if (!g.tags.includes(t)) g.tags.push(t);
    groups.set(key, g);
  }
  const out: Album[] = [];
  for (const [key, g] of groups) {
    const items = [...g.items].sort((a, b) => +new Date(b.date || b.createdOn || 0) - +new Date(a.date || a.createdOn || 0));
    const newest = new Date(items[0].date || items[0].createdOn || Date.now());
    const iso = Number.isNaN(newest.getTime()) ? new Date().toISOString().slice(0, 10) : newest.toISOString().slice(0, 10);
    const slug = staticSlugs.includes(key) ? `${key}-library` : key;
    out.push({
      slug,
      title: g.title,
      iso,
      date: new Date(iso + "T12:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      category: categoryFor(g.title, g.tags),
      text: items.find((i) => i.description)?.description ?? "Pictures from the media team.",
      count: items.length,
      cover: items[0].thumbnailUrl || items[0].displayUrl,
      photos: items.map((i, n) => ({ src: i.displayUrl!, thumb: i.thumbnailUrl || i.displayUrl!, alt: i.title || `${g.title}, photo ${n + 1}` })),
    });
  }
  return out;
}

/** Albums from the media library first, then the church's own albums that live with the site. */
export async function getAllAlbums(): Promise<Album[]> {
  const images = await fetchCategory("IMAGES");
  return [...buildAlbums(images), ...ALBUMS];
}
