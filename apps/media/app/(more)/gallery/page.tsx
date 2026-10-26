"use client";

import { Hero } from "@ros/shared/kit/ui";

import { useState } from "react";
import Image from "next/image";

// Full photo albums from the media team (Google Drive).
const albums = [
  { title: "Back to School", date: "Sept 6th, 2026", href: "https://drive.google.com/drive/folders/1qBRrjdUpm24NArRpT0ntSRobVNZrNAls" },
  { title: "Light Up Ikeja Crusade", date: "Nov 22nd, 2025", href: "https://drive.google.com/drive/folders/1yI6UmXLFtTI5UamcwihjLbQWytF22bfD" },
  { title: "Father's Day", date: "June 15th, 2025", href: "https://drive.google.com/drive/folders/1aJEBY5KlcSTwQL_b6uJ_m_mz7e1EeBXC" },
];

const allImages = [
  "/assets/gallery-1.jpg",
  "/assets/gallery-2.jpg",
  "/assets/gallery-3.jpg",
  "/assets/gallery-4.jpg",
  "/assets/gallery-5.jpg",
  "/assets/gallery-6.jpg",
  "/assets/gallery-7.jpg",
  "/assets/gallery-8.jpg",
  "/assets/gallery-9.jpg",
  "/assets/gallery-10.jpg",
  "/assets/gallery-11.jpg",
  "/assets/gallery-12.jpg",
];

export default function GalleryPage() {
  const [featured, setFeatured] = useState(0);

  const prev = () => setFeatured((f) => (f - 1 + allImages.length) % allImages.length);
  const next = () => setFeatured((f) => (f + 1) % allImages.length);

  return (
    <div>
      <Hero pill="🌍 RCCG ROSE OF SHARON" title={<>Our <span className="text-textRed">Moments</span></>} subtitle="A glimpse into the life and fellowship of RCCG Rose of Sharon." bg="/assets/hero-bg.png" />

      {/* Photo albums (media team's Google Drive folders) */}
      <section className="ros:mx-auto ros:flex ros:w-full ros:max-w-7xl ros:flex-col ros:gap-8 ros:px-4 ros:py-14 ros:md:py-20">
        <div className="ros:flex ros:flex-col ros:items-center ros:gap-3 ros:text-center">
          <h6 className="ros:w-fit ros:rounded-full ros:bg-[#F4F4F4] ros:px-3 ros:py-1 ros:text-xs ros:font-bold">📸 FULL ALBUMS</h6>
          <h2 className="ros-anton ros:text-3xl ros:uppercase ros:md:text-5xl">Photo <span className="text-textRed">albums</span></h2>
          <p className="ros:max-w-2xl ros:text-[#00000099] ros:md:text-lg">Every picture from our events, shared by the media team. Open an album to view and download.</p>
        </div>
        <div className="ros:grid ros:grid-cols-1 ros:gap-6 ros:md:grid-cols-3">
          {albums.map((a) => (
            <a key={a.href} href={a.href} target="_blank" rel="noopener noreferrer" className="ros:group ros:flex ros:flex-col ros:gap-3 ros:rounded-lg ros:border ros:border-[#00000014] ros:bg-[#FAFAFA8F] ros:p-6 ros:transition ros:hover:border-[#DF4E4E]">
              <span className="ros:flex ros:size-12 ros:items-center ros:justify-center ros:rounded-full ros:bg-black ros:text-[22px]">📁</span>
              <span className="ros:text-[10px] ros:font-bold ros:uppercase ros:tracking-[0.2em] ros:text-[#DF4E4E]">{a.date}</span>
              <h3 className="ros:text-lg ros:font-bold ros:group-hover:underline">{a.title}</h3>
              <span className="ros:mt-auto ros:text-[10px] ros:font-extrabold ros:uppercase ros:tracking-[0.2em] ros:text-[#DF4E4E]">Open album →</span>
            </a>
          ))}
        </div>
      </section>

      {/* Pictures Section */}
      <section className="ros:bg-[#000000] ros:px-4 ros:sm:px-[40px] ros:lg:px-[80px] ros:xl:px-[120px] ros:py-[60px] ros:md:py-[84px] ros:flex ros:flex-col ros:gap-[32px] ros:items-center ros:w-full">
        <h2
          className="ros:text-[#FFFDFD] ros:text-[28px] ros:md:text-[40px] ros:lg:text-[48px] ros:font-bold ros:leading-normal ros:text-center ros:w-full"
          style={{ fontVariationSettings: '"wdth" 100' }}
        >
          Pictures
        </h2>

        {/* Featured image with navigation */}
        <div className="ros:relative ros:w-full ros:min-h-[280px] ros:md:h-[600px]">
          <div className="ros:relative ros:w-full ros:h-full ros:overflow-hidden ros:rounded-[16px]">
            <Image
              key={featured}
              src={allImages[featured]}
              alt=""
              fill
              className="ros:object-cover"
              priority
            />
          </div>

          {/* Prev arrow */}
          <button
            onClick={prev}
            className="ros:absolute ros:left-[16px] ros:top-1/2 ros:-translate-y-1/2 ros:size-[48px] ros:rounded-full ros:bg-[rgba(0,0,0,0.6)] ros:flex ros:items-center ros:justify-center ros:hover:bg-[rgba(0,0,0,0.8)] ros:transition-colors ros:z-10"
            aria-label="Previous"
          >
            <svg className="ros:w-6 ros:h-6 ros:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next arrow */}
          <button
            onClick={next}
            className="ros:absolute ros:right-[16px] ros:top-1/2 ros:-translate-y-1/2 ros:size-[48px] ros:rounded-full ros:bg-[rgba(0,0,0,0.6)] ros:flex ros:items-center ros:justify-center ros:hover:bg-[rgba(0,0,0,0.8)] ros:transition-colors ros:z-10"
            aria-label="Next"
          >
            <svg className="ros:w-6 ros:h-6 ros:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Counter */}
          <div className="ros:absolute ros:bottom-[16px] ros:right-[20px] ros:bg-[rgba(0,0,0,0.6)] ros:px-[12px] ros:py-[6px] ros:rounded-[20px]">
            <span className="ros:text-[#FFFDFD] ros:text-[14px] ros:font-normal" style={{ fontVariationSettings: '"wdth" 100' }}>
              {featured + 1} / {allImages.length}
            </span>
          </div>

          {/* Dots */}
          <div className="ros:absolute ros:bottom-[16px] ros:left-1/2 ros:-translate-x-1/2 ros:flex ros:gap-[8px]">
            {allImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setFeatured(i)}
                className={`ros:size-[10px] ros:rounded-full ros:transition-colors ${i === featured ? "ros:bg-[#FFFFFFB3]" : "ros:bg-[rgba(255,255,255,0.4)]"}`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="ros:grid ros:grid-cols-2 ros:sm:grid-cols-3 ros:lg:grid-cols-4 ros:gap-[12px] ros:w-full">
          {allImages.map((src, i) => (
            <button
              key={i}
              onClick={() => setFeatured(i)}
              className={`ros:relative ros:overflow-hidden ros:rounded-[8px] ros:transition-all ros:h-[100px] ros:md:h-[140px] ${i === featured ? "ros:ring-2 ros:ring-[#FFFFFFB3] ros:ring-offset-2 ros:ring-offset-[#000000]" : "ros:opacity-70 ros:hover:opacity-100"}`}
            >
              <Image src={src} alt="" fill className="ros:object-cover" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
