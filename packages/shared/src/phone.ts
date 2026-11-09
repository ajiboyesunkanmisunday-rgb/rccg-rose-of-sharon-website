/**
 * Phone numbers are stored by the API as digits only, without the leading 0 and without the country code (the country
 * code is its own field, digits only: "234", not "+234"). This is exactly how the management app saves them, and it is
 * the form POST /users/verify matches on. "0806 902 8150" and "+234 806 902 8150" typed beside a +234 selector both
 * become "8069028150".
 */
export function normalizePhone(raw: string, countryCode?: string): string {
  let n = (raw ?? "").trim().replace(/\D/g, "");
  const cc = (countryCode ?? "").replace(/\D/g, "");
  // someone typed the country code into the number box as well (e.g. 234 806 ...): drop it, Nigerian numbers have 10 digits
  if (cc === "234" && n.startsWith("234") && n.length === 13) n = n.slice(3);
  if (n.startsWith("0")) n = n.slice(1);
  return n;
}

/** Country code as the API stores it: digits only ("+234" -> "234"). */
export const countryDigits = (cc: string): string => (cc ?? "").replace(/\D/g, "");
