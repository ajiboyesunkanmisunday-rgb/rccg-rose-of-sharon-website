"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/* ─────────────────────────────────────────────────────────────
   PLACEHOLDER IMAGES — replace with ROS photos before launch
   All sourced from Unsplash (free to use)
───────────────────────────────────────────────────────────── */
const IMG = {
  /* Hero: dark concert / worship crowd scene */
  hero: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&q=85",

  /* Welcome section cards */
  w1: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80", /* people gathered */
  w2: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80", /* warm group */
  w3: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80", /* crowd at event */

  /* "We Boast" dark photo section */
  boast: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1920&q=80",

  /* Community cards */
  c1: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",  /* concert warm light */
  c2: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",  /* audience / crowd */
  c3: "https://images.unsplash.com/photo-1527261834078-9b37d35a4a32?w=800&q=80",  /* night community */

  /* Media / sermons section */
  m1: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80",
  m2: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600&q=80",
  m3: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=600&q=80",

  /* Lead pastor */
  pastor: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80",
};

/* ─── Safe scroll-reveal — content is visible before JS hydrates ─── */
function useReveal() {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("anim-ready");

    const els = html.querySelectorAll(
      "[data-reveal],[data-reveal-left],[data-reveal-right],[data-stagger]"
    );
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      html.classList.remove("anim-ready");
    };
  }, []);
}

/* ─── Pill badge ─── */
function Pill({
  children,
  v = "glass",
}: {
  children: React.ReactNode;
  v?: "glass" | "red" | "outline-dark";
}) {
  const styles = {
    glass:        "bg-white/10 border border-white/25 text-white",
    red:          "bg-[#C0362A] text-white",
    "outline-dark": "bg-transparent border border-[#0E0E0E]/20 text-[#0E0E0E]",
  };
  return (
    <span
      className={`inline-flex items-center gap-2 px-[18px] py-[8px] rounded-full font-barlow-condensed text-[11px] font-bold tracking-[0.22em] uppercase ${styles[v]}`}
    >
      {children}
    </span>
  );
}

function Dot({ c = "#C0362A" }: { c?: string }) {
  return <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c }} />;
}

function Arr({ cls = "" }: { cls?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      className={`w-[13px] h-[13px] flex-shrink-0 ${cls}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

/* ─── Play icon for media cards ─── */
function PlayIcon() {
  return (
    <div className="w-12 h-12 rounded-full bg-white/20 border border-white/40 flex items-center justify-center backdrop-blur-sm">
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 ml-0.5">
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  );
}

export default function Home() {
  useReveal();

  return (
    <>
      <Navbar />
      <main>

        {/* ═══════════════════════════════════════════
            § 1 · HERO
        ═══════════════════════════════════════════ */}
        <section className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden">
          <img
            src={IMG.hero}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
            style={{ animation: "kenBurns 24s ease-in-out infinite alternate" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E0E0E]/82 via-[#0E0E0E]/52 to-[#0E0E0E]/88 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-5 px-6 max-w-4xl mx-auto pt-20">
            <Pill v="glass"><Dot /> OUR VISION</Pill>

            {/* Two impactful lines + red accent — fits any viewport */}
            <h1 className="font-oswald font-bold uppercase text-white leading-[0.9] tracking-[-0.01em]">
              <span className="block text-[clamp(48px,8.5vw,104px)]">WHERE GOD HAS</span>
              <span className="block text-[clamp(48px,8.5vw,104px)]">A PERMANENT SEAT</span>
              <span className="block text-[clamp(40px,7vw,88px)] text-[#C0362A] mt-1">IN OUR HEARTS</span>
            </h1>

            <p className="font-barlow text-white/60 text-[16px] md:text-[17px] max-w-md leading-relaxed">
              Join us for worship, fellowship, and life-changing ministry at RCCG Rose of Sharon.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              <Link href="/media"
                className="font-barlow-condensed px-8 py-[13px] bg-white text-[#0E0E0E] text-[13px] font-bold tracking-[0.14em] rounded-full hover:bg-white/90 active:scale-95 transition-all">
                WATCH LIVE
              </Link>
              <Link href="/events"
                className="font-barlow-condensed px-8 py-[12px] border-2 border-white/75 text-white text-[13px] font-bold tracking-[0.14em] rounded-full hover:bg-white/10 active:scale-95 transition-all">
                QUICK LINKS
              </Link>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce opacity-50">
            <span className="font-barlow-condensed text-white text-[9px] tracking-[0.4em]">SCROLL</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            § 2 · WELCOME HOME  (white)
        ═══════════════════════════════════════════ */}
        <section className="bg-white pt-20 pb-24 md:pt-28 md:pb-32 px-6 md:px-16 xl:px-24">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12" data-reveal>
              <div>
                <Pill v="red">WELCOME TO ROSE OF SHARON</Pill>
                <h2 className="font-oswald font-bold uppercase text-[#0E0E0E] text-[clamp(52px,7.5vw,96px)] leading-[0.88] mt-4">
                  WELCOME HOME!
                </h2>
              </div>
              <p className="font-barlow text-[#666] text-[16px] leading-relaxed max-w-sm">
                Dive into our teachings, events and community.<br />Your journey of faith begins here.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3" data-stagger>
              {[
                { img: IMG.w1, label: "LEARN MORE", sub: "Sermons & Teachings", href: "/media" },
                { img: IMG.w2, label: "SIGN UP",    sub: "First Timers",        href: "/first-timer" },
                { img: IMG.w3, label: "LEARN MORE", sub: "Groups & Community",  href: "/groups" },
              ].map((c) => (
                <Link key={c.sub} href={c.href}
                  className="relative overflow-hidden rounded-xl group block"
                  style={{ aspectRatio: "4/5" }}>
                  <img src={c.img} alt={c.sub}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="font-barlow text-white/55 text-[12px] mb-1">{c.sub}</p>
                    <p className="font-barlow-condensed text-white font-bold text-[17px] tracking-wide flex items-center gap-2">
                      {c.label} <Arr />
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            § 3 · MISSION STATEMENT  (pure black)
        ═══════════════════════════════════════════ */}
        <section className="bg-[#0E0E0E] py-24 md:py-44 px-6 md:px-16 xl:px-24">
          <div className="max-w-[1280px] mx-auto text-center">
            <div data-reveal>
              <Pill v="glass"><Dot /> RCCG WORLDWIDE</Pill>
            </div>

            <h2 data-reveal
              className="font-oswald font-bold uppercase text-white leading-[0.88] mt-10 text-[clamp(44px,8.5vw,108px)]">
              WE ENLIST, DISCIPLE<br />AND REDEPLOY A PEOPLE<br />
              <span className="text-[#C0362A]">IN CHRIST, FOR CHRIST,<br />WITH JOY</span>
            </h2>

            <p data-reveal className="font-barlow text-white/40 text-[17px] max-w-xl mx-auto mt-10 leading-relaxed">
              RCCG Rose of Sharon is committed to raising a generation of believers rooted in the Word, active in worship, and deployed for kingdom impact.
            </p>

            <div data-reveal className="mt-10 flex justify-center">
              <Link href="/about"
                className="font-barlow-condensed inline-flex items-center gap-2 px-9 py-[14px] border-2 border-white text-white text-[13px] font-bold tracking-[0.14em] rounded-full hover:bg-white hover:text-[#0E0E0E] transition-all duration-300">
                LEARN MORE <Arr />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            § 4 · VISIT / SERVICE TIMES  (white)
        ═══════════════════════════════════════════ */}
        <section className="bg-white py-20 md:py-28 px-6 md:px-16 xl:px-24">
          <div className="max-w-[1280px] mx-auto">
            <h2 data-reveal
              className="font-oswald font-bold uppercase text-[#0E0E0E] text-[clamp(38px,6vw,80px)] leading-[0.88] mb-14">
              VISIT ROSE OF SHARON
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#E5E5E5] rounded-xl overflow-hidden border border-[#E5E5E5]" data-stagger>
              {[
                { emoji: "⛪", title: "Sunday Service",  time: "7:00 AM & 10:00 AM",  note: "Main Auditorium" },
                { emoji: "📖", title: "Midweek Service", time: "Wednesday · 5:30 PM", note: "Bible Study" },
                { emoji: "🙏", title: "Prayer Night",    time: "Friday · 10:00 PM",   note: "Night Vigil" },
              ].map((s) => (
                <div key={s.title} className="bg-white p-10 hover:bg-[#FAFAFA] transition-colors">
                  <span className="text-4xl block mb-6">{s.emoji}</span>
                  <h3 className="font-oswald font-semibold uppercase text-[#0E0E0E] text-[20px] leading-tight">{s.title}</h3>
                  <p className="font-barlow text-[#C0362A] font-semibold text-[14px] mt-2">{s.time}</p>
                  <p className="font-barlow text-[#999] text-[13px] mt-1">{s.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            § 5 · WE BOAST IN CHRIST  (dark photo)
        ═══════════════════════════════════════════ */}
        <section className="relative min-h-[600px] flex items-center overflow-hidden">
          <img src={IMG.boast} alt="" aria-hidden
            className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0E0E0E]/62" />

          <div className="relative z-10 max-w-[1280px] mx-auto w-full px-6 md:px-16 xl:px-24 py-24
                          grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-reveal-left>
              <h2 className="font-oswald font-bold uppercase text-white leading-[0.88] text-[clamp(48px,7vw,96px)]">
                WE BOAST IN<br />CHRIST JESUS
              </h2>
              <p className="font-barlow text-white/60 text-[17px] mt-7 leading-relaxed max-w-lg">
                Our greatest success at Rose of Sharon has been the grace to evangelize, make disciples, and deploy people — who were once seekers — as vibrant ministers of the gospel.
              </p>
              <Link href="/about"
                className="font-barlow-condensed inline-flex items-center gap-2 mt-9 px-9 py-[14px] bg-[#C0362A] text-white text-[13px] font-bold tracking-[0.14em] rounded-full hover:bg-[#A02820] transition-colors">
                LEARN MORE <Arr />
              </Link>
            </div>
            {/* stats column */}
            <div className="grid grid-cols-2 gap-4" data-reveal-right>
              {[
                { num: "500+",  label: "Members" },
                { num: "15+",   label: "Years of Ministry" },
                { num: "100+",  label: "Workers Trained" },
                { num: "1000+", label: "Souls Won" },
              ].map((s) => (
                <div key={s.label}
                  className="border border-white/15 rounded-xl p-6 hover:border-white/30 transition-colors">
                  <p className="font-oswald font-bold text-white text-[clamp(32px,5vw,52px)] leading-none">{s.num}</p>
                  <p className="font-barlow text-white/50 text-[13px] mt-2 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            § 6 · COMMUNITY  (white)
        ═══════════════════════════════════════════ */}
        <section className="bg-white py-20 md:py-28 px-6 md:px-16 xl:px-24">
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-14" data-reveal>
              <Pill v="red">COMMUNITY</Pill>
              <h2 className="font-oswald font-bold uppercase text-[#0E0E0E] leading-[0.88] mt-5 text-[clamp(38px,6vw,80px)]">
                We do community differently<br />
                at <em className="text-[#C0362A] not-italic italic">Rose of Sharon</em>
              </h2>
              <p className="font-barlow text-[#888] text-[17px] mt-4">
                More than a church — a place to grow, belong, and serve.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3" data-stagger>
              {[
                { img: IMG.c1, title: "Church Groups",      sub: "Hearts of David · Oaks of Righteousness", href: "/groups" },
                { img: IMG.c2, title: "Training Programs",  sub: "Discipleship · Ministry School",          href: "/trainings" },
                { img: IMG.c3, title: "CSR Program",        sub: "Digital Skills · Community Empowerment",  href: "/csr" },
              ].map((item) => (
                <Link key={item.title} href={item.href}
                  className="relative overflow-hidden rounded-xl group block"
                  style={{ aspectRatio: "4/3" }}>
                  <img src={item.img} alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-oswald text-white font-semibold text-[19px] uppercase">{item.title}</h3>
                    <p className="font-barlow text-white/55 text-[13px] mt-1">{item.sub}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            § 7 · LATEST SERMONS  (dark)
        ═══════════════════════════════════════════ */}
        <section className="bg-[#0E0E0E] py-20 md:py-28 px-6 md:px-16 xl:px-24">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12" data-reveal>
              <div>
                <Pill v="glass"><Dot /> SERMONS</Pill>
                <h2 className="font-oswald font-bold uppercase text-white text-[clamp(38px,6vw,76px)] leading-[0.88] mt-5">
                  LATEST FROM<br />THE PULPIT
                </h2>
              </div>
              <Link href="/media"
                className="font-barlow-condensed inline-flex items-center gap-2 border border-white/25 text-white/60 text-[12px] font-bold tracking-[0.18em] px-6 py-3 rounded-full hover:border-white hover:text-white transition-all self-start md:self-end">
                WATCH ALL SERMONS
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-stagger>
              {[
                { img: IMG.m1, title: "Living by Faith",    speaker: "Pastor's Message",   date: "Oct 2026" },
                { img: IMG.m2, title: "The Power of Prayer", speaker: "Sunday Service",     date: "Sep 2026" },
                { img: IMG.m3, title: "Walking in Purpose", speaker: "Midweek Teaching",   date: "Sep 2026" },
              ].map((sermon) => (
                <Link key={sermon.title} href="/media"
                  className="group block overflow-hidden rounded-xl">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={sermon.img} alt={sermon.title}
                      className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out brightness-75" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayIcon />
                    </div>
                  </div>
                  <div className="pt-4 pb-1">
                    <p className="font-barlow text-white/40 text-[12px] uppercase tracking-wider">{sermon.date} · {sermon.speaker}</p>
                    <h3 className="font-oswald text-white font-semibold text-[19px] uppercase mt-1 group-hover:text-[#C0362A] transition-colors">
                      {sermon.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            § 8 · LEAD PASTOR  (light)
        ═══════════════════════════════════════════ */}
        <section className="bg-[#F5F5F2] py-20 md:py-28 px-6 md:px-16 xl:px-24">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            <div className="relative max-w-[420px] mx-auto lg:mx-0" style={{ aspectRatio: "3/4" }} data-reveal-left>
              <img src={IMG.pastor} alt="Lead Pastor"
                className="w-full h-full object-cover object-top rounded-xl grayscale" />
            </div>

            <div data-reveal-right>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-7 h-7 flex-shrink-0">
                  <Image src="/assets/logo.png" alt="" fill className="object-contain" />
                </div>
                <span className="font-barlow-condensed text-[#AAA] text-[10px] font-bold tracking-[0.32em] uppercase">
                  ROSE OF SHARON GLOBAL
                </span>
              </div>

              <h2 className="font-oswald font-bold uppercase text-[#0E0E0E] text-[clamp(36px,5vw,68px)] leading-[0.88] mb-7">
                OUR LEAD PASTOR
              </h2>
              <p className="font-barlow text-[#555] text-[16px] leading-relaxed mb-9">
                Our lead pastor is a visionary minister dedicated to building a church community rooted in the Word of God, passionate about worship, and committed to transforming lives through the power of the Holy Spirit. Under their leadership, Rose of Sharon has grown into a thriving hub of faith, discipleship, and community impact.
              </p>
              <Link href="/about"
                className="font-barlow-condensed inline-flex items-center gap-2 px-9 py-[14px] border-2 border-[#0E0E0E] text-[#0E0E0E] text-[13px] font-bold tracking-[0.14em] rounded-full hover:bg-[#0E0E0E] hover:text-white transition-all duration-300">
                READ MORE <Arr />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            § 9 · MINISTRIES  (dark)
        ═══════════════════════════════════════════ */}
        <section className="bg-[#0E0E0E] py-20 md:py-28 px-6 md:px-16 xl:px-24">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14" data-reveal>
              <h2 className="font-oswald font-bold uppercase text-white leading-[0.88] text-[clamp(48px,8vw,100px)]">
                A PLACE FOR<br /><span className="text-[#C0362A]">EVERYONE</span>
              </h2>
              <Link href="/trainings"
                className="font-barlow-condensed inline-flex items-center gap-2 border border-white/25 text-white/55 text-[11px] font-bold tracking-[0.2em] px-6 py-3 rounded-full hover:border-white hover:text-white transition-all self-start md:self-end whitespace-nowrap">
                SEE ALL MINISTRIES
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3" data-stagger>
              {[
                { title: "Youth Ministry",   sub: "Teenage & Young Adults programme for growth",  href: "/groups",  emoji: "🔥" },
                { title: "Women's Ministry", sub: "Hearts of David — empowering women in faith",  href: "/groups",  emoji: "💜" },
                { title: "Men's Ministry",   sub: "Oaks of Righteousness — building godly men",   href: "/groups",  emoji: "⚡" },
                { title: "Worship & Media",  sub: "Leading congregation in spirit and truth",      href: "/media",   emoji: "🎵" },
              ].map((m) => (
                <Link key={m.title} href={m.href}
                  className="group flex items-start gap-5 p-7 border border-white/[0.08] rounded-xl hover:border-[#C0362A]/40 hover:bg-white/[0.03] transition-all duration-300">
                  <span className="text-3xl flex-shrink-0 leading-none mt-0.5">{m.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-oswald text-white font-semibold text-[18px] uppercase group-hover:text-[#C0362A] transition-colors">
                      {m.title}
                    </h3>
                    <p className="font-barlow text-white/40 text-[14px] mt-1 leading-snug">{m.sub}</p>
                  </div>
                  <Arr cls="text-white/20 group-hover:text-[#C0362A] group-hover:translate-x-1 transition-all mt-1.5" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            § 10 · TESTIMONIES QUOTE  (white)
        ═══════════════════════════════════════════ */}
        <section className="bg-white py-20 md:py-24 px-6 md:px-16 xl:px-24">
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-14" data-reveal>
              <Pill v="outline-dark">TESTIMONIES</Pill>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-stagger>
              {[
                {
                  quote: "Rose of Sharon has completely transformed how I relate with God. The teachings are deep, the community is warm — I've never felt more at home.",
                  name: "Sister Adaeze",
                  role: "Member since 2019",
                },
                {
                  quote: "I walked in as a first-timer and never left. The love I experienced here is unparalleled. This church literally saved my family.",
                  name: "Brother Emeka",
                  role: "Member since 2020",
                },
                {
                  quote: "The CSR program gave me digital skills that changed my career. God used this church to open a new chapter in my life.",
                  name: "Sister Joy",
                  role: "CSR Graduate, 2023",
                },
              ].map((t) => (
                <div key={t.name}
                  className="flex flex-col gap-4 p-8 border border-[#E8E8E8] rounded-xl hover:border-[#C0362A]/30 hover:shadow-sm transition-all">
                  <svg viewBox="0 0 24 24" fill="#C0362A" className="w-8 h-8 opacity-30">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="font-barlow text-[#444] text-[15px] leading-relaxed flex-1">
                    {t.quote}
                  </p>
                  <div className="border-t border-[#F0F0F0] pt-4">
                    <p className="font-oswald text-[#0E0E0E] font-semibold text-[15px] uppercase tracking-wide">{t.name}</p>
                    <p className="font-barlow text-[#AAA] text-[12px] mt-0.5">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10" data-reveal>
              <Link href="/testimonies"
                className="font-barlow-condensed inline-flex items-center gap-2 text-[#C0362A] text-[13px] font-bold tracking-[0.18em] hover:gap-4 transition-all">
                SEE ALL TESTIMONIES <Arr />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            § 11 · GIVE  (rose bg)
        ═══════════════════════════════════════════ */}
        <section className="bg-[#F4EAE7] py-20 md:py-28 px-6 md:px-16 xl:px-24 relative overflow-hidden">
          <svg aria-hidden className="absolute right-0 top-0 h-full w-[45%] opacity-[0.15] pointer-events-none"
            viewBox="0 0 600 700" fill="none">
            <circle cx="420" cy="120" r="280" stroke="#C0362A" strokeWidth="1.2" />
            <circle cx="500" cy="440" r="210" stroke="#C0362A" strokeWidth="1.2" />
            <circle cx="280" cy="630" r="170" stroke="#C0362A" strokeWidth="0.7" />
          </svg>

          <div className="max-w-[760px] relative z-10" data-reveal>
            <h2 className="font-oswald font-bold uppercase text-[#0E0E0E] text-[clamp(48px,8vw,96px)] leading-[0.88] mb-5">
              Give to<br />Rose of Sharon
            </h2>
            <p className="font-barlow text-[#666] text-[17px] leading-relaxed mb-11">
              Your generosity keeps blessing lives — thank you for giving. Every seed sown in faith produces an eternal harvest.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/give"
                className="font-barlow-condensed px-9 py-[14px] bg-[#0E0E0E] text-white text-[13px] font-bold tracking-[0.14em] rounded-full hover:bg-[#C0362A] transition-colors duration-300">
                GIVE NOW
              </Link>
              <Link href="/requests/prayer"
                className="font-barlow-condensed px-9 py-[13px] border-2 border-[#0E0E0E] text-[#0E0E0E] text-[13px] font-bold tracking-[0.14em] rounded-full hover:bg-[#0E0E0E] hover:text-white transition-all duration-300">
                PRAYER REQUEST
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
