"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/* ── Placeholder images — replace with ROS photos ── */
const IMG = {
  hero:     "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&q=85",
  card1:    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
  card2:    "https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?w=800&q=80",
  card3:    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
  boastBg:  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1920&q=80",
  comm1:    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
  comm2:    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
  comm3:    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
  pastor:   "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80",
};

/* ── Safe scroll-reveal (content visible before JS hydrates) ── */
function useReveal() {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("anim-ready");

    const els = html.querySelectorAll("[data-reveal],[data-reveal-left],[data-reveal-right],[data-stagger]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      html.classList.remove("anim-ready");
    };
  }, []);
}

/* ── Badge pill (matches CCI exactly) ── */
function Pill({
  children,
  variant = "glass",
}: {
  children: React.ReactNode;
  variant?: "glass" | "red" | "dark";
}) {
  const base = "inline-flex items-center gap-2 px-[18px] py-[8px] rounded-full font-barlow-condensed text-[11px] font-bold tracking-[0.22em] uppercase";
  const variants = {
    glass: "bg-white/10 border border-white/25 text-white backdrop-blur-sm",
    red:   "bg-[#C0362A] text-white",
    dark:  "bg-[#0E0E0E] border border-white/20 text-white",
  };
  return <span className={`${base} ${variants[variant]}`}>{children}</span>;
}

function Dot({ color = "#C0362A" }: { color?: string }) {
  return <span className="inline-block w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />;
}

function Arrow({ cls = "" }: { cls?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={`w-[14px] h-[14px] flex-shrink-0 ${cls}`}>
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

        {/* ══════════════════════════════════════
            § 1  HERO
        ══════════════════════════════════════ */}
        <section className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden">
          <img
            src={IMG.hero}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
            style={{ animation: "kenBurns 22s ease-in-out infinite alternate" }}
          />
          {/* gradient overlay — matches CCI's dark film look */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E0E0E]/80 via-[#0E0E0E]/55 to-[#0E0E0E]/88 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-7 px-6 max-w-5xl mx-auto pt-20">
            <Pill variant="glass">
              <Dot /> OUR VISION
            </Pill>

            <h1 className="font-oswald font-bold uppercase text-white leading-[0.88] tracking-[-0.01em]">
              <span className="block text-[clamp(54px,12vw,128px)]">WE ENVISION ALL</span>
              <span className="block text-[clamp(54px,12vw,128px)]">WHO ENTER OUR</span>
              <span className="block text-[clamp(54px,12vw,128px)] text-[#C0362A]">DOORS TRANSFORMED</span>
            </h1>

            <p className="font-barlow text-white/65 text-[16px] md:text-[18px] max-w-lg leading-relaxed">
              Where God has a permanent seat. Join us for worship, fellowship, and life-changing ministry at RCCG Rose of Sharon.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
              <Link
                href="/media"
                className="font-barlow-condensed px-9 py-[14px] bg-white text-[#0E0E0E] text-[14px] font-bold tracking-[0.12em] rounded-full hover:bg-white/90 active:scale-95 transition-all duration-200"
              >
                WATCH LIVE
              </Link>
              <Link
                href="/events"
                className="font-barlow-condensed px-9 py-[13px] border-2 border-white/80 text-white text-[14px] font-bold tracking-[0.12em] rounded-full hover:bg-white/10 active:scale-95 transition-all duration-200"
              >
                QUICK LINKS
              </Link>
            </div>
          </div>

          {/* scroll hint */}
          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce">
            <span className="font-barlow-condensed text-white/35 text-[9px] tracking-[0.4em]">SCROLL</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-white/35">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </section>

        {/* ══════════════════════════════════════
            § 2  WELCOME  (white)
        ══════════════════════════════════════ */}
        <section className="bg-white py-20 md:py-28 px-6 md:px-16 xl:px-24">
          <div className="max-w-[1280px] mx-auto">
            {/* top row */}
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-14" data-reveal>
              <div>
                <div className="mb-4">
                  <Pill variant="red">WELCOME TO ROSE OF SHARON</Pill>
                </div>
                <h2 className="font-oswald font-bold uppercase text-[#0E0E0E] text-[clamp(52px,8vw,96px)] leading-[0.88]">
                  WELCOME HOME!
                </h2>
              </div>
              <p className="font-barlow text-[#666] text-[16px] leading-relaxed max-w-md">
                Dive into our teachings, events and community. Your journey of faith begins here — and this is where it flourishes.
              </p>
            </div>

            {/* 3 portrait cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3" data-stagger>
              {[
                { img: IMG.card1, label: "LEARN MORE", sub: "Sermons & Teachings", href: "/media" },
                { img: IMG.card2, label: "SIGN UP", sub: "First Timers", href: "/first-timer" },
                { img: IMG.card3, label: "LEARN MORE", sub: "Groups & Community", href: "/groups" },
              ].map((c) => (
                <Link key={c.sub} href={c.href} className="relative overflow-hidden rounded-xl group block aspect-[4/5]">
                  <img
                    src={c.img}
                    alt={c.sub}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="font-barlow text-white/55 text-[13px] mb-0.5">{c.sub}</p>
                    <p className="font-barlow-condensed text-white font-bold text-[18px] tracking-wide flex items-center gap-2">
                      {c.label} <Arrow />
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            § 3  MISSION STATEMENT  (black)
        ══════════════════════════════════════ */}
        <section className="bg-[#0E0E0E] py-24 md:py-40 px-6 md:px-16 xl:px-24">
          <div className="max-w-[1280px] mx-auto text-center">
            <div data-reveal>
              <Pill variant="dark">
                <Dot color="#C0362A" /> RCCG WORLDWIDE
              </Pill>
            </div>
            <h2
              data-reveal
              className="font-oswald font-bold uppercase text-white leading-[0.88] mt-9 text-[clamp(44px,8.5vw,104px)]"
            >
              WE ENLIST, DISCIPLE AND<br />
              REDEPLOY A PEOPLE<br />
              <span className="text-[#C0362A]">IN CHRIST, FOR CHRIST,<br />WITH JOY</span>
            </h2>
            <p data-reveal className="font-barlow text-white/45 text-[17px] max-w-2xl mx-auto mt-10 leading-relaxed">
              RCCG Rose of Sharon is committed to raising a generation of believers who are rooted in the Word, active in worship, and deployed for kingdom impact.
            </p>
            <div data-reveal className="mt-10 flex justify-center">
              <Link
                href="/about"
                className="font-barlow-condensed inline-flex items-center gap-2 px-9 py-[14px] border-2 border-white text-white text-[14px] font-bold tracking-[0.12em] rounded-full hover:bg-white hover:text-[#0E0E0E] transition-all duration-300"
              >
                LEARN MORE <Arrow />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            § 4  SERVICE TIMES  (white)
        ══════════════════════════════════════ */}
        <section className="bg-white py-20 md:py-28 px-6 md:px-16 xl:px-24">
          <div className="max-w-[1280px] mx-auto">
            <h2 data-reveal className="font-oswald font-bold uppercase text-[#0E0E0E] text-[clamp(40px,6vw,80px)] leading-[0.9] mb-14">
              VISIT ROSE OF SHARON
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E8E8E8] rounded-xl overflow-hidden" data-stagger>
              {[
                { label: "Nigeria", time: "23 Provinces", icon: "🇳🇬" },
                { label: "Sunday Service",  time: "7:00 AM & 10:00 AM",    icon: "⛪" },
                { label: "Midweek Service", time: "Wednesday · 5:30 PM",   icon: "📖" },
                { label: "Prayer Night",    time: "Friday · 10:00 PM",     icon: "🙏" },
              ].map((item) => (
                <div key={item.label} className="bg-white p-8 hover:bg-[#F5F5F2] transition-colors duration-200">
                  <span className="text-3xl block mb-5">{item.icon}</span>
                  <h3 className="font-oswald font-semibold uppercase text-[#0E0E0E] text-[19px] leading-tight">{item.label}</h3>
                  <p className="font-barlow text-[#C0362A] font-medium text-[14px] mt-2">{item.time}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            § 5  WE BOAST IN CHRIST  (dark photo)
        ══════════════════════════════════════ */}
        <section className="relative min-h-[580px] flex items-center overflow-hidden">
          <img src={IMG.boastBg} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0E0E0E]/65" />
          <div className="relative z-10 px-6 md:px-16 xl:px-24 py-24 max-w-3xl" data-reveal-left>
            <h2 className="font-oswald font-bold uppercase text-white leading-[0.88] text-[clamp(48px,7.5vw,96px)]">
              WE BOAST IN<br />CHRIST JESUS
            </h2>
            <p className="font-barlow text-white/65 text-[17px] mt-7 leading-relaxed max-w-lg">
              Our greatest success at Rose of Sharon has been the grace to evangelize, make disciples, and deploy people — who were once seekers — as vibrant ministers of the gospel.
            </p>
            <Link
              href="/about"
              className="font-barlow-condensed inline-flex items-center gap-2 mt-9 px-9 py-[14px] bg-[#C0362A] text-white text-[14px] font-bold tracking-[0.12em] rounded-full hover:bg-[#A02820] transition-colors duration-300"
            >
              LEARN MORE <Arrow />
            </Link>
          </div>
        </section>

        {/* ══════════════════════════════════════
            § 6  COMMUNITY  (white)
        ══════════════════════════════════════ */}
        <section className="bg-white py-20 md:py-28 px-6 md:px-16 xl:px-24">
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-14" data-reveal>
              <Pill variant="red">COMMUNITY</Pill>
              <h2 className="font-oswald font-bold uppercase text-[#0E0E0E] leading-[0.88] mt-5 text-[clamp(40px,6.5vw,80px)]">
                We do community differently<br />at{" "}
                <span className="text-[#C0362A] italic not-italic" style={{ fontStyle: "italic" }}>Rose of Sharon</span>
              </h2>
              <p className="font-barlow text-[#777] text-[17px] mt-4">
                More than a church — a place to grow, belong, and serve.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3" data-stagger>
              {[
                { img: IMG.comm1, title: "Church Groups", sub: "Hearts of David · Oaks of Righteousness", href: "/groups" },
                { img: IMG.comm2, title: "Training Programs", sub: "Discipleship · Ministry School", href: "/trainings" },
                { img: IMG.comm3, title: "CSR Program", sub: "Digital Skills · Community Empowerment", href: "/csr" },
              ].map((item) => (
                <Link key={item.title} href={item.href} className="relative overflow-hidden rounded-xl group block aspect-[4/3]">
                  <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-oswald text-white font-semibold text-[20px] uppercase">{item.title}</h3>
                    <p className="font-barlow text-white/55 text-[13px] mt-1">{item.sub}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            § 7  LEAD PASTOR  (light gray)
        ══════════════════════════════════════ */}
        <section className="bg-[#F5F5F2] py-20 md:py-28 px-6 md:px-16 xl:px-24">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div className="relative aspect-[3/4] max-w-[420px] mx-auto lg:mx-0" data-reveal-left>
              <img
                src={IMG.pastor}
                alt="Lead Pastor"
                className="w-full h-full object-cover object-top rounded-xl grayscale"
              />
            </div>
            <div data-reveal-right>
              <div className="flex items-center gap-3 mb-7">
                <div className="relative w-8 h-8 flex-shrink-0">
                  <Image src="/assets/logo.png" alt="" fill className="object-contain" />
                </div>
                <span className="font-barlow-condensed text-[#999] text-[11px] font-bold tracking-[0.3em] uppercase">
                  ROSE OF SHARON GLOBAL
                </span>
              </div>
              <h2 className="font-oswald font-bold uppercase text-[#0E0E0E] text-[clamp(38px,5vw,68px)] leading-[0.88] mb-7">
                OUR LEAD PASTOR
              </h2>
              <p className="font-barlow text-[#555] text-[16px] leading-relaxed mb-9">
                Our lead pastor is a visionary minister dedicated to building a church community rooted in the Word of God, passionate about worship, and committed to transforming lives through the power of the Holy Spirit. Under their leadership, Rose of Sharon has grown into a thriving hub of faith, discipleship, and community.
              </p>
              <Link
                href="/about"
                className="font-barlow-condensed inline-flex items-center gap-2 px-9 py-[14px] border-2 border-[#0E0E0E] text-[#0E0E0E] text-[14px] font-bold tracking-[0.12em] rounded-full hover:bg-[#0E0E0E] hover:text-white transition-all duration-300"
              >
                READ MORE <Arrow />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            § 8  MINISTRIES  (dark)
        ══════════════════════════════════════ */}
        <section className="bg-[#0E0E0E] py-20 md:py-28 px-6 md:px-16 xl:px-24">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14" data-reveal>
              <h2 className="font-oswald font-bold uppercase text-white leading-[0.88] text-[clamp(48px,8vw,100px)]">
                A PLACE FOR<br /><span className="text-[#C0362A]">EVERYONE</span>
              </h2>
              <Link
                href="/trainings"
                className="font-barlow-condensed inline-flex items-center gap-2 px-6 py-3 border border-white/25 text-white/60 text-[12px] font-bold tracking-[0.18em] rounded-full hover:border-white hover:text-white transition-all self-start md:self-end"
              >
                SEE ALL MINISTRIES
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3" data-stagger>
              {[
                { title: "Youth Ministry", sub: "Teenage & Young Adults programme for growth", href: "/groups", emoji: "🔥" },
                { title: "Women's Ministry", sub: "Hearts of David — empowering women in faith", href: "/groups", emoji: "💜" },
                { title: "Men's Ministry", sub: "Oaks of Righteousness — building godly men", href: "/groups", emoji: "⚡" },
                { title: "Worship & Media", sub: "Leading congregation in spirit and truth", href: "/media", emoji: "🎵" },
              ].map((m) => (
                <Link
                  key={m.title}
                  href={m.href}
                  className="group flex items-start gap-5 p-7 border border-white/8 rounded-xl hover:border-[#C0362A]/40 hover:bg-white/4 transition-all duration-300"
                >
                  <span className="text-3xl flex-shrink-0 leading-none">{m.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-oswald text-white font-semibold text-[19px] uppercase group-hover:text-[#C0362A] transition-colors leading-tight">
                      {m.title}
                    </h3>
                    <p className="font-barlow text-white/45 text-[14px] mt-1 leading-snug">{m.sub}</p>
                  </div>
                  <Arrow cls="text-white/20 group-hover:text-[#C0362A] group-hover:translate-x-1 transition-all mt-1" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            § 9  GIVE  (rose bg)
        ══════════════════════════════════════ */}
        <section className="bg-[#F4EAE7] py-20 md:py-28 px-6 md:px-16 xl:px-24 relative overflow-hidden">
          {/* decorative circles — matches CCI's organic line art */}
          <svg
            aria-hidden
            className="absolute right-0 top-0 h-full w-[45%] opacity-[0.18] pointer-events-none"
            viewBox="0 0 600 700" fill="none"
          >
            <circle cx="420" cy="120" r="260" stroke="#C0362A" strokeWidth="1.2" />
            <circle cx="480" cy="420" r="200" stroke="#C0362A" strokeWidth="1.2" />
            <circle cx="300" cy="620" r="160" stroke="#C0362A" strokeWidth="0.7" />
          </svg>

          <div className="max-w-[720px] relative z-10" data-reveal>
            <h2 className="font-oswald font-bold uppercase text-[#0E0E0E] text-[clamp(48px,8vw,96px)] leading-[0.88] mb-5">
              Give to<br />Rose of Sharon
            </h2>
            <p className="font-barlow text-[#555] text-[17px] leading-relaxed mb-11">
              Your generosity keeps blessing lives — thank you for giving. Every seed sown in faith produces an eternal harvest.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/give"
                className="font-barlow-condensed px-9 py-[14px] bg-[#0E0E0E] text-white text-[14px] font-bold tracking-[0.12em] rounded-full hover:bg-[#C0362A] transition-colors duration-300"
              >
                GIVE NOW
              </Link>
              <Link
                href="/requests/prayer"
                className="font-barlow-condensed px-9 py-[13px] border-2 border-[#0E0E0E] text-[#0E0E0E] text-[14px] font-bold tracking-[0.12em] rounded-full hover:bg-[#0E0E0E] hover:text-white transition-all duration-300"
              >
                BUILDING PROJECT
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
