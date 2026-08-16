"use client";

import { useState } from "react";
import Image from "next/image";

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

export default function Podcast() {
  const [playing, setPlaying] = useState(3);

  const prev = (playing - 2 + episodes.length) % episodes.length;
  const prevActive = (playing - 1 + episodes.length) % episodes.length;
  const nextActive = (playing + 1) % episodes.length;
  const next = (playing + 2) % episodes.length;

  return (
    <section className="relative w-full shadow-[4px_12px_32px_0px_rgba(28,33,53,0.08)]">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <Image src="/assets/podcast-bg.png" alt="" fill className="object-cover opacity-45" />
        <div className="absolute bg-[rgba(0,0,0,0.31)] inset-0" />
      </div>

      <div className="relative flex flex-col gap-[32px] py-[84px] w-full">
        <div className="flex items-center justify-center px-[120px] py-[12px] w-full">
          <h2
            className="text-[#FFFDFD] text-[48px] font-bold leading-normal text-center flex-1"
            style={{ fontVariationSettings: '"wdth" 100' }}
          >
            Audio Podcast
          </h2>
        </div>

        <p className="text-center text-[#FFFDFD]/60 text-[14px] pb-[8px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Click any episode to listen on our{" "}
          <a href="https://www.youtube.com/@rccgrostv" target="_blank" rel="noopener noreferrer" className="text-[#B5B5F3] hover:underline">YouTube channel</a>
        </p>

        <div className="flex h-[420px] items-center justify-between px-[120px] w-full">
          {/* Album art + controls */}
          <div className="flex flex-col gap-[24px] h-full items-center justify-center px-[4px] py-[16px] flex-shrink-0 w-[546px]">
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

              {/* Player controls */}
              <div className="flex gap-[24px] items-end justify-center flex-shrink-0 w-full">
                <div className="h-[39px] w-[38px] relative flex-shrink-0">
                  <Image src="/assets/icon-redo.svg" alt="Replay" fill />
                </div>
                <div className="flex gap-[12px] items-center justify-center flex-shrink-0">
                  <div className="h-[54px] w-[56px] relative flex-shrink-0">
                    <Image src="/assets/icon-frame-2.svg" alt="Previous" fill />
                  </div>
                  <a
                    href="https://www.youtube.com/@rccgrostv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#000080] flex items-center justify-center p-[8px] rounded-[5px] flex-shrink-0 size-[54px] hover:bg-[#0000a0] transition-colors"
                  >
                    <div className="bg-[#FFFDFD] rounded-[3px] flex-shrink-0 size-[24px]" />
                  </a>
                  <div className="h-[54px] w-[57px] relative flex-shrink-0">
                    <Image src="/assets/icon-frame-1.svg" alt="Next" fill />
                  </div>
                </div>
                <div className="bg-[#000080] flex flex-col items-center justify-center overflow-clip p-[8px] rounded-[5px] flex-shrink-0">
                  <div className="h-[22px] w-[24.694px] relative flex-shrink-0">
                    <Image src="/assets/icon-align.svg" alt="Shuffle" fill />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Playlist */}
          <div className="bg-[rgba(255,255,255,0.25)] flex gap-[4px] h-full items-start overflow-clip px-[12px] py-[16px] flex-shrink-0 w-[643px]">
            <div className="flex flex-1 flex-col gap-[8px] items-start min-w-0 overflow-clip">
              {episodes.map((ep, i) => (
                <a
                  key={ep.title}
                  href="https://www.youtube.com/@rccgrostv"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setPlaying(i)}
                  className="flex gap-[12px] items-center w-full text-left flex-shrink-0"
                >
                  <div className="flex items-center justify-center flex-shrink-0">
                    <div className="flex items-center justify-center p-[4px] size-[60px]">
                      <div className="rounded-[12px] flex-shrink-0 relative overflow-hidden size-[52px]">
                        <Image src={ep.img} alt="" fill className="object-cover rounded-[12px]" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-row items-center self-stretch min-w-0">
                    <div
                      className={`flex flex-1 gap-[12px] h-full items-center min-w-0 p-[8px] ${
                        i === playing ? "bg-[#000080]" : "bg-[rgba(255,255,255,0.75)]"
                      }`}
                    >
                      <div
                        className={`flex flex-1 flex-col items-start justify-center min-w-0 whitespace-nowrap py-[4px] ${
                          i === playing ? "text-[#FFFDFD]" : "text-[#100E1A]"
                        }`}
                      >
                        <div className="text-[25px] font-normal leading-normal overflow-hidden text-ellipsis w-full" style={{ fontVariationSettings: '"wdth" 100' }}>
                          {ep.title}
                        </div>
                        <div className="text-[13px] font-normal leading-[14px] overflow-hidden text-ellipsis w-full" style={{ fontVariationSettings: '"wdth" 100' }}>
                          {ep.pastor}
                        </div>
                      </div>
                      <div className="flex gap-[4px] h-full items-center flex-shrink-0">
                        <div className={`flex h-full items-start px-[8px] py-[4px] flex-shrink-0 ${i === playing ? "text-[#FFFDFD]" : "text-[#100E1A]"}`}>
                          <div className="text-[25px] font-normal leading-normal text-right whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                            {ep.duration}
                          </div>
                        </div>
                        <div className="flex h-full items-start px-[8px] py-[4px] flex-shrink-0">
                          <div className="relative flex-shrink-0 size-[20px]">
                            <Image
                              src={i === playing ? "/assets/icon-download2.svg" : "/assets/icon-download.svg"}
                              alt="Download"
                              fill
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
