/*
 * Server-side access to the Rose of Sharon API for pages whose data needs a login on the API (Face of the Month,
 * member look-up, media, schedules). Nothing here reaches the browser.
 *
 * Credentials come from the server's environment, in order of preference:
 *   ROS_API_EMAIL + ROS_API_PASSWORD  - a read-only service account; the site signs in the same way the management
 *                                       app does (POST /users/login, token in the Authorization response header),
 *                                       keeps the token in memory and signs in again when the API answers 401
 *   ROS_API_TOKEN / ROS_MEDIA_TOKEN   - a ready-made token (expires, so it needs replacing when it does)
 */
export const ROS_ORIGIN = (process.env.ROS_API_ORIGIN || "http://137.184.72.16:6001").replace(/\/$/, "");

let cached: { token: string; at: number } | null = null;
let pending: Promise<string | undefined> | null = null;

const asBearer = (t: string) => (/^bearer\s/i.test(t) ? t : `Bearer ${t}`);

async function login(): Promise<string | undefined> {
  const email = process.env.ROS_API_EMAIL;
  const password = process.env.ROS_API_PASSWORD;
  if (!email || !password) return undefined;
  try {
    const res = await fetch(`${ROS_ORIGIN}/api/v1/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });
    const header = res.headers.get("authorization");
    if (!res.ok || !header) return undefined;
    cached = { token: asBearer(header), at: Date.now() };
    return cached.token;
  } catch {
    return undefined;
  }
}

function signIn(force = false): Promise<string | undefined> {
  if (!force && cached && Date.now() - cached.at < 6 * 3600_000) return Promise.resolve(cached.token);
  pending ??= login().finally(() => { pending = null; });
  return pending;
}

export function rosToken(): string | undefined {
  const fixed = process.env.ROS_API_TOKEN || process.env.ROS_MEDIA_TOKEN;
  return fixed ? asBearer(fixed) : undefined;
}

/** True when the server has some way to sign in to the API. */
export function rosConfigured(): boolean {
  return Boolean((process.env.ROS_API_EMAIL && process.env.ROS_API_PASSWORD) || rosToken());
}

export async function rosFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const send = (auth?: string) =>
    fetch(`${ROS_ORIGIN}/api/v1${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...(auth ? { Authorization: auth } : {}), ...(init.headers ?? {}) },
      cache: "no-store",
    });
  const hasAccount = Boolean(process.env.ROS_API_EMAIL && process.env.ROS_API_PASSWORD);
  const res = await send(hasAccount ? await signIn() : rosToken());
  if (res.status === 401 && hasAccount) {
    const fresh = await signIn(true);
    if (fresh) return send(fresh);
  }
  return res;
}

const digitsOnly = (s: string) => s.replace(/\D/g, "");

/**
 * Finds the church member behind a membership email or phone number. The backend's dedicated verify endpoint
 * (POST /users/verify) is tried first; when it does not know the person, the member and e-member searches are used,
 * exactly as before. `via` says which one answered. Only the id and first name are returned, never contact details.
 */
export async function findMember(identifier: string): Promise<{ id: string; firstName: string; via: "verify" | "search" } | null> {
  const isEmail = identifier.includes("@");
  const phone10 = digitsOnly(identifier).replace(/^0+/, "").slice(-10);
  const candidates = isEmail ? [identifier] : [identifier, `0${phone10}`, phone10];
  for (const text of [...new Set(candidates)]) {
    try {
      // POST /users/verify {text}: 200 with the member, 400 "You are not a register member." when there is none
      const res = await rosFetch("/users/verify", { method: "POST", body: JSON.stringify({ text }) });
      if (!res.ok) continue;
      const u = await res.json();
      if (u?.id) return { id: u.id, firstName: u.firstName ?? "", via: "verify" };
    } catch { /* fall back to the search below */ }
  }
  type Person = { id: string; firstName?: string; email?: string; phoneNumber?: string };
  for (const kind of ["member", "e-member"]) {
    try {
      const res = await rosFetch(`/users/${kind}/search?pageNo=0&pageSize=20`, { method: "POST", body: JSON.stringify({ text: isEmail ? identifier : phone10 }) });
      if (!res.ok) continue;
      const people: Person[] = (await res.json()).content ?? [];
      const match = people.find((p) => isEmail
        ? p.email?.trim().toLowerCase() === identifier.toLowerCase()
        : !!p.phoneNumber && digitsOnly(p.phoneNumber).replace(/^0+/, "").slice(-10) === phone10);
      if (match) return { id: match.id, firstName: match.firstName ?? "", via: "search" };
    } catch { /* try the next list */ }
  }
  return null;
}

const hits = new Map<string, number[]>();

/**
 * Small per-visitor limit for the routes that look people up or cast votes, so they cannot be used to guess emails or
 * phone numbers, or to stuff the ballot. Counted in memory per server instance, which is enough to slow abuse down.
 */
export function tooManyRequests(req: Request, bucket: string, max = 12, windowMs = 10 * 60_000): boolean {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || req.headers.get("x-real-ip") || "local";
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  return recent.length > max;
}
