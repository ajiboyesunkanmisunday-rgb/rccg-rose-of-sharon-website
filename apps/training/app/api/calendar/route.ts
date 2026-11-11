import { NextResponse } from "next/server";
import { parseApiJson, leanEvents } from "@ros/shared/apiJson";

export const dynamic = "force-dynamic";

const ORIGIN = (process.env.ROS_API_ORIGIN || "http://137.184.72.16:6001").replace(/\/$/, "");
const day = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Events for the public calendar. The API's calendar endpoint is public but can send damaged JSON (and a lot of
 * personal details) for days that have registered people, so it is read here, repaired and trimmed before the page
 * sees it. `kind=upcoming` gives the upcoming list instead of one date range.
 */
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const startDay = q.get("startDay") ?? "";
  const endDay = q.get("endDay") ?? "";
  if (!day.test(startDay) || !day.test(endDay)) return NextResponse.json({ message: "Invalid dates." }, { status: 400 });
  const path = q.get("kind") === "upcoming" ? "/events/calendar/upcoming" : "/events/calendar";
  try {
    const res = await fetch(`${ORIGIN}/api/v1${path}?startDay=${startDay}&endDay=${endDay}`, { cache: "no-store", headers: { Accept: "application/json" } });
    if (!res.ok) return NextResponse.json({ message: "Events could not be loaded." }, { status: 502 });
    const list = parseApiJson<unknown[]>(await res.text());
    if (!list) return NextResponse.json({ message: "Events could not be read." }, { status: 502 });
    return NextResponse.json(leanEvents(list));
  } catch {
    return NextResponse.json({ message: "Events could not be loaded." }, { status: 502 });
  }
}
