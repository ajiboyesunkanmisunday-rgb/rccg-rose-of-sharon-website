"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { API_BASE } from "@/lib/api";

const vs = { fontVariationSettings: '"wdth" 100' };

interface EventItem {
  id: string;
  title: string;
  preacher?: string;
  topic?: string;
  eventCategory?: string;
  date: string;
  startTime?: number;
  endTime?: number;
}

function formatTime(t?: number): string {
  if (!t) return "";
  const str = String(t).padStart(4, "0");
  const h = parseInt(str.slice(0, -2));
  const m = str.slice(-2);
  const ampm = h >= 12 ? "pm" : "am";
  const h12 = h % 12 || 12;
  return `${h12}:${m}${ampm}`;
}

function formatDate(d: string): string {
  try {
    return new Date(d).toLocaleDateString("en-GB", {
      weekday: "short", day: "numeric", month: "short", year: "numeric",
    });
  } catch {
    return d;
  }
}

const categoryColors: Record<string, string> = {
  SERVICE: "#000080",
  VIGIL: "#3D0080",
  PROGRAM: "#006080",
  MEETING: "#004040",
};

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/events/calendar/upcoming`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load events");
        return r.json();
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : data.content ?? [];
        setEvents(list);
      })
      .catch(() => setError("Unable to load upcoming events. Please check back later."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[500px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/assets/hero-bg.png" alt="" fill className="object-cover pointer-events-none" priority />
          <div className="absolute inset-0 bg-[rgba(16,14,26,0.75)]" />
        </div>
        <Navbar />
        <div className="absolute left-1/2 top-[calc(50%+48px)] -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[16px] items-center w-[1148px] z-10 text-center">
          <p className="text-[#B5B5F3] text-[16px] font-normal uppercase tracking-[0.15em]" style={vs}>What&apos;s On</p>
          <h1 className="text-[#FFFDFD] text-[72px] font-medium leading-normal w-full" style={vs}>Upcoming Events</h1>
          <p className="text-[#FFFDFD] text-[20px] font-normal leading-[32px]" style={vs}>
            Join us for worship, fellowship and life-changing programs.
          </p>
        </div>
      </section>

      {/* Events list */}
      <section className="bg-[#D2D2E2] px-[120px] py-[84px] flex flex-col gap-[32px] items-center w-full min-h-[400px]">
        <div className="flex items-center gap-[8px]">
          <Link href="/" className="text-[#000080] text-[16px] hover:underline" style={vs}>Home</Link>
          <span className="text-[#A3A1AF]">/</span>
          <span className="text-[#100E1A] text-[16px]" style={vs}>Events</span>
        </div>
        <h2 className="text-[#100E1A] text-[48px] font-bold text-center leading-normal" style={vs}>
          Church Calendar
        </h2>

        {loading && (
          <div className="flex flex-col gap-[16px] w-full">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[72px] rounded-[30px] bg-[#100E1A]/10 animate-pulse w-full" />
            ))}
          </div>
        )}

        {error && (
          <p className="text-[#100E1A]/70 text-[18px] text-center" style={vs}>{error}</p>
        )}

        {!loading && !error && events.length === 0 && (
          <p className="text-[#100E1A]/70 text-[18px] text-center" style={vs}>
            No upcoming events at this time. Check back soon!
          </p>
        )}

        {!loading && events.length > 0 && (
          <div className="flex flex-col gap-[16px] w-full">
            {events.map((event, idx) => {
              const isHighlight = idx % 2 === 0;
              const bg = isHighlight ? `bg-[#000080]/80` : `bg-[#FFFDFD]/70`;
              const textMain = isHighlight ? "text-[#FFFDFD]" : "text-[#00003D]";
              const textMuted = isHighlight ? "text-[#FFFDFD]/75" : "text-[#00003D]/65";
              const catBg = categoryColors[event.eventCategory ?? ""] ?? "#000080";
              return (
                <div key={event.id} className={`flex items-center p-[12px] rounded-[30px] gap-[8px] ${bg}`}>
                  <div className="w-[220px] px-[12px] py-[8px] flex-shrink-0">
                    <span className={`text-[20px] font-normal leading-normal ${textMain}`} style={vs}>
                      {formatDate(event.date)}
                    </span>
                  </div>

                  <div className="flex-1 px-[12px] py-[8px] min-w-0">
                    <p className={`text-[22px] font-bold leading-[1.3] truncate ${textMain}`} style={vs}>
                      {event.title}
                    </p>
                    {event.topic && (
                      <p className={`text-[14px] font-normal leading-normal ${textMuted}`} style={vs}>
                        {event.topic}
                      </p>
                    )}
                    {event.preacher && (
                      <p className={`text-[13px] font-normal leading-normal ${textMuted}`} style={vs}>
                        {event.preacher}
                      </p>
                    )}
                  </div>

                  <div className="w-[120px] px-[12px] py-[8px] flex-shrink-0 text-center">
                    <span className={`text-[18px] font-normal leading-normal ${textMain}`} style={vs}>
                      {formatTime(event.startTime)}
                      {event.endTime ? ` – ${formatTime(event.endTime)}` : ""}
                    </span>
                  </div>

                  {event.eventCategory && (
                    <div
                      className="px-[16px] py-[6px] rounded-full flex-shrink-0"
                      style={{ backgroundColor: catBg }}
                    >
                      <span className="text-[#FFFDFD] text-[12px] font-medium uppercase tracking-wide" style={vs}>
                        {event.eventCategory}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
