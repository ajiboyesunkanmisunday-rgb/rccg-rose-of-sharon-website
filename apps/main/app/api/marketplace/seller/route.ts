import { NextResponse } from "next/server";
import { findMember, tooManyRequests } from "@/lib/ros-server";

export const dynamic = "force-dynamic";

const digits = (s: string) => s.replace(/\D/g, "");

/**
 * Checks that a would-be seller is a church member. The visitor gives the email or phone number on their membership
 * record; the member is looked up here on the server (the API needs a login) and only the id and first name are returned.
 */
export async function POST(req: Request) {
  if (tooManyRequests(req, "seller", 12)) return NextResponse.json({ message: "Too many attempts. Please wait a few minutes and try again." }, { status: 429 });
  let identifier = "";
  try { identifier = String((await req.json()).identifier ?? "").trim(); } catch { /* handled below */ }
  if (identifier.length < 5) return NextResponse.json({ message: "Enter the email or phone number on your membership record." }, { status: 400 });

  const isEmail = identifier.includes("@");
  const wantedPhone = digits(identifier).replace(/^0+/, "").slice(-10);
  if (!isEmail && wantedPhone.length < 7) return NextResponse.json({ message: "Enter a valid email address or phone number." }, { status: 400 });

  const { found, unavailable } = await findMember(identifier);
  if (found) return NextResponse.json({ id: found.id, firstName: found.firstName, via: found.via });
  if (unavailable) return NextResponse.json({ message: "The membership check is not available right now. Please try again later." }, { status: 503 });
  return NextResponse.json({ message: "We could not find a membership with that email or phone number." }, { status: 404 });
}
