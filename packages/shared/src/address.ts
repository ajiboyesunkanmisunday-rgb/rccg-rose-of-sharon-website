/**
 * What the API accepts as an address (tested against the live backend, 2026-11-11):
 *  - first-timer, new believer, e-member: street and city are free; state and country must be given TOGETHER or not at
 *    all ("Address is incomplete" otherwise);
 *  - member: the whole address (street, city, state and country) or none of it.
 * The forms pre-fill the country ("Nigeria"), so a country alone is treated as "no address".
 */
export type Address = { street?: string; city?: string; state?: string; country?: string };

export function addressForApi(
  a: { street: string; city: string; state: string; country: string },
  mode: "state-country" | "full",
): { fields: Address; error?: string } {
  const street = a.street.trim(), city = a.city.trim(), state = a.state.trim(), country = a.country.trim();
  if (mode === "full") {
    if (!street && !city && !state) return { fields: {} };
    if (street && city && state && country) return { fields: { street, city, state, country } };
    return { fields: {}, error: "Please give your full address (street, city, state and country), or leave the address empty." };
  }
  const fields: Address = {};
  if (street) fields.street = street;
  if (city) fields.city = city;
  if (state && country) { fields.state = state; fields.country = country; }
  else if (state && !country) return { fields: {}, error: "Please choose your country along with the state." };
  return { fields };
}
