"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUpVariants = {
  hidden: { opacity: 0, y: "10%" },
  visible: { opacity: 1, transition: { duration: 1 }, y: 0 },
};

// Placeholder photos — replace with actual ROS photos
const IMG = {
  w1: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
  w2: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&q=80",
  w3: "https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=800&q=80",
  v1: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=70",
  v2: "https://images.unsplash.com/photo-1527261834078-9b37d35a4a32?w=800&q=70",
  v3: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=70",
  v4: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=70",
  boast: "https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?w=1200&q=80",
  cm1: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
  cm2: "https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=800&q=80",
  cm3: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80",
  pastor: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80",
  min1: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&q=80",
  min2: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80",
};

function Arrow({ className = "h-2.5 w-2.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

// ─── Button ───────────────────────────────────────────────────────────────────

function Button({
  children,
  href,
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  const base =
    "flex justify-center items-center gap-2 bg-clip-padding px-4 sm:px-5 border rounded-full border-solid h-10 sm:h-12 text-sm sm:text-base transition duration-300 ease-in-out";
  return (
    <Link href={href} className={`${base} ${className}`.trim()}>
      {children}
    </Link>
  );
}

// ─── HeroCard ────────────────────────────────────────────────────────────────

function HeroCard({
  image,
  topText,
  secondText,
  bottomText,
  link,
}: {
  image: string;
  topText: string;
  secondText: string;
  bottomText: string;
  link: string;
}) {
  return (
    <Link href={link} className="relative block h-[440px] w-full min-w-[320px] flex-shrink-0 overflow-hidden">
      <img src={image} alt={secondText} className="absolute left-0 top-0 h-full w-full object-cover" />
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-t from-black/80 to-black/20" />
      <h2 className="absolute left-4 top-4 z-10 text-xs font-extrabold uppercase tracking-wide text-white">
        {topText}
      </h2>
      <h2 className="absolute left-4 top-8 z-10 text-[28px] font-bold tracking-wide text-white">{secondText}</h2>
      <span className="absolute bottom-4 left-4 z-10 flex items-center gap-2 text-white">
        <h3 className="text-[10px] font-extrabold uppercase tracking-wide underline-offset-8 hover:underline">
          {bottomText}
        </h3>
        <Arrow />
      </span>
    </Link>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const communityCards = [
  {
    image: IMG.cm1,
    title: "Membership Classes",
    href: "/membership-class",
    description:
      "Our Membership Classes get you up to speed with accurate scripture-based teachings designed to create a strong bedrock for your spiritual growth.",
  },
  {
    image: IMG.cm2,
    title: "Celebrations",
    href: "/celebrations",
    description:
      "You are the answer to our prayers, so we celebrate you every day, especially on your special days. You mean that much to us.",
  },
  {
    image: IMG.cm3,
    title: "Counselling",
    href: "/requests/counseling",
    description:
      "Need counsel? There is always someone available to pray with you and provide sound biblical counsel with zero judgment.",
  },
];

const visitCards = [
  { image: IMG.v1, name: "Sunday Service", sub: "7am & 10am", href: "/events" },
  { image: IMG.v2, name: "Youth Church", sub: "Sunday 10am", href: "/events" },
  { image: IMG.v3, name: "Women's Fellowship", sub: "Saturday", href: "/events" },
  { image: IMG.v4, name: "Night Vigil", sub: "Friday 10pm", href: "/events" },
  { image: IMG.v1, name: "Watch Online", sub: "On any device", href: "/media" },
];

const ministriesData = [
  { image: IMG.min1, title: "Youth Ministry", link: "/ministries", description: "Celeb Kids & Young Adults" },
  { image: IMG.min2, title: "Rose of Sharon Choir", link: "/ministries", description: "ROS Choir & Music Ministry" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════ HERO */}
      <section className="overflow-hidden">
        <div className="relative h-screen bg-black">
          <img
            src="/assets/hero-bg.png"
            alt=""
            aria-hidden
            className="absolute left-0 top-0 h-full w-full object-cover"
          />
          <div className="absolute left-0 top-0 h-full w-full bg-black/70" />
          <div className="relative z-10 flex h-full items-center justify-center overflow-hidden">
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex w-full max-w-[600px] flex-col items-center gap-4 text-center text-white"
            >
              <h3 className="rounded-full bg-[#FFFFFF1F] p-2 text-[10px] font-bold uppercase tracking-wider text-[#FFFFFFCC]">
                🌍 <span className="ml-0.5">rccg rose of sharon</span>
              </h3>
              <h1 className="my-3 max-w-[900px] px-4 font-anton text-[3rem] font-medium uppercase md:px-0 md:text-7xl md:leading-[1.2]">
                Where God has a permanent <span className="block text-textRed">seat</span>
              </h1>
              <div className="mt-8 md:flex md:items-center md:justify-center">
                <Button
                  href="/media"
                  className="mb-6 w-full border-white bg-white !text-[0.75rem] font-extrabold uppercase tracking-[.25em] text-black duration-300 hover:border-textRed hover:bg-textRed hover:text-white md:mr-6 md:w-auto"
                >
                  Watch Live
                </Button>
                <Button
                  href="/events"
                  className="mb-6 w-full border-white bg-transparent !text-[0.75rem] font-extrabold uppercase tracking-[.25em] text-white duration-300 hover:border-textRed hover:bg-textRed hover:text-white md:w-auto"
                >
                  Quick Links
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 30th anniversary */}
        <div className="flex flex-col items-center justify-between gap-4 border-b border-white/10 bg-[#0E0E0E] px-4 py-8 sm:flex-row md:px-10">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-textRed">
              <span className="font-anton text-[14px] leading-none text-white">30</span>
            </div>
            <div>
              <p className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.3em] text-textRed">Milestone</p>
              <h3 className="font-anton text-[clamp(18px,2.5vw,28px)] uppercase leading-tight text-white">
                30th Anniversary Celebration
              </h3>
            </div>
          </div>
          <Link
            href="/events"
            className="flex-shrink-0 rounded-full bg-textRed px-7 py-[10px] text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-ros-red-dark"
          >
            Learn More
          </Link>
        </div>

        {/* Welcome */}
        <motion.div
          id="learn-more"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="scroll-to-plus-nav mx-auto max-w-7xl px-4 py-12"
        >
          <div className="flex justify-center pb-12 pt-2 md:pt-8">
            <Button
              href="/give"
              className="border-textRed bg-textRed text-[0.75rem] font-bold uppercase tracking-[.25em] text-white duration-300 hover:bg-white hover:text-black md:text-base"
            >
              Building Project
            </Button>
          </div>
          <h6 className="w-fit rounded-full bg-[#F4F4F4] px-3 py-1 text-xs font-bold">
            🤝 <span className="ml-1">WELCOME TO ROS</span>
          </h6>
          <h2 className="font-anton text-3xl font-medium leading-loose md:my-6 md:text-6xl">WELCOME HOME!</h2>
          <p className="max-w-[360px] text-xs text-[#000000CC] md:text-sm lg:text-base">
            Dive into our teachings, events and community. Your journey of faith begins here.
          </p>
          <div className="no-scrollbar my-12 flex w-full max-w-7xl justify-between gap-4 overflow-x-auto md:my-16">
            <HeroCard image={IMG.w1} topText="who we are" secondText="About us" bottomText="Learn more" link="/about" />
            <HeroCard
              image={IMG.w2}
              topText="JOIN OUR COMMUNITY"
              secondText="Connect with us"
              bottomText="join us"
              link="/first-timer"
            />
            <HeroCard
              image={IMG.w3}
              topText="ENDLESS CELEBRATION"
              secondText="Celebrations"
              bottomText="learn more"
              link="/celebrations"
            />
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════ VISIT */}
      <section className="overflow-hidden">
        <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="flex h-[500px] w-full items-center justify-center bg-black">
            <div className="flex w-full max-w-3xl flex-col items-center gap-6 px-4">
              <h2 className="rounded-[20px] bg-[#1F1F1F] px-3 py-1.5 text-[10px] font-medium tracking-[0.2em] text-white">
                🌍 RCCG WORLDWIDE
              </h2>
              <h1 className="text-center font-anton text-2xl uppercase text-white md:text-[46px] md:leading-[55px]">
                We enlist, disciple and redeploy a people
              </h1>
              <h1 className="text-center font-anton text-2xl uppercase text-textRed md:text-[46px] md:leading-[55px]">
                in Christ, for Christ, with joy.
              </h1>
              <p className="text-center text-base text-white md:text-lg">Join us at a Rose of Sharon church near you</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/campuses"
                  className="rounded-[20px] border border-white bg-transparent px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black"
                >
                  see all campuses
                </Link>
                <Link
                  href="/about"
                  className="rounded-[20px] border border-white bg-transparent px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black"
                >
                  learn more about us
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full bg-black px-4 pb-6 md:pb-10">
            <div className="mx-auto max-w-7xl px-4 py-12 md:py-16 lg:px-0">
              <div className="flex w-full flex-wrap items-center justify-between gap-4">
                <h6 className="text-xl font-extrabold tracking-widest text-white md:text-[32px]">
                  VISIT ROSE OF SHARON
                </h6>
              </div>
              <div className="no-scrollbar my-6 flex w-full justify-between gap-4 overflow-x-auto">
                {visitCards.map((item) => (
                  <Link
                    href={item.href}
                    key={item.name}
                    className="group relative block h-[360px] min-w-[240px] flex-shrink-0 cursor-pointer overflow-hidden"
                  >
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/30" />
                    <h5 className="absolute bottom-12 left-4 text-2xl font-bold text-white">{item.name}</h5>
                    <h5 className="absolute bottom-4 left-4 text-base text-[#FFFFFF99]">{item.sub}</h5>
                    <Arrow className="absolute right-4 top-4 h-6 w-6 -rotate-45 transform text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Boast */}
        <div
          style={{ backgroundImage: `url(${IMG.boast})` }}
          className="relative h-[780px] bg-cover bg-top bg-no-repeat"
        >
          <div className="flex h-[780px] items-end bg-gradient-to-b from-black/20 via-black/50 to-black/90">
            <div className="mx-auto mb-16 flex w-full max-w-6xl flex-col flex-wrap items-start gap-4 px-4">
              <h2 className="font-anton text-2xl font-medium text-white md:text-5xl md:leading-[3.5rem]">
                WE BOAST IN <br /> CHRIST JESUS
              </h2>
              <p className="w-full max-w-[560px] text-left text-white">
                Our greatest success story at Rose of Sharon has been the grace to effectively evangelize, make
                disciples of, and deploy people who once upon a time were mere seekers, as mature disciples and
                vibrant ministers of the gospel.
              </p>
              <Link
                href="/about"
                className="flex items-center gap-2.5 rounded-[20px] border border-textRed bg-textRed px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white hover:border-white hover:bg-transparent"
              >
                Learn More <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ COMMUNITY */}
      <section className="overflow-hidden pb-12">
        <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="flex h-[300px] w-full items-center justify-center">
            <div className="flex w-full max-w-2xl flex-col items-center gap-4">
              <h2 className="mx-auto w-fit rounded-[20px] bg-[#0000000A] px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-[#000000CC]">
                <span className="mr-1">🌍</span>COMMUNITY
              </h2>
              <h1 className="text-center font-anton text-3xl leading-tight md:text-[44px]">
                We do community differently <br /> at <span className="text-textRed">Rose of Sharon</span>
              </h1>
              <p className="text-center text-xl text-[#00000080]">More than a church, a place to grow</p>
            </div>
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 pb-8 md:grid-cols-2 md:pb-12 lg:grid-cols-3">
            {communityCards.map((card) => (
              <Link href={card.href} key={card.title} className="group">
                <div className="flex w-full flex-col gap-3 rounded-lg">
                  <img src={card.image} alt={card.title} className="h-[250px] w-full rounded-lg object-cover object-center" />
                  <div className="flex cursor-pointer items-center gap-1">
                    <h1 className="text-lg font-bold underline-offset-8 group-hover:underline">{card.title}</h1>
                    <Arrow className="h-4 w-4" />
                  </div>
                  <p className="line-clamp-3 text-[#00000099]">{card.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Pastor */}
        <div className="bg-black py-6">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-y-4 md:grid-cols-2">
            <div className="flex items-center justify-center">
              <img src={IMG.pastor} alt="Lead Pastor" className="h-auto w-[300px] lg:w-[540px]" />
            </div>
            <div className="flex items-center justify-center text-white">
              <div className="flex w-full max-w-[444px] flex-col items-center gap-5 px-4 py-10 text-center lg:py-2">
                <img src="/assets/logo.png" alt="RCCG Rose of Sharon" className="h-10 w-auto" />
                <h2 className="text-2xl font-black uppercase tracking-[0.2em]">Our lead pastor</h2>
                <p className="font-medium leading-7 text-[#FFFFFFA3]">
                  Our lead pastor is a visionary minister dedicated to building a church community rooted in the Word
                  of God, passionate about worship, and committed to transforming lives through the power of the Holy
                  Spirit. Under their leadership, Rose of Sharon has grown into a thriving hub of faith, discipleship,
                  and community impact.
                </p>
                <div className="my-4">
                  <Link
                    href="/about"
                    className="rounded-[20px] border px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide hover:bg-white hover:text-black"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ministries */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-7xl px-4 py-12 md:py-16 lg:px-0"
        >
          <div className="no-scrollbar my-6 flex w-full justify-between gap-4 overflow-x-auto px-4">
            <div className="flex min-w-[240px] items-center justify-center">
              <div className="flex w-full max-w-[55%] flex-col items-center gap-3">
                <h6 className="text-center text-xs font-black tracking-[0.2em] text-[#000000CC]">MINISTRIES</h6>
                <h2 className="text-center font-anton text-3xl leading-none md:text-[64px]">
                  THERE&apos;S A PLACE FOR <span className="font-anton text-textRed">EVERYONE</span>
                </h2>
                <Link
                  href="/ministries"
                  className="whitespace-nowrap rounded-[20px] border border-black bg-transparent px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-black hover:bg-black hover:text-white"
                >
                  see all ministries
                </Link>
              </div>
            </div>
            {ministriesData.map((item) => (
              <Link href={item.link} key={item.title} className="flex h-[355px] w-full flex-shrink-0 flex-col gap-2.5">
                <div className="group relative flex h-[355px] w-[240px] cursor-pointer items-center justify-center overflow-hidden rounded-lg">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="rounded-[20px] border border-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                      Visit
                    </span>
                  </div>
                </div>
                <div className="flex cursor-pointer items-center gap-1">
                  <h1 className="text-base font-bold">{item.title}</h1>
                </div>
                <p className="text-[#000000B2]">{item.description}</p>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
}
