"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "@ros/shared/link";
import { SectionTitle, Btn } from "@ros/shared/kit/ui";

const p = (n: number, thumb = false) => `/gallery/back-to-school/${String(n).padStart(2, "0")}${thumb ? "-thumb" : ""}.jpg`;

// Photos of our children and teenagers for the banner carousel.
// `pos` keeps the children's faces in view: the banner is wide, so each picture is cropped to a band, and this picks the band.
const SLIDES = [
  { src: "/children/carousel-1.jpg", pos: "50% 33%", alt: "A smiling girl with her new school bag", label: "Smiles that light up the class" },
  { src: p(4), pos: "50% 45%", alt: "Children gathered in their Sunday class", label: "Sunday class" },
  { src: p(2), pos: "50% 55%", alt: "Children walking to school with their new bags", label: "Back to school" },
  { src: p(9), pos: "50% 63%", alt: "Children receiving their school bags", label: "Joy in giving" },
  { src: p(12), pos: "50% 20%", alt: "Two girls with their new school bags", label: "Ready for school" },
  { src: p(7), pos: "50% 12%", alt: "A child proudly showing her new backpack", label: "A new school year" },
];

// Age groups, as given by the children's ministry.
const GROUPS = [
  { icon: "🍼", name: "Toddlers", ages: "0 – 5 years", text: "A safe, gentle space for our youngest, with caregivers who sing, pray and play." },
  { icon: "📖", name: "Ages 6 – 8", ages: "6 – 8 years", text: "Fun, interactive teaching that helps children know and love Jesus for themselves." },
  { icon: "⭐", name: "Preteens", ages: "9 – 12 years", text: "Building character and confidence as they step towards their teens." },
  { icon: "🌳", name: "Faith Rangers (Teenagers)", ages: "13 – 18 years", text: "Mentoring, relevant teaching and fellowship for teenagers growing into leaders." },
  { icon: "🤝", name: "Intermediary Hub", ages: "19 – 25 years", text: "A place for young adults to connect, grow in faith and prepare for the next season of life." },
];

const SCHOOL_PHOTOS = [3, 6, 5, 11, 10, 8].map((n) => ({ n, alt: `Back to School distribution, photo ${n}` }));

/** Children Church page: carousel banner, age groups, and the Back To School programme. */
export default function ChildrenChurch() {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const next = useCallback(() => setI((x) => (x + 1) % SLIDES.length), []);
  const prev = useCallback(() => setI((x) => (x - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (open !== null) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, open]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((x) => (x === null ? x : (x + 1) % SCHOOL_PHOTOS.length));
      if (e.key === "ArrowLeft") setOpen((x) => (x === null ? x : (x - 1 + SCHOOL_PHOTOS.length) % SCHOOL_PHOTOS.length));
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prevOverflow; };
  }, [open]);

  return (
    <>
      {/* ── Carousel banner ── */}
      <div className="ros:relative ros:flex ros:h-[500px] ros:items-center ros:justify-center ros:overflow-hidden ros:bg-black ros:lg:h-[700px]" aria-roledescription="carousel" aria-label="Children and teenagers of Rose of Sharon">
        {SLIDES.map((s, idx) => (
          <img key={s.src} src={s.src} alt={s.alt} loading={idx === 0 ? "eager" : "lazy"} decoding="async" aria-hidden={idx !== i} className="ros:absolute ros:left-0 ros:top-0 ros:h-full ros:w-full ros:object-cover" style={{ opacity: idx === i ? 1 : 0, transition: "opacity 0.9s ease", objectPosition: s.pos }} />
        ))}
        <div className="ros:absolute ros:left-0 ros:top-0 ros:h-full ros:w-full" style={{ background: "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.6))" }} />
        <div className="ros:relative ros:z-10 ros:mx-auto ros:flex ros:w-full ros:max-w-7xl ros:flex-col ros:items-center ros:gap-6 ros:px-4 ros:text-center ros:md:items-start ros:md:px-8 ros:md:text-left">
          <h3 className="ros:rounded-full ros:bg-[#00000078] ros:p-2 ros:text-[10px] ros:font-bold ros:uppercase ros:tracking-wider ros:text-[#FFFFFFCC]">🧒 CHILDREN CHURCH</h3>
          <h1 className="ros-anton ros:my-3 ros:max-w-[900px] ros:text-center ros:md:text-left ros:text-[3rem] ros:font-medium ros:uppercase ros:text-white ros:md:text-7xl ros:md:leading-[1.2]">Children <span className="text-textRed">Church</span></h1>
          <p className="ros:w-full ros:max-w-2xl ros:text-center ros:md:text-left ros:text-base ros:text-[#FFFFFFB2] ros:md:text-lg ros:lg:text-xl">Helping every child and teenager celebrate endless life in Christ.</p>
          <div className="ros:mt-2 ros:flex ros:flex-wrap ros:justify-center ros:md:justify-start ros:gap-3">
            <Btn href="/membership" variant="white">Become a member</Btn>
            <Btn href="#age-groups" variant="outline-white">Age groups</Btn>
          </div>
        </div>
        <button onClick={prev} aria-label="Previous picture" className="ros:absolute ros:left-3 ros:top-1/2 ros:z-10 ros:flex ros:size-11 ros:-translate-y-1/2 ros:items-center ros:justify-center ros:rounded-full ros:bg-white/90 ros:text-xl">‹</button>
        <button onClick={next} aria-label="Next picture" className="ros:absolute ros:right-3 ros:top-1/2 ros:z-10 ros:flex ros:size-11 ros:-translate-y-1/2 ros:items-center ros:justify-center ros:rounded-full ros:bg-white/90 ros:text-xl">›</button>
        <div className="ros:absolute ros:bottom-5 ros:z-10 ros:flex ros:flex-col ros:items-center ros:gap-2">
          <span className="ros:text-[11px] ros:font-bold ros:uppercase ros:tracking-[0.2em] ros:text-white/80">{SLIDES[i].label}</span>
          <div className="ros:flex ros:gap-2">
            {SLIDES.map((s, idx) => (
              <button key={s.src} onClick={() => setI(idx)} aria-label={`Show picture ${idx + 1}`} className={`ros:size-[10px] ros:rounded-full ros:transition ${idx === i ? "ros:bg-white" : "ros:bg-white/40"}`} />
            ))}
          </div>
        </div>
      </div>

      {/* ── About ── */}
      <section className="ros:mx-auto ros:max-w-7xl ros:px-4 ros:py-12 ros:md:py-20">
        <div className="ros:grid ros:grid-cols-1 ros:items-center ros:gap-10 ros:md:grid-cols-2">
          <div className="ros:flex ros:flex-col ros:gap-4">
            <SectionTitle pill="🙌 ABOUT THE MINISTRY" title={<>Who <span className="text-textRed">we are</span></>} />
            <p className="ros:text-[#00000099]">Children Church is the children&apos;s and teens&apos; ministry of RCCG Rose of Sharon. Our vision is to see all children celebrating endless life in Christ and training them to disciple others for Christ.</p>
            <p className="ros:text-[#00000099]">We are committed to partnering with you and your child for their progress and joy in the faith.</p>
          </div>
          <img src={p(4)} alt="Children gathered in their Sunday class" loading="lazy" className="ros:h-[340px] ros:w-full ros:rounded-lg ros:object-cover ros:object-center" />
        </div>
      </section>

      {/* ── Age groups ── */}
      <section id="age-groups" className="ros:bg-[#F4F4F4] ros:px-4 ros:py-14 ros:md:py-20" style={{ scrollMarginTop: 90 }}>
        <div className="ros:mx-auto ros:max-w-7xl">
          <SectionTitle center pill="👧🏽 AGE GROUPS" title={<>A place for <span className="text-textRed">every age</span></>} sub="Children and teenagers learn alongside others their own age." />
          <div className="ros:mt-10" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
            {GROUPS.map((g) => (
              <div key={g.name} className="ros:flex ros:flex-col ros:gap-3 ros:rounded-lg ros:bg-white ros:p-6 ros:shadow-sm" style={{ flex: "0 1 calc((100% - 32px) / 3)", minWidth: "min(100%, 280px)" }}>
                <span className="ros:flex ros:size-12 ros:items-center ros:justify-center ros:rounded-full ros:bg-black ros:text-[22px]">{g.icon}</span>
                <span className="ros:w-fit ros:rounded-full ros:bg-[#DF4E4E] ros:px-3 ros:py-1 ros:text-[11px] ros:font-bold ros:text-white">{g.ages}</span>
                <h3 className="ros:text-lg ros:font-bold">{g.name}</h3>
                <p className="ros:text-[#00000099]">{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Back To School ── */}
      <section className="ros:mx-auto ros:max-w-7xl ros:px-4 ros:py-14 ros:md:py-20">
        <SectionTitle pill="🎒 BACK TO SCHOOL" title={<>Back to School <span className="text-textRed">programme</span></>} sub="September 6th, 2026: school bags and school supplies were given out so that our children could start the new school year ready and confident." />
        <div className="ros:mt-8 ros:grid ros:grid-cols-2 ros:gap-3 ros:md:grid-cols-3">
          {SCHOOL_PHOTOS.map((ph, idx) => (
            <button key={ph.n} onClick={() => setOpen(idx)} aria-label={`Enlarge: ${ph.alt}`} className="ros:group ros:block ros:overflow-hidden ros:rounded-lg ros:bg-[#F4F4F4]">
              <img src={p(ph.n, true)} alt={ph.alt} loading="lazy" decoding="async" className="ros:aspect-[4/3] ros:w-full ros:object-cover ros:transition ros:duration-500 ros:group-hover:scale-[1.04]" />
            </button>
          ))}
        </div>
        <div className="ros:mt-8 ros:flex ros:flex-wrap ros:gap-3">
          <Link href="/gallery/back-to-school" className="ros:rounded-full ros:border ros:border-black ros:px-5 ros:py-3 ros:text-[0.75rem] ros:font-extrabold ros:uppercase ros:tracking-[.25em] ros:transition ros:hover:bg-black ros:hover:text-white">See the full album</Link>
        </div>
      </section>

      {/* ── Join ── */}
      <section className="ros:bg-black ros:px-4 ros:py-16">
        <div className="ros:mx-auto ros:flex ros:max-w-3xl ros:flex-col ros:items-center ros:gap-5 ros:text-center">
          <SectionTitle center dark pill="🤝 GET INVOLVED" title={<>Bring your <span className="text-textRed">children</span></>} sub="Register as a first-timer or become a member, and our team will welcome your family." />
          <div className="ros:flex ros:flex-wrap ros:justify-center ros:gap-3 ros:max-sm:w-full ros:max-sm:max-w-[320px]">
            <Btn href="/membership" variant="white">Become a member</Btn>
            <Btn href="/first-timer" variant="outline-white">First-timer registration</Btn>
          </div>
        </div>
      </section>

      {open !== null && (
        <div role="dialog" aria-modal="true" aria-label="Back to School photos" onClick={() => setOpen(null)} style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <img src={p(SCHOOL_PHOTOS[open].n)} alt={SCHOOL_PHOTOS[open].alt} onClick={(e) => e.stopPropagation()} style={{ maxHeight: "100%", maxWidth: "100%", borderRadius: 12, objectFit: "contain" }} />
          <button onClick={() => setOpen(null)} aria-label="Close" style={{ position: "absolute", top: 18, right: 22, color: "#fff", fontSize: 36, lineHeight: 1 }}>×</button>
          <button onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + SCHOOL_PHOTOS.length) % SCHOOL_PHOTOS.length); }} aria-label="Previous photo" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: 999, background: "#fff", fontSize: 22 }}>‹</button>
          <button onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % SCHOOL_PHOTOS.length); }} aria-label="Next photo" style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: 999, background: "#fff", fontSize: 22 }}>›</button>
        </div>
      )}
    </>
  );
}
