"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "ABOUT",       href: "/about" },
  { label: "QUICK LINKS", href: "/events" },
  { label: "GROUPS",      href: "/groups" },
  { label: "SERMONS",     href: "/media" },
  { label: "TRAININGS",   href: "/trainings" },
  { label: "GIVE",        href: "/give" },
];

const MENU_COLS = [
  {
    title: "CONNECT",
    links: [
      { label: "Meet the Church",      href: "/about" },
      { label: "First-Timer",          href: "/first-timer" },
      { label: "Become an E-Member",   href: "/e-member" },
      { label: "Prayer Request",       href: "/requests/prayer" },
      { label: "New Believer",         href: "/new-believer" },
    ],
  },
  {
    title: "MINISTRIES",
    links: [
      { label: "Church Groups",        href: "/groups" },
      { label: "CSR Program",          href: "/csr" },
      { label: "Youth Ministry",       href: "/groups" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "Training Programs",    href: "/trainings" },
      { label: "Gallery",              href: "/gallery" },
      { label: "Announcements",        href: "/announcements" },
      { label: "Celebrations",         href: "/celebrations" },
      { label: "Testimonies",          href: "/testimonies" },
    ],
  },
  {
    title: "MEDIA",
    links: [
      { label: "Watch Online",         href: "/media" },
      { label: "Upcoming Events",      href: "/events" },
      { label: "Marketplace",          href: "/marketplace" },
      { label: "Give Online",          href: "/give" },
    ],
  },
];

export default function Navbar(_: { activePage?: string }) {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Top bar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0E0E0E]/96 backdrop-blur-md shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-5 md:px-10 xl:px-14 h-[68px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 z-10 flex-shrink-0">
            <div className="relative w-9 h-9">
              <Image src="/assets/logo.png" alt="RCCG Rose of Sharon" fill className="object-contain" />
            </div>
            <div className="relative w-[125px] h-[17px] hidden sm:block">
              <Image src="/assets/logo-text.svg" alt="Rose of Sharon" fill className="object-contain" />
            </div>
          </Link>

          {/* Desktop center links */}
          <div className="hidden xl:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-barlow-condensed text-white/80 text-[12px] font-semibold tracking-[0.18em] hover:text-white transition-colors duration-200 whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side: GIVE + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/give"
              className="hidden sm:inline-flex font-barlow-condensed items-center px-5 py-2 bg-[#C0362A] text-white text-[12px] font-bold tracking-[0.14em] rounded-full hover:bg-[#A02820] transition-colors duration-200 whitespace-nowrap"
            >
              GIVE
            </Link>

            {/* Hamburger — always visible (matches CCI) */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="relative flex flex-col justify-center items-end w-9 h-9 gap-[5px]"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 origin-right ${menuOpen ? "w-7 -rotate-45 translate-y-[7px]" : "w-7"}`} />
              <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 ${menuOpen ? "w-0 opacity-0" : "w-4"}`} />
              <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 origin-right ${menuOpen ? "w-7 rotate-45 -translate-y-[7px]" : "w-7"}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Full-screen overlay menu ── */}
      <div
        className={`fixed inset-0 z-40 bg-[#0E0E0E] overflow-y-auto transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* inner padding */}
        <div className="min-h-full flex flex-col justify-between px-6 md:px-14 xl:px-20 pt-28 pb-12">
          {/* 4-col link grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-16">
            {MENU_COLS.map((col) => (
              <div key={col.title}>
                <p className="font-barlow-condensed text-[#C0362A] text-[10px] font-bold tracking-[0.25em] border-b border-white/10 pb-3 mb-5">
                  {col.title}
                </p>
                <ul className="flex flex-col gap-3.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        onClick={() => setMenuOpen(false)}
                        className="font-barlow text-white/70 text-[15px] hover:text-white hover:pl-1 inline-block transition-all duration-200"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* bottom bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-center gap-5 flex-wrap">
              {[
                { label: "INSTAGRAM", href: "https://www.instagram.com/rccgros/?hl=en" },
                { label: "FACEBOOK",  href: "https://www.facebook.com/rccgrospage/" },
                { label: "YOUTUBE",   href: "https://www.youtube.com/@rccgrostv" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-barlow-condensed text-white/40 text-[11px] font-bold tracking-[0.22em] hover:text-white transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
            <Link
              href="/give"
              onClick={() => setMenuOpen(false)}
              className="font-barlow-condensed px-8 py-3 bg-[#C0362A] text-white text-[13px] font-bold tracking-[0.14em] rounded-full hover:bg-[#A02820] transition-colors"
            >
              GIVE NOW →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
