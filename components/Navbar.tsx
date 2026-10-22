"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, PRIMARY_NAV, MOBILE_COLUMNS, SOCIALS } from "./site-data";

const year = new Date().getFullYear();

function Logo({ className = "h-9" }: { className?: string }) {
  return (
    <span className="flex items-center gap-2.5">
      <img src="/assets/logo.png" alt="RCCG Rose of Sharon" className={`${className} w-auto`} />
      <img src="/assets/logo-text.svg" alt="Rose of Sharon" className="hidden h-4 w-auto sm:block" />
    </span>
  );
}

// ─── Desktop nav links ────────────────────────────────────────────────────────

function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <nav className="flex items-baseline gap-4 lg:gap-6">
      {NAV_LINKS.map((route) => {
        const isActive = pathname === route.href || pathname.startsWith(`${route.href}/`);
        return (
          <Link
            key={route.label}
            href={route.href}
            className={[
              "text-[10px] uppercase tracking-[0.3em]",
              isActive
                ? "font-black text-white hover:text-white/90"
                : "font-bold text-white/70 hover:text-white/90",
            ].join(" ")}
          >
            {route.label}
          </Link>
        );
      })}
    </nav>
  );
}

// ─── Mobile fullscreen menu ───────────────────────────────────────────────────

function MobileMenu({ setOpen, pathname }: { setOpen: (v: boolean) => void; pathname: string }) {
  return (
    <div className="no-scrollbar fixed inset-0 z-50 overflow-y-auto bg-black">
      <div className="flex w-full items-center justify-between p-4">
        <Link href="/" onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <button onClick={() => setOpen(false)} aria-label="Close menu">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27.0703 27.0713L12.9282 12.9292" stroke="white" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
            <path d="M12.9287 27.0713L27.0708 12.9292" stroke="white" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="fade-in mx-auto flex min-h-screen max-w-screen-2xl items-center justify-center">
        <div className="flex w-[90%] flex-col items-start justify-between gap-4 md:flex-row lg:items-center">
          {/* Primary nav links */}
          <div className="w-full max-w-full font-anton text-5xl font-medium uppercase leading-tight text-white md:max-w-xs lg:max-w-[450px] lg:text-7xl">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className={[
                  "block font-anton font-medium hover:text-textRed",
                  pathname === item.href ? "text-textRed" : "text-white",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Secondary grid */}
          <div className="w-full">
            <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-3">
              {MOBILE_COLUMNS.map((col) => (
                <div key={col.title} className="flex flex-col gap-4 text-white">
                  <h2 className="text-[10px] font-bold uppercase text-[#FFFFFFAA]">{col.title}</h2>
                  {col.links.map((l) => (
                    <Link key={l.label} onClick={() => setOpen(false)} href={l.href} className="text-sm hover:underline">
                      {l.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>

            <div className="my-6 flex w-full flex-col items-center justify-between gap-2 md:flex-row">
              <p className="text-[10px] text-[#FFFFFF66] md:text-xs">
                © Copyright {year} RCCG Rose of Sharon. All Rights Reserved.
              </p>
              <div className="flex items-center gap-2">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#FFFFFF1F]"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────────

export default function Navbar() {
  const pathname = usePathname() ?? "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-black p-4 font-lato transition-colors duration-300">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>

        <div className="hidden md:block">
          <DesktopNav pathname={pathname} />
        </div>

        <button onClick={() => setMobileOpen(true)} className="w-8" aria-label="Open menu">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 16H30" stroke="white" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
            <path d="M10 24H30" stroke="white" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
          </svg>
        </button>
      </header>

      {mobileOpen && <MobileMenu setOpen={setMobileOpen} pathname={pathname} />}
    </>
  );
}
