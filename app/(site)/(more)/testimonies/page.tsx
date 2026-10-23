"use client";

import { Hero } from "@/app/(site)/(more)/_kit/ui";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FormField, FormCard, inputCls, textareaCls } from "@/app/(site)/(more)/_kit/form";
import { post, API_BASE } from "@/lib/api";

interface TestimonyItem {
  id: string;
  subject: string;
  content: string;
  owner?: { firstName?: string; lastName?: string };
  state?: string;
  country?: string;
  createdOn?: string;
}

const fallbackTestimonies = [
  { name: "Brother David", img: "/assets/podcast-1.png", quote: "God turned my situation around completely. I was at my lowest point but His grace found me." },
  { name: "Sister Grace", img: "/assets/podcast-2.png", quote: "The healing power of God is real. I witnessed it firsthand in my family." },
  { name: "Brother James", img: "/assets/podcast-3.png", quote: "From nothing to abundance — only God could have done this in my life." },
  { name: "Sister Mercy", img: "/assets/podcast-4.png", quote: "I received my long-awaited miracle after years of waiting on the Lord." },
  { name: "Brother Paul", img: "/assets/podcast-5.png", quote: "His faithfulness endures forever. My testimony is a testament to His love." },
  { name: "Sister Ruth", img: "/assets/podcast-6.png", quote: "God opened doors that no man could open. I am forever grateful." },
  { name: "Brother Samuel", img: "/assets/podcast-7.png", quote: "What seemed impossible became possible through the power of prayer." },
  { name: "Sister Esther", img: "/assets/podcast-8.png", quote: "God restored my marriage and brought peace to my home. To Him be glory!" },
];

const avatarImgs = [
  "/assets/podcast-1.png", "/assets/podcast-2.png", "/assets/podcast-3.png",
  "/assets/podcast-4.png", "/assets/podcast-5.png", "/assets/podcast-6.png",
  "/assets/podcast-7.png", "/assets/podcast-8.png",
];


export default function TestimoniesPage() {
  const [liveTestimonies, setLiveTestimonies] = useState<TestimonyItem[]>([]);
  const [loadingTestimonies, setLoadingTestimonies] = useState(true);

  const [form, setForm] = useState({
    name: "", subject: "", testimony: "",
    state: "", country: "Nigeria", rosTVStory: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/testimonies/featured?pageSize=8`)
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.content ?? [];
        setLiveTestimonies(list);
      })
      .catch(() => {})
      .finally(() => setLoadingTestimonies(false));
  }, []);

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
    <div>
      <Hero pill="🌍 RCCG ROSE OF SHARON" title={<>Amazing <span className="text-textRed">Evidences</span></>} subtitle="Real stories of God's faithfulness — lives transformed by the power of the Holy Spirit." bg="/assets/hero-bg.png" />

      {/* Featured Testimony */}
      <section className="ros:relative ros:h-[510px] ros:w-full ros:overflow-hidden ros:flex ros:items-center">
        <div className="ros:absolute ros:inset-0">
          <Image src="/assets/thanksgiving-bg.png" alt="" fill className="ros:object-cover ros:pointer-events-none" />
          <div className="ros:absolute ros:inset-0 ros:bg-gradient-to-r ros:from-[#DF4E4E] ros:from-[39.9%] ros:to-[rgba(255,255,255,0)] ros:to-[75.5%]" />
        </div>
        <div className="ros:relative ros:z-10 ros:flex ros:flex-col ros:gap-[24px] ros:items-start ros:px-[120px] ros:w-[760px]">
          <p className="ros:text-[#FFFFFFB3] ros:text-[16px] ros:font-normal ros:uppercase ros:tracking-[0.15em]" style={{ fontVariationSettings: '"wdth" 100' }}>
            Featured Testimony
          </p>
          <h2
            className="ros:text-[#FFFDFD] ros:text-[48px] ros:font-bold ros:leading-[1.2]"
            style={{ fontVariationSettings: '"wdth" 100' }}
          >
            God&apos;s Grace is Sufficient
          </h2>
          <p
            className="ros:text-[#FFFDFD] ros:text-[20px] ros:font-normal ros:leading-[1.6] ros:italic"
            style={{ fontVariationSettings: '"wdth" 100' }}
          >
            &ldquo;I came to this church broken and without hope. Today I stand as a living witness
            that God restores, heals and renews. His faithfulness has no end.&rdquo;
          </p>
          <p className="ros:text-[#FFFFFFB3] ros:text-[16px] ros:font-medium" style={{ fontVariationSettings: '"wdth" 100' }}>
            — Bro. Emmanuel Okafor, Member since 2019
          </p>
        </div>
      </section>

      {/* Testimonies Grid */}
      <section className="ros:bg-[#F4F4F4] ros:px-[120px] ros:py-[84px] ros:flex ros:flex-col ros:gap-[32px] ros:items-center ros:w-full">
        <h2
          className="ros:text-[#000000] ros:text-[48px] ros:font-bold ros:leading-normal ros:text-center ros:w-full"
         
        >
          {liveTestimonies.length > 0 ? "Featured Testimonies" : "More Testimonies"}
        </h2>

        {loadingTestimonies && (
          <div className="ros:grid ros:gap-[20px] ros:w-full" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {[1,2,3,4].map((i) => (
              <div key={i} className="ros:bg-white ros:rounded-[16px] ros:h-[160px] ros:animate-pulse" />
            ))}
          </div>
        )}

        {!loadingTestimonies && (
          <div className="ros:grid ros:gap-[20px] ros:w-full" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {liveTestimonies.length > 0
              ? liveTestimonies.map((t, i) => {
                  const ownerName = t.owner
                    ? `${t.owner.firstName ?? ""} ${t.owner.lastName ?? ""}`.trim()
                    : "Church Member";
                  const lines = t.content.split("\n").filter(Boolean);
                  const quote = lines.length > 1 ? lines.slice(1).join(" ") : t.content;
                  return (
                    <div key={t.id} className="ros:bg-white ros:rounded-[16px] ros:flex ros:flex-col ros:gap-[16px] ros:p-[20px] ros:shadow-[0px_4px_20px_rgba(0,0,0,0.08)]">
                      <div className="ros:flex ros:items-center ros:gap-[12px]">
                        <div className="ros:size-[60px] ros:rounded-full ros:overflow-hidden ros:relative ros:flex-shrink-0 ros:bg-[#DF4E4E] ros:flex ros:items-center ros:justify-center">
                          <span className="ros:text-white ros:text-[22px] ros:font-bold">
                            {ownerName.charAt(0) || "M"}
                          </span>
                        </div>
                        <div>
                          <p className="ros:text-[#000000] ros:text-[16px] ros:font-bold ros:leading-normal">
                            {ownerName || "Anonymous"}
                          </p>
                          {(t.state || t.country) && (
                            <p className="ros:text-[#A3A1AF] ros:text-[13px] ros:font-normal">
                              {[t.state, t.country].filter(Boolean).join(", ")}
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="ros:text-[#000000] ros:text-[14px] ros:font-normal ros:leading-[1.6] ros:italic ros:line-clamp-4">
                        &ldquo;{t.subject ? `${t.subject} — ` : ""}{quote}&rdquo;
                      </p>
                    </div>
                  );
                })
              : fallbackTestimonies.map((person, i) => (
                  <div key={i} className="ros:bg-white ros:rounded-[16px] ros:flex ros:flex-col ros:gap-[16px] ros:p-[20px] ros:shadow-[0px_4px_20px_rgba(0,0,0,0.08)]">
                    <div className="ros:flex ros:items-center ros:gap-[12px]">
                      <div className="ros:size-[60px] ros:rounded-full ros:overflow-hidden ros:relative ros:flex-shrink-0">
                        <Image src={avatarImgs[i % avatarImgs.length]} alt={person.name} fill className="ros:object-cover" />
                      </div>
                      <div>
                        <p className="ros:text-[#000000] ros:text-[16px] ros:font-bold ros:leading-normal">{person.name}</p>
                        <p className="ros:text-[#A3A1AF] ros:text-[13px] ros:font-normal">Member</p>
                      </div>
                    </div>
                    <p className="ros:text-[#000000] ros:text-[15px] ros:font-normal ros:leading-[1.6] ros:italic">
                      &ldquo;{person.quote}&rdquo;
                    </p>
                  </div>
                ))
            }
          </div>
        )}
      </section>

      {/* Share Your Testimony */}
      <section id="share" className="ros:bg-[#F3F4F6] ros:px-4 ros:md:px-[60px] ros:lg:px-[120px] ros:py-[84px] ros:flex ros:flex-col ros:gap-[32px] ros:items-center ros:w-full">
        <h2 className="ros-anton ros:uppercase ros:text-[#DF4E4E] ros:text-[48px] ros:leading-normal ros:text-center">
          Share Your Testimony
        </h2>

        <div className="ros:relative ros:size-[54px] ros:flex-shrink-0">
          <Image src="/assets/icon-watch.svg" alt="" fill />
        </div>

        {status === "success" ? (
          <div className="ros:bg-white ros:rounded-2xl ros:p-10 ros:shadow-sm ros:flex ros:flex-col ros:gap-[24px] ros:items-center ros:max-w-[600px] ros:text-center">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="32" fill="#16A34A" fillOpacity="0.12" />
              <circle cx="32" cy="32" r="24" fill="#16A34A" fillOpacity="0.2" />
              <path d="M20 32L28 40L44 24" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="ros:text-[#111827] ros:text-[25px] ros:font-medium">Thank You!</p>
            <p className="ros:text-[#6B7280] ros:text-[16px]">Your testimony has been received. May God continue to bless you.</p>
            <button
              onClick={() => setStatus("idle")}
              className="ros:text-[#DF4E4E] ros:text-[16px] ros:hover:underline"
             
            >
              Share another testimony
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="ros:flex ros:flex-col ros:gap-[16px] ros:items-center ros:w-full ros:max-w-[600px]">
            <FormCard title="Your Details">
              <div className="ros:flex ros:flex-col ros:gap-[16px]">
                <FormField label="Name" required>
                  <input type="text" required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputCls} />
                </FormField>
                <FormField label="Subject" required>
                  <input type="text" required value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className={inputCls} />
                </FormField>
                <div className="ros:grid ros:grid-cols-2 ros:gap-[12px]">
                  <FormField label="State">
                    <input type="text" value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                      className={inputCls} />
                  </FormField>
                  <FormField label="Country">
                    <input type="text" value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                      className={inputCls} />
                  </FormField>
                </div>
              </div>
            </FormCard>

            <FormCard title="Your Testimony">
              <div className="ros:flex ros:flex-col ros:gap-[16px]">
                <FormField label="Your Testimony" required>
                  <textarea required value={form.testimony}
                    onChange={(e) => setForm({ ...form, testimony: e.target.value })}
                    className={textareaCls}
                    rows={5}
                    placeholder="Share what God has done for you..." />
                </FormField>
                <label className="ros:flex ros:items-center ros:gap-[10px] ros:w-full ros:cursor-pointer">
                  <input type="checkbox" checked={form.rosTVStory}
                    onChange={(e) => setForm({ ...form, rosTVStory: e.target.checked })}
                    className="ros:size-[16px] ros:accent-[#DF4E4E]" />
                  <span className="ros:text-[#374151] ros:text-[14px] ros:font-normal">
                    I would like this testimony shared on ROS TV
                  </span>
                </label>
              </div>
            </FormCard>

            {status === "error" && (
              <p className="ros:text-[#FF383C] ros:text-[14px] ros:text-center ros:w-full">{error}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="ros:bg-[#DF4E4E] ros:px-[40px] ros:py-[16px] ros:rounded-[33px] ros:text-[#FFFDFD] ros:text-[18px] ros:md:text-[22px] ros:font-medium ros:hover:bg-[#C93D3D] ros:transition-colors ros:disabled:opacity-60"
             
            >
              {status === "loading" ? "SUBMITTING..." : "SUBMIT"}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
