"use client";

import { useState } from "react";

const episodes = [
  { title: "I'm in Your Mind", pastor: "Pastor E.A Adeboye - Daddy G.O", duration: "2:02" },
  { title: "Walking with God", pastor: "Pastor E.A Adeboye - Daddy G.O", duration: "5:51" },
  { title: "Power of Praise", pastor: "Pastor Emeka Obiagwu", duration: "1:34" },
  { title: "With wings Like an Eagle", pastor: "Pastor E.A Adeboye - Daddy G.O", duration: "7:25" },
  { title: "The Holy Spirit", pastor: "Pastor E.A Adeboye - Daddy G.O", duration: "2:23" },
  { title: "Trinity", pastor: "Pastor Emeka Obiagwu", duration: "1:08" },
  { title: "I Will Build My Church", pastor: "Pastor Emeka Obiagwu", duration: "7:59" },
  { title: "A New Beginning", pastor: "Pastor E.A Adeboye - Daddy G.O", duration: "2:02" },
  { title: "Faith Like a Mustard Seed", pastor: "Pastor Emeka Obiagwu", duration: "5:36" },
  { title: "Holiness", pastor: "Pastor E.A Adeboye - Daddy G.O", duration: "1:09" },
];

export default function Podcast() {
  const [playing, setPlaying] = useState(3);

  return (
    <section
      className="relative px-30 py-21"
      style={{
        backgroundImage: "url('/podcast-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/31" />

      <div className="relative z-10 flex flex-col gap-6">
        <h2 className="text-[#FFFDFD] text-[48px] font-bold text-center">Audio Podcast</h2>

        <div className="flex gap-8 items-start">
          {/* Album art + controls */}
          <div className="w-[546px] flex flex-col items-center gap-6 py-4">
            <div className="relative flex items-center justify-center w-full h-[291px]">
              {/* Background albums */}
              <div className="absolute left-0 flex items-center gap-2">
                <div className="w-[200px] h-[200px] rounded-[24px] bg-black/75 border-4 border-white/35 overflow-hidden" />
                <div className="w-[200px] h-[200px] rounded-[24px] bg-black/45 border-4 border-white/35 overflow-hidden" />
              </div>
              <div className="absolute right-0 flex items-center gap-2">
                <div className="w-[200px] h-[200px] rounded-[24px] bg-black/75 border-4 border-white/35 overflow-hidden" />
                <div className="w-[200px] h-[200px] rounded-[24px] bg-black/45 border-4 border-white/35 overflow-hidden" />
              </div>
              {/* Active album */}
              <div className="absolute w-[210px] h-[211px] rounded-[24px] border-4 border-white overflow-hidden bg-[#000080]/60 z-10">
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55A4 4 0 1014 17V7h4V3h-6z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Player controls */}
            <div className="flex items-center gap-6">
              <button className="w-10 h-10 bg-[#000080] rounded flex items-center justify-center hover:bg-[#0000a0] transition-colors">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11 5l-7 7 7 7V5zm1 7l7-7v14l-7-7z" />
                </svg>
              </button>

              <div className="flex items-center gap-3">
                <button className="w-14 h-[54px] bg-[#000080] rounded flex items-center justify-center hover:bg-[#0000a0] transition-colors">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                  </svg>
                </button>
                <button className="w-[54px] h-[54px] bg-[#000080] rounded flex items-center justify-center hover:bg-[#0000a0] transition-colors">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="6" width="12" height="12" rx="3" />
                  </svg>
                </button>
                <button className="w-[57px] h-[54px] bg-[#000080] rounded flex items-center justify-center hover:bg-[#0000a0] transition-colors">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 6h-2v12h2zm-3.5 6L6 6v12z" />
                  </svg>
                </button>
              </div>

              <button className="w-10 h-10 bg-[#000080] rounded flex items-center justify-center hover:bg-[#0000a0] transition-colors">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="1" />
                </svg>
              </button>
            </div>
          </div>

          {/* Playlist */}
          <div className="flex-1 bg-white/25 overflow-hidden flex">
            <div className="flex-1 flex flex-col overflow-hidden">
              {episodes.map((ep, i) => (
                <button
                  key={ep.title}
                  onClick={() => setPlaying(i)}
                  className={`flex items-center gap-3 transition-colors text-left ${
                    playing === i ? "bg-[#000080]" : "bg-white/75 hover:bg-white/90"
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="w-[60px] h-[60px] flex-shrink-0 relative overflow-hidden">
                    <div className="w-full h-full bg-gray-400/50 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3v10.55A4 4 0 1014 17V7h4V3h-6z" />
                      </svg>
                    </div>
                    {playing === i && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 000-1.69L9.54 5.98A.998.998 0 008 6.82z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-2">
                    <div className={`text-[25px] font-normal leading-tight ${playing === i ? "text-[#FFFDFD]" : "text-[#100E1A]"}`}>
                      {ep.title}
                    </div>
                    <div className={`text-[13px] font-normal leading-[14px] ${playing === i ? "text-[#FFFDFD]" : "text-[#100E1A]"}`}>
                      {ep.pastor}
                    </div>
                  </div>

                  {/* Duration + icon */}
                  <div className="flex items-center gap-1 pr-2">
                    <span className={`text-[25px] font-normal px-2 py-1 ${playing === i ? "text-[#FFFDFD]" : "text-[#100E1A]"}`}>
                      {ep.duration}
                    </span>
                    <div className={`w-5 h-5 ${playing === i ? "bg-[#FFFDFD]" : "bg-[#100E1A]"} rounded-sm`} />
                  </div>
                </button>
              ))}
            </div>
            {/* Scrollbar */}
            <div className="w-3 flex justify-center py-2">
              <div className="w-1 bg-[#FFFDFD]/50 rounded-full" style={{ height: "74px" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
