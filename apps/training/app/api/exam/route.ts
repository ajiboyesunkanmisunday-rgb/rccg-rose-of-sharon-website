import { NextResponse } from "next/server";
import { ROS_ORIGIN } from "@/lib/ros-server";

export const dynamic = "force-dynamic";

const ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_ANSWER_LENGTH = 2000;

/**
 * The exam actions a student's browser needs (start, save an answer, read saved answers, submit). They are forwarded
 * from the server because the exam system refuses these calls when they carry a browser's Origin header.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ message: "Something went wrong with that request." }, { status: 400 }); }

  const action = String(body.action ?? "");
  const examId = String(body.examId ?? "");
  const studentId = String(body.studentId ?? "");
  if (!ID_RE.test(examId) || !ID_RE.test(studentId)) return NextResponse.json({ message: "Something went wrong with that request." }, { status: 400 });

  let path: string;
  let init: RequestInit;
  if (action === "start") {
    path = `/exam-answers/${examId}/start-exam/${studentId}`;
    init = { method: "PATCH" };
  } else if (action === "answers") {
    path = `/exam-answers/${examId}/student/${studentId}`;
    init = { method: "GET" };
  } else if (action === "submit") {
    path = `/exam-answers/${examId}/submit/${studentId}`;
    init = { method: "POST" };
  } else if (action === "answer") {
    const questionId = String(body.questionId ?? "");
    const option = String(body.option ?? "");
    if (!ID_RE.test(questionId) || !option || option.length > MAX_ANSWER_LENGTH) return NextResponse.json({ message: "Something went wrong with that request." }, { status: 400 });
    path = "/exam-answers";
    init = { method: "POST", body: JSON.stringify({ examId, questionId, studentId, option }) };
  } else {
    return NextResponse.json({ message: "Something went wrong with that request." }, { status: 400 });
  }

  try {
    const res = await fetch(`${ROS_ORIGIN}/api/v1${path}`, { ...init, headers: { "Content-Type": "application/json", Accept: "application/json" }, cache: "no-store" });
    const data = await res.json().catch(() => null);
    return NextResponse.json(data ?? {}, { status: res.status });
  } catch {
    return NextResponse.json({ message: "The exam system is not reachable right now." }, { status: 502 });
  }
}
