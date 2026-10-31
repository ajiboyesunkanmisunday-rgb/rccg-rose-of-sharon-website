/**
 * Reads a date from the Rose of Sharon API. The API sends date-times as "2026-05-27 14:50:28" (a space, no "T"), which
 * Chrome accepts but Safari and iPhones reject as "Invalid Date". Plain dates ("2026-10-31") and ISO strings work too.
 * Returns null when the value is missing or not a date.
 */
export function parseApiDate(value?: string | number | null): Date | null {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value === "number") return new Date(value);
  const s = String(value).trim().replace(/^(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2})/, "$1T$2");
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}
