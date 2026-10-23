"use client";

import { FormHero } from "@/app/(site)/(more)/_kit/ui";

import { useState } from "react";
import Image from "next/image";
import { FormField, FormCard, inputCls, selectCls, textareaCls, FormSheet, submitCls, inputClsNoW, selectClsNoW, textareaClsNoW } from "@/app/(site)/(more)/_kit/form";
import { post } from "@/lib/api";


const suggestionAreas = [
  "Worship & Music",
  "Sermons & Teaching",
  "Church Programs",
  "Children & Youth",
  "Facilities & Environment",
  "Online Presence",
  "Community Outreach",
  "General Feedback",
  "Other",
];

export default function SuggestionPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", area: "", suggestion: "" });
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
      const content = [
        `Name: ${form.name}`,
        form.phone ? `Phone: ${form.phone}` : null,
        form.email ? `Email: ${form.email}` : null,
        form.area ? `Area: ${form.area}` : null,
        `\nSuggestion:\n${form.suggestion}`,
      ].filter(Boolean).join("\n");
      await post("/requests/suggestion", {
        subject: `Suggestion — ${form.area || "General"}`,
        content,
      });
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
              onClick={() => { setStatus("idle"); setForm({ name: "", phone: "", email: "", area: "", suggestion: "" }); }}
              className="ros:text-[#DF4E4E] ros:text-[14px] ros:hover:underline ros:mt-[8px]"
             
            >
              Submit another suggestion
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="ros:flex ros:flex-col ros:gap-[16px] ros:items-center ros:w-full ros:max-w-[700px]">
            <FormCard title="Your Details">
              <div className="ros:flex ros:flex-col ros:gap-[16px]">
                <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-[16px]">
                  <FormField label="Your Name" required>
                    <input type="text" required value={form.name} onChange={set("name")} className={inputCls} placeholder="Full name" />
                  </FormField>
                  <FormField label="Phone Number">
                    <input type="tel" value={form.phone} onChange={set("phone")} className={inputCls} placeholder="+234 800 000 0000" />
                  </FormField>
                </div>
                <FormField label="Email Address">
                  <input type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="your@email.com" />
                </FormField>
              </div>
            </FormCard>

            <FormCard title="Your Suggestion">
              <div className="ros:flex ros:flex-col ros:gap-[16px]">
                <FormField label="Area of Suggestion" required>
                  <select required value={form.area} onChange={set("area")} className={selectCls}>
                    <option value="">Select an area</option>
                    {suggestionAreas.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </FormField>
                <FormField label="Your Suggestion" required>
                  <textarea
                    required
                    value={form.suggestion}
                    onChange={set("suggestion")}
                    className={textareaCls}
                    rows={5}
                    placeholder="Share your suggestion or feedback..."
                  />
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
              {status === "loading" ? "Submitting..." : "SEND SUGGESTION"}
            </button>
          </form>
        )}
      </FormSheet>
    </div>
  );
}
