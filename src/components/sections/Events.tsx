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
    <section id="calendar" className="bg-[#D2D2E2] px-[120px] py-[84px] flex flex-col gap-[32px] w-full">
      <h2
        className="text-[#100E1A] text-[48px] font-bold text-center leading-normal"
        style={{ fontVariationSettings: '"wdth" 100' }}
      >
        Events
      </h2>

      <div className="flex flex-col gap-[24px]">
        {loading && [0, 1, 2].map((i) => (
          <div key={i} className="flex items-center p-[12px] rounded-[30px] bg-[#FFFDFD]/40 animate-pulse h-[64px]" />
        ))}

        {!loading && useFallback && fallback.map((event, i) => (
          <div
            key={i}
            className={`flex items-center p-[12px] rounded-[30px] ${event.highlight ? "bg-[#000080]/80" : "bg-[#FFFDFD]/70"}`}
          >
            <div className="w-[210px] px-[12px] py-[8px]">
              <span className={`text-[25px] font-normal leading-normal ${event.highlight ? "text-[#FFFDFD]" : "text-[#00003D]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
                {event.date}
              </span>
            </div>
            <div className="w-[345px] px-[12px] py-[8px]">
              <span className={`text-[25px] font-bold leading-[32.5px] ${event.highlight ? "text-[#FFFDFD]" : "text-[#00003D]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
                {event.title}
              </span>
            </div>
            <div className="w-[130px] px-[12px] py-[8px]">
              <span className={`text-[25px] font-normal leading-normal ${event.highlight ? "text-[#FFFDFD]" : "text-[#00003D]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
                {event.time}
              </span>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Link href="/events" className="px-[32px] py-[12px] bg-[#FFFDFD] text-[#000080] text-base font-bold rounded-[30px] hover:bg-gray-100 transition-colors whitespace-nowrap">
                I Will be There
              </Link>
              <Link href="/events" className={`px-[32px] py-[12px] text-base font-normal rounded-[30px] transition-colors whitespace-nowrap ${event.highlight ? "text-[#FFFDFD]/65 hover:text-[#FFFDFD]" : "text-[#00003D]/65 hover:text-[#00003D]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
                View Details
              </Link>
            </div>
          </div>
        ))}

        {!loading && !useFallback && events.map((event, i) => {
          const highlight = i % 2 === 0;
          const title = event.title ?? event.name ?? "Church Event";
          const date = formatDate(event.startDate ?? event.date);
          const time = formatTime(event.startTime);
          return (
            <div
              key={event.id ?? i}
              className={`flex items-center p-[12px] rounded-[30px] ${highlight ? "bg-[#000080]/80" : "bg-[#FFFDFD]/70"}`}
            >
              <div className="w-[210px] px-[12px] py-[8px]">
                <span className={`text-[25px] font-normal leading-normal ${highlight ? "text-[#FFFDFD]" : "text-[#00003D]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
                  {date}
                </span>
              </div>
              <div className="w-[345px] px-[12px] py-[8px]">
                <span className={`text-[25px] font-bold leading-[32.5px] ${highlight ? "text-[#FFFDFD]" : "text-[#00003D]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
                  {title}
                </span>
              </div>
              <div className="w-[130px] px-[12px] py-[8px]">
                <span className={`text-[25px] font-normal leading-normal ${highlight ? "text-[#FFFDFD]" : "text-[#00003D]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
                  {time}
                </span>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <Link href="/events" className="px-[32px] py-[12px] bg-[#FFFDFD] text-[#000080] text-base font-bold rounded-[30px] hover:bg-gray-100 transition-colors whitespace-nowrap">
                  I Will be There
                </Link>
                <Link href="/events" className={`px-[32px] py-[12px] text-base font-normal rounded-[30px] transition-colors whitespace-nowrap ${highlight ? "text-[#FFFDFD]/65 hover:text-[#FFFDFD]" : "text-[#00003D]/65 hover:text-[#00003D]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center">
        <Link
          href="/events"
          className="text-[#000080] text-[25px] font-medium leading-normal hover:underline"
          style={{ fontVariationSettings: '"wdth" 100' }}
        >
          View all
        </Link>
      </div>
    </section>
  );
}
