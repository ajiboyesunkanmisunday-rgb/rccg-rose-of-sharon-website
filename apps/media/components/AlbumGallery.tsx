"use client";

import { useCallback, useEffect, useState } from "react";
import { ALBUMS, albumPhotos } from "@ros/shared/kit/albums";

/** The event albums: a grid per album, and a full-screen viewer with next / previous and the keyboard. */
export default function AlbumGallery() {
  const [open, setOpen] = useState<{ album: number; photo: number } | null>(null);
  const photos = ALBUMS.map(albumPhotos);

  const move = useCallback((d: number) => {
    setOpen((o) => (o ? { album: o.album, photo: (o.photo + d + photos[o.album].length) % photos[o.album].length } : o));
  }, [photos]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, move]);

  const current = open ? photos[open.album][open.photo] : null;

  return (
    <section className="ros:mx-auto ros:flex ros:w-full ros:max-w-7xl ros:flex-col ros:gap-14 ros:px-4 ros:py-14 ros:md:py-20">
      <div className="ros:flex ros:flex-col ros:items-center ros:gap-3 ros:text-center">
        <h6 className="ros:w-fit ros:rounded-full ros:bg-[#F4F4F4] ros:px-3 ros:py-1 ros:text-xs ros:font-bold">📸 EVENT ALBUMS</h6>
        <h2 className="ros-anton ros:text-3xl ros:uppercase ros:md:text-5xl">Moments from our <span className="text-textRed">events</span></h2>
        <div className="ros:mt-2 ros:flex ros:flex-wrap ros:justify-center ros:gap-2">
          {ALBUMS.map((a) => (
            <a key={a.slug} href={`#album-${a.slug}`} className="ros:rounded-full ros:border ros:border-[#00000029] ros:px-4 ros:py-2 ros:text-[11px] ros:font-bold ros:uppercase ros:tracking-[0.15em] ros:transition ros:hover:border-[#DF4E4E] ros:hover:text-[#DF4E4E]">{a.title}</a>
          ))}
        </div>
      </div>

      {ALBUMS.map((a, ai) => (
        <div key={a.slug} id={`album-${a.slug}`} className="ros:flex ros:flex-col ros:gap-5" style={{ scrollMarginTop: 90 }}>
          <div className="ros:flex ros:flex-col ros:gap-1">
            <span className="ros:text-[10px] ros:font-bold ros:uppercase ros:tracking-[0.2em] ros:text-[#DF4E4E]">{a.date}</span>
            <h3 className="ros-anton ros:text-2xl ros:uppercase ros:md:text-4xl">{a.title}</h3>
            <p className="ros:max-w-2xl ros:text-[#00000099]">{a.text}</p>
          </div>
          <div className="ros:grid ros:grid-cols-2 ros:gap-3 ros:md:grid-cols-3 ros:lg:grid-cols-4">
            {photos[ai].map((p, pi) => (
              <button key={p.src} onClick={() => setOpen({ album: ai, photo: pi })} aria-label={`Open ${p.alt}`} className="ros:group ros:block ros:overflow-hidden ros:rounded-lg ros:bg-[#F4F4F4]">
                <img src={p.thumb} alt={p.alt} loading="lazy" decoding="async" className="ros:aspect-[4/3] ros:w-full ros:object-cover ros:transition ros:duration-500 ros:group-hover:scale-[1.04]" />
              </button>
            ))}
          </div>
        </div>
      ))}

      {open && current && (
        <div className="ros:fixed ros:inset-0 ros:z-[100] ros:flex ros:items-center ros:justify-center ros:bg-black/90 ros:p-4" role="dialog" aria-modal="true" aria-label={ALBUMS[open.album].title} onClick={() => setOpen(null)}>
          <img src={current.src} alt={current.alt} className="ros:max-h-full ros:max-w-full ros:rounded-lg ros:object-contain" onClick={(e) => e.stopPropagation()} />
          <button onClick={() => setOpen(null)} aria-label="Close" className="ros:absolute ros:right-5 ros:top-5 ros:text-4xl ros:leading-none ros:text-white">×</button>
          <button onClick={(e) => { e.stopPropagation(); move(-1); }} aria-label="Previous photo" className="ros:absolute ros:left-4 ros:top-1/2 ros:flex ros:size-11 ros:-translate-y-1/2 ros:items-center ros:justify-center ros:rounded-full ros:bg-white ros:text-xl">‹</button>
          <button onClick={(e) => { e.stopPropagation(); move(1); }} aria-label="Next photo" className="ros:absolute ros:right-4 ros:top-1/2 ros:flex ros:size-11 ros:-translate-y-1/2 ros:items-center ros:justify-center ros:rounded-full ros:bg-white ros:text-xl">›</button>
          <div className="ros:absolute ros:bottom-5 ros:left-1/2 ros:-translate-x-1/2 ros:rounded-full ros:bg-black/60 ros:px-4 ros:py-1 ros:text-sm ros:text-white">{ALBUMS[open.album].title} · {open.photo + 1} / {photos[open.album].length}</div>
        </div>
      )}
    </section>
  );
}
