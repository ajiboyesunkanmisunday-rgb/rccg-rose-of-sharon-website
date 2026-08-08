"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const allImages = [
  "/assets/gallery-1.png",
  "/assets/gallery-2.png",
  "/assets/gallery-3.png",
  "/assets/gallery-4.png",
  "/assets/gallery-5.png",
  "/assets/gallery-6.png",
  "/assets/gallery-7.png",
  "/assets/gallery-8.png",
  "/assets/gallery-9.png",
  "/assets/gallery-10.png",
  "/assets/gallery-11.png",
  "/assets/gallery-12.png",
];

export default function GalleryPage() {
  const [featured, setFeatured] = useState(0);

  const prev = () => setFeatured((f) => (f - 1 + allImages.length) % allImages.length);
  const next = () => setFeatured((f) => (f + 1) % allImages.length);

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[735px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/assets/hero-bg.png" alt="" fill className="object-cover pointer-events-none" priority />
          <div className="absolute inset-0 bg-[rgba(16,14,26,0.65)]" />
        </div>
        <Navbar activePage="gallery" />
        <div className="absolute left-1/2 top-[calc(50%+58px)] -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[84px] items-center justify-center w-[1148px] z-10">
          <div className="flex flex-col gap-[32px] items-start w-full text-center text-white">
            <h1
              className="text-[#FFFDFD] text-[84px] font-medium leading-normal w-full"
              style={{ fontVariationSettings: '"wdth" 100' }}
            >
              Our Moments
            </h1>
            <p
              className="text-[#FFFDFD] text-[25px] font-normal leading-[32px] w-full"
              style={{ fontVariationSettings: '"wdth" 100' }}
            >
              A glimpse into the life and fellowship of RCCG Rose of Sharon.
            </p>
          </div>
        </div>
      </section>

      {/* Pictures Section */}
      <section className="bg-[#100E1A] px-[120px] py-[84px] flex flex-col gap-[32px] items-center w-full">
        <h2
          className="text-[#FFFDFD] text-[48px] font-bold leading-normal text-center w-full"
          style={{ fontVariationSettings: '"wdth" 100' }}
        >
          Pictures
        </h2>

        {/* Featured image with navigation */}
        <div className="relative w-full" style={{ height: "600px" }}>
          <div className="relative w-full h-full overflow-hidden rounded-[16px]">
            <Image
              key={featured}
              src={allImages[featured]}
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Prev arrow */}
          <button
            onClick={prev}
            className="absolute left-[16px] top-1/2 -translate-y-1/2 size-[48px] rounded-full bg-[rgba(0,0,0,0.6)] flex items-center justify-center hover:bg-[rgba(0,0,128,0.8)] transition-colors z-10"
            aria-label="Previous"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next arrow */}
          <button
            onClick={next}
            className="absolute right-[16px] top-1/2 -translate-y-1/2 size-[48px] rounded-full bg-[rgba(0,0,0,0.6)] flex items-center justify-center hover:bg-[rgba(0,0,128,0.8)] transition-colors z-10"
            aria-label="Next"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute bottom-[16px] right-[20px] bg-[rgba(0,0,0,0.6)] px-[12px] py-[6px] rounded-[20px]">
            <span className="text-[#FFFDFD] text-[14px] font-normal" style={{ fontVariationSettings: '"wdth" 100' }}>
              {featured + 1} / {allImages.length}
            </span>
          </div>

          {/* Dots */}
          <div className="absolute bottom-[16px] left-1/2 -translate-x-1/2 flex gap-[8px]">
            {allImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setFeatured(i)}
                className={`size-[10px] rounded-full transition-colors ${i === featured ? "bg-[#B5B5F3]" : "bg-[rgba(255,255,255,0.4)]"}`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail strip */}
        <div
          className="grid gap-[12px] w-full"
          style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
        >
          {allImages.map((src, i) => (
            <button
              key={i}
              onClick={() => setFeatured(i)}
              className={`relative overflow-hidden rounded-[8px] transition-all ${i === featured ? "ring-2 ring-[#B5B5F3] ring-offset-2 ring-offset-[#100E1A]" : "opacity-70 hover:opacity-100"}`}
              style={{ height: "140px" }}
            >
              <Image src={src} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
