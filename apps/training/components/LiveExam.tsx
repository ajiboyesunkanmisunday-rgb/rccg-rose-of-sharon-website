"use client";

import { useEffect, useRef, useState } from "react";
import { FormField, inputCls, submitCls } from "@ros/shared/kit/form";
import { examRunningElsewhere, useExamGuard, useExamTabLock } from "./useExamGuard";

type Stage = "find" | "list" | "intro" | "running" | "submitting" | "done";

interface ExamSetup { id: string; title: string; instructions?: string; duration: number; isOpen: boolean; trainingCategory: string; totalAvailableScore?: number | null }
interface ExamOption { id: string; optionText: string }
interface ExamQuestion { id: string; question: string; position: number; questionType: string; options: ExamOption[] }

const CATEGORY: Record<string, string> = {
  BAPTISM: "Water Baptism",
  WORKERS_IN_TRAINING: "Workers in Training",
  SCHOOL_OF_DISCIPLES: "School of Disciples",
  SCHOOL_OF_MINISTRY: "School of Ministry",
  RILA: "RILA",
};

const fmt = (sec: number) => `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;
const card = "ros:rounded-xl ros:border ros:border-[#E5E7EB] ros:bg-[#FAFAFA] ros:p-5 ros:sm:p-7";
const navBtn = "ros:rounded-full ros:border ros:border-black ros:px-5 ros:py-2 ros:text-xs ros:font-extrabold ros:uppercase ros:tracking-[0.2em] ros:transition disabled:ros:opacity-40";

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`/ros-api${path}`, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error("The exam list could not be loaded. Please try again.");
  return res.json() as Promise<T>;
}

/** What this device remembers about an attempt, so a reload or a dropped connection does not restart or lose the exam. */
interface Attempt { endsAt: number; leaves?: number; submitted?: boolean; score?: number | null }

/** Leaving the exam page this many times submits the exam as it stands. */
const MAX_LEAVES = 3;

const attemptKey = (examId: string, studentId: string) => `ros-exam:${examId}:${studentId}`;
function readAttempt(examId: string, studentId: string): Attempt | null {
  try { return JSON.parse(localStorage.getItem(attemptKey(examId, studentId)) ?? "null"); } catch { return null; }
}
function saveAttempt(examId: string, studentId: string, attempt: Attempt) {
  try { localStorage.setItem(attemptKey(examId, studentId), JSON.stringify(attempt)); } catch { /* private browsing: the attempt is only kept while the page is open */ }
}

async function examCall(payload: Record<string, unknown>) {
  const res = await fetch("/api/exam", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data, message: String((data as { message?: string })?.message ?? "") };
}

const scoreText = (score: number, total?: number | null) => {
  const value = Math.round(score * 10) / 10;
  return total ? `${value} out of ${total}` : `${value}%`;
};

/**
 * The online exam as the exam system serves it: the student's exams, the instructions, then the timed questions in
 * the same layout as the other exam pages. Each chosen option is saved as it is picked and the exam is submitted for
 * marking at the end. Questions are only loaded once the exam has started, and leaving the page is counted (see
 * useExamGuard).
 */
export default function LiveExam({ category }: { category?: string }) {
  const [stage, setStage] = useState<Stage>("find");
  const [identifier, setIdentifier] = useState("");
  const [student, setStudent] = useState<{ id: string; firstName: string } | null>(null);
  const [exams, setExams] = useState<ExamSetup[]>([]);
  const [exam, setExam] = useState<ExamSetup | null>(null);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [unsaved, setUnsaved] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [index, setIndex] = useState(0);
  const [left, setLeft] = useState(0);
  const endsAt = useRef(0);
  const unsavedRef = useRef(new Map<string, string>());
  const queue = useRef<Promise<void>>(Promise.resolve());
  const submitRef = useRef<() => void>(() => {});
  const [leaves, setLeaves] = useState(0);
  const [warning, setWarning] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const leavesRef = useRef(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (stage !== "running") return;
    const t = setInterval(() => {
      const remaining = Math.max(0, Math.round((endsAt.current - Date.now()) / 1000));
      setLeft(remaining);
      if (remaining <= 0) { clearInterval(t); submitRef.current(); }
    }, 500);
    return () => clearInterval(t);
  }, [stage]);

  /** Saves are sent one after another so a quick change of mind cannot arrive before the earlier choice. */
  function send(questionId: string, option: string) {
    if (!exam || !student) return;
    const ids = { examId: exam.id, studentId: student.id };
    unsavedRef.current.set(questionId, option);
    queue.current = queue.current.then(async () => {
      if (unsavedRef.current.get(questionId) !== option) return;
      const r = await examCall({ action: "answer", ...ids, questionId, option }).catch(() => ({ ok: false }));
      if (r.ok && unsavedRef.current.get(questionId) === option) unsavedRef.current.delete(questionId);
      setUnsaved([...unsavedRef.current.keys()]);
    });
  }

  function choose(questionId: string, option: string) {
    setAnswers((a) => ({ ...a, [questionId]: option }));
    send(questionId, option);
  }

  async function submit() {
    if (!exam || !student) return;
    setStage("submitting");
    setError("");
    setWarning(false);
    setConfirming(false);
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    await queue.current;
    [...unsavedRef.current].forEach(([questionId, option]) => send(questionId, option));
    await queue.current;
    if (unsavedRef.current.size > 0) {
      setError("Some of your answers have not reached the exam system. Check your connection and send again.");
      return;
    }
    const r = await examCall({ action: "submit", examId: exam.id, studentId: student.id }).catch(() => null);
    if (r?.ok) {
      const value = Number((r.data as { totalPercent?: number }).totalPercent);
      const result = Number.isFinite(value) ? value : null;
      setScore(result);
      saveAttempt(exam.id, student.id, { endsAt: endsAt.current, leaves: leavesRef.current, submitted: true, score: result });
      setStage("done");
    } else if (r && /already has a score/i.test(r.message)) {
      setScore(readAttempt(exam.id, student.id)?.score ?? null);
      saveAttempt(exam.id, student.id, { endsAt: endsAt.current, leaves: leavesRef.current, submitted: true, score: readAttempt(exam.id, student.id)?.score ?? null });
      setStage("done");
    } else {
      setError("Your exam could not be submitted. Check your connection and send again.");
    }
  }
  useEffect(() => { submitRef.current = () => { void submit(); }; });

  const lockKey = exam && student ? attemptKey(exam.id, student.id) : null;
  useExamTabLock(stage === "running" ? lockKey : null);

  function countLeave() {
    if (!exam || !student) return;
    const total = leavesRef.current + 1;
    leavesRef.current = total;
    setLeaves(total);
    saveAttempt(exam.id, student.id, { endsAt: endsAt.current, leaves: total });
    setConfirming(false);
    if (total >= MAX_LEAVES) submitRef.current();
    else setWarning(true);
  }
  const rearm = useExamGuard(stage === "running", countLeave);

  const enterFullScreen = () => { document.documentElement.requestFullscreen?.().catch(() => {}); };

  async function find(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (identifier.trim().length < 5) { setError("Enter the email address or phone number on your membership record."); return; }
    setBusy(true);
    try {
      const res = await fetch("/api/member/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ identifier: identifier.trim() }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "We could not find that membership.");
      setStudent({ id: data.id, firstName: data.firstName ?? "" });
      const page = await getJson<{ content: ExamSetup[] }>(`/exam-setups/${data.id}/student?${category ? `trainingCategory=${category}&` : ""}pageNo=0&pageSize=20`);
      setExams(page.content ?? []);
      setStage("list");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  function open(setup: ExamSetup) {
    setError("");
    setExam(setup);
    setQuestions([]);
    setAnswers({});
    setUnsaved([]);
    unsavedRef.current.clear();
    setScore(null);
    setIndex(0);
    leavesRef.current = 0;
    setLeaves(0);
    setStage("intro");
  }

  async function start() {
    if (!exam || !student) return;
    enterFullScreen();
    setError("");
    setBusy(true);
    const ids = { examId: exam.id, studentId: student.id };
    const stop = (message: string) => {
      setError(message);
      if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    };
    try {
      const saved = readAttempt(exam.id, student.id);
      if (saved?.submitted) { setScore(saved.score ?? null); leavesRef.current = saved.leaves ?? 0; setLeaves(leavesRef.current); setStage("done"); return; }
      if (await examRunningElsewhere(attemptKey(exam.id, student.id))) { stop("This exam is already open in another tab. Go back to that tab."); return; }
      const r = await examCall({ action: "start", ...ids });
      let resumed = false;
      if (r.ok) {
        endsAt.current = Date.now() + exam.duration * 60_000;
        saveAttempt(exam.id, student.id, { endsAt: endsAt.current, leaves: 0 });
      } else if (/already started/i.test(r.message)) {
        if (!saved) { stop("This exam has already been started and cannot be continued on this device. Please contact your coordinator."); return; }
        endsAt.current = saved.endsAt;
        resumed = true;
      } else {
        stop(r.message || "The exam could not be started. Please try again.");
        return;
      }
      const list = await examCall({ action: "questions", ...ids });
      const content = (list.data as { content?: ExamQuestion[] }).content ?? [];
      if (!list.ok || !content.some((q) => q.questionType === "OBJECTIVE")) { stop(list.message || "The questions could not be loaded. Press Start exam to try again."); return; }
      setQuestions(content.filter((q) => q.questionType === "OBJECTIVE").sort((a, b) => a.position - b.position));
      // Closing or reloading the page during an exam counts as leaving it.
      leavesRef.current = resumed ? (saved?.leaves ?? 0) + 1 : 0;
      setLeaves(leavesRef.current);
      if (resumed) {
        const earlier = await examCall({ action: "answers", ...ids });
        if (earlier.ok && Array.isArray(earlier.data)) {
          setAnswers(Object.fromEntries((earlier.data as { questionId: string; text: string }[]).map((x) => [x.questionId, x.text])));
        }
        saveAttempt(exam.id, student.id, { endsAt: endsAt.current, leaves: leavesRef.current });
      }
      setLeft(Math.max(0, Math.round((endsAt.current - Date.now()) / 1000)));
      if (leavesRef.current >= MAX_LEAVES) { setStage("submitting"); setTimeout(() => submitRef.current(), 0); return; }
      setWarning(resumed);
      setStage("running");
    } catch {
      stop("The exam could not be started. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  const unanswered = questions.filter((q) => !answers[q.id]).length;

  function finish() {
    if (unanswered > 0) setConfirming(true);
    else void submit();
  }

  const low = exam ? left <= Math.max(30, exam.duration * 60 * 0.15) : false;

  if (stage === "find") {
    return (
      <form onSubmit={find} className={`${card} ros:flex ros:flex-col ros:gap-4`}>
        <h2 className="ros-anton ros:text-2xl ros:uppercase">Find your exams</h2>
        <p className="ros:text-[#00000099]">Enter the email address or phone number on your membership record to see the exams assigned to you.</p>
        <FormField label="Email address or phone number" required>
          <input value={identifier} onChange={(e) => setIdentifier(e.target.value)} className={inputCls} placeholder="you@example.com or 080 0000 0000" autoComplete="email" />
        </FormField>
        {error && <p role="alert" className="ros:rounded-lg ros:border ros:border-[#DF4E4E55] ros:bg-[#DF4E4E12] ros:px-4 ros:py-3 ros:text-sm ros:text-[#7B1D1D]">{error}</p>}
        <div className="ros:flex ros:justify-center">
          <button type="submit" disabled={busy} className={submitCls}>{busy ? "Checking..." : "Find my exams"}</button>
        </div>
      </form>
    );
  }

  if (stage === "list") {
    return (
      <div className="ros:flex ros:flex-col ros:gap-4">
        <h2 className="ros-anton ros:text-2xl ros:uppercase">Hello{student?.firstName ? `, ${student.firstName}` : ""}</h2>
        {exams.length === 0 ? (
          <div className={card}><p className="ros:text-[#00000099]">There are no exams assigned to you right now.</p></div>
        ) : exams.map((x) => (
          <div key={x.id} className={`${card} ros:flex ros:flex-wrap ros:items-center ros:justify-between ros:gap-4`}>
            <div>
              <h3 className="ros:text-lg ros:font-bold">{x.title}</h3>
              <p className="ros:text-sm ros:text-[#00000099]">{CATEGORY[x.trainingCategory] ?? x.trainingCategory} · {x.duration} minutes · {x.isOpen ? "Open" : "Closed"}</p>
            </div>
            <button type="button" disabled={busy || !x.isOpen} onClick={() => open(x)} className={navBtn}>{x.isOpen ? "Open exam" : "Not open"}</button>
          </div>
        ))}
        {error && <p role="alert" className="ros:text-center ros:text-sm ros:text-red-500">{error}</p>}
        <button type="button" onClick={() => { setStage("find"); setStudent(null); setIdentifier(""); }} className="ros:self-center ros:text-sm ros:text-[#6B7280] ros:underline">Not you? Start again</button>
      </div>
    );
  }

  if (stage === "intro" && exam) {
    return (
      <div className="ros:flex ros:flex-col ros:gap-5">
        <div className={card}>
          <h2 className="ros-anton ros:mb-4 ros:text-2xl ros:uppercase">{exam.title}</h2>
          <ul className="ros:flex ros:list-disc ros:flex-col ros:gap-2 ros:pl-5 ros:text-[#00000099]">
            <li>You have <b className="ros:text-black">{exam.duration} minutes</b>. The exam ends when the time is up.</li>
            <li>You can move back and forth between questions.</li>
            <li><b className="ros:text-black">Stay on this page until you submit.</b> Switching to another tab or app, closing or reloading the page, or leaving full screen is counted. On the {MAX_LEAVES === 3 ? "third" : `${MAX_LEAVES}th`} time your exam is submitted automatically.</li>
            <li>Copying and pasting are turned off.</li>
            {exam.instructions && <li>{exam.instructions}</li>}
          </ul>
        </div>
        {error && <p role="alert" className="ros:text-center ros:text-sm ros:text-red-500">{error}</p>}
        <div className="ros:flex ros:flex-wrap ros:justify-center ros:gap-3">
          <button type="button" onClick={() => { setError(""); setStage("list"); }} className={navBtn}>Back</button>
          <button type="button" onClick={start} disabled={busy} className={submitCls}>{busy ? "Starting..." : "Start exam"}</button>
        </div>
      </div>
    );
  }

  if (stage === "submitting") {
    return (
      <div className={`${card} ros:flex ros:flex-col ros:items-center ros:gap-4 ros:text-center`} role="status">
        <h2 className="ros-anton ros:text-2xl ros:uppercase">{error ? "Not submitted yet" : "Submitting your exam..."}</h2>
        {error && <p className="ros:text-sm ros:text-[#7B1D1D]">{error}</p>}
        {error && <button type="button" onClick={() => void submit()} className={submitCls}>Send again</button>}
      </div>
    );
  }

  if (stage === "done") {
    return (
      <div className="ros:flex ros:flex-col ros:gap-5">
        <div className={`${card} ros:flex ros:flex-col ros:items-center ros:gap-3 ros:text-center`}>
          <h2 className="ros-anton ros:text-3xl ros:uppercase">Exam submitted</h2>
          {leaves >= MAX_LEAVES && <p className="ros:text-sm ros:text-[#7B1D1D]">It was submitted automatically because the exam page was left {leaves} times.</p>}
          {score !== null && <p className="ros:text-[#00000099]">Your score: <b className="ros:text-black">{scoreText(score, exam?.totalAvailableScore)}</b></p>}
        </div>
        <div className="ros:flex ros:justify-center">
          <button type="button" onClick={() => setStage("list")} className={navBtn}>Back to my exams</button>
        </div>
      </div>
    );
  }

  const q = questions[index];
  if (!q) return null;
  return (
    <div className="ros:flex ros:select-none ros:flex-col ros:gap-4">
      {(warning || confirming) && (
        <div className="ros:fixed ros:inset-0 ros:z-[100] ros:flex ros:items-center ros:justify-center ros:bg-black/80 ros:p-4">
          <div role="alertdialog" aria-modal="true" aria-labelledby="exam-dialog-title" className="ros:flex ros:w-full ros:max-w-md ros:flex-col ros:items-center ros:gap-4 ros:rounded-2xl ros:bg-white ros:p-6 ros:text-center">
            <h2 id="exam-dialog-title" className="ros-anton ros:text-2xl ros:uppercase">{warning ? "You left the exam" : "Submit your exam?"}</h2>
            <p className="ros:text-[#00000099]">
              {warning
                ? `This is warning ${leaves} of ${MAX_LEAVES - 1}. If you leave again ${MAX_LEAVES - leaves === 1 ? "your exam will be submitted automatically" : "it will be counted"}. The clock has kept running.`
                : `You have not answered ${unanswered} question${unanswered === 1 ? "" : "s"}.`}
            </p>
            {warning ? (
              <button type="button" autoFocus onClick={() => { rearm(); setWarning(false); enterFullScreen(); }} className={submitCls}>Return to exam</button>
            ) : (
              <div className="ros:flex ros:flex-wrap ros:justify-center ros:gap-3">
                <button type="button" autoFocus onClick={() => setConfirming(false)} className={navBtn}>Keep working</button>
                <button type="button" onClick={() => void submit()} className={submitCls}>Submit</button>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="ros:sticky ros:top-[72px] ros:z-10 ros:flex ros:items-center ros:justify-between ros:rounded-xl ros:bg-black ros:px-5 ros:py-3 ros:text-white">
        <span className="ros:text-xs ros:font-bold ros:uppercase ros:tracking-[0.15em]">Question {index + 1} of {questions.length}</span>
        <span className={`ros:rounded-full ros:px-5 ros:py-1.5 ros:text-2xl ros:font-extrabold ros:tabular-nums ros:md:text-3xl ${low ? "ros:bg-[#DF4E4E]" : "ros:bg-[#FFFFFF22]"}`} aria-live="off">⏱ {fmt(left)}</span>
      </div>

      <div className={card}>
        <h2 className="ros:mb-5 ros:text-lg ros:font-bold ros:md:text-xl">{q.question}</h2>
        <div className="ros:flex ros:flex-col ros:gap-3">
          {q.options.map((o) => {
            const chosen = answers[q.id] === o.optionText;
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => choose(q.id, o.optionText)}
                className={`ros:flex ros:items-center ros:gap-3 ros:rounded-lg ros:border ros:px-4 ros:py-3 ros:text-left ros:transition ${
                  chosen ? "ros:border-[#DF4E4E] ros:bg-[#DF4E4E12]" : "ros:border-[#D0D5DD] ros:bg-white ros:hover:border-black"
                }`}
              >
                <span className={`ros:flex ros:size-6 ros:flex-shrink-0 ros:items-center ros:justify-center ros:rounded-full ros:border-2 ${chosen ? "ros:border-[#DF4E4E]" : "ros:border-[#9CA3AF]"}`}>
                  {chosen && <span className="ros:size-3 ros:rounded-full ros:bg-[#DF4E4E]" />}
                </span>
                <span>{o.optionText}</span>
              </button>
            );
          })}
        </div>
      </div>

      {unsaved.length > 0 && <p role="status" className="ros:text-center ros:text-sm ros:text-[#7B1D1D]">Saving your answers. They will be sent again when you submit if the connection drops.</p>}

      <div className="ros:flex ros:flex-wrap ros:items-center ros:justify-between ros:gap-3">
        <button type="button" disabled={index === 0} onClick={() => setIndex((i) => i - 1)} className={navBtn}>Previous</button>
        <div className="ros:flex ros:flex-wrap ros:justify-center ros:gap-2">
          {questions.map((x, i) => (
            <button
              key={x.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to question ${i + 1}`}
              className={`ros:size-9 ros:rounded-full ros:border ros:text-xs ros:font-bold ${
                i === index ? "ros:border-black ros:bg-black ros:text-white" : answers[x.id] ? "ros:border-[#DF4E4E] ros:bg-[#DF4E4E12] ros:text-[#DF4E4E]" : "ros:border-[#D0D5DD] ros:bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        {index < questions.length - 1 ? (
          <button type="button" onClick={() => setIndex((i) => i + 1)} className={`${navBtn} ros:bg-black ros:text-white`}>Next</button>
        ) : (
          <button type="button" onClick={finish} className={submitCls}>Submit exam</button>
        )}
      </div>
    </div>
  );
}
