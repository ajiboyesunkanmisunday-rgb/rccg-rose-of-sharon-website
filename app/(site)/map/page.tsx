"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = { hidden: { opacity: 0, y: "10%" }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } };
const fadeIn  = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1.5 } } };

const mapLocations = [
  {
    area: "Rose of Sharon",
    country: "Nigeria",
    image: "/media/map-location-1.jpg",
    href: "/map/join",
  },
  {
    area: "Location coming soon",
    country: "Nigeria",
    image: "/media/map-location-2.jpg",
    href: "/map/join",
  },
  {
    area: "Location coming soon",
    country: "Nigeria",
    image: "/media/map-location-3.jpg",
    href: "/map/join",
  },
  {
    area: "Location coming soon",
    country: "Nigeria",
    image: "/media/map-location-4.jpg",
    href: "/map/join",
  },
];

const whyJoin = [
  {
    title: "Stronger Fellowship",
    text: "Church is more than a place of worship—it's a family. MAP provides a warm and welcoming space where you can build meaningful relationships, share experiences, and grow in faith alongside fellow believers.",
  },
  {
    title: "Spiritual Growth",
    text: "A thriving faith requires connection with God and others. At MAP, you'll engage in prayer, worship, and Bible discussions that deepen your understanding of scripture and strengthen your spiritual journey.",
  },
  {
    title: "Networking & Support",
    text: "Life is better when shared. MAP connects you with like-minded individuals who can offer encouragement, mentorship, and support. Whether you need spiritual guidance, a prayer partner, or simply a friend, you'll find a community that cares.",
  },
];

const pillars = [
  { title: "Pray",           text: "Experience and enjoy quality prayer time with your community." },
  { title: "Study & Grow",   text: "Grow in faith and mastery of God's word with your community through in-depth study, discussions and sermon recaps." },
  { title: "Connect",        text: "Build meaningful relationships, find mentors, and share experiences." },
];

const faqs = [
  { q: "What happens at a MAP meeting?",         a: "MAP meetings involve prayer, worship, Bible discussions, and opportunities for fellowship and networking. It's a time to build faith and friendships." },
  { q: "Do I need to register to attend?",       a: "No, registration isn't required to attend. Simply find your nearest MAP Center and join in! However, if you'd like to become a member of a MAP group, registration is needed." },
  { q: "Who can attend MAP?",                     a: "MAP is open to everyone—church members, newcomers, and even visitors looking to connect with the community." },
  { q: "How do I find my designated MAP Center?", a: "Each church branch has specific MAP Centres. Check with your branch leaders or visit our website for a list of locations." },
  { q: "Is MAP a replacement for Sunday service?",a: "No, MAP complements our main church services. It's a way to foster deeper connections outside of Sunday worship." },
  { q: "Can I bring a friend or family member?",  a: "Absolutely! MAP is a great way to introduce others to the church and help them build their faith journey." },
  { q: "What if I miss a MAP Sunday?",            a: "No worries! MAP happens every 1st and 3rd Sunday, so you can always join the next one." },
  { q: "When does MAP Happen?",                   a: "MAP meetings are held every 1st and 3rd Sunday." },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const num = String(index + 1).padStart(2, "0");
  return (
    <div className="border-b border-gray-200">
      <button onClick={() => setOpen(!open)} className="flex w-full items-start justify-between py-5 text-left">
        <div className="flex items-start gap-4">
          <span className="min-w-[2rem] font-bold text-[#00000066]">{num}.</span>
          <span className="font-medium">{q}</span>
        </div>
        <span className="ml-4 text-xl text-[#DF4E4E]">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="flex gap-4 pb-5">
          <span className="min-w-[2rem] font-bold text-[#00000066]">{num}.</span>
          <p className="text-[#00000099]">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function MAPPage() {
  return (
    <>
      {/* ── HERO ── */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="map-hero-banner flex h-[550px] items-center justify-center bg-cover bg-center bg-no-repeat lg:h-[700px]"
        style={{ backgroundImage: "url('/media/map-hero-banner.02e73247.jpg')" }}
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-4 flex w-full max-w-2xl flex-col items-center gap-6 text-center"
        >
          <h1 className="my-3 max-w-[900px] text-center font-anton text-[3rem] font-normal uppercase leading-none text-white md:text-7xl md:leading-none">
            WELCOME T0 <br /><span className="text-textRed">MEET &amp; PRAY (MAP)</span>
          </h1>
          <p className="w-full max-w-lg text-base text-[#FFFFFFB2] md:text-lg lg:text-xl">
            It&apos;s more than a gathering—it&apos;s a family where you truly belong.
          </p>
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <Link
              href="/map/register"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white bg-white px-5 py-3 text-[0.75rem] font-extrabold uppercase tracking-[.25em] text-black transition duration-300 hover:border-textRed hover:bg-textRed hover:text-white md:w-auto"
            >
              JOIN A MAP
            </Link>
            <a
              href="#about"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white bg-transparent px-5 py-3 text-[0.75rem] font-extrabold uppercase tracking-[.25em] text-white transition duration-300 hover:border-textRed hover:bg-textRed hover:text-white md:w-auto"
            >
              ABOUT
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* ── ABOUT MAP ── */}
      <section id="about" className="scroll-to-plus-nav mx-auto max-w-7xl px-4 py-16">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="mb-2 font-anton text-2xl uppercase text-textRed md:text-3xl">MEET &amp; PRAY</h2>
          <p className="mb-12 max-w-3xl text-[#00000099]">
            MAP - Meet and Pray is an initiative designed to bring church members together in smaller, more intimate groups for prayer, fellowship, and meaningful connection. Whether you are new to the church or a long-time member, MAP is a place for you to belong.
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="flex flex-col gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200" />
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="text-[#00000099]">{p.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── WHY ATTEND ── */}
      <section className="bg-[#F8F8F8] px-4 py-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-7xl"
        >
          <h2 className="mb-10 font-anton text-3xl uppercase md:text-5xl">
            WHY YOU SHOULD<br />
            <span className="text-textRed">ATTEND MAP</span>
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {whyJoin.map((item, i) => (
              <div key={i} className="rounded-2xl border border-[#EABBBB] bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-lg font-semibold">{item.title}</h3>
                <p className="text-[#00000099]">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── FIND A MAP GROUP ── */}
      <section className="scroll-to-plus-nav mx-auto max-w-7xl px-4 py-16">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h6 className="mb-2 w-fit rounded-full bg-[#F4F4F4] px-3 py-1 text-xs font-bold">
            🌍 <span className="ml-1 uppercase">MAP</span>
          </h6>
          <h2 className="mb-2 font-anton text-3xl uppercase md:text-5xl">FIND A MAP GROUP NEAR YOU</h2>
          <p className="mb-8 text-[#00000099]">Connect with fellow members nearby for prayer and fellowship</p>

          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-lg font-bold tracking-[4.8px]">MAP LOCATIONS</h3>
            <div className="hidden md:block">
              <Link
                href="/map/join"
                className="flex items-center justify-center gap-2 rounded-full border border-black bg-transparent px-5 py-3 text-[0.75rem] font-extrabold uppercase tracking-[.25em] text-black transition duration-300 hover:border-textRed hover:bg-textRed hover:text-white"
              >
                View All Locations
              </Link>
            </div>
          </div>
          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {mapLocations.map((loc, i) => (
              <a key={i} href={loc.href} target="_blank" rel="noopener noreferrer" className="relative block">
                <div className="group relative cursor-pointer overflow-hidden shadow-lg">
                  <img loading="lazy" decoding="async"
                    src={loc.image}
                    alt={loc.area}
                    className="h-80 w-full object-cover"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute right-2 top-2 text-white">
                    <path d="M7 7h10v10" /><path d="M7 17 17 7" />
                  </svg>
                  <div className="absolute inset-0 bg-black opacity-0 transition-all duration-300 group-hover:opacity-40" />
                  <div className="absolute inset-0 z-10 flex flex-col justify-end p-4 text-white">
                    <div>
                      <h6 className="font-lato">{loc.area} &nbsp; Map</h6>
                      <span className="rounded-2xl bg-[#828282] px-1 py-1 font-lato text-[10px] text-white">{loc.country}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <Link
            href="/map/join"
            className="inline-flex items-center gap-2 rounded-full bg-textRed px-8 py-3 text-xs font-extrabold uppercase tracking-[.25em] text-white transition hover:bg-black md:hidden"
          >
            VIEW ALL LOCATIONS
          </Link>
        </motion.div>
      </section>

      {/* ── FAQs ── */}
      <div className="mx-auto max-w-3xl px-4 pb-20">
        <h2 className="mb-8 font-anton text-3xl font-medium uppercase md:text-5xl">FAQs</h2>
        {faqs.map((faq, i) => (
          <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
        ))}
      </div>
    </>
  );
}
