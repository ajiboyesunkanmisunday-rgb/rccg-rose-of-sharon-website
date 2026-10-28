"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Sermon } from "@/lib/sermons";
import { CHANNEL_URL } from "@/lib/sermons";
import SermonCard from "./SermonCard";

const TOPICS = ["Sunday Service", "Youth Sunday", "Digging Deep", "Prayer", "Thanksgiving", "Faith", "Healing", "Grace", "Hope", "Salvation", "Conference", "Celebration of Life", "Doctrine", "Wisdom", "Discipline"];
const PAGE = 12;

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Morning" : h < 18 ? "Afternoon" : "Evening";
}

/** Home of the sermons app: greeting, topic chips, and the latest messages with "Show more". */
export default function SermonHome({ sermons }: { sermons: Sermon[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const search = (params.get("search") ?? "").trim();
  const [shown, setShown] = useState(PAGE);
  const [hello, setHello] = useState("");
  const rail = useRef<HTMLDivElement>(null);
  useEffect(() => setHello(greeting()), []);
  useEffect(() => setShown(PAGE), [search]);

  const list = useMemo(() => {
    const t = search.toLowerCase();
    return t ? sermons.filter((s) => `${s.title} ${s.series}`.toLowerCase().includes(t)) : sermons;
  }, [sermons, search]);

  const scroll = (d: number) => rail.current?.scrollBy({ left: d * Math.max(200, rail.current.clientWidth / 2), behavior: "smooth" });

  return (
    <div className="ros:min-h-full">
      {/* topic chips */}
      <div className="ros:sticky ros:-top-8 ros:z-20 ros:-mx-4 ros:-mt-8 ros:flex ros:items-center ros:py-3" style={{ background: "#141414" }}>
        <div ref={rail} className="no-scrollbar ros:mx-4 ros:flex ros:max-w-full ros:items-center ros:gap-2 ros:overflow-x-auto ros:scroll-smooth">
          {TOPICS.map((t) => (
            <button key={t} onClick={() => router.push(search.toLowerCase() === t.toLowerCase() ? "/" : `/?search=${encodeURIComponent(t)}`)} className={`ros:whitespace-nowrap ros:rounded-full ros:px-4 ros:py-1.5 ros:text-[14px] ros:transition ${search.toLowerCase() === t.toLowerCase() ? "ros:bg-white ros:text-black" : "ros:bg-white/5 ros:hover:bg-white/10"}`}>{t}</button>
          ))}
          <div className="ros:min-w-10" />
        </div>
        <button onClick={() => scroll(1)} aria-label="Scroll topics" className="ros:absolute ros:right-2 ros:hidden ros:size-8 ros:items-center ros:justify-center ros:rounded-full ros:bg-white/10 ros:text-white/60 ros:hover:text-white ros:md:flex">›</button>
      </div>

      <div className="ros:h-8 ros:md:h-14" />
      <h3 className="ros:text-[26px] ros:font-bold ros:md:text-[30px]" suppressHydrationWarning>{hello ? `Good ${hello}` : "Welcome"}</h3>
      <h4 className="ros:sticky ros:top-2 ros:z-10 ros:-mx-4 ros:p-4 ros:text-[18px] ros:font-semibold ros:md:text-[20px]" style={{ background: "#141414" }}>{search ? `Results for “${search}”` : "Latest Sermons"}</h4>

      {sermons.length === 0 ? (
        <div className="ros:mx-auto ros:my-16 ros:max-w-md ros:text-center">
          <p className="ros:text-[20px] ros:font-bold">Sermons are loading from our channel</p>
          <p className="ros:mt-2 ros:text-white/50">We could not reach the channel just now. Please refresh in a moment, or watch directly on YouTube.</p>
          <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="ros:mt-6 ros:inline-block ros:rounded-full ros:bg-white ros:px-6 ros:py-3 ros:text-[13px] ros:font-bold ros:text-black">Open the YouTube channel</a>
        </div>
      ) : list.length === 0 ? (
        <div className="ros:my-16 ros:text-center">
          <p className="ros:text-[18px] ros:font-bold">No sermons match “{search}”</p>
          <button onClick={() => router.push("/")} className="ros:mt-4 ros:text-[14px] ros:text-white/60 ros:underline">Clear the search</button>
        </div>
      ) : (
        <>
          <div className="ros:-mx-1 ros:mt-4 ros:grid ros:grid-cols-1 ros:gap-x-3 ros:gap-y-4 ros:sm:grid-cols-2 ros:xl:grid-cols-3 ros:2xl:grid-cols-4">
            {list.slice(0, shown).map((s, i) => <SermonCard key={s.id} s={s} index={i} />)}
          </div>
          {shown < list.length && (
            <div className="ros:mt-8">
              <button onClick={() => setShown((n) => n + PAGE)} className="ros:flex ros:h-12 ros:min-w-44 ros:items-center ros:justify-center ros:gap-2 ros:rounded-full ros:border ros:border-white/15 ros:px-5 ros:text-[15px] ros:transition ros:hover:bg-white/15">Show more ›</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
