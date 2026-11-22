import { NextResponse } from "next/server";
import { ROS_ORIGIN } from "@/lib/ros-server";

export const dynamic = "force-dynamic";

/**
 * The announcement submission deadline set in the management app's general settings (only that one value is shared).
 * Read fresh on every call so a deadline changed in the management app applies to the public form at once.
 */
export async function GET() {
  try {
    const res = await fetch(`${ROS_ORIGIN}/api/v1/settings`, { headers: { Accept: "application/json" }, cache: "no-store" });
    if (!res.ok) return NextResponse.json({ deadline: null });
    const json = await res.json();
    return NextResponse.json({ deadline: json.announcementDeadline ?? null }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ deadline: null });
  }
}
