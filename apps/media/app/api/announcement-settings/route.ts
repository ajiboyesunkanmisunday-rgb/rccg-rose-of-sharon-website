import { NextResponse } from "next/server";
import { rosFetch, rosConfigured } from "@/lib/ros-server";

export const dynamic = "force-dynamic";

/** The announcement submission deadline set in the management app's general settings (only that one value is shared). */
export async function GET() {
  if (!rosConfigured()) return NextResponse.json({ deadline: null });
  try {
    const res = await rosFetch("/settings");
    if (!res.ok) return NextResponse.json({ deadline: null });
    const json = await res.json();
    return NextResponse.json({ deadline: json.announcementDeadline ?? null });
  } catch {
    return NextResponse.json({ deadline: null });
  }
}
