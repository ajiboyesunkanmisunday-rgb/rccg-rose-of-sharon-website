"use client";

import type { Sermon } from "@/lib/sermons";
import { slugify } from "@/lib/sermons";
import SermonCard from "./SermonCard";

/** Series: multi-part messages (Part 1, Part 2 ...) gathered under the name of the message, in part order. */
export default function SeriesList({ sermons }: { sermons: Sermon[] }) {
  const map = new Map<string, Sermon[]>();
  sermons.forEach((s) => { if (s.part && s.series) map.set(s.series, [...(map.get(s.series) ?? []), s]); });
  const series = [...map.entries()]
    .filter(([, items]) => items.length >= 2)
    .map(([name, items]) => {
      const sorted = [...items].sort((a, b) => (a.part ?? 0) - (b.part ?? 0));
      return { name, items: sorted };
    })
    .sort((a, b) => b.items.length - a.items.length || +new Date(b.items[0].date) - +new Date(a.items[0].date));

  return (
    <div>
      <h3 className="ros:text-[26px] ros:font-bold ros:md:text-[30px]">Series</h3>
      <p className="ros:mt-1 ros:max-w-2xl ros:text-white/50">Multi-part teachings, with every part in order.</p>

      {sermons.length === 0 && <p className="ros:my-16 ros:text-center ros:text-white/50">Series will appear here once messages are uploaded.</p>}
      {sermons.length > 0 && series.length === 0 && <p className="ros:my-10 ros:text-white/50">No series yet. Multi-part messages will be grouped here.</p>}

      {series.map((g) => (
        <section key={g.name} id={slugify(g.name)} className="ros:mt-10" aria-label={g.name} style={{ scrollMarginTop: 90 }}>
          <div className="ros:flex ros:items-end ros:justify-between ros:gap-3 ros:border-b ros:border-white/10 ros:pb-2">
            <h4 className="ros:text-[20px] ros:font-bold">{g.name}<span className="ros:ml-3 ros:rounded-full ros:bg-white/10 ros:px-3 ros:py-0.5 ros:align-middle ros:text-[11px] ros:font-bold ros:uppercase ros:tracking-[0.15em] ros:text-white/70">Multi-part</span></h4>
            <span className="ros:whitespace-nowrap ros:text-[13px] ros:text-white/40">{g.items.length} parts</span>
          </div>
          <div className="ros:-mx-1 ros:mt-3 ros:grid ros:grid-cols-1 ros:gap-3 ros:sm:grid-cols-2 ros:xl:grid-cols-3 ros:2xl:grid-cols-4">
            {g.items.map((s, i) => (
              <div key={s.id} className="ros:relative">
                <span className="ros:absolute ros:left-4 ros:top-4 ros:z-10 ros:rounded-full ros:bg-white ros:px-2.5 ros:py-0.5 ros:text-[11px] ros:font-extrabold ros:text-black">Part {s.part}</span>
                <SermonCard s={s} index={i} queue={g.items} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
