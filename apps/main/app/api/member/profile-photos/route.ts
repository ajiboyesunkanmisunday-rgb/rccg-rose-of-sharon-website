import { NextResponse } from "next/server";
import { ROS_ORIGIN, tooManyRequests } from "@/lib/ros-server";

export const dynamic = "force-dynamic";

const digits = (s: string) => s.replace(/\D/g, "");
const last10 = (s: string) => digits(s).replace(/^0+/, "").slice(-10);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Pictures are uploaded to the church's storage first; only addresses on that storage are accepted. */
const MEDIA_URL_RE = /^https:\/\/[a-z0-9.-]+\.digitaloceanspaces\.com\/[^\s]+$/i;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

type Member = { id: string; firstName: string; lastName: string };

/**
 * The API only lets the signed-in management app change a member's picture or wedding date, so this page cannot write to
 * a profile itself. It finds the member by the email address or phone number on their record (either one, using the
 * public membership check) and files the pictures and date as a request that staff check and apply from the management app.
 */
async function findMemberByIdentifier(identifier: string): Promise<Member | null | "unavailable"> {
  // the membership check wants the email as written, or the phone as its last 10 digits (no 0, no country code)
  const text = identifier.includes("@") ? identifier.trim() : last10(identifier);
  try {
    const res = await fetch(`${ROS_ORIGIN}/api/v1/users/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ text }),
      cache: "no-store",
    });
    if (res.status === 400 || res.status === 404) return null;
    if (!res.ok) return "unavailable";
    const u = await res.json();
    return u?.id ? { id: u.id, firstName: u.firstName ?? "", lastName: u.lastName ?? "" } : null;
  } catch {
    return "unavailable";
  }
}

const NO_MATCH = "We could not find a membership with that email address or phone number. Use the one you registered with.";

export async function POST(req: Request) {
  if (tooManyRequests(req, "profile-photos", 12)) {
    return NextResponse.json({ message: "Too many attempts. Please wait a few minutes and try again." }, { status: 429 });
  }
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ message: "Something went wrong with that request." }, { status: 400 }); }

  const identifier = String(body.identifier ?? "").trim();
  const isEmail = identifier.includes("@");
  if (isEmail ? !EMAIL_RE.test(identifier) : last10(identifier).length < 7) {
    return NextResponse.json({ message: "Enter the email address or phone number on your membership record." }, { status: 400 });
  }

  const member = await findMemberByIdentifier(identifier);
  if (member === "unavailable") return NextResponse.json({ message: "The membership check is not available right now. Please try again later." }, { status: 503 });
  if (!member) return NextResponse.json({ message: NO_MATCH }, { status: 404 });

  if (body.action === "check") return NextResponse.json({ firstName: member.firstName });

  // action "save": at least one picture or an anniversary date
  const personal = String(body.profilePictureUrl ?? "").trim();
  const family = String(body.couplePictureUrl ?? "").trim();
  for (const url of [personal, family]) {
    if (url && !MEDIA_URL_RE.test(url)) return NextResponse.json({ message: "One of the pictures was not uploaded correctly. Please try again." }, { status: 400 });
  }
  const ann = (body.anniversary ?? null) as { day?: number; month?: number; year?: number | null } | null;
  let anniversary = "";
  if (ann && (ann.day || ann.month)) {
    const day = Number(ann.day), month = Number(ann.month), year = ann.year ? Number(ann.year) : null;
    const thisYear = new Date().getFullYear();
    const realDate = month >= 1 && month <= 12 && day >= 1 && day <= new Date(year ?? 2000, month, 0).getDate();
    if (!realDate || (year !== null && (year < 1900 || year > thisYear))) {
      return NextResponse.json({ message: "That wedding anniversary is not a real date." }, { status: 400 });
    }
    anniversary = `${day} ${MONTHS[month - 1]}${year ? ` ${year}` : ""}`;
  }
  if (!personal && !family && !anniversary) {
    return NextResponse.json({ message: "Add at least one picture or your wedding anniversary." }, { status: 400 });
  }

  const lines = [
    `Member: ${member.firstName} ${member.lastName}`.trim(),
    `Member ID: ${member.id}`,
    `Found by: ${isEmail ? "email address" : "phone number"}`,
    personal && `Personal picture: ${personal}`,
    family && `Family picture: ${family}`,
    anniversary && `Wedding anniversary: ${anniversary}`,
    "Please add these to the member's profile.",
  ].filter(Boolean) as string[];

  try {
    const res = await fetch(`${ROS_ORIGIN}/api/v1/requests/suggestion`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ userId: member.id, subject: "[Profile Update] Pictures and wedding anniversary", content: lines.join("\n") }),
      cache: "no-store",
    });
    if (!res.ok) return NextResponse.json({ message: "We could not send your pictures right now. Please try again later." }, { status: 502 });
  } catch {
    return NextResponse.json({ message: "We could not send your pictures right now. Please try again later." }, { status: 502 });
  }
  return NextResponse.json({ ok: true, firstName: member.firstName });
}
