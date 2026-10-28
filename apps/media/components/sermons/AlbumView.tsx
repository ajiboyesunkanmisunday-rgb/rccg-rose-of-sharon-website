"use client";

import { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import { ALBUMS, albumPhotos, type Album } from "@ros/shared/kit/albums";

const PAGE = 24;

/** One album: its pictures in pages of 24, a full-screen viewer, and links to the neighbouring albums. */
export default function AlbumView({ album }: { album: Album }) {
  const photos = albumPhotos(album);
  const [shown, setShown] = useState(PAGE);
  const [open, setOpen] = useState<number | null>(null);
  const sorted = [...ALBUMS].sort((a, b) => b.iso.localeCompare(a.iso));
  const i = sorted.findIndex((a) => a.slug === album.slug);
  const newer = sorted[i - 1], older = sorted[i + 1];

  const move = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + photos.length) % photos.length)), [photos.length]);
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); if (e.key === "ArrowRight") move(1); if (e.key === "ArrowLeft") move(-1); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, move]);

  return (
    <div>
      <NextLink href="/gallery" className="ros:text-[13px] ros:font-semibold ros:text-white/50 ros:hover:text-white">‹ All albums</NextLink>
      <p className="ros:mt-4 ros:text-[11px] ros:font-bold ros:uppercase ros:tracking-[0.2em] ros:text-[#DF4E4E]">{album.category} · {album.date}</p>
      <h2 className="ros:mt-1 ros:text-[30px] ros:font-bold ros:leading-tight">{album.title}</h2>
      <p className="ros:mt-2 ros:max-w-2xl ros:text-[15px] ros:text-white/55">{album.text}</p>
      <p className="ros:mt-1 ros:text-[13px] ros:text-white/35">{album.count} photos</p>

      <div className="ros:mt-6 ros:grid ros:grid-cols-2 ros:gap-2 ros:md:grid-cols-3 ros:xl:grid-cols-4">
        {photos.slice(0, shown).map((p, pi) => (
          <button key={p.src} onClick={() => setOpen(pi)} aria-label={`Open photo ${pi + 1}`} className="ros:group ros:block ros:overflow-hidden ros:rounded-lg ros:bg-black">
            <img src={p.thumb} alt={p.alt} loading="lazy" decoding="async" className="ros:aspect-[4/3] ros:w-full ros:object-cover ros:transition ros:duration-500 ros:group-hover:scale-105" />
          </button>
        ))}
      </div>
      {shown < photos.length && (
        <button onClick={() => setShown((n) => n + PAGE)} className="ros:mt-6 ros:flex ros:h-12 ros:min-w-44 ros:items-center ros:justify-center ros:rounded-full ros:border ros:border-white/15 ros:px-5 ros:text-[15px] ros:transition ros:hover:bg-white/15">Show more photos ›</button>
      )}

      <div className="ros:mt-10 ros:flex ros:flex-wrap ros:justify-between ros:gap-3 ros:border-t ros:border-white/10 ros:pt-4 ros:text-[14px]">
        {newer ? <NextLink href={`/gallery/${newer.slug}`} className="ros:text-white/60 ros:hover:text-white">‹ {newer.title}</NextLink> : <span />}
        {older ? <NextLink href={`/gallery/${older.slug}`} className="ros:text-white/60 ros:hover:text-white">{older.title} ›</NextLink> : <span />}
      </div>

      {open !== null && (
        <div className="ros:fixed ros:inset-0 ros:z-[100] ros:flex ros:items-center ros:justify-center ros:bg-black/95 ros:p-4" role="dialog" aria-modal="true" aria-label={album.title} onClick={() => setOpen(null)}>
          <img src={photos[open].src} alt={photos[open].alt} className="ros:max-h-full ros:max-w-full ros:rounded-lg ros:object-contain" onClick={(e) => e.stopPropagation()} />
          <button onClick={() => setOpen(null)} aria-label="Close" className="ros:absolute ros:right-5 ros:top-5 ros:text-4xl ros:leading-none ros:text-white">×</button>
          <button onClick={(e) => { e.stopPropagation(); move(-1); }} aria-label="Previous photo" className="ros:absolute ros:left-4 ros:top-1/2 ros:flex ros:size-11 ros:-translate-y-1/2 ros:items-center ros:justify-center ros:rounded-full ros:bg-white ros:text-xl ros:text-black">‹</button>
          <button onClick={(e) => { e.stopPropagation(); move(1); }} aria-label="Next photo" className="ros:absolute ros:right-4 ros:top-1/2 ros:flex ros:size-11 ros:-translate-y-1/2 ros:items-center ros:justify-center ros:rounded-full ros:bg-white ros:text-xl ros:text-black">›</button>
          <div className="ros:absolute ros:bottom-5 ros:left-1/2 ros:-translate-x-1/2 ros:rounded-full ros:bg-white/10 ros:px-4 ros:py-1 ros:text-sm">{album.title} · {open + 1} / {photos.length}</div>
        </div>
      )}
    </div>
  );
}
