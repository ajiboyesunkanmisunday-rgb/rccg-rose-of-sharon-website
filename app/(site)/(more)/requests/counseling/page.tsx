"use client";

import { FormHero } from "@/app/(site)/(more)/_kit/ui";

import { useState } from "react";
import Image from "next/image";
import { FormField, FormCard, inputCls, selectCls, textareaCls, FormSheet, submitCls, inputClsNoW, selectClsNoW, textareaClsNoW } from "@/app/(site)/(more)/_kit/form";
import { post } from "@/lib/api";


const topics = [
  "Marriage & Relationship",
  "Grief & Loss",
  "Financial Challenges",
  "Career & Purpose",
  "Family Conflict",
  "Mental & Emotional Health",
  "Spiritual Crisis",
  "Other",
];

export default function CounselingPage() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", topic: "", preferredTime: "", message: "",
  });
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
      const content = `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nTopic: ${form.topic}\nPreferred Time: ${form.preferredTime}\n\nMessage:\n${form.message}`;
      await post("/requests/counseling", {
        subject: `Counselling Session Request — ${form.topic || "General"}`,
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
      <FormHero pill="FORMS" title={<>Book a Counselling <span className="text-textRed">Session</span></>} subtitle="We are here for you. Our trained pastoral team offers confidential counselling to help you navigate life's challenges." />

      <FormSheet>
        <h2 className="ros-anton ros:uppercase ros:text-[#DF4E4E] ros:text-[48px] ros:leading-normal ros:text-center">
          Request a Counselling Session
        </h2>

        {status === "success" ? (
          <div className="ros:bg-white ros:rounded-2xl ros:p-10 ros:shadow-sm ros:flex ros:flex-col ros:gap-[16px] ros:items-center ros:max-w-[600px] ros:text-center">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="32" fill="#16A34A" fillOpacity="0.12" />
              <circle cx="32" cy="32" r="24" fill="#16A34A" fillOpacity="0.2" />
              <path d="M20 32L28 40L44 24" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="ros:text-[#111827] ros:text-[25px] ros:font-medium">Request Received!</p>
            <p className="ros:text-[#6B7280] ros:text-[16px] ros:font-normal">
              Thank you for reaching out. Our pastoral team will contact you within 48 hours to confirm your session. Everything shared is kept strictly confidential.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="ros:flex ros:flex-col ros:gap-[16px] ros:items-center ros:w-full ros:max-w-[700px]">
            <FormCard title="Your Contact Details">
              <div className="ros:flex ros:flex-col ros:gap-[16px]">
                <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-[16px]">
                  <FormField label="Your Name" required>
                    <input type="text" required value={form.name} onChange={set("name")} className={inputCls} placeholder="Full name" />
                  </FormField>
                  <FormField label="Phone Number" required>
                    <input type="tel" required value={form.phone} onChange={set("phone")} className={inputCls} placeholder="+234 800 000 0000" />
                  </FormField>
                </div>
                <FormField label="Email Address">
                  <input type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="your@email.com" />
                </FormField>
              </div>
            </FormCard>

            <FormCard title="Session Details">
              <div className="ros:flex ros:flex-col ros:gap-[16px]">
                <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-[16px]">
                  <FormField label="Topic / Area of Concern" required>
                    <select required value={form.topic} onChange={set("topic")} className={selectCls}>
                      <option value="">Select a topic</option>
                      {topics.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Preferred Time">
                    <select value={form.preferredTime} onChange={set("preferredTime")} className={selectCls}>
                      <option value="">Select preferred time</option>
                      <option value="Weekday Morning">Weekday Morning</option>
                      <option value="Weekday Afternoon">Weekday Afternoon</option>
                      <option value="Weekday Evening">Weekday Evening</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday (After Service)">Sunday (After Service)</option>
                    </select>
                  </FormField>
                </div>
                <FormField label="Brief Description" required>
                  <textarea
                    required
                    value={form.message}
                    onChange={set("message")}
                    className={textareaCls}
                    rows={5}
                    placeholder="Briefly describe what you would like to discuss..."
                  />
                </FormField>
              </div>
            </FormCard>

            <p className="ros:text-[#6B7280] ros:text-[13px] ros:font-normal ros:text-center">
              All information shared is treated with complete confidentiality.
            </p>

            {status === "error" && (
              <p className="ros:text-[#FF383C] ros:text-[14px] ros:font-normal ros:text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className={submitCls}
             
            >
              {status === "loading" ? "Submitting..." : "BOOK SESSION"}
            </button>
          </form>
        )}
      </FormSheet>
    </div>
  );
}
