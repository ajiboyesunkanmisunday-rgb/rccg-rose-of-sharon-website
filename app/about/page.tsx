"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: "10%" },
  visible: { opacity: 1, transition: { duration: 1 }, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { transition: { duration: 1.5 }, opacity: 1 },
};

// Placeholder member stories — replace with real Rose of Sharon testimonies.
const testimonials = [
  {
    author: "Member",
    title: "Placeholder story one",
    text: `This is placeholder text for a member story at Rose of Sharon.

Replace it with a real testimony from the congregation. You can also collect testimonies through the Testimonies page.`,
  },
  {
    author: "Member",
    title: "Placeholder story two",
    text: `This is placeholder text for a member story at Rose of Sharon.

Replace it with a real testimony from the congregation.`,
  },
  {
    author: "Member",
    title: "Placeholder story three",
    text: `This is placeholder text for a member story at Rose of Sharon.

Replace it with a real testimony from the congregation.`,
  },
  {
    author: "Member",
    title: "Placeholder story four",
    text: `This is placeholder text for a member story at Rose of Sharon.

Replace it with a real testimony from the congregation.`,
  },
];


const BELIEFS = [
  { title: "The Word of God", desc: "We believe the Bible is the inspired, infallible Word of God — the final authority for faith and practice." },
  { title: "The Trinity", desc: "We believe in one God eternally existing in three persons: Father, Son, and Holy Spirit." },
  { title: "Salvation", desc: "We believe in salvation by grace through faith in Jesus Christ alone, available to all who repent and believe." },
  { title: "The Holy Spirit", desc: "We believe in the baptism of the Holy Spirit as a distinct experience that empowers believers for service." },
  { title: "Healing", desc: "We believe in divine healing as provided for in the redemptive work of Christ for spirit, soul, and body." },
  { title: "The Second Coming", desc: "We believe in the personal, visible, and imminent return of our Lord Jesus Christ." },
];

const SERVICES = [
  { day: "Sunday", name: "Sunday Service", time: "7:45 AM", desc: "Main worship service with praise, Word, and prayer", image: "/assets/gallery-1.png" },
  { day: "Wednesday", name: "Digging Deep", time: "6:30 PM", desc: "Mid-week Bible study and prayer meeting", image: "/assets/gallery-2.png" },
  { day: "Friday", name: "Vigil / Night Prayer", time: "10:00 PM", desc: "All-night prayer for special seasons", image: "/assets/gallery-3.png" },
  { day: "Monthly", name: "Thanksgiving Sunday", time: "First Sunday", desc: "Thanksgiving service — first Sunday of every month", image: "/assets/gallery-4.png" },
];

const GET_INVOLVED = [
  { label: "First Timer Registration", href: "/first-timer" },
  { label: "New Believer", href: "/new-believer" },
  { label: "Church Groups", href: "/groups" },
  { label: "Training Programs", href: "/trainings" },
  { label: "Prayer Request", href: "/requests/prayer" },
];

function PastorModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
      <div
        className="relative mx-auto flex w-full max-w-4xl flex-col rounded-md bg-black bg-contain bg-center bg-no-repeat px-3 py-2 before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-black before:opacity-60 md:p-10"
        onClick={(e) => e.stopPropagation()}
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
          <div className="relative flex flex-col gap-5 md:flex-row md:p-6">
            <p className="flex-1 font-medium leading-7 text-white md:text-left">
              Placeholder: the biography of the Lead Pastor of RCCG Rose of Sharon will appear here.
              <br /><br />
              Share the pastor&apos;s story, calling and vision for the church.
            </p>
            <p className="flex-1 font-medium leading-7 text-white md:text-left">
              Placeholder: ministry, family and any other details the church would like to share.
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
          style={{ backgroundImage: "url(/assets/hero-bg.png)", backgroundRepeat: "no-repeat" }}
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
                In Christ, For Christ,
                <span className="block text-textRed">With Joy!</span>
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
            RCCG Rose of Sharon is a vibrant assembly of the Redeemed Christian Church of God — a global church movement founded on the unchanging Word of God. We are a community where lives are transformed, destinies are shaped, and God&apos;s presence is constant.
            <br /><br />
            <strong>Our vision is to see all people celebrate endless life in Christ Jesus and fully embrace the power of His death, burial, and resurrection.</strong> At Rose of Sharon, the Word is not just taught — it is lived.
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
          style={{ backgroundImage: "url(/assets/hero-bg.png)" }}
        >
          <div className="w-full max-w-[594px] bg-white px-6 py-6 md:px-10 md:py-[60px]">
            <h4 className="mb-6 font-anton text-3xl uppercase md:text-5xl">
              We <span className="text-textRed">Believe</span>
            </h4>
            <div>
              <BulletItem label="That the Father's biggest display of affection towards us is the redemptive work of Christ." />
              <BulletItem label="That the Word of God is the ultimate standard for doctrine and godly living." />
              <BulletItem label="The gifts of the Spirit are at work in the life of every believer — through prayer, healing, and spiritual gifts." />
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
                  text: "At Rose of Sharon, the Word of God is emphasized to ensure every member knows and understands the lordship of Jesus and experiences progress and joy in the faith.",
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
          <img src="/assets/groups-bg.png" alt="Rose of Sharon" className="mx-auto w-full max-w-screen-2xl md:h-full" />

          {/* ─── Lead Pastor ─── */}
          <div className="mt-24" id="pastey">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto flex w-full max-w-7xl flex-col gap-4 bg-black px-6 py-16 sm:px-12 md:flex-row lg:gap-10 lg:px-24"
            >
              <div className="mb-4 flex-1 bg-cover bg-center bg-no-repeat py-52 md:mb-0 md:h-auto md:p-0" style={{ backgroundImage: "url(/assets/hero-bg.png)" }} />
              <div className="mx-auto w-full max-w-full md:max-w-[380px] lg:max-w-[450px]">
                <div className="mb-4 flex flex-col items-center md:items-start">
                  <img src="/assets/logo.png" alt="RCCG Rose of Sharon" className="mb-10 h-10 w-auto" />
                  <h2 className="text-2xl font-black uppercase tracking-[0.2em] text-white">Our lead pastor</h2>
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

        {/* ─── Member Stories ─── */}
        <section className="bg-white px-1 py-12 md:py-16">
          <h5 className="mx-auto w-fit rounded-[20px] bg-[#0000000A] px-4 py-1.5 text-center text-[10px] font-bold tracking-[0.3em] text-[#00000099]">
            📖 MEMBER STORIES
          </h5>
          <h6 className="my-2 text-center text-2xl font-black tracking-wide md:mt-5 md:text-4xl">
            MY ROSE OF SHARON EXPERIENCE
          </h6>
          <p className="mb-2 text-center text-xl text-[#00000080]">Real People, Endless Life</p>

          <div className="mx-auto my-4 max-w-7xl md:my-8">
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
                { image: "/assets/gallery-3.png", title: "Membership Classes", href: "/membership-class", description: "Our Membership Classes get you up to speed with accurate scripture-based teachings designed to create a strong bedrock for your spiritual growth." },
                { image: "/assets/thanksgiving-bg.png", title: "Celebrations", href: "/celebrations", description: "You are the answer to our prayers, so we celebrate you every day, especially on your special days. You mean that much to us." },
                { image: "/assets/requests-bg.png", title: "Counselling", href: "/requests/counseling", description: "Need counsel? There is always someone available to pray with you and provide sound biblical counsel with zero judgment." },
              ].map((card, i) => (
                <Link href={card.href} key={i}>
                  <div className="flex w-full flex-col gap-3 rounded-lg">
                    <img src={card.image} alt="thumbnail" className="h-[250px] w-full rounded-lg object-cover object-center" />
                    <div className="flex cursor-pointer items-center gap-1">
                      <h1 className="text-lg font-bold underline-offset-8 hover:underline">{card.title}</h1>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </div>
                    <p className="line-clamp-3 text-[#00000099]">{card.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ─── What We Believe ─── */}
        <section className="flex w-full flex-col items-center gap-12 bg-black px-4 py-16 sm:px-[60px] md:py-20 lg:px-[120px]">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="rounded-[20px] bg-[#1F1F1F] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white">Our Foundation</p>
            <h2 className="font-anton text-3xl uppercase text-white md:text-5xl">What We Believe</h2>
          </div>
          <div className="grid w-full max-w-[1148px] grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {BELIEFS.map((b, i) => (
              <div key={b.title} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#111111] p-6 transition-colors hover:border-white/25 md:p-7">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-textRed">
                  <span className="text-base font-bold text-white">{i + 1}</span>
                </div>
                <p className="text-lg font-bold text-white md:text-xl">{b.title}</p>
                <p className="text-sm leading-[1.7] text-[#A3A1AF] md:text-[15px]">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Service Times ─── */}
        <section className="bg-white px-1 py-12 md:py-16">
          <h5 className="mx-auto w-fit rounded-[20px] bg-[#0000000A] px-4 py-1.5 text-center text-[10px] font-bold tracking-[0.3em] text-[#00000099]">
            📅 JOIN US
          </h5>
          <h2 className="my-2 text-center font-anton text-2xl uppercase tracking-wide md:mt-5 md:text-4xl">Service Times</h2>
          <p className="mb-8 text-center text-[#00000080] md:text-lg">Come as you are — everyone is welcome</p>
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((sv) => (
              <div key={sv.name} className="relative h-[320px] overflow-hidden rounded-lg">
                <img src={sv.image} alt={sv.name} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <span className="mb-1 block text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">{sv.day}</span>
                  <h3 className="text-[18px] font-black leading-tight">{sv.name}</h3>
                  <p className="mt-1 text-[13px] font-bold text-textRed">{sv.time}</p>
                  <p className="mt-1 text-[12px] leading-[1.5] text-white/70">{sv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Get Involved ─── */}
        <section className="flex w-full flex-col items-center gap-8 bg-textRed px-4 py-16 text-center sm:px-[60px] md:py-20 lg:px-[120px]">
          <h2 className="font-anton text-3xl uppercase text-white md:text-5xl">Ready to Take a Step?</h2>
          <p className="max-w-[600px] text-base leading-[1.7] text-white/80 md:text-xl">
            Whether you&apos;re visiting for the first time, looking to grow in faith, or ready to serve — there&apos;s a place for you here.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {GET_INVOLVED.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-[30px] border-2 border-white px-[22px] py-[11px] text-sm font-medium text-white transition-colors hover:bg-white/20 md:text-[15px]"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
