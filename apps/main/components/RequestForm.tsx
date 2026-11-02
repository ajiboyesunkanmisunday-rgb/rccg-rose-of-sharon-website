"use client";

import { useState } from "react";
import { FormHero } from "@ros/shared/kit/ui";
import { FormField, FormCard, FormSheet, inputCls, selectCls, textareaCls, submitCls } from "@ros/shared/kit/form";
import Link from "@ros/shared/link";
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
  requireMember = false,
  memberNote = "This request is for members of Rose of Sharon. Enter the email address or phone number on your membership record and we will find you.",
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
  /** the visitor must be found as a member first (by membership email or phone); the request is then filed under that member */
  requireMember?: boolean;
  memberNote?: string;
}) {
  const empty = Object.fromEntries(fields.map((f) => [f.key, ""]));
  const [values, setValues] = useState<Record<string, string>>(empty);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const [identifier, setIdentifier] = useState("");
  const [member, setMember] = useState<{ id: string; firstName: string } | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState("");

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    setVerifying(true);
    setVerifyError("");
    try {
      const res = await fetch("/api/member/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ identifier }) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.message || "We could not check your membership. Please try again.");
      setMember({ id: json.id, firstName: json.firstName || "" });
    } catch (err) {
      setVerifyError(err instanceof Error ? err.message : "We could not check your membership. Please try again.");
    } finally {
      setVerifying(false);
    }
  }

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setValues((p) => ({ ...p, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const lines = fields.filter((f) => values[f.key]?.trim()).map((f) => `${f.label}: ${values[f.key].trim()}`);
      await post(endpoint, { ...(member ? { userId: member.id } : {}), subject: subjectField && values[subjectField] ? `${subject} — ${values[subjectField]}` : subject, content: lines.join("\n") });
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
        ) : requireMember && !member ? (
          <form onSubmit={verify} noValidate className="ros:mx-auto ros:flex ros:w-full ros:max-w-[620px] ros:flex-col ros:gap-4">
            <FormCard title="Your Membership">
              <div className="ros:flex ros:flex-col ros:gap-4">
                <p className="ros:text-sm ros:text-[#00000099]">{memberNote}</p>
                <FormField label="Membership email or phone number" required>
                  <input type="text" required value={identifier} onChange={(e) => setIdentifier(e.target.value)} className={inputCls} placeholder="you@example.com or 080 0000 0000" autoComplete="off" data-no-check />
                </FormField>
                {verifyError && <p role="alert" className="ros:text-sm ros:text-[#FF383C]">{verifyError}</p>}
              </div>
            </FormCard>
            <div className="ros:flex ros:justify-center">
              <button type="submit" disabled={verifying || identifier.trim().length < 5} className={submitCls}>{verifying ? "Checking..." : "Continue"}</button>
            </div>
            <p className="ros:text-center ros:text-sm ros:text-[#00000099]">
              Not a member yet? <Link href="/membership" className="ros:font-bold ros:text-[#DF4E4E] ros:hover:underline">Become a member</Link>
            </p>
          </form>
        ) : (
          <form onSubmit={submit} className="ros:mx-auto ros:flex ros:w-full ros:max-w-[620px] ros:flex-col ros:gap-4">
            {member && <p className="ros:self-center ros:rounded-full ros:bg-[#16A34A]/10 ros:px-4 ros:py-1.5 ros:text-sm ros:font-bold ros:text-[#16A34A]">✓ Verified member{member.firstName ? `: ${member.firstName}` : ""}</p>}
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
