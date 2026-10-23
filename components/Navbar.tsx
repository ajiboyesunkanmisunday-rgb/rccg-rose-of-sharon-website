"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROGRAMS, programPages } from "@/app/(site)/(more)/_kit/programs";
import { YOUTH_PAGES, DEPARTMENTS } from "@/app/(site)/(more)/_kit/youth";

const navRoutes = [
  { path: "/about",                              name: "About" },
  { path: "/ql",                                 name: "Quick Links" },
  { path: "/cell-church",                        name: "Cell Church" },
  { path: "https://www.youtube.com/@rccgrostv",         name: "Sermons",  isExternal: true },
  { path: "/map",                                name: "Map" },
  { path: "/give",                               name: "Give" },
];

const year = new Date().getFullYear();

// ─── Desktop nav links ────────────────────────────────────────────────────────

function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <nav className="flex items-baseline gap-4 lg:gap-6">
      {navRoutes.map((route) => {
        const isActive = pathname === route.path;
        const props = route.isExternal
          ? { href: route.path, target: "_blank", rel: "noopener noreferrer" }
          : { href: route.path };
        return (
          <a
            key={route.name}
            {...props}
            className={[
              "text-[10px] uppercase tracking-[0.3em]",
              isActive
                ? "font-black text-white hover:text-white/90"
                : "font-bold text-white/70 hover:text-white/90",
            ].join(" ")}
          >
            {route.name}
          </a>
        );
      })}
    </nav>
  );
}

// ─── Mobile fullscreen menu ───────────────────────────────────────────────────

function MobileMenu({ setOpen, pathname }: { setOpen: (v: boolean) => void; pathname: string }) {
  return (
    <div className="no-scrollbar fixed inset-0 z-50 overflow-y-auto bg-black">
      {/* Header row */}
      <div className="flex w-full items-center justify-between p-4">
        <a href="/" onClick={() => setOpen(false)}>
          <img src="/logo.svg" alt="RCCG Rose of Sharon" width={110} height={44} style={{ width: 110, height: "auto" }} />
        </a>
        <button onClick={() => setOpen(false)}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip-x)">
              <path d="M27.0703 27.0713L12.9282 12.9292" stroke="white" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
              <path d="M12.9287 27.0713L27.0708 12.9292" stroke="white" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip-x">
                <rect width="20" height="20" fill="white" transform="translate(5.85742 20) rotate(-45)"/>
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>

      {/* Main content */}
      <div className="fade-in mx-auto flex min-h-screen max-w-screen-2xl items-center justify-center">
        <div className="flex w-[90%] flex-col items-start justify-between gap-4 md:flex-row lg:items-center">

          {/* Primary nav links — giant Anton font */}
          <div className="w-full max-w-full font-anton text-5xl font-medium uppercase leading-tight text-white md:max-w-xs lg:max-w-[450px] lg:text-7xl">
            {[
              { href: "/",            label: "Home" },
              { href: "/about",       label: "About" },
              { href: "/ql",          label: "Quick-Links" },
              { href: "/ministries",  label: "Ministries" },
              { href: "/cell-church", label: "Cell Church" },
              { href: "https://www.youtube.com/@rccgrostv", label: "Sermons", external: true },
              { href: "/map",         label: "Map" },
              { href: "/give",        label: "Give" },
              { href: "/youth",       label: "Youth" },
              { href: "/marketplace", label: "Marketplace" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                onClick={() => !item.external && setOpen(false)}
                className={[
                  "block font-anton font-medium hover:text-textRed",
                  pathname === item.href ? "text-textRed" : "text-white",
                ].join(" ")}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Secondary grid */}
          <div className="w-full">
            <div style={{ columnWidth: "220px", columnGap: "2rem" }}>
              <div className="flex flex-col gap-1.5 text-white" style={{ breakInside: "avoid", marginBottom: 20 }}>
                <h2 className="text-[10px] font-bold uppercase text-[#FFFFFFAA]">MINISTRIES</h2>
                <a onClick={() => setOpen(false)} href="/ministries#ccw" className="text-sm hover:underline">Rose of Sharon Choir</a>
                <a onClick={() => setOpen(false)} href="/ministries#celeb-kids" className="text-sm hover:underline">Teens Ministry</a>
                <a onClick={() => setOpen(false)} href="/ministries#celeb-kids" className="text-sm hover:underline">Kids Ministry</a>
                <h2 className="mt-3 text-[10px] font-bold uppercase text-[#FFFFFF66]">Church groups</h2>
                <a onClick={() => setOpen(false)} href="/groups" className="text-sm hover:underline">All church groups</a>
              </div>
              <div className="flex flex-col gap-1.5 text-white" style={{ breakInside: "avoid", marginBottom: 20 }}>
                <h2 className="text-[10px] font-bold uppercase text-[#FFFFFFAA]">RESOURCES</h2>
                <a onClick={() => setOpen(false)} href="/membership-class" className="text-sm hover:underline">Membership classes</a>
                <a onClick={() => setOpen(false)} href="/celebrations" className="text-sm hover:underline">Celebrations</a>
                <a onClick={() => setOpen(false)} href="/counselling" className="text-sm hover:underline">Counselling</a>
                <a onClick={() => setOpen(false)} href="/pre-marital-counselling" className="text-sm hover:underline">Pre Marital Counselling</a>
                <a onClick={() => setOpen(false)} href="/welfare" className="text-sm hover:underline">Welfare Request</a>
                <a onClick={() => setOpen(false)} href="/newcampusvolunteers" className="text-sm hover:underline">New Campus Volunteers</a>
                <h2 className="mt-3 text-[10px] font-bold uppercase text-[#FFFFFF66]">Requests</h2>
                <a onClick={() => setOpen(false)} href="/requests/prayer" className="text-sm hover:underline">Prayer Request</a>
                <a onClick={() => setOpen(false)} href="/requests/counseling" className="text-sm hover:underline">Counselling Request</a>
                <a onClick={() => setOpen(false)} href="/requests/suggestion" className="text-sm hover:underline">Suggestion</a>
                <h2 className="mt-3 text-[10px] font-bold uppercase text-[#FFFFFF66]">Celebrations & family</h2>
                <a onClick={() => setOpen(false)} href="/requests/baby-dedication" className="text-sm hover:underline">Baby Dedication</a>
                <a onClick={() => setOpen(false)} href="/requests/baby-christening" className="text-sm hover:underline">Baby Christening</a>
                <a onClick={() => setOpen(false)} href="/special-day" className="text-sm hover:underline">Send Us Your Special Day</a>
              </div>
              <div className="flex flex-col gap-1.5 text-white" style={{ breakInside: "avoid", marginBottom: 20 }}>
                <h2 className="text-[10px] font-bold uppercase text-[#FFFFFFAA]">CONNECT</h2>
                <a onClick={() => setOpen(false)} href="/cell-church" className="text-sm hover:underline">Cell Church</a>
                <a onClick={() => setOpen(false)} href="/membership" className="text-sm hover:underline">Become a member</a>
                <h2 className="mt-3 text-[10px] font-bold uppercase text-[#FFFFFF66]">New here</h2>
                <a onClick={() => setOpen(false)} href="/first-timer" className="text-sm hover:underline">First-Timer Registration</a>
                <a onClick={() => setOpen(false)} href="/e-member" className="text-sm hover:underline">E-Member Registration</a>
                <a onClick={() => setOpen(false)} href="/new-believer" className="text-sm hover:underline">New Believer</a>
              </div>
              <div className="flex flex-col gap-1.5 text-white" style={{ breakInside: "avoid", marginBottom: 20 }}>
                <h2 className="text-[10px] font-bold uppercase text-[#FFFFFFAA]">MEDIA</h2>
                <a href="https://www.youtube.com/@rccgrostv" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">Watch online</a>
                <a onClick={() => setOpen(false)} href="/media" className="text-sm hover:underline">Sermons & Media</a>
                <a onClick={() => setOpen(false)} href="/events" className="text-sm hover:underline">Events & Services</a>
                <h2 className="mt-3 text-[10px] font-bold uppercase text-[#FFFFFF66]">News & moments</h2>
                <a onClick={() => setOpen(false)} href="/announcements" className="text-sm hover:underline">Announcements</a>
                <a onClick={() => setOpen(false)} href="/testimonies" className="text-sm hover:underline">Testimonies</a>
                <a onClick={() => setOpen(false)} href="/gallery" className="text-sm hover:underline">Gallery</a>
              </div>
              <div className="flex flex-col gap-1.5 text-white" style={{ breakInside: "avoid", marginBottom: 20 }}>
                <h2 className="text-[10px] font-bold uppercase text-[#FFFFFFAA]">TRAINING PROGRAMS</h2>
                <a onClick={() => setOpen(false)} href="/trainings" className="text-sm hover:underline">All training programs</a>
                {PROGRAMS.map((prog) => (
                  <div key={prog.slug} className="mt-1.5 flex flex-col gap-0.5">
                    <a onClick={() => setOpen(false)} href={prog.base} className="text-sm font-bold hover:underline">{prog.name}</a>
                    {programPages(prog).filter((pg) => pg.key !== "overview").map((pg) => (
                      <a key={pg.label} onClick={() => setOpen(false)} href={pg.href} className="text-xs hover:underline" style={{ color: "#FFFFFFB3", paddingLeft: 12 }}>{pg.label}</a>
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-1.5 text-white" style={{ breakInside: "avoid", marginBottom: 20 }}>
                <h2 className="text-[10px] font-bold uppercase text-[#FFFFFFAA]">YOUTH</h2>
                <a onClick={() => setOpen(false)} href="/youth" className="text-sm font-bold hover:underline">Youth church</a>
                {YOUTH_PAGES.filter((pg) => pg.key !== "overview" && pg.key !== "departments").map((pg) => (
                  <a key={pg.key} onClick={() => setOpen(false)} href={pg.href} className="text-xs hover:underline" style={{ color: "#FFFFFFB3", paddingLeft: 12 }}>{pg.label}</a>
                ))}
                <a onClick={() => setOpen(false)} href="/youth/departments" className="mt-1.5 text-sm font-bold hover:underline">Youth departments</a>
                {DEPARTMENTS.map((d) => (
                  <a key={d.slug} onClick={() => setOpen(false)} href={`/youth/departments/${d.slug}`} className="text-xs hover:underline" style={{ color: "#FFFFFFB3", paddingLeft: 12 }}>{d.name}</a>
                ))}
              </div>
            </div>

            {/* Footer bar in mobile menu */}
            <div className="my-6 flex w-full flex-col items-center justify-between gap-2 md:flex-row">
              <p className="text-[10px] text-[#FFFFFF66] md:text-xs">
                © Copyright {year} RCCG Rose of Sharon. All Rights Reserved.
              </p>
              <div className="flex items-center gap-2">
                {[
                  { href: "https://www.instagram.com/rccgros/?hl=en", label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" },
                  { href: "https://x.com/", label: "X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                  { href: "https://www.youtube.com/@rccgrostv", label: "YouTube", path: "M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
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
        {/* Logo — "RCCG Rose of Sharon" wordmark */}
        <Link href="/" className="flex items-center">
          <img src="/logo.svg" alt="RCCG Rose of Sharon" width={140} height={40} className="h-8 w-auto" />
        </Link>

        {/* Desktop nav — hidden on mobile */}
        <div className="hidden md:block">
          <DesktopNav pathname={pathname} />
        </div>

        {/* Hamburger — always visible */}
        <button onClick={() => setMobileOpen(true)} className="w-8">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip-ham)">
              <path d="M10 16H30" stroke="white" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
              <path d="M10 24H30" stroke="white" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip-ham">
                <rect width="20" height="20" fill="white" transform="translate(10 10)"/>
              </clipPath>
            </defs>
          </svg>
        </button>
      </header>

      {mobileOpen && <MobileMenu setOpen={setMobileOpen} pathname={pathname} />}
    </>
  );
}
