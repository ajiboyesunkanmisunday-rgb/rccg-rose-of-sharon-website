"use client";

import type { Sermon } from "@/lib/sermons";
import SermonCard from "./SermonCard";

/** Sermons grouped into series, each shown as a row of its latest messages. */
export default function SeriesList({ sermons }: { sermons: Sermon[] }) {
  const groups: { name: string; slug: string; items: Sermon[] }[] = [];
  sermons.forEach((s) => {
    const g = groups.find((x) => x.slug === s.seriesSlug);
    if (g) g.items.push(s); else groups.push({ name: s.series, slug: s.seriesSlug, items: [s] });
  });
  groups.sort((a, b) => b.items.length - a.items.length);

  return (
    <div>
      <h3 className="ros:text-[26px] ros:font-bold ros:md:text-[30px]">Series</h3>
      <p className="ros:mt-1 ros:text-white/50">Messages grouped by the kind of service or teaching.</p>
      {groups.length === 0 && <p className="ros:my-16 ros:text-center ros:text-white/50">Series will appear here as soon as sermons load.</p>}
      {groups.map((g) => (
        <section key={g.slug} className="ros:mt-10" aria-label={g.name}>
          <div className="ros:flex ros:items-end ros:justify-between ros:border-b ros:border-white/10 ros:pb-2">
            <h4 className="ros:text-[20px] ros:font-bold">{g.name}</h4>
            <span className="ros:text-[13px] ros:text-white/40">{g.items.length} {g.items.length === 1 ? "message" : "messages"}</span>
          </div>
          <div className="ros:-mx-1 ros:mt-3 ros:grid ros:grid-cols-1 ros:gap-3 ros:sm:grid-cols-2 ros:xl:grid-cols-3 ros:2xl:grid-cols-4">
            {g.items.map((s, i) => <SermonCard key={s.id} s={s} index={i} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
