import { NextResponse } from "next/server";
import { rosFetch, rosConfigured } from "@/lib/ros-server";

export const dynamic = "force-dynamic";

/** Training-office schedules are kept per category and per set (the intake, usually the year), as in the management app. */
const CATEGORY: Record<string, string> = {
  "water-baptism": "BAPTISM",
  "workers-in-training": "WORKERS_IN_TRAINING",
  "school-of-disciples": "SCHOOL_OF_DISCIPLES",
  "school-of-ministry": "SCHOOL_OF_MINISTRY",
  rila: "RILA",
};

type Item = { name?: string; date?: string; teacher?: string; location?: string; isExam?: boolean };

export async function GET(req: Request) {
  const category = CATEGORY[new URL(req.url).searchParams.get("program") ?? ""];
  if (!category || !rosConfigured()) return NextResponse.json({ next: null });
  const year = new Date().getFullYear();
  const today = new Date().toISOString().slice(0, 10);
  const found: Item[] = [];
  for (const set of [String(year), String(year + 1)]) {
    try {
      const res = await rosFetch(`/training-events?category=${category}&set=${set}`);
      if (!res.ok) continue;
      const json = await res.json();
      const list: Item[] = Array.isArray(json) ? json : json.content ?? [];
      found.push(...list);
    } catch { /* try the next set */ }
  }
  const upcoming = found
    .filter((e) => e.date && e.date >= today && !e.isExam)
    .sort((a, b) => (a.date! < b.date! ? -1 : 1))[0];
  if (!upcoming) return NextResponse.json({ next: null });
  return NextResponse.json({ next: { name: upcoming.name ?? "", date: upcoming.date, teacher: upcoming.teacher ?? "", location: upcoming.location ?? "" } });
}
