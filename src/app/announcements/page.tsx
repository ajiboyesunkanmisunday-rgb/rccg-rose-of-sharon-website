"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { API_BASE } from "@/lib/api";

const vs = { fontVariationSettings: '"wdth" 100' };

interface Announcement {
  id: string;
  subject: string;
  content: string;
  startDate?: string;
  endDate?: string;
  createdOn?: string;
}

function formatDate(d?: string) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return d;
  }
}

export default function AnnouncementsPage() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/announcements/read`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => setItems(Array.isArray(data) ? data : data.content ?? []))
      .catch(() => setError("Unable to load announcements at this time."))
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
          <p className="text-[#B5B5F3] text-[16px] font-normal uppercase tracking-[0.15em]" style={vs}>Stay Informed</p>
          <h1 className="text-[#FFFDFD] text-[72px] font-medium leading-normal w-full" style={vs}>Announcements</h1>
          <p className="text-[#FFFDFD] text-[20px] font-normal leading-[32px]" style={vs}>
            Latest news, updates and notices from the house of God.
          </p>
        </div>
      </section>

      {/* Announcements list */}
      <section className="bg-[#100E1A] px-[120px] py-[84px] flex flex-col gap-[32px] items-center w-full min-h-[400px]">
        <div className="flex items-center gap-[8px]">
          <Link href="/" className="text-[#B5B5F3] text-[16px] hover:underline" style={vs}>Home</Link>
          <span className="text-[#A3A1AF]">/</span>
          <span className="text-[#FFFDFD] text-[16px]" style={vs}>Announcements</span>
        </div>

        {loading && (
          <div className="flex flex-col gap-[20px] w-full max-w-[900px]">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[140px] rounded-[16px] bg-[#1a1826] animate-pulse" />
            ))}
          </div>
        )}

        {error && (
          <p className="text-[#A3A1AF] text-[18px] text-center" style={vs}>{error}</p>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="flex flex-col gap-[16px] items-center py-[48px] text-center">
            <p className="text-[#FFFDFD] text-[25px] font-medium" style={vs}>No current announcements</p>
            <p className="text-[#A3A1AF] text-[16px]" style={vs}>Check back soon for updates from the church.</p>
            <Link href="/" className="text-[#B5B5F3] text-[16px] hover:underline mt-[8px]" style={vs}>← Back to Home</Link>
          </div>
        )}

        {!loading && items.length > 0 && (
          <div className="flex flex-col gap-[20px] w-full max-w-[900px]">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className="bg-[#1a1826] rounded-[16px] p-[32px] flex flex-col gap-[16px] border border-[#B5B5F3]/10 hover:border-[#B5B5F3]/25 transition-colors"
              >
                <div className="flex items-start justify-between gap-[16px]">
                  <div className="flex items-center gap-[12px]">
                    <div className="size-[40px] rounded-full bg-[#000080] flex items-center justify-center flex-shrink-0">
                      <span className="text-[#FFFDFD] text-[16px] font-bold" style={vs}>{idx + 1}</span>
                    </div>
                    <h2 className="text-[#FFFDFD] text-[22px] font-bold leading-[1.3]" style={vs}>
                      {item.subject}
                    </h2>
                  </div>
                  {item.startDate && (
                    <div className="bg-[#000080]/40 px-[12px] py-[6px] rounded-full flex-shrink-0">
                      <span className="text-[#B5B5F3] text-[13px] font-normal whitespace-nowrap" style={vs}>
                        {formatDate(item.startDate)}
                        {item.endDate && item.endDate !== item.startDate
                          ? ` – ${formatDate(item.endDate)}`
                          : ""}
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-[#A3A1AF] text-[16px] font-normal leading-[1.7] whitespace-pre-line" style={vs}>
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
