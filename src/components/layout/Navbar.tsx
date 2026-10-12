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

          {/* Desktop center links — hidden when overlay is open, matching CCI */}
          <div className={`items-center gap-6 ${menuOpen ? "hidden" : "hidden lg:flex"}`}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[11px] font-bold uppercase tracking-[0.12em] hover:text-white transition-colors duration-200 whitespace-nowrap ${
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
          FULLSCREEN OVERLAY — CCI-exact layout
      ══════════════════════════════════════════════ */}
      <div
        className={`fixed inset-0 z-40 bg-black overflow-y-auto no-scrollbar transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Top bar within overlay */}
        <div className="flex justify-between items-center p-4 w-full">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <div className="relative w-9 h-9">
              <Image src="/assets/logo.png" alt="RCCG Rose of Sharon" fill className="object-contain brightness-0 invert" />
            </div>
          </Link>
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu"
            className="text-white/60 hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Centered content: left primary nav + right sub-links */}
        <div className="flex justify-center items-center mx-auto max-w-screen-2xl min-h-[calc(100vh-68px)]">
          <div className="flex md:flex-row flex-col justify-between items-start lg:items-center gap-4 w-[90%]">

            {/* LEFT: Primary navigation */}
            <div className="w-full max-w-full lg:max-w-[450px] md:max-w-xs font-anton font-medium text-white text-5xl lg:text-7xl uppercase leading-tight">
              {PRIMARY_NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block font-anton font-medium hover:text-[#C0362A] transition-colors duration-200 ${
                    isActive(item.href) ? "text-[#C0362A]" : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* RIGHT: Sub-link columns */}
            <div className="w-full py-8 md:py-0">
              <div className="gap-y-12 grid grid-cols-2 lg:grid-cols-3">
                {SUB_COLS.map((col) => (
                  <div key={col.title} className="flex flex-col gap-4 text-white">
                    <h2 className="font-bold text-[#FFFFFFAA] text-xs">{col.title}</h2>
                    {col.links.map((l) => (
                      <Link key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                        className="text-sm hover:underline">
                        {l.label}
                      </Link>
                    ))}
                  </div>
                ))}
                {/* MEDIA as 4th grid item */}
                <div className="flex flex-col gap-4 text-white">
                  <h2 className="font-bold text-[#FFFFFFAA] text-xs">MEDIA</h2>
                  {MEDIA_LINKS.map((l) => (
                    <Link key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                      className="text-sm hover:underline">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Bottom bar: copyright + socials */}
              <div className="flex md:flex-row flex-col justify-between items-center gap-2 my-6 w-full">
                <p className="text-[#FFFFFF66] text-[10px] md:text-xs">
                  © Copyright {new Date().getFullYear()} RCCG Rose of Sharon. All Rights Reserved.
                </p>
                <div className="flex items-center gap-2">
                  {SOCIALS.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex justify-center items-center bg-[#FFFFFF1F] rounded-full w-10 h-10 text-white hover:bg-white/30 transition-colors">
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
