"use client";

import { useState } from "react";
import { FormField, inputCls, submitCls } from "@ros/shared/kit/form";

type Result = { name: string; scores: { name: string; score: number }[] };

/** Official results from the training office's score sheets, found by set and admission number. */
export default function OfficialResult({ program }: { program: string }) {
  const [set, setSet] = useState("");
  const [admission, setAdmission] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  async function check(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/result", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ program, set, admission }) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.message || "We could not load your result.");
      setResult(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "We could not load your result.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="ros:mt-8 ros:rounded-xl ros:border ros:border-[#E5E7EB] ros:bg-[#FAFAFA] ros:p-6 ros:sm:p-8">
      <h3 className="ros:text-lg ros:font-bold">Official results</h3>
      <p className="ros:mt-1 ros:text-sm ros:text-[#00000099]">Results recorded by the training office. Enter your set and your admission number.</p>
      <form onSubmit={check} className="ros:mt-4 ros:flex ros:flex-col ros:gap-4">
        <div className="ros:grid ros:grid-cols-1 ros:gap-4 ros:sm:grid-cols-2">
          <FormField label="Set" required><input required value={set} onChange={(e) => setSet(e.target.value)} className={inputCls} placeholder="e.g. 2026" /></FormField>
          <FormField label="Admission number" required><input required value={admission} onChange={(e) => setAdmission(e.target.value)} className={inputCls} placeholder="Your admission number" data-no-check /></FormField>
        </div>
        {error && <p role="alert" className="ros:text-sm ros:text-[#DC2626]">{error}</p>}
        <div className="ros:flex ros:justify-center"><button type="submit" disabled={busy} className={submitCls}>{busy ? "Checking…" : "Check my result"}</button></div>
      </form>
      {result && (
        <div className="ros:mt-6">
          <p className="ros:font-bold">{result.name}</p>
          {result.scores.length ? (
            <table className="ros:mt-3 ros:w-full ros:text-left ros:text-sm">
              <thead><tr className="ros:border-b ros:border-[#E5E7EB]"><th className="ros:py-2">Course / exam</th><th className="ros:py-2">Score</th></tr></thead>
              <tbody>{result.scores.map((s, i) => <tr key={i} className="ros:border-b ros:border-[#F3F4F6]"><td className="ros:py-2">{s.name}</td><td className="ros:py-2 ros:font-bold">{s.score}</td></tr>)}</tbody>
            </table>
          ) : <p className="ros:mt-2 ros:text-sm ros:text-[#00000099]">No scores have been recorded for you yet.</p>}
        </div>
      )}
    </div>
  );
}
