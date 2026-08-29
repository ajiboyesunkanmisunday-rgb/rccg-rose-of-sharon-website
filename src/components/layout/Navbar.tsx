"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const trainingLinks = [
  { label: "Water Baptism", href: "/trainings/water-baptism" },
  { label: "Workers in Training", href: "/trainings/workers-in-training" },
  { label: "School of Disciples", href: "/trainings/school-of-disciples" },
  { label: "School of Ministry", href: "/trainings/school-of-ministry" },
  { label: "RILA", href: "/trainings/rila" },
];

const navLinks = [
  { label: "Meet the Church", href: "/about", key: "about" },
  { label: "Media", href: "/media", key: "media" },
  { label: "Trainings", href: "/trainings", hasDropdown: true, key: "trainings" },
  { label: "Groups", href: "/groups", key: "groups" },
  { label: "Testimonies", href: "/testimonies", key: "testimonies" },
  { label: "Online Give", href: "/give", key: "give" },
  { label: "Market Place", href: "/marketplace", key: "marketplace" },
];

const vs = { fontVariationSettings: '"wdth" 100' };

interface NavbarProps {
  activePage?: string;
}

export default function Navbar({ activePage }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [trainingsOpen, setTrainingsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setTrainingsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-[100px] py-[16px]">
      <Link href="/" className="flex items-center gap-[12px]">
        <Image src="/assets/logo.png" alt="RCCG Rose of Sharon logo" width={46} height={46} />
        <Image src="/assets/logo-text.svg" alt="Rose of Sharon" width={194} height={30} />
      </Link>

      <div className="hidden lg:flex items-center gap-[16px]">
        {navLinks.map((link) => {
          const isActive = link.key ? link.key === activePage : false;

          if (link.hasDropdown) {
            return (
              <div key={link.label} className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setTrainingsOpen((o) => !o)}
                  className={`flex items-center gap-1 py-1 text-[#FFFDFD] text-[16px] font-normal hover:text-white transition-colors ${
                    isActive ? "border-b-[3px] border-[#000080]" : ""
                  }`}
                  style={vs}
                >
                  {link.label}
                  <svg
                    className={`w-3 h-3 ml-0.5 flex-shrink-0 transition-transform ${trainingsOpen ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {trainingsOpen && (
                  <div className="absolute top-full left-0 mt-[8px] bg-[#100E1A] border border-[#B5B5F3]/20 rounded-[12px] py-[8px] min-w-[220px] shadow-[0px_8px_32px_rgba(0,0,0,0.4)] z-50">
                    <Link
                      href="/trainings"
                      onClick={() => setTrainingsOpen(false)}
                      className="block px-[16px] py-[8px] text-[#B5B5F3] text-[13px] font-medium uppercase tracking-wider hover:bg-[#B5B5F3]/10 transition-colors"
                      style={vs}
                    >
                      All Programs
                    </Link>
                    <div className="border-t border-[#B5B5F3]/10 my-[4px]" />
                    {trainingLinks.map((t) => (
                      <Link
                        key={t.href}
                        href={t.href}
                        onClick={() => setTrainingsOpen(false)}
                        className="block px-[16px] py-[10px] text-[#FFFDFD] text-[15px] font-normal hover:bg-[#B5B5F3]/10 hover:text-[#B5B5F3] transition-colors"
                        style={vs}
                      >
                        {t.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center gap-1 py-1 text-[#FFFDFD] text-[16px] font-normal hover:text-white transition-colors ${
                isActive ? "border-b-[3px] border-[#000080]" : ""
              }`}
              style={vs}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      <div className="hidden lg:flex items-center gap-3">
        <Link
          href="/events"
          className="px-[32px] py-[12px] bg-[#B5B5F3] text-[#000080] rounded-[30px] text-[16px] font-normal hover:opacity-90 transition-opacity"
          style={vs}
        >
          Calendar
        </Link>
        <Link
          href="/csr"
          className="px-[32px] py-[12px] border-2 border-[#B5B5F3] text-[#B5B5F3] rounded-[30px] text-[16px] font-normal hover:bg-[#B5B5F3]/10 transition-colors"
          style={vs}
        >
          CSR
        </Link>
      </div>

      <button
        className="lg:hidden text-white p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#100E1A]/95 backdrop-blur-sm lg:hidden p-6 flex flex-col gap-4 z-50">
          {navLinks.map((link) => (
            <div key={link.label}>
              <Link
                href={link.href}
                className="text-white text-lg py-2 border-b border-white/10 block"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
              {link.hasDropdown && (
                <div className="pl-4 flex flex-col gap-2 pt-2">
                  {trainingLinks.map((t) => (
                    <Link
                      key={t.href}
                      href={t.href}
                      className="text-[#B5B5F3] text-[14px] py-1"
                      onClick={() => setMenuOpen(false)}
                      style={vs}
                    >
                      {t.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <Link href="/events" className="px-6 py-2 bg-[#B5B5F3] text-[#000080] rounded-full font-medium">
              Calendar
            </Link>
            <Link href="/csr" className="px-6 py-2 border-2 border-[#B5B5F3] text-[#B5B5F3] rounded-full">
              CSR
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
