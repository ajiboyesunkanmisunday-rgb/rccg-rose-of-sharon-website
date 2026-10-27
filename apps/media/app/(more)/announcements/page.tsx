"use client";

import { useEffect, useMemo, useState } from "react";
import { Hero } from "@ros/shared/kit/ui";
import { API_BASE } from "@ros/shared/api";

interface Announcement {
  id: string;
  subject: string;
  content: string;
  startDate?: string;
  endDate?: string;
  createdOn?: string;
}

type Tab = "all" | "today" | "week" | "earlier";

const READ_KEY = "ros-announcements-read";

// Shown only when the visitor asks to preview the layout, never as if they were real notices.
const SAMPLE: Announcement[] = [
  { id: "s1", subject: "Sunday service times", content: "Join us this Sunday for worship and the word. Come early and bring someone with you.\n\nThe ushering and protocol teams will be at the gate to welcome you.", createdOn: new Date(Date.now() - 3 * 3600e3).toISOString() },
  { id: "s2", subject: "Youth fellowship hangout", content: "The youth church invites everyone aged 16 and above to a day of games, food and fellowship.", createdOn: new Date(Date.now() - 26 * 3600e3).toISOString() },
  { id: "s3", subject: "Believers class — new batch", content: "A new batch of the Believers Class begins soon. Register online or at the church office.", createdOn: new Date(Date.now() - 3 * 86400e3).toISOString() },
  { id: "s4", subject: "Prayer meeting this Friday", content: "A night of prayer for our families, our nation and our city. Come expectant.", createdOn: new Date(Date.now() - 12 * 86400e3).toISOString() },
  { id: "s5", subject: "Thank you for a wonderful Father's Day", content: "We celebrated our fathers in worship and fellowship. Photos are now in the gallery.", createdOn: new Date(Date.now() - 45 * 86400e3).toISOString() },
];

const when = (a: Announcement) => new Date(a.startDate || a.createdOn || Date.now());

function ago(d: Date) {
  const mins = Math.max(0, Math.round((Date.now() - d.getTime()) / 60000));
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const h = Math.round(mins / 60);
  if (h < 24) return `${h} hr${h > 1 ? "s" : ""} ago`;
  const days = Math.round(h / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function bucket(d: Date): "today" | "week" | "earlier" {
  const days = (Date.now() - d.getTime()) / 86400e3;
  if (days < 1) return "today";
  if (days < 7) return "week";
  return "earlier";
}

function iconFor(subject: string) {
  const s = subject.toLowerCase();
  if (/pray|vigil|fast/.test(s)) return "🙏";
  if (/youth|hangout|fellowship/.test(s)) return "🤝";
  if (/class|school|training|rila|register/.test(s)) return "📖";
  if (/service|sunday|worship|crusade|conference/.test(s)) return "⛪";
  if (/thank|celebrat|birthday|wedding|father|mother/.test(s)) return "🎉";
  if (/give|offering|tithe|project/.test(s)) return "💝";
  return "📣";
}

export default function AnnouncementsPage() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sample, setSample] = useState(false);
  const [tab, setTab] = useState<Tab>("all");
  const [open, setOpen] = useState<string | null>(null);
  const [read, setRead] = useState<string[]>([]);

  useEffect(() => {
    try { setRead(JSON.parse(localStorage.getItem(READ_KEY) || "[]")); } catch {}
    if (new URLSearchParams(window.location.search).get("demo") === "1") setSample(true);
    fetch(`${API_BASE}/announcements/read`)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => setItems(Array.isArray(data) ? data : data.content ?? []))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const list = useMemo(() => (sample ? SAMPLE : items).slice().sort((a, b) => when(b).getTime() - when(a).getTime()), [sample, items]);
  const isUnread = (a: Announcement) => !read.includes(a.id);
  const counts = { today: list.filter((a) => bucket(when(a)) === "today").length, week: list.filter((a) => bucket(when(a)) === "week").length, earlier: list.filter((a) => bucket(when(a)) === "earlier").length };
  const unread = list.filter(isUnread).length;
  const shown = list.filter((a) => tab === "all" || bucket(when(a)) === tab);

  function persist(next: string[]) {
    setRead(next);
    try { localStorage.setItem(READ_KEY, JSON.stringify(next)); } catch {}
  }
  function toggle(a: Announcement) {
    setOpen(open === a.id ? null : a.id);
    if (isUnread(a)) persist([...read, a.id]);
  }

  // group the shown items under date headings
  const groups: { title: string; items: Announcement[] }[] = [];
  shown.forEach((a) => {
    const d = when(a);
    const b = bucket(d);
    const title = b === "today" ? "Today" : b === "week" ? "This week" : d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
    const g = groups.find((x) => x.title === title);
    if (g) g.items.push(a); else groups.push({ title, items: [a] });
  });

  const tabs: { key: Tab; label: string }[] = [
    { key: "all", label: `All (${list.length})` },
    { key: "today", label: `Today (${counts.today})` },
    { key: "week", label: "This week" },
    { key: "earlier", label: "Earlier" },
  ];

  return (
    <div>
      <Hero pill="🌍 STAY INFORMED" title={<>Announcements</>} subtitle="Latest news, updates and notices from the house of God." bg="/assets/hero-bg.png" />

      <section className="ros:bg-[#F7F7F8] ros:px-4 ros:py-12 ros:md:py-16">
        <div className="ros:mx-auto ros:flex ros:w-full ros:max-w-[760px] ros:flex-col ros:gap-6">
          {/* header row */}
          <div className="ros:flex ros:items-center ros:justify-between ros:gap-4">
            <div className="ros:flex ros:items-center ros:gap-3">
              <span className="ros:relative ros:flex ros:size-11 ros:items-center ros:justify-center ros:rounded-full ros:bg-black">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" className="ros:size-5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 01-3.4 0" /></svg>
                {unread > 0 && <span className="ros:absolute ros:-right-1 ros:-top-1 ros:flex ros:min-w-[20px] ros:items-center ros:justify-center ros:rounded-full ros:bg-[#DF4E4E] ros:px-1 ros:text-[11px] ros:font-bold ros:text-white" style={{ height: 20 }}>{unread}</span>}
              </span>
              <h2 className="ros:text-[22px] ros:font-bold">Notifications</h2>
            </div>
            {unread > 0 && (
              <button onClick={() => persist(Array.from(new Set([...read, ...list.map((a) => a.id)])))} className="ros:text-[13px] ros:font-bold ros:text-[#DF4E4E] ros:hover:underline">Mark all as read</button>
            )}
          </div>

          {/* tabs */}
          {list.length > 0 && (
            <div className="no-scrollbar ros:flex ros:gap-1 ros:overflow-x-auto ros:rounded-full ros:bg-white ros:p-1 ros:shadow-sm" role="tablist">
              {tabs.map((t) => (
                <button key={t.key} role="tab" aria-selected={tab === t.key} onClick={() => setTab(t.key)} className={`ros:flex-1 ros:whitespace-nowrap ros:rounded-full ros:px-4 ros:py-2 ros:text-[13px] ros:font-bold ros:transition ${tab === t.key ? "ros:bg-black ros:text-white" : "ros:text-[#6B7280] ros:hover:text-black"}`}>{t.label}</button>
              ))}
            </div>
          )}

          {sample && (
            <p className="ros:rounded-lg ros:bg-[#FFF7E6] ros:px-4 ros:py-3 ros:text-[13px] ros:text-[#92400E]">
              These are <b>sample announcements</b> to preview the layout. <button className="ros:underline" onClick={() => setSample(false)}>Hide the sample</button>
            </p>
          )}

          {loading && (
            <div className="ros:flex ros:flex-col ros:gap-3">
              {[1, 2, 3].map((i) => <div key={i} className="ros:h-[92px] ros:animate-pulse ros:rounded-2xl ros:bg-white" />)}
            </div>
          )}

          {/* empty / unavailable state */}
          {!loading && list.length === 0 && (
            <div className="ros:flex ros:flex-col ros:items-center ros:gap-3 ros:rounded-3xl ros:bg-white ros:px-6 ros:py-16 ros:text-center ros:shadow-sm">
              <span className="ros:flex ros:size-24 ros:items-center ros:justify-center ros:rounded-full ros:bg-[#F4F4F4]">
                <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.4" className="ros:size-12" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 01-3.4 0" /></svg>
              </span>
              <h3 className="ros:text-[20px] ros:font-bold">{error ? "Announcements are not available right now" : "You're all caught up"}</h3>
              <p className="ros:max-w-[340px] ros:text-[14px] ros:text-[#6B7280]">{error ? "Please check back soon." : "All announcements will be displayed here."}</p>
              <button onClick={() => setSample(true)} className="ros:mt-2 ros:text-[12px] ros:font-bold ros:uppercase ros:tracking-[0.15em] ros:text-[#DF4E4E] ros:hover:underline">Preview the layout with sample announcements</button>
            </div>
          )}

          {/* grouped list */}
          {!loading && list.length > 0 && shown.length === 0 && (
            <p className="ros:rounded-2xl ros:bg-white ros:px-6 ros:py-10 ros:text-center ros:text-[#6B7280] ros:shadow-sm">Nothing here — you&apos;re all caught up.</p>
          )}
          {groups.map((g) => (
            <div key={g.title} className="ros:flex ros:flex-col ros:gap-3">
              <h3 className="ros:px-1 ros:text-[13px] ros:font-bold ros:uppercase ros:tracking-[0.12em] ros:text-[#6B7280]">{g.title}</h3>
              {g.items.map((a) => {
                const d = when(a);
                const un = isUnread(a);
                const isOpen = open === a.id;
                return (
                  <article key={a.id} className={`ros:overflow-hidden ros:rounded-2xl ros:border ros:transition ${un ? "ros:border-[#F3C9C9] ros:bg-[#FFF5F5]" : "ros:border-[#ECECEC] ros:bg-white"}`}>
                    <button onClick={() => toggle(a)} aria-expanded={isOpen} className="ros:flex ros:w-full ros:items-start ros:gap-4 ros:p-4 ros:text-left">
                      <span className="ros:flex ros:size-12 ros:flex-shrink-0 ros:items-center ros:justify-center ros:rounded-full ros:bg-white ros:text-[22px] ros:shadow-sm">{iconFor(a.subject)}</span>
                      <span className="ros:flex ros:min-w-0 ros:flex-1 ros:flex-col ros:gap-1">
                        <span className="ros:flex ros:items-start ros:justify-between ros:gap-3">
                          <span className={`ros:text-[15px] ${un ? "ros:font-bold" : "ros:font-semibold"}`}>{a.subject}</span>
                          {un && <span className="ros:mt-[6px] ros:size-[9px] ros:flex-shrink-0 ros:rounded-full ros:bg-[#DF4E4E]" aria-label="Unread" />}
                        </span>
                        {!isOpen && <span className="ros:line-clamp-2 ros:text-[13px] ros:leading-[1.5] ros:text-[#6B7280]">{a.content}</span>}
                        <span className="ros:mt-1 ros:flex ros:items-center ros:gap-2 ros:text-[12px] ros:text-[#9CA3AF]">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="ros:size-[14px]" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></svg>
                          {ago(d)} · {d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                          {a.endDate && a.endDate !== a.startDate && <span className="ros:rounded-full ros:bg-black/5 ros:px-2 ros:py-[1px]">until {new Date(a.endDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>}
                        </span>
                      </span>
                    </button>
                    {isOpen && (
                      <div className="ros:border-t ros:border-black/5 ros:bg-white/70 ros:px-4 ros:py-4 ros:pl-[84px] ros:text-[14px] ros:leading-[1.7] ros:text-[#374151] ros:whitespace-pre-line">{a.content}</div>
                    )}
                  </article>
                );
              })}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
