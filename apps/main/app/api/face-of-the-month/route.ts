import { NextResponse } from "next/server";
import { rosFetch, rosConfigured } from "@/lib/ros-server";
import { parseApiDate } from "@ros/shared/dates";

export const dynamic = "force-dynamic";

type Ev = { id: string; title?: string; votingStartTime?: string; votingEndTime?: string; totalVotes?: number };
const time = (v?: string) => parseApiDate(v)?.getTime() ?? 0;

/**
 * The current Face of the Month voting event and its nominees. The open event comes from the API's public
 * /face-of-the-months/available endpoint (no login needed). With the server login, the older events are listed too:
 * for the Hall of Fame, and as a fallback when nothing is available right now.
 */
export async function GET() {
  try {
    let detail: { id?: string; title?: string; votingStartTime?: string; votingEndTime?: string; nominees?: Record<string, unknown>[] } | null = null;
    let current: Ev | null = null;
    let hallOfFame: Awaited<ReturnType<typeof hallOfFameOf>> = [];
    let events: Ev[] = [];

    const av = await rosFetch("/face-of-the-months/available");
    if (av.ok) {
      const d = await av.json().catch(() => null);
      if (d?.id && time(d.votingStartTime) && time(d.votingEndTime)) { detail = d; current = d; }
    } else if (av.status >= 500) {
      return NextResponse.json({ available: false, reason: "api" });
    }

    if (rosConfigured()) {
      const list = await rosFetch("/face-of-the-months?pageNo=0&pageSize=20");
      if (list.ok) {
        // an event with no voting times has not been approved in the management app yet (or was declined): never shown
        events = ((await list.json()).content ?? []).filter((e: Ev) => time(e.votingStartTime) && time(e.votingEndTime));
        hallOfFame = await hallOfFameOf(events);
        if (!current && events.length) {
          const now = Date.now();
          const open = events.find((e) => time(e.votingStartTime) <= now && now <= time(e.votingEndTime));
          const upcoming = events.filter((e) => time(e.votingStartTime) > now).sort((a, b) => time(a.votingStartTime) - time(b.votingStartTime))[0];
          current = open ?? upcoming ?? [...events].sort((a, b) => time(b.votingEndTime) - time(a.votingEndTime))[0];
        }
      }
    }
    if (!current) return NextResponse.json({ available: true, event: null, hallOfFame });

    if (!detail) {
      const full = await rosFetch(`/face-of-the-months/${encodeURIComponent(current.id)}`);
      if (!full.ok) return NextResponse.json({ available: false, reason: rosConfigured() ? "api" : "not-configured" });
      detail = await full.json();
    }
    const d = detail!;
    const now = Date.now();
    const start = d.votingStartTime ?? current.votingStartTime;
    const end = d.votingEndTime ?? current.votingEndTime;
    const status = now < time(start) ? "upcoming" : now > time(end) ? "closed" : "open";
    // only what the public page needs: no phone numbers, emails or addresses
    const nominees = (d.nominees ?? []).map((n: Record<string, unknown>) => ({
      id: n.id,
      name: [n.firstName, n.middleName, n.lastName].filter(Boolean).join(" "),
      sex: n.sex,
      photo: n.profilePictureUrl ?? null,
      votes: typeof n.voteCount === "number" ? n.voteCount : 0,
    }));
    return NextResponse.json({
      available: true,
      event: { id: current.id, title: d.title ?? current.title, start, end, status, totalVotes: current.totalVotes ?? nominees.reduce((a: number, n: { votes: number }) => a + n.votes, 0) },
      nominees,
      hallOfFame,
    });
  } catch {
    return NextResponse.json({ available: false, reason: "api" });
  }
}

type Winner = { name: string; photo: string | null; votes: number };

/** Past winners, as in the management app's Hall of Fame: the most-voted man and woman of each finished event. */
async function hallOfFameOf(events: { id: string; title?: string; votingEndTime?: string }[]) {
  const done = events
    .filter((e) => (parseApiDate(e.votingEndTime)?.getTime() ?? 0) < Date.now())
    .sort((a, b) => (parseApiDate(b.votingEndTime)?.getTime() ?? 0) - (parseApiDate(a.votingEndTime)?.getTime() ?? 0))
    .slice(0, 6);
  const rows = await Promise.all(done.map(async (e) => {
    try {
      const res = await rosFetch(`/face-of-the-months/${encodeURIComponent(e.id)}`);
      if (!res.ok) return null;
      const detail = await res.json();
      const nominees: Record<string, unknown>[] = detail.nominees ?? [];
      const top = (female: boolean): Winner | null => {
        const group = nominees.filter((n) => (n.sex === "FEMALE") === female && Number(n.voteCount ?? 0) > 0);
        if (!group.length) return null;
        const w = [...group].sort((a, b) => Number(b.voteCount ?? 0) - Number(a.voteCount ?? 0))[0];
        return { name: [w.firstName, w.middleName, w.lastName].filter(Boolean).join(" "), photo: (w.profilePictureUrl as string) ?? null, votes: Number(w.voteCount ?? 0) };
      };
      const male = top(false);
      const female = top(true);
      if (!male && !female) return null;
      return { id: e.id, title: detail.title ?? e.title ?? "", end: detail.votingEndTime ?? e.votingEndTime, male, female };
    } catch {
      return null;
    }
  }));
  return rows.filter(Boolean);
}
