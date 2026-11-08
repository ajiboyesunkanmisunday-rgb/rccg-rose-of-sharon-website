"use client";

import { useMemo, useState } from "react";
import NextLink from "next/link";
import { ALBUM_CATEGORIES, albumPhoto, type Album, type AlbumCategory } from "@ros/shared/kit/albums";

/** Gallery home: albums by service or event day, filtered by kind of service and by year. Photos open inside an album, never all at once. */
export default function GalleryHome({ albums: ALBUMS }: { albums: Album[] }) {
  const [cat, setCat] = useState<AlbumCategory | "All">("All");
  const [year, setYear] = useState<string>("All");
  const years = useMemo(() => Array.from(new Set(ALBUMS.map((a) => a.iso.slice(0, 4)))).sort().reverse(), [ALBUMS]);
  const list = useMemo(
    () => ALBUMS.filter((a) => (cat === "All" || a.category === cat) && (year === "All" || a.iso.startsWith(year))).sort((a, b) => b.iso.localeCompare(a.iso)),
    [ALBUMS, cat, year],
  );
  const byYear = useMemo(() => {
    const m = new Map<string, typeof list>();
    for (const a of list) { const y = a.iso.slice(0, 4); m.set(y, [...(m.get(y) ?? []), a]); }
    return Array.from(m.entries());
  }, [list]);

  const chip = (on: boolean) => `ros:whitespace-nowrap ros:rounded-full ros:px-4 ros:py-2 ros:text-[14px] ros:font-semibold ros:transition ${on ? "ros:bg-white ros:text-black" : "ros:bg-white/10 ros:text-white ros:hover:bg-white/20"}`;
  const count = (c: AlbumCategory) => ALBUMS.filter((a) => a.category === c).length;

  return (
    <div>
      <h2 className="ros:text-[32px] ros:font-bold ros:leading-tight">Gallery</h2>
      <p className="ros:mt-1 ros:text-[15px] ros:text-white/50">Pictures from our services and events, one album for each service or event day.</p>

      <div className="no-scrollbar ros:mt-5 ros:flex ros:gap-2 ros:overflow-x-auto" role="tablist" aria-label="Kind of service">
        <button role="tab" aria-selected={cat === "All"} onClick={() => setCat("All")} className={chip(cat === "All")}>All albums</button>
        {ALBUM_CATEGORIES.map((c) => (
          <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={chip(cat === c)}>{c} <span className="ros:ml-1 ros:opacity-50">{count(c)}</span></button>
        ))}
      </div>
      <div className="ros:mt-3 ros:flex ros:items-center ros:gap-2 ros:text-[13px] ros:text-white/50">
        <label htmlFor="g-year">Year</label>
        <select id="g-year" value={year} onChange={(e) => setYear(e.target.value)} className="ros:rounded-lg ros:border ros:border-white/15 ros:bg-black ros:px-3 ros:py-1.5 ros:text-[14px] ros:text-white">
          <option value="All">All years</option>
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
        <span className="ros:ml-auto">{list.length} {list.length === 1 ? "album" : "albums"}</span>
      </div>

      {byYear.length === 0 ? (
        <div className="ros:my-16 ros:text-center">
          <p className="ros:text-[18px] ros:font-bold">No albums here yet</p>
          <p className="ros:mx-auto ros:mt-2 ros:max-w-md ros:text-[14px] ros:text-white/50">{cat === "Sunday Services" ? "Each Sunday's pictures will appear here as soon as the media team uploads them." : "Pictures are added after every service and event."}</p>
          <button onClick={() => { setCat("All"); setYear("All"); }} className="ros:mt-4 ros:text-[14px] ros:text-white/60 ros:underline">Show all albums</button>
        </div>
      ) : (
        byYear.map(([y, albums]) => (
          <section key={y} className="ros:mt-8" aria-label={y}>
            <h3 className="ros:border-b ros:border-white/10 ros:pb-2 ros:text-[20px] ros:font-bold">{y}</h3>
            <div className="ros:mt-4 ros:grid ros:grid-cols-1 ros:gap-4 ros:sm:grid-cols-2 ros:xl:grid-cols-3 ros:2xl:grid-cols-4">
              {albums.map((a, i) => (
                <NextLink key={a.slug} href={`/gallery/${a.slug}`} className="sermon-card ros:group ros:block ros:rounded-xl ros:p-2 ros:transition ros:hover:bg-white/5" style={{ ["--i" as string]: i }}>
                  <div className="ros:relative ros:overflow-hidden ros:rounded-lg ros:bg-black">
                    <img src={a.cover ?? albumPhoto(a.slug, 1, true)} alt={a.title} loading="lazy" decoding="async" className="ros:aspect-video ros:w-full ros:object-cover ros:transition ros:duration-300 ros:group-hover:scale-105" />
                    <span className="ros:absolute ros:bottom-2 ros:right-2 ros:rounded-md ros:bg-black/70 ros:px-2 ros:py-0.5 ros:text-[11px] ros:font-bold">{a.count} photos</span>
                  </div>
                  <p className="ros:mt-2 ros:line-clamp-2 ros:text-[15px] ros:font-semibold ros:leading-tight">{a.title}</p>
                  <div className="ros:mt-1 ros:flex ros:items-center ros:gap-2 ros:text-[12px] ros:text-white/40">
                    <span className="ros:line-clamp-1">{a.category}</span>
                    <span className="ros:ml-auto ros:whitespace-nowrap">{a.date}</span>
                  </div>
                </NextLink>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
