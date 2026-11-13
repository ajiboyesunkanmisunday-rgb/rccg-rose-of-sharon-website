import { NextResponse } from "next/server";
import { publicFetch } from "@/lib/ros-server";

export const dynamic = "force-dynamic";

/**
 * Approved announcements for the public page. The API now serves this list to everyone (no login), so the site just
 * passes it on. Only announcements that are active today are returned by the API.
 */
export async function GET() {
  try {
    const res = await publicFetch("/announcements/read", 30);
    if (!res.ok) return NextResponse.json({ message: "Announcements could not be loaded." }, { status: 502 });
    return NextResponse.json(await res.json());
  } catch {
    return NextResponse.json({ message: "Announcements could not be loaded." }, { status: 502 });
  }
}
