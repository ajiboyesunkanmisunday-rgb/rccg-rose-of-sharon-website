"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FormField, inputCls, submitCls } from "@ros/shared/kit/form";
import { EXAM_DISCLAIMER, getProgram } from "@ros/shared/kit/programs";

type Stage = "intro" | "running" | "done";

function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/** Timed online exam (demo question bank). Results are shown on screen only — nothing is submitted. */
export default function ExamRunner({ slug }: { slug: string }) {
  const program = getProgram(slug);
  const { minutes, passMark, questions } = program.exam;
  const total = minutes * 60;

  const [stage, setStage] = useState<Stage>("intro");
  const [candidate, setCandidate] = useState({ name: "", id: "" });
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [index, setIndex] = useState(0);
  const [left, setLeft] = useState(total);
  const endsAt = useRef(0);

  useEffect(() => {
    if (stage !== "running") return;
    const t = setInterval(() => {
      const remaining = Math.max(0, Math.round((endsAt.current - Date.now()) / 1000));
      setLeft(remaining);
      if (remaining <= 0) {
        clearInterval(t);
        setStage("done");
      }
    }, 500);
    return () => clearInterval(t);
  }, [stage]);

  const score = useMemo(() => answers.reduce<number>((n, a, i) => (a === questions[i].answer ? n + 1 : n), 0), [answers, questions]);
  const percent = Math.round((score / questions.length) * 100);
  const answered = answers.filter((a) => a !== null).length;
  const low = left <= Math.max(30, total * 0.15);

  function start(e: React.FormEvent) {
    e.preventDefault();
    setAnswers(questions.map(() => null));
    setIndex(0);
    endsAt.current = Date.now() + total * 1000;
    setLeft(total);
    setStage("running");
  }

  function finish() {
    if (answered < questions.length && !window.confirm(`You have answered ${answered} of ${questions.length} questions. Submit now?`)) return;
    setStage("done");
  }

  const card = "ros:rounded-xl ros:border ros:border-[#E5E7EB] ros:bg-[#FAFAFA] ros:p-5 ros:sm:p-7";

  if (stage === "intro") {
    return (
      <div className="ros:flex ros:flex-col ros:gap-5">
        <div className="ros:rounded-lg ros:border ros:border-[#DF4E4E55] ros:bg-[#DF4E4E12] ros:px-4 ros:py-3 ros:text-sm ros:text-[#7B1D1D]">
          <span className="ros:font-bold">Demo exam. </span>
          {EXAM_DISCLAIMER} Your result is shown on screen only and is not sent to the church.
        </div>
        <div className={card}>
          <h2 className="ros-anton ros:mb-4 ros:text-2xl ros:uppercase">Exam instructions</h2>
          <ul className="ros:flex ros:list-disc ros:flex-col ros:gap-2 ros:pl-5 ros:text-[#00000099]">
            <li>{questions.length} multiple-choice questions.</li>
            <li>You have <b className="ros:text-black">{minutes} minutes</b>. The exam submits automatically when the time is up.</li>
            <li>Pass mark: <b className="ros:text-black">{passMark}%</b>.</li>
            <li>You can move back and forth between questions before you submit.</li>
          </ul>
        </div>
        <form onSubmit={start} className={`${card} ros:flex ros:flex-col ros:gap-4`}>
          <h3 className="ros:text-lg ros:font-bold">Candidate</h3>
          <div className="ros:grid ros:grid-cols-1 ros:gap-4 ros:sm:grid-cols-2">
            <FormField label="Full name" required>
              <input required value={candidate.name} onChange={(e) => setCandidate((c) => ({ ...c, name: e.target.value }))} className={inputCls} />
            </FormField>
            <FormField label="Admission number">
              <input value={candidate.id} onChange={(e) => setCandidate((c) => ({ ...c, id: e.target.value }))} className={inputCls} placeholder="If you have one" />
            </FormField>
          </div>
          <div className="ros:flex ros:justify-center">
            <button type="submit" className={submitCls}>Start exam</button>
          </div>
        </form>
      </div>
    );
  }

  if (stage === "done") {
    const passed = percent >= passMark;
    return (
      <div className="ros:flex ros:flex-col ros:gap-5">
        <div className={`${card} ros:flex ros:flex-col ros:items-center ros:gap-3 ros:text-center`}>
          <span className={`ros:flex ros:size-[90px] ros:items-center ros:justify-center ros:rounded-full ros:text-3xl ros:font-bold ros:text-white ${passed ? "ros:bg-[#16A34A]" : "ros:bg-[#DF4E4E]"}`}>{percent}%</span>
          <h2 className="ros-anton ros:text-3xl ros:uppercase">{passed ? "Passed" : "Not passed"}</h2>
          <p className="ros:text-[#00000099]">
            {candidate.name ? `${candidate.name}, you` : "You"} scored <b className="ros:text-black">{score} / {questions.length}</b>. The pass mark is {passMark}%.
          </p>
          <p className="ros:text-xs ros:text-[#00000066]">Demo exam — this result has not been recorded.</p>
        </div>
        <div className={`${card} ros:flex ros:flex-col ros:gap-4`}>
          <h3 className="ros:text-lg ros:font-bold">Review</h3>
          {questions.map((q, i) => (
            <div key={i} className="ros:border-b ros:border-[#E5E7EB] ros:pb-4 ros:last:border-0">
              <p className="ros:font-semibold">{i + 1}. {q.q}</p>
              <p className={`ros:mt-1 ros:text-sm ${answers[i] === q.answer ? "ros:text-[#16A34A]" : "ros:text-[#DF4E4E]"}`}>
                Your answer: {answers[i] === null ? "— not answered" : q.options[answers[i] as number]}
              </p>
              {answers[i] !== q.answer && <p className="ros:text-sm ros:text-[#00000099]">Correct answer: {q.options[q.answer]}</p>}
            </div>
          ))}
        </div>
        <div className="ros:flex ros:justify-center">
          <button type="button" onClick={() => setStage("intro")} className={submitCls}>Retake exam</button>
        </div>
      </div>
    );
  }

  const q = questions[index];
  return (
    <div className="ros:flex ros:flex-col ros:gap-4">
      <div className="ros:sticky ros:top-[72px] ros:z-10 ros:flex ros:items-center ros:justify-between ros:rounded-xl ros:bg-black ros:px-5 ros:py-3 ros:text-white">
        <span className="ros:text-xs ros:font-bold ros:uppercase ros:tracking-[0.15em]">Question {index + 1} of {questions.length}</span>
        <span className={`ros:rounded-full ros:px-4 ros:py-1 ros:text-sm ros:font-bold ros:tabular-nums ${low ? "ros:bg-[#DF4E4E]" : "ros:bg-[#FFFFFF22]"}`}>⏱ {fmt(left)}</span>
      </div>

      <div className={card}>
        <h2 className="ros:mb-5 ros:text-lg ros:font-bold ros:md:text-xl">{q.q}</h2>
        <div className="ros:flex ros:flex-col ros:gap-3">
          {q.options.map((o, i) => {
            const chosen = answers[index] === i;
            return (
              <button
                key={o}
                type="button"
                onClick={() => setAnswers((a) => a.map((v, k) => (k === index ? i : v)))}
                className={`ros:flex ros:items-center ros:gap-3 ros:rounded-lg ros:border ros:px-4 ros:py-3 ros:text-left ros:transition ${
                  chosen ? "ros:border-[#DF4E4E] ros:bg-[#DF4E4E12]" : "ros:border-[#D0D5DD] ros:bg-white ros:hover:border-black"
                }`}
              >
                <span className={`ros:flex ros:size-6 ros:flex-shrink-0 ros:items-center ros:justify-center ros:rounded-full ros:border-2 ${chosen ? "ros:border-[#DF4E4E]" : "ros:border-[#9CA3AF]"}`}>
                  {chosen && <span className="ros:size-3 ros:rounded-full ros:bg-[#DF4E4E]" />}
                </span>
                <span>{o}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="ros:flex ros:flex-wrap ros:items-center ros:justify-between ros:gap-3">
        <button type="button" disabled={index === 0} onClick={() => setIndex((i) => i - 1)} className="ros:rounded-full ros:border ros:border-black ros:px-5 ros:py-2 ros:text-xs ros:font-extrabold ros:uppercase ros:tracking-[0.2em] ros:disabled:opacity-30">← Previous</button>
        <div className="ros:flex ros:flex-wrap ros:justify-center ros:gap-2">
          {questions.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to question ${i + 1}`}
              className={`ros:size-9 ros:rounded-full ros:border ros:text-xs ros:font-bold ${
                i === index ? "ros:border-black ros:bg-black ros:text-white" : answers[i] !== null ? "ros:border-[#DF4E4E] ros:bg-[#DF4E4E12] ros:text-[#DF4E4E]" : "ros:border-[#D0D5DD] ros:bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        {index < questions.length - 1 ? (
          <button type="button" onClick={() => setIndex((i) => i + 1)} className="ros:rounded-full ros:border ros:border-black ros:bg-black ros:px-5 ros:py-2 ros:text-xs ros:font-extrabold ros:uppercase ros:tracking-[0.2em] ros:text-white">Next →</button>
        ) : (
          <button type="button" onClick={finish} className={submitCls}>Submit exam</button>
        )}
      </div>
    </div>
  );
}
