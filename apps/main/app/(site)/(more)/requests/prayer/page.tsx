"use client";

import { FormHero } from "@ros/shared/kit/ui";

import { useState } from "react";
import Image from "next/image";
import { FormField, FormCard, inputCls, selectCls, textareaCls, FormSheet, submitCls, inputClsNoW, selectClsNoW, textareaClsNoW } from "@ros/shared/kit/form";
import { post } from "@ros/shared/api";


// Same category list as the ROSMS "Add Prayer Request" form
const CATEGORY_OPTIONS = ["Healing", "Finance", "Family", "Marriage", "Salvation", "Career", "Other"];
const MAX_REQUEST = 1000;

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

export default function PrayerRequestPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", category: "", prayerRequest: "" });
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
      await post("/requests/prayer", { subject: form.category || "Prayer Request", content: `${form.prayerRequest.trim()}\n\n${from}` });
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  return (
    <div>
      <FormHero pill="FORMS" title={<>Prayer <span className="text-textRed">Request</span></>} subtitle="Share your prayer needs with us. Our prayer team will stand in agreement with you before the throne of grace." />

      <FormSheet>
        <div className="ros:flex ros:flex-col ros:gap-[4px] ros:items-center ros:text-center">
          <h2 className="ros-anton ros:uppercase ros:text-[#DF4E4E] ros:text-[26px] ros:md:text-[34px]">Submit a Prayer Request</h2>
          <p className="ros:text-[#6B7280] ros:text-[14px]">Fields marked * are required</p>
        </div>

        {status === "success" ? (
          <div className="ros:flex ros:flex-col ros:gap-[16px] ros:items-center ros:max-w-[500px] ros:text-center ros:bg-white ros:rounded-2xl ros:p-10 ros:shadow-sm">
            <div className="ros:size-[72px] ros:rounded-full ros:bg-[#DF4E4E]/10 ros:flex ros:items-center ros:justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#DF4E4E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="ros:text-[#DF4E4E] ros:text-[22px] ros:font-bold">Prayer Request Received!</p>
            <p className="ros:text-[#6B7280] ros:text-[15px]">
              We have received your prayer request. Our prayer team will be interceding on your behalf. God answers prayers!
            </p>
            <button onClick={() => setStatus("idle")} className="ros:text-[#DF4E4E] ros:text-[14px] ros:font-medium ros:hover:underline">
              Submit another request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="ros:flex ros:flex-col ros:gap-[16px] ros:w-full ros:max-w-[700px]">
            <FormCard title="Prayer Request">
              <div className="ros:flex ros:flex-col ros:gap-4">
                <div className="ros:flex ros:flex-col ros:gap-[6px]">
                  <CountedLabel label="Submitted By" required />
                  <input type="text" required value={form.name} onChange={set("name")} className={inputCls} placeholder="Enter your full name" autoComplete="name" />
                </div>
                <div className="ros:flex ros:flex-col ros:gap-[6px]">
                  <CountedLabel label="Category" required />
                  <select required value={form.category} onChange={set("category")} className={selectCls}>
                    <option value="">Select category</option>
                    {CATEGORY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="ros:flex ros:flex-col ros:gap-[6px]">
                  <CountedLabel label="Prayer Request" required count={form.prayerRequest.length} max={MAX_REQUEST} />
                  <textarea required value={form.prayerRequest} onChange={set("prayerRequest")} rows={5} maxLength={MAX_REQUEST} className={textareaCls} placeholder="Describe the prayer request in detail..." />
                </div>
              </div>
            </FormCard>

            <FormCard title="How can we reach you? (optional)">
              <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-4">
                <FormField label="Phone Number">
                  <input type="tel" value={form.phone} onChange={set("phone")} className={inputCls} placeholder="+234 800 000 0000" />
                </FormField>
                <FormField label="Email">
                  <input type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="Enter email address" />
                </FormField>
              </div>
            </FormCard>

            {status === "error" && (
              <p className="ros:text-red-500 ros:text-[14px] ros:text-center">{error}</p>
            )}
            <div className="ros:flex ros:justify-center">
              <button type="submit" disabled={status === "loading"} className={submitCls}>
                {status === "loading" ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </form>
        )}
      </FormSheet>
    </div>
  );
}
