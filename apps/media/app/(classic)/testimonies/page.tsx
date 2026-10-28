"use client";

import { Hero } from "@ros/shared/kit/ui";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "@ros/shared/link";
import { FormField, FormCard, inputCls, textareaCls } from "@ros/shared/kit/form";
import { post, API_BASE } from "@ros/shared/api";

interface TestimonyItem {
  id: string;
  subject: string;
  content: string;
  owner?: { firstName?: string; lastName?: string };
  state?: string;
  country?: string;
  createdOn?: string;
}

/** The testimony text and who shared it ("From: Name" is added at the top of testimonies shared on this site). */
function parseTestimony(t: TestimonyItem) {
  const owner = t.owner ? `${t.owner.firstName ?? ""} ${t.owner.lastName ?? ""}`.trim() : "";
  const lines = (t.content ?? "").split("\n").map((l) => l.trim()).filter(Boolean);
  const from = lines[0]?.match(/^From:\s*(.+)$/i)?.[1];
  const body = (from ? lines.slice(1) : lines).join(" ");
  return { name: owner || from || "A member of Rose of Sharon", body };
}
const place = (t: TestimonyItem) => [t.state, t.country].filter(Boolean).map((x) => String(x).replace(/\b\w/g, (c) => c.toUpperCase())).join(", ");

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
    fetch(`${API_BASE}/testimonies/featured?pageNo=0&pageSize=12`)
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => {
        const list: TestimonyItem[] = Array.isArray(data) ? data : data.content ?? [];
        // only testimonies that actually tell a story (short or numeric test entries are left out)
        setLiveTestimonies(list.filter((t) => parseTestimony(t).body.length >= 25));
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

      {/* Featured testimonies, centred */}
      <section className="ros:flex ros:w-full ros:flex-col ros:items-center ros:gap-8 ros:bg-[#F4F4F4] ros:px-4 ros:py-16 ros:text-center ros:md:px-8 ros:md:py-[84px]">
        <div className="ros:flex ros:flex-col ros:items-center ros:gap-3">
          <h6 className="ros:w-fit ros:rounded-full ros:bg-white ros:px-3 ros:py-1 ros:text-xs ros:font-bold">⭐ FEATURED</h6>
          <h2 className="ros:text-[32px] ros:font-bold ros:leading-tight ros:md:text-[48px]">Featured Testimonies</h2>
          <p className="ros:max-w-xl ros:text-[#00000099]">Stories of what God has done in the lives of our members.</p>
        </div>

        {loadingTestimonies ? (
          <div className="ros:flex ros:w-full ros:max-w-7xl ros:flex-wrap ros:justify-center ros:gap-5">
            {[1, 2, 3].map((i) => <div key={i} className="ros:h-[220px] ros:w-full ros:max-w-[360px] ros:animate-pulse ros:rounded-2xl ros:bg-white" />)}
          </div>
        ) : liveTestimonies.length > 0 ? (
          <div className="ros:flex ros:w-full ros:max-w-7xl ros:flex-wrap ros:justify-center ros:gap-5">
            {liveTestimonies.map((t) => {
              const { name, body } = parseTestimony(t);
              return (
                <article key={t.id} className="ros:flex ros:w-full ros:max-w-[360px] ros:flex-col ros:items-center ros:gap-4 ros:rounded-2xl ros:bg-white ros:p-6 ros:shadow-[0px_4px_20px_rgba(0,0,0,0.08)] ros:md:w-[calc(33.333%-14px)]">
                  <div className="ros:flex ros:size-[60px] ros:items-center ros:justify-center ros:rounded-full ros:bg-[#DF4E4E] ros:text-[22px] ros:font-bold ros:text-white">{name.charAt(0).toUpperCase()}</div>
                  {t.subject && <h3 className="ros:text-[18px] ros:font-bold">{t.subject}</h3>}
                  <p className="ros:line-clamp-6 ros:text-[15px] ros:italic ros:leading-[1.6]">&ldquo;{body}&rdquo;</p>
                  <div>
                    <p className="ros:text-[15px] ros:font-bold">{name}</p>
                    {place(t) && <p className="ros:text-[13px] ros:text-[#A3A1AF]">{place(t)}</p>}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="ros:max-w-md ros:rounded-2xl ros:bg-white ros:p-8">
            <p className="ros:text-lg ros:font-bold">Featured testimonies will appear here</p>
            <p className="ros:mt-2 ros:text-[#00000099]">The church team picks testimonies to feature each season. Share yours below.</p>
            <a href="#share" className="ros:mt-4 ros:inline-block ros:text-sm ros:font-bold ros:text-[#DF4E4E] ros:hover:underline">Share your testimony →</a>
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
