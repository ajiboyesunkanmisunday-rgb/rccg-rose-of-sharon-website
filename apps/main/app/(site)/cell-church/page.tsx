"use client";

import { useState } from "react";
import Link from "@ros/shared/link";

const cellFaqs = [
  {
    q: "What is a House Fellowship?",
    a: "A house fellowship is made up of small, home-based gatherings where members worship, study, and grow together in a close-knit community.",
  },
  {
    q: "Where are House Fellowships located?",
    a: "Our house fellowships are being established wherever disciples gather, across different countries and regions. If there isn't one in your area yet, you could help start one!",
  },
  {
    q: "How does a House Fellowship help me grow spiritually?",
    a: "We provide spiritual guidance, leadership training, and continuous support for all house fellowships.",
  },
  {
    q: "How do I join a House Fellowship?",
    a: "You can join a house fellowship by signing up and we'll connect you with a house fellowship group nearby.",
  },
  {
    q: "How is a House Fellowship different from a traditional church?",
    a: "Unlike traditional churches with large congregations meeting in a single building, house fellowships focus on personal connection, accountability, and spiritual growth within smaller groups.",
  },
  {
    q: "Can I start a house fellowship in my home?",
    a: "Yes! If you have a space where a small group can meet, you can host a house fellowship. We'll provide guidance, resources, and support to help you get started.",
  },
];

function CellFAQItem({ q, a, index }: { q: string; a: string; index: number }) {
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

export default function CellChurchPage() {
  const activities = [
    {
      image: "/media/activityOne_optimized.ab130a98.jpg",
      title: "Worship & Prayer",
      description: "Strengthening faith through shared devotion.",
    },
    {
      image: "/family.jpg",
      title: "Biblical Teaching",
      description: "Learning and growing in the Word.",
    },
    {
      image: "/media/activityThree_optimized.05324fd1.jpg",
      title: "Fellowship & Support",
      description: "Encouraging one another in the faith",
    },
    {
      image: "/hero.jpg",
      title: "Evangelism & Outreach",
      description: "Reaching souls for Christ",
    },
  ];

  const whyJoin = [
    {
      title: "Stronger Community",
      description: "Grow in the faith with a close-knit group of believers.",
    },
    {
      title: "Spiritual Growth",
      description: "Deepen your faith through prayer, Bible study, and shared experiences.",
    },
    {
      title: "Leadership Development",
      description: "Step into your calling by leading and serving in your local house fellowship.",
    },
    {
      title: "Kingdom Expansion",
      description: "Be part of a movement bringing church to more homes and hearts.",
    },
  ];

  const essence = [
    {
      title: "Strong Accountability",
      description: "We support and encourage each other to grow together.",
    },
    {
      title: "Strong Welfare and Support",
      description: "We care for each other's needs, all-round.",
    },
    {
      title: "Spiritual Growth",
      description: "We experience progress and joy in the faith.",
    },
    {
      title: "Reaching More People",
      description: "We reach many more people for God, in different cities.",
    },
  ];

  const findLocations = [
    { location: "Rose of Sharon", time: "Contact the church for meeting days and times", venue: "Contact the church for a house fellowship near you" },
  ];

  const locationBadges = ["Rose of Sharon", "And many more"];

  return (
    <>
      {/* ── HERO ── */}
      <div
        className="cell-church-hero-banner relative flex h-[600px] flex-col items-center justify-center bg-cover bg-center bg-no-repeat lg:h-[700px]"
      style={{ backgroundImage: "url('/media/hero.da0d6666.jpg')" }}
      >
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)" }} />
        <div className="relative z-10 mx-4 flex w-full max-w-2xl flex-col items-center gap-6">
          <h3 className="rounded-full bg-[#00000078] p-2 text-center text-[10px] font-bold uppercase tracking-[0.24rem] text-[#FFFFFFCC]">
            ⛪ <span className="ml-0.5">the house fellowship</span>
          </h3>
          <div className="w-full px-4 text-center font-anton text-[3rem] font-bold uppercase leading-[120%] tracking-wide text-white md:text-7xl md:leading-[108%]">
            <span className="block">Experience</span>
            <span className="block whitespace-nowrap md:whitespace-normal">Our House Fellowship</span>
          </div>
          <div className="mx-8">
            <p className="w-full max-w-lg text-center text-[1.7rem] font-normal leading-8 text-white md:text-3xl lg:text-2xl">
              It&apos;s more than a gathering—it&apos;s a family where you truly belong.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 md:flex-row md:justify-center">
              <Link
                href="/cell-church/register"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-white bg-white px-5 py-3 text-[0.75rem] font-extrabold uppercase tracking-[.25em] text-black transition duration-300 hover:border-textRed hover:bg-textRed hover:text-white md:w-auto"
              >
                REGISTER A HOUSE FELLOWSHIP
              </Link>
              <Link
                href="/cell-church/find"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-white bg-transparent px-5 py-3 text-[0.75rem] font-extrabold uppercase tracking-[.25em] text-white transition duration-300 hover:border-textRed hover:bg-textRed hover:text-white md:w-auto"
              >
                JOIN A HOUSE FELLOWSHIP
              </Link>
            </div>
          </div>
        </div>
        <div className="relative z-10 mt-7 flex w-full flex-nowrap items-center justify-center gap-3 overflow-x-auto font-extrabold leading-[20px] tracking-[24%] text-white">
          {locationBadges.map((badge, i) => (
            <div key={i} className={`flex w-fit whitespace-nowrap rounded-[4px] bg-[#00000078] p-2 text-[10px] font-bold uppercase tracking-wider text-[#FFFFFFCC] sm:px-2.5 sm:py-2 ${i > 2 ? "hidden md:flex" : "flex"}`}>
              <img loading="lazy" decoding="async" src="/cell-badge-flag.svg" alt="" width={32} height={24} className="mr-1" />
              <div className="ml-0.5">{badge}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="scroll-to-plus-nav mx-auto max-w-7xl px-4 py-12">
        <div className="h-fit bg-white">
          {/* Home, close to home */}
          <div className="flex flex-col items-start justify-between gap-5 py-[4%] md:flex-row">
            <span className="flex flex-1 flex-col gap-4 whitespace-nowrap font-anton text-[48px] font-normal uppercase leading-[40px] text-black md:leading-[120%]">
              <p className="text-black">home, close</p>
              <p className="text-[#DF4E4E]">to home</p>
            </span>
            <span className="max-w-[30.6rem] flex-1 text-[16px] font-normal leading-[160%] tracking-[1%] text-[#00000099]">
              Think about the Rose of Sharon House Fellowship as a small gathering of 7-10 disciples or siblings. These small, dedicated groups who meet in homes or condos around the world, are extensions of our main church, bringing our community closer to where you are.
            </span>
          </div>

          {/* What is a House Fellowship */}
          <div className="mt-10 flex flex-col items-start justify-between gap-5 py-[4%] md:mt-0 md:flex-row">
            <span className="flex flex-1 flex-col gap-4 whitespace-nowrap font-anton text-[48px] font-normal uppercase leading-[40px] text-black md:leading-[120%]">
              <p className="text-black">What is a</p>
              <p className="text-[#DF4E4E]">House Fellowship?</p>
            </span>
            <span className="max-w-[30.6rem] flex-1 text-[16px] font-normal leading-[160%] tracking-[1%] text-[#00000099]">
              A house fellowship is a gathering of a small group of believers who meet regularly to grow in faith together. These groups are small and welcoming, usually 7-15 people, so everyone can participate, grow in their knowledge of Christ and build meaningful relationships.
            </span>
          </div>

          {/* Activity cards */}
          <div className="md-mt-0 mt-10 grid grid-cols-1 gap-4 pb-[4%] md:grid-cols-2 lg:grid-cols-4">
            {activities.map((activity, i) => (
              <div key={i} className="relative h-[440px] overflow-hidden rounded-lg">
                <img loading="lazy" decoding="async" src={activity.image} alt={activity.title} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute left-4 right-4 top-4 z-10">
                  <h3 className="text-lg font-bold text-white">{activity.title}</h3>
                </div>
                <div className="absolute bottom-6 left-4 right-4 z-10">
                  <p className="mb-4 text-sm text-white">{activity.description}</p>
                </div>
                <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center gap-0.5 text-sm">
                  <Link href="/" className="capitalize text-white underline transition-colors hover:text-white">
                    Learn more
                  </Link>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="mt-1 text-white">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Why Join */}
          <div className="mt-16 flex flex-col items-start justify-between gap-8 py-[4%] md:mt-0 md:flex-row">
            <span className="flex flex-1 flex-col gap-4 whitespace-nowrap font-anton text-[48px] font-normal uppercase leading-[40px] text-black md:leading-[120%]">
              <p className="text-black">Why Join a Rose of Sharon </p>
              <p className="text-[#DF4E4E]">House Fellowship?</p>
            </span>
            <div className="flex-1">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {whyJoin.map((item, i) => (
                  <div key={i} className="relative h-[250px] rounded-[16px] border border-[#EABBBB] p-4 pb-16 shadow-md">
                    <div className="mt-6">
                      <h3 className="text-[24px] font-medium text-black">{item.title}</h3>
                      <p className="mt-4 max-w-[75%] text-sm text-gray-700">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Essence */}
          <div className="mt-10 flex flex-col items-start justify-between gap-8 py-[4%] md:mt-0 md:flex-row">
            <span className="flex flex-1 flex-col gap-4 whitespace-nowrap font-anton text-[32px] font-normal uppercase leading-[25px] text-black md:text-[48px] md:leading-[100%]">
              <p className="text-black">The Essence of a </p>
              <p className="text-[#DF4E4E]">Healthy House Fellowship</p>
            </span>
            <div className="max-w-[539px] flex-1">
              {essence.map((item, i) => (
                <div key={i} className="mb-4 flex items-start gap-6">
                  <div className="mt-1 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#DF4E4E] text-white">
                    {i + 1}
                  </div>
                  <div className="mb-6 w-full border-b border-b-[#DF4E4E]">
                    <h3 className="text-[24px] font-medium text-black">{item.title}</h3>
                    <p className="mb-2 text-[16px] font-normal text-[#0000007A]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── FIND A HOUSE FELLOWSHIP (black bg) ── */}
      <div className="h-fit bg-black px-[2%] py-10 md:py-16">
        <div className="scroll-to-plus-nav mx-auto max-w-7xl px-4">
          {/* Heading row */}
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row" style={{ alignItems: "flex-end", flexWrap: "wrap" }}>
            <div className="flex flex-col gap-5" style={{ maxWidth: 680 }}>
              <h2 className="font-anton text-[32px] font-normal uppercase text-white md:text-[48px]" style={{ lineHeight: 1.1 }}>
                Find a House Fellowship <span className="text-[#DF4E4E]">close to you</span>
              </h2>
              <p className="font-lato text-[16px] font-normal leading-[160%] tracking-[1%] text-[#FFFFFF99]">
                This is the smallest unit of our church body where, despite the absence of a main Rose of Sharon branch, members meet every Sunday to fellowship together.
              </p>
            </div>
            <Link
              href="/cell-church/find"
              className="flex w-fit items-center justify-center rounded-full bg-textRed px-5 py-3 font-lato text-[0.75rem] font-extrabold uppercase tracking-[.25em] text-white transition duration-300 hover:bg-white hover:text-black"
            >
              Join a House Fellowship
            </Link>
          </div>

          {/* Location cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16, marginTop: 40, maxWidth: 760 }}>
            {findLocations.map((loc, i) => (
              <div key={i} className="rounded-lg bg-white p-4" style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
                <div style={{ flex: "0 0 220px", minHeight: 160, maxWidth: "100%", borderRadius: 6, background: "#E5E7EB" }} />
                <div className="flex flex-col justify-center gap-3 font-lato" style={{ flex: "1 1 220px" }}>
                  <h3 className="text-lg font-bold uppercase text-black">Location: {loc.location}</h3>
                  <p className="text-sm text-gray-600"><span className="text-base font-bold uppercase text-black">Time: </span>{loc.time}</p>
                  <p className="text-sm text-gray-600"><span className="text-base font-bold uppercase text-black">Venue: </span>{loc.venue}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA at bottom */}
          <div className="flex flex-col gap-5" style={{ maxWidth: 780, marginTop: 72, paddingTop: 48, borderTop: "1px solid rgba(255,255,255,0.12)" }}>
            <p className="font-lato text-sm text-[#FFFFFF99] sm:text-[16px]">🌍 Find or Register a House Fellowship in Your Region</p>
            <h2 className="font-anton text-[32px] font-normal uppercase text-white sm:text-[48px]" style={{ lineHeight: 1.1 }}>
              Join a Rose of Sharon House Fellowship Near You!
            </h2>
            <p className="font-lato text-sm leading-[160%] tracking-[1%] text-[#FFFFFF99] sm:text-[16px]">
              We are building a global network of House Fellowships across continents. Register today and be part of a movement transforming lives.
            </p>
            <Link
              href="/cell-church/find"
              className="flex w-fit items-center justify-center gap-2 rounded-full border border-white bg-white px-5 py-3 font-lato text-[0.75rem] font-extrabold uppercase tracking-[.25em] text-black transition duration-300 hover:border-textRed hover:bg-textRed hover:text-white"
            >
              Join a House Fellowship
            </Link>
          </div>
        </div>
      </div>

      {/* ── FAQs ── */}
      <div className="mx-auto max-w-3xl px-4 pb-20 pt-16">
        <h2 className="mb-8 font-anton text-3xl font-medium uppercase md:text-5xl">FAQs</h2>
        {cellFaqs.map((faq, i) => (
          <CellFAQItem key={i} q={faq.q} a={faq.a} index={i} />
        ))}
      </div>
    </>
  );
}
