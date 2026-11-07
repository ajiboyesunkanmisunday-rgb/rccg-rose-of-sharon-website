/**
 * The Rose of Sharon API sometimes sends damaged JSON: a null date-time comes out as `"createdOn":]` (the opening
 * bracket is lost). The management app repairs it the same way before reading the text. Returns null when the text
 * cannot be read even after the repair.
 */
export function parseApiJson<T = unknown>(text: string): T | null {
  if (!text) return null;
  try {
    return JSON.parse(text) as T;
  } catch {
    try {
      const fixed = text.replace(/("[^"\\]+")\s*:\s*\]/g, "$1:null").replace(/("[^"\\]+")\s*:\s*(?=[,}])/g, "$1:null");
      return JSON.parse(fixed) as T;
    } catch {
      return null;
    }
  }
}

/** API dates are sometimes arrays ([2026, 5, 31]) instead of "2026-05-31". */
export function isoDay(v: unknown): string | null {
  if (typeof v === "string") return v.slice(0, 10);
  if (Array.isArray(v) && v.length >= 3) return `${v[0]}-${String(v[1]).padStart(2, "0")}-${String(v[2]).padStart(2, "0")}`;
  return null;
}

/**
 * Events as the public pages need them: the people attached to an event (first timers, second timers, new converts,
 * with their emails and phone numbers) are dropped, which also shrinks a month from hundreds of KB to a few.
 */
export function leanEvents(list: unknown): Record<string, unknown>[] {
  if (!Array.isArray(list)) return [];
  return list.map((e: Record<string, unknown>) => {
    const { firstTimers, secondTimers, newConverts, ...rest } = e; // eslint-disable-line @typescript-eslint/no-unused-vars
    return { ...rest, date: isoDay(e.date) ?? e.date };
  });
}
