/*
 * The rules every public form is checked against, in the same spirit as the ROSMS forms: a real-looking email,
 * a phone number with the right number of digits, person names without digits or symbols, and dates that make sense.
 * Each check returns an error message, or "" when the value is fine (empty values are left to `required`).
 */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
const NAME_RE = /^[\p{L}][\p{L} .'’\-]*$/u;

export function checkEmail(v: string): string {
  const s = v.trim();
  return !s || EMAIL_RE.test(s) ? "" : "Enter a valid email address (for example name@example.com)";
}

export function checkPhone(v: string): string {
  const s = v.trim();
  if (!s) return "";
  if (!/^[+]?[\d\s().\-]+$/.test(s)) return "A phone number can only contain digits, spaces and + ( ) -";
  const digits = s.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15 ? "" : "Enter a valid phone number (7 to 15 digits)";
}

export function checkPersonName(v: string): string {
  const s = v.trim();
  if (!s) return "";
  if (s.length > 80) return "That name is too long";
  return NAME_RE.test(s) ? "" : "Use letters only (spaces, hyphens and apostrophes are fine)";
}

export function checkDate(v: string, opts: { notFuture?: boolean } = {}): string {
  if (!v) return "";
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return "Enter a valid date";
  if (d.getFullYear() < 1900) return "Enter a valid date";
  if (opts.notFuture && d.getTime() > Date.now()) return "This date cannot be in the future";
  return "";
}

/** Labels that are a person's name (not a church, school, place or street name). */
export const PERSON_NAME_LABEL = /\b(first name|middle name|last name|surname|other names?|full name|maiden name|name of (father|mother|parent|child|spouse|next of kin)|spouse'?s? name|child'?s? name|father'?s? name|mother'?s? name|pastor'?s? name|next of kin name|baby'?s? name)\b/i;
export const BIRTH_LABEL = /\b(date of birth|birth date|dob|birthday)\b/i;
