"use client";

import { useEffect, useState } from "react";

const FLYERS = [
  { src: "/csr/rehoboth-initiative.jpg", tag: "Now running", title: "7-Week Entrepreneurial Mindset & Financial Freedom Programme", text: "The Rehoboth Initiative in partnership with the CSR Department. Every Tuesday from 20th October 2026, 1:00 PM, at Teens Church, Adekunle Fajuyi Way, GRA Ikeja.", alt: "Flyer: 7 Weeks Entrepreneurial Mindset and Financial Freedom Programme" },
  { src: "/csr/summer-school.jpg", tag: "CSR Summer School", title: "Summer School: five skills in ten days", text: "Makeup and Gele, Hairdressing, Fashion Design, Catering and AI-powered Digital Marketing. 9am – 1pm at 49b Ladipo Bateye Street.", alt: "Flyer: CSR Summer School" },
  { src: "/csr/graduation-invite.jpg", tag: "Graduation", title: "CSR Vocational Training Graduation Ceremony", text: "We celebrate our graduates at Teens Church, ROS Centre, 65 Adekunle Fajuyi Way, Ikeja, Lagos.", alt: "Invitation to the CSR Vocational Training Graduation Ceremony" },
];

/** CSR pictures, programme flyers (tap to enlarge) and the catering students' video. */
export default function CsrMedia() {
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % FLYERS.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + FLYERS.length) % FLYERS.length));
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open]);

  return (
    <>
      {/* ── The centre ── */}
      <section className="ros:bg-white ros:px-6 ros:py-[60px] ros:md:px-[60px] ros:md:py-[84px] ros:lg:px-[120px]">
        <div className="ros:mx-auto ros:flex ros:max-w-7xl ros:flex-col ros:gap-10">
          <div className="ros:flex ros:flex-col ros:items-center ros:gap-2 ros:text-center">
            <p className="ros:text-[14px] ros:uppercase ros:tracking-[0.2em] ros:text-[#DF4E4E]">Visit us</p>
            <h2 className="ros-anton ros:text-[26px] ros:uppercase ros:md:text-[40px]">The CSR centre</h2>
            <p className="ros:max-w-[640px] ros:text-[#00000099] ros:md:text-lg">49B Ladipo Bateye Street (street behind church), GRA, Ikeja, Lagos.</p>
          </div>
          <div className="ros:grid ros:grid-cols-1 ros:gap-5 ros:md:grid-cols-2">
            <figure className="ros:flex ros:flex-col ros:gap-3">
              <img src="/csr/centre.jpg" alt="The Rose of Sharon CSR centre building" loading="lazy" decoding="async" className="ros:aspect-[16/9] ros:w-full ros:rounded-xl ros:object-cover" />
              <figcaption className="ros:text-sm ros:text-[#00000099]">The centre where our classes hold.</figcaption>
            </figure>
            <figure className="ros:flex ros:flex-col ros:gap-3">
              <img src="/csr/centre-gate.jpg" alt="The CSR centre gate with the registration banner" loading="lazy" decoding="async" className="ros:aspect-[16/9] ros:w-full ros:rounded-xl ros:object-cover" />
              <figcaption className="ros:text-sm ros:text-[#00000099]">Registration is free. Tuition is ₦10,000 per course.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── Programmes & events (flyers) ── */}
      <section className="ros:bg-[#F4F4F4] ros:px-6 ros:py-[60px] ros:md:px-[60px] ros:md:py-[84px] ros:lg:px-[120px]">
        <div className="ros:mx-auto ros:flex ros:max-w-7xl ros:flex-col ros:gap-10">
          <div className="ros:flex ros:flex-col ros:items-center ros:gap-2 ros:text-center">
            <p className="ros:text-[14px] ros:uppercase ros:tracking-[0.2em] ros:text-[#DF4E4E]">What is happening</p>
            <h2 className="ros-anton ros:text-[26px] ros:uppercase ros:md:text-[40px]">Programmes &amp; events</h2>
          </div>
          <div className="ros:grid ros:grid-cols-1 ros:gap-6 ros:md:grid-cols-3">
            {FLYERS.map((f, i) => (
              <article key={f.src} className="ros:flex ros:flex-col ros:overflow-hidden ros:rounded-xl ros:bg-white ros:shadow-sm">
                <button onClick={() => setOpen(i)} aria-label={`Enlarge: ${f.alt}`} className="ros:block ros:w-full ros:bg-[#EDEDED]" style={{ aspectRatio: "4 / 5", overflow: "hidden" }}>
                  <img src={f.src} alt={f.alt} loading="lazy" decoding="async" className="ros:h-full ros:w-full ros:object-cover ros:object-top" />
                </button>
                <div className="ros:flex ros:flex-col ros:gap-2 ros:p-5">
                  <span className="ros:text-[10px] ros:font-bold ros:uppercase ros:tracking-[0.2em] ros:text-[#DF4E4E]">{f.tag}</span>
                  <h3 className="ros:text-[16px] ros:font-bold ros:leading-snug">{f.title}</h3>
                  <p className="ros:text-sm ros:leading-[1.6] ros:text-[#00000099]">{f.text}</p>
                  <button onClick={() => setOpen(i)} className="ros:mt-1 ros:w-fit ros:text-[11px] ros:font-extrabold ros:uppercase ros:tracking-[0.2em] ros:text-black ros:underline-offset-4 ros:hover:underline">View flyer →</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Students' story ── */}
      <section className="ros:bg-black ros:px-6 ros:py-[60px] ros:md:px-[60px] ros:md:py-[84px] ros:lg:px-[120px]">
        <div className="ros:mx-auto ros:grid ros:max-w-7xl ros:grid-cols-1 ros:items-center ros:gap-10 ros:lg:grid-cols-[1.2fr_1fr]">
          <div className="ros:flex ros:flex-col ros:gap-4">
            <p className="ros:text-[14px] ros:uppercase ros:tracking-[0.2em] ros:text-[#FFFFFFB3]">Our catering students</p>
            <h2 className="ros-anton ros:text-[26px] ros:uppercase ros:text-white ros:md:text-[40px]">See what they are <span className="text-textRed">cooking up</span></h2>
            <video controls preload="none" playsInline poster="/csr/csr-centre-video-poster.jpg" className="ros:aspect-video ros:w-full ros:rounded-xl ros:bg-[#111]" aria-label="CSR catering students showcase video">
              <source src="/csr/csr-centre-video.mp4" type="video/mp4" />
            </video>
          </div>
          <figure className="ros:flex ros:flex-col ros:gap-4">
            <img src="/csr/graduate.jpg" alt="A CSR graduate celebrating her certificate" loading="lazy" decoding="async" className="ros:mx-auto ros:max-h-[520px] ros:w-auto ros:max-w-full ros:rounded-xl ros:object-cover" />
            <figcaption className="ros:text-center ros:text-sm ros:text-[#FFFFFFB3]">From learning a skill to graduating with a certificate.</figcaption>
          </figure>
        </div>
      </section>

      {open !== null && (
        <div role="dialog" aria-modal="true" aria-label={FLYERS[open].title} onClick={() => setOpen(null)} style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,0.88)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <img src={FLYERS[open].src} alt={FLYERS[open].alt} onClick={(e) => e.stopPropagation()} style={{ maxHeight: "100%", maxWidth: "100%", borderRadius: 12, objectFit: "contain" }} />
          <button onClick={() => setOpen(null)} aria-label="Close" style={{ position: "absolute", top: 18, right: 22, color: "#fff", fontSize: 36, lineHeight: 1 }}>×</button>
          <button onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + FLYERS.length) % FLYERS.length); }} aria-label="Previous flyer" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: 999, background: "#fff", fontSize: 22 }}>‹</button>
          <button onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % FLYERS.length); }} aria-label="Next flyer" style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: 999, background: "#fff", fontSize: 22 }}>›</button>
        </div>
      )}
    </>
  );
}
