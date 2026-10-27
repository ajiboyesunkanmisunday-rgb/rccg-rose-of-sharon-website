"use client";

import { useEffect, useState } from "react";
import { API_BASE } from "@ros/shared/api";
import { motion } from "framer-motion";
import Link from "@ros/shared/link";

const fadeUp = {
  hidden: { opacity: 0, y: "10%" },
  visible: { opacity: 1, transition: { duration: 1 }, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { transition: { duration: 1.5 }, opacity: 1 },
};

// Member stories come from the church's own featured testimonies (submitted through the Testimonies page).
interface Story { author: string; title: string; text: string }

function toStory(t: { subject?: string; content?: string; state?: string }): Story | null {
  let text = (t.content ?? "").trim();
  let author = "";
  const m = text.match(/^From:\s*(.+?)\s*(?:\r?\n)+([\s\S]*)$/);
  if (m) { author = m[1].trim(); text = m[2].trim(); }
  if (text.length < 40) return null; // skip empty or test entries
  const place = t.state ? t.state.charAt(0).toUpperCase() + t.state.slice(1) : "";
  return { author: author || (place ? `A member, ${place}` : "A member of the family"), title: (t.subject ?? "").trim() || "A testimony", text };
}

// Pastors shown on the About page. Add each photo to /public/pastors and set `image` (e.g. "/pastors/emeka.jpg");
// the name and text can be edited whenever the publication unit sends updates.
const pastors: { name: string; role: string; text: string; image?: string; focus?: string }[] = [
  { name: "Pastor Emeka Obiagwu", role: "Senior Pastor", text: "A short introduction will be added here.", image: "/pastors/emeka.jpg", focus: "32% 25%" },
  { name: "Pastor Tunde Fowler", role: "Pastor", text: "A short introduction will be added here.", image: "/pastors/tunde.jpg", focus: "62% 22%" },
  { name: "Pastor Chinyere Obiagwu", role: "Pastor", text: "A short introduction will be added here." },
  { name: "Pastor Rosemary Fowler", role: "Pastor", text: "A short introduction will be added here.", image: "/pastors/rosemary.jpg", focus: "50% 22%" },
];

function PastorModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Our lead pastor"
      className="flex items-center justify-center p-4"
      style={{ position: "fixed", top: 0, right: 0, bottom: 0, left: 0, zIndex: 2000, background: "rgba(0,0,0,0.82)", overflowY: "auto" }}
      onClick={onClose}
    >
      <div
        className="about-pastey relative mx-auto flex w-full max-w-4xl flex-col rounded-md bg-black bg-contain bg-center bg-no-repeat px-3 py-2 before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-black before:opacity-60 md:p-10"
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundImage: "url(/pastors/emeka.jpg)", backgroundSize: "cover", backgroundPosition: "32% 30%", maxHeight: "92vh", overflowY: "auto", position: "relative" }}
      >
        <div className="mb-2 flex justify-between">
          <div />
          <button
            onClick={onClose}
            className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-[4px] bg-[#282828] hover:opacity-70"
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <g clipPath="url(#clip-modal-x)">
                <path d="M27.0703 27.0713L12.9282 12.9292" stroke="white" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
                <path d="M12.9287 27.0713L27.0708 12.9292" stroke="white" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
              </g>
              <defs>
                <clipPath id="clip-modal-x">
                  <rect width="20" height="20" fill="white" transform="translate(5.85742 20) rotate(-45)" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
        <div>
          <h2 className="relative text-2xl font-black uppercase tracking-[0.2em] text-white md:ml-6">
            OUR LEAD PASTOR
          </h2>
          <p className="relative mt-2 text-xs font-bold uppercase tracking-[0.2em] text-[#FFFFFF99] md:ml-6">Pastor Emeka Obiagwu · Senior Pastor</p>
          <div className="relative flex flex-col gap-5 md:flex-row md:p-6">
            <p className="flex-1 font-medium leading-7 text-white md:text-left">
              Placeholder: the biography of the Lead Pastor of RCCG Rose of Sharon will appear here.
              <br /><br />
              Placeholder: the pastor&apos;s story, calling and vision for the church.
              <br /><br />
              Placeholder: ministry and leadership responsibilities.
            </p>
            <p className="flex-1 font-medium leading-7 text-white md:text-left">
              Placeholder: gifts and ministry highlights — for example <em>Placeholder one</em>, <em>Placeholder two</em> and <em>Placeholder three</em>.
              <br /><br />
              Placeholder: books and publications such as <em>Placeholder title</em> and <em>Another placeholder title</em>.
              <br /><br />
              Placeholder: family and any other details the church would like to share.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BulletItem({ label }: { label: string }) {
  return (
    <div className="mb-4 flex items-baseline space-x-2">
      <span>
        <svg width="6" height="12" viewBox="0 0 6 12" fill="none">
          <rect width="6" height="12" fill="#2C2C2C" />
          <rect y="7.74023" width="6" height="4.25977" fill="#D9D9D9" />
        </svg>
      </span>
      <p className="font-lato leading-6 text-[#666666]">{label}</p>
    </div>
  );
}

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const [testimonials, setTestimonials] = useState<Story[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/testimonies/featured?pageNo=0&pageSize=8`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        const list = Array.isArray(data) ? data : data.content ?? [];
        setTestimonials(list.map(toStory).filter((x: Story | null): x is Story => !!x));
      })
      .catch(() => {});
  }, []);

  const visibleCount = 2;
  const totalSlides = Math.ceil(testimonials.length / visibleCount);

  return (
    <>
      {modalOpen && <PastorModal onClose={() => setModalOpen(false)} />}

      <div className="overflow-hidden">
        {/* ─── Hero ─── */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/about-banner.jpg)", backgroundRepeat: "no-repeat" }}
          className="h-[500px] bg-cover bg-center bg-no-repeat lg:h-[700px]"
        >
          <div className="relative flex h-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#000000]/5 via-black/35 to-[#000000]/5">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex w-full max-w-[600px] flex-col items-center gap-4 text-center text-white"
            >
              <h3 className="rounded-full bg-[#00000078] p-2 text-[10px] font-bold uppercase tracking-wider text-[#FFFFFFCC]">
                🌍 <span className="ml-0.5">the family at ros</span>
              </h3>
              <h1 className="my-3 max-w-[900px] px-4 font-anton text-[3rem] font-medium uppercase md:px-0 md:text-7xl md:leading-[1.2]">
                Where God Has
                <span className="block text-textRed">A Permanent Seat</span>
              </h1>
            </motion.div>
          </div>
        </motion.div>

        {/* ─── WE SERVE GOD BY HIS GRACE ─── */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 py-12 md:grid-cols-2 md:py-16 lg:grid-cols-3"
        >
          <div>
            <h2 className="mt-6 font-anton text-3xl md:text-5xl md:leading-[55px]">
              WE SERVE GOD
              <span className="block font-anton text-textRed">BY HIS GRACE</span>
            </h2>
          </div>
          <p className="text-justify text-[#000000A3] md:text-left">
            RCCG Rose of Sharon is a vibrant assembly of the Redeemed Christian Church of God — a global church movement founded on the unchanging Word of God.{" "}
            <strong>Our vision is to see all people celebrate endless life in Christ Jesus and fully embrace the power of His death, burial, and resurrection.</strong>
            <br /><br />
            At Rose of Sharon, we are committed to knowing Christ deeply and making Him known. We nurture spiritual growth through in-depth teaching services, powerful prayer sessions, and outreach programs.
          </p>
          <p className="text-justify text-[#000000A3] md:text-left">
            We hold firmly to the Word of God as the ultimate standard for doctrine, and we believe that the greatest demonstration of God&apos;s love is found in the redemptive work of Christ. Through His grace, we are blessed and righteous in His sight.
            <br /><br />
            Rose of Sharon has grown into a vibrant family committed to reaching the lost and discipling the saved. We are the hands and feet of Christ in our community — one soul at a time.
          </p>
        </motion.div>

        {/* ─── WE BELIEVE ─── */}
        <section
          className="bg-fill mx-auto mb-10 flex max-w-7xl justify-end bg-left bg-no-repeat px-5 py-8 md:mb-20 md:px-11 md:py-14"
          style={{ backgroundImage: "url(/purplepastor.jpg)" }}
        >
          <div className="w-full max-w-[594px] bg-white px-6 py-6 md:px-10 md:py-[60px]">
            <h4 className="mb-6 font-anton text-3xl uppercase md:text-5xl">
              We <span className="text-textRed">Believe</span>
            </h4>
            <div>
              <BulletItem label="That the Father's biggest display of affection towards us is in the redemptive work of Christ." />
              <BulletItem label="That the Word of God is the ultimate standard for doctrine." />
              <BulletItem label="The gifts of the Spirit are at work in the life of the believer, so our services are an experience of the uninhibited flow of the Spirit through prayer, prophecies, and spiritual songs." />
              <BulletItem label="That we are blessed because righteousness is credited to us through the grace of our Lord Jesus Christ." />
            </div>
          </div>
        </section>

        {/* ─── Our Approach ─── */}
        <div className="relative overflow-hidden">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="px-4 pb-12"
          >
            <h2 className="text-center text-2xl font-medium md:text-[44px]">Our Approach</h2>
            <p className="mt-2 text-center text-sm text-[#00000080] md:text-lg">
              Celebrating endless life in Christ Jesus demands that you:
            </p>
            <div className="mx-auto mt-8 flex max-w-7xl flex-wrap justify-center gap-6">
              {[
                {
                  title: "Know it",
                  text: "At RCCG Rose of Sharon, the Word of God is emphasized to ensure every member knows and understands the lordship of Jesus and experiences progress and joy in the faith.",
                },
                {
                  title: "Live it",
                  text: "Your life should reflect the death and resurrection of Jesus Christ every single day. It's not enough to simply know that Jesus is Lord—you must live out that truth in everything you do.",
                },
                {
                  title: "Tell it",
                  text: "Celebrating the finished work of Jesus means sharing it with the world. We are called to boldly proclaim His love and grace to as many people as we can.",
                },
              ].map((item) => (
                <div key={item.title} className="w-full max-w-[346px] space-y-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200" />
                  <h2 className="text-2xl font-medium">{item.title}</h2>
                  <p className="text-[#0000007A]">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Open view photo */}
          <img loading="lazy" decoding="async" src="/about-open-view.jpg" alt="The Rose of Sharon congregation worshipping together" className="mx-auto w-full max-w-screen-2xl md:h-full" />

          {/* ─── Lead Pastor ─── */}
          <div className="mt-24" id="pastey">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto flex w-full max-w-7xl flex-col gap-4 bg-black px-6 py-16 sm:px-12 md:flex-row lg:gap-10 lg:px-24"
            >
              <div role="img" aria-label="Pastor Emeka Obiagwu, Senior Pastor" className="about-pastey mb-4 flex-1 bg-cover bg-center bg-no-repeat py-52 md:mb-0 md:h-auto md:p-0" style={{ backgroundImage: "url(/pastors/emeka.jpg)", backgroundPosition: "32% 30%" }} />
              <div className="mx-auto w-full max-w-full md:max-w-[380px] lg:max-w-[450px]">
                <div className="mb-4 flex flex-col items-center md:items-start">
                  <img loading="lazy" decoding="async" src="/media/Global_mini_white.797c0092.svg" alt="RCCG Rose of Sharon" className="mb-10 h-8 w-auto" />
                  <h2 className="text-2xl font-black uppercase tracking-[0.2em] text-white">Our lead pastor</h2>
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-[#FFFFFF99]">Pastor Emeka Obiagwu · Senior Pastor</p>
                </div>
                <p className="text-center font-medium leading-7 text-[#FFFFFFA3] md:text-left">
                  Placeholder: a short introduction to the Lead Pastor of RCCG Rose of Sharon will appear here.
                  <br /><br />
                  Share the pastor&apos;s calling, vision and heart for the church.
                </p>
                <button
                  onClick={() => setModalOpen(true)}
                  className="mx-auto mt-10 block rounded-[20px] border border-white bg-transparent px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black md:mx-0"
                >
                  Read More
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ─── Our Pastors ─── */}
        <section className="bg-white px-4 py-12 md:py-16">
          <div className="mx-auto max-w-7xl">
            <h5 className="mx-auto w-fit rounded-[20px] bg-[#0000000A] px-4 py-1.5 text-center text-[10px] font-bold tracking-[0.3em] text-[#00000099]">
              👥 OUR PASTORS
            </h5>
            <h2 className="my-4 text-center font-anton text-3xl uppercase leading-tight md:text-[44px]">
              Meet our <span className="text-textRed">pastors</span>
            </h2>
            <p className="mx-auto mb-10 text-center text-xl text-[#00000080]" style={{ maxWidth: 640 }}>The shepherds God has placed over the Rose of Sharon family</p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24 }}>
              {pastors.map((pa) => (
                <div key={pa.name} className="flex flex-col gap-3" style={{ flex: "0 0 auto", width: "min(100%, 280px)" }}>
                  <div className="overflow-hidden rounded-lg" style={{ height: 340, background: "#F4F4F4" }}>
                    {pa.image ? (
                      <img loading="lazy" decoding="async" src={pa.image} alt={pa.name} className="h-full w-full object-cover" style={{ objectPosition: pa.focus ?? "50% 25%" }} />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[#00000066]">
                        <span className="font-anton uppercase" style={{ fontSize: 88, lineHeight: 1 }}>{pa.name.replace("Pastor ", "").charAt(0)}</span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Photo coming soon</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold">{pa.name}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-textRed">{pa.role}</p>
                  <p className="text-[#00000099]">{pa.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Member Stories ─── */}
        <section className="bg-white px-1 py-12 md:py-16">
          <h5 className="mx-auto w-fit rounded-[20px] bg-[#0000000A] px-4 py-1.5 text-center text-[10px] font-bold tracking-[0.3em] text-[#00000099]">
            📖 MEMBER STORIES
          </h5>
          <h6 className="my-2 text-center text-2xl font-black tracking-wide md:mt-5 md:text-4xl">
            MY ROS EXPERIENCE
          </h6>
          <p className="mb-2 text-center text-xl text-[#00000080]">Real People, Endless Life</p>

          {testimonials.length === 0 && (
            <div className="mx-auto my-8 flex flex-col items-center gap-4 px-6 text-center" style={{ maxWidth: 560 }}>
              <p className="text-[#000000A3]">Every story here is a real one from our family. Has God done something in your life? We would love to hear it.</p>
              <Link href="/testimonies" className="rounded-full bg-textRed px-6 py-3 text-xs font-extrabold uppercase tracking-[.25em] text-white transition hover:bg-black">Share your story</Link>
            </div>
          )}
          <div className="mx-auto my-4 max-w-7xl md:my-8" style={testimonials.length === 0 ? { display: "none" } : undefined}>
            <div className="grid grid-cols-1 gap-6 px-6 md:grid-cols-2">
              {testimonials.slice(slide * visibleCount, slide * visibleCount + visibleCount).map((t, i) => (
                <figure key={i} className="flex flex-col items-center justify-center px-6 text-left">
                  <blockquote className="mx-auto mb-2 max-w-2xl text-gray-500">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">{t.title}</h3>
                    <p className="my-1 whitespace-pre-line text-[#000000A3]">{t.text}</p>
                    <p className="font-semibold">{t.author}</p>
                  </blockquote>
                </figure>
              ))}
            </div>
            {/* Dots */}
            <div className="mt-6 flex justify-center gap-2">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  className={`h-2 w-2 rounded-full transition-colors ${i === slide ? "bg-black" : "bg-[#0000002A]"}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ─── Community section ─── */}
        <div className="mb-16 overflow-hidden md:mb-32">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex h-[300px] w-full items-center justify-center">
              <div className="flex w-full max-w-2xl flex-col items-center gap-4">
                <h2 className="mx-auto w-fit rounded-[20px] bg-[#0000000A] px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-[#000000CC]">
                  <span className="mr-1">🌍</span>COMMUNITY
                </h2>
                <h1 className="text-center font-anton text-3xl leading-tight md:text-[44px]">
                  We do community differently <br /> at{" "}
                  <span className="text-textRed">Rose of Sharon</span>
                </h1>
                <p className="text-center text-xl text-[#00000080]">More than a church, a place to grow</p>
              </div>
            </div>
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 pb-8 md:grid-cols-2 md:pb-12 lg:grid-cols-3">
              {[
                { image: "/media/membership-class.e6e53cc0.jpg", title: "Believers Class", href: "/membership-class", description: "Our Believers Class gets you up to speed with accurate scripture-based teachings designed to create a strong bedrock for your spiritual growth" },
                { image: "/media/celebrations.f123ede1.jpg", title: "Celebrations", href: "/celebrations", description: "You are the answer to our prayers, so we celebrate you every day, especially on your special days. You mean that much to us." },
                { image: "/media/thumbnail2.17e9ea4a.jpg", title: "Counselling", href: "/counselling", description: "Need counsel? There is always someone available to pray with you and provide sound biblical counsel with zero judgment." },
              ].map((card, i) => (
                <Link href={card.href} key={i}>
                  <div className="flex w-full flex-col gap-3 rounded-lg">
                    <img loading="lazy" decoding="async" src={card.image} alt="thumbnail" className="h-[250px] w-full rounded-lg object-cover object-center" />
                    <div className="flex cursor-pointer items-center gap-1">
                      <h1 className="text-lg font-bold underline-offset-8 hover:underline">{card.title}</h1>
                      <img loading="lazy" decoding="async" src="/media/arrow-right.59ce7c7f.svg" alt="arrow" className="h-4 w-4" />
                    </div>
                    <p className="line-clamp-3 text-[#00000099]">{card.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
