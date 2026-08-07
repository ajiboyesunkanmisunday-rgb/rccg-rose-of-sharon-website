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
    <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-25 py-4">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 py-1">
        <div className="w-[46px] h-[46px] rounded-full bg-white/20 flex items-center justify-center">
          <span className="text-white text-lg font-bold">✝</span>
        </div>
        <span className="text-white font-semibold text-xl tracking-wide">Rose of Sharon</span>
      </div>

      {/* Desktop nav links */}
      <div className="hidden lg:flex items-center gap-4">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`flex items-center gap-1 px-1 py-1 text-white/90 text-base hover:text-white transition-colors ${
              link.active ? "border-b-[3px] border-[#000080]" : ""
            }`}
          >
            {link.label}
            {link.hasDropdown && (
              <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            )}
          </Link>
        ))}
      </div>

      {/* CTA buttons */}
      <div className="hidden lg:flex items-center gap-3">
        <Link
          href="#calendar"
          className="px-8 py-3 bg-[#B5B5F3] text-[#000080] rounded-full text-base font-medium hover:bg-[#c5c5f8] transition-colors"
        >
          Calendar
        </Link>
        <Link
          href="#csr"
          className="px-8 py-3 border-2 border-[#B5B5F3] text-[#B5B5F3] rounded-full text-base hover:bg-[#B5B5F3]/10 transition-colors"
        >
          CSR
        </Link>
      </div>

      {/* Mobile hamburger */}
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#100E1A]/95 backdrop-blur-sm lg:hidden p-6 flex flex-col gap-4">
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
            <Link href="#csr" className="px-6 py-2 border-2 border-[#B5B5F3] text-[#B5B5F3] rounded-full">
              CSR
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
