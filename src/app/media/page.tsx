"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Podcast from "@/components/sections/Podcast";
import Footer from "@/components/layout/Footer";
import { API_BASE } from "@/lib/api";

const vs = { fontVariationSettings: '"wdth" 100' };

interface MediaItem {
  id: string;
  title?: string;
  displayName?: string;
  speaker?: string;
  date?: string;
  description?: string;
  displayUrl?: string;
  thumbnailUrl?: string;
  mediaCategory?: string;
  duration?: number;
}

const staticSermons = [
  { title: "The Power of Faith", speaker: "Pastor E.A Adeboye", date: "Nov 24, 2024", img: "/assets/gallery-1.png" },
  { title: "Walking in His Light", speaker: "Pastor Emeka Obiagwu", date: "Nov 17, 2024", img: "/assets/gallery-2.png" },
  { title: "I Will Build My Church", speaker: "Pastor E.A Adeboye", date: "Nov 10, 2024", img: "/assets/gallery-3.png" },
  { title: "With Wings Like an Eagle", speaker: "Pastor E.A Adeboye", date: "Nov 3, 2024", img: "/assets/gallery-4.png" },
  { title: "Power of Praise", speaker: "Pastor Emeka Obiagwu", date: "Oct 27, 2024", img: "/assets/gallery-5.png" },
  { title: "The Holy Spirit", speaker: "Pastor E.A Adeboye", date: "Oct 20, 2024", img: "/assets/gallery-6.png" },
  { title: "Walking with God", speaker: "Pastor E.A Adeboye", date: "Oct 13, 2024", img: "/assets/gallery-7.png" },
  { title: "I'm in Your Mind", speaker: "Pastor Emeka Obiagwu", date: "Oct 6, 2024", img: "/assets/gallery-8.png" },
  { title: "Covenant of Blessing", speaker: "Pastor E.A Adeboye", date: "Sep 29, 2024", img: "/assets/gallery-9.png" },
  { title: "The Name Above All Names", speaker: "Pastor E.A Adeboye", date: "Sep 22, 2024", img: "/assets/gallery-10.png" },
  { title: "Standing on the Word", speaker: "Pastor Emeka Obiagwu", date: "Sep 15, 2024", img: "/assets/gallery-11.png" },
  { title: "New Season, New Beginning", speaker: "Pastor E.A Adeboye", date: "Sep 8, 2024", img: "/assets/gallery-12.png" },
];

const staticImgs = staticSermons.map((s) => s.img);

function formatDate(d?: string) {
  if (!d) return "";
  try { return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }); }
  catch { return d; }
}

function formatDuration(secs?: number) {
  if (!secs) return "";
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("ALL");

  useEffect(() => {
    fetch(`${API_BASE}/media?pageSize=24`)
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => setMedia(Array.isArray(data) ? data : data.content ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = ["ALL", ...Array.from(new Set(media.map((m) => m.mediaCategory).filter((c): c is string => Boolean(c))))];
  const filtered = activeCategory === "ALL" ? media : media.filter((m) => m.mediaCategory === activeCategory);
  const useLive = !loading && media.length > 0;

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[735px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/assets/hero-bg.png" alt="" fill className="object-cover pointer-events-none" />
          <div className="absolute inset-0 bg-[rgba(16,14,26,0.65)]" />
        </div>
        <Navbar activePage="media" />
        <div className="absolute left-1/2 top-[calc(50%+58px)] -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[84px] items-center justify-center w-[1148px] z-10">
          <div className="flex flex-col gap-[32px] items-start w-full text-center text-white">
            <h1 className="text-[#FFFDFD] text-[84px] font-medium leading-normal w-full" style={vs}>
              Oaks of Righteousness
            </h1>
            <p className="text-[#FFFDFD] text-[25px] font-normal leading-[32px] w-full" style={vs}>
              Watch and be inspired — sermons, teachings and messages from the house of God.
            </p>
          </div>
          <div className="flex gap-[16px] items-center">
            <Link
              href="#sermons"
              className="flex items-center gap-[5px] px-[32px] py-[16px] bg-[#000080] text-[#FFFDFD] text-[25px] font-medium rounded-[35px] drop-shadow-[19px_19px_20px_rgba(0,0,0,0.1)] hover:bg-[#0000a0] transition-colors"
              style={vs}
            >
              <div className="relative size-[29px] flex-shrink-0">
                <Image src="/assets/play-filled.svg" alt="" fill />
              </div>
              Watch Sermon
            </Link>
            <a
              href="https://www.youtube.com/@rccgrostv"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-[5px] px-[32px] py-[16px] border-2 border-[#B5B5F3] text-[#B5B5F3] text-[20px] font-medium rounded-[35px] hover:bg-[#B5B5F3]/10 transition-colors"
              style={vs}
            >
              YouTube Channel
            </a>
          </div>
        </div>
      </section>

      {/* Media Grid */}
      <section id="sermons" className="bg-[#100E1A] px-[120px] py-[84px] flex flex-col gap-[32px] items-center w-full">
        <h2 className="text-[#FFFDFD] text-[48px] font-bold leading-normal text-center w-full" style={vs}>
          Media
        </h2>

        {/* Category filter tabs — only when live data has categories */}
        {useLive && categories.length > 1 && (
          <div className="flex gap-[8px] flex-wrap justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-[20px] py-[8px] rounded-full text-[14px] font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-[#000080] text-[#FFFDFD]"
                    : "border border-[#B5B5F3]/30 text-[#A3A1AF] hover:border-[#B5B5F3] hover:text-[#B5B5F3]"
                }`}
                style={vs}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="grid gap-[20px] w-full" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {[1,2,3,4,5,6,7,8].map((i) => (
              <div key={i} className="rounded-[12px] bg-[#1a1826] h-[240px] animate-pulse" />
            ))}
          </div>
        )}

        {/* Live media grid */}
        {useLive && (
          <div className="grid gap-[20px] w-full" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {filtered.map((item, i) => {
              const href = item.displayUrl || "https://www.youtube.com/@rccgrostv";
              const isExternal = !item.displayUrl || item.displayUrl.startsWith("http");
              return (
                <a
                  key={item.id}
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="flex flex-col overflow-hidden rounded-[12px] bg-[#1a1826] cursor-pointer group hover:scale-[1.02] transition-transform"
                >
                  <div className="relative h-[180px] w-full overflow-hidden bg-[#0d0c18]">
                    {item.thumbnailUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title || ""}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <Image
                        src={staticImgs[i % staticImgs.length]}
                        alt={item.title || ""}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    <div className="absolute inset-0 bg-[rgba(0,0,128,0.35)] flex items-center justify-center">
                      <div className="size-[48px] rounded-full bg-[rgba(0,0,128,0.8)] flex items-center justify-center">
                        <div className="relative size-[24px]">
                          <Image src="/assets/play-filled.svg" alt="" fill />
                        </div>
                      </div>
                    </div>
                    {item.duration && (
                      <div className="absolute bottom-[8px] right-[8px] bg-[rgba(0,0,0,0.75)] px-[6px] py-[2px] rounded text-[#FFFDFD] text-[12px]" style={vs}>
                        {formatDuration(item.duration)}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-[8px] p-[16px]">
                    <p className="text-[#FFFDFD] text-[16px] font-bold leading-[1.3] line-clamp-2" style={vs}>
                      {item.title || item.displayName || "Untitled"}
                    </p>
                    {item.speaker && (
                      <p className="text-[#A3A1AF] text-[13px] font-normal leading-normal" style={vs}>{item.speaker}</p>
                    )}
                    {item.date && (
                      <p className="text-[#A3A1AF] text-[12px] font-normal leading-normal" style={vs}>{formatDate(item.date)}</p>
                    )}
                    {item.mediaCategory && (
                      <span className="self-start px-[8px] py-[2px] rounded-full bg-[#000080]/50 text-[#B5B5F3] text-[11px] uppercase tracking-wide" style={vs}>
                        {item.mediaCategory}
                      </span>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {/* Fallback static grid */}
        {!loading && !useLive && (
          <div className="grid gap-[20px] w-full" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {staticSermons.map((sermon, i) => (
              <a key={i} href="https://www.youtube.com/@rccgrostv" target="_blank" rel="noopener noreferrer"
                className="flex flex-col overflow-hidden rounded-[12px] bg-[#1a1826] cursor-pointer group hover:scale-[1.02] transition-transform">
                <div className="relative h-[180px] w-full overflow-hidden">
                  <Image src={sermon.img} alt={sermon.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-[rgba(0,0,128,0.35)] flex items-center justify-center">
                    <div className="size-[48px] rounded-full bg-[rgba(0,0,128,0.8)] flex items-center justify-center">
                      <div className="relative size-[24px]"><Image src="/assets/play-filled.svg" alt="" fill /></div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-[8px] p-[16px]">
                  <p className="text-[#FFFDFD] text-[16px] font-bold leading-[1.3] line-clamp-2" style={vs}>{sermon.title}</p>
                  <p className="text-[#A3A1AF] text-[13px] font-normal leading-normal" style={vs}>{sermon.speaker}</p>
                  <p className="text-[#A3A1AF] text-[12px] font-normal leading-normal" style={vs}>{sermon.date}</p>
                </div>
              </a>
            ))}
          </div>
        )}

        <a
          href="https://www.youtube.com/@rccgrostv"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#000080] drop-shadow-[19px_19px_20px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center px-[32px] py-[16px] rounded-[35px] flex-shrink-0 hover:bg-[#0000a0] transition-colors"
        >
          <span className="text-[#FFFDFD] text-[25px] font-medium leading-normal text-center whitespace-nowrap" style={vs}>
            View More on YouTube
          </span>
        </a>
      </section>

      <Podcast />
      <Footer />
    </main>
  );
}
