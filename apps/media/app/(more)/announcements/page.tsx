"use client";

import { Hero } from "@ros/shared/kit/ui";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "@ros/shared/link";
import { API_BASE } from "@ros/shared/api";


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
    <div>
      <Hero pill="🌍 STAY INFORMED" title={<>Announcements</>} subtitle="Latest news, updates and notices from the house of God." bg="/assets/hero-bg.png" />

      {/* Announcements list */}
      <section className="ros:bg-[#000000] ros:px-4 ros:sm:px-[40px] ros:lg:px-[80px] ros:xl:px-[120px] ros:py-[60px] ros:md:py-[84px] ros:flex ros:flex-col ros:gap-[32px] ros:items-center ros:w-full ros:min-h-[400px]">
        <div className="ros:flex ros:items-center ros:gap-[8px]">
          <Link href="/" className="ros:text-[#FFFFFFB3] ros:text-[16px] ros:hover:underline">Home</Link>
          <span className="ros:text-[#A3A1AF]">/</span>
          <span className="ros:text-[#FFFDFD] ros:text-[16px]">Announcements</span>
        </div>

        {loading && (
          <div className="ros:flex ros:flex-col ros:gap-[20px] ros:w-full ros:max-w-[900px]">
            {[1, 2, 3].map((i) => (
              <div key={i} className="ros:h-[140px] ros:rounded-[16px] ros:bg-[#111111] ros:animate-pulse" />
            ))}
          </div>
        )}

        {error && (
          <p className="ros:text-[#A3A1AF] ros:text-[18px] ros:text-center">{error}</p>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="ros:flex ros:flex-col ros:gap-[16px] ros:items-center ros:py-[48px] ros:text-center">
            <p className="ros:text-[#FFFDFD] ros:text-[25px] ros:font-medium">No current announcements</p>
            <p className="ros:text-[#A3A1AF] ros:text-[16px]">Check back soon for updates from the church.</p>
            <Link href="/" className="ros:text-[#FFFFFFB3] ros:text-[16px] ros:hover:underline ros:mt-[8px]">← Back to Home</Link>
          </div>
        )}

        {!loading && items.length > 0 && (
          <div className="ros:flex ros:flex-col ros:gap-[20px] ros:w-full ros:max-w-[900px]">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className="ros:bg-[#111111] ros:rounded-[16px] ros:p-[32px] ros:flex ros:flex-col ros:gap-[16px] ros:border ros:border-[#FFFFFFB3]/10 ros:hover:border-[#FFFFFFB3]/25 ros:transition-colors"
              >
                <div className="ros:flex ros:flex-col ros:sm:flex-row ros:items-start ros:sm:justify-between ros:gap-[12px] ros:sm:gap-[16px]">
                  <div className="ros:flex ros:items-center ros:gap-[12px]">
                    <div className="ros:size-[40px] ros:rounded-full ros:bg-[#DF4E4E] ros:flex ros:items-center ros:justify-center ros:flex-shrink-0">
                      <span className="ros:text-[#FFFDFD] ros:text-[16px] ros:font-bold">{idx + 1}</span>
                    </div>
                    <h2 className="ros:text-[#FFFDFD] ros:text-[18px] ros:md:text-[22px] ros:font-bold ros:leading-[1.3]">
                      {item.subject}
                    </h2>
                  </div>
                  {item.startDate && (
                    <div className="ros:bg-[#DF4E4E]/40 ros:px-[12px] ros:py-[6px] ros:rounded-full ros:flex-shrink-0">
                      <span className="ros:text-[#FFFFFFB3] ros:text-[13px] ros:font-normal ros:whitespace-nowrap">
                        {formatDate(item.startDate)}
                        {item.endDate && item.endDate !== item.startDate
                          ? ` – ${formatDate(item.endDate)}`
                          : ""}
                      </span>
                    </div>
                  )}
                </div>

                <p className="ros:text-[#A3A1AF] ros:text-[16px] ros:font-normal ros:leading-[1.7] ros:whitespace-pre-line">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
