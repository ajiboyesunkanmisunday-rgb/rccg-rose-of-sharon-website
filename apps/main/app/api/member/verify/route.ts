import { NextResponse } from "next/server";
import { rosFetch, rosToken } from "@/lib/ros-server";

export const dynamic = "force-dynamic";

const digits = (s: string) => s.replace(/\D/g, "");

/**
 * Finds the church member behind an email or phone number, for the forms whose backend record needs a member id
 * (celebration requests, water baptism, workers in training ...). The look-up needs the API login, so it runs here on
 * the server. Only the id and first name go back to the browser, never the email, phone or address.
 */
export async function POST(req: Request) {
  if (!rosToken()) return NextResponse.json({ message: "Membership check is not available right now. Please try again later." }, { status: 503 });
  let identifier = "";
  try { identifier = String((await req.json()).identifier ?? "").trim(); } catch { /* handled below */ }
  if (identifier.length < 5) return NextResponse.json({ message: "Enter the email or phone number on your membership record." }, { status: 400 });

  const isEmail = identifier.includes("@");
  const wantedPhone = digits(identifier).replace(/^0+/, "").slice(-10);
  if (!isEmail && wantedPhone.length < 7) return NextResponse.json({ message: "Enter a valid email address or phone number." }, { status: 400 });

  type Person = { id: string; firstName?: string; email?: string; phoneNumber?: string };
  for (const kind of ["member", "e-member"]) {
    try {
      const res = await rosFetch(`/users/${kind}/search?pageNo=0&pageSize=20`, { method: "POST", body: JSON.stringify({ text: isEmail ? identifier : wantedPhone }) });
      if (!res.ok) continue;
      const people: Person[] = (await res.json()).content ?? [];
      const match = people.find((p) => isEmail
        ? p.email?.trim().toLowerCase() === identifier.toLowerCase()
        : !!p.phoneNumber && digits(p.phoneNumber).replace(/^0+/, "").slice(-10) === wantedPhone);
      if (match) return NextResponse.json({ id: match.id, firstName: match.firstName ?? "" });
    } catch { /* try the next list */ }
  }
  return NextResponse.json({ message: "We could not find a membership with that email or phone number." }, { status: 404 });
}
