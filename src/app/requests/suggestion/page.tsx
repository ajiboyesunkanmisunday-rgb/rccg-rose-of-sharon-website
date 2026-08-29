"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FormField, FormCard, inputCls, selectCls, textareaCls } from "@/components/ui/FormField";
import { post } from "@/lib/api";

const vs = { fontVariationSettings: '"wdth" 100' };

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
    <main>
      <section className="relative min-h-[380px] md:h-[460px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/assets/thanksgiving-bg.png" alt="" fill className="object-cover pointer-events-none" priority />
          <div className="absolute inset-0 bg-[rgba(16,14,26,0.72)]" />
        </div>
        <Navbar />
        <div className="relative z-10 w-full max-w-[900px] px-6 mt-16 md:mt-[48px] flex flex-col gap-[24px] items-center text-center">
          <p className="text-[#B5B5F3] text-[16px] font-normal uppercase tracking-[0.15em]" style={vs}>Your Voice Matters</p>
          <h1 className="text-[#FFFDFD] text-[36px] md:text-[56px] lg:text-[68px] font-medium leading-normal w-full" style={vs}>Share a Suggestion</h1>
          <p className="text-[#FFFDFD] text-[16px] md:text-[18px] font-normal leading-[32px] max-w-[800px]" style={vs}>
            We value your thoughts. Help us grow and serve you better — every suggestion is prayerfully considered.
          </p>
        </div>
      </section>

      <section className="bg-[#F3F4F6] px-4 md:px-[60px] lg:px-[120px] py-[84px] flex flex-col gap-[32px] items-center w-full">
        <h2 className="text-[#000080] text-[48px] font-bold leading-normal text-center" style={vs}>
          Submit a Suggestion
        </h2>

        {status === "success" ? (
          <div className="bg-white rounded-2xl p-10 shadow-sm flex flex-col gap-[16px] items-center max-w-[600px] text-center">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="32" fill="#16A34A" fillOpacity="0.12" />
              <circle cx="32" cy="32" r="24" fill="#16A34A" fillOpacity="0.2" />
              <path d="M20 32L28 40L44 24" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-[#111827] text-[25px] font-medium" style={vs}>Thank You!</p>
            <p className="text-[#6B7280] text-[16px] font-normal" style={vs}>
              Your suggestion has been received. We appreciate your heart for the house of God.
            </p>
            <button
              onClick={() => { setStatus("idle"); setForm({ name: "", phone: "", email: "", area: "", suggestion: "" }); }}
              className="text-[#000080] text-[14px] hover:underline mt-[8px]"
              style={vs}
            >
              Submit another suggestion
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-[16px] items-center w-full max-w-[700px]">
            <FormCard title="Your Details">
              <div className="flex flex-col gap-[16px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
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
              <div className="flex flex-col gap-[16px]">
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
              <p className="text-[#FF383C] text-[14px] font-normal text-center" style={vs}>{error}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-[#000080] px-[40px] py-[16px] rounded-[33px] text-[#FFFDFD] text-[18px] md:text-[22px] font-medium hover:bg-[#0000a0] transition-colors disabled:opacity-60"
              style={vs}
            >
              {status === "loading" ? "Submitting..." : "SEND SUGGESTION"}
            </button>
          </form>
        )}
      </section>

      <Footer />
    </main>
  );
}
