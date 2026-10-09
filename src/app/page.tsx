"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/* ── Placeholder images (replace with ROS photos) ── */
const IMG = {
  hero:     "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&q=80",
  card1:    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
  card2:    "https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?w=800&q=80",
  card3:    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
  missionBg:"https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1920&q=80",
  pastor:   "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80",
  groups1:  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
  groups2:  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
  groups3:  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
  give:     "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1920&q=80",
};

/* ── Scroll-reveal hook ── */
function useScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll("[data-fade],[data-fade-left],[data-fade-right],[data-stagger]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ── Badge pill (CCI-style) ── */
function Badge({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-barlow-condensed text-[12px] font-bold tracking-[0.18em] uppercase ${
        light
          ? "bg-[#C1272D] text-white"
          : "bg-white/10 text-white border border-white/20 backdrop-blur-sm"
      }`}
    >
      {children}
    </span>
  );
}

/* ── Arrow icon ── */
function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={`w-4 h-4 ${className}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default function Home() {
  useScrollReveal();

  return (
    <>
      <Navbar />
      <main>

        {/* ══════════════════════════════════════════
            1. HERO
        ══════════════════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
          {/* bg image */}
          <img
            src={IMG.hero}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center scale-105"
            style={{ animation: "kenBurns 20s ease-in-out infinite alternate" }}
          />
          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/75 via-[#0F0F0F]/60 to-[#0F0F0F]/85" />

          {/* content */}
          <div className="relative z-10 flex flex-col items-center gap-6 px-6 max-w-4xl mx-auto">
            <Badge>
              <span className="w-2 h-2 rounded-full bg-[#C1272D] inline-block" />
              OUR VISION
            </Badge>

            <h1 className="font-barlow-condensed font-black uppercase leading-[0.92] text-white">
              <span className="block text-[clamp(52px,11vw,120px)] tracking-[-0.01em]">WHERE GOD HAS A</span>
              <span className="block text-[clamp(52px,11vw,120px)] tracking-[-0.01em]">PERMANENT SEAT</span>
              <span className="block text-[clamp(44px,9vw,100px)] tracking-[-0.01em] text-[#C1272D] mt-1">
                IN OUR HEARTS
              </span>
            </h1>

            <p className="font-barlow text-white/70 text-[16px] md:text-[18px] max-w-xl leading-relaxed">
              Join us for worship, fellowship, and life-changing ministry at RCCG Rose of Sharon — a community built on faith, love, and purpose.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
              <Link
                href="/media"
                className="font-barlow-condensed px-8 py-3.5 bg-white text-[#0F0F0F] text-[15px] font-bold tracking-[0.1em] rounded-full hover:bg-white/90 transition-all duration-200 hover:scale-105"
              >
                WATCH LIVE
              </Link>
              <Link
                href="/events"
                className="font-barlow-condensed px-8 py-3.5 border-2 border-white text-white text-[15px] font-bold tracking-[0.1em] rounded-full hover:bg-white/10 transition-all duration-200"
              >
                QUICK LINKS
              </Link>
            </div>
          </div>

          {/* scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <span className="font-barlow-condensed text-white/40 text-[10px] tracking-[0.3em]">SCROLL</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 text-white/40">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            2. WELCOME (white bg)
        ══════════════════════════════════════════ */}
        <section className="bg-white py-20 md:py-28 px-6 md:px-16 xl:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="mb-4">
              <Badge light>WELCOME TO ROSE OF SHARON</Badge>
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14" data-fade>
              <h2 className="font-barlow-condensed font-black uppercase text-[clamp(48px,7vw,80px)] leading-[0.9] text-[#0F0F0F]">
                WELCOME HOME!
              </h2>
              <p className="font-barlow text-[#555] text-[16px] max-w-md leading-relaxed">
                Dive into our teachings, events and community. Your journey of faith begins here — and this is where it flourishes.
              </p>
            </div>

            {/* 3 image cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-stagger>
              {[
                { img: IMG.card1, label: "JOIN A SERVICE", sub: "Sunday Worship", href: "/events" },
                { img: IMG.card2, label: "SIGN UP", sub: "First Timers", href: "/first-timer" },
                { img: IMG.card3, label: "LEARN MORE", sub: "Groups & Community", href: "/groups" },
              ].map((card) => (
                <Link
                  key={card.label}
                  href={card.href}
                  className="relative overflow-hidden rounded-lg group block aspect-[4/5]"
                >
                  <img
                    src={card.img}
                    alt={card.sub}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="font-barlow text-white/60 text-[13px] mb-1">{card.sub}</p>
                    <p className="font-barlow-condensed text-white text-[20px] font-bold tracking-wide flex items-center gap-2">
                      {card.label} <ArrowRight />
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            3. MISSION STATEMENT (black bg)
        ══════════════════════════════════════════ */}
        <section className="bg-[#0F0F0F] py-24 md:py-36 px-6 md:px-16 xl:px-24 text-center relative overflow-hidden">
          <div className="max-w-6xl mx-auto relative z-10" data-fade>
            <Badge>
              <span className="w-2 h-2 rounded-full bg-[#C1272D] inline-block" />
              RCCG WORLDWIDE
            </Badge>
            <h2 className="font-barlow-condensed font-black uppercase text-white leading-[0.9] mt-8 text-[clamp(44px,8vw,96px)]">
              WE WORSHIP, DISCIPLE AND TRANSFORM{" "}
              <span className="text-[#C1272D]">LIVES FOR CHRIST</span>
            </h2>
            <p className="font-barlow text-white/50 text-[17px] max-w-2xl mx-auto mt-8 leading-relaxed">
              RCCG Rose of Sharon is committed to raising a generation of believers who are rooted in the Word, active in worship, and deployed for kingdom impact.
            </p>
            <div className="flex justify-center mt-10">
              <Link
                href="/about"
                className="font-barlow-condensed inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white text-white text-[14px] font-bold tracking-[0.1em] rounded-full hover:bg-white hover:text-[#0F0F0F] transition-all duration-300"
              >
                LEARN MORE <ArrowRight />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            4. VISIT / SERVICE TIMES (white bg)
        ══════════════════════════════════════════ */}
        <section className="bg-white py-20 md:py-28 px-6 md:px-16 xl:px-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-barlow-condensed font-black uppercase text-[#0F0F0F] text-[clamp(36px,6vw,72px)] mb-12" data-fade>
              VISIT ROSE OF SHARON
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-stagger>
              {[
                {
                  title: "Sunday Service",
                  detail: "7:00 AM & 10:00 AM",
                  icon: "⛪",
                  sub: "Main Auditorium",
                },
                {
                  title: "Midweek Service",
                  detail: "Wednesday · 5:30 PM",
                  icon: "📖",
                  sub: "Bible Study & Prayer",
                },
                {
                  title: "Prayer Night",
                  detail: "Friday · 10:00 PM",
                  icon: "🙏",
                  sub: "Night Vigil",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="border border-[#E5E5E5] rounded-lg p-8 hover:border-[#C1272D]/40 hover:shadow-lg transition-all duration-300"
                >
                  <span className="text-3xl block mb-4">{item.icon}</span>
                  <h3 className="font-barlow-condensed font-bold text-[22px] text-[#0F0F0F] uppercase mb-1">{item.title}</h3>
                  <p className="font-barlow text-[#C1272D] font-semibold text-[16px]">{item.detail}</p>
                  <p className="font-barlow text-[#888] text-[14px] mt-1">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            5. DARK PHOTO SECTION
        ══════════════════════════════════════════ */}
        <section className="relative min-h-[560px] flex items-center overflow-hidden">
          <img src={IMG.missionBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0F0F0F]/70" />
          <div className="relative z-10 px-6 md:px-16 xl:px-24 py-24 max-w-3xl" data-fade-left>
            <h2 className="font-barlow-condensed font-black uppercase text-white leading-[0.9] text-[clamp(44px,7vw,88px)]">
              WE BOAST IN<br />CHRIST JESUS
            </h2>
            <p className="font-barlow text-white/70 text-[17px] mt-6 leading-relaxed max-w-xl">
              Our greatest testimony at Rose of Sharon has been the grace to evangelize, make disciples, and deploy people who were once seekers as vibrant ministers of the gospel.
            </p>
            <Link
              href="/about"
              className="font-barlow-condensed inline-flex items-center gap-2 mt-8 px-8 py-3.5 bg-[#C1272D] text-white text-[14px] font-bold tracking-[0.1em] rounded-full hover:bg-[#A01F23] transition-colors"
            >
              LEARN MORE <ArrowRight />
            </Link>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            6. COMMUNITY (white bg)
        ══════════════════════════════════════════ */}
        <section className="bg-white py-20 md:py-28 px-6 md:px-16 xl:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14" data-fade>
              <Badge light>COMMUNITY</Badge>
              <h2 className="font-barlow-condensed font-black uppercase text-[#0F0F0F] leading-[0.9] mt-4 text-[clamp(40px,6vw,76px)]">
                We do community differently<br />
                at{" "}
                <em className="not-italic text-[#C1272D]">Rose of Sharon</em>
              </h2>
              <p className="font-barlow text-[#666] text-[17px] mt-4 max-w-xl mx-auto">
                More than a church — a place to grow, belong, and serve.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-stagger>
              {[
                { img: IMG.groups1, title: "Church Groups", sub: "Hearts of David · Oaks of Righteousness", href: "/groups" },
                { img: IMG.groups2, title: "Training Programs", sub: "Discipleship · Ministry School", href: "/trainings" },
                { img: IMG.groups3, title: "CSR Program", sub: "Digital Skills · Empowerment", href: "/csr" },
              ].map((item) => (
                <Link key={item.title} href={item.href} className="group relative overflow-hidden rounded-lg block aspect-[4/3]">
                  <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-barlow-condensed text-white font-bold text-[20px] uppercase">{item.title}</h3>
                    <p className="font-barlow text-white/60 text-[13px] mt-1">{item.sub}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            7. LEAD PASTOR (light bg)
        ══════════════════════════════════════════ */}
        <section className="bg-[#F5F5F2] py-20 md:py-28 px-6 md:px-16 xl:px-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative aspect-[3/4] max-w-sm mx-auto lg:mx-0" data-fade-left>
              <img
                src={IMG.pastor}
                alt="Lead Pastor"
                className="w-full h-full object-cover object-top rounded-lg grayscale"
              />
            </div>

            {/* Text */}
            <div data-fade-right>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-8 h-8">
                  <Image src="/assets/logo.png" alt="" fill className="object-contain" />
                </div>
                <span className="font-barlow-condensed text-[#888] text-[11px] font-bold tracking-[0.3em] uppercase">ROSE OF SHARON</span>
              </div>

              <h2 className="font-barlow-condensed font-black uppercase text-[#0F0F0F] text-[clamp(36px,5vw,64px)] leading-[0.9] mb-6">
                OUR LEAD PASTOR
              </h2>
              <p className="font-barlow text-[#555] text-[16px] leading-relaxed mb-8">
                Our lead pastor is a visionary minister dedicated to building a church community rooted in the Word of God, passionate about worship, and committed to transforming lives through the power of the Holy Spirit. Under their leadership, Rose of Sharon has grown into a thriving hub of faith and discipleship.
              </p>
              <Link
                href="/about"
                className="font-barlow-condensed inline-flex items-center gap-2 px-8 py-3.5 border-2 border-[#0F0F0F] text-[#0F0F0F] text-[14px] font-bold tracking-[0.1em] rounded-full hover:bg-[#0F0F0F] hover:text-white transition-all duration-300"
              >
                READ MORE <ArrowRight />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            8. MINISTRIES (dark)
        ══════════════════════════════════════════ */}
        <section className="bg-[#0F0F0F] py-20 md:py-28 px-6 md:px-16 xl:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14" data-fade>
              <h2 className="font-barlow-condensed font-black uppercase text-white text-[clamp(44px,7vw,88px)] leading-[0.9]">
                A PLACE FOR<br />
                <span className="text-[#C1272D]">EVERYONE</span>
              </h2>
              <Link href="/trainings" className="font-barlow-condensed inline-flex items-center gap-2 border border-white/30 text-white/70 text-[13px] font-semibold tracking-widest px-6 py-3 rounded-full hover:border-white hover:text-white transition-all self-start md:self-auto">
                SEE ALL MINISTRIES
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-stagger>
              {[
                { title: "Youth Ministry", sub: "Teenage & Young Adults programme for growth", href: "/groups", icon: "🔥" },
                { title: "Women's Ministry", sub: "Hearts of David — empowering women in faith", href: "/groups", icon: "💜" },
                { title: "Men's Ministry", sub: "Oaks of Righteousness — building godly men", href: "/groups", icon: "⚡" },
                { title: "Worship Team", sub: "Leading the congregation in spirit and truth", href: "/about", icon: "🎵" },
              ].map((m) => (
                <Link
                  key={m.title}
                  href={m.href}
                  className="flex items-start gap-5 p-6 border border-white/10 rounded-lg group hover:border-[#C1272D]/50 hover:bg-white/5 transition-all duration-300"
                >
                  <span className="text-3xl flex-shrink-0">{m.icon}</span>
                  <div>
                    <h3 className="font-barlow-condensed text-white font-bold text-[20px] uppercase group-hover:text-[#C1272D] transition-colors">
                      {m.title}
                    </h3>
                    <p className="font-barlow text-white/50 text-[14px] mt-1">{m.sub}</p>
                  </div>
                  <ArrowRight className="ml-auto flex-shrink-0 text-white/20 group-hover:text-[#C1272D] group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            9. GIVE (light rose bg)
        ══════════════════════════════════════════ */}
        <section className="bg-[#F5EAE8] py-20 md:py-28 px-6 md:px-16 xl:px-24 relative overflow-hidden">
          {/* decorative line art */}
          <svg
            className="absolute right-0 top-0 h-full w-auto opacity-20 pointer-events-none"
            viewBox="0 0 400 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="300" cy="100" r="200" stroke="#C1272D" strokeWidth="1" />
            <circle cx="350" cy="350" r="150" stroke="#C1272D" strokeWidth="1" />
            <circle cx="200" cy="500" r="120" stroke="#C1272D" strokeWidth="0.5" />
          </svg>

          <div className="max-w-3xl relative z-10" data-fade>
            <h2 className="font-barlow-condensed font-black uppercase text-[#0F0F0F] text-[clamp(44px,7vw,88px)] leading-[0.9] mb-4">
              Give to<br />Rose of Sharon
            </h2>
            <p className="font-barlow text-[#555] text-[17px] leading-relaxed mb-10">
              Your generosity keeps blessing lives — thank you for giving. Every seed sown in faith produces an eternal harvest.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/give"
                className="font-barlow-condensed px-8 py-3.5 bg-[#0F0F0F] text-white text-[15px] font-bold tracking-[0.1em] rounded-full hover:bg-[#C1272D] transition-colors duration-300"
              >
                GIVE NOW
              </Link>
              <Link
                href="/requests/prayer"
                className="font-barlow-condensed px-8 py-3.5 border-2 border-[#0F0F0F] text-[#0F0F0F] text-[15px] font-bold tracking-[0.1em] rounded-full hover:bg-[#0F0F0F] hover:text-white transition-all duration-300"
              >
                PRAYER REQUEST
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />

      {/* Ken Burns keyframes */}
      <style>{`
        @keyframes kenBurns {
          from { transform: scale(1.05) translateX(0); }
          to   { transform: scale(1.0)  translateX(-1%); }
        }
      `}</style>
    </>
  );
}
