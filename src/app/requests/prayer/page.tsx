"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FormField, FormCard, inputCls, selectCls, textareaCls } from "@/components/ui/FormField";
import { post } from "@/lib/api";

const vs = { fontVariationSettings: '"wdth" 100' };

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
    <main>
      <section className="relative min-h-[380px] md:h-[460px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/assets/thanksgiving-bg.png" alt="" fill className="object-cover pointer-events-none" priority />
          <div className="absolute inset-0 bg-[rgba(0,0,128,0.72)]" />
        </div>
        <Navbar />
        <div className="relative z-10 w-full max-w-[800px] px-6 mt-16 md:mt-[48px] flex flex-col gap-[16px] items-center text-center">
          <h1 className="text-[#FFFDFD] text-[36px] md:text-[56px] lg:text-[68px] font-medium leading-tight" style={vs}>
            Prayer Request
          </h1>
          <p className="text-[#FFFDFD] text-[16px] md:text-[18px] font-normal leading-[1.6]" style={vs}>
            Share your prayer needs with us. Our prayer team will stand in agreement with you before the throne of grace.
          </p>
        </div>
      </section>

      <section className="bg-[#F3F4F6] px-4 md:px-[60px] lg:px-[120px] py-[48px] md:py-[72px] flex flex-col gap-[24px] items-center w-full">
        <div className="flex flex-col gap-[4px] items-center text-center">
          <h2 className="text-[#000080] text-[26px] md:text-[34px] font-bold" style={vs}>Submit a Prayer Request</h2>
          <p className="text-[#6B7280] text-[14px]" style={vs}>Fields marked * are required</p>
        </div>

        {status === "success" ? (
          <div className="flex flex-col gap-[16px] items-center max-w-[500px] text-center bg-white rounded-2xl p-10 shadow-sm">
            <div className="size-[72px] rounded-full bg-[#000080]/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#000080" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-[#000080] text-[22px] font-bold" style={vs}>Prayer Request Received!</p>
            <p className="text-[#6B7280] text-[15px]" style={vs}>
              We have received your prayer request. Our prayer team will be interceding on your behalf. God answers prayers!
            </p>
            <button onClick={() => setStatus("idle")} className="text-[#000080] text-[14px] font-medium hover:underline" style={vs}>
              Submit another request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-[16px] w-full max-w-[700px]">
            <FormCard title="Your Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Your Name" required>
                  <input type="text" required value={form.name} onChange={set("name")} className={inputCls} placeholder="Full name" />
                </FormField>
                <FormField label="Phone Number">
                  <input type="tel" value={form.phone} onChange={set("phone")} className={inputCls} placeholder="+234 800 000 0000" />
                </FormField>
              </div>
              <div className="mt-4">
                <FormField label="Email Address">
                  <input type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="your@email.com" />
                </FormField>
              </div>
            </FormCard>

            <FormCard title="Prayer Request">
              <div className="flex flex-col gap-4">
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
              <p className="text-red-500 text-[14px] text-center" style={vs}>{error}</p>
            )}
            <div className="flex justify-center">
              <button type="submit" disabled={status === "loading"} className="bg-[#000080] px-[40px] py-[16px] rounded-[33px] text-[#FFFDFD] text-[18px] md:text-[22px] font-medium hover:bg-[#0000a0] transition-colors disabled:opacity-60" style={vs}>
                {status === "loading" ? "Submitting..." : "SEND PRAYER REQUEST"}
              </button>
            </div>
          </form>
        )}
      </section>

      <Footer />
    </main>
  );
}
