"use client";

import { useState } from "react";
import { FormField, inputCls, textareaCls } from "@ros/shared/kit/form";
import { post } from "@ros/shared/api";

/*
 * "Submit an announcement": members send a notice to the church team. It reaches ROSMS as a received announcement,
 * where the admin approves or declines it; only approved ones appear in the list above. The backend needs to know
 * which member submitted it, so the visitor first confirms their membership email or phone number.
 */

const MAX_SUBJECT = 150;
const MAX_CONTENT = 1000;
const today = () => new Date().toISOString().slice(0, 10);

export default function SubmitAnnouncement() {
  const [step, setStep] = useState<"verify" | "form" | "done">("verify");
  const [who, setWho] = useState("");
  const [member, setMember] = useState<{ id: string; firstName: string } | null>(null);
  const [checking, setChecking] = useState(false);
  const [verifyError, setVerifyError] = useState("");
  const [form, setForm] = useState({ subject: "", content: "", startDate: "", endDate: "" });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    setChecking(true);
    setVerifyError("");
    try {
      const res = await fetch("/api/member/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ identifier: who }) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.id) throw new Error(json.message || "We could not check your membership right now.");
      setMember({ id: json.id, firstName: json.firstName || "" });
      setStep("form");
    } catch (err) {
      setVerifyError(err instanceof Error ? err.message : "We could not check your membership right now.");
    } finally {
      setChecking(false);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (form.startDate > form.endDate) { setError("Start date must be on or before the end date."); return; }
    setSending(true);
    try {
      await post("/announcements", { subject: form.subject.trim(), content: form.content.trim(), submittedBy: member!.id, startDate: form.startDate, endDate: form.endDate });
      setStep("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Your announcement could not be sent. Please try again.");
    } finally {
      setSending(false);
    }
  }

  const reset = () => { setForm({ subject: "", content: "", startDate: "", endDate: "" }); setError(""); setStep("form"); };

  return (
    <section id="submit" className="ros:bg-white ros:px-4 ros:py-14 ros:md:py-20">
      <div className="ros:mx-auto ros:flex ros:w-full ros:max-w-[640px] ros:flex-col ros:items-center ros:gap-5 ros:text-center">
        <h6 className="ros:w-fit ros:rounded-full ros:bg-[#F4F4F4] ros:px-3 ros:py-1 ros:text-xs ros:font-bold">📣 HAVE AN ANNOUNCEMENT?</h6>
        <h2 className="ros-anton ros:text-[32px] ros:uppercase ros:leading-tight ros:text-[#DF4E4E] ros:md:text-[44px]">Submit an announcement</h2>
        <p className="ros:max-w-xl ros:text-[#00000099]">Members can send a notice to the church team. It is reviewed first, and it appears on this page once it is approved.</p>

        {step === "verify" && (
          <form onSubmit={verify} className="ros:flex ros:w-full ros:flex-col ros:gap-4 ros:rounded-2xl ros:border ros:border-[#00000014] ros:bg-[#FAFAFA] ros:p-6 ros:text-left">
            <FormField label="Your membership email or phone number" required>
              <input type="text" required value={who} onChange={(e) => setWho(e.target.value)} className={inputCls} placeholder="Email or phone number on your membership record" data-no-check />
            </FormField>
            <p className="ros:text-xs ros:text-[#00000099]">Only church members can submit announcements. We use this to find your membership and never show it.</p>
            {verifyError && <p className="ros:text-sm ros:text-[#DC2626]">{verifyError}</p>}
            <button type="submit" disabled={checking} className="ros:self-center ros:rounded-full ros:bg-[#DF4E4E] ros:px-8 ros:py-3 ros:text-sm ros:font-bold ros:uppercase ros:tracking-[0.15em] ros:text-white ros:disabled:opacity-60">{checking ? "Checking…" : "Continue"}</button>
          </form>
        )}

        {step === "form" && member && (
          <form onSubmit={submit} className="ros:flex ros:w-full ros:flex-col ros:gap-4 ros:rounded-2xl ros:border ros:border-[#00000014] ros:bg-[#FAFAFA] ros:p-6 ros:text-left">
            <p className="ros:text-sm ros:font-bold ros:text-[#16A34A]">✓ Verified member{member.firstName ? `: ${member.firstName}` : ""}</p>
            <FormField label="Title" required>
              <input type="text" required maxLength={MAX_SUBJECT} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputCls} placeholder="Enter announcement title" />
              <span className="ros:self-end ros:text-xs ros:text-[#9CA3AF]">{form.subject.length}/{MAX_SUBJECT}</span>
            </FormField>
            <FormField label="Details" required>
              <textarea required maxLength={MAX_CONTENT} rows={5} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className={textareaCls} placeholder="Enter announcement details" />
              <span className="ros:self-end ros:text-xs ros:text-[#9CA3AF]">{form.content.length}/{MAX_CONTENT}</span>
            </FormField>
            <div className="ros:grid ros:grid-cols-1 ros:gap-4 ros:sm:grid-cols-2">
              <FormField label="Start Date" required>
                <input type="date" required min={today()} value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className={inputCls} />
              </FormField>
              <FormField label="End Date" required>
                <input type="date" required min={form.startDate || today()} value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className={inputCls} />
              </FormField>
            </div>
            {error && <p className="ros:text-sm ros:text-[#DC2626]">{error}</p>}
            <button type="submit" disabled={sending} className="ros:self-center ros:rounded-full ros:bg-[#DF4E4E] ros:px-8 ros:py-3 ros:text-sm ros:font-bold ros:uppercase ros:tracking-[0.15em] ros:text-white ros:disabled:opacity-60">{sending ? "Submitting…" : "Submit Announcement"}</button>
          </form>
        )}

        {step === "done" && (
          <div className="ros:flex ros:w-full ros:flex-col ros:items-center ros:gap-4 ros:rounded-2xl ros:border ros:border-[#00000014] ros:bg-[#FAFAFA] ros:p-8">
            <p className="ros:text-[22px] ros:font-bold">Thank you{member?.firstName ? `, ${member.firstName}` : ""}!</p>
            <p className="ros:text-[#00000099]">Your announcement has been sent to the church team for approval. It will appear on this page once it is approved.</p>
            <button type="button" onClick={reset} className="ros:text-sm ros:font-bold ros:text-[#DF4E4E] ros:hover:underline">Submit another announcement</button>
          </div>
        )}
      </div>
    </section>
  );
}
