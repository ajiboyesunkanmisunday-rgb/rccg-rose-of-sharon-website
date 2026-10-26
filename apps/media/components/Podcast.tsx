"use client";

import { useState } from "react";
import Image from "next/image";
import { A } from "@ros/shared/link";


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
    <section className="ros:relative ros:w-full ros:shadow-[4px_12px_32px_0px_rgba(28,33,53,0.08)]">
      <div aria-hidden className="ros:absolute ros:inset-0 ros:pointer-events-none">
        <Image src="/assets/podcast-bg.png" alt="" fill className="ros:object-cover ros:opacity-45" />
        <div className="ros:absolute ros:bg-[rgba(0,0,0,0.31)] ros:inset-0" />
      </div>

      <div className="ros:relative ros:flex ros:flex-col ros:gap-[16px] ros:md:gap-[24px] ros:py-[60px] ros:md:py-[84px] ros:w-full ros:px-6 ros:md:px-[60px] ros:lg:px-[120px]">
        {/* Title — left-aligned */}
        <div className="ros:flex ros:flex-col ros:gap-[8px]">
          <h2
            className="ros:text-[#FFFDFD] ros:text-[28px] ros:md:text-[38px] ros:lg:text-[48px] ros:font-bold ros:leading-normal ros:text-left"
           
          >
            Audio Podcast
          </h2>
          <p className="ros:text-[#FFFDFD]/60 ros:text-[14px] ros:text-left">
            Click any episode to listen on our{" "}
            <A href="https://www.youtube.com/@rccgrostv" target="_blank" rel="noopener noreferrer" className="ros:text-[#FFFFFFB3] ros:hover:underline">YouTube channel</A>
          </p>
        </div>

        {/* Mobile: scrollable playlist */}
        <div className="ros:lg:hidden">
          <div className="ros:bg-[rgba(255,255,255,0.20)] ros:rounded-[16px] ros:p-[12px] ros:flex ros:flex-col ros:gap-[6px] ros:max-h-[420px] ros:overflow-y-auto">
            {episodes.map((ep, i) => (
              <div
                key={ep.title}
                className="ros:flex ros:gap-[10px] ros:items-center ros:w-full"
              >
                <div className="ros:flex ros:items-center ros:justify-center ros:flex-shrink-0 ros:size-[52px] ros:relative ros:rounded-[10px] ros:overflow-hidden">
                  <Image src={ep.img} alt="" fill className="ros:object-cover" />
                </div>
                <div
                  className={`ros:flex ros:flex-1 ros:items-center ros:min-w-0 ros:px-3 ros:py-2 ros:rounded-[8px] ros:gap-[8px] ${
                    i === playing ? "ros:bg-[#DF4E4E]" : "ros:bg-[rgba(255,255,255,0.7)]"
                  }`}
                >
                  <div className={`ros:flex-1 ros:min-w-0 ${i === playing ? "ros:text-[#FFFDFD]" : "ros:text-[#000000]"}`}>
                    <div className="ros:text-[14px] ros:font-semibold ros:truncate">{ep.title}</div>
                    <div className="ros:text-[11px] ros:truncate ros:opacity-70">{ep.pastor}</div>
                  </div>
                  <span className={`ros:text-[12px] ros:flex-shrink-0 ${i === playing ? "ros:text-[#FFFDFD]" : "ros:text-[#000000]"}`}>{ep.duration}</span>
                  <button
                    onClick={() => setPlaying(i)}
                    className="ros:size-[28px] ros:flex-shrink-0 ros:rounded-full ros:bg-[#DF4E4E] ros:flex ros:items-center ros:justify-center ros:hover:bg-[#C93D3D] ros:transition-colors"
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
        <div className="ros:hidden ros:lg:flex ros:h-[420px] ros:items-center ros:justify-between ros:gap-[40px] ros:w-full">
          {/* Album art + controls */}
          <div className="ros:flex ros:flex-col ros:gap-[24px] ros:h-full ros:items-center ros:justify-center ros:flex-shrink-0 ros:w-[546px]">
            <div className="ros:flex ros:flex-1 ros:flex-col ros:gap-[14px] ros:items-center ros:justify-center ros:min-h-0 ros:w-full">
              {/* Album art carousel */}
              <div className="ros:flex ros:items-center ros:justify-between ros:w-full ros:flex-shrink-0">
                {/* Left pair */}
                <div className="ros:flex ros:h-[291px] ros:items-center ros:justify-center ros:flex-shrink-0 ros:w-[235px]" style={{ marginRight: "-16px" }}>
                  <div className="ros:flex ros:h-full ros:items-center ros:justify-center ros:flex-shrink-0" style={{ marginRight: "-169px" }}>
                    <div className="ros:flex ros:h-full ros:items-start ros:justify-center ros:p-[4px] ros:rounded-[24px]">
                      <div className="ros:border-4 ros:border-[rgba(255,253,253,0.35)] ros:rounded-[24px] ros:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] ros:flex-shrink-0 ros:size-[200px] ros:relative ros:overflow-hidden">
                        <Image src={episodes[prev].img} alt="" fill className="ros:object-cover ros:rounded-[24px]" />
                        <div className="ros:absolute ros:bg-[rgba(0,0,0,0.75)] ros:inset-0 ros:rounded-[24px]" />
                      </div>
                    </div>
                  </div>
                  <div className="ros:flex ros:h-full ros:items-center ros:justify-center ros:flex-shrink-0 ros:relative">
                    <div className="ros:flex ros:h-full ros:items-center ros:justify-center ros:p-[4px] ros:rounded-[24px]">
                      <div className="ros:border-4 ros:border-[rgba(255,253,253,0.35)] ros:rounded-[24px] ros:flex-shrink-0 ros:size-[200px] ros:relative ros:overflow-hidden">
                        <Image src={episodes[prevActive].img} alt="" fill className="ros:object-cover ros:rounded-[24px]" />
                        <div className="ros:absolute ros:bg-[rgba(0,0,0,0.45)] ros:inset-0 ros:rounded-[24px]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center active */}
                <div className="ros:flex ros:items-center ros:justify-center ros:flex-shrink-0 ros:relative">
                  <div className="ros:border-4 ros:border-[#FFFDFD] ros:rounded-[24px] ros:flex-shrink-0 ros:w-[210px] ros:h-[211px] ros:relative ros:overflow-hidden ros:z-10">
                    <Image src={episodes[playing].img} alt="" fill className="ros:object-cover ros:rounded-[24px]" />
                  </div>
                </div>

                {/* Right pair */}
                <div className="ros:flex ros:h-[291px] ros:items-center ros:justify-center ros:flex-shrink-0 ros:w-[235px]" style={{ marginLeft: "-16px" }}>
                  <div className="ros:flex ros:h-full ros:items-center ros:justify-center ros:flex-shrink-0 ros:relative">
                    <div className="ros:flex ros:h-full ros:items-center ros:justify-center ros:p-[4px] ros:rounded-[24px]">
                      <div className="ros:border-4 ros:border-[rgba(255,253,253,0.35)] ros:rounded-[24px] ros:flex-shrink-0 ros:size-[200px] ros:relative ros:overflow-hidden">
                        <Image src={episodes[nextActive].img} alt="" fill className="ros:object-cover ros:rounded-[24px]" />
                        <div className="ros:absolute ros:bg-[rgba(0,0,0,0.45)] ros:inset-0 ros:rounded-[24px]" />
                      </div>
                    </div>
                  </div>
                  <div className="ros:flex ros:h-full ros:items-start ros:justify-center ros:flex-shrink-0" style={{ marginLeft: "-169px" }}>
                    <div className="ros:flex ros:h-full ros:items-start ros:justify-center ros:p-[4px] ros:rounded-[24px]">
                      <div className="ros:border-4 ros:border-[rgba(255,253,253,0.35)] ros:rounded-[24px] ros:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] ros:flex-shrink-0 ros:size-[200px] ros:relative ros:overflow-hidden">
                        <Image src={episodes[next].img} alt="" fill className="ros:object-cover ros:rounded-[24px]" />
                        <div className="ros:absolute ros:bg-[rgba(0,0,0,0.75)] ros:inset-0 ros:rounded-[24px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Now playing info */}
              <div className="ros:text-center ros:flex-shrink-0">
                <p className="ros:text-[#FFFDFD] ros:text-[16px] ros:font-bold ros:truncate ros:max-w-[400px]">{episodes[playing].title}</p>
                <p className="ros:text-[#FFFDFD]/60 ros:text-[13px] ros:truncate ros:max-w-[400px]">{episodes[playing].pastor}</p>
              </div>

              {/* Player controls — Prev / central play / Next + Repeat */}
              <div className="ros:flex ros:gap-[12px] ros:items-center ros:justify-center ros:flex-shrink-0">
                <button
                  onClick={() => setPlaying((playing - 1 + len) % len)}
                  className="ros:px-[16px] ros:py-[8px] ros:bg-[rgba(255,255,255,0.15)] ros:text-[#FFFDFD] ros:text-[14px] ros:font-medium ros:rounded-[20px] ros:hover:bg-[rgba(255,255,255,0.25)] ros:transition-colors"
                 
                >
                  Prev
                </button>
                <A
                  href="https://www.youtube.com/@rccgrostv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ros:bg-[#DF4E4E] ros:flex ros:items-center ros:justify-center ros:rounded-full ros:size-[54px] ros:hover:bg-[#C93D3D] ros:transition-colors ros:flex-shrink-0"
                  aria-label="Play on YouTube"
                >
                  <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                    <path d="M2 2l14 9L2 20V2z" fill="#FFFDFD" />
                  </svg>
                </A>
                <button
                  onClick={() => setPlaying((playing + 1) % len)}
                  className="ros:px-[16px] ros:py-[8px] ros:bg-[rgba(255,255,255,0.15)] ros:text-[#FFFDFD] ros:text-[14px] ros:font-medium ros:rounded-[20px] ros:hover:bg-[rgba(255,255,255,0.25)] ros:transition-colors"
                 
                >
                  Next
                </button>
                <button
                  className="ros:px-[16px] ros:py-[8px] ros:bg-[rgba(255,255,255,0.10)] ros:text-[#FFFDFD]/60 ros:text-[14px] ros:font-medium ros:rounded-[20px] ros:hover:bg-[rgba(255,255,255,0.20)] ros:hover:text-[#FFFDFD] ros:transition-colors"
                 
                >
                  Repeat
                </button>
              </div>
            </div>
          </div>

          {/* Playlist — scrollable */}
          <div className="ros:bg-[rgba(255,255,255,0.20)] ros:flex ros:gap-[4px] ros:h-full ros:items-start ros:overflow-y-auto ros:px-[12px] ros:py-[16px] ros:flex-shrink-0 ros:w-[580px] ros:rounded-[12px]">
            <div className="ros:flex ros:flex-1 ros:flex-col ros:gap-[6px] ros:items-start ros:min-w-0">
              {episodes.map((ep, i) => (
                <div
                  key={ep.title}
                  className="ros:flex ros:gap-[12px] ros:items-center ros:w-full ros:flex-shrink-0"
                >
                  <div className="ros:flex ros:items-center ros:justify-center ros:flex-shrink-0 ros:size-[60px] ros:relative ros:rounded-[12px] ros:overflow-hidden">
                    <Image src={ep.img} alt="" fill className="ros:object-cover" />
                  </div>
                  <div
                    className={`ros:flex ros:flex-1 ros:gap-[8px] ros:h-[52px] ros:items-center ros:min-w-0 ros:px-[8px] ros:rounded-[6px] ${
                      i === playing ? "ros:bg-[#DF4E4E]" : "ros:bg-[rgba(255,255,255,0.75)]"
                    }`}
                  >
                    <div
                      className={`ros:flex ros:flex-1 ros:flex-col ros:items-start ros:justify-center ros:min-w-0 ${
                        i === playing ? "ros:text-[#FFFDFD]" : "ros:text-[#000000]"
                      }`}
                    >
                      <div className="ros:text-[15px] ros:font-normal ros:leading-tight ros:overflow-hidden ros:text-ellipsis ros:w-full ros:whitespace-nowrap">
                        {ep.title}
                      </div>
                      <div className="ros:text-[12px] ros:font-normal ros:leading-tight ros:overflow-hidden ros:text-ellipsis ros:w-full ros:whitespace-nowrap ros:opacity-70">
                        {ep.pastor}
                      </div>
                    </div>
                    <span className={`ros:text-[14px] ros:flex-shrink-0 ${i === playing ? "ros:text-[#FFFDFD]" : "ros:text-[#000000]"}`}>
                      {ep.duration}
                    </span>
                    {/* Play/pause button per item */}
                    <button
                      onClick={() => setPlaying(i)}
                      className="ros:size-[30px] ros:flex-shrink-0 ros:rounded-full ros:bg-[#DF4E4E] ros:flex ros:items-center ros:justify-center ros:hover:bg-[#C93D3D] ros:transition-colors"
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
