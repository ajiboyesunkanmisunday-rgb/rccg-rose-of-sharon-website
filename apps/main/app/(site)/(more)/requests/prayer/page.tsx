"use client";

import { FormHero } from "@ros/shared/kit/ui";

import { useState } from "react";
import Image from "next/image";
import { FormField, FormCard, inputCls, selectCls, textareaCls, FormSheet, submitCls, inputClsNoW, selectClsNoW, textareaClsNoW } from "@ros/shared/kit/form";
import { post } from "@ros/shared/api";


const prayerTopics = [
  "Healing & Health",
  "Financial Breakthrough",
  "Marriage & Family",
  "Career & Business",
  "Salvation of Loved Ones",
  "Spiritual Growth",
  "Protection & Safety",
  "Other",
];

export default function PrayerRequestPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", topic: "", prayerRequest: "" });
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
      const content = `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nTopic: ${form.topic}\n\nPrayer Request:\n${form.prayerRequest}`;
      await post("/requests/prayer", { subject: `Prayer Request — ${form.topic || "General"}`, content });
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
            <FormCard title="Your Information">
              <div className="ros:grid ros:grid-cols-1 ros:sm:grid-cols-2 ros:gap-4">
                <FormField label="Your Name" required>
                  <input type="text" required value={form.name} onChange={set("name")} className={inputCls} placeholder="Full name" />
                </FormField>
                <FormField label="Phone Number">
                  <input type="tel" value={form.phone} onChange={set("phone")} className={inputCls} placeholder="+234 800 000 0000" />
                </FormField>
              </div>
              <div className="ros:mt-4">
                <FormField label="Email Address">
                  <input type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="your@email.com" />
                </FormField>
              </div>
            </FormCard>

            <FormCard title="Prayer Request">
              <div className="ros:flex ros:flex-col ros:gap-4">
                <FormField label="Prayer Topic" required>
                  <select required value={form.topic} onChange={set("topic")} className={selectCls}>
                    <option value="">Select a topic</option>
                    {prayerTopics.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </FormField>
                <FormField label="Your Prayer Request" required>
                  <textarea required value={form.prayerRequest} onChange={set("prayerRequest")} rows={6} className={textareaCls} placeholder="Share your prayer request..." />
                </FormField>
              </div>
            </FormCard>

            {status === "error" && (
              <p className="ros:text-red-500 ros:text-[14px] ros:text-center">{error}</p>
            )}
            <div className="ros:flex ros:justify-center">
              <button type="submit" disabled={status === "loading"} className={submitCls}>
                {status === "loading" ? "Submitting..." : "SEND PRAYER REQUEST"}
              </button>
            </div>
          </form>
        )}
      </FormSheet>
    </div>
  );
}
