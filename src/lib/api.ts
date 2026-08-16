export const API_BASE = "http://137.184.72.16:6001/api/v1";

export async function post(path: string, body: object) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "An error occurred" }));
    throw new Error(err.message || "Submission failed");
  }
  return res.json();
}
