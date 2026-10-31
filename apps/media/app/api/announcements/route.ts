import { NextResponse } from "next/server";
import { rosFetch, rosConfigured } from "@/lib/ros-server";

export const dynamic = "force-dynamic";

/**
 * Approved announcements for the public page. The API's read endpoint needs the login, so the list is fetched here on
 * the server (the browser never sees the token) and passed on as it is.
 */
export async function GET() {
  if (!rosConfigured()) return NextResponse.json({ message: "Announcements are not available right now." }, { status: 503 });
  try {
    const res = await rosFetch("/announcements/read");
    if (!res.ok) return NextResponse.json({ message: "Announcements could not be loaded." }, { status: 502 });
    return NextResponse.json(await res.json());
  } catch {
    return NextResponse.json({ message: "Announcements could not be loaded." }, { status: 502 });
  }
}
