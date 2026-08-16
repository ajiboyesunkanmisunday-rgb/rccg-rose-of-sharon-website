"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FormField, inputCls, wrapCls } from "@/components/ui/FormField";
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
      <section className="relative h-[500px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/assets/thanksgiving-bg.png" alt="" fill className="object-cover pointer-events-none" priority />
          <div className="absolute inset-0 bg-[rgba(16,14,26,0.72)]" />
        </div>
        <Navbar />
        <div className="absolute left-1/2 top-[calc(50%+48px)] -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[24px] items-center w-[1148px] z-10 text-center">
          <p className="text-[#B5B5F3] text-[16px] font-normal uppercase tracking-[0.15em]" style={vs}>Your Voice Matters</p>
          <h1 className="text-[#FFFDFD] text-[72px] font-medium leading-normal w-full" style={vs}>Share a Suggestion</h1>
          <p className="text-[#FFFDFD] text-[20px] font-normal leading-[32px] max-w-[800px]" style={vs}>
            We value your thoughts. Help us grow and serve you better — every suggestion is prayerfully considered.
          </p>
        </div>
      </section>

      <section className="bg-[#100E1A] px-[120px] py-[84px] flex flex-col gap-[32px] items-center w-full">
        <h2 className="text-[#FFFDFD] text-[48px] font-bold leading-normal text-center" style={vs}>
          Submit a Suggestion
        </h2>

        {status === "success" ? (
          <div className="flex flex-col gap-[16px] items-center max-w-[600px] text-center">
            <div className="size-[80px] rounded-full bg-[#000080] flex items-center justify-center text-[36px] text-white">✓</div>
            <p className="text-[#FFFDFD] text-[25px] font-medium" style={vs}>Thank You!</p>
            <p className="text-[#A3A1AF] text-[16px] font-normal" style={vs}>
              Your suggestion has been received. We appreciate your heart for the house of God.
            </p>
            <button
              onClick={() => { setStatus("idle"); setForm({ name: "", phone: "", email: "", area: "", suggestion: "" }); }}
              className="text-[#B5B5F3] text-[14px] hover:underline mt-[8px]"
              style={vs}
            >
              Submit another suggestion
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-[16px] items-center w-full max-w-[700px]">
            <div className="grid grid-cols-2 gap-[16px] w-full">
              <FormField label="Your Name" required>
                <div className={wrapCls}>
                  <input type="text" required value={form.name} onChange={set("name")} className={inputCls} placeholder="Full name" />
                </div>
              </FormField>
              <FormField label="Phone Number">
                <div className={wrapCls}>
                  <input type="tel" value={form.phone} onChange={set("phone")} className={inputCls} placeholder="+234 800 000 0000" />
                </div>
              </FormField>
            </div>

            <FormField label="Email Address">
              <div className={wrapCls}>
                <input type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="your@email.com" />
              </div>
            </FormField>

            <FormField label="Area of Suggestion" required>
              <div className={wrapCls}>
                <select required value={form.area} onChange={set("area")} className="w-full h-full px-3 bg-transparent text-[#100E1A] text-sm focus:outline-none rounded-[4px]">
                  <option value="">Select an area</option>
                  {suggestionAreas.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </FormField>

            <FormField label="Your Suggestion" required>
              <div className="bg-[#FFFDFD] border border-[#A3A1AF] rounded-[10px] w-full min-h-[160px]">
                <textarea
                  required
                  value={form.suggestion}
                  onChange={set("suggestion")}
                  className="w-full h-full min-h-[160px] px-3 py-2 bg-transparent text-[#100E1A] text-sm focus:outline-none rounded-[10px] resize-none"
                  placeholder="Share your suggestion or feedback..."
                />
              </div>
            </FormField>

            {status === "error" && (
              <p className="text-[#FF383C] text-[14px] font-normal text-center" style={vs}>{error}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-[#000080] drop-shadow-[19px_19px_20px_rgba(0,0,0,0.1)] px-[32px] py-[16px] rounded-[33px] text-[#FFFDFD] text-[25px] font-medium hover:bg-[#0000a0] transition-colors disabled:opacity-60"
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
