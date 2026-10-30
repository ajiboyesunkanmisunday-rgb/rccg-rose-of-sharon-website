"use client";

import Link, { A } from "@ros/shared/link";
import { motion } from "framer-motion";

const fadeUpVariants = {
  hidden: { opacity: 0, y: "10%" },
  visible: { opacity: 1, transition: { duration: 1 }, y: 0 },
};

// ─── Button ───────────────────────────────────────────────────────────────────

function Button({
  children,
  href,
  target = "_blank",
  rel = "noopener noreferrer",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
}) {
  const base =
    "flex justify-center items-center gap-2 bg-clip-padding px-4 sm:px-5 border rounded-full border-solid border-foreground h-10 sm:h-12 text-sm sm:text-base transition duration-300 ease-in-out bg-foreground hover:bg-foreground/80 hover:border-foreground/80 text-background";
  const classes = `${base} ${className}`.trim();
  if (href) return <A href={href} target={target} rel={rel} className={classes}>{children}</A>;
  return <button className={classes}>{children}</button>;
}

// ─── HeroCard ────────────────────────────────────────────────────────────────

function HeroCard({
  image,
  topText,
  secondText,
  bottomText,
  link,
  position = "center",
}: {
  image: string;
  topText: string;
  secondText: string;
  bottomText: string;
  link: string;
  position?: string;
}) {
  return (
    <Link href={link} className="relative h-[440px] w-full min-w-[320px] block overflow-hidden flex-shrink-0">
      <img loading="lazy" decoding="async" src={image} alt="" className="absolute left-0 top-0 h-full w-full object-cover" style={{ objectPosition: position }} />
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-t from-black/80 to-black/20" />
      <h2 className="absolute left-4 top-4 z-10 text-xs font-extrabold uppercase tracking-wide text-white">
        {topText}
      </h2>
      <h2 className="absolute left-4 top-8 z-10 text-[28px] font-bold tracking-wide text-white">
        {secondText}
      </h2>
      <span className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
        <h3 className="text-[10px] font-extrabold uppercase tracking-wide text-white underline-offset-8 hover:underline">
          {bottomText}
        </h3>
        <img loading="lazy" decoding="async" src="/media/whitearrow.e8b5b92f.svg" alt="" className="h-2 w-2.5" />
      </span>
    </Link>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const communityCards = [
  {
    image: "/home/believers-class.jpg",
    title: "Believers Classes",
    href: "/trainings/believers-class",
    description:
      "Our Believers Classes get you up to speed with accurate scripture-based teachings designed to create a strong bedrock for your spiritual growth",
  },
  {
    image: "/media/celebrations.f123ede1.jpg",
    title: "Celebrations",
    href: "/celebrations",
    description:
      "You are the answer to our prayers, so we celebrate you every day, especially on your special days. You mean that much to us.",
  },
  {
    image: "/media/thumbnail2.17e9ea4a.jpg",
    title: "Counselling",
    href: "/counselling",
    description:
      "Need counsel? There is always someone available to pray with you and provide sound biblical counsel with zero judgment.",
  },
];

const ministriesData = [
  {
    image: "/gallery/back-to-school/04.jpg",
    title: "Children Ministry",
    link: "/ministries/kids-and-teens",
    description: "Children Church",
  },
  {
    image: "/youth/hangout-3.jpg",
    title: "Youth Fellowship",
    link: "/youth",
    description: "Young Leaders and Professionals",
  },
];

const adBanners = [
  {
    image: "/gallery/light-up-ikeja/09.jpg",
    tag: "30th Anniversary",
    title: "Light Up Ikeja",
    text: "Join us as we light up Ikeja in our 30th anniversary celebration.",
    cta: "See the details",
    href: "/light-up-ikeja",
  },
  {
    image: "/openview.4a75c3d5.jpg",
    tag: "Project",
    title: "ROS Project 2",
    text: "Details of our next project will be shared here.",
    cta: "Learn more",
    href: "/buildingproject",
  },
];

const countriesData = [
  { country: "Pray", image: "/home/walk-pray.jpg", pos: "55% 30%" },
  { country: "Worship", image: "/home/walk-worship.jpg", pos: "58% 50%" },
  { country: "Grow", image: "/home/walk-grow.jpg", pos: "50% 50%" },
  { country: "Serve", image: "/home/walk-serve.jpg", pos: "60% 50%" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════ HERO */}
      <section className="overflow-hidden">
        <div className="relative h-screen bg-black">
          <img src="/media/celebrations.f123ede1.jpg" alt="" className="absolute left-0 top-0 h-full w-full object-cover" />
          <div className="absolute left-0 top-0 h-full w-full" style={{ background: "rgba(0,0,0,0.74)" }} />
          <div className="relative z-10 flex h-full items-center justify-center overflow-hidden">
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto flex w-full max-w-7xl flex-col items-start gap-4 px-4 text-left text-white md:px-8"
            >
              <h3 className="rounded-full bg-[#FFFFFF1F] p-2 text-[10px] font-bold uppercase tracking-wider text-[#FFFFFFCC]">
                🌍 <span className="ml-0.5">our vision</span>
              </h3>
              <h1 className="my-3 max-w-[900px] font-anton text-[3rem] font-medium uppercase md:text-7xl md:leading-[1.2]">
                Where God Has A
                <span className="block text-textRed">Permanent Seat</span>
              </h1>
              <div className="mt-8 md:flex md:items-center md:justify-start md:gap-4">
                <Button
                  href="https://www.youtube.com/@rccgrostv"
                  target="_blank"
                  className="mb-6 w-full bg-white !text-[0.75rem] font-extrabold uppercase tracking-[.25em] text-black duration-300 hover:border-textRed hover:bg-textRed hover:text-white md:mr-6 md:w-auto"
                >
                  Watch Live
                </Button>
                <Button
                  href="/ql"
                  target="_self"
                  className="mb-6 w-full border-white bg-transparent !text-[0.75rem] font-extrabold uppercase tracking-[.25em] text-white duration-300 hover:border-textRed hover:bg-textRed hover:text-white md:w-auto"
                >
                  Quick Links
                </Button>
              </div>
            </motion.div>
          </div>
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
          <div className="pb-12 pt-2 md:pt-8" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: 16 }}>
            {adBanners.map((ad) => (
              <Link key={ad.title} href={ad.href} className="group relative block overflow-hidden rounded-lg" style={{ height: 220 }}>
                <img loading="lazy" decoding="async" src={ad.image} alt="" className="absolute left-0 top-0 h-full w-full object-cover" style={{ transition: "transform .6s" }} />
                <div className="absolute left-0 top-0 h-full w-full" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.2) 100%)" }} />
                <div className="relative z-10 flex h-full flex-col justify-center gap-2 px-6 text-white">
                  <span className="w-fit rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: "#DF4E4E" }}>{ad.tag}</span>
                  <h3 className="font-anton text-3xl uppercase md:text-4xl" style={{ lineHeight: 1.1 }}>{ad.title}</h3>
                  <p className="text-sm text-[#FFFFFFCC]" style={{ maxWidth: 360 }}>{ad.text}</p>
                  <span className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.2em] underline-offset-8 group-hover:underline">{ad.cta} →</span>
                </div>
              </Link>
            ))}
          </div>
          <h6 className="w-fit rounded-full bg-[#F4F4F4] px-3 py-1 text-xs font-bold">
            🙌🏽 <span className="ml-1">WELCOME TO ROS</span>
          </h6>
          <h2 className="font-anton text-3xl font-medium leading-loose md:my-6 md:text-6xl">
            WELCOME HOME!
          </h2>
          <p className="max-w-[360px] text-xs text-[#000000CC] md:text-sm lg:text-base">
            Dive into our teachings, events and community. Your journey of faith begins here.
          </p>
          <div className="no-scrollbar my-12 flex w-full max-w-7xl justify-between gap-4 overflow-x-auto md:my-16">
            <HeroCard
              image="/home/welcome-about.jpg"
              position="38% 50%"
              topText="who we are"
              secondText="About us"
              bottomText="Learn more"
              link="/about"
            />
            <HeroCard
              image="/home/welcome-connect.jpg"
              position="62% 50%"
              topText="JOIN OUR COMMUNITY"
              secondText="Connect with us"
              bottomText="Join Us"
              link="/join"
            />
            <HeroCard
              image="/home/welcome-celebrate.jpg"
              position="45% 50%"
              topText="ENDLESS CELEBRATION"
              secondText="Celebrations"
              bottomText="learn more"
              link="/celebrations"
            />
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════ CAMPUSES */}
      <section className="overflow-hidden">
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex min-h-[500px] w-full items-center justify-center bg-black py-16">
            <div className="flex w-full max-w-3xl flex-col items-center gap-6 px-4">
              <h2 className="rounded-[20px] bg-[#1F1F1F] px-3 py-1.5 text-[10px] font-medium tracking-[0.2em] text-white">
                🌍 RCCG ROSE OF SHARON
              </h2>
              <h1 className="text-center font-anton text-2xl uppercase text-white md:text-[46px] md:leading-[55px]">
                Grow in faith. Walk in purpose.
              </h1>
              <h1 className="text-center font-anton text-2xl uppercase text-textRed md:text-[46px] md:leading-[55px]">
                Live for Christ.
              </h1>
              <p className="text-center text-base text-white md:text-lg">
                Deepen your relationship with God through prayer, worship, and the transforming power of His Word. Find a loving community where you can grow spiritually, discover your purpose, and serve God with joy.
              </p>
              <p className="text-center text-base text-white md:text-lg">
                Join us at 65, Fajuyi Way, Ikeja, Lagos, and take the next step in your walk with Christ.
              </p>
            </div>
          </div>

          <div className="w-full bg-black px-4 pb-6 md:pb-10">
            <div className="mx-auto max-w-7xl px-4 py-12 md:py-16 lg:px-0">
              <div className="flex w-full flex-wrap items-center justify-between gap-4">
                <h6 className="text-xl font-extrabold tracking-widest text-white md:text-[32px]">YOUR WALK WITH GOD</h6>
              </div>
              <div className="no-scrollbar my-6 flex w-full justify-between gap-4 overflow-x-auto">
                {countriesData.map((country, index) => (
                  <div
                    key={index}
                    className="group relative h-[360px] min-w-[240px] overflow-hidden flex-shrink-0"
                  >
                    <img loading="lazy" decoding="async" src={country.image} alt={country.country} className="h-full w-full object-cover" style={{ objectPosition: country.pos }} />
                    <div className="absolute inset-0 bg-black/30" />
                    <h5 className="absolute bottom-12 left-4 text-2xl font-bold text-white">{country.country}</h5>
                    <img loading="lazy" decoding="async"
                      src="/media/whitearrow.e8b5b92f.svg"
                      alt=""
                      className="absolute right-4 top-4 h-6 w-6 -rotate-45 transform opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </div>
                ))}
                <Link
                  href="https://www.youtube.com/@rccgrostv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-[360px] w-full cursor-pointer flex-shrink-0"
                >
                  <img loading="lazy" decoding="async"
                    src="/media/watchany.b677bb3f.png"
                    alt="Watch anywhere"
                    className="h-[360px] min-w-[240px] w-full object-cover"
                  />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Family background */}
        <div
          style={{ backgroundImage: "url(/home/csr-register.jpg)", backgroundPosition: "50% 15%" }}
          className="relative h-[780px] bg-cover bg-no-repeat"
        >
          <div className="flex h-[780px] items-end bg-gradient-to-b from-black/20 via-black/50 to-black/90">
            <div className="mx-auto mb-16 flex w-full max-w-6xl flex-col flex-wrap items-start gap-4 px-4">
              <h2 className="font-anton text-2xl font-medium text-white md:text-5xl md:leading-[3.5rem]">
                REGISTER <br /> FOR CSR
              </h2>
              <p className="w-full max-w-[560px] text-left text-white">
                The Rose of Sharon CSR program equips young people and members of the community with practical
                skills such as digital marketing and graphic design. Register today and take your first step
                towards a better future.
              </p>
              <Link
                href="/csr#register"
                className="flex items-center gap-2.5 rounded-[20px] border border-textRed bg-textRed px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white hover:border-white hover:bg-transparent"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ COMMUNITY */}
      <section className="overflow-hidden pb-12">
        <motion.div
          variants={fadeUpVariants}
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
            {communityCards.map((card, index) => (
              <Link href={card.href} key={index}>
                <div className="flex w-full flex-col gap-3 rounded-lg">
                  <img loading="lazy" decoding="async"
                    src={card.image}
                    alt="thumbnail"
                    className="h-[250px] w-full rounded-lg object-cover object-center"
                  />
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

        {/* Pastor */}
        <div className="bg-black py-6">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-y-4 md:grid-cols-2">
            <div className="flex items-center justify-center">
              <img loading="lazy" decoding="async"
                src="/pastors/emeka.jpg"
                alt="Pastor Emeka Obiagwu, Senior Pastor"
                className="h-auto w-[300px] lg:w-[540px]"
              />
            </div>
            <div className="flex items-center justify-center text-white">
              <div className="flex w-full max-w-[444px] flex-col items-center gap-5 px-4 py-10 text-center lg:py-2">
                <img loading="lazy" decoding="async" src="/media/Global_mini_white.797c0092.svg" alt="RCCG Rose of Sharon" className="h-8 w-auto" />
                <h2 className="text-2xl font-black uppercase tracking-[0.2em]">Our lead pastor</h2>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFFFFF99]">Pastor Emeka Obiagwu · Senior Pastor</p>
                <p className="font-medium leading-7 text-[#FFFFFFA3]">
                  Our lead pastor is a visionary minister dedicated to building a church community rooted in the Word
                  of God, passionate about worship, and committed to transforming lives through the power of the Holy
                  Spirit. Under their leadership, Rose of Sharon has grown into a thriving hub of faith, discipleship,
                  and community impact.
                </p>
                <div className="my-4">
                  <Link
                    href="/about#pastey"
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
                  THERE&apos;S A PLACE FOR{" "}
                  <span className="font-anton text-textRed">EVERYONE</span>
                </h2>
              </div>
            </div>
            {ministriesData.map((item, index) => (
              <Link href={item.link} key={index} className="flex h-[355px] w-full flex-col gap-2.5 flex-shrink-0">
                <div className="group relative flex h-[355px] w-[240px] cursor-pointer items-center justify-center overflow-hidden rounded-lg">
                  <img loading="lazy" decoding="async" src={item.image} alt={item.title} className="h-full w-full object-cover" />
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
