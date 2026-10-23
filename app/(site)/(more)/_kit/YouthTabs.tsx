"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { YOUTH_PAGES } from "./youth";

/** Tab strip that ties the pages of the Youth section together (same pill-tab style as the training programs). */
export default function YouthTabs() {
  const pathname = usePathname() ?? "";
  const current = [...YOUTH_PAGES].sort((a, b) => b.href.length - a.href.length).find((p) => pathname === p.href || pathname.startsWith(p.href + "/"));
  return (
    <nav aria-label="Youth pages" className="ros:mb-8 ros:flex ros:flex-col ros:gap-3">
      <p className="ros:text-[10px] ros:font-bold ros:uppercase ros:tracking-[0.2em] ros:text-[#00000066]">Rose of Sharon Youth</p>
      <div className="ros:flex ros:flex-wrap ros:gap-2">
        {YOUTH_PAGES.map((p) => {
          const active = current?.href === p.href;
          return (
            <Link
              key={p.key}
              href={p.href}
              className={`ros:rounded-full ros:border ros:px-4 ros:py-2 ros:text-[11px] ros:font-bold ros:uppercase ros:tracking-[0.15em] ros:transition ${
                active
                  ? "ros:border-black ros:bg-black ros:text-white"
                  : "ros:border-[#00000029] ros:bg-white ros:text-black ros:hover:border-[#DF4E4E] ros:hover:text-[#DF4E4E]"
              }`}
            >
              {p.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
