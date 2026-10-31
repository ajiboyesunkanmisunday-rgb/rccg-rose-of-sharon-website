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
  owner?: { firstName?: string; lastName?: string; profilePictureUrl?: string };
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

const TEXT_LIMIT = 220;

export default function TestimoniesPage() {
  const [liveTestimonies, setLiveTestimonies] = useState<TestimonyItem[]>([]);
  const [loadingTestimonies, setLoadingTestimonies] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [formOpen, setFormOpen] = useState(false);

  const [form, setForm] = useState({
    name: "", subject: "", testimony: "",
    state: "", country: "Nigeria", rosTVStory: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  // nine featured testimonies at a time, three to a row
  useEffect(() => {
    setLoadingTestimonies(true);
    fetch(`${API_BASE}/testimonies/featured?pageNo=${page}&pageSize=9`)
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => {
        const list: TestimonyItem[] = Array.isArray(data) ? data : data.content ?? [];
        setTotalPages(Array.isArray(data) ? 1 : Math.max(1, data.totalPages ?? 1));
        // only testimonies that actually tell a story (short or numeric test entries are left out)
        setLiveTestimonies(list.filter((t) => parseTestimony(t).body.length >= 25));
      })
      .catch(() => {})
      .finally(() => setLoadingTestimonies(false));
  }, [page]);

  // the form is a pop-up: Escape closes it, and the page behind it does not scroll while it is open
  useEffect(() => {
    if (!formOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setFormOpen(false); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [formOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      await post("/testimonies", {
        subject: form.subject,
        content: `From: ${form.name}\n\n${form.testimony}`,
        state: form.state.trim(),
        country: form.country.trim(),
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
      <Hero pill="🌍 RCCG ROSE OF SHARON" title={<>Amazing <span className="text-textRed">Evidences</span></>} subtitle="Real stories of God's faithfulness — lives transformed by the power of the Holy Spirit." bg="/assets/testimonies-banner.jpg" bgPosition="50% 42%" />

      {/* The testimony story */}
      <section className="ros:flex ros:w-full ros:flex-col ros:items-center ros:gap-5 ros:bg-white ros:px-4 ros:py-16 ros:text-center ros:md:px-8 ros:md:py-[84px]">
        <h6 className="ros:w-fit ros:rounded-full ros:bg-[#F4F4F4] ros:px-3 ros:py-1 ros:text-xs ros:font-bold">📖 THE TESTIMONY STORY</h6>
        <h2 className="ros:max-w-3xl ros:text-[32px] ros:font-bold ros:leading-tight ros:md:text-[48px]">Every testimony is a story of God&apos;s faithfulness</h2>
        <p className="ros:max-w-3xl ros:text-[17px] ros:leading-[1.8] ros:text-[#00000099]">
          A testimony is more than a happy ending. It is the story of a need, a prayer, a waiting season and the day God came through. At Rose of Sharon we make room to tell these stories, because what He did for one of us builds the faith of all of us.
        </p>
        <p className="ros:max-w-3xl ros:text-[17px] ros:leading-[1.8] ros:text-[#00000099]">
          Read what God has done in the lives of our members below, and when He moves in yours, tell us. It may be the very story someone else is waiting to hear.
        </p>
      </section>

      {/* Featured testimonies: three to a row, nine at a time */}
      <section className="ros:flex ros:w-full ros:flex-col ros:items-center ros:gap-8 ros:bg-[#F4F4F4] ros:px-4 ros:py-16 ros:text-center ros:md:px-8 ros:md:py-[84px]">
        <div className="ros:flex ros:flex-col ros:items-center ros:gap-3">
          <h6 className="ros:w-fit ros:rounded-full ros:bg-white ros:px-3 ros:py-1 ros:text-xs ros:font-bold">⭐ FEATURED</h6>
          <h2 className="ros:text-[32px] ros:font-bold ros:leading-tight ros:md:text-[48px]">Featured Testimonies</h2>
          <p className="ros:max-w-xl ros:text-[#00000099]">Stories of what God has done in the lives of our members.</p>
        </div>

        {loadingTestimonies ? (
          <div className="ros:grid ros:w-full ros:max-w-7xl ros:grid-cols-1 ros:gap-5 ros:md:grid-cols-3">
            {[1, 2, 3].map((i) => <div key={i} className="ros:h-[260px] ros:animate-pulse ros:rounded-2xl ros:bg-white" />)}
          </div>
        ) : liveTestimonies.length > 0 ? (
          <>
            <div className="ros:grid ros:w-full ros:max-w-7xl ros:grid-cols-1 ros:items-start ros:gap-5 ros:md:grid-cols-3">
              {liveTestimonies.map((t) => {
                const { name, body } = parseTestimony(t);
                const long = body.length > TEXT_LIMIT;
                const open = !!expanded[t.id];
                const shown = long && !open ? body.slice(0, TEXT_LIMIT).replace(/\s+\S*$/, "") + "…" : body;
                const photo = t.owner?.profilePictureUrl;
                return (
                  <article key={t.id} className="ros:flex ros:flex-col ros:items-center ros:gap-4 ros:rounded-2xl ros:bg-white ros:p-6 ros:shadow-[0px_4px_20px_rgba(0,0,0,0.08)]">
                    {photo ? (
                      <img src={photo} alt={name} loading="lazy" className="ros:size-[72px] ros:rounded-full ros:object-cover ros:object-top" />
                    ) : (
                      <div className="ros:flex ros:size-[72px] ros:items-center ros:justify-center ros:rounded-full ros:bg-[#DF4E4E] ros:text-[26px] ros:font-bold ros:text-white">{name.charAt(0).toUpperCase()}</div>
                    )}
                    <div>
                      <p className="ros:text-[16px] ros:font-bold">{name}</p>
                      {place(t) && <p className="ros:text-[13px] ros:text-[#A3A1AF]">{place(t)}</p>}
                    </div>
                    {t.subject && <h3 className="ros:text-[17px] ros:font-bold">{t.subject}</h3>}
                    <p className="ros:text-[15px] ros:italic ros:leading-[1.6]">&ldquo;{shown}&rdquo;</p>
                    {long && (
                      <button type="button" onClick={() => setExpanded((p) => ({ ...p, [t.id]: !p[t.id] }))} className="ros:text-[13px] ros:font-bold ros:text-[#DF4E4E] ros:hover:underline" aria-expanded={open}>
                        {open ? "Read less" : "Read more"}
                      </button>
                    )}
                  </article>
                );
              })}
            </div>
            {totalPages > 1 && (
              <div className="ros:flex ros:items-center ros:gap-4">
                <button type="button" disabled={page === 0} onClick={() => setPage((p) => Math.max(0, p - 1))} className="ros:rounded-full ros:border ros:border-black ros:px-5 ros:py-2 ros:text-xs ros:font-bold ros:uppercase ros:tracking-[0.15em] ros:disabled:opacity-30">Previous</button>
                <span className="ros:text-sm ros:text-[#00000099]">Page {page + 1} of {totalPages}</span>
                <button type="button" disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)} className="ros:rounded-full ros:border ros:border-black ros:px-5 ros:py-2 ros:text-xs ros:font-bold ros:uppercase ros:tracking-[0.15em] ros:disabled:opacity-30">Next</button>
              </div>
            )}
          </>
        ) : (
          <div className="ros:max-w-md ros:rounded-2xl ros:bg-white ros:p-8">
            <p className="ros:text-lg ros:font-bold">Featured testimonies will appear here</p>
            <p className="ros:mt-2 ros:text-[#00000099]">The church team picks testimonies to feature each season. Share yours with the button below.</p>
            <button type="button" onClick={() => setFormOpen(true)} className="ros:mt-4 ros:inline-block ros:text-sm ros:font-bold ros:text-[#DF4E4E] ros:hover:underline">Share your testimony →</button>
          </div>
        )}
      </section>

      {/* Floating button: opens the testimony form as a pop-up */}
      <button
        type="button"
        onClick={() => { setStatus("idle"); setFormOpen(true); }}
        className="ros:fixed ros:bottom-5 ros:right-5 ros:z-40 ros:flex ros:items-center ros:gap-2 ros:rounded-full ros:bg-[#DF4E4E] ros:px-5 ros:py-3.5 ros:text-[13px] ros:font-extrabold ros:uppercase ros:tracking-[0.12em] ros:text-white ros:shadow-[0_8px_28px_rgba(0,0,0,0.3)] ros:transition ros:hover:bg-[#C93D3D]"
        aria-haspopup="dialog"
      >
        <span aria-hidden="true">✍️</span> Share your testimony
      </button>

      {formOpen && (
        <div className="ros:fixed ros:inset-0 ros:z-[70] ros:flex ros:items-end ros:justify-center ros:bg-black/60 ros:p-3 ros:md:items-center" role="dialog" aria-modal="true" aria-label="Share your testimony" onClick={() => setFormOpen(false)}>
          <div className="ros:relative ros:max-h-[92vh] ros:w-full ros:max-w-[640px] ros:overflow-y-auto ros:rounded-2xl ros:bg-[#F3F4F6] ros:p-5 ros:md:p-8" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setFormOpen(false)} aria-label="Close" className="ros:absolute ros:right-3 ros:top-3 ros:flex ros:size-10 ros:items-center ros:justify-center ros:rounded-full ros:bg-white ros:text-xl ros:shadow">×</button>
            <div className="ros:flex ros:flex-col ros:items-center ros:gap-4">
              <h2 className="ros-anton ros:text-center ros:text-[32px] ros:uppercase ros:leading-normal ros:text-[#DF4E4E] ros:md:text-[40px]">Share Your Testimony</h2>
              <div className="ros:relative ros:size-[44px] ros:flex-shrink-0">
                <Image src="/assets/icon-watch.svg" alt="" fill />
              </div>

              {status === "success" ? (
                <div className="ros:flex ros:w-full ros:flex-col ros:items-center ros:gap-[20px] ros:rounded-2xl ros:bg-white ros:p-8 ros:text-center">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="32" fill="#16A34A" fillOpacity="0.12" />
                    <circle cx="32" cy="32" r="24" fill="#16A34A" fillOpacity="0.2" />
                    <path d="M20 32L28 40L44 24" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="ros:text-[#111827] ros:text-[25px] ros:font-medium">Thank You!</p>
                  <p className="ros:text-[#6B7280] ros:text-[16px]">Your testimony has been received. May God continue to bless you.</p>
                  <div className="ros:flex ros:gap-4">
                    <button type="button" onClick={() => { setForm({ name: "", subject: "", testimony: "", state: "", country: "Nigeria", rosTVStory: false }); setStatus("idle"); }} className="ros:text-[#DF4E4E] ros:text-[15px] ros:hover:underline">Share another testimony</button>
                    <button type="button" onClick={() => setFormOpen(false)} className="ros:text-[15px] ros:font-bold ros:hover:underline">Close</button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="ros:flex ros:w-full ros:flex-col ros:items-center ros:gap-[16px]">
                  <FormCard title="Your Details">
                    <div className="ros:flex ros:flex-col ros:gap-[16px]">
                      <FormField label="Name" required>
                        <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
                      </FormField>
                      <FormField label="Subject" required>
                        <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputCls} />
                      </FormField>
                      <div className="ros:grid ros:grid-cols-2 ros:gap-[12px]">
                        <FormField label="State" required>
                          <input type="text" required value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className={inputCls} />
                        </FormField>
                        <FormField label="Country" required>
                          <input type="text" required value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className={inputCls} />
                        </FormField>
                      </div>
                    </div>
                  </FormCard>

                  <FormCard title="Your Testimony">
                    <div className="ros:flex ros:flex-col ros:gap-[16px]">
                      <FormField label="Your Testimony" required>
                        <textarea required value={form.testimony} onChange={(e) => setForm({ ...form, testimony: e.target.value })} className={textareaCls} rows={5} placeholder="Share what God has done for you..." />
                      </FormField>
                      <label className="ros:flex ros:w-full ros:cursor-pointer ros:items-center ros:gap-[10px]">
                        <input type="checkbox" checked={form.rosTVStory} onChange={(e) => setForm({ ...form, rosTVStory: e.target.checked })} className="ros:size-[16px] ros:accent-[#DF4E4E]" />
                        <span className="ros:text-[#374151] ros:text-[14px] ros:font-normal">I would like this testimony shared on ROS TV</span>
                      </label>
                    </div>
                  </FormCard>

                  {status === "error" && <p className="ros:w-full ros:text-center ros:text-[14px] ros:text-[#FF383C]">{error}</p>}

                  <button type="submit" disabled={status === "loading"} className="ros:rounded-[33px] ros:bg-[#DF4E4E] ros:px-[40px] ros:py-[14px] ros:text-[18px] ros:font-medium ros:text-[#FFFDFD] ros:transition-colors ros:hover:bg-[#C93D3D] ros:disabled:opacity-60">
                    {status === "loading" ? "SUBMITTING..." : "SUBMIT"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
