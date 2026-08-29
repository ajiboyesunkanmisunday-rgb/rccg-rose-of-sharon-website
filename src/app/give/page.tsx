"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FormField, FormCard, inputCls, selectCls, textareaCls } from "@/components/ui/FormField";
import { post } from "@/lib/api";

const vs = { fontVariationSettings: '"wdth" 100' };

const givingCategories = [
  {
    label: "Tithe",
    icon: "📖",
    desc: "Returning 10% of your income to God — a covenant act of worship and trust.",
    colour: "bg-[#000080]",
  },
  {
    label: "First Fruit",
    icon: "🌾",
    desc: "Honouring God with the first and best of your increase at the start of each year.",
    colour: "bg-[#3D0080]",
  },
  {
    label: "Offering",
    icon: "🙏",
    desc: "A freewill gift of worship given beyond your tithe, from a grateful heart.",
    colour: "bg-[#004080]",
  },
  {
    label: "Building Fund",
    icon: "🏛️",
    desc: "Contributing to the physical growth and maintenance of the house of God.",
    colour: "bg-[#006040]",
  },
  {
    label: "Mission & Outreach",
    icon: "🌍",
    desc: "Supporting the spread of the Gospel and reaching the unreached in our community.",
    colour: "bg-[#800040]",
  },
  {
    label: "Special Seed",
    icon: "🌱",
    desc: "Planting a specific seed of faith in expectation of a particular harvest from God.",
    colour: "bg-[#404000]",
  },
];

export default function GivePage() {
  const [form, setForm] = useState({ name: "", phone: "", category: "", amount: "", note: "" });
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
        `Phone: ${form.phone}`,
        `Category: ${form.category}`,
        form.amount ? `Amount: ₦${form.amount}` : null,
        form.note ? `Note: ${form.note}` : null,
      ].filter(Boolean).join("\n");
      await post("/requests/suggestion", {
        subject: `Giving Notification — ${form.category}`,
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
      {/* Hero */}
      <section className="relative min-h-[380px] md:h-[460px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/assets/give-bg.png" alt="" fill className="object-cover pointer-events-none" priority />
          <div className="absolute inset-0 bg-[rgba(0,0,128,0.80)]" />
        </div>
        <Navbar />
        <div className="relative z-10 w-full max-w-[900px] px-6 mt-16 md:mt-[48px] flex flex-col gap-[24px] items-center text-center">
          <p className="text-[#B5B5F3] text-[16px] font-normal uppercase tracking-[0.15em]" style={vs}>Worship Through Giving</p>
          <h1 className="text-[#FFFDFD] text-[36px] md:text-[56px] lg:text-[68px] font-medium leading-normal w-full" style={vs}>Give Online</h1>
          <p className="text-[#FFFDFD] text-[16px] md:text-[18px] font-normal leading-[32px] max-w-[800px]" style={vs}>
            &ldquo;Bring all the tithes into the storehouse&rdquo; — Malachi 3:10. Giving is an act of worship and partnership with God&apos;s agenda.
          </p>
        </div>
      </section>

      {/* Giving Categories */}
      <section className="bg-[#100E1A] px-[120px] py-[84px] flex flex-col gap-[48px] items-center w-full">
        <div className="flex flex-col gap-[8px] items-center text-center">
          <p className="text-[#B5B5F3] text-[16px] font-normal uppercase tracking-[0.15em]" style={vs}>Ways to Give</p>
          <h2 className="text-[#FFFDFD] text-[48px] font-bold leading-normal" style={vs}>Giving Categories</h2>
        </div>
        <div className="grid gap-[20px] w-full" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {givingCategories.map((g) => (
            <div key={g.label} className="bg-[#1a1826] rounded-[16px] p-[24px] flex flex-col gap-[12px] border border-[#B5B5F3]/10 hover:border-[#B5B5F3]/25 transition-colors">
              <div className={`size-[48px] rounded-[12px] ${g.colour} flex items-center justify-center text-[22px] flex-shrink-0`}>
                {g.icon}
              </div>
              <p className="text-[#FFFDFD] text-[20px] font-bold leading-normal" style={vs}>{g.label}</p>
              <p className="text-[#A3A1AF] text-[14px] font-normal leading-[1.7]" style={vs}>{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Give Now form + bank details */}
      <section className="bg-[#F3F4F6] px-4 md:px-[60px] lg:px-[120px] py-[84px] flex flex-col lg:flex-row gap-[64px] items-start w-full">
        {/* Giving Notification Form */}
        <div className="flex-1 min-w-0 flex flex-col gap-[24px]">
          <div>
            <h2 className="text-[#000080] text-[32px] font-bold leading-normal" style={vs}>
              Giving Notification
            </h2>
            <p className="text-[#6B7280] text-[15px] font-normal leading-[1.6] mt-[8px]" style={vs}>
              Made a transfer? Let the church know so we can record it and pray with you.
            </p>
          </div>

          {status === "success" ? (
            <div className="bg-white rounded-2xl p-10 shadow-sm flex flex-col gap-[16px] items-center text-center">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="32" fill="#16A34A" fillOpacity="0.12" />
                <circle cx="32" cy="32" r="24" fill="#16A34A" fillOpacity="0.2" />
                <path d="M20 32L28 40L44 24" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-[#111827] text-[20px] font-medium" style={vs}>Thank You!</p>
              <p className="text-[#6B7280] text-[15px]" style={vs}>
                Your giving notification has been received. God bless you richly!
              </p>
              <Link href="/testimonies#share" className="text-[#000080] text-[14px] hover:underline" style={vs}>
                Share your testimony →
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">
              <FormCard>
                <div className="flex flex-col gap-[14px]">
                  <FormField label="Full Name" required>
                    <input type="text" required value={form.name} onChange={set("name")} className={inputCls} />
                  </FormField>
                  <FormField label="Phone Number" required>
                    <input type="tel" required value={form.phone} onChange={set("phone")} className={inputCls} />
                  </FormField>
                  <FormField label="Giving Category" required>
                    <select required value={form.category} onChange={set("category")} className={selectCls}>
                      <option value="">Select category</option>
                      {givingCategories.map((g) => <option key={g.label} value={g.label}>{g.label}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Amount (₦)">
                    <input type="number" min={0} value={form.amount} onChange={set("amount")} className={inputCls} placeholder="Optional" />
                  </FormField>
                  <FormField label="Additional Note">
                    <textarea value={form.note} onChange={set("note")} className={textareaCls} rows={3} />
                  </FormField>
                </div>
              </FormCard>

              {status === "error" && <p className="text-[#FF383C] text-[13px]" style={vs}>{error}</p>}
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-[#000080] px-[40px] py-[16px] rounded-[33px] text-[#FFFDFD] text-[18px] md:text-[22px] font-medium hover:bg-[#0000a0] transition-colors disabled:opacity-60 mt-[8px]"
                style={vs}
              >
                {status === "loading" ? "Submitting..." : "NOTIFY THE CHURCH"}
              </button>
            </form>
          )}
        </div>

        {/* Bank Details */}
        <div className="flex-1 min-w-0 flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[8px]">
            <p className="text-[#000080] text-[16px] font-normal uppercase tracking-[0.15em]" style={vs}>Bank Transfer</p>
            <h2 className="text-[#100E1A] text-[36px] font-bold leading-normal" style={vs}>Account Details</h2>
            <p className="text-[#A3A1AF] text-[15px] font-normal leading-[1.7]" style={vs}>
              Transfer directly to the church account and use the notification form to let us know.
            </p>
          </div>

          <div className="flex flex-col gap-[16px]">
            {[
              { label: "Account Name", value: "RCCG Rose of Sharon" },
              { label: "Account Number", value: "Contact the church for account details" },
              { label: "Bank", value: "Contact the church for bank details" },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-[12px] p-[20px] flex flex-col gap-[4px] shadow-[0px_2px_12px_rgba(0,0,0,0.06)]">
                <p className="text-[#A3A1AF] text-[13px] font-normal uppercase tracking-wider" style={vs}>{item.label}</p>
                <p className="text-[#100E1A] text-[18px] font-bold" style={vs}>{item.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#000080]/10 border border-[#000080]/20 rounded-[12px] p-[20px]">
            <p className="text-[#100E1A] text-[14px] font-normal leading-[1.7]" style={vs}>
              <span className="font-bold">Need account details?</span> Contact us via the{" "}
              <Link href="/requests/counseling" className="text-[#000080] hover:underline">CSR form</Link>{" "}
              or reach us directly on our social media channels.
            </p>
          </div>

          <div className="flex flex-col gap-[12px]">
            <p className="text-[#100E1A] text-[15px] font-medium" style={vs}>Connect with us</p>
            <div className="flex gap-[12px]">
              <a href="https://www.instagram.com/rccgros/?hl=en" target="_blank" rel="noopener noreferrer"
                className="px-[16px] py-[8px] bg-[#8A38F5] text-white text-[14px] font-medium rounded-full hover:opacity-80 transition-opacity" style={vs}>
                Instagram
              </a>
              <a href="https://www.facebook.com/rccgrospage/" target="_blank" rel="noopener noreferrer"
                className="px-[16px] py-[8px] bg-[#3B5998] text-white text-[14px] font-medium rounded-full hover:opacity-80 transition-opacity" style={vs}>
                Facebook
              </a>
              <a href="https://www.youtube.com/@rccgrostv" target="_blank" rel="noopener noreferrer"
                className="px-[16px] py-[8px] bg-[#0000BA] text-white text-[14px] font-medium rounded-full hover:opacity-80 transition-opacity" style={vs}>
                YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Scripture */}
      <section className="bg-[#100E1A] px-[120px] py-[64px] flex flex-col gap-[16px] items-center w-full text-center">
        <p className="text-[#FFFDFD] text-[28px] font-normal italic leading-[1.6] max-w-[800px]" style={{ fontFamily: "'Playfair Display', serif" }}>
          &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.&rdquo;
        </p>
        <p className="text-[#B5B5F3] text-[16px] font-medium uppercase tracking-wider" style={vs}>2 Corinthians 9:7</p>
      </section>

      <Footer />
    </main>
  );
}
