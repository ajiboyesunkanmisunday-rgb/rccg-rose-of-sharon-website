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
  boast:   "https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?w=1200&q=80",
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
    glass:        "bg-[#1F1F1F] text-white",
    red:          "bg-[#C0362A] text-white",
    "outline-dark": "bg-[#F4F4F4] text-[#0E0E0E]",
  }[v];
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[12px] font-bold ${cls}`}>
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
            §1 · HERO — left-aligned
        ═══════════════════════════════════ */}
        <section className="relative flex flex-col items-start justify-center min-h-screen overflow-hidden">
          <img src="/assets/hero-bg.png" alt="" aria-hidden
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            style={{ animation: "kenBurns 24s ease-in-out infinite alternate" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E0E0E]/75 via-[#0E0E0E]/50 to-[#0E0E0E]/80" />

          <div className="relative z-10 flex flex-col items-start gap-4 px-6 md:px-14 xl:px-20 max-w-5xl pt-24">
            <h1 className="font-anton uppercase text-white leading-[0.88]">
              <span className="block text-[clamp(44px,7vw,100px)]">WHERE GOD HAS</span>
              <span className="block text-[clamp(44px,7vw,100px)]">A PERMANENT</span>
              <span className="block text-[clamp(44px,7vw,100px)] text-[#C0362A]">SEAT</span>
            </h1>

            <div className="flex flex-wrap items-center justify-start gap-3 mt-4">
              <Link href="/media"
                className="font-barlow-condensed px-8 py-[12px] bg-white text-[#0E0E0E] text-[12px] font-bold tracking-[0.14em] rounded-full hover:bg-white/90 active:scale-95 transition-all">
                WATCH LIVE
              </Link>
              <Link href="/give"
                className="font-barlow-condensed px-8 py-[11px] border-[1.5px] border-white text-white text-[12px] font-bold tracking-[0.14em] rounded-full hover:bg-white/10 active:scale-95 transition-all">
                BUILDING PROJECT
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

        {/* 30th Anniversary Banner */}
        <div className="bg-[#0E0E0E] py-8 px-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-[#C0362A] flex items-center justify-center">
              <span className="font-anton text-white text-[14px] leading-none">30</span>
            </div>
            <div>
              <p className="font-barlow-condensed text-[#C0362A] text-[10px] font-bold tracking-[0.3em] uppercase mb-0.5">MILESTONE</p>
              <h3 className="font-anton text-white text-[clamp(18px,2.5vw,28px)] uppercase leading-tight">
                30TH ANNIVERSARY CELEBRATION
              </h3>
            </div>
          </div>
          <Link href="/events"
            className="font-barlow-condensed flex-shrink-0 px-7 py-[10px] bg-[#C0362A] text-white text-[11px] font-bold tracking-[0.18em] rounded-full hover:bg-[#A02820] transition-colors">
            LEARN MORE
          </Link>
        </div>

        {/* Building Project floating CTA — between anniversary banner and welcome, matching CCI */}
        <div className="bg-white flex justify-center py-6">
          <Link href="/give"
            className="font-barlow-condensed px-10 py-[12px] bg-[#C0362A] text-white text-[12px] font-bold tracking-[0.2em] rounded-full hover:bg-[#A02820] transition-colors">
            BUILDING PROJECT
          </Link>
        </div>

        {/* ═══════════════════════════════════
            §2 · WELCOME HOME  (white, left-aligned)
        ═══════════════════════════════════ */}
        <section className="bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
            <div className="mb-8" data-reveal>
              <Pill v="outline-dark">🤝 WELCOME TO ROS</Pill>
              <h2 className="font-anton text-[#0E0E0E] text-3xl font-medium leading-loose mt-4 md:my-6 md:text-6xl">
                WELCOME HOME!
              </h2>
              <p className="max-w-[360px] text-xs text-[#000000CC] leading-relaxed md:text-sm lg:text-base">
                Dive into our teachings, events and community.<br />Your journey of faith begins here.
              </p>
            </div>

            {/* 3 photo cards — horizontal scrollable row, text at TOP, CTA at bottom (CCI-exact) */}
            <div className="no-scrollbar my-12 flex w-full max-w-7xl justify-between gap-4 overflow-x-auto md:my-16">
              {[
                { img: IMG.w1, cat: "WHO WE ARE",         title: "About us",        label: "LEARN MORE", href: "/about" },
                { img: IMG.w2, cat: "JOIN OUR COMMUNITY", title: "Connect with us", label: "JOIN US",    href: "/first-timer" },
                { img: IMG.w3, cat: "ENDLESS CELEBRATION", title: "Celebrations",   label: "LEARN MORE", href: "/celebrations" },
              ].map((c) => (
                <Link key={c.cat} href={c.href}
                  className="relative h-[440px] w-full min-w-[320px] overflow-hidden block">
                  <img src={c.img} alt={c.title}
                    className="absolute left-0 top-0 h-full w-full object-cover" />
                  <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-t from-black/80 to-black/20" />
                  <p className="absolute left-4 top-4 z-10 text-xs font-extrabold uppercase tracking-wide text-white">{c.cat}</p>
                  <h2 className="absolute left-4 top-8 z-10 text-[28px] font-bold tracking-wide text-white">{c.title}</h2>
                  <span className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                    <h3 className="text-[10px] font-extrabold uppercase tracking-wide text-white">{c.label}</h3>
                    <Arr />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            §3 · MISSION STATEMENT  (dark, centered)
        ═══════════════════════════════════ */}
        <section className="flex h-[500px] w-full items-center justify-center bg-black"
          style={{ backgroundImage: "url(/assets/family.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="flex h-full w-full items-center justify-center bg-black/85">
          <div className="flex w-full max-w-3xl flex-col items-center gap-6 px-4 text-center">
            <Pill v="glass">🌍 RCCG WORLDWIDE</Pill>
            <div>
              <h2 className="font-anton text-center text-2xl uppercase text-white md:text-[46px] md:leading-[55px]">
                WE ENLIST, DISCIPLE AND REDEPLOY A PEOPLE
              </h2>
              <h2 className="font-anton text-center text-2xl uppercase text-[#C0362A] md:text-[46px] md:leading-[55px]">
                IN CHRIST, FOR CHRIST, WITH JOY.
              </h2>
            </div>
            <p className="text-center text-base text-white md:text-lg lg:text-xl">
              Join us at a Rose of Sharon church near you
            </p>
            <Link href="/about"
              className="font-barlow-condensed rounded-[20px] border border-white bg-transparent px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black">
              LEARN MORE ABOUT US
            </Link>
          </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            §4 · VISIT — dark bg, scrollable cards (CCI-exact)
        ═══════════════════════════════════ */}
        <section className="w-full bg-black">
          <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
            <div className="flex w-full flex-wrap items-center justify-between gap-4">
              <h2 className="text-xl font-extrabold tracking-widest text-white md:text-[32px]">
                VISIT ROSE OF SHARON
              </h2>
            </div>

            <div className="no-scrollbar my-6 flex w-full justify-between gap-4 overflow-x-auto">
              {[
                { img: IMG.v1, name: "Sunday Service",     sub: "7am & 10am" },
                { img: IMG.v2, name: "Youth Church",       sub: "Sunday 10am" },
                { img: IMG.v3, name: "Women's Fellowship", sub: "Saturday" },
                { img: IMG.v4, name: "Night Vigil",        sub: "Friday 10pm" },
                { img: IMG.v1, name: "Watch Online",       sub: "On any device" },
              ].map((item) => (
                <Link key={item.name} href="/media"
                  className="group relative h-[360px] min-w-[240px] cursor-pointer overflow-hidden block">
                  <img src={item.img} alt={item.name}
                    className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/30" />
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2}
                    className="absolute right-4 top-4 h-6 w-6 -rotate-45 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  <h5 className="absolute bottom-12 left-4 text-2xl font-bold text-white">{item.name}</h5>
                  <h5 className="absolute bottom-4 left-4 text-base text-[#FFFFFF99]">{item.sub}</h5>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            §5 · BOAST — full-width photo bg, white text at bottom (CCI layout)
        ═══════════════════════════════════ */}
        <section className="relative h-[780px] overflow-hidden bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: `url(${IMG.boast})` }}>
          <div className="flex h-[780px] items-end bg-gradient-to-b from-black/20 via-black/50 to-black/90">
            <div className="mx-auto mb-16 flex w-full max-w-6xl flex-col flex-wrap items-start gap-4 px-4">
              <h2 className="font-anton text-2xl font-medium text-white md:text-5xl md:leading-[3.5rem]">
                WE BOAST IN <br />CHRIST JESUS
              </h2>
              <p className="w-full max-w-[560px] text-left text-white">
                Our greatest success story at Rose of Sharon has been the grace to effectively evangelize, make disciples of, and deploy people who once upon a time were mere seekers, as mature disciples and vibrant ministers of the gospel.
              </p>
              <Link href="/about"
                className="font-barlow-condensed inline-flex items-center gap-2.5 rounded-[20px] border border-[#C0362A] bg-[#C0362A] px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white hover:border-white hover:bg-transparent transition-all">
                LEARN MORE <Arr />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            §6 · COMMUNITY — centered heading, photo cards with text BELOW
        ═══════════════════════════════════ */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 pt-20 pb-14">
            <div className="text-center mb-14" data-reveal>
              <h2 className="mx-auto w-fit rounded-[20px] bg-[#0000000A] px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-[#000000CC]">
                <span className="mr-1">🌍</span>COMMUNITY
              </h2>
              <h2 className="font-anton text-[#0E0E0E] text-3xl leading-tight mt-5 md:text-[44px]">
                We do community differently<br />at{" "}
                <span style={{ color: "#C0362A" }}>
                  Rose of Sharon
                </span>
              </h2>
              <p className="text-center text-xl text-[#00000080] mt-3">More than a church, a place to grow</p>
            </div>

            {/* Community cards — gap-8, rounded-lg images, plain font-bold title (CCI-exact) */}
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 pb-8 md:grid-cols-2 md:pb-12 lg:grid-cols-3">
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
                  <div className="flex w-full flex-col gap-3 rounded-lg">
                    <img src={item.img} alt={item.title}
                      className="h-[250px] rounded-lg object-cover object-center" />
                    <div className="flex cursor-pointer items-center gap-1">
                      <h3 className="text-lg font-bold underline-offset-8 group-hover:underline">{item.title}</h3>
                      <Arr />
                    </div>
                    <p className="line-clamp-3 text-[#00000099]">{item.body}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            §7 · LEAD PASTOR — dark bg, fixed-width photo + centered text (CCI-exact)
        ═══════════════════════════════════ */}
        <section className="bg-black py-6">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-y-4 md:grid-cols-2">
            {/* Left: centered fixed-width pastor photo */}
            <div className="flex items-center justify-center">
              <img src={IMG.pastor} alt="Lead Pastor"
                className="h-auto w-[300px] lg:w-[540px]" />
            </div>

            {/* Right: centered text content */}
            <div className="flex items-center justify-center text-white">
              <div className="flex w-full max-w-[444px] flex-col items-center gap-5 px-4 py-10 text-center lg:py-2">
                <div className="flex items-center gap-3">
                  <div className="relative w-6 h-6 flex-shrink-0">
                    <Image src="/assets/logo.png" alt="" fill className="object-contain" />
                  </div>
                  <span className="font-barlow-condensed text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase">
                    ROSE OF SHARON GLOBAL
                  </span>
                </div>
                <h2 className="text-2xl font-black uppercase tracking-[0.2em]">Our lead pastor</h2>
                <p className="font-medium leading-7 text-[#FFFFFFA3]">
                  Our lead pastor is a visionary minister dedicated to building a church community rooted in the Word of God, passionate about worship, and committed to transforming lives through the power of the Holy Spirit. Under their leadership, Rose of Sharon has grown into a thriving hub of faith, discipleship, and community impact.
                </p>
                <Link href="/about"
                  className="font-barlow-condensed rounded-[20px] border px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white hover:bg-white hover:text-black transition-all">
                  READ MORE
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            §8 · MINISTRIES — white bg, huge faded EVERYONE, photo cards right
        ═══════════════════════════════════ */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">
              {/* Left: text column */}
              <div data-reveal-left className="flex flex-col justify-start pt-4">
                <h6 className="text-center text-xs font-black tracking-[0.2em] text-[#000000CC] mb-3">
                  MINISTRIES
                </h6>
                <h2 className="font-anton text-center text-[#0E0E0E] text-3xl leading-none md:text-[64px]">
                  THERE&apos;S A PLACE FOR <span className="font-anton text-[#C0362A]">EVERYONE</span>
                </h2>
                <Link href="/groups"
                  className="whitespace-nowrap mt-6 rounded-[20px] border border-black bg-transparent px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-black hover:bg-black hover:text-white transition-all w-fit">
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
                      <p className="text-[#888] text-[13px] mt-1">{m.sub}</p>
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
            §9 · GIVE — floating card on red bg (CCI-exact)
        ═══════════════════════════════════ */}
        <section className="bg-white py-8">
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <div className="bg-[#F8EAEA] rounded-lg px-8 md:px-16 h-[350px] relative overflow-hidden">
              {/* Decorative hand-drawn rose element matching CCI */}
              <svg aria-hidden className="absolute right-0 top-0 h-full w-[55%] opacity-[0.2] pointer-events-none"
                viewBox="0 0 700 600" fill="none">
                <path d="M500 50 Q600 200 500 350 Q400 500 300 550 Q200 600 150 500 Q100 400 200 300 Q300 200 250 100 Q300 50 400 80 Q500 110 500 50Z"
                  stroke="#C0362A" strokeWidth="1" fill="none" />
                <path d="M520 80 Q620 220 530 380 Q440 540 340 580" stroke="#C0362A" strokeWidth="0.8" fill="none" />
                <circle cx="400" cy="300" r="120" stroke="#C0362A" strokeWidth="0.8" fill="none" />
                <circle cx="520" cy="180" r="80" stroke="#C0362A" strokeWidth="0.6" fill="none" />
              </svg>

              <div className="relative z-10">
                <h2 className="font-anton text-[#0E0E0E] leading-none text-3xl md:text-6xl lg:text-[80px] pt-6 md:pt-12">
                  Give to Rose of Sharon
                </h2>
                <p className="text-[#000000B2] text-base md:text-lg mt-2 mb-8">
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
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            §10 · MAILING LIST — deep red, centered
        ═══════════════════════════════════ */}
        <section className="bg-[#7B1113] py-16 px-4">
          <div className="max-w-[560px] mx-auto text-center" data-reveal>
            <h2 className="font-oswald font-bold uppercase text-white tracking-[0.08em] text-[clamp(18px,3vw,26px)] mb-3">
              JOIN OUR MAILING LIST
            </h2>
            <p className="text-white/60 text-[14px] leading-relaxed mb-8">
              We promise not to spam you, but send you edifying and amazing content regularly from Rose of Sharon.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-5 py-[13px] bg-white/10 border border-white/20 text-white placeholder-white/40 text-[14px] rounded-none outline-none focus:border-white/50 transition-colors"
              />
              <button
                type="submit"
                className="font-barlow-condensed w-full py-[13px] bg-white text-[#7B1113] text-[12px] font-bold tracking-[0.18em] hover:bg-white/90 transition-colors">
                Submit
              </button>
            </form>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
