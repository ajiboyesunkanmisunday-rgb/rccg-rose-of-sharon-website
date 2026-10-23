"use client";

import { Hero } from "@/app/(site)/(more)/_kit/ui";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Podcast from "@/app/(site)/(more)/_kit/Podcast";
import { API_BASE } from "@/lib/api";


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
  { title: "The Power of Faith", speaker: "Pastor E.A Adeboye", date: "Nov 24, 2024", img: "/assets/gallery-1.jpg" },
  { title: "Walking in His Light", speaker: "Pastor Emeka Obiagwu", date: "Nov 17, 2024", img: "/assets/gallery-2.jpg" },
  { title: "I Will Build My Church", speaker: "Pastor E.A Adeboye", date: "Nov 10, 2024", img: "/assets/gallery-3.jpg" },
  { title: "With Wings Like an Eagle", speaker: "Pastor E.A Adeboye", date: "Nov 3, 2024", img: "/assets/gallery-4.jpg" },
  { title: "Power of Praise", speaker: "Pastor Emeka Obiagwu", date: "Oct 27, 2024", img: "/assets/gallery-5.jpg" },
  { title: "The Holy Spirit", speaker: "Pastor E.A Adeboye", date: "Oct 20, 2024", img: "/assets/gallery-6.jpg" },
  { title: "Walking with God", speaker: "Pastor E.A Adeboye", date: "Oct 13, 2024", img: "/assets/gallery-7.jpg" },
  { title: "I'm in Your Mind", speaker: "Pastor Emeka Obiagwu", date: "Oct 6, 2024", img: "/assets/gallery-8.jpg" },
  { title: "Covenant of Blessing", speaker: "Pastor E.A Adeboye", date: "Sep 29, 2024", img: "/assets/gallery-9.jpg" },
  { title: "The Name Above All Names", speaker: "Pastor E.A Adeboye", date: "Sep 22, 2024", img: "/assets/gallery-10.jpg" },
  { title: "Standing on the Word", speaker: "Pastor Emeka Obiagwu", date: "Sep 15, 2024", img: "/assets/gallery-11.jpg" },
  { title: "New Season, New Beginning", speaker: "Pastor E.A Adeboye", date: "Sep 8, 2024", img: "/assets/gallery-12.jpg" },
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
    <div>
      <Hero pill="🌍 RCCG ROSE OF SHARON" title={<>Oaks of <span className="text-textRed">Righteousness</span></>} subtitle="Watch and be inspired — sermons, teachings and messages from the house of God." bg="/assets/hero-bg.png" />

      {/* Media Grid */}
      <section id="sermons" className="ros:bg-[#000000] ros:px-4 ros:sm:px-[40px] ros:lg:px-[80px] ros:xl:px-[120px] ros:py-[64px] ros:md:py-[84px] ros:flex ros:flex-col ros:gap-[32px] ros:items-center ros:w-full">
        <h2 className="ros-anton ros:uppercase ros:text-[#FFFDFD] ros:text-[32px] ros:md:text-[48px] ros:leading-normal ros:text-center ros:w-full">
          Media
        </h2>

        {/* Category filter tabs */}
        {useLive && categories.length > 1 && (
          <div className="ros:flex ros:gap-[8px] ros:flex-wrap ros:justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`ros:px-[16px] ros:py-[7px] ros:rounded-full ros:text-[13px] ros:font-medium ros:transition-colors ${
                  activeCategory === cat
                    ? "ros:bg-[#DF4E4E] ros:text-[#FFFDFD]"
                    : "ros:border ros:border-[#FFFFFFB3]/30 ros:text-[#A3A1AF] ros:hover:border-[#FFFFFFB3] ros:hover:text-[#FFFFFFB3]"
                }`}
               
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="ros:grid ros:grid-cols-2 ros:sm:grid-cols-3 ros:lg:grid-cols-4 ros:gap-[16px] ros:w-full">
            {[1,2,3,4,5,6,7,8].map((i) => (
              <div key={i} className="ros:rounded-[12px] ros:bg-[#111111] ros:h-[200px] ros:animate-pulse" />
            ))}
          </div>
        )}

        {/* Live media grid */}
        {useLive && (
          <div className="ros:grid ros:grid-cols-2 ros:sm:grid-cols-3 ros:lg:grid-cols-4 ros:gap-[16px] ros:w-full">
            {filtered.map((item, i) => {
              const href = item.displayUrl || "https://www.youtube.com/@rccgrostv";
              const isExternal = !item.displayUrl || item.displayUrl.startsWith("http");
              return (
                <a
                  key={item.id}
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="ros:flex ros:flex-col ros:overflow-hidden ros:rounded-[12px] ros:bg-[#111111] ros:cursor-pointer ros:group ros:hover:scale-[1.02] ros:transition-transform"
                >
                  <div className="ros:relative ros:h-[140px] ros:sm:h-[160px] ros:lg:h-[180px] ros:w-full ros:overflow-hidden ros:bg-[#0d0c18]">
                    {item.thumbnailUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img loading="lazy" decoding="async"
                        src={item.thumbnailUrl}
                        alt={item.title || ""}
                        className="ros:w-full ros:h-full ros:object-cover ros:group-hover:scale-105 ros:transition-transform ros:duration-300"
                      />
                    ) : (
                      <Image
                        src={staticImgs[i % staticImgs.length]}
                        alt={item.title || ""}
                        fill
                        className="ros:object-cover ros:group-hover:scale-105 ros:transition-transform ros:duration-300"
                      />
                    )}
                    <div className="ros:absolute ros:inset-0 ros:bg-[rgba(0,0,0,0.35)] ros:flex ros:items-center ros:justify-center">
                      <div className="ros:size-[40px] ros:md:size-[48px] ros:rounded-full ros:bg-[rgba(0,0,0,0.8)] ros:flex ros:items-center ros:justify-center">
                        <div className="ros:relative ros:size-[20px] ros:md:size-[24px]">
                          <Image src="/assets/play-filled.svg" alt="" fill />
                        </div>
                      </div>
                    </div>
                    {item.duration && (
                      <div className="ros:absolute ros:bottom-[6px] ros:right-[6px] ros:bg-[rgba(0,0,0,0.75)] ros:px-[6px] ros:py-[2px] ros:rounded ros:text-[#FFFDFD] ros:text-[11px]">
                        {formatDuration(item.duration)}
                      </div>
                    )}
                  </div>
                  <div className="ros:flex ros:flex-col ros:gap-[6px] ros:p-[12px] ros:md:p-[16px]">
                    <p className="ros:text-[#FFFDFD] ros:text-[13px] ros:md:text-[15px] ros:font-bold ros:leading-[1.3] ros:line-clamp-2">
                      {item.title || item.displayName || "Untitled"}
                    </p>
                    {item.speaker && (
                      <p className="ros:text-[#A3A1AF] ros:text-[12px] ros:font-normal ros:leading-normal">{item.speaker}</p>
                    )}
                    {item.date && (
                      <p className="ros:text-[#A3A1AF] ros:text-[11px] ros:font-normal ros:leading-normal">{formatDate(item.date)}</p>
                    )}
                    {item.mediaCategory && (
                      <span className="ros:self-start ros:px-[8px] ros:py-[2px] ros:rounded-full ros:bg-[#DF4E4E]/50 ros:text-[#FFFFFFB3] ros:text-[10px] ros:uppercase ros:tracking-wide">
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
          <div className="ros:grid ros:grid-cols-2 ros:sm:grid-cols-3 ros:lg:grid-cols-4 ros:gap-[16px] ros:w-full">
            {staticSermons.map((sermon, i) => (
              <a key={i} href="https://www.youtube.com/@rccgrostv" target="_blank" rel="noopener noreferrer"
                className="ros:flex ros:flex-col ros:overflow-hidden ros:rounded-[12px] ros:bg-[#111111] ros:cursor-pointer ros:group ros:hover:scale-[1.02] ros:transition-transform">
                <div className="ros:relative ros:h-[140px] ros:sm:h-[160px] ros:lg:h-[180px] ros:w-full ros:overflow-hidden">
                  <Image src={sermon.img} alt={sermon.title} fill className="ros:object-cover ros:group-hover:scale-105 ros:transition-transform ros:duration-300" />
                  <div className="ros:absolute ros:inset-0 ros:bg-[rgba(0,0,0,0.35)] ros:flex ros:items-center ros:justify-center">
                    <div className="ros:size-[40px] ros:md:size-[48px] ros:rounded-full ros:bg-[rgba(0,0,0,0.8)] ros:flex ros:items-center ros:justify-center">
                      <div className="ros:relative ros:size-[20px] ros:md:size-[24px]"><Image src="/assets/play-filled.svg" alt="" fill /></div>
                    </div>
                  </div>
                </div>
                <div className="ros:flex ros:flex-col ros:gap-[6px] ros:p-[12px] ros:md:p-[16px]">
                  <p className="ros:text-[#FFFDFD] ros:text-[13px] ros:md:text-[15px] ros:font-bold ros:leading-[1.3] ros:line-clamp-2">{sermon.title}</p>
                  <p className="ros:text-[#A3A1AF] ros:text-[12px] ros:font-normal ros:leading-normal">{sermon.speaker}</p>
                  <p className="ros:text-[#A3A1AF] ros:text-[11px] ros:font-normal ros:leading-normal">{sermon.date}</p>
                </div>
              </a>
            ))}
          </div>
        )}

        <a
          href="https://www.youtube.com/@rccgrostv"
          target="_blank"
          rel="noopener noreferrer"
          className="ros:bg-[#DF4E4E] ros:flex ros:items-center ros:justify-center ros:px-[28px] ros:md:px-[40px] ros:py-[13px] ros:md:py-[16px] ros:rounded-[35px] ros:hover:bg-[#C93D3D] ros:transition-colors"
        >
          <span className="ros:text-[#FFFDFD] ros:text-[16px] ros:md:text-[20px] ros:font-medium ros:leading-normal ros:text-center ros:whitespace-nowrap">
            View More on YouTube
          </span>
        </a>
      </section>

      <Podcast />
    </div>
  );
}
