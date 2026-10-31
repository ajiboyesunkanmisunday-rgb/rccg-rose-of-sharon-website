"use client";

import { FormHero } from "@ros/shared/kit/ui";

import { useState } from "react";
import Image from "next/image";
import { FormField, FormCard, inputCls, selectCls, textareaCls, FormSheet, submitCls, inputClsNoW, selectClsNoW, textareaClsNoW } from "@ros/shared/kit/form";
import { post } from "@ros/shared/api";


const MAX_DETAILS = 1000;
const MAX_SUBJECT = 150;
// the ROSMS "New Request" Category list; this page always files a Suggestion
const CATEGORIES = [{ value: "PRAYER", label: "Prayer" }, { value: "COUNSELING", label: "Counseling" }, { value: "SUGGESTIONS", label: "Suggestion" }];

/** A label row with the ROSMS-style character counter on the right (e.g. 0/150). */
function CountedLabel({ label, required, count, max }: { label: string; required?: boolean; count?: number; max?: number }) {
  return (
    <div className="ros:flex ros:items-center ros:justify-between">
      <label className="ros:block ros:text-sm ros:font-semibold ros:text-[#111827]">
        {label}{required && <span className="ros:ml-[3px] ros:text-[#DF4E4E]">*</span>}
      </label>
      {max !== undefined && <span className="ros:text-xs ros:tabular-nums ros:text-[#9CA3AF]">{count ?? 0}/{max}</span>}
    </div>
  );
}

export default function SuggestionPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", details: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function set(k: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const from = [`Submitted by: ${form.name.trim()}`, form.phone && `Phone: ${form.phone}`, form.email && `Email: ${form.email}`].filter(Boolean).join("\n");
      await post("/requests/suggestion", { subject: form.subject.trim(), content: `${form.details.trim()}\n\n${from}` });
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  return (
    <div>
      <FormHero pill="YOUR VOICE MATTERS" title={<>Share a <span className="text-textRed">Suggestion</span></>} subtitle="We value your thoughts. Help us grow and serve you better — every suggestion is prayerfully considered." />

      <FormSheet>
        <h2 className="ros-anton ros:uppercase ros:text-[#DF4E4E] ros:text-[48px] ros:leading-normal ros:text-center">
          Submit a Suggestion
        </h2>

        {status === "success" ? (
          <div className="ros:bg-white ros:rounded-2xl ros:p-10 ros:shadow-sm ros:flex ros:flex-col ros:gap-[16px] ros:items-center ros:max-w-[600px] ros:text-center">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="32" fill="#16A34A" fillOpacity="0.12" />
              <circle cx="32" cy="32" r="24" fill="#16A34A" fillOpacity="0.2" />
              <path d="M20 32L28 40L44 24" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="ros:text-[#111827] ros:text-[25px] ros:font-medium">Thank You!</p>
            <p className="ros:text-[#6B7280] ros:text-[16px] ros:font-normal">
              Your suggestion has been received. We appreciate your heart for the house of God.
            </p>
            <button
              onClick={() => { setStatus("idle"); setForm({ name: "", phone: "", email: "", subject: "", details: "" }); }}
              className="ros:text-[#DF4E4E] ros:text-[14px] ros:hover:underline ros:mt-[8px]"
             
            >
              Submit another suggestion
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="ros:flex ros:flex-col ros:gap-[16px] ros:items-center ros:w-full ros:max-w-[700px]">
            <FormCard title="New Request">
              <div className="ros:flex ros:flex-col ros:gap-4">
                <div className="ros:flex ros:flex-col ros:gap-[6px]">
                  <CountedLabel label="Subject" required count={form.subject.length} max={MAX_SUBJECT} />
                  <input type="text" required value={form.subject} onChange={set("subject")} maxLength={MAX_SUBJECT} className={inputCls} placeholder="Brief subject for the request" />
                </div>
                <div className="ros:flex ros:flex-col ros:gap-[6px]">
                  <CountedLabel label="Category" required />
                  <select value="SUGGESTIONS" disabled className={selectCls} aria-label="Category">
                    <option value="">Select</option>
                    {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
                <div className="ros:flex ros:flex-col ros:gap-[6px]">
                  <CountedLabel label="Submitted By" required />
                  <input type="text" required value={form.name} onChange={set("name")} className={inputCls} placeholder="Enter your full name" autoComplete="name" />
                </div>
                <div className="ros:flex ros:flex-col ros:gap-[6px]">
                  <CountedLabel label="Details" required count={form.details.length} max={MAX_DETAILS} />
                  <textarea required value={form.details} onChange={set("details")} rows={6} maxLength={MAX_DETAILS} className={textareaCls} placeholder="Describe the request…" />
                </div>
              </div>
            </FormCard>

            <FormCard title="How can we reach you? (optional)">
              <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-[16px]">
                <FormField label="Phone Number">
                  <input type="tel" value={form.phone} onChange={set("phone")} className={inputCls} placeholder="+234 800 000 0000" />
                </FormField>
                <FormField label="Email">
                  <input type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="Enter email address" />
                </FormField>
              </div>
            </FormCard>

            {status === "error" && (
              <p className="ros:text-[#FF383C] ros:text-[14px] ros:font-normal ros:text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className={submitCls}
             
            >
              {status === "loading" ? "Submitting..." : "Save Request"}
            </button>
          </form>
        )}
      </FormSheet>
    </div>
  );
}
