"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { post } from "@/lib/api";

const vs = { fontVariationSettings: '"wdth" 100' };

const celebrationTypes = [
  { value: "BIRTHDAY", label: "Birthday" },
  { value: "WEDDING", label: "Wedding Anniversary" },
  { value: "CHILD_DEDICATION", label: "Child Dedication" },
  { value: "FUNERAL", label: "Funeral / Remembrance" },
  { value: "OTHERS", label: "Others" },
];

export default function CelebrationsPage() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    type: "", date: "", notes: "",
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
      const contactInfo = [
        `Name: ${form.name}`,
        form.phone ? `Phone: ${form.phone}` : null,
        form.email ? `Email: ${form.email}` : null,
        form.notes ? `\nMessage: ${form.notes}` : null,
      ].filter(Boolean).join("\n");

      await post("/celebrations", {
        type: form.type,
        date: form.date,
        notes: contactInfo,
      });
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  const fieldCls = "bg-[#FFFDFD] border border-[#A3A1AF] h-[40px] rounded-[4px] w-full";
  const inputCls = "w-full h-full px-3 bg-transparent text-[#100E1A] text-sm focus:outline-none rounded-[4px]";
  const labelCls = "text-[#FFFDFD] text-[13px] font-normal leading-[14px]";

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[400px] md:h-[500px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/assets/thanksgiving-bg.png" alt="" fill className="object-cover pointer-events-none" priority />
          <div className="absolute inset-0 bg-[rgba(0,0,128,0.75)]" />
        </div>
        <Navbar />
        <div className="relative z-10 w-full max-w-[860px] px-6 mt-16 md:mt-[48px] flex flex-col gap-[16px] items-center text-center">
          <p className="text-[#B5B5F3] text-[16px] font-normal uppercase tracking-[0.15em]" style={vs}>Special Day</p>
          <h1 className="text-[#FFFDFD] text-[28px] md:text-[48px] lg:text-[72px] font-medium leading-tight w-full" style={vs}>Send Us Your Special Day</h1>
          <p className="text-[#FFFDFD] text-[16px] md:text-[20px] font-normal leading-[1.5] md:leading-[32px]" style={vs}>
            Let the church rejoice with you — birthdays, weddings, anniversaries and more.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="bg-[#100E1A] px-4 sm:px-[40px] lg:px-[80px] xl:px-[120px] py-[60px] md:py-[84px] flex flex-col gap-[32px] items-center w-full">
        <div className="flex items-center gap-[8px]">
          <Link href="/" className="text-[#B5B5F3] text-[16px] hover:underline" style={vs}>Home</Link>
          <span className="text-[#A3A1AF]">/</span>
          <span className="text-[#FFFDFD] text-[16px]" style={vs}>Special Thanksgiving</span>
        </div>
        <h2 className="text-[#FFFDFD] text-[28px] md:text-[40px] lg:text-[48px] font-bold text-center" style={vs}>Celebration Request</h2>
        <p className="text-[#A3A1AF] text-[20px] font-normal text-center max-w-[700px]" style={vs}>
          The church would love to celebrate and pray for you on your special day. Fill the form below and we&apos;ll make it extra special.
        </p>

        {status === "success" ? (
          <div className="flex flex-col gap-[24px] items-center max-w-[600px] text-center">
            <div className="size-[80px] rounded-full bg-[#000080] flex items-center justify-center text-[36px] text-white">🎉</div>
            <p className="text-[#FFFDFD] text-[25px] font-medium" style={vs}>Request Received!</p>
            <p className="text-[#A3A1AF] text-[16px]" style={vs}>
              We&apos;ve received your celebration request. The church family will celebrate and pray for you on your special day!
            </p>
            <Link href="/" className="text-[#B5B5F3] text-[16px] hover:underline" style={vs}>← Back to Home</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-[16px] w-full max-w-[700px]">

            {/* Contact */}
            <div className="border-b border-[#B5B5F3]/30 pb-[4px] mb-[4px]">
              <p className="text-[#B5B5F3] text-[13px] font-medium uppercase tracking-[0.12em]" style={vs}>Your Information</p>
            </div>

            <div className="flex flex-col gap-[4px] items-start w-full">
              <p className={labelCls} style={vs}>Full Name <span className="text-[#FF383C]">*</span></p>
              <div className={fieldCls}><input type="text" required value={form.name} onChange={set("name")} className={inputCls} /></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px] w-full">
              <div className="flex flex-col gap-[4px] items-start">
                <p className={labelCls} style={vs}>Phone Number <span className="text-[#FF383C]">*</span></p>
                <div className={fieldCls}><input type="tel" required value={form.phone} onChange={set("phone")} className={inputCls} /></div>
              </div>
              <div className="flex flex-col gap-[4px] items-start">
                <p className={labelCls} style={vs}>Email Address</p>
                <div className={fieldCls}><input type="email" value={form.email} onChange={set("email")} className={inputCls} /></div>
              </div>
            </div>

            {/* Celebration Details */}
            <div className="border-b border-[#B5B5F3]/30 pb-[4px] mb-[4px] mt-[8px]">
              <p className="text-[#B5B5F3] text-[13px] font-medium uppercase tracking-[0.12em]" style={vs}>Celebration Details</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px] w-full">
              <div className="flex flex-col gap-[4px] items-start">
                <p className={labelCls} style={vs}>Celebration Type <span className="text-[#FF383C]">*</span></p>
                <div className={fieldCls}>
                  <select required value={form.type} onChange={set("type")} className={inputCls}>
                    <option value="">Select type</option>
                    {celebrationTypes.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-[4px] items-start">
                <p className={labelCls} style={vs}>Date of Celebration <span className="text-[#FF383C]">*</span></p>
                <div className={fieldCls}><input type="date" required value={form.date} onChange={set("date")} className={inputCls} /></div>
              </div>
            </div>

            <div className="flex flex-col gap-[4px] items-start w-full">
              <p className={labelCls} style={vs}>Additional Message</p>
              <div className="bg-[#FFFDFD] border border-[#A3A1AF] h-[120px] rounded-[10px] w-full">
                <textarea value={form.notes} onChange={set("notes")}
                  placeholder="Any special requests or things you would like the church to know..."
                  className="w-full h-full px-3 py-2 bg-transparent text-[#100E1A] text-sm focus:outline-none rounded-[10px] resize-none" />
              </div>
            </div>

            {status === "error" && (
              <p className="text-[#FF383C] text-[14px] text-center" style={vs}>{error}</p>
            )}

            <div className="flex justify-center mt-[8px]">
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex items-center gap-[8px] bg-[#000080] px-[32px] py-[16px] rounded-[33px] text-[#FFFDFD] text-[25px] font-medium hover:bg-[#0000a0] transition-colors disabled:opacity-60"
                style={vs}
              >
                {status === "loading" ? "SUBMITTING..." : "SEND US YOUR SPECIAL DAY"}
              </button>
            </div>
          </form>
        )}
      </section>
      <Footer />
    </main>
  );
}
