"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { API_BASE } from "@/lib/api";

const vs = { fontVariationSettings: '"wdth" 100' };

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
  SERVICE:         { label: "Service",         bg: "#000080", light: "#EEF0FF" },
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
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-[400px] md:h-[500px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/assets/hero-bg.png" alt="" fill className="object-cover pointer-events-none" priority />
          <div className="absolute inset-0 bg-[rgba(0,0,128,0.84)]" />
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "linear-gradient(rgba(181,181,243,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(181,181,243,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
        </div>
        <Navbar activePage="events" />
        <div className="relative z-10 flex flex-col gap-4 md:gap-[20px] items-center w-full max-w-[1148px] px-6 md:px-8 text-center mt-16 md:mt-[48px]">
          <p className="text-[#B5B5F3] text-[13px] font-normal uppercase tracking-[0.2em]" style={vs}>Church Calendar</p>
          <h1 className="text-[#FFFDFD] text-[32px] md:text-[52px] lg:text-[72px] font-medium leading-tight" style={vs}>Events &amp; Services</h1>
          <p className="text-[#FFFDFD]/80 text-[15px] md:text-[18px] font-normal leading-[1.7] max-w-[600px]" style={vs}>
            Stay connected with everything happening at RCCG Rose of Sharon.
          </p>
          {/* Legend */}
          <div className="flex gap-[12px] md:gap-[16px] flex-wrap justify-center mt-[4px]">
            {Object.entries(CAT).map(([k, c]) => (
              <div key={k} className="flex items-center gap-[6px]">
                <div className="size-[8px] rounded-full" style={{ background: c.bg }} />
                <span className="text-[#FFFDFD]/70 text-[11px] md:text-[12px] font-normal" style={vs}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Calendar + Sidebar ── */}
      <section className="bg-[#EEF0F7] px-4 md:px-[32px] lg:px-[64px] py-[32px] md:py-[64px] flex flex-col lg:flex-row gap-[24px] lg:gap-[40px] items-start w-full min-h-screen">

        {/* LEFT — calendar card */}
        <div className="flex-1 min-w-0 rounded-[24px] overflow-hidden shadow-[0_8px_48px_rgba(0,0,128,0.10)] bg-white">

          {/* Month nav */}
          <div className="bg-[#000080] flex items-center justify-between px-[20px] md:px-[32px] py-[20px] md:py-[28px]">
            <button onClick={prev} aria-label="Previous month"
              className="size-[40px] md:size-[44px] rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex flex-col items-center gap-[2px]">
              <h2 className="text-[#FFFDFD] text-[22px] md:text-[32px] font-bold leading-none" style={vs}>{MONTHS[month]}</h2>
              <span className="text-[#B5B5F3] text-[14px] md:text-[16px] font-normal" style={vs}>{year}</span>
            </div>
            <button onClick={next} aria-label="Next month"
              className="size-[40px] md:size-[44px] rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Day-of-week header */}
          <div className="grid grid-cols-7 bg-[#000080]/5 border-b border-[#000080]/10">
            {DAYS.map(d => (
              <div key={d} className="py-[8px] md:py-[10px] text-center text-[#000080] text-[10px] md:text-[12px] font-bold uppercase tracking-widest" style={vs}>{d}</div>
            ))}
          </div>

          {/* Day cells */}
          {loading ? (
            <div className="flex items-center justify-center py-[100px]">
              <div className="size-[48px] rounded-full border-4 border-[#000080] border-t-transparent animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-7">
              {Array.from({ length: firstDow }).map((_, i) => (
                <div key={`pad-${i}`} className="h-[60px] md:h-[80px] lg:h-[108px] border-b border-r border-gray-100 bg-gray-50/50" />
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
                      "h-[60px] md:h-[80px] lg:h-[108px] p-[6px] md:p-[10px] flex flex-col items-start text-left transition-all border-b border-r border-gray-100 group relative overflow-hidden",
                      isLastCol ? "border-r-0" : "",
                      isSelected ? "bg-[#000080]/8 ring-2 ring-inset ring-[#000080]" : "hover:bg-[#000080]/4",
                    ].join(" ")}
                  >
                    <span className={[
                      "text-[11px] md:text-[13px] font-bold w-[24px] h-[24px] md:w-[28px] md:h-[28px] flex items-center justify-center rounded-full flex-shrink-0 z-10",
                      isToday    ? "bg-[#000080] text-white shadow-[0_2px_8px_rgba(0,0,128,0.4)]" :
                      isSelected ? "bg-[#000080]/15 text-[#000080]" :
                      isPast     ? "text-[#C0BFCF]" : "text-[#100E1A]",
                    ].join(" ")} style={vs}>{day}</span>

                    <div className="hidden md:flex flex-col gap-[2px] w-full mt-[4px] overflow-hidden">
                      {dayEvts.slice(0, 2).map((ev, idx) => {
                        const cfg = CAT[ev.eventCategory ?? ""] ?? CAT.SERVICE;
                        return (
                          <div key={idx} className="flex items-center gap-[4px] w-full overflow-hidden rounded-[3px] px-[4px] py-[1px]" style={{ background: cfg.light }}>
                            <div className="size-[5px] rounded-full flex-shrink-0" style={{ background: cfg.bg }} />
                            <span className="text-[10px] font-semibold truncate leading-tight" style={{ color: cfg.bg, ...vs }}>
                              {ev.title}
                            </span>
                          </div>
                        );
                      })}
                      {dayEvts.length > 2 && (
                        <span className="text-[10px] font-medium text-[#A3A1AF] pl-[4px]" style={vs}>+{dayEvts.length - 2} more</span>
                      )}
                    </div>

                    {/* Mobile: dot indicator only */}
                    {dayEvts.length > 0 && (
                      <div className="md:hidden absolute bottom-[4px] left-1/2 -translate-x-1/2 size-[4px] rounded-full bg-[#000080]" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Selected-day event detail panel */}
          {selected && (
            <div className="border-t-2 border-[#000080]/10 bg-[#F8F8FF]">
              <div className="px-[20px] md:px-[32px] pt-[24px] pb-[8px] flex items-center justify-between">
                <h3 className="text-[#100E1A] text-[14px] md:text-[16px] font-bold" style={vs}>{formatFull(selected)}</h3>
                <button onClick={() => setSelected(null)} className="text-[#A3A1AF] hover:text-[#100E1A] transition-colors text-[20px] leading-none">×</button>
              </div>

              {selectedEvts.length === 0 ? (
                <p className="px-[20px] md:px-[32px] pb-[24px] text-[#A3A1AF] text-[14px]" style={vs}>No events scheduled for this day.</p>
              ) : (
                <div className="px-[20px] md:px-[32px] pb-[24px] flex flex-col gap-[12px]">
                  {selectedEvts.map((ev, i) => {
                    const cfg = CAT[ev.eventCategory ?? ""] ?? CAT.SERVICE;
                    return (
                      <div key={i} className="bg-white rounded-[16px] p-[16px] md:p-[20px] flex gap-[16px] items-start shadow-[0_2px_12px_rgba(0,0,128,0.07)]">
                        <div className="w-[4px] self-stretch rounded-full flex-shrink-0" style={{ background: cfg.bg }} />
                        <div className="flex flex-col gap-[6px] flex-1 min-w-0">
                          <div className="flex items-center gap-[8px] flex-wrap">
                            <span className="text-[#100E1A] text-[15px] md:text-[17px] font-bold" style={vs}>{ev.title}</span>
                            <span className="px-[10px] py-[3px] rounded-full text-[11px] font-semibold text-white" style={{ background: cfg.bg }}>
                              {cfg.label}
                            </span>
                          </div>
                          {ev.topic && <p className="text-[#A3A1AF] text-[13px]" style={vs}>📖 {ev.topic}</p>}
                          {ev.preacher && <p className="text-[#A3A1AF] text-[13px]" style={vs}>🎤 {ev.preacher}</p>}
                          {ev.startTime != null && (
                            <p className="text-[#000080] text-[13px] font-semibold" style={vs}>
                              🕐 {formatTime(ev.startTime)}{ev.endTime != null ? ` – ${formatTime(ev.endTime)}` : ""}
                            </p>
                          )}
                          {ev.locationType === "VIRTUAL" && ev.virtualMeetingLink && (
                            <a href={ev.virtualMeetingLink} target="_blank" rel="noopener noreferrer"
                              className="text-[#000080] text-[13px] hover:underline" style={vs}>🔗 Join Online</a>
                          )}
                          {ev.locationType !== "VIRTUAL" && ev.city && (
                            <p className="text-[#A3A1AF] text-[13px]" style={vs}>📍 {[ev.street, ev.city, ev.state].filter(Boolean).join(", ")}</p>
                          )}
                          {ev.additionalInstructions && (
                            <p className="text-[#A3A1AF] text-[13px] italic" style={vs}>{ev.additionalInstructions}</p>
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
        <div className="w-full lg:w-[340px] lg:flex-shrink-0 flex flex-col gap-[24px]">

          <button onClick={goToday}
            className="w-full py-[14px] rounded-[30px] bg-[#000080] text-[#FFFDFD] text-[15px] font-medium hover:bg-[#0000a0] transition-colors shadow-[0_4px_16px_rgba(0,0,128,0.25)]"
            style={vs}
          >
            Jump to Today
          </button>

          <div className="flex flex-col gap-[4px]">
            <p className="text-[#000080] text-[12px] font-normal uppercase tracking-[0.2em]" style={vs}>What&apos;s Next</p>
            <h2 className="text-[#100E1A] text-[22px] md:text-[24px] font-bold" style={vs}>Upcoming Events</h2>
          </div>

          {loading && (
            <div className="flex flex-col gap-[12px]">
              {[0, 1, 2].map(i => <div key={i} className="bg-white rounded-[16px] h-[80px] animate-pulse shadow-sm" />)}
            </div>
          )}

          {!loading && upcoming.length === 0 && (
            <div className="bg-white rounded-[16px] p-[24px] text-center shadow-sm">
              <p className="text-[#A3A1AF] text-[14px]" style={vs}>No upcoming events this month.</p>
            </div>
          )}

          <div className="flex flex-col gap-[10px]">
            {upcoming.map((ev, i) => {
              const cfg = CAT[ev.eventCategory ?? ""] ?? CAT.SERVICE;
              const d   = ev.date ? new Date(ev.date + "T00:00:00") : null;
              const isActive = selected === ev.date;
              return (
                <button
                  key={i}
                  onClick={() => { if (ev.date) { setSelected(isActive ? null : ev.date); setYear(d!.getFullYear()); setMonth(d!.getMonth()); } }}
                  className={[
                    "bg-white rounded-[16px] p-[16px] flex items-center gap-[14px] text-left w-full transition-all",
                    isActive
                      ? "shadow-[0_4px_20px_rgba(0,0,128,0.18)] ring-2 ring-[#000080]"
                      : "shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(0,0,128,0.12)]",
                  ].join(" ")}
                >
                  <div className="flex-shrink-0 w-[50px] h-[54px] rounded-[12px] flex flex-col items-center justify-center" style={{ background: cfg.bg }}>
                    {d && <>
                      <span className="text-white/70 text-[9px] font-semibold uppercase tracking-wider" style={vs}>
                        {d.toLocaleDateString("en-GB", { month: "short" })}
                      </span>
                      <span className="text-white text-[22px] font-bold leading-none" style={vs}>{d.getDate()}</span>
                      <span className="text-white/60 text-[9px]" style={vs}>
                        {d.toLocaleDateString("en-GB", { weekday: "short" })}
                      </span>
                    </>}
                  </div>
                  <div className="flex flex-col gap-[3px] flex-1 min-w-0">
                    <span className="text-[#100E1A] text-[14px] font-bold truncate leading-tight" style={vs}>{ev.title}</span>
                    {ev.startTime != null && (
                      <span className="text-[#000080] text-[12px] font-semibold" style={vs}>{formatTime(ev.startTime)}</span>
                    )}
                    <div className="flex items-center gap-[6px]">
                      <div className="size-[6px] rounded-full flex-shrink-0" style={{ background: cfg.bg }} />
                      <span className="text-[#A3A1AF] text-[11px]" style={vs}>{cfg.label}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bg-[#000080] rounded-[20px] p-[24px] flex flex-col gap-[12px]">
            <p className="text-[#B5B5F3] text-[12px] uppercase tracking-widest" style={vs}>Never Miss a Service</p>
            <p className="text-[#FFFDFD] text-[18px] font-bold leading-snug" style={vs}>
              Get notified about upcoming events &amp; special services
            </p>
            <a href="/e-member"
              className="bg-[#FFFDFD] text-[#000080] text-[14px] font-bold px-[20px] py-[10px] rounded-[20px] text-center hover:bg-[#B5B5F3] transition-colors"
              style={vs}
            >
              Become an E-Member →
            </a>
          </div>
        </div>
      </section>

      {/* ── Scripture ── */}
      <section className="bg-[#100E1A] px-6 md:px-[60px] lg:px-[120px] py-[48px] md:py-[64px] flex flex-col gap-[16px] items-center w-full text-center">
        <p className="text-[#FFFDFD] text-[18px] md:text-[22px] lg:text-[24px] font-normal italic leading-[1.6] max-w-[700px]" style={{ fontFamily: "'Playfair Display', serif" }}>
          &ldquo;Not neglecting to meet together, as is the habit of some, but encouraging one another.&rdquo;
        </p>
        <p className="text-[#B5B5F3] text-[13px] md:text-[15px] font-semibold uppercase tracking-widest" style={vs}>Hebrews 10:25</p>
      </section>

      <Footer />
    </main>
  );
}
