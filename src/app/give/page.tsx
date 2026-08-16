"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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

  const fieldCls = "bg-[#FFFDFD] border border-[#A3A1AF] h-[40px] rounded-[4px] w-full";
  const inputCls = "w-full h-full px-3 bg-transparent text-[#100E1A] text-sm focus:outline-none rounded-[4px]";
  const labelCls = "text-[#FFFDFD] text-[13px] font-normal leading-[14px]";

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[560px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/assets/give-bg.png" alt="" fill className="object-cover pointer-events-none" priority />
          <div className="absolute inset-0 bg-[rgba(0,0,128,0.80)]" />
        </div>
        <Navbar />
        <div className="absolute left-1/2 top-[calc(50%+48px)] -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[24px] items-center w-[1148px] z-10 text-center">
          <p className="text-[#B5B5F3] text-[16px] font-normal uppercase tracking-[0.15em]" style={vs}>Worship Through Giving</p>
          <h1 className="text-[#FFFDFD] text-[72px] font-medium leading-normal w-full" style={vs}>Give Online</h1>
          <p className="text-[#FFFDFD] text-[20px] font-normal leading-[32px] max-w-[800px]" style={vs}>
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
      <section className="bg-[#D2D2E2] px-[120px] py-[84px] flex gap-[64px] items-start w-full">
        {/* Giving Notification Form */}
        <div className="flex-1 min-w-0 bg-[#100E1A] rounded-[24px] px-[48px] py-[48px] flex flex-col gap-[24px]">
          <h2 className="text-[#FFFDFD] text-[32px] font-bold leading-normal" style={vs}>
            Giving Notification
          </h2>
          <p className="text-[#A3A1AF] text-[15px] font-normal leading-[1.6]" style={vs}>
            Made a transfer? Let the church know so we can record it and pray with you.
          </p>

          {status === "success" ? (
            <div className="flex flex-col gap-[16px] items-center py-[24px] text-center">
              <div className="size-[64px] rounded-full bg-[#000080] flex items-center justify-center text-[28px] text-white">✓</div>
              <p className="text-[#FFFDFD] text-[20px] font-medium" style={vs}>Thank You!</p>
              <p className="text-[#A3A1AF] text-[15px]" style={vs}>
                Your giving notification has been received. God bless you richly!
              </p>
              <Link href="/testimonies#share" className="text-[#B5B5F3] text-[14px] hover:underline" style={vs}>
                Share your testimony →
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-[14px]">
              <div className="flex flex-col gap-[4px]">
                <p className={labelCls} style={vs}>Full Name <span className="text-[#FF383C]">*</span></p>
                <div className={fieldCls}><input type="text" required value={form.name} onChange={set("name")} className={inputCls} /></div>
              </div>
              <div className="flex flex-col gap-[4px]">
                <p className={labelCls} style={vs}>Phone Number <span className="text-[#FF383C]">*</span></p>
                <div className={fieldCls}><input type="tel" required value={form.phone} onChange={set("phone")} className={inputCls} /></div>
              </div>
              <div className="flex flex-col gap-[4px]">
                <p className={labelCls} style={vs}>Giving Category <span className="text-[#FF383C]">*</span></p>
                <div className={fieldCls}>
                  <select required value={form.category} onChange={set("category")} className={inputCls}>
                    <option value="">Select category</option>
                    {givingCategories.map((g) => <option key={g.label} value={g.label}>{g.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-[4px]">
                <p className={labelCls} style={vs}>Amount (₦)</p>
                <div className={fieldCls}><input type="number" min={0} value={form.amount} onChange={set("amount")} className={inputCls} placeholder="Optional" /></div>
              </div>
              <div className="flex flex-col gap-[4px]">
                <p className={labelCls} style={vs}>Additional Note</p>
                <div className="bg-[#FFFDFD] border border-[#A3A1AF] h-[80px] rounded-[10px] w-full">
                  <textarea value={form.note} onChange={set("note")} className="w-full h-full px-3 py-2 bg-transparent text-[#100E1A] text-sm focus:outline-none rounded-[10px] resize-none" />
                </div>
              </div>
              {status === "error" && <p className="text-[#FF383C] text-[13px]" style={vs}>{error}</p>}
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-[#000080] px-[32px] py-[14px] rounded-[33px] text-[#FFFDFD] text-[18px] font-medium hover:bg-[#0000a0] transition-colors disabled:opacity-60 mt-[8px]"
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
