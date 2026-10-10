"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/* ─── Placeholder images — replace with actual ROS photos ─── */
const IMG = {
  hero:    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&q=85",
  /* Welcome cards — people, community, celebration */
  w1:      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
  w2:      "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&q=80",
  w3:      "https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=800&q=80",
  /* Visit cards — worship, youth, women, prayer */
  v1:      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=70",
  v2:      "https://images.unsplash.com/photo-1527261834078-9b37d35a4a32?w=800&q=70",
  v3:      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=70",
  v4:      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=70",
  boast:   "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80",
  /* Community cards — learning, celebration, counselling */
  cm1:     "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
  cm2:     "https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=800&q=80",
  cm3:     "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80",
  pastor:  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80",
  min1:    "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&q=80",
  min2:    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80",
};

function useReveal() {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("anim-ready");
    const els = html.querySelectorAll("[data-reveal],[data-reveal-left],[data-reveal-right],[data-stagger]");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => { io.disconnect(); html.classList.remove("anim-ready"); };
  }, []);
}

function Pill({ children, v = "glass" }: { children: React.ReactNode; v?: "glass" | "red" | "outline-dark" }) {
  const cls = {
    glass:        "bg-white/10 border border-white/25 text-white",
    red:          "bg-[#C0362A] text-white",
    "outline-dark": "bg-transparent border border-[#0E0E0E]/20 text-[#0E0E0E]",
  }[v];
  return (
    <span className={`inline-flex items-center gap-2 px-[18px] py-[7px] rounded-full font-barlow-condensed text-[11px] font-bold tracking-[0.22em] uppercase ${cls}`}>
      {children}
    </span>
  );
}

function Dot({ c = "#C0362A" }: { c?: string }) {
  return <span className="w-[7px] h-[7px] rounded-full flex-shrink-0" style={{ background: c }} />;
}

function Arr({ cls = "" }: { cls?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      className={`w-3 h-3 flex-shrink-0 ${cls}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default function Home() {
  useReveal();

  return (
    <>
      <Navbar />
      <main>

        {/* ═══════════════════════════════════
            §1 · HERO — centered, 3 lines
        ═══════════════════════════════════ */}
        <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-center">
          <img src={IMG.hero} alt="" aria-hidden
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            style={{ animation: "kenBurns 24s ease-in-out infinite alternate" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E0E0E]/75 via-[#0E0E0E]/50 to-[#0E0E0E]/80" />

          <div className="relative z-10 flex flex-col items-center gap-4 px-6 max-w-3xl mx-auto pt-24">
            <Pill v="glass"><Dot /> OUR VISION</Pill>

            <h1 className="font-oswald font-bold uppercase text-white leading-[0.88] tracking-tight mt-2">
              <span className="block text-[clamp(44px,8vw,104px)]">WE ENVISION ALL</span>
              <span className="block text-[clamp(44px,8vw,104px)]">WHO ENTER OUR</span>
              <span className="block text-[clamp(44px,8vw,104px)] text-[#C0362A]">DOORS TRANSFORMED</span>
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
              <Link href="/media"
                className="font-barlow-condensed px-8 py-[12px] bg-white text-[#0E0E0E] text-[12px] font-bold tracking-[0.14em] rounded-full hover:bg-white/90 active:scale-95 transition-all">
                WATCH LIVE
              </Link>
              <Link href="/events"
                className="font-barlow-condensed px-8 py-[11px] border-[1.5px] border-white text-white text-[12px] font-bold tracking-[0.14em] rounded-full hover:bg-white/10 active:scale-95 transition-all">
                QUICK LINKS
              </Link>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 animate-bounce">
            <span className="font-barlow-condensed text-white text-[9px] tracking-[0.4em]">SCROLL</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </section>

        {/* Building Project floating CTA — between hero and welcome, matching CCI */}
        <div className="bg-white flex justify-center py-6">
          <Link href="/give"
            className="font-barlow-condensed px-10 py-[12px] bg-[#C0362A] text-white text-[12px] font-bold tracking-[0.2em] rounded-full hover:bg-[#A02820] transition-colors">
            BUILDING PROJECT
          </Link>
        </div>

        {/* ═══════════════════════════════════
            §2 · WELCOME HOME  (white, left-aligned)
        ═══════════════════════════════════ */}
        <section className="bg-white pt-8 pb-0 px-6 md:px-12 xl:px-20">
          <div className="max-w-[1280px] mx-auto">
            <div className="mb-8" data-reveal>
              <Pill v="outline-dark">🤝 WELCOME TO ROS</Pill>
              <h2 className="font-oswald font-bold uppercase text-[#0E0E0E] text-[clamp(36px,5.5vw,68px)] leading-[0.9] mt-4">
                WELCOME HOME!
              </h2>
              <p className="font-barlow text-[#666] text-[15px] mt-3 mb-6 leading-relaxed">
                Dive into our teachings, events and community.<br />Your journey of faith begins here.
              </p>
            </div>

            {/* 3 photo cards — ZERO gap, ZERO border-radius, CCI-exact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[3px]" data-stagger>
              {[
                { img: IMG.w1, cat: "WHO WE ARE",         title: "About us",        label: "LEARN MORE", href: "/about" },
                { img: IMG.w2, cat: "JOIN OUR COMMUNITY", title: "Connect with us", label: "SIGN UP",    href: "/first-timer" },
                { img: IMG.w3, cat: "ENDLESS CELEBRATION", title: "Celebrations",   label: "LEARN MORE", href: "/celebrations" },
              ].map((c) => (
                <Link key={c.cat} href={c.href}
                  className="relative overflow-hidden group block"
                  style={{ aspectRatio: "4/5" }}>
                  <img src={c.img} alt={c.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="font-barlow-condensed text-white/55 text-[10px] font-bold tracking-[0.22em] uppercase mb-1">{c.cat}</p>
                    {/* Card title: sentence case, Barlow Bold — matches CCI card title style exactly */}
                    <p className="font-barlow text-white font-bold text-[26px] leading-tight">{c.title}</p>
                    <p className="font-barlow-condensed text-white/65 text-[11px] font-bold tracking-[0.18em] mt-3 flex items-center gap-1.5 uppercase">
                      {c.label} <Arr />
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            §3 · MISSION STATEMENT  (dark, centered)
        ═══════════════════════════════════ */}
        <section className="bg-[#0E0E0E] py-24 md:py-36 px-6 md:px-12 xl:px-20">
          <div className="max-w-[1280px] mx-auto text-center">
            <div data-reveal>
              <Pill v="glass"><Dot /> RCCG WORLDWIDE</Pill>
            </div>
            <h2 data-reveal
              className="font-oswald font-bold uppercase text-white leading-[0.88] mt-8 text-[clamp(34px,6vw,80px)]">
              WE ENLIST, DISCIPLE AND<br />REDEPLOY A PEOPLE<br />
              <span className="text-[#C0362A]">IN CHRIST, FOR CHRIST, WITH JOY.</span>
            </h2>
            <p data-reveal className="font-barlow text-white/40 text-[16px] max-w-lg mx-auto mt-8 leading-relaxed">
              Join us at a Rose of Sharon church near you
            </p>
            <div data-reveal className="mt-7 flex justify-center">
              <Link href="/about"
                className="font-barlow-condensed inline-flex items-center gap-2 px-9 py-[12px] border border-white/25 text-white/60 text-[12px] font-bold tracking-[0.16em] rounded-full hover:border-white hover:text-white transition-all">
                LEARN MORE ABOUT US
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            §4 · VISIT — white bg, landscape photo cards
        ═══════════════════════════════════ */}
        <section className="bg-white pt-14 pb-0 px-6 md:px-12 xl:px-20">
          <div className="max-w-[1280px] mx-auto">
            <h2 data-reveal
              className="font-oswald font-bold uppercase text-[#0E0E0E] text-[clamp(32px,5vw,60px)] leading-[0.9] mb-5">
              VISIT ROSE OF SHARON
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-[3px]" data-stagger>
              {[
                { img: IMG.v1, name: "Sunday Service",    sub: "7am & 10am" },
                { img: IMG.v2, name: "Youth Church",      sub: "Sunday 10am" },
                { img: IMG.v3, name: "Women's Fellowship",sub: "Saturday" },
                { img: IMG.v4, name: "Night Vigil",       sub: "Friday 10pm" },
              ].map((item) => (
                <div key={item.name} className="relative overflow-hidden group" style={{ aspectRatio: "3/2" }}>
                  <img src={item.img} alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out brightness-75" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <p className="font-oswald text-white font-semibold text-[16px] uppercase leading-tight">{item.name}</p>
                    <p className="font-barlow text-white/55 text-[12px]">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            §5 · BOAST — white text LEFT, photo RIGHT (CCI-precise split)
        ═══════════════════════════════════ */}
        <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
          {/* Left: white bg with dark text — matches CCI */}
          <div className="bg-white flex flex-col justify-center px-8 md:px-14 xl:px-20 py-20 lg:py-0" data-reveal-left>
            <h2 className="font-oswald font-bold uppercase text-[#0E0E0E] leading-[0.88] text-[clamp(44px,7vw,88px)]">
              WE BOAST IN<br />CHRIST JESUS
            </h2>
            <p className="font-barlow text-[#555] text-[16px] mt-6 leading-relaxed max-w-md">
              Our greatest success story at Rose of Sharon has been the grace to effectively evangelize, make disciples of, and deploy people who once upon a time were mere seekers, as mature disciples and vibrant ministers of the gospel.
            </p>
            <Link href="/about"
              className="font-barlow-condensed inline-flex items-center gap-2 mt-9 px-8 py-[13px] bg-[#C0362A] text-white text-[12px] font-bold tracking-[0.14em] rounded-full hover:bg-[#A02820] transition-colors w-fit">
              LEARN MORE <Arr />
            </Link>
          </div>
          {/* Right: dark concert/worship photo */}
          <div className="relative min-h-[400px] lg:min-h-0" data-reveal-right>
            <img src={IMG.boast} alt="" aria-hidden
              className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#0E0E0E]/25" />
          </div>
        </section>

        {/* ═══════════════════════════════════
            §6 · COMMUNITY — centered heading, photo cards with text BELOW
        ═══════════════════════════════════ */}
        <section className="bg-white pt-20 pb-14 px-6 md:px-12 xl:px-20">
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-14" data-reveal>
              <Pill v="outline-dark"><Dot /> COMMUNITY</Pill>
              <h2 className="font-oswald font-bold text-[#0E0E0E] leading-[0.92] mt-5 text-[clamp(32px,5.5vw,72px)]">
                We do community differently<br />at{" "}
                <span style={{ color: "#C0362A" }}>
                  Rose of Sharon
                </span>
              </h2>
              <p className="font-barlow text-[#888] text-[16px] mt-3">More than a church, a place to grow</p>
            </div>

            {/* Photo cards — image on top, text BELOW (no overlay), matching CCI community layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[3px]" data-stagger>
              {[
                {
                  img: IMG.cm1,
                  title: "Membership Classes",
                  body: "Our Membership Classes get you up to speed with accurate scripture-based teachings designed to create a strong bedrock for your spiritual growth.",
                  href: "/first-timer",
                },
                {
                  img: IMG.cm2,
                  title: "Celebrations",
                  body: "You are the answer to our prayers, so we celebrate you every day, especially on your special days. You mean that much to us.",
                  href: "/celebrations",
                },
                {
                  img: IMG.cm3,
                  title: "Counselling",
                  body: "Need counsel? There is always someone available to pray with you and provide sound biblical counsel with zero judgment.",
                  href: "/requests/counseling",
                },
              ].map((item) => (
                <Link key={item.title} href={item.href} className="group block">
                  <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                    <img src={item.img} alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out" />
                  </div>
                  <div className="pt-5 pb-6">
                    <h3 className="font-barlow-condensed text-[#0E0E0E] font-bold text-[17px] uppercase tracking-wide flex items-center gap-2 group-hover:text-[#C0362A] transition-colors">
                      {item.title} <Arr />
                    </h3>
                    <p className="font-barlow text-[#666] text-[14px] mt-2 leading-relaxed line-clamp-3">{item.body}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            §7 · LEAD PASTOR — dark photo LEFT, white text RIGHT
        ═══════════════════════════════════ */}
        <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left: dark photo */}
          <div className="relative min-h-[400px] lg:min-h-0 order-2 lg:order-1" data-reveal-left>
            <img src={IMG.pastor} alt="Lead Pastor"
              className="absolute inset-0 w-full h-full object-cover object-top grayscale" />
            <div className="absolute inset-0 bg-[#0E0E0E]/30" />
          </div>

          {/* Right: white background with text — matches CCI precisely */}
          <div className="bg-white flex flex-col justify-center px-8 md:px-14 xl:px-20 py-20 lg:py-0 order-1 lg:order-2" data-reveal-right>
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-7 h-7 flex-shrink-0">
                <Image src="/assets/logo.png" alt="" fill className="object-contain" />
              </div>
              <span className="font-barlow-condensed text-[#AAA] text-[10px] font-bold tracking-[0.3em] uppercase">
                ROSE OF SHARON GLOBAL
              </span>
            </div>

            <h2 className="font-oswald font-bold uppercase text-[#0E0E0E] text-[clamp(32px,5vw,60px)] leading-[0.9] mb-6">
              OUR LEAD PASTOR
            </h2>
            <p className="font-barlow text-[#555] text-[15px] leading-relaxed max-w-md mb-9">
              Our lead pastor is a visionary minister dedicated to building a church community rooted in the Word of God, passionate about worship, and committed to transforming lives through the power of the Holy Spirit. Under their leadership, Rose of Sharon has grown into a thriving hub of faith, discipleship, and community impact.
            </p>
            <Link href="/about"
              className="font-barlow-condensed inline-flex items-center gap-2 px-9 py-[13px] border-2 border-[#0E0E0E] text-[#0E0E0E] text-[12px] font-bold tracking-[0.14em] rounded-full hover:bg-[#0E0E0E] hover:text-white transition-all w-fit">
              READ MORE
            </Link>
          </div>
        </section>

        {/* ═══════════════════════════════════
            §8 · MINISTRIES — white bg, huge faded EVERYONE, photo cards right
        ═══════════════════════════════════ */}
        <section className="bg-white py-20 px-6 md:px-12 xl:px-20">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">
              {/* Left: text column */}
              <div data-reveal-left className="flex flex-col justify-start pt-4">
                <p className="font-barlow-condensed text-[#C0362A] text-[10px] font-bold tracking-[0.25em] uppercase mb-4">
                  MINISTRIES
                </p>
                {/* EVERYONE as huge faded decorative text — the CCI signature element */}
                <div className="relative">
                  <p className="font-oswald font-bold uppercase text-[#0E0E0E] text-[clamp(32px,5.5vw,64px)] leading-[0.88]">
                    THERE&apos;S A<br />PLACE FOR
                  </p>
                  <p className="font-oswald font-bold uppercase leading-none select-none"
                    style={{
                      fontSize: "clamp(72px, 18vw, 200px)",
                      color: "rgba(192, 54, 42, 0.1)",
                      lineHeight: 0.85,
                      marginTop: "4px",
                      letterSpacing: "-0.02em",
                    }}>
                    EVERY<br />ONE
                  </p>
                </div>
                <Link href="/groups"
                  className="font-barlow-condensed inline-flex items-center gap-2 mt-6 px-8 py-[12px] border border-[#0E0E0E]/30 text-[#0E0E0E]/60 text-[11px] font-bold tracking-[0.2em] rounded-full hover:border-[#0E0E0E] hover:text-[#0E0E0E] transition-all w-fit">
                  SEE ALL MINISTRIES
                </Link>
              </div>

              {/* Right: ministry photo cards — photo on top, text below */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[3px]" data-stagger>
                {[
                  { img: IMG.min1, title: "Youth Ministry",             sub: "Celeb Kids & Young Adults" },
                  { img: IMG.min2, title: "Celebration Church Worship",  sub: "ROS Choir & Music Ministry" },
                ].map((m) => (
                  <Link key={m.title} href="/groups" className="group block">
                    <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                      <img src={m.img} alt={m.title}
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out" />
                    </div>
                    <div className="pt-4 pb-5">
                      <h3 className="font-barlow-condensed text-[#0E0E0E] font-bold text-[16px] uppercase tracking-wide group-hover:text-[#C0362A] transition-colors">
                        {m.title}
                      </h3>
                      <p className="font-barlow text-[#888] text-[13px] mt-1">{m.sub}</p>
                      <p className="font-barlow-condensed text-[#aaa] text-[11px] font-bold tracking-[0.18em] mt-3 flex items-center gap-1 group-hover:text-[#C0362A] transition-colors">
                        VISIT <Arr />
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            §9 · GIVE — rose bg, italic serif heading (CCI-precise)
        ═══════════════════════════════════ */}
        <section className="bg-[#F4EAE7] py-20 md:py-28 px-6 md:px-12 xl:px-20 relative overflow-hidden">
          {/* Decorative hand-drawn rose element matching CCI */}
          <svg aria-hidden className="absolute right-0 top-0 h-full w-[55%] opacity-[0.2] pointer-events-none"
            viewBox="0 0 700 600" fill="none">
            <path d="M500 50 Q600 200 500 350 Q400 500 300 550 Q200 600 150 500 Q100 400 200 300 Q300 200 250 100 Q300 50 400 80 Q500 110 500 50Z"
              stroke="#C0362A" strokeWidth="1" fill="none" />
            <path d="M520 80 Q620 220 530 380 Q440 540 340 580" stroke="#C0362A" strokeWidth="0.8" fill="none" />
            <circle cx="400" cy="300" r="120" stroke="#C0362A" strokeWidth="0.8" fill="none" />
            <circle cx="520" cy="180" r="80" stroke="#C0362A" strokeWidth="0.6" fill="none" />
          </svg>

          <div className="max-w-[700px] relative z-10" data-reveal>
            <h2 className="text-[#0E0E0E] leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(40px,7vw,80px)",
                fontStyle: "italic",
                fontWeight: 700,
                lineHeight: 1.05,
              }}>
              Give to Rose of Sharon
            </h2>
            <p className="font-barlow text-[#666] text-[16px] leading-relaxed mt-4 mb-10">
              Your generosity keeps blessing lives, thank you for giving.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/give"
                className="font-barlow-condensed px-8 py-[12px] border-2 border-[#0E0E0E] text-[#0E0E0E] text-[12px] font-bold tracking-[0.14em] rounded-full hover:bg-[#0E0E0E] hover:text-white transition-all">
                GIVE NOW
              </Link>
              <Link href="/give"
                className="font-barlow-condensed px-8 py-[12px] bg-[#C0362A] text-white text-[12px] font-bold tracking-[0.14em] rounded-full hover:bg-[#A02820] transition-colors">
                BUILDING PROJECT
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            §10 · MAILING LIST — deep red, centered
        ═══════════════════════════════════ */}
        <section className="bg-[#7B1113] py-16 px-6 md:px-12 xl:px-20">
          <div className="max-w-[560px] mx-auto text-center" data-reveal>
            <h2 className="font-oswald font-bold uppercase text-white tracking-[0.08em] text-[clamp(18px,3vw,26px)] mb-3">
              JOIN OUR MAILING LIST
            </h2>
            <p className="font-barlow text-white/60 text-[14px] leading-relaxed mb-8">
              We promise not to spam you, but send you edifying and amazing content regularly from Rose of Sharon.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder="Email"
                className="font-barlow flex-1 px-5 py-[13px] bg-white/10 border border-white/20 text-white placeholder-white/40 text-[14px] rounded-none outline-none focus:border-white/50 transition-colors"
              />
              <button
                type="submit"
                className="font-barlow-condensed px-8 py-[13px] bg-white text-[#7B1113] text-[12px] font-bold tracking-[0.18em] hover:bg-white/90 transition-colors">
                SUBMIT
              </button>
            </form>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
