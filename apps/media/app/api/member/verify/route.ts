import { NextResponse } from "next/server";
import { findMember, tooManyRequests } from "@/lib/ros-server";

export const dynamic = "force-dynamic";

const digits = (s: string) => s.replace(/\D/g, "");

/**
 * Finds the church member behind an email or phone number, for the forms whose backend record needs a member id
 * (celebration requests, water baptism, workers in training ...). The look-up needs the API login, so it runs here on
 * the server. Only the id and first name go back to the browser, never the email, phone or address.
 */
export async function POST(req: Request) {
  if (tooManyRequests(req, "verify", 12)) return NextResponse.json({ message: "Too many attempts. Please wait a few minutes and try again." }, { status: 429 });
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
