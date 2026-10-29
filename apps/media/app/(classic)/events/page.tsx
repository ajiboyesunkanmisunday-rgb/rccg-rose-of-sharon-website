"use client";

import { Hero } from "@ros/shared/kit/ui";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { API_BASE } from "@ros/shared/api";
import { A } from "@ros/shared/link";


interface EventItem {
  id?: string;
  title?: string;
  preacher?: string;
  topic?: string;
  eventCategory?: string;
  date?: string;
  startTime?: number;
  endTime?: number;
  locationType?: string;
  virtualMeetingLink?: string;
  street?: string;
  city?: string;
  state?: string;
  additionalInstructions?: string;
  isCanceled?: boolean;
  eflyer?: string;
}

const CAT: Record<string, { label: string; bg: string; light: string }> = {
  SERVICE:         { label: "Service",         bg: "#DF4E4E", light: "#EEF0FF" },
  SPECIAL_SERVICE: { label: "Special Service", bg: "#6B21A8", light: "#F3E8FF" },
  WEDDING:         { label: "Wedding",         bg: "#9D174D", light: "#FCE7F3" },
  FUNERAL:         { label: "Funeral",         bg: "#374151", light: "#F3F4F6" },
  CONFERENCE:      { label: "Conference",      bg: "#0E7490", light: "#E0F7FA" },
};

const DAYS  = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

function formatTime(t?: number): string {
  if (t == null) return "";
  const s = String(t).padStart(4, "0");
  const h = parseInt(s.slice(0, -2), 10);
  const m = s.slice(-2);
  const ampm = h >= 12 ? "pm" : "am";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${m}${ampm}`;
}

function toISO(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function formatFull(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

export default function EventsPage() {
  const today = new Date();
  const todayStr = toISO(today.getFullYear(), today.getMonth(), today.getDate());

  const [year,  setYear]  = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  const load = useCallback((y: number, m: number) => {
    setLoading(true);
    const start = toISO(y, m, 1);
    const end   = toISO(y, m, new Date(y, m + 1, 0).getDate());
    fetch(`${API_BASE}/events/calendar?startDay=${start}&endDay=${end}`)
      .then(r => r.ok ? r.json() : [])
      .then(d => setEvents(Array.isArray(d) ? d.filter((e: EventItem) => !e.isCanceled) : []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(year, month); }, [year, month, load]);

  function prev() {
    if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1);
    setSelected(null);
  }
  function next() {
    if (month === 11) { setYear(y => y + 1); setMonth(0); } else setMonth(m => m + 1);
    setSelected(null);
  }
  function goToday() {
    setYear(today.getFullYear()); setMonth(today.getMonth()); setSelected(todayStr);
  }

  const firstDow    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const byDate = events.reduce<Record<string, EventItem[]>>((acc, e) => {
    if (e.date) { (acc[e.date] ??= []).push(e); }
    return acc;
  }, {});

  const selectedEvts = selected ? (byDate[selected] ?? []) : [];

  const upcoming = [...events]
    .filter(e => e.date && e.date >= todayStr)
    .sort((a, b) => (a.date ?? "").localeCompare(b.date ?? ""))
    .slice(0, 10);

  return (
    <div>
      <Hero pill="🌍 CHURCH CALENDAR" title={<>Events & <span className="text-textRed">Services</span></>} subtitle="Stay connected with everything happening at RCCG Rose of Sharon." bg="/assets/events-banner.jpg" bgPosition="50% 40%" />

      {/* ── Calendar + Sidebar ── */}
      <section className="ros:bg-[#EEF0F7] ros:px-4 ros:md:px-[32px] ros:lg:px-[64px] ros:py-[32px] ros:md:py-[64px] ros:flex ros:flex-col ros:lg:flex-row ros:gap-[24px] ros:lg:gap-[40px] ros:items-start ros:w-full ros:min-h-screen">

        {/* LEFT — calendar card */}
        <div className="ros:flex-1 ros:min-w-0 ros:rounded-[24px] ros:overflow-hidden ros:shadow-[0_8px_48px_rgba(0,0,0,0.10)] ros:bg-white">

          {/* Month nav */}
          <div className="ros:bg-[#DF4E4E] ros:flex ros:items-center ros:justify-between ros:px-[20px] ros:md:px-[32px] ros:py-[20px] ros:md:py-[28px]">
            <button onClick={prev} aria-label="Previous month"
              className="ros:size-[40px] ros:md:size-[44px] ros:rounded-full ros:bg-white/10 ros:hover:bg-white/25 ros:flex ros:items-center ros:justify-center ros:transition-colors">
              <svg className="ros:w-4 ros:h-4 ros:md:w-5 ros:md:h-5 ros:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="ros:flex ros:flex-col ros:items-center ros:gap-[2px]">
              <h2 className="ros-anton ros:uppercase ros:text-[#FFFDFD] ros:text-[22px] ros:md:text-[32px] ros:leading-none">{MONTHS[month]}</h2>
              <span className="ros:text-[#FFFFFFB3] ros:text-[14px] ros:md:text-[16px] ros:font-normal">{year}</span>
            </div>
            <button onClick={next} aria-label="Next month"
              className="ros:size-[40px] ros:md:size-[44px] ros:rounded-full ros:bg-white/10 ros:hover:bg-white/25 ros:flex ros:items-center ros:justify-center ros:transition-colors">
              <svg className="ros:w-4 ros:h-4 ros:md:w-5 ros:md:h-5 ros:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Day-of-week header */}
          <div className="ros:grid ros:grid-cols-7 ros:bg-[#DF4E4E]/5 ros:border-b ros:border-[#DF4E4E]/10">
            {DAYS.map(d => (
              <div key={d} className="ros:py-[8px] ros:md:py-[10px] ros:text-center ros:text-[#DF4E4E] ros:text-[10px] ros:md:text-[12px] ros:font-bold ros:uppercase ros:tracking-widest">{d}</div>
            ))}
          </div>

          {/* Day cells */}
          {loading ? (
            <div className="ros:flex ros:items-center ros:justify-center ros:py-[100px]">
              <div className="ros:size-[48px] ros:rounded-full ros:border-4 ros:border-[#DF4E4E] ros:border-t-transparent ros:animate-spin" />
            </div>
          ) : (
            <div className="ros:grid ros:grid-cols-7">
              {Array.from({ length: firstDow }).map((_, i) => (
                <div key={`pad-${i}`} className="ros:h-[60px] ros:md:h-[80px] ros:lg:h-[108px] ros:border-b ros:border-r ros:border-gray-100 ros:bg-gray-50/50" />
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day     = i + 1;
                const dateStr = toISO(year, month, day);
                const dayEvts = byDate[dateStr] ?? [];
                const isToday    = dateStr === todayStr;
                const isSelected = dateStr === selected;
                const isPast     = dateStr < todayStr;
                const isLastCol  = (firstDow + i) % 7 === 6;

                return (
                  <button
                    key={day}
                    onClick={() => setSelected(isSelected ? null : dateStr)}
                    className={[
                      "ros:h-[60px] ros:md:h-[80px] ros:lg:h-[108px] ros:p-[6px] ros:md:p-[10px] ros:flex ros:flex-col ros:items-start ros:text-left ros:transition-all ros:border-b ros:border-r ros:border-gray-100 ros:group ros:relative ros:overflow-hidden",
                      isLastCol ? "ros:border-r-0" : "",
                      isSelected ? "ros:bg-[#DF4E4E]/8 ros:ring-2 ros:ring-inset ros:ring-[#DF4E4E]" : "ros:hover:bg-[#DF4E4E]/4",
                    ].join(" ")}
                  >
                    <span className={[
                      "ros:text-[11px] ros:md:text-[13px] ros:font-bold ros:w-[24px] ros:h-[24px] ros:md:w-[28px] ros:md:h-[28px] ros:flex ros:items-center ros:justify-center ros:rounded-full ros:flex-shrink-0 ros:z-10",
                      isToday    ? "ros:bg-[#DF4E4E] ros:text-white ros:shadow-[0_2px_8px_rgba(0,0,0,0.4)]" :
                      isSelected ? "ros:bg-[#DF4E4E]/15 ros:text-[#DF4E4E]" :
                      isPast     ? "ros:text-[#C0BFCF]" : "ros:text-[#000000]",
                    ].join(" ")}>{day}</span>

                    <div className="ros:hidden ros:md:flex ros:flex-col ros:gap-[2px] ros:w-full ros:mt-[4px] ros:overflow-hidden">
                      {dayEvts.slice(0, 2).map((ev, idx) => {
                        const cfg = CAT[ev.eventCategory ?? ""] ?? CAT.SERVICE;
                        return (
                          <div key={idx} className="ros:flex ros:items-center ros:gap-[4px] ros:w-full ros:overflow-hidden ros:rounded-[3px] ros:px-[4px] ros:py-[1px]" style={{ background: cfg.light }}>
                            <div className="ros:size-[5px] ros:rounded-full ros:flex-shrink-0" style={{ background: cfg.bg }} />
                            <span className="ros:text-[10px] ros:font-semibold ros:truncate ros:leading-tight" style={{ color: cfg.bg }}>
                              {ev.title}
                            </span>
                          </div>
                        );
                      })}
                      {dayEvts.length > 2 && (
                        <span className="ros:text-[10px] ros:font-medium ros:text-[#A3A1AF] ros:pl-[4px]">+{dayEvts.length - 2} more</span>
                      )}
                    </div>

                    {/* Mobile: dot indicator only */}
                    {dayEvts.length > 0 && (
                      <div className="ros:md:hidden ros:absolute ros:bottom-[4px] ros:left-1/2 ros:-translate-x-1/2 ros:size-[4px] ros:rounded-full ros:bg-[#DF4E4E]" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Selected-day event detail panel */}
          {selected && (
            <div className="ros:border-t-2 ros:border-[#DF4E4E]/10 ros:bg-[#F8F8FF]">
              <div className="ros:px-[20px] ros:md:px-[32px] ros:pt-[24px] ros:pb-[8px] ros:flex ros:items-center ros:justify-between">
                <h3 className="ros:text-[#000000] ros:text-[14px] ros:md:text-[16px] ros:font-bold">{formatFull(selected)}</h3>
                <button onClick={() => setSelected(null)} className="ros:text-[#A3A1AF] ros:hover:text-[#000000] ros:transition-colors ros:text-[20px] ros:leading-none">×</button>
              </div>

              {selectedEvts.length === 0 ? (
                <p className="ros:px-[20px] ros:md:px-[32px] ros:pb-[24px] ros:text-[#A3A1AF] ros:text-[14px]">No events scheduled for this day.</p>
              ) : (
                <div className="ros:px-[20px] ros:md:px-[32px] ros:pb-[24px] ros:flex ros:flex-col ros:gap-[12px]">
                  {selectedEvts.map((ev, i) => {
                    const cfg = CAT[ev.eventCategory ?? ""] ?? CAT.SERVICE;
                    return (
                      <div key={i} className="ros:bg-white ros:rounded-[16px] ros:p-[16px] ros:md:p-[20px] ros:flex ros:gap-[16px] ros:items-start ros:shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
                        <div className="ros:w-[4px] ros:self-stretch ros:rounded-full ros:flex-shrink-0" style={{ background: cfg.bg }} />
                        <div className="ros:flex ros:flex-col ros:gap-[6px] ros:flex-1 ros:min-w-0">
                          <div className="ros:flex ros:items-center ros:gap-[8px] ros:flex-wrap">
                            <span className="ros:text-[#000000] ros:text-[15px] ros:md:text-[17px] ros:font-bold">{ev.title}</span>
                            <span className="ros:px-[10px] ros:py-[3px] ros:rounded-full ros:text-[11px] ros:font-semibold ros:text-white" style={{ background: cfg.bg }}>
                              {cfg.label}
                            </span>
                          </div>
                          {ev.topic && <p className="ros:text-[#A3A1AF] ros:text-[13px]">📖 {ev.topic}</p>}
                          {ev.preacher && <p className="ros:text-[#A3A1AF] ros:text-[13px]">🎤 {ev.preacher}</p>}
                          {ev.startTime != null && (
                            <p className="ros:text-[#DF4E4E] ros:text-[13px] ros:font-semibold">
                              🕐 {formatTime(ev.startTime)}{ev.endTime != null ? ` – ${formatTime(ev.endTime)}` : ""}
                            </p>
                          )}
                          {ev.locationType === "VIRTUAL" && ev.virtualMeetingLink && (
                            <A href={ev.virtualMeetingLink} target="_blank" rel="noopener noreferrer"
                              className="ros:text-[#DF4E4E] ros:text-[13px] ros:hover:underline">🔗 Join Online</A>
                          )}
                          {ev.locationType !== "VIRTUAL" && ev.city && (
                            <p className="ros:text-[#A3A1AF] ros:text-[13px]">📍 {[ev.street, ev.city, ev.state].filter(Boolean).join(", ")}</p>
                          )}
                          {ev.additionalInstructions && (
                            <p className="ros:text-[#A3A1AF] ros:text-[13px] ros:italic">{ev.additionalInstructions}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT — sidebar */}
        <div className="ros:w-full ros:lg:w-[340px] ros:lg:flex-shrink-0 ros:flex ros:flex-col ros:gap-[24px]">

          <button onClick={goToday}
            className="ros:w-full ros:py-[14px] ros:rounded-[30px] ros:bg-[#DF4E4E] ros:text-[#FFFDFD] ros:text-[15px] ros:font-medium ros:hover:bg-[#C93D3D] ros:transition-colors ros:shadow-[0_4px_16px_rgba(0,0,0,0.25)]"
           
          >
            Jump to Today
          </button>

          <div className="ros:flex ros:flex-col ros:gap-[4px]">
            <p className="ros:text-[#DF4E4E] ros:text-[12px] ros:font-normal ros:uppercase ros:tracking-[0.2em]">What&apos;s Next</p>
            <h2 className="ros:text-[#000000] ros:text-[22px] ros:md:text-[24px] ros:font-bold">Upcoming Events</h2>
          </div>

          {loading && (
            <div className="ros:flex ros:flex-col ros:gap-[12px]">
              {[0, 1, 2].map(i => <div key={i} className="ros:bg-white ros:rounded-[16px] ros:h-[80px] ros:animate-pulse ros:shadow-sm" />)}
            </div>
          )}

          {!loading && upcoming.length === 0 && (
            <div className="ros:bg-white ros:rounded-[16px] ros:p-[24px] ros:text-center ros:shadow-sm">
              <p className="ros:text-[#A3A1AF] ros:text-[14px]">No upcoming events this month.</p>
            </div>
          )}

          <div className="ros:flex ros:flex-col ros:gap-[10px]">
            {upcoming.map((ev, i) => {
              const cfg = CAT[ev.eventCategory ?? ""] ?? CAT.SERVICE;
              const d   = ev.date ? new Date(ev.date + "T00:00:00") : null;
              const isActive = selected === ev.date;
              return (
                <button
                  key={i}
                  onClick={() => { if (ev.date) { setSelected(isActive ? null : ev.date); setYear(d!.getFullYear()); setMonth(d!.getMonth()); } }}
                  className={[
                    "ros:bg-white ros:rounded-[16px] ros:p-[16px] ros:flex ros:items-center ros:gap-[14px] ros:text-left ros:w-full ros:transition-all",
                    isActive
                      ? "ros:shadow-[0_4px_20px_rgba(0,0,0,0.18)] ros:ring-2 ros:ring-[#DF4E4E]"
                      : "ros:shadow-[0_2px_12px_rgba(0,0,0,0.06)] ros:hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)]",
                  ].join(" ")}
                >
                  <div className="ros:flex-shrink-0 ros:w-[50px] ros:h-[54px] ros:rounded-[12px] ros:flex ros:flex-col ros:items-center ros:justify-center" style={{ background: cfg.bg }}>
                    {d && <>
                      <span className="ros:text-white/70 ros:text-[9px] ros:font-semibold ros:uppercase ros:tracking-wider">
                        {d.toLocaleDateString("en-GB", { month: "short" })}
                      </span>
                      <span className="ros:text-white ros:text-[22px] ros:font-bold ros:leading-none">{d.getDate()}</span>
                      <span className="ros:text-white/60 ros:text-[9px]">
                        {d.toLocaleDateString("en-GB", { weekday: "short" })}
                      </span>
                    </>}
                  </div>
                  <div className="ros:flex ros:flex-col ros:gap-[3px] ros:flex-1 ros:min-w-0">
                    <span className="ros:text-[#000000] ros:text-[14px] ros:font-bold ros:truncate ros:leading-tight">{ev.title}</span>
                    {ev.startTime != null && (
                      <span className="ros:text-[#DF4E4E] ros:text-[12px] ros:font-semibold">{formatTime(ev.startTime)}</span>
                    )}
                    <div className="ros:flex ros:items-center ros:gap-[6px]">
                      <div className="ros:size-[6px] ros:rounded-full ros:flex-shrink-0" style={{ background: cfg.bg }} />
                      <span className="ros:text-[#A3A1AF] ros:text-[11px]">{cfg.label}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="ros:bg-[#DF4E4E] ros:rounded-[20px] ros:p-[24px] ros:flex ros:flex-col ros:gap-[12px]">
            <p className="ros:text-[#FFFFFFB3] ros:text-[12px] ros:uppercase ros:tracking-widest">Never Miss a Service</p>
            <p className="ros:text-[#FFFDFD] ros:text-[18px] ros:font-bold ros:leading-snug">
              Get notified about upcoming events &amp; special services
            </p>
            <A href="/e-member"
              className="ros:bg-[#FFFDFD] ros:text-[#DF4E4E] ros:text-[14px] ros:font-bold ros:px-[20px] ros:py-[10px] ros:rounded-[20px] ros:text-center ros:hover:bg-[#FFFFFFB3] ros:transition-colors"
             
            >
              Become an E-Member →
            </A>
          </div>
        </div>
      </section>

      {/* ── Scripture ── */}
      <section className="ros:bg-[#000000] ros:px-6 ros:md:px-[60px] ros:lg:px-[120px] ros:py-[48px] ros:md:py-[64px] ros:flex ros:flex-col ros:gap-[16px] ros:items-center ros:w-full ros:text-center">
        <p className="ros:text-[#FFFDFD] ros:text-[18px] ros:md:text-[22px] ros:lg:text-[24px] ros:font-normal ros:italic ros:leading-[1.6] ros:max-w-[700px]" style={{ fontFamily: "'Playfair Display', serif" }}>
          &ldquo;Not neglecting to meet together, as is the habit of some, but encouraging one another.&rdquo;
        </p>
        <p className="ros:text-[#FFFFFFB3] ros:text-[13px] ros:md:text-[15px] ros:font-semibold ros:uppercase ros:tracking-widest">Hebrews 10:25</p>
      </section>
    </div>
  );
}
