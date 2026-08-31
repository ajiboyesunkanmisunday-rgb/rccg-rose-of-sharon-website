"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const vs = { fontVariationSettings: '"wdth" 100' };

const trainingLinks = [
  { label: "Water Baptism", href: "/trainings/water-baptism" },
  { label: "Workers in Training", href: "/trainings/workers-in-training" },
  { label: "School of Disciples", href: "/trainings/school-of-disciples" },
  { label: "School of Ministry", href: "/trainings/school-of-ministry" },
  { label: "RILA", href: "/trainings/rila" },
];

const groupLinks = [
  { label: "Hearts of David", href: "/groups" },
  { label: "Oaks of Righteousness", href: "/groups" },
  { label: "Young Professionals", href: "/groups" },
];

const dropdownLinks: Record<string, { label: string; href: string }[]> = {
  trainings: trainingLinks,
  groups: groupLinks,
};

const navLinks = [
  { label: "Meet the Church", href: "/about", key: "about" },
  { label: "Media", href: "/media", key: "media" },
  { label: "Trainings", href: "/trainings", dropdown: "trainings", key: "trainings" },
  { label: "Groups", href: "/groups", dropdown: "groups", key: "groups" },
  { label: "Testimonies", href: "/testimonies", key: "testimonies" },
  { label: "Marketplace", href: "/marketplace", key: "marketplace" },
];

interface NavbarProps {
  activePage?: string;
}

export default function Navbar({ activePage }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 30);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 xl:px-[100px] transition-all duration-300 ${
        scrolled
          ? "py-[12px] bg-[rgba(10,8,24,0.88)] backdrop-blur-[14px] border-b border-[#B5B5F3]/10 shadow-[0_4px_32px_rgba(0,0,0,0.35)]"
          : "py-[18px] bg-transparent"
      }`}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-[12px]">
        <div className="relative w-[36px] h-[36px] xl:w-[46px] xl:h-[46px]">
          <Image src="/assets/logo.png" alt="RCCG Rose of Sharon logo" fill className="object-contain" />
        </div>
        <div className="relative w-[130px] h-[20px] xl:w-[194px] xl:h-[30px]">
          <Image src="/assets/logo-text.svg" alt="Rose of Sharon" fill className="object-contain" />
        </div>
      </Link>

      {/* Desktop nav — xl and above */}
      <div className="hidden xl:flex items-center gap-[12px]">
        {navLinks.map((link) => {
          const isActive = link.key === activePage;

          if (link.dropdown) {
            const isOpen = openDropdown === link.dropdown;
            const links = dropdownLinks[link.dropdown];
            return (
              <div key={link.key} className="relative">
                <button
                  onClick={() => setOpenDropdown(isOpen ? null : link.dropdown!)}
                  className={`flex items-center gap-1 py-1 text-[#FFFDFD] text-[15px] font-normal hover:text-white transition-colors ${
                    isActive ? "border-b-[3px] border-[#000080]" : ""
                  }`}
                  style={vs}
                >
                  {link.label}
                  <svg
                    className={`w-3 h-3 ml-0.5 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="dropdown-enter absolute top-full left-0 mt-[8px] bg-[rgba(10,8,24,0.95)] backdrop-blur-[12px] border border-[#B5B5F3]/20 rounded-[16px] py-[8px] min-w-[220px] shadow-[0px_16px_48px_rgba(0,0,0,0.5)] z-50">
                    <Link
                      href={link.href}
                      onClick={() => setOpenDropdown(null)}
                      className="block px-[16px] py-[8px] text-[#B5B5F3] text-[13px] font-medium uppercase tracking-wider hover:bg-[#B5B5F3]/10 transition-colors"
                      style={vs}
                    >
                      All {link.label}
                    </Link>
                    <div className="border-t border-[#B5B5F3]/10 my-[4px]" />
                    {links.map((l) => (
                      <Link
                        key={l.label}
                        href={l.href}
                        onClick={() => setOpenDropdown(null)}
                        className="block px-[16px] py-[10px] text-[#FFFDFD] text-[15px] font-normal hover:bg-[#B5B5F3]/10 hover:text-[#B5B5F3] transition-colors"
                        style={vs}
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={link.key}
              href={link.href}
              className={`flex items-center gap-1 py-1 text-[#FFFDFD] text-[15px] font-normal hover:text-white transition-colors ${
                isActive ? "border-b-[3px] border-[#000080]" : ""
              }`}
              style={vs}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Desktop CTA buttons */}
      <div className="hidden xl:flex items-center gap-3">
        <Link
          href="/events"
          className="px-[24px] py-[10px] bg-[#B5B5F3] text-[#000080] rounded-[30px] text-[14px] font-normal hover:opacity-90 transition-opacity"
          style={vs}
        >
          Calendar
        </Link>
        <Link
          href="/csr"
          className="px-[24px] py-[10px] border-2 border-[#B5B5F3] text-[#B5B5F3] rounded-[30px] text-[14px] font-normal hover:bg-[#B5B5F3]/10 transition-colors"
          style={vs}
        >
          CSR
        </Link>
      </div>

      {/* Hamburger — below xl */}
      <button
        className="xl:hidden text-white p-2 z-50"
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
        <div className="dropdown-enter absolute top-full left-0 right-0 bg-[rgba(10,8,24,0.96)] backdrop-blur-[16px] xl:hidden flex flex-col z-40 shadow-[0_16px_48px_rgba(0,0,0,0.5)] border-b border-[#B5B5F3]/10">
          <div className="px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <div key={link.key}>
                {link.dropdown ? (
                  <>
                    <button
                      className={`flex items-center justify-between w-full py-3 text-white text-[16px] font-normal border-b border-white/10 ${
                        link.key === activePage ? "text-[#B5B5F3]" : ""
                      }`}
                      onClick={() => setMobileExpanded(mobileExpanded === link.dropdown ? null : link.dropdown!)}
                      style={vs}
                    >
                      {link.label}
                      <svg
                        className={`w-4 h-4 transition-transform ${mobileExpanded === link.dropdown ? "rotate-180" : ""}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {mobileExpanded === link.dropdown && (
                      <div className="pl-4 flex flex-col gap-0 bg-[#1A1826]">
                        {dropdownLinks[link.dropdown].map((l) => (
                          <Link
                            key={l.label}
                            href={l.href}
                            className="block py-2 text-[#B5B5F3] text-[14px] border-b border-white/5"
                            onClick={() => setMenuOpen(false)}
                            style={vs}
                          >
                            {l.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={`block py-3 text-white text-[16px] font-normal border-b border-white/10 ${
                      link.key === activePage ? "text-[#B5B5F3]" : ""
                    }`}
                    onClick={() => setMenuOpen(false)}
                    style={vs}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}

            <div className="flex gap-3 pt-4 pb-2">
              <Link
                href="/events"
                className="flex-1 text-center px-4 py-3 bg-[#B5B5F3] text-[#000080] rounded-full text-[14px] font-bold"
                onClick={() => setMenuOpen(false)}
                style={vs}
              >
                Calendar
              </Link>
              <Link
                href="/csr"
                className="flex-1 text-center px-4 py-3 border-2 border-[#B5B5F3] text-[#B5B5F3] rounded-full text-[14px] font-medium"
                onClick={() => setMenuOpen(false)}
                style={vs}
              >
                CSR
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
