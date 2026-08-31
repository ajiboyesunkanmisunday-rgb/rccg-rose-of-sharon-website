"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API_BASE } from "@/lib/api";

const vs = { fontVariationSettings: '"wdth" 100' };

interface CalendarEvent {
  id?: string;
  title?: string;
  name?: string;
  preacher?: string;
  speaker?: string;
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
  return `${h12}:${m} ${ampm}`;
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
  { title: "Sunday Service", preacher: "Pastor Emeka Obiagwu", date: "Every Sunday", time: "7:45 AM", highlight: true },
  { title: "Digging Deep", preacher: "Pastor Emeka Obiagwu", date: "Every Wednesday", time: "6:30 PM", highlight: false },
  { title: "Congregational Vigil", preacher: "Pastor Emeka Obiagwu", date: "Monthly", time: "10:00 PM", highlight: true },
];

interface EventRowProps {
  highlight: boolean;
  title: string;
  preacher: string;
  date: string;
  time: string;
}

function EventRow({ highlight, title, preacher, date, time }: EventRowProps) {
  const baseText = highlight ? "text-[#FFFDFD]" : "text-[#00003D]";
  const mutedText = highlight ? "text-[#FFFDFD]/65" : "text-[#00003D]/65";
  const bg = highlight ? "bg-[#000080]/80" : "bg-[#FFFDFD]/70";

  return (
    <div className={`${bg} rounded-[20px] md:rounded-[24px] p-4 md:p-[12px]`}>
      {/* Mobile layout */}
      <div className="flex flex-col gap-2 md:hidden">
        <p className={`text-[17px] font-bold ${baseText}`} style={vs}>{title}</p>
        <p className={`text-[13px] font-normal ${mutedText}`} style={vs}>{preacher}</p>
        <div className="flex items-center justify-between">
          <p className={`text-[13px] font-normal ${mutedText}`} style={vs}>{date} · {time}</p>
          <Link href="/events" className={`text-[13px] font-medium underline ${baseText} hover:opacity-80`} style={vs}>
            View Details
          </Link>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex items-center">
        <div className="flex-1 min-w-0 px-[12px] py-[10px]">
          <span className={`text-[18px] lg:text-[22px] font-bold leading-tight ${baseText}`} style={vs}>{title}</span>
        </div>
        <div className="w-[200px] lg:w-[240px] px-[12px] py-[10px] flex-shrink-0">
          <span className={`text-[16px] lg:text-[18px] font-normal leading-normal ${mutedText}`} style={vs}>{preacher}</span>
        </div>
        <div className="w-[150px] lg:w-[180px] px-[12px] py-[10px] flex-shrink-0">
          <span className={`text-[16px] lg:text-[18px] font-normal leading-normal ${mutedText}`} style={vs}>{date}</span>
        </div>
        <div className="w-[100px] lg:w-[120px] px-[12px] py-[10px] flex-shrink-0">
          <span className={`text-[16px] lg:text-[18px] font-normal leading-normal ${mutedText}`} style={vs}>{time}</span>
        </div>
        <div className="flex-shrink-0 px-[12px]">
          <Link
            href="/events"
            className={`px-[20px] py-[10px] text-[14px] font-medium rounded-[20px] transition-colors whitespace-nowrap ${
              highlight
                ? "border border-[#FFFDFD]/40 text-[#FFFDFD] hover:bg-[#FFFDFD]/10"
                : "border border-[#00003D]/30 text-[#00003D] hover:bg-[#00003D]/10"
            }`}
            style={vs}
          >
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
    <section id="calendar" className="bg-[#D2D2E2] px-4 md:px-[60px] lg:px-[120px] py-[72px] md:py-[96px] flex flex-col gap-[36px] w-full">
      <h2
        className="reveal text-[#100E1A] text-[28px] md:text-[40px] lg:text-[50px] font-bold text-center leading-[1.1] tracking-[-0.02em]"
        style={vs}
      >
        Upcoming Services
      </h2>

      <div className="reveal reveal-delay-1 flex flex-col gap-[12px] md:gap-[16px]">
        {loading && [0, 1, 2].map((i) => (
          <div key={i} className="flex items-center p-[12px] rounded-[24px] bg-[#FFFDFD]/40 animate-pulse h-[64px]" />
        ))}

        {!loading && useFallback && fallback.map((event, i) => (
          <EventRow
            key={i}
            highlight={event.highlight}
            title={event.title}
            preacher={event.preacher}
            date={event.date}
            time={event.time}
          />
        ))}

        {!loading && !useFallback && events.map((event, i) => (
          <EventRow
            key={event.id ?? i}
            highlight={i % 2 === 0}
            title={event.title ?? event.name ?? "Church Event"}
            preacher={event.preacher ?? event.speaker ?? ""}
            date={formatDate(event.startDate ?? event.date)}
            time={formatTime(event.startTime)}
          />
        ))}
      </div>

      <div className="flex items-center justify-center">
        <Link
          href="/events"
          className="text-[#000080] text-[18px] md:text-[22px] font-medium leading-normal hover:underline"
          style={vs}
        >
          View all services
        </Link>
      </div>
    </section>
  );
}
