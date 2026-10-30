"use client";

import { useState, useEffect } from "react";
import Link, { A } from "../link";
import { usePathname } from "next/navigation";
import { PROGRAMS, programMenu } from "../kit/programs";
import { YOUTH_PAGES, DEPARTMENTS } from "../kit/youth";
import { isHere } from "../sites";

const navRoutes: { path: string; name: string; isExternal?: boolean }[] = [
  { path: "/about",                              name: "About" },
  { path: "/ql",                                 name: "Quick Links" },
  { path: "/cell-church",                        name: "House Fellowship" },
  { path: "/media",                                    name: "Sermons" },
  { path: "/give",                               name: "Give" },
];

const year = new Date().getFullYear();

// ─── Desktop nav links ────────────────────────────────────────────────────────

function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <nav className="flex items-baseline gap-4 lg:gap-6">
      {navRoutes.map((route) => {
        const isActive = isHere(pathname, route.path);
        const props = route.isExternal
          ? { href: route.path, target: "_blank", rel: "noopener noreferrer" }
          : { href: route.path };
        return (
          <A
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
          </A>
        );
      })}
    </nav>
  );
}

const SOCIALS: { href: string; label: string; path: string }[] = [
                  { href: "https://www.instagram.com/rccgros/?hl=en", label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" },
                  { href: "https://x.com/", label: "X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                  { href: "https://www.youtube.com/@rccgrostv", label: "YouTube", path: "M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" },
];

// ─── Mobile menu body (phones only) ───────────────────────────────────────────
// The wide menu above suits desktop. On a phone it becomes a tidy list: big tappable primary links, then the
// longer link groups folded into tap-to-open sections.

type MenuLink = { href: string; label: string; external?: boolean; sub?: boolean };
type MenuGroup = { title: string; links: MenuLink[] };

const PRIMARY_LINKS: MenuLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/ql", label: "Quick Links" },
  { href: "/cell-church", label: "House Fellowship" },
  { href: "/media", label: "Sermons" },
  { href: "/give", label: "Give" },
  { href: "/youth", label: "Youth" },
  { href: "/trainings", label: "Training" },
  { href: "/marketplace", label: "Marketplace" },
];

function menuGroups(): MenuGroup[] {
  return [
    { title: "Ministries", links: [
      { href: "/ministries/hearts-of-david", label: "Hearts of David (Men)" },
      { href: "/ministries/oaks-of-righteousness", label: "Oaks of Righteousness (Women)" },
      { href: "/youth", label: "Youth Fellowship" },
      { href: "/ministries/kids-and-teens", label: "Children Church" },
    ] },
    { title: "Resources & Requests", links: [
      { href: "/trainings/believers-class", label: "Believers class" },
      { href: "/trainings/water-baptism", label: "Water Baptism class" },
      { href: "/celebrations", label: "Celebrations" },
      { href: "/counselling", label: "Relationship Talks" },
      { href: "/welfare", label: "Welfare Request" },
      { href: "/requests/prayer", label: "Prayer Request" },
      { href: "/requests/counseling", label: "Counselling Request" },
      { href: "/requests/suggestion", label: "Suggestion" },
      { href: "/requests/baby-dedication", label: "Baby Dedication" },
      { href: "/requests/baby-christening", label: "Baby Christening" },
      { href: "/celebrations#request", label: "Celebration Request" },
    ] },
    { title: "Connect", links: [
      { href: "/cell-church", label: "House Fellowship" },
      { href: "/membership", label: "Become a member" },
      { href: "/first-timer", label: "First-Timer Registration" },
      { href: "/e-member", label: "E-Member Registration" },
      { href: "/new-believer", label: "New Believer" },
    ] },
    { title: "Media", links: [
      { href: "https://www.youtube.com/@rccgrostv", label: "Watch online", external: true },
      { href: "/media", label: "Sermons & Media" },
      { href: "/events", label: "Events & Services" },
      { href: "/announcements", label: "Announcements" },
      { href: "/testimonies", label: "Testimonies" },
    ] },
    { title: "Training Programs", links: [
      { href: "/trainings", label: "All training programs" },
      ...PROGRAMS.flatMap((prog) => [
        { href: programMenu(prog)[0].href, label: prog.name },
        ...programMenu(prog).slice(1).map((pg) => ({ href: pg.href, label: pg.label, sub: true })),
      ]),
    ] },
    { title: "Youth", links: [
      { href: "/youth", label: "Youth Fellowship" },
      ...YOUTH_PAGES.filter((pg) => pg.key !== "overview").map((pg) => ({ href: pg.href, label: pg.label, sub: true })),
    ] },
  ];
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none", opacity: 0.7 }}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function MobileMenuBody({ setOpen, pathname }: { setOpen: (v: boolean) => void; pathname: string }) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const groups = menuGroups();
  const close = () => setOpen(false);
  return (
    <div className="mm-mobile" style={{ padding: "4px 20px 32px" }}>
      <nav>
        {PRIMARY_LINKS.map((item) => {
          const active = isHere(pathname, item.href);
          return (
            <A
              key={item.label}
              href={item.href}
              onClick={close}
              className={`font-anton uppercase ${active ? "text-textRed" : "text-white"}`}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 56, fontSize: 28, letterSpacing: "0.02em", borderBottom: "1px solid rgba(255,255,255,0.12)" }}
            >
              {item.label}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}><polyline points="9 6 15 12 9 18" /></svg>
            </A>
          );
        })}
      </nav>

      <p style={{ margin: "28px 0 4px", fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>Explore more</p>
      <div>
        {groups.map((g) => {
          const isOpen = openGroup === g.title;
          return (
            <div key={g.title} style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
              <button
                type="button"
                onClick={() => setOpenGroup(isOpen ? null : g.title)}
                aria-expanded={isOpen}
                className="text-white"
                style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", minHeight: 52, fontSize: 13, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", textAlign: "left" }}
              >
                {g.title}
                <Chevron open={isOpen} />
              </button>
              {isOpen && (
                <div style={{ paddingBottom: 12 }}>
                  {g.links.map((l, i) => (
                    <A
                      key={l.label + i}
                      href={l.href}
                      onClick={() => !l.external && close()}
                      target={l.external ? "_blank" : undefined}
                      rel={l.external ? "noopener noreferrer" : undefined}
                      className="text-white"
                      style={{ display: "flex", alignItems: "center", minHeight: 42, fontSize: l.sub ? 13 : 15, paddingLeft: l.sub ? 16 : 0, fontWeight: l.sub ? 400 : 600, opacity: l.sub ? 0.75 : 1 }}
                    >
                      {l.label}
                    </A>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 28, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <div style={{ display: "flex", gap: 10 }}>
          {SOCIALS.map((social) => (
            <A key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFFFFF1F]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d={social.path} /></svg>
            </A>
          ))}
        </div>
        <p style={{ fontSize: 10, textAlign: "center", color: "rgba(255,255,255,0.45)" }}>© Copyright {year} RCCG Rose of Sharon. All Rights Reserved.</p>
      </div>
    </div>
  );
}

// ─── Mobile fullscreen menu ───────────────────────────────────────────────────

function MobileMenu({ setOpen, pathname }: { setOpen: (v: boolean) => void; pathname: string }) {
  return (
    <div className="no-scrollbar fixed inset-0 z-50 overflow-y-auto bg-black">
      {/* Header row */}
      <div className="mm-head flex w-full items-center justify-between p-4">
        <A href="/" onClick={() => setOpen(false)}>
          <img src="/logo.svg" alt="RCCG Rose of Sharon" width={110} height={44} style={{ width: 110, height: "auto" }} />
        </A>
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

      <style>{`@media (max-width: 767px) { .mm-head { position: sticky; top: 0; z-index: 10; background: #000; } .mm-desktop { display: none !important; } } @media (min-width: 768px) { .mm-mobile { display: none !important; } }`}</style>
      <MobileMenuBody setOpen={setOpen} pathname={pathname} />

      {/* Main content (wide screens) */}
      <div className="mm-desktop fade-in mx-auto flex min-h-screen max-w-screen-2xl items-center justify-center">
        <div className="flex w-[90%] flex-col items-start justify-between gap-4 md:flex-row lg:items-center">

          {/* Primary nav links — giant Anton font */}
          <div className="w-full max-w-full font-anton text-5xl font-medium uppercase leading-tight text-white md:max-w-xs lg:max-w-[450px] lg:text-7xl">
            {([
              { href: "/",            label: "Home" },
              { href: "/about",       label: "About" },
              { href: "/ql",          label: "Quick-Links" },
              { href: "/cell-church", label: "House Fellowship" },
              { href: "/media", label: "Sermons" },
              { href: "/give",        label: "Give" },
              { href: "/youth",       label: "Youth" },
              { href: "/trainings",   label: "Training" },
              { href: "/marketplace", label: "Marketplace" },
            ] as { href: string; label: string; external?: boolean }[]).map((item) => (
              <A
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                onClick={() => !item.external && setOpen(false)}
                className={[
                  "block font-anton font-medium hover:text-textRed",
                  isHere(pathname, item.href) ? "text-textRed" : "text-white",
                ].join(" ")}
              >
                {item.label}
              </A>
            ))}
          </div>

          {/* Secondary grid */}
          <div className="w-full">
            <div style={{ columnWidth: "220px", columnGap: "2rem" }}>
              <div className="flex flex-col gap-1.5 text-white" style={{ breakInside: "avoid", marginBottom: 20 }}>
                <h2 className="text-[10px] font-bold uppercase text-[#FFFFFFAA]">MINISTRIES</h2>
                <A onClick={() => setOpen(false)} href="/ministries/hearts-of-david" className="text-sm hover:underline">Hearts of David (Men)</A>
                <A onClick={() => setOpen(false)} href="/ministries/oaks-of-righteousness" className="text-sm hover:underline">Oaks of Righteousness (Women)</A>
                <A onClick={() => setOpen(false)} href="/youth" className="text-sm hover:underline">Youth Fellowship</A>
                <A onClick={() => setOpen(false)} href="/ministries/kids-and-teens" className="text-sm hover:underline">Children Church</A>
              </div>
              <div className="flex flex-col gap-1.5 text-white" style={{ breakInside: "avoid", marginBottom: 20 }}>
                <h2 className="text-[10px] font-bold uppercase text-[#FFFFFFAA]">RESOURCES</h2>
                <A onClick={() => setOpen(false)} href="/trainings/believers-class" className="text-sm hover:underline">Believers class</A>
                <A onClick={() => setOpen(false)} href="/trainings/water-baptism" className="text-sm hover:underline">Water Baptism class</A>
                <A onClick={() => setOpen(false)} href="/celebrations" className="text-sm hover:underline">Celebrations</A>
                <A onClick={() => setOpen(false)} href="/counselling" className="text-sm hover:underline">Relationship Talks</A>
                <A onClick={() => setOpen(false)} href="/welfare" className="text-sm hover:underline">Welfare Request</A>
                <h2 className="mt-3 text-[10px] font-bold uppercase text-[#FFFFFF66]">Requests</h2>
                <A onClick={() => setOpen(false)} href="/requests/prayer" className="text-sm hover:underline">Prayer Request</A>
                <A onClick={() => setOpen(false)} href="/requests/counseling" className="text-sm hover:underline">Counselling Request</A>
                <A onClick={() => setOpen(false)} href="/requests/suggestion" className="text-sm hover:underline">Suggestion</A>
                <h2 className="mt-3 text-[10px] font-bold uppercase text-[#FFFFFF66]">Celebrations & family</h2>
                <A onClick={() => setOpen(false)} href="/requests/baby-dedication" className="text-sm hover:underline">Baby Dedication</A>
                <A onClick={() => setOpen(false)} href="/requests/baby-christening" className="text-sm hover:underline">Baby Christening</A>
                <A onClick={() => setOpen(false)} href="/celebrations#request" className="text-sm hover:underline">Celebration Request</A>
              </div>
              <div className="flex flex-col gap-1.5 text-white" style={{ breakInside: "avoid", marginBottom: 20 }}>
                <h2 className="text-[10px] font-bold uppercase text-[#FFFFFFAA]">CONNECT</h2>
                <A onClick={() => setOpen(false)} href="/cell-church" className="text-sm hover:underline">House Fellowship</A>
                <A onClick={() => setOpen(false)} href="/membership" className="text-sm hover:underline">Become a member</A>
                <h2 className="mt-3 text-[10px] font-bold uppercase text-[#FFFFFF66]">New here</h2>
                <A onClick={() => setOpen(false)} href="/first-timer" className="text-sm hover:underline">First-Timer Registration</A>
                <A onClick={() => setOpen(false)} href="/e-member" className="text-sm hover:underline">E-Member Registration</A>
                <A onClick={() => setOpen(false)} href="/new-believer" className="text-sm hover:underline">New Believer</A>
              </div>
              <div className="flex flex-col gap-1.5 text-white" style={{ breakInside: "avoid", marginBottom: 20 }}>
                <h2 className="text-[10px] font-bold uppercase text-[#FFFFFFAA]">MEDIA</h2>
                <A href="https://www.youtube.com/@rccgrostv" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">Watch online</A>
                <A onClick={() => setOpen(false)} href="/media" className="text-sm hover:underline">Sermons & Media</A>
                <A onClick={() => setOpen(false)} href="/events" className="text-sm hover:underline">Events & Services</A>
                <h2 className="mt-3 text-[10px] font-bold uppercase text-[#FFFFFF66]">News & moments</h2>
                <A onClick={() => setOpen(false)} href="/announcements" className="text-sm hover:underline">Announcements</A>
                <A onClick={() => setOpen(false)} href="/testimonies" className="text-sm hover:underline">Testimonies</A>
              </div>
              <div className="flex flex-col gap-1.5 text-white" style={{ breakInside: "avoid", marginBottom: 20 }}>
                <h2 className="text-[10px] font-bold uppercase text-[#FFFFFFAA]">TRAINING PROGRAMS</h2>
                <A onClick={() => setOpen(false)} href="/trainings" className="text-sm hover:underline">All training programs</A>
                {PROGRAMS.map((prog) => (
                  <div key={prog.slug} className="mt-1.5 flex flex-col gap-0.5">
                    <span className="text-sm font-bold">{prog.name}</span>
                    {programMenu(prog).map((pg) => (
                      <A key={pg.label} onClick={() => setOpen(false)} href={pg.href} className="text-xs hover:underline" style={{ color: "#FFFFFFB3", paddingLeft: 12 }}>{pg.label}</A>
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-1.5 text-white" style={{ breakInside: "avoid", marginBottom: 20 }}>
                <h2 className="text-[10px] font-bold uppercase text-[#FFFFFFAA]">YOUTH</h2>
                <A onClick={() => setOpen(false)} href="/youth" className="text-sm font-bold hover:underline">Youth Fellowship</A>
                {YOUTH_PAGES.filter((pg) => pg.key !== "overview").map((pg) => (
                  <div key={pg.key} className="flex flex-col gap-1.5">
                    <A onClick={() => setOpen(false)} href={pg.href} className="text-xs hover:underline" style={{ color: "#FFFFFFB3", paddingLeft: 12 }}>{pg.label}</A>
                    {pg.key === "departments" && DEPARTMENTS.map((d) => (
                      <A key={d.slug} onClick={() => setOpen(false)} href={`/youth/departments/${d.slug}`} className="text-xs hover:underline" style={{ color: "#FFFFFF8C", paddingLeft: 26 }}>{d.name}</A>
                    ))}
                  </div>
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
                  <A
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#FFFFFF1F]"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d={social.path} />
                    </svg>
                  </A>
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
