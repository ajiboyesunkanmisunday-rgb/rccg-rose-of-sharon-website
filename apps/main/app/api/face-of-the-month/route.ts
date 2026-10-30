import { NextResponse } from "next/server";
import { rosFetch, rosToken } from "@/lib/ros-server";

export const dynamic = "force-dynamic";

/** The current Face of the Month voting event and its nominees, straight from the Rose of Sharon API. */
export async function GET() {
  if (!rosToken()) return NextResponse.json({ available: false, reason: "not-configured" });
  try {
    const list = await rosFetch("/face-of-the-months?pageNo=0&pageSize=20");
    if (!list.ok) return NextResponse.json({ available: false, reason: "api" });
    const events: { id: string; title?: string; votingStartTime?: string; votingEndTime?: string; totalVotes?: number }[] = (await list.json()).content ?? [];
    if (!events.length) return NextResponse.json({ available: true, event: null });
    // the event that is open now, otherwise the one that started most recently
    const now = Date.now();
    const time = (s?: string) => (s ? new Date(s).getTime() : 0);
    const open = events.find((e) => time(e.votingStartTime) <= now && now <= time(e.votingEndTime));
    const current = open ?? [...events].sort((a, b) => time(b.votingStartTime) - time(a.votingStartTime))[0];

    const full = await rosFetch(`/face-of-the-months/${encodeURIComponent(current.id)}`);
    if (!full.ok) return NextResponse.json({ available: false, reason: "api" });
    const detail = await full.json();
    const start = detail.votingStartTime ?? current.votingStartTime;
    const end = detail.votingEndTime ?? current.votingEndTime;
    const status = now < time(start) ? "upcoming" : now > time(end) ? "closed" : "open";
    // only what the public page needs: no phone numbers, emails or addresses
    const nominees = (detail.nominees ?? []).map((n: Record<string, unknown>) => ({
      id: n.id,
      name: [n.firstName, n.middleName, n.lastName].filter(Boolean).join(" "),
      sex: n.sex,
      photo: n.profilePictureUrl ?? null,
      votes: typeof n.voteCount === "number" ? n.voteCount : 0,
    }));
    return NextResponse.json({
      available: true,
      event: { id: current.id, title: detail.title ?? current.title, start, end, status, totalVotes: current.totalVotes ?? nominees.reduce((a: number, n: { votes: number }) => a + n.votes, 0) },
      nominees,
    });
  } catch {
    return NextResponse.json({ available: false, reason: "api" });
  }
}
