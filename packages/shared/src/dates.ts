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

/**
 * The API's date fields (dateOfBirth, weddingDate, ...) are Java dates and only accept "yyyy-MM-dd"; anything else is
 * rejected with 400. This reads DD/MM/YYYY (also with - or .) or yyyy-MM-dd and returns "yyyy-MM-dd", or "" when the
 * text is not a real calendar date (so 31/02/2020 is refused, not sent).
 */
export function toIsoDate(v: string): string {
  const t = (v ?? "").trim();
  let y: number, mo: number, d: number;
  let m = t.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/);
  if (m) { d = +m[1]; mo = +m[2]; y = +m[3]; }
  else {
    m = t.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (!m) return "";
    y = +m[1]; mo = +m[2]; d = +m[3];
  }
  const dt = new Date(Date.UTC(y, mo - 1, d));
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== mo - 1 || dt.getUTCDate() !== d) return "";
  return `${y}-${String(mo).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}
