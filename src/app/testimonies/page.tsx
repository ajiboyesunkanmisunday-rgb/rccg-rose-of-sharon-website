"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { post } from "@/lib/api";

const testimonies = [
  { name: "Brother David", role: "Member", img: "/assets/podcast-1.png", quote: "God turned my situation around completely. I was at my lowest point but His grace found me." },
  { name: "Sister Grace", role: "Member", img: "/assets/podcast-2.png", quote: "The healing power of God is real. I witnessed it firsthand in my family." },
  { name: "Brother James", role: "Member", img: "/assets/podcast-3.png", quote: "From nothing to abundance — only God could have done this in my life." },
  { name: "Sister Mercy", role: "Member", img: "/assets/podcast-4.png", quote: "I received my long-awaited miracle after years of waiting on the Lord." },
  { name: "Brother Paul", role: "Member", img: "/assets/podcast-5.png", quote: "His faithfulness endures forever. My testimony is a testament to His love." },
  { name: "Sister Ruth", role: "Member", img: "/assets/podcast-6.png", quote: "God opened doors that no man could open. I am forever grateful." },
  { name: "Brother Samuel", role: "Member", img: "/assets/podcast-7.png", quote: "What seemed impossible became possible through the power of prayer." },
  { name: "Sister Esther", role: "Member", img: "/assets/podcast-8.png", quote: "God restored my marriage and brought peace to my home. To Him be glory!" },
];

const vs = { fontVariationSettings: '"wdth" 100' };

export default function TestimoniesPage() {
  const [form, setForm] = useState({
    name: "", subject: "", testimony: "",
    state: "", country: "Nigeria", rosTVStory: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      await post("/testimonies", {
        subject: form.subject,
        content: `From: ${form.name}\n\n${form.testimony}`,
        state: form.state || undefined,
        country: form.country || undefined,
        rosTVStory: form.rosTVStory,
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
      <section className="relative h-[735px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/assets/hero-bg.png" alt="" fill className="object-cover pointer-events-none" priority />
          <div className="absolute inset-0 bg-[rgba(16,14,26,0.65)]" />
        </div>
        <Navbar activePage="testimonies" />
        <div className="absolute left-1/2 top-[calc(50%+58px)] -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[84px] items-center justify-center w-[1148px] z-10">
          <div className="flex flex-col gap-[32px] items-start w-full text-center text-white">
            <h1
              className="text-[#FFFDFD] text-[84px] font-medium leading-normal w-full"
              style={{ fontVariationSettings: '"wdth" 100' }}
            >
              Amazing Evidences
            </h1>
            <p
              className="text-[#FFFDFD] text-[25px] font-normal leading-[32px] w-full"
              style={{ fontVariationSettings: '"wdth" 100' }}
            >
              Real stories of God&apos;s faithfulness — lives transformed by the power of the Holy Spirit.
            </p>
          </div>
          <Link
            href="#share"
            className="flex items-center gap-[5px] px-[32px] py-[16px] bg-[#000080] text-[#FFFDFD] text-[25px] font-medium rounded-[35px] drop-shadow-[19px_19px_20px_rgba(0,0,0,0.1)] hover:bg-[#0000a0] transition-colors"
            style={{ fontVariationSettings: '"wdth" 100' }}
          >
            Share Your Testimony
          </Link>
        </div>
      </section>

      {/* Featured Testimony */}
      <section className="relative h-[510px] w-full overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <Image src="/assets/thanksgiving-bg.png" alt="" fill className="object-cover pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000080] from-[39.9%] to-[rgba(255,255,255,0)] to-[75.5%]" />
        </div>
        <div className="relative z-10 flex flex-col gap-[24px] items-start px-[120px] w-[760px]">
          <p className="text-[#B5B5F3] text-[16px] font-normal uppercase tracking-[0.15em]" style={{ fontVariationSettings: '"wdth" 100' }}>
            Featured Testimony
          </p>
          <h2
            className="text-[#FFFDFD] text-[48px] font-bold leading-[1.2]"
            style={{ fontVariationSettings: '"wdth" 100' }}
          >
            God&apos;s Grace is Sufficient
          </h2>
          <p
            className="text-[#FFFDFD] text-[20px] font-normal leading-[1.6] italic"
            style={{ fontVariationSettings: '"wdth" 100' }}
          >
            &ldquo;I came to this church broken and without hope. Today I stand as a living witness
            that God restores, heals and renews. His faithfulness has no end.&rdquo;
          </p>
          <p className="text-[#B5B5F3] text-[16px] font-medium" style={{ fontVariationSettings: '"wdth" 100' }}>
            — Bro. Emmanuel Okafor, Member since 2019
          </p>
        </div>
      </section>

      {/* Testimonies Grid */}
      <section className="bg-[#D2D2E2] px-[120px] py-[84px] flex flex-col gap-[32px] items-center w-full">
        <h2
          className="text-[#100E1A] text-[48px] font-bold leading-normal text-center w-full"
          style={{ fontVariationSettings: '"wdth" 100' }}
        >
          More Testimonies
        </h2>

        <div
          className="grid gap-[20px] w-full"
          style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
        >
          {testimonies.map((person, i) => (
            <div key={i} className="bg-white rounded-[16px] flex flex-col gap-[16px] p-[20px] shadow-[0px_4px_20px_rgba(0,0,0,0.08)]">
              <div className="flex items-center gap-[12px]">
                <div className="size-[60px] rounded-full overflow-hidden relative flex-shrink-0">
                  <Image src={person.img} alt={person.name} fill className="object-cover" />
                </div>
                <div>
                  <p
                    className="text-[#100E1A] text-[16px] font-bold leading-normal"
                    style={{ fontVariationSettings: '"wdth" 100' }}
                  >
                    {person.name}
                  </p>
                  <p className="text-[#A3A1AF] text-[13px] font-normal" style={{ fontVariationSettings: '"wdth" 100' }}>
                    {person.role}
                  </p>
                </div>
              </div>
              <p
                className="text-[#100E1A] text-[15px] font-normal leading-[1.6] italic"
                style={{ fontVariationSettings: '"wdth" 100' }}
              >
                &ldquo;{person.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Share Your Testimony */}
      <section id="share" className="bg-[#100E1A] px-[120px] py-[84px] flex flex-col gap-[32px] items-center w-full">
        <h2 className="text-[#FFFDFD] text-[48px] font-bold leading-normal text-center" style={vs}>
          Share Your Testimony
        </h2>

        <div className="relative size-[54px] flex-shrink-0">
          <Image src="/assets/icon-watch.svg" alt="" fill />
        </div>

        {status === "success" ? (
          <div className="flex flex-col gap-[24px] items-center max-w-[600px] text-center">
            <div className="size-[80px] rounded-full bg-[#000080] flex items-center justify-center text-[36px] text-white">✓</div>
            <p className="text-[#FFFDFD] text-[25px] font-medium" style={vs}>Thank You!</p>
            <p className="text-[#A3A1AF] text-[16px]" style={vs}>Your testimony has been received. May God continue to bless you.</p>
            <button
              onClick={() => setStatus("idle")}
              className="text-[#B5B5F3] text-[16px] hover:underline"
              style={vs}
            >
              Share another testimony
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-[16px] items-center w-full max-w-[600px]">
            <div className="flex flex-col gap-[4px] items-start w-full">
              <p className="text-[#FFFDFD] text-[13px] font-normal leading-[14px]" style={vs}>
                Name <span className="text-[#FF383C]">*</span>
              </p>
              <div className="bg-[#FFFDFD] border border-[#A3A1AF] h-[40px] rounded-[4px] w-full">
                <input type="text" required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full h-full px-3 bg-transparent text-[#100E1A] text-sm focus:outline-none rounded-[4px]" />
              </div>
            </div>

            <div className="flex flex-col gap-[4px] items-start w-full">
              <p className="text-[#FFFDFD] text-[13px] font-normal leading-[14px]" style={vs}>
                Subject <span className="text-[#FF383C]">*</span>
              </p>
              <div className="bg-[#FFFDFD] border border-[#A3A1AF] h-[40px] rounded-[4px] w-full">
                <input type="text" required value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full h-full px-3 bg-transparent text-[#100E1A] text-sm focus:outline-none rounded-[4px]" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-[12px] w-full">
              <div className="flex flex-col gap-[4px] items-start">
                <p className="text-[#FFFDFD] text-[13px] font-normal leading-[14px]" style={vs}>State</p>
                <div className="bg-[#FFFDFD] border border-[#A3A1AF] h-[40px] rounded-[4px] w-full">
                  <input type="text" value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className="w-full h-full px-3 bg-transparent text-[#100E1A] text-sm focus:outline-none rounded-[4px]" />
                </div>
              </div>
              <div className="flex flex-col gap-[4px] items-start">
                <p className="text-[#FFFDFD] text-[13px] font-normal leading-[14px]" style={vs}>Country</p>
                <div className="bg-[#FFFDFD] border border-[#A3A1AF] h-[40px] rounded-[4px] w-full">
                  <input type="text" value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    className="w-full h-full px-3 bg-transparent text-[#100E1A] text-sm focus:outline-none rounded-[4px]" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[4px] items-start w-full">
              <p className="text-[#FFFDFD] text-[13px] font-normal leading-[14px]" style={vs}>
                Your Testimony <span className="text-[#FF383C]">*</span>
              </p>
              <div className="bg-[#FFFDFD] border border-[#A3A1AF] h-[160px] rounded-[10px] w-full">
                <textarea required value={form.testimony}
                  onChange={(e) => setForm({ ...form, testimony: e.target.value })}
                  className="w-full h-full px-3 py-2 bg-transparent text-[#100E1A] text-sm focus:outline-none rounded-[10px] resize-none"
                  placeholder="Share what God has done for you..." />
              </div>
            </div>

            <label className="flex items-center gap-[10px] w-full cursor-pointer">
              <input type="checkbox" checked={form.rosTVStory}
                onChange={(e) => setForm({ ...form, rosTVStory: e.target.checked })}
                className="size-[16px] accent-[#000080]" />
              <span className="text-[#A3A1AF] text-[14px] font-normal" style={vs}>
                I would like this testimony shared on ROS TV
              </span>
            </label>

            {status === "error" && (
              <p className="text-[#FF383C] text-[14px] text-center w-full" style={vs}>{error}</p>
            )}

            <div className="bg-[#000080] drop-shadow-[19px_19px_20px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center px-[32px] py-[16px] rounded-[33px] flex-shrink-0 hover:bg-[#0000a0] transition-colors">
              <button type="submit" disabled={status === "loading"} className="flex items-center disabled:opacity-60">
                <span className="text-[#FFFDFD] text-[25px] font-medium leading-normal text-center whitespace-nowrap" style={vs}>
                  {status === "loading" ? "SUBMITTING..." : "SUBMIT"}
                </span>
              </button>
            </div>
          </form>
        )}
      </section>

      <Footer />
    </main>
  );
}
