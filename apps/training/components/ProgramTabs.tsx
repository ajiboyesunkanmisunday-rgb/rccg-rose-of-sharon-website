"use client";

import Link from "@ros/shared/link";
import { usePathname } from "next/navigation";
import { getProgram, programMenu } from "@ros/shared/kit/programs";
import { isUnder } from "@ros/shared/sites";

/** Tab strip that ties the pages of one program together (Overview · Register · Exam · Coordinator …). */
export default function ProgramTabs({ slug }: { slug: string }) {
  const pathname = usePathname() ?? "";
  const program = getProgram(slug);
  const pages = programMenu(program);
  const current = pages.filter((p) => !p.href.includes("#")).sort((a, b) => b.href.length - a.href.length).find((p) => isUnder(pathname, p.href));
  return (
    <nav aria-label={`${program.name} pages`} className="ros:mb-8 ros:flex ros:flex-col ros:gap-3">
      <p className="ros:text-[10px] ros:font-bold ros:uppercase ros:tracking-[0.2em] ros:text-[#00000066]">{program.name}</p>
      <div className="ros:flex ros:flex-wrap ros:gap-2">
        {pages.map((p) => {
          const active = current?.href === p.href;
          return (
            <Link
              key={p.label}
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
