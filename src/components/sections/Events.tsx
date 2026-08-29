"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API_BASE } from "@/lib/api";

interface CalendarEvent {
  id?: string;
  title?: string;
  name?: string;
  startDate?: string;
  date?: string;
  startTime?: number;
  category?: string;
}

function formatTime(t?: number): string {
  if (!t && t !== 0) return "";
  const s = String(t).padStart(4, "0");
  const h = parseInt(s.slice(0, -2), 10);
  const m = s.slice(-2);
  const ampm = h >= 12 ? "pm" : "am";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${m}${ampm}`;
}

function formatDate(d?: string): string {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return d;
  }
}

const fallback = [
  { title: "Sunday Service", date: "Every Sunday", time: "7:45am", highlight: true },
  { title: "Digging Deep", date: "Every Wednesday", time: "6:30pm", highlight: false },
  { title: "Congregational Vigil", date: "Monthly", time: "10:00pm", highlight: true },
];

interface EventRowProps {
  highlight: boolean;
  date: string;
  title: string;
  time: string;
}

function EventRow({ highlight, date, title, time }: EventRowProps) {
  const baseText = highlight ? "text-[#FFFDFD]" : "text-[#00003D]";
  const bg = highlight ? "bg-[#000080]/80" : "bg-[#FFFDFD]/70";

  return (
    <div className={`${bg} rounded-[20px] md:rounded-[30px] p-4 md:p-[12px]`}>
      {/* Mobile layout: stacked */}
      <div className="flex flex-col gap-2 md:hidden">
        <div className="flex items-start justify-between">
          <div>
            <p className={`text-[13px] font-normal ${baseText} opacity-75`} style={{ fontVariationSettings: '"wdth" 100' }}>{date}</p>
            <p className={`text-[17px] font-bold ${baseText}`} style={{ fontVariationSettings: '"wdth" 100' }}>{title}</p>
          </div>
          <span className={`text-[13px] font-normal ${baseText} flex-shrink-0`} style={{ fontVariationSettings: '"wdth" 100' }}>{time}</span>
        </div>
        <div className="flex gap-2">
          <Link href="/events" className="flex-1 text-center px-3 py-2 bg-[#FFFDFD] text-[#000080] text-[13px] font-bold rounded-[20px] hover:bg-gray-100 transition-colors">
            I Will be There
          </Link>
          <Link href="/events" className={`px-3 py-2 text-[13px] font-normal rounded-[20px] transition-colors ${highlight ? "text-[#FFFDFD]/65 hover:text-[#FFFDFD]" : "text-[#00003D]/65 hover:text-[#00003D]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
            View Details
          </Link>
        </div>
      </div>

      {/* Desktop layout: horizontal row */}
      <div className="hidden md:flex items-center">
        <div className="w-[180px] lg:w-[210px] px-[12px] py-[8px]">
          <span className={`text-[18px] lg:text-[25px] font-normal leading-normal ${baseText}`} style={{ fontVariationSettings: '"wdth" 100' }}>{date}</span>
        </div>
        <div className="flex-1 min-w-0 px-[12px] py-[8px]">
          <span className={`text-[18px] lg:text-[25px] font-bold leading-[32.5px] ${baseText}`} style={{ fontVariationSettings: '"wdth" 100' }}>{title}</span>
        </div>
        <div className="w-[120px] lg:w-[130px] px-[12px] py-[8px]">
          <span className={`text-[18px] lg:text-[25px] font-normal leading-normal ${baseText}`} style={{ fontVariationSettings: '"wdth" 100' }}>{time}</span>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <Link href="/events" className="px-4 lg:px-[32px] py-[12px] bg-[#FFFDFD] text-[#000080] text-sm lg:text-base font-bold rounded-[30px] hover:bg-gray-100 transition-colors whitespace-nowrap">
            I Will be There
          </Link>
          <Link href="/events" className={`px-4 lg:px-[32px] py-[12px] text-sm lg:text-base font-normal rounded-[30px] transition-colors whitespace-nowrap ${highlight ? "text-[#FFFDFD]/65 hover:text-[#FFFDFD]" : "text-[#00003D]/65 hover:text-[#00003D]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Events() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/events/calendar/upcoming`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        const list: CalendarEvent[] = Array.isArray(data) ? data : (data?.content ?? []);
        setEvents(list.slice(0, 3));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const useFallback = !loading && events.length === 0;

  return (
    <section id="calendar" className="bg-[#D2D2E2] px-4 md:px-[60px] lg:px-[120px] py-[60px] md:py-[84px] flex flex-col gap-[32px] w-full">
      <h2
        className="text-[#100E1A] text-[28px] md:text-[38px] lg:text-[48px] font-bold text-center leading-normal"
        style={{ fontVariationSettings: '"wdth" 100' }}
      >
        Events
      </h2>

      <div className="flex flex-col gap-[16px] md:gap-[24px]">
        {loading && [0, 1, 2].map((i) => (
          <div key={i} className="flex items-center p-[12px] rounded-[30px] bg-[#FFFDFD]/40 animate-pulse h-[64px]" />
        ))}

        {!loading && useFallback && fallback.map((event, i) => (
          <EventRow key={i} highlight={event.highlight} date={event.date} title={event.title} time={event.time} />
        ))}

        {!loading && !useFallback && events.map((event, i) => (
          <EventRow
            key={event.id ?? i}
            highlight={i % 2 === 0}
            date={formatDate(event.startDate ?? event.date)}
            title={event.title ?? event.name ?? "Church Event"}
            time={formatTime(event.startTime)}
          />
        ))}
      </div>

      <div className="flex items-center justify-center">
        <Link
          href="/events"
          className="text-[#000080] text-[18px] md:text-[25px] font-medium leading-normal hover:underline"
          style={{ fontVariationSettings: '"wdth" 100' }}
        >
          View all
        </Link>
      </div>
    </section>
  );
}
