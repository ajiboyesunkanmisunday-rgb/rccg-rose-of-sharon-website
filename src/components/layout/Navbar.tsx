"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* ── Top bar center links (desktop) ── */
const NAV_LINKS = [
  { label: "About",       href: "/about" },
  { label: "Quick Links", href: "/events" },
  { label: "Groups",      href: "/groups" },
  { label: "Sermons",     href: "/media" },
  { label: "Trainings",   href: "/trainings" },
  { label: "CSR",         href: "/csr" },
  { label: "Give",        href: "/give" },
];

/* ── Overlay: left-column primary items ── */
const PRIMARY_NAV = [
  { label: "HOME",      href: "/" },
  { label: "ABOUT",     href: "/about" },
  { label: "GROUPS",    href: "/groups" },
  { label: "SERMONS",   href: "/media" },
  { label: "TRAININGS", href: "/trainings" },
  { label: "CSR",       href: "/csr" },
  { label: "GIVE",      href: "/give" },
];

/* ── Overlay: right-section sub-link columns ── */
const SUB_COLS = [
  {
    title: "MINISTRIES",
    links: [
      { label: "Hearts of David",  href: "/groups" },
      { label: "Youth Ministry",   href: "/groups" },
      { label: "Women's Ministry", href: "/groups" },
      { label: "CSR Program",      href: "/csr" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "Celebrations",       href: "/celebrations" },
      { label: "Counselling",        href: "/requests/counseling" },
      { label: "Announcements",      href: "/announcements" },
      { label: "Testimonies",        href: "/testimonies" },
      { label: "Gallery",            href: "/gallery" },
    ],
  },
  {
    title: "CONNECT",
    links: [
      { label: "First-Timer",     href: "/first-timer" },
      { label: "Become a Member", href: "/e-member" },
      { label: "New Believer",    href: "/new-believer" },
      { label: "Prayer Request",  href: "/requests/prayer" },
    ],
  },
];

const MEDIA_LINKS = [
  { label: "Watch Online",     href: "/media" },
  { label: "Upcoming Events",  href: "/events" },
  { label: "Marketplace",      href: "/marketplace" },
  { label: "Give Online",      href: "/give" },
];

const SOCIALS = [
  {
    href: "https://www.instagram.com/rccgros/?hl=en",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    href: "https://www.facebook.com/rccgrospage/",
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    href: "https://www.youtube.com/@rccgrostv",
    label: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

export default function Navbar(_: { activePage?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <>
      {/* ── Top bar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          menuOpen
            ? "bg-transparent"
            : scrolled
            ? "bg-[#0E0E0E]/96 backdrop-blur-md shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-5 md:px-10 xl:px-14 h-[68px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 z-10 flex-shrink-0" onClick={() => setMenuOpen(false)}>
            <div className="relative w-9 h-9">
              <Image src="/assets/logo.png" alt="RCCG Rose of Sharon" fill className="object-contain" />
            </div>
            <div className="relative w-[125px] h-[17px] hidden sm:block">
              <Image src="/assets/logo-text.svg" alt="Rose of Sharon" fill className="object-contain" />
            </div>
          </Link>

          {/* Desktop center links — shown at lg+, matching CCI breakpoint */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`font-barlow text-[14px] font-normal hover:text-white transition-colors duration-200 whitespace-nowrap ${
                  isActive(link.href) ? "text-white" : "text-white/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Hamburger — always visible */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="relative z-[60] flex flex-col justify-center items-end w-10 h-10 gap-[5px]"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? "w-7 rotate-45 translate-y-[6.5px]" : "w-7"}`} />
            <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 ${menuOpen ? "w-0 opacity-0" : "w-4"}`} />
            <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? "w-7 -rotate-45 -translate-y-[6.5px]" : "w-7"}`} />
          </button>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════
          FULLSCREEN OVERLAY — CCI-precise layout
          LEFT: Huge primary nav
          RIGHT: Sub-link columns + media
          BOTTOM: Copyright + social icons
      ══════════════════════════════════════════════ */}
      <div
        className={`fixed inset-0 z-40 bg-black overflow-y-auto transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Top bar within overlay */}
        <div className="flex items-center justify-between px-6 md:px-12 xl:px-16 h-[68px]">
          <Link href="/" onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2.5 flex-shrink-0">
            <div className="relative w-9 h-9">
              <Image src="/assets/logo.png" alt="RCCG Rose of Sharon" fill className="object-contain brightness-0 invert" />
            </div>
          </Link>
        </div>

        {/* Main content: left primary nav + right sub-links */}
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-68px)] px-6 md:px-12 xl:px-16 pb-10">

          {/* LEFT: Huge primary navigation links */}
          <div className="flex flex-col justify-center lg:w-[42%] lg:pr-12 py-8 lg:py-0">
            <nav className="flex flex-col">
              {PRIMARY_NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`font-oswald font-bold uppercase leading-[0.95] tracking-tight transition-all duration-200 hover:opacity-100 ${
                    isActive(item.href)
                      ? "text-[#C0362A]"
                      : "text-white opacity-90 hover:text-[#C0362A]"
                  }`}
                  style={{ fontSize: "clamp(36px, 6.5vw, 76px)" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* RIGHT: Sub-link columns */}
          <div className="lg:w-[58%] flex flex-col justify-center py-8 lg:py-0 lg:pl-8 border-t border-white/10 lg:border-t-0 lg:border-l lg:border-white/10">
            {/* 3-col sub-links grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
              {SUB_COLS.map((col) => (
                <div key={col.title}>
                  <p className="font-barlow-condensed text-[#C0362A] text-[10px] font-bold tracking-[0.25em] uppercase mb-4">
                    {col.title}
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <Link
                          href={l.href}
                          onClick={() => setMenuOpen(false)}
                          className="font-barlow text-white/60 text-[14px] hover:text-white transition-colors duration-200 inline-block"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* MEDIA sub-section */}
            <div className="border-t border-white/10 pt-8">
              <p className="font-barlow-condensed text-[#C0362A] text-[10px] font-bold tracking-[0.25em] uppercase mb-4">
                MEDIA
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-2">
                {MEDIA_LINKS.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-barlow text-white/60 text-[14px] hover:text-white transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar: copyright + social icon circles */}
        <div className="px-6 md:px-12 xl:px-16 pb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/[0.08] pt-6 mt-auto">
          <p className="font-barlow text-white/25 text-[12px]">
            © Copyright {new Date().getFullYear()} RCCG Rose of Sharon. All Rights Reserved.
          </p>

          {/* Social icons in dark circles — matching CCI exactly */}
          <div className="flex items-center gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
