import { NextResponse } from "next/server";
import { publicFetch } from "@/lib/ros-server";

export const dynamic = "force-dynamic";

/** The announcement submission deadline set in the management app's general settings (only that one value is shared). */
export async function GET() {
  try {
    const res = await publicFetch("/settings", 300);
    if (!res.ok) return NextResponse.json({ deadline: null });
    const json = await res.json();
    return NextResponse.json({ deadline: json.announcementDeadline ?? null });
  } catch {
    return NextResponse.json({ deadline: null });
  }
}
