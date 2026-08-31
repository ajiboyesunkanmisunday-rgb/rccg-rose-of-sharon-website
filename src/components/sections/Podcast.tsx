"use client";

import { useState } from "react";
import Image from "next/image";

const vs = { fontVariationSettings: '"wdth" 100' };

const episodes = [
  { title: "I'm in Your Mind", pastor: "Pastor E.A Adeboye - Daddy G.O", duration: "2:02", img: "/assets/podcast-5.png" },
  { title: "Walking with God", pastor: "Pastor E.A Adeboye - Daddy G.O", duration: "5:51", img: "/assets/podcast-1.png" },
  { title: "Power of Praise", pastor: "Pastor Emeka Obiagwu", duration: "1:34", img: "/assets/podcast-2.png" },
  { title: "With wings Like an Eagle", pastor: "Pastor E.A Adeboye - Daddy G.O", duration: "7:25", img: "/assets/podcast-3.png" },
  { title: "The Holy Spirit", pastor: "Pastor E.A Adeboye - Daddy G.O", duration: "2:23", img: "/assets/podcast-4.png" },
  { title: "Trinity", pastor: "Pastor Emeka Obiagwu", duration: "1:08", img: "/assets/podcast-6.png" },
  { title: "I Will Build My Church", pastor: "Pastor Emeka Obiagwu", duration: "7:59", img: "/assets/podcast-7.png" },
  { title: "A New Beginning", pastor: "Pastor E.A Adeboye - Daddy G.O", duration: "2:02", img: "/assets/podcast-8.png" },
  { title: "Faith Like a Mustard Seed", pastor: "Pastor Emeka Obiagwu", duration: "5:36", img: "/assets/podcast-9.png" },
  { title: "Holiness", pastor: "Pastor E.A Adeboye - Daddy G.O", duration: "1:09", img: "/assets/podcast-1.png" },
];

const len = episodes.length;

export default function Podcast() {
  const [playing, setPlaying] = useState(3);

  const prev = (playing - 2 + len) % len;
  const prevActive = (playing - 1 + len) % len;
  const nextActive = (playing + 1) % len;
  const next = (playing + 2) % len;

  return (
    <section className="relative w-full shadow-[4px_12px_32px_0px_rgba(28,33,53,0.08)]">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <Image src="/assets/podcast-bg.png" alt="" fill className="object-cover opacity-45" />
        <div className="absolute bg-[rgba(0,0,0,0.31)] inset-0" />
      </div>

      <div className="relative flex flex-col gap-[16px] md:gap-[24px] py-[60px] md:py-[84px] w-full px-6 md:px-[60px] lg:px-[120px]">
        {/* Title — left-aligned */}
        <div className="flex flex-col gap-[8px]">
          <h2
            className="text-[#FFFDFD] text-[28px] md:text-[38px] lg:text-[48px] font-bold leading-normal text-left"
            style={vs}
          >
            Audio Podcast
          </h2>
          <p className="text-[#FFFDFD]/60 text-[14px] text-left" style={vs}>
            Click any episode to listen on our{" "}
            <a href="https://www.youtube.com/@rccgrostv" target="_blank" rel="noopener noreferrer" className="text-[#B5B5F3] hover:underline">YouTube channel</a>
          </p>
        </div>

        {/* Mobile: scrollable playlist */}
        <div className="lg:hidden">
          <div className="bg-[rgba(255,255,255,0.20)] rounded-[16px] p-[12px] flex flex-col gap-[6px] max-h-[420px] overflow-y-auto">
            {episodes.map((ep, i) => (
              <div
                key={ep.title}
                className="flex gap-[10px] items-center w-full"
              >
                <div className="flex items-center justify-center flex-shrink-0 size-[52px] relative rounded-[10px] overflow-hidden">
                  <Image src={ep.img} alt="" fill className="object-cover" />
                </div>
                <div
                  className={`flex flex-1 items-center min-w-0 px-3 py-2 rounded-[8px] gap-[8px] ${
                    i === playing ? "bg-[#000080]" : "bg-[rgba(255,255,255,0.7)]"
                  }`}
                >
                  <div className={`flex-1 min-w-0 ${i === playing ? "text-[#FFFDFD]" : "text-[#100E1A]"}`}>
                    <div className="text-[14px] font-semibold truncate" style={vs}>{ep.title}</div>
                    <div className="text-[11px] truncate opacity-70" style={vs}>{ep.pastor}</div>
                  </div>
                  <span className={`text-[12px] flex-shrink-0 ${i === playing ? "text-[#FFFDFD]" : "text-[#100E1A]"}`} style={vs}>{ep.duration}</span>
                  <button
                    onClick={() => setPlaying(i)}
                    className="size-[28px] flex-shrink-0 rounded-full bg-[#000080] flex items-center justify-center hover:bg-[#0000a0] transition-colors"
                    aria-label={i === playing ? "Now playing" : "Play"}
                  >
                    {i === playing ? (
                      <svg width="10" height="12" viewBox="0 0 10 12" fill="#FFFDFD">
                        <rect x="1" y="1" width="3" height="10" rx="1" />
                        <rect x="6" y="1" width="3" height="10" rx="1" />
                      </svg>
                    ) : (
                      <svg width="10" height="12" viewBox="0 0 10 12" fill="#FFFDFD">
                        <path d="M1 1l8 5-8 5V1z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: carousel + playlist */}
        <div className="hidden lg:flex h-[420px] items-center justify-between gap-[40px] w-full">
          {/* Album art + controls */}
          <div className="flex flex-col gap-[24px] h-full items-center justify-center flex-shrink-0 w-[546px]">
            <div className="flex flex-1 flex-col gap-[14px] items-center justify-center min-h-0 w-full">
              {/* Album art carousel */}
              <div className="flex items-center justify-between w-full flex-shrink-0">
                {/* Left pair */}
                <div className="flex h-[291px] items-center justify-center flex-shrink-0 w-[235px]" style={{ marginRight: "-16px" }}>
                  <div className="flex h-full items-center justify-center flex-shrink-0" style={{ marginRight: "-169px" }}>
                    <div className="flex h-full items-start justify-center p-[4px] rounded-[24px]">
                      <div className="border-4 border-[rgba(255,253,253,0.35)] rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex-shrink-0 size-[200px] relative overflow-hidden">
                        <Image src={episodes[prev].img} alt="" fill className="object-cover rounded-[24px]" />
                        <div className="absolute bg-[rgba(0,0,0,0.75)] inset-0 rounded-[24px]" />
                      </div>
                    </div>
                  </div>
                  <div className="flex h-full items-center justify-center flex-shrink-0 relative">
                    <div className="flex h-full items-center justify-center p-[4px] rounded-[24px]">
                      <div className="border-4 border-[rgba(255,253,253,0.35)] rounded-[24px] flex-shrink-0 size-[200px] relative overflow-hidden">
                        <Image src={episodes[prevActive].img} alt="" fill className="object-cover rounded-[24px]" />
                        <div className="absolute bg-[rgba(0,0,0,0.45)] inset-0 rounded-[24px]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center active */}
                <div className="flex items-center justify-center flex-shrink-0 relative">
                  <div className="border-4 border-[#FFFDFD] rounded-[24px] flex-shrink-0 w-[210px] h-[211px] relative overflow-hidden z-10">
                    <Image src={episodes[playing].img} alt="" fill className="object-cover rounded-[24px]" />
                  </div>
                </div>

                {/* Right pair */}
                <div className="flex h-[291px] items-center justify-center flex-shrink-0 w-[235px]" style={{ marginLeft: "-16px" }}>
                  <div className="flex h-full items-center justify-center flex-shrink-0 relative">
                    <div className="flex h-full items-center justify-center p-[4px] rounded-[24px]">
                      <div className="border-4 border-[rgba(255,253,253,0.35)] rounded-[24px] flex-shrink-0 size-[200px] relative overflow-hidden">
                        <Image src={episodes[nextActive].img} alt="" fill className="object-cover rounded-[24px]" />
                        <div className="absolute bg-[rgba(0,0,0,0.45)] inset-0 rounded-[24px]" />
                      </div>
                    </div>
                  </div>
                  <div className="flex h-full items-start justify-center flex-shrink-0" style={{ marginLeft: "-169px" }}>
                    <div className="flex h-full items-start justify-center p-[4px] rounded-[24px]">
                      <div className="border-4 border-[rgba(255,253,253,0.35)] rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex-shrink-0 size-[200px] relative overflow-hidden">
                        <Image src={episodes[next].img} alt="" fill className="object-cover rounded-[24px]" />
                        <div className="absolute bg-[rgba(0,0,0,0.75)] inset-0 rounded-[24px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Now playing info */}
              <div className="text-center flex-shrink-0">
                <p className="text-[#FFFDFD] text-[16px] font-bold truncate max-w-[400px]" style={vs}>{episodes[playing].title}</p>
                <p className="text-[#FFFDFD]/60 text-[13px] truncate max-w-[400px]" style={vs}>{episodes[playing].pastor}</p>
              </div>

              {/* Player controls — Prev / central play / Next + Repeat */}
              <div className="flex gap-[12px] items-center justify-center flex-shrink-0">
                <button
                  onClick={() => setPlaying((playing - 1 + len) % len)}
                  className="px-[16px] py-[8px] bg-[rgba(255,255,255,0.15)] text-[#FFFDFD] text-[14px] font-medium rounded-[20px] hover:bg-[rgba(255,255,255,0.25)] transition-colors"
                  style={vs}
                >
                  Prev
                </button>
                <a
                  href="https://www.youtube.com/@rccgrostv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#000080] flex items-center justify-center rounded-full size-[54px] hover:bg-[#0000a0] transition-colors flex-shrink-0"
                  aria-label="Play on YouTube"
                >
                  <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                    <path d="M2 2l14 9L2 20V2z" fill="#FFFDFD" />
                  </svg>
                </a>
                <button
                  onClick={() => setPlaying((playing + 1) % len)}
                  className="px-[16px] py-[8px] bg-[rgba(255,255,255,0.15)] text-[#FFFDFD] text-[14px] font-medium rounded-[20px] hover:bg-[rgba(255,255,255,0.25)] transition-colors"
                  style={vs}
                >
                  Next
                </button>
                <button
                  className="px-[16px] py-[8px] bg-[rgba(255,255,255,0.10)] text-[#FFFDFD]/60 text-[14px] font-medium rounded-[20px] hover:bg-[rgba(255,255,255,0.20)] hover:text-[#FFFDFD] transition-colors"
                  style={vs}
                >
                  Repeat
                </button>
              </div>
            </div>
          </div>

          {/* Playlist — scrollable */}
          <div className="bg-[rgba(255,255,255,0.20)] flex gap-[4px] h-full items-start overflow-y-auto px-[12px] py-[16px] flex-shrink-0 w-[580px] rounded-[12px]">
            <div className="flex flex-1 flex-col gap-[6px] items-start min-w-0">
              {episodes.map((ep, i) => (
                <div
                  key={ep.title}
                  className="flex gap-[12px] items-center w-full flex-shrink-0"
                >
                  <div className="flex items-center justify-center flex-shrink-0 size-[60px] relative rounded-[12px] overflow-hidden">
                    <Image src={ep.img} alt="" fill className="object-cover" />
                  </div>
                  <div
                    className={`flex flex-1 gap-[8px] h-[52px] items-center min-w-0 px-[8px] rounded-[6px] ${
                      i === playing ? "bg-[#000080]" : "bg-[rgba(255,255,255,0.75)]"
                    }`}
                  >
                    <div
                      className={`flex flex-1 flex-col items-start justify-center min-w-0 ${
                        i === playing ? "text-[#FFFDFD]" : "text-[#100E1A]"
                      }`}
                    >
                      <div className="text-[15px] font-normal leading-tight overflow-hidden text-ellipsis w-full whitespace-nowrap" style={vs}>
                        {ep.title}
                      </div>
                      <div className="text-[12px] font-normal leading-tight overflow-hidden text-ellipsis w-full whitespace-nowrap opacity-70" style={vs}>
                        {ep.pastor}
                      </div>
                    </div>
                    <span className={`text-[14px] flex-shrink-0 ${i === playing ? "text-[#FFFDFD]" : "text-[#100E1A]"}`} style={vs}>
                      {ep.duration}
                    </span>
                    {/* Play/pause button per item */}
                    <button
                      onClick={() => setPlaying(i)}
                      className="size-[30px] flex-shrink-0 rounded-full bg-[#000080] flex items-center justify-center hover:bg-[#0000a0] transition-colors"
                      aria-label={i === playing ? "Now playing" : "Play"}
                    >
                      {i === playing ? (
                        <svg width="10" height="12" viewBox="0 0 10 12" fill="#FFFDFD">
                          <rect x="1" y="1" width="3" height="10" rx="1" />
                          <rect x="6" y="1" width="3" height="10" rx="1" />
                        </svg>
                      ) : (
                        <svg width="10" height="12" viewBox="0 0 10 12" fill="#FFFDFD">
                          <path d="M1 1l8 5-8 5V1z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
