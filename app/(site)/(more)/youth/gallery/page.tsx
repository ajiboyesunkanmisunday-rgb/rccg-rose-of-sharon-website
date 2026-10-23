"use client";

import { useState } from "react";
import { Hero, Section, SectionTitle } from "../../_kit/ui";
import YouthTabs from "../../_kit/YouthTabs";
import { PHOTOS } from "../../_kit/youth";

export default function YouthGallery() {
  const [open, setOpen] = useState<number | null>(null);
  const go = (d: number) => setOpen((i) => (i === null ? i : (i + d + PHOTOS.length) % PHOTOS.length));
  return (
    <>
      <Hero pill="📸 GALLERY" title={<>Youth <span className="text-textRed">Gallery</span></>} subtitle="Moments from Youth Hangout 2026 and more." bg="/youth/hangout-4.jpg" />
      <Section>
        <YouthTabs />
        <SectionTitle pill="🖼️ YOUTH HANGOUT 2026" title={<>Moments that <span className="text-textRed">matter</span></>} />
        <div className="ros:mt-8 ros:columns-1 ros:gap-4 ros:sm:columns-2 ros:lg:columns-3">
          {PHOTOS.map((p, i) => (
            <button key={p.src} onClick={() => setOpen(i)} className="ros:mb-4 ros:block ros:w-full ros:overflow-hidden ros:rounded-lg" aria-label={`Open photo: ${p.alt}`}>
              <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" className="ros:w-full ros:transition ros:duration-500 ros:hover:scale-[1.03]" />
            </button>
          ))}
        </div>
        <p className="ros:mt-4 ros:text-sm ros:text-[#00000099]">More albums will be added as the youth media team shares them.</p>
      </Section>
      {open !== null && (
        <div className="ros:fixed ros:inset-0 ros:z-[100] ros:flex ros:items-center ros:justify-center ros:bg-black/90 ros:p-4" role="dialog" aria-modal="true" onClick={() => setOpen(null)}>
          <img src={PHOTOS[open].src} alt={PHOTOS[open].alt} className="ros:max-h-full ros:max-w-full ros:rounded-lg ros:object-contain" onClick={(e) => e.stopPropagation()} />
          <button onClick={() => setOpen(null)} aria-label="Close" className="ros:absolute ros:right-5 ros:top-5 ros:text-4xl ros:leading-none ros:text-white">×</button>
          <button onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous photo" className="ros:absolute ros:left-4 ros:top-1/2 ros:flex ros:size-11 ros:-translate-y-1/2 ros:items-center ros:justify-center ros:rounded-full ros:bg-white ros:text-xl">‹</button>
          <button onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next photo" className="ros:absolute ros:right-4 ros:top-1/2 ros:flex ros:size-11 ros:-translate-y-1/2 ros:items-center ros:justify-center ros:rounded-full ros:bg-white ros:text-xl">›</button>
        </div>
      )}
    </>
  );
}
