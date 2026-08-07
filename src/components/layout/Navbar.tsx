"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Meet the Church", href: "#about", active: true },
  { label: "Media", href: "#media" },
  { label: "Trainings", href: "#trainings", hasDropdown: true },
  { label: "Groups", href: "#groups", hasDropdown: true },
  { label: "Testimonies", href: "#testimonies" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-[100px] py-[16px]">
      <div className="flex items-center gap-[12px]">
        <Image src="/assets/logo.png" alt="RCCG Rose of Sharon logo" width={46} height={46} />
        <Image src="/assets/logo-text.svg" alt="Rose of Sharon" width={194} height={30} />
      </div>

      <div className="hidden lg:flex items-center gap-[16px]">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`flex items-center gap-1 py-1 text-[#FFFDFD] text-[16px] font-normal hover:text-white transition-colors ${
              link.active ? "border-b-[3px] border-[#000080]" : ""
            }`}
          >
            {link.label}
            {link.hasDropdown && (
              <svg className="w-3 h-3 ml-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </Link>
        ))}
      </div>

      <div className="hidden lg:flex items-center gap-3">
        <Link
          href="#calendar"
          className="px-8 py-3 bg-[#B5B5F3] text-[#000080] rounded-full text-base font-medium hover:opacity-90 transition-opacity"
        >
          Calendar
        </Link>
        <Link
          href="#requests"
          className="px-8 py-3 border-2 border-[#B5B5F3] text-[#B5B5F3] rounded-full text-base hover:bg-[#B5B5F3]/10 transition-colors"
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
            <Link
              key={link.label}
              href={link.href}
              className="text-white text-lg py-2 border-b border-white/10"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2">
            <Link href="#calendar" className="px-6 py-2 bg-[#B5B5F3] text-[#000080] rounded-full font-medium">
              Calendar
            </Link>
            <Link href="#requests" className="px-6 py-2 border-2 border-[#B5B5F3] text-[#B5B5F3] rounded-full">
              CSR
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
