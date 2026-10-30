import { NextResponse } from "next/server";
import { rosFetch, rosToken } from "@/lib/ros-server";

export const dynamic = "force-dynamic";

const digits = (s: string) => s.replace(/\D/g, "");

/**
 * Casts a vote on the Rose of Sharon API. The API wants the voter's member id, so the visitor gives the phone number
 * on their membership record and the member is looked up here on the server (their details are not sent back).
 */
export async function POST(req: Request) {
  if (!rosToken()) return NextResponse.json({ message: "Voting is not available right now." }, { status: 503 });
  let body: { eventId?: string; nomineeId?: string; category?: string; phone?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ message: "Invalid request." }, { status: 400 }); }
  const { eventId, nomineeId, category, phone } = body;
  if (!eventId || !nomineeId || !category || !phone || digits(phone).length < 7) {
    return NextResponse.json({ message: "Please choose a nominee and enter the phone number on your membership record." }, { status: 400 });
  }

  const wanted = digits(phone).replace(/^0+/, "");
  let voterId: string | undefined;
  for (const kind of ["member", "e-member"]) {
    const res = await rosFetch(`/users/${kind}/search?pageNo=0&pageSize=20`, { method: "POST", body: JSON.stringify({ text: digits(phone).replace(/^0+/, "") }) });
    if (!res.ok) continue;
    const people: { id: string; phoneNumber?: string }[] = (await res.json()).content ?? [];
    const match = people.find((p) => p.phoneNumber && digits(p.phoneNumber).replace(/^0+/, "").endsWith(wanted.slice(-10)));
    if (match) { voterId = match.id; break; }
  }
  if (!voterId) {
    return NextResponse.json({ message: "We could not find a membership with that phone number. Please use the number you registered with." }, { status: 404 });
  }

  const vote = await rosFetch(`/voting/${encodeURIComponent(eventId)}`, { method: "PUT", body: JSON.stringify({ voterId, votedFor: nomineeId, category }) });
  const json = await vote.json().catch(() => ({}));
  if (!vote.ok) return NextResponse.json({ message: json.message || "Your vote could not be recorded." }, { status: vote.status === 401 ? 502 : vote.status });
  return NextResponse.json({ message: json.message || "Thank you, your vote has been recorded." });
}
