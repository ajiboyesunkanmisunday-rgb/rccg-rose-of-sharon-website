"use client";

import { useEffect, useRef, useState } from "react";
import { FormField, inputCls, submitCls } from "@ros/shared/kit/form";

type Stage = "find" | "list" | "intro" | "running" | "submitting" | "done";

interface ExamSetup { id: string; title: string; instructions?: string; duration: number; isOpen: boolean; trainingCategory: string; totalAvailableScore?: number | null }
interface ExamOption { id: string; optionText: string }
interface ExamQuestion { id: string; question: string; position: number; questionType: "OBJECTIVE" | "THEORY"; options: ExamOption[] }

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
interface Attempt { endsAt: number; submitted?: boolean; score?: number | null }

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
 * marking at the end. The exam system does not accept written answers.
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
      saveAttempt(exam.id, student.id, { endsAt: endsAt.current, submitted: true, score: result });
      setStage("done");
    } else if (r && /already has a score/i.test(r.message)) {
      setScore(readAttempt(exam.id, student.id)?.score ?? null);
      saveAttempt(exam.id, student.id, { endsAt: endsAt.current, submitted: true, score: readAttempt(exam.id, student.id)?.score ?? null });
      setStage("done");
    } else {
      setError("Your exam could not be submitted. Check your connection and send again.");
    }
  }
  useEffect(() => { submitRef.current = () => { void submit(); }; });

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

  async function open(setup: ExamSetup) {
    setError("");
    setBusy(true);
    try {
      const page = await getJson<{ content: ExamQuestion[] }>(`/exam-questions/${setup.id}/student?pageNo=0&pageSize=100`);
      setQuestions([...(page.content ?? [])].sort((a, b) => a.position - b.position));
      setExam(setup);
      setAnswers({});
      setUnsaved([]);
      unsavedRef.current.clear();
      setScore(null);
      setIndex(0);
      setStage("intro");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function start() {
    if (!exam || !student) return;
    setError("");
    setBusy(true);
    try {
      const saved = readAttempt(exam.id, student.id);
      if (saved?.submitted) { setScore(saved.score ?? null); setStage("done"); return; }
      const r = await examCall({ action: "start", examId: exam.id, studentId: student.id });
      if (r.ok) {
        endsAt.current = Date.now() + exam.duration * 60_000;
        saveAttempt(exam.id, student.id, { endsAt: endsAt.current });
      } else if (/already started/i.test(r.message)) {
        if (!saved) { setError("This exam has already been started and cannot be continued on this device. Please contact your coordinator."); return; }
        endsAt.current = saved.endsAt;
        const earlier = await examCall({ action: "answers", examId: exam.id, studentId: student.id });
        if (earlier.ok && Array.isArray(earlier.data)) {
          setAnswers(Object.fromEntries((earlier.data as { questionId: string; text: string }[]).map((x) => [x.questionId, x.text])));
        }
      } else {
        setError("The exam could not be started. Please try again.");
        return;
      }
      setLeft(Math.max(0, Math.round((endsAt.current - Date.now()) / 1000)));
      setStage("running");
    } catch {
      setError("The exam could not be started. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  function finish() {
    const open = questions.filter((q) => q.questionType === "OBJECTIVE" && !answers[q.id]).length;
    if (open > 0 && !window.confirm(`You have not answered ${open} question${open === 1 ? "" : "s"}. Submit anyway?`)) return;
    void submit();
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
            <li>{questions.length} questions.</li>
            <li>You have <b className="ros:text-black">{exam.duration} minutes</b>. The exam ends when the time is up.</li>
            <li>You can move back and forth between questions.</li>
            {exam.instructions && <li>{exam.instructions}</li>}
          </ul>
        </div>
        {error && <p role="alert" className="ros:text-center ros:text-sm ros:text-red-500">{error}</p>}
        <div className="ros:flex ros:flex-wrap ros:justify-center ros:gap-3">
          <button type="button" onClick={() => { setError(""); setStage("list"); }} className={navBtn}>Back</button>
          <button type="button" onClick={start} disabled={busy || questions.length === 0} className={submitCls}>{busy ? "Starting..." : "Start exam"}</button>
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
    const written = questions.filter((q) => q.questionType === "THEORY").length;
    return (
      <div className="ros:flex ros:flex-col ros:gap-5">
        <div className={`${card} ros:flex ros:flex-col ros:items-center ros:gap-3 ros:text-center`}>
          <h2 className="ros-anton ros:text-3xl ros:uppercase">Exam submitted</h2>
          {score !== null && <p className="ros:text-[#00000099]">Your score: <b className="ros:text-black">{scoreText(score, exam?.totalAvailableScore)}</b></p>}
          {written > 0 && <p className="ros:text-sm ros:text-[#00000099]">Written answers cannot be sent online yet, so they were not submitted or marked.</p>}
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
    <div className="ros:flex ros:flex-col ros:gap-4">
      <div className="ros:sticky ros:top-[72px] ros:z-10 ros:flex ros:items-center ros:justify-between ros:rounded-xl ros:bg-black ros:px-5 ros:py-3 ros:text-white">
        <span className="ros:text-xs ros:font-bold ros:uppercase ros:tracking-[0.15em]">Question {index + 1} of {questions.length}</span>
        <span className={`ros:rounded-full ros:px-5 ros:py-1.5 ros:text-2xl ros:font-extrabold ros:tabular-nums ros:md:text-3xl ${low ? "ros:bg-[#DF4E4E]" : "ros:bg-[#FFFFFF22]"}`} aria-live="off">⏱ {fmt(left)}</span>
      </div>

      <div className={card}>
        <h2 className="ros:mb-5 ros:text-lg ros:font-bold ros:md:text-xl">{q.question}</h2>
        {q.questionType === "THEORY" ? (
          <>
          <p className="ros:mb-2 ros:text-sm ros:text-[#7B1D1D]">Written answers cannot be sent online yet.</p>
          <textarea
            value={answers[q.id] ?? ""}
            onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
            rows={6}
            className={`${inputCls} ros:resize-y`}
            placeholder="Write your answer here"
            aria-label="Your answer"
          />
          </>
        ) : (
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
        )}
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
                i === index ? "ros:border-black ros:bg-black ros:text-white" : (answers[x.id] ?? "").trim() ? "ros:border-[#DF4E4E] ros:bg-[#DF4E4E12] ros:text-[#DF4E4E]" : "ros:border-[#D0D5DD] ros:bg-white"
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
