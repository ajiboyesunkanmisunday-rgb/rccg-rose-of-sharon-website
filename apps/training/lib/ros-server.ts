/*
 * Server-side access to the Rose of Sharon API for pages whose data needs a login on the API (Face of the Month,
 * member look-up). The token is read from the server's environment and never reaches the browser.
 * ROS_API_TOKEN is preferred; ROS_MEDIA_TOKEN (already used by the sermons site) works too.
 */
export const ROS_ORIGIN = (process.env.ROS_API_ORIGIN || "http://137.184.72.16:6001").replace(/\/$/, "");

export function rosToken(): string | undefined {
  return process.env.ROS_API_TOKEN || process.env.ROS_MEDIA_TOKEN || undefined;
}

export async function rosFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const token = rosToken();
  return fetch(`${ROS_ORIGIN}/api/v1${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(init.headers ?? {}) },
    cache: "no-store",
  });
}
