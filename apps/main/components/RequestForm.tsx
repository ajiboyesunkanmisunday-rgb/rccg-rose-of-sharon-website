"use client";

import { useState } from "react";
import { FormHero } from "@ros/shared/kit/ui";
import { FormField, FormCard, FormSheet, inputCls, selectCls, textareaCls, submitCls } from "@ros/shared/kit/form";
import { post } from "@ros/shared/api";

export interface RequestField {
  key: string;
  label: string;
  type?: "text" | "tel" | "email" | "select" | "textarea" | "date";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  half?: boolean;
}

/**
 * A simple Rose of Sharon request form: the visitor's answers are sent to the church as one request
 * (subject + a readable list of their answers), the same way the other request forms on the site work.
 */
export default function RequestForm({
  pill = "FORMS",
  title,
  subtitle,
  cardTitle,
  fields,
  subject,
  subjectField,
  submitLabel = "SUBMIT",
  successTitle = "Thank you!",
  successText = "We have received your request and will be in touch.",
  endpoint = "/requests/suggestion",
}: {
  pill?: string;
  title: React.ReactNode;
  subtitle?: string;
  cardTitle: string;
  fields: RequestField[];
  /** the request's subject line */
  subject: string;
  /** optional: key of a field whose answer is added to the subject (\"Subject — answer\") */
  subjectField?: string;
  submitLabel?: string;
  successTitle?: string;
  successText?: string;
  endpoint?: string;
}) {
  const empty = Object.fromEntries(fields.map((f) => [f.key, ""]));
  const [values, setValues] = useState<Record<string, string>>(empty);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setValues((p) => ({ ...p, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const lines = fields.filter((f) => values[f.key]?.trim()).map((f) => `${f.label}: ${values[f.key].trim()}`);
      await post(endpoint, { subject: subjectField && values[subjectField] ? `${subject} — ${values[subjectField]}` : subject, content: lines.join("\n") });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  const input = (f: RequestField) => {
    const common = { id: f.key, required: f.required, value: values[f.key], onChange: set(f.key) };
    if (f.type === "select")
      return (
        <select {...common} className={selectCls}>
          <option value="">Select</option>
          {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      );
    if (f.type === "textarea") return <textarea {...common} rows={4} className={textareaCls} placeholder={f.placeholder} />;
    return <input {...common} type={f.type ?? "text"} className={inputCls} placeholder={f.placeholder} />;
  };

  return (
    <div>
      <FormHero pill={pill} title={title} subtitle={subtitle} />
      <FormSheet>
        {status === "success" ? (
          <div className="ros:mx-auto ros:flex ros:max-w-[500px] ros:flex-col ros:items-center ros:gap-[16px] ros:rounded-2xl ros:p-8 ros:text-center">
            <div className="ros:flex ros:size-[72px] ros:items-center ros:justify-center ros:rounded-full ros:bg-green-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <p className="ros:text-[22px] ros:font-bold ros:text-[#DF4E4E]">{successTitle}</p>
            <p className="ros:text-[15px] ros:text-[#6B7280]">{successText}</p>
            <button onClick={() => { setValues(empty); setStatus("idle"); }} className="ros:text-[14px] ros:font-medium ros:text-[#DF4E4E] ros:hover:underline">Send another</button>
          </div>
        ) : (
          <form onSubmit={submit} className="ros:mx-auto ros:flex ros:w-full ros:max-w-[620px] ros:flex-col ros:gap-4">
            <FormCard title={cardTitle}>
              <div className="ros:grid ros:grid-cols-1 ros:gap-4 ros:sm:grid-cols-2">
                {fields.map((f) => (
                  <div key={f.key} className={f.half ? "" : "ros:sm:col-span-2"}>
                    <FormField label={f.label} required={f.required}>{input(f)}</FormField>
                  </div>
                ))}
              </div>
            </FormCard>
            {status === "error" && <p role="alert" className="ros:text-center ros:text-[14px] ros:text-red-500">{error}</p>}
            <div className="ros:flex ros:justify-center">
              <button type="submit" disabled={status === "loading"} className={submitCls}>{status === "loading" ? "Sending…" : submitLabel}</button>
            </div>
          </form>
        )}
      </FormSheet>
    </div>
  );
}
