import { NextResponse } from "next/server";
import { rosFetch, rosConfigured, tooManyRequests } from "@/lib/ros-server";

export const dynamic = "force-dynamic";

const CATEGORY: Record<string, string> = {
  "water-baptism": "BAPTISM",
  "workers-in-training": "WORKERS_IN_TRAINING",
  "school-of-disciples": "SCHOOL_OF_DISCIPLES",
  "school-of-ministry": "SCHOOL_OF_MINISTRY",
  rila: "RILA",
};

/**
 * A student's official results, from the score sheets the training office uploads in the management app (broadsheet).
 * The visitor gives the set and their admission number; only that one student's scores go back, nobody else's.
 */
export async function POST(req: Request) {
  if (tooManyRequests(req, "result", 15)) return NextResponse.json({ message: "Too many attempts. Please wait a few minutes and try again." }, { status: 429 });
  if (!rosConfigured()) return NextResponse.json({ message: "Results are not available right now. Please try again later." }, { status: 503 });
  let body: { program?: string; set?: string; admission?: string } = {};
  try { body = await req.json(); } catch { /* handled below */ }
  const category = CATEGORY[body.program ?? ""];
  const set = (body.set ?? "").trim();
  const admission = (body.admission ?? "").trim().toLowerCase().replace(/\s+/g, "");
  if (!category || !set || admission.length < 2) return NextResponse.json({ message: "Enter your set and admission number." }, { status: 400 });

  try {
    const res = await rosFetch(`/score-sheets/broadsheet?category=${category}&set=${encodeURIComponent(set)}`);
    if (!res.ok) return NextResponse.json({ message: "We could not find results for that set." }, { status: 404 });
    const json = await res.json();
    const students: { firstName?: string; lastName?: string; admissionNo?: string; studentScores?: { trainingEventName?: string; score?: number }[] }[] = json.studentResults ?? [];
    const me = students.find((s) => (s.admissionNo ?? "").toLowerCase().replace(/\s+/g, "") === admission);
    if (!me) return NextResponse.json({ message: "We could not find that admission number in this set. Check both and try again." }, { status: 404 });
    return NextResponse.json({
      name: [me.firstName, me.lastName].filter(Boolean).join(" "),
      scores: (me.studentScores ?? []).map((x) => ({ name: x.trainingEventName ?? "", score: x.score ?? 0 })),
    });
  } catch {
    return NextResponse.json({ message: "Results could not be loaded. Please try again." }, { status: 502 });
  }
}
