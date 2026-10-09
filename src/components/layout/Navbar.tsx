"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "ABOUT", href: "/about" },
  { label: "MEDIA", href: "/media" },
  { label: "GROUPS", href: "/groups" },
  { label: "TRAININGS", href: "/trainings" },
  { label: "EVENTS", href: "/events" },
  { label: "MARKETPLACE", href: "/marketplace" },
];

const MENU_SECTIONS = [
  {
    title: "CONNECT",
    links: [
      { label: "Meet the Church", href: "/about" },
      { label: "First-Timer", href: "/first-timer" },
      { label: "Become an E-Member", href: "/e-member" },
      { label: "Prayer Request", href: "/requests/prayer" },
    ],
  },
  {
    title: "MINISTRIES",
    links: [
      { label: "Church Groups", href: "/groups" },
      { label: "CSR Program", href: "/csr" },
      { label: "New Believer", href: "/new-believer" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "Training Programs", href: "/trainings" },
      { label: "Gallery", href: "/gallery" },
      { label: "Announcements", href: "/announcements" },
      { label: "Celebrations", href: "/celebrations" },
      { label: "Testimonies", href: "/testimonies" },
    ],
  },
  {
    title: "MEDIA",
    links: [
      { label: "Watch Online", href: "/media" },
      { label: "Upcoming Events", href: "/events" },
      { label: "Marketplace", href: "/marketplace" },
    ],
  },
];

export default function Navbar(_: { activePage?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0F0F0F]/95 backdrop-blur-md shadow-xl"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 xl:px-16 h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 z-10">
            <div className="relative w-9 h-9">
              <Image src="/assets/logo.png" alt="RCCG Rose of Sharon" fill className="object-contain" />
            </div>
            <div className="relative w-[130px] h-[18px] hidden sm:block">
              <Image src="/assets/logo-text.svg" alt="Rose of Sharon" fill className="object-contain" />
            </div>
          </Link>

          {/* Desktop nav links — centered */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-barlow-condensed text-white/90 text-[13px] font-semibold tracking-[0.12em] hover:text-[#C1272D] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Give CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/give"
              className="hidden sm:inline-flex font-barlow-condensed items-center px-5 py-2 bg-[#C1272D] text-white text-[13px] font-bold tracking-[0.1em] rounded-full hover:bg-[#A01F23] transition-colors duration-200"
            >
              GIVE
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col justify-center items-center w-10 h-10 gap-[5px] group"
              aria-label="Menu"
            >
              <span
                className={`block h-[2px] bg-white rounded-full transition-all duration-300 ${
                  menuOpen ? "w-6 rotate-45 translate-y-[7px]" : "w-6"
                }`}
              />
              <span
                className={`block h-[2px] bg-white rounded-full transition-all duration-300 ${
                  menuOpen ? "w-0 opacity-0" : "w-4 group-hover:w-6"
                }`}
              />
              <span
                className={`block h-[2px] bg-white rounded-full transition-all duration-300 ${
                  menuOpen ? "w-6 -rotate-45 -translate-y-[7px]" : "w-6"
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen menu overlay */}
      <div
        ref={menuRef}
        className={`fixed inset-0 z-40 bg-[#0F0F0F] transition-all duration-500 overflow-y-auto ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="min-h-full px-6 md:px-16 xl:px-24 pt-28 pb-16">
          {/* 4-column link grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
            {MENU_SECTIONS.map((section) => (
              <div key={section.title} className="flex flex-col gap-5">
                <p className="font-barlow-condensed text-[#C1272D] text-[11px] font-bold tracking-[0.2em] uppercase border-b border-white/10 pb-3">
                  {section.title}
                </p>
                <ul className="flex flex-col gap-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="font-barlow text-white/80 text-[15px] font-normal hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom: social + CTA */}
          <div className="mt-16 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/rccgros/?hl=en" target="_blank" rel="noopener noreferrer"
                className="font-barlow-condensed text-white/50 text-[12px] font-semibold tracking-widest hover:text-white transition-colors">
                INSTAGRAM
              </a>
              <span className="text-white/20">·</span>
              <a href="https://www.facebook.com/rccgrospage/" target="_blank" rel="noopener noreferrer"
                className="font-barlow-condensed text-white/50 text-[12px] font-semibold tracking-widest hover:text-white transition-colors">
                FACEBOOK
              </a>
              <span className="text-white/20">·</span>
              <a href="https://www.youtube.com/@rccgrostv" target="_blank" rel="noopener noreferrer"
                className="font-barlow-condensed text-white/50 text-[12px] font-semibold tracking-widest hover:text-white transition-colors">
                YOUTUBE
              </a>
            </div>
            <Link
              href="/give"
              onClick={() => setMenuOpen(false)}
              className="font-barlow-condensed px-8 py-3 bg-[#C1272D] text-white text-[14px] font-bold tracking-[0.1em] rounded-full hover:bg-[#A01F23] transition-colors"
            >
              GIVE NOW →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
