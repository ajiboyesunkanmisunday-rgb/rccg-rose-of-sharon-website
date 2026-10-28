"use client";

import type { Sermon } from "@/lib/sermons";
import { usePlayer } from "./Player";

export default function SermonCard({ s, index = 0 }: { s: Sermon; index?: number }) {
  const { play } = usePlayer();
  const d = new Date(s.date);
  return (
    <div className="sermon-card ros:group ros:grid ros:content-start ros:rounded-xl ros:p-2 ros:text-left ros:transition ros:duration-300 ros:hover:bg-white/5 ros:md:p-3" style={{ ["--i" as string]: index }}>
      <button type="button" onClick={() => play(s)} aria-label={`Play ${s.title}`} className="ros:group/image ros:relative ros:block ros:isolate">
        <div className="ros:overflow-hidden ros:rounded-lg ros:bg-black ros:transition ros:duration-300 ros:group-hover:scale-95">
          <img src={s.thumb} alt={s.title} loading={index < 6 ? "eager" : "lazy"} decoding="async" className="ros:aspect-video ros:w-full ros:object-cover ros:opacity-100 ros:transition ros:duration-300 ros:group-hover/image:opacity-40" />
        </div>
        <span className="ros:absolute ros:inset-0 ros:m-auto ros:flex ros:size-[72px] ros:scale-50 ros:items-center ros:justify-center ros:rounded-full ros:border-[3px] ros:border-white ros:opacity-0 ros:transition ros:duration-300 ros:group-hover/image:scale-100 ros:group-hover/image:opacity-100">
          <svg viewBox="0 0 24 24" fill="white" className="ros:ml-1 ros:size-8"><path d="M8 5v14l11-7z" /></svg>
        </span>
      </button>
      <button type="button" onClick={() => play(s)} className="ros:mb-1 ros:mt-2 ros:line-clamp-2 ros:text-left ros:text-[14px] ros:font-semibold ros:leading-tight ros:hover:underline ros:md:text-[15px]">{s.title}</button>
      <div className="ros:flex ros:items-center ros:gap-1">
        <span className="ros:line-clamp-1 ros:text-[12px] ros:leading-tight ros:text-white/40">{s.series || "Message"}</span>
        <span className="ros:ml-auto ros:whitespace-nowrap ros:text-[12px] ros:text-white/40">{d.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
      </div>
    </div>
  );
}
