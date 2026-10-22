import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Meet the Church",
  description: "Learn about RCCG Rose of Sharon — our story, beliefs, service times, and how you can get involved.",
};

const BELIEFS = [
  { title: "The Word of God", desc: "We believe the Bible is the inspired, infallible Word of God — the final authority for faith and practice." },
  { title: "The Trinity", desc: "We believe in one God eternally existing in three persons: Father, Son, and Holy Spirit." },
  { title: "Salvation", desc: "We believe in salvation by grace through faith in Jesus Christ alone, available to all who repent and believe." },
  { title: "The Holy Spirit", desc: "We believe in the baptism of the Holy Spirit as a distinct experience that empowers believers for service." },
  { title: "Healing", desc: "We believe in divine healing as provided for in the redemptive work of Christ for spirit, soul, and body." },
  { title: "The Second Coming", desc: "We believe in the personal, visible, and imminent return of our Lord Jesus Christ." },
];

const WE_BELIEVE = [
  "That the Father's biggest display of affection towards us is the redemptive work of Christ.",
  "That the Word of God is the ultimate standard for doctrine and godly living.",
  "The gifts of the Spirit are at work in the life of every believer — through prayer, healing, and spiritual gifts.",
  "That we are blessed because righteousness is credited to us through the grace of our Lord Jesus Christ.",
];

const SERVICES = [
  { day: "Sunday", name: "Sunday Service", time: "7:45 AM", desc: "Main worship service with praise, Word, and prayer", image: "/assets/gallery-1.png" },
  { day: "Wednesday", name: "Digging Deep", time: "6:30 PM", desc: "Mid-week Bible study and prayer meeting", image: "/assets/gallery-2.png" },
  { day: "Friday", name: "Vigil / Night Prayer", time: "10:00 PM", desc: "All-night prayer for special seasons", image: "/assets/gallery-3.png" },
  { day: "Monthly", name: "Thanksgiving Sunday", time: "First Sunday", desc: "Thanksgiving service — first Sunday of every month", image: "/assets/gallery-4.png" },
];

const COMMUNITY = [
  {
    href: "/first-timer",
    image: "/assets/hero-bg.png",
    title: "First Timers",
    description: "Planning your first visit? We'd love to help you settle in, feel welcomed, and connect with the Rose of Sharon family.",
  },
  {
    href: "/groups",
    image: "/assets/groups-bg.png",
    title: "Church Groups",
    description: "Find your place in one of our vibrant ministry groups — from youth to prayer warriors to community service.",
  },
  {
    href: "/requests/counseling",
    image: "/assets/requests-bg.png",
    title: "Counselling",
    description: "Need counsel? There is always someone available to pray with you and provide sound biblical counsel with zero judgment.",
  },
];

function BeliefItem({ label }: { label: string }) {
  return (
    <div className="mb-4 flex items-baseline space-x-2">
      <span className="mt-1 flex-shrink-0">
        <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="6" height="12" fill="#2C2C2C" />
          <rect y="7.74023" width="6" height="4.25977" fill="#D9D9D9" />
        </svg>
      </span>
      <p className="font-lato leading-6 text-[#666666]">{label}</p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      {/* ── Hero ── */}
      <div
        className="h-[500px] bg-cover bg-center bg-no-repeat lg:h-[700px]"
        style={{ backgroundImage: "url(/assets/hero-bg.png)" }}
      >
        <div className="relative flex h-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#000000]/5 via-black/35 to-[#000000]/5">
          <div className="flex w-full max-w-[600px] flex-col items-center gap-4 text-center text-white">
            <h3 className="rounded-full bg-[#00000078] p-2 text-[10px] font-bold uppercase tracking-wider text-[#FFFFFFCC]">
              🌍 <span className="ml-0.5">the family at ros</span>
            </h3>
            <h1 className="my-3 max-w-[900px] px-4 font-anton text-[3rem] font-medium uppercase md:px-0 md:text-7xl md:leading-[1.2]">
              In Christ, For Christ,
              <span className="block text-[#C0362A]">With Joy!</span>
            </h1>
          </div>
        </div>
      </div>

      {/* ── About/Identity (3-col grid) ── */}
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 py-12 md:grid-cols-2 md:py-16 lg:grid-cols-3">
        <div>
          <h2 className="mt-6 font-anton text-3xl md:text-5xl md:leading-[55px]">
            WE SERVE GOD
            <span className="block font-anton text-[#C0362A]">BY HIS GRACE</span>
          </h2>
        </div>
        <p className="text-justify text-[#000000A3] md:text-left">
          RCCG Rose of Sharon is a vibrant assembly of the Redeemed Christian Church of God — a global church movement
          founded on the unchanging Word of God. We are a community where lives are transformed, destinies are shaped,
          and God&apos;s presence is constant.
          <br />
          <br />
          Our vision is to see all people celebrate endless life in Christ Jesus and fully embrace the power of His
          death, burial, and resurrection. At Rose of Sharon, the Word is not just taught — it is lived.
        </p>
        <p className="text-justify text-[#000000A3] md:text-left">
          We hold firmly to the Word of God as the ultimate standard for doctrine, and we believe that the greatest
          demonstration of God&apos;s love is found in the redemptive work of Christ. Through His grace, we are blessed
          and righteous in His sight.
          <br />
          <br />
          Rose of Sharon has grown into a vibrant family committed to reaching the lost and discipling the saved. We are
          the hands and feet of Christ in our community — one soul at a time.
        </p>
      </div>

      {/* ── Who We Are (text + image) ── */}
      <section id="about" className="bg-[#000000] px-4 sm:px-[60px] lg:px-[120px] py-[64px] md:py-[84px] flex flex-col gap-[48px] items-center w-full">
        <div className="flex flex-col lg:flex-row gap-[48px] lg:gap-[64px] items-center w-full max-w-[1148px]">
          <div className="flex flex-col gap-[24px] flex-1 min-w-0">
            <p className="text-[#FFFFFFB3] text-[14px] font-normal uppercase tracking-[0.15em]">Our Story</p>
            <h2 className="text-[#FFFDFD] font-anton text-3xl md:text-5xl md:leading-[55px]">
              RCCG Rose of Sharon
            </h2>
            <p className="text-[#A3A1AF] text-[16px] md:text-[18px] font-normal leading-[1.8]">
              RCCG Rose of Sharon is a vibrant assembly of the Redeemed Christian Church of God,
              a global church movement founded on the unchanging Word of God. We are a community
              where lives are transformed, destinies are shaped, and God&apos;s presence is constant.
            </p>
            <p className="text-[#A3A1AF] text-[16px] md:text-[18px] font-normal leading-[1.8]">
              We believe in the power of God&apos;s Word to save, heal, restore and transform. Our church
              is a place of love, belonging, and growth — where every person is welcomed, valued, and
              equipped to fulfil their God-given purpose.
            </p>
            <div className="flex gap-[16px] flex-wrap">
              <Link
                href="/first-timer"
                className="px-[28px] py-[13px] bg-[#C0362A] text-[#FFFDFD] text-[15px] font-medium rounded-[30px] hover:bg-[#a02820] transition-colors"
              >
                I&apos;m a First Timer
              </Link>
              <Link
                href="/e-member"
                className="px-[28px] py-[13px] border-2 border-[#FFFFFFB3] text-[#FFFFFFB3] text-[15px] font-medium rounded-[30px] hover:bg-[#FFFFFFB3]/10 transition-colors"
              >
                Become an E-Member
              </Link>
            </div>
          </div>
          <div className="relative w-full lg:w-[440px] h-[280px] md:h-[360px] lg:h-[420px] flex-shrink-0 rounded-[20px] overflow-hidden">
            <Image src="/assets/thanksgiving-bg.png" alt="Church" fill className="object-cover" />
            <div className="absolute inset-0 bg-[rgba(192,54,42,0.25)]" />
          </div>
        </div>
      </section>

      {/* ── We Believe (background image + white content box) ── */}
      <section
        className="mx-auto mb-10 flex max-w-7xl justify-end bg-left bg-no-repeat px-5 py-8 md:mb-20 md:px-11 md:py-14"
        style={{ backgroundImage: "url(/assets/hero-bg.png)", backgroundSize: "52%" }}
      >
        <div className="w-full max-w-[594px] bg-white px-6 py-6 shadow-xl md:px-10 md:py-[60px]">
          <h4 className="mb-6 font-anton text-3xl uppercase md:text-5xl">
            We <span className="text-[#C0362A]">Believe</span>
          </h4>
          <div>
            {WE_BELIEVE.map((b) => (
              <BeliefItem key={b} label={b} />
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Believe (6 belief cards) ── */}
      <section className="bg-[#000000] px-4 sm:px-[60px] lg:px-[120px] py-[64px] md:py-[84px] flex flex-col gap-[48px] items-center w-full">
        <div className="flex flex-col gap-[8px] items-center text-center">
          <p className="text-[#FFFFFFB3] text-[14px] font-normal uppercase tracking-[0.15em]">Our Foundation</p>
          <h2 className="text-[#FFFDFD] font-anton text-3xl md:text-5xl">What We Believe</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] md:gap-[20px] w-full max-w-[1148px]">
          {BELIEFS.map((b, i) => (
            <div
              key={b.title}
              className="bg-[#111111] rounded-[16px] p-[24px] md:p-[28px] flex flex-col gap-[12px] border border-[#FFFFFFB3]/10 hover:border-[#FFFFFFB3]/25 transition-colors"
            >
              <div className="size-[40px] rounded-full bg-[#C0362A] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[16px] font-bold">{i + 1}</span>
              </div>
              <p className="text-[#FFFDFD] text-[18px] md:text-[20px] font-bold leading-normal">{b.title}</p>
              <p className="text-[#A3A1AF] text-[14px] md:text-[15px] font-normal leading-[1.7]">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Service Times (image boxes, 4 in a row) ── */}
      <section className="bg-white px-1 py-12 md:py-16">
        <h5 className="mx-auto w-fit rounded-[20px] bg-[#0000000A] px-4 py-1.5 text-center text-[10px] font-bold tracking-[0.3em] text-[#00000099]">
          📅 JOIN US
        </h5>
        <h2 className="my-2 text-center font-anton text-2xl tracking-wide md:mt-5 md:text-4xl">Service Times</h2>
        <p className="mb-8 text-center text-[#00000080] md:text-lg">Come as you are — everyone is welcome</p>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <div key={s.name} className="relative h-[320px] overflow-hidden rounded-lg">
              <Image src={s.image} alt={s.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <span className="mb-1 block text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">{s.day}</span>
                <h3 className="text-[18px] font-black leading-tight">{s.name}</h3>
                <p className="mt-1 text-[13px] font-bold text-[#C0362A]">{s.time}</p>
                <p className="mt-1 text-[12px] leading-[1.5] text-white/70">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Community section ── */}
      <div className="mb-16 overflow-hidden md:mb-32">
        <div className="flex h-[300px] w-full items-center justify-center">
          <div className="flex w-full max-w-2xl flex-col items-center gap-4">
            <h2 className="mx-auto w-fit rounded-[20px] bg-[#0000000A] px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-[#000000CC]">
              <span className="mr-1">🌍</span>COMMUNITY
            </h2>
            <h1 className="text-center font-anton text-3xl leading-tight md:text-[44px]">
              We do community differently
              <br />
              at <span className="text-[#C0362A]">Rose of Sharon</span>
            </h1>
            <p className="text-center text-xl text-[#00000080]">More than a church, a place to grow</p>
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 pb-8 md:grid-cols-2 md:pb-12 lg:grid-cols-3">
          {COMMUNITY.map((item) => (
            <Link key={item.title} href={item.href}>
              <div className="flex w-full flex-col gap-3 rounded-lg">
                <div className="relative h-48 w-full overflow-hidden rounded-lg">
                  <Image src={item.image} alt={item.title} fill className="rounded-lg object-cover" />
                </div>
                <div className="flex cursor-pointer items-center gap-1">
                  <h1 className="text-lg font-bold underline-offset-8 hover:underline">{item.title}</h1>
                </div>
                <p className="line-clamp-3 text-[#00000099]">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Get Involved (CTA) ── */}
      <section className="bg-[#C0362A] px-4 sm:px-[60px] lg:px-[120px] py-[64px] md:py-[84px] flex flex-col gap-[32px] items-center w-full text-center">
        <h2 className="text-[#FFFDFD] font-anton text-3xl md:text-5xl">Ready to Take a Step?</h2>
        <p className="text-[#FFFDFD]/80 text-[16px] md:text-[20px] font-normal leading-[1.7] max-w-[600px]">
          Whether you&apos;re visiting for the first time, looking to grow in faith, or ready to serve —
          there&apos;s a place for you here.
        </p>
        <div className="flex flex-wrap gap-[12px] justify-center">
          {[
            { label: "First Timer Registration", href: "/first-timer" },
            { label: "New Believer", href: "/new-believer" },
            { label: "Church Groups", href: "/groups" },
            { label: "Training Programs", href: "/trainings" },
            { label: "Prayer Request", href: "/requests/prayer" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-[22px] py-[11px] border-2 border-white text-white text-[14px] md:text-[15px] font-medium rounded-[30px] hover:bg-white/20 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
