"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import NextLink from "next/link";
import { A } from "@ros/shared/link";
import { PlayerBar, PlayerProvider } from "./Player";

const NAV = [
  { href: "/", label: "Home", icon: <path d="M3 11.5 12 4l9 7.5M5.5 10v9.5h13V10" /> },
  { href: "/series", label: "Series", icon: <path d="M4 7h16M6 3.5h12M4 11h16v9.5H4z" /> },
  { href: "/live", label: "Live", icon: <><circle cx="12" cy="12" r="2.3" /><path d="M7.4 7.4a6.5 6.5 0 0 0 0 9.2M16.6 7.4a6.5 6.5 0 0 1 0 9.2M4.6 4.6a10.5 10.5 0 0 0 0 14.8M19.4 4.6a10.5 10.5 0 0 1 0 14.8" /></> },
  { href: "/gallery", label: "Gallery", icon: <path d="M4 5h16v14H4zM4 15l5-5 4 4 3-3 4 4" /> },
];
const MORE = [
  { href: "/events", label: "Events & Services" },
  { href: "/announcements", label: "Announcements" },
  { href: "/testimonies", label: "Testimonies" },
];

function Icon({ children }: { children: React.ReactNode }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="ros:size-5">{children}</svg>;
}

function SearchBox() {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("search") ?? "");
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => setQ(params.get("search") ?? ""), [params]);
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); router.push(`/?search=${encodeURIComponent(q.trim())}`); ref.current?.blur(); }}
      className="ros:absolute ros:left-1/2 ros:top-1/2 ros:hidden ros:w-[min(46vw,440px)] ros:-translate-x-1/2 ros:-translate-y-1/2 ros:md:block"
      role="search"
    >
      <label className="ros:flex ros:items-center ros:gap-2 ros:rounded-full ros:bg-white/10 ros:px-4 ros:py-2.5 ros:transition ros:focus-within:bg-white/15">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="ros:size-[18px] ros:flex-shrink-0 ros:text-white/50"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
        <input ref={ref} value={q} onChange={(e) => setQ(e.target.value)} name="search" placeholder="Search" aria-label="Search sermons" className="ros:w-full ros:bg-transparent ros:text-[15px] ros:text-white ros:outline-none ros:placeholder:text-white/40" />
      </label>
    </form>
  );
}

/** App-style frame for the sermons pages: black header, side navigation, rounded content panel, bottom nav on phones. */
export default function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname() ?? "/";
  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));
  const link = (isActive: boolean) => `ros:flex ros:items-center ros:gap-3 ros:rounded-lg ros:px-4 ros:py-3 ros:text-[15px] ros:font-semibold ros:transition ${isActive ? "ros:bg-white/10 ros:text-white" : "ros:text-white/60 ros:hover:bg-white/5 ros:hover:text-white"}`;
  return (
    <PlayerProvider>
      <div className="sermons-app" style={{ background: "#000", color: "#fafafa", fontFamily: "Lato, sans-serif", height: "100dvh", display: "flex", flexDirection: "column" }}>
        <header className="ros:relative ros:flex ros:flex-shrink-0 ros:items-center ros:justify-between ros:px-4 ros:py-3" style={{ background: "#000", boxShadow: "0 1px 0 rgba(255,255,255,0.06)" }}>
          <div className="ros:flex ros:items-center ros:gap-3">
            <A href="/" aria-label="Back to the Rose of Sharon website" title="Back to the Rose of Sharon website"><img src="/ros-logo.png" alt="RCCG Rose of Sharon" className="ros:size-9 ros:object-contain" /></A>
            <NextLink href="/" className="ros:text-[20px] ros:font-black ros:tracking-wide">SERMONS</NextLink>
          </div>
          <Suspense><SearchBox /></Suspense>
          <A href="/" className="ros:flex ros:items-center ros:gap-2 ros:rounded-full ros:border ros:border-white/15 ros:px-4 ros:py-2 ros:text-[12px] ros:font-bold ros:text-white/70 ros:transition ros:hover:border-white/40 ros:hover:text-white ros:md:hidden">ROS</A>
        </header>

        <div className="ros:flex ros:min-h-0 ros:flex-1 ros:gap-2 ros:p-2 ros:pt-1">
          <aside className="ros:hidden ros:w-[250px] ros:flex-shrink-0 ros:flex-col ros:gap-1 ros:rounded-xl ros:p-3 ros:md:flex" style={{ background: "#0a0a0a" }} aria-label="Sermons navigation">
            {NAV.map((n) => (
              <NextLink key={n.href} href={n.href} className={link(active(n.href))}>
                <Icon>{n.icon}</Icon>
                {n.label}
              </NextLink>
            ))}
            <p className="ros:mt-5 ros:px-4 ros:text-[11px] ros:font-bold ros:uppercase ros:tracking-[0.2em] ros:text-white/30">More from ROS</p>
            {MORE.map((m) => (
              <NextLink key={m.href} href={m.href} className="ros:rounded-lg ros:px-4 ros:py-2 ros:text-[14px] ros:text-white/60 ros:transition ros:hover:bg-white/5 ros:hover:text-white">{m.label}</NextLink>
            ))}
            <A href="/" className="ros:mt-auto ros:flex ros:items-center ros:gap-2 ros:rounded-lg ros:px-4 ros:py-3 ros:text-[15px] ros:text-white/50 ros:transition ros:hover:bg-white/5 ros:hover:text-white">
              Visit ROS
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="ros:size-4"><path d="M7 17 17 7M8 7h9v9" /></svg>
            </A>
          </aside>
          <main className="ros:min-w-0 ros:flex-1 ros:overflow-y-auto ros:rounded-xl ros:px-4 ros:pb-24 ros:pt-8 ros:md:pb-8" style={{ background: "#0a0a0a" }}>{children}</main>
        </div>

        <PlayerBar />

        <nav className="ros:fixed ros:bottom-0 ros:left-0 ros:right-0 ros:z-30 ros:flex ros:justify-around ros:border-t ros:border-white/10 ros:py-2 ros:md:hidden" style={{ background: "#000" }} aria-label="Sermons navigation">
          {NAV.map((n) => (
            <NextLink key={n.href} href={n.href} className={`ros:flex ros:flex-col ros:items-center ros:gap-1 ros:px-5 ros:py-1 ros:text-[11px] ros:font-semibold ${active(n.href) ? "ros:text-white" : "ros:text-white/50"}`}>
              <Icon>{n.icon}</Icon>
              {n.label}
            </NextLink>
          ))}
        </nav>
      </div>
    </PlayerProvider>
  );
}
