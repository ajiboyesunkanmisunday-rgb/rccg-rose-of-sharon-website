import { RESPONSIVE } from "./responsive";

/**
 * `srcSet` for one of our own pictures, so a phone downloads a small WebP copy instead of the full-size photo.
 * Returns undefined for a picture without copies (small files, other sites, anything else), which leaves the
 * <img> exactly as it was. Copies are made by scripts/make-responsive.mjs.
 */
export function srcSetFor(src: string | null | undefined): string | undefined {
  if (!src || src[0] !== "/") return undefined;
  const entry = RESPONSIVE[src.slice(1)];
  if (!entry) return undefined;
  const [full, widths] = entry;
  const base = src.replace(/\.[^.]+$/, "");
  return [...widths.map((w) => `${base}.w${w}.webp ${w}w`), `${src} ${full}w`].join(", ");
}
