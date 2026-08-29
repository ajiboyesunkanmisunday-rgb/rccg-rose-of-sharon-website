"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FormField, FormCard, inputCls, selectCls, textareaCls } from "@/components/ui/FormField";
import { post } from "@/lib/api";

const vs = { fontVariationSettings: '"wdth" 100' };

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
    <main>
      <section className="relative min-h-[380px] md:h-[460px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/assets/hero-bg.png" alt="" fill className="object-cover pointer-events-none" priority />
          <div className="absolute inset-0 bg-[rgba(16,14,26,0.75)]" />
        </div>
        <Navbar />
        <div className="relative z-10 w-full max-w-[900px] px-6 mt-16 md:mt-[48px] flex flex-col gap-[24px] items-center text-center">
          <h1 className="text-[#FFFDFD] text-[36px] md:text-[56px] lg:text-[68px] font-medium leading-normal w-full" style={vs}>
            Book a Counselling Session
          </h1>
          <p className="text-[#FFFDFD] text-[16px] md:text-[18px] font-normal leading-[32px] w-full" style={vs}>
            We are here for you. Our trained pastoral team offers confidential counselling to help you navigate life&apos;s challenges.
          </p>
        </div>
      </section>

      <section className="bg-[#F3F4F6] px-4 md:px-[60px] lg:px-[120px] py-[84px] flex flex-col gap-[32px] items-center w-full">
        <h2 className="text-[#000080] text-[48px] font-bold leading-normal text-center" style={vs}>
          Request a Counselling Session
        </h2>

        {status === "success" ? (
          <div className="bg-white rounded-2xl p-10 shadow-sm flex flex-col gap-[16px] items-center max-w-[600px] text-center">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="32" fill="#16A34A" fillOpacity="0.12" />
              <circle cx="32" cy="32" r="24" fill="#16A34A" fillOpacity="0.2" />
              <path d="M20 32L28 40L44 24" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-[#111827] text-[25px] font-medium" style={vs}>Request Received!</p>
            <p className="text-[#6B7280] text-[16px] font-normal" style={vs}>
              Thank you for reaching out. Our pastoral team will contact you within 48 hours to confirm your session. Everything shared is kept strictly confidential.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-[16px] items-center w-full max-w-[700px]">
            <FormCard title="Your Contact Details">
              <div className="flex flex-col gap-[16px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
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
              <div className="flex flex-col gap-[16px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
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

            <p className="text-[#6B7280] text-[13px] font-normal text-center" style={vs}>
              All information shared is treated with complete confidentiality.
            </p>

            {status === "error" && (
              <p className="text-[#FF383C] text-[14px] font-normal text-center" style={vs}>{error}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-[#000080] px-[40px] py-[16px] rounded-[33px] text-[#FFFDFD] text-[18px] md:text-[22px] font-medium hover:bg-[#0000a0] transition-colors disabled:opacity-60"
              style={vs}
            >
              {status === "loading" ? "Submitting..." : "BOOK SESSION"}
            </button>
          </form>
        )}
      </section>

      <Footer />
    </main>
  );
}
