import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Meet the Church",
  description: "Learn about RCCG Rose of Sharon — our story, beliefs, service times, and how you can get involved.",
};

const BELIEFS = [
  "That the Father's biggest display of affection towards us is the redemptive work of Christ.",
  "That the Word of God is the ultimate standard for doctrine and godly living.",
  "The gifts of the Spirit are at work in the life of every believer — through prayer, healing, and spiritual gifts.",
  "That we are blessed because righteousness is credited to us through the grace of our Lord Jesus Christ.",
];

const APPROACH = [
  {
    title: "Know it",
    desc: "At RCCG Rose of Sharon, the Word of God is central — ensuring every member knows and understands the lordship of Jesus and experiences joy and progress in the faith.",
  },
  {
    title: "Live it",
    desc: "Your life should reflect the grace and resurrection of Jesus Christ every single day. It is not enough to simply know that Jesus is Lord — you must live out that truth in everything you do.",
  },
  {
    title: "Tell it",
    desc: "Celebrating the finished work of Jesus means sharing it with the world. We are called to boldly proclaim His love and grace to as many people as we can.",
  },
];

const SERVICES = [
  { day: "Sunday", name: "Sunday Service", time: "7:45 AM", desc: "Main worship service with praise, Word, and prayer" },
  { day: "Wednesday", name: "Digging Deep", time: "6:30 PM", desc: "Mid-week Bible study and prayer meeting" },
  { day: "Friday", name: "Vigil / Night Prayer", time: "10:00 PM", desc: "All-night prayer for special seasons" },
  { day: "Monthly", name: "Holy Communion", time: "First Sunday", desc: "Communion service — first Sunday of every month" },
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
    <main className="overflow-hidden">
      {/* ── Hero ── */}
      <div
        className="h-[500px] bg-cover bg-center bg-no-repeat lg:h-[700px]"
        style={{ backgroundImage: "url(/assets/hero-bg.png)" }}
      >
        <div className="relative flex h-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#000000]/5 via-black/35 to-[#000000]/5">
          <Navbar />
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

      {/* ── We Believe (background image + white content box) ── */}
      <section
        className="mx-auto mb-10 flex max-w-7xl justify-end bg-left bg-no-repeat px-5 py-8 md:mb-20 md:px-11 md:py-14"
        style={{ backgroundImage: "url(/assets/thanksgiving-bg.png)", backgroundSize: "55%" }}
      >
        <div className="w-full max-w-[594px] bg-white px-6 py-6 shadow-xl md:px-10 md:py-[60px]">
          <h4 className="mb-6 font-anton text-3xl uppercase md:text-5xl">
            We <span className="text-[#C0362A]">Believe</span>
          </h4>
          <div>
            {BELIEFS.map((b) => (
              <BeliefItem key={b} label={b} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Approach ── */}
      <div className="relative overflow-hidden">
        <div className="px-4 pb-12">
          <h2 className="text-center text-2xl font-medium md:text-[44px]">Our Approach</h2>
          <p className="mt-2 text-center text-sm text-[#00000080] md:text-lg">
            Celebrating endless life in Christ Jesus demands that you:
          </p>
          <div className="mx-auto mt-8 flex max-w-7xl flex-wrap justify-center gap-6">
            {APPROACH.map((a) => (
              <div key={a.title} className="w-full max-w-[346px] space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C0362A]/10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#C0362A]">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="text-2xl font-medium">{a.title}</h2>
                <p className="text-[#0000007A]">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Full-width banner image */}
        <div className="relative mx-auto mt-8 h-[240px] w-full max-w-screen-2xl overflow-hidden md:h-[400px]">
          <Image src="/assets/hero-bg.png" alt="Rose of Sharon" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>

      {/* ── Service Times ── */}
      <section className="bg-white px-1 py-12 md:py-16">
        <h5 className="mx-auto w-fit rounded-[20px] bg-[#0000000A] px-4 py-1.5 text-center text-[10px] font-bold tracking-[0.3em] text-[#00000099]">
          📅 JOIN US
        </h5>
        <h2 className="my-2 text-center text-2xl font-black tracking-wide md:mt-5 md:text-4xl">Service Times</h2>
        <p className="mb-2 text-center text-xl text-[#00000080]">Come as you are — everyone is welcome</p>
        <div className="mx-auto my-4 grid max-w-4xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:my-8">
          {SERVICES.map((s) => (
            <div
              key={s.name}
              className="flex items-start gap-4 rounded-lg bg-white px-6 py-6 shadow-[0px_4px_20px_rgba(0,0,0,0.06)]"
            >
              <div className="flex h-[76px] w-[76px] flex-shrink-0 flex-col items-center justify-center rounded-[14px] bg-[#C0362A]">
                <span className="text-[11px] font-medium uppercase tracking-wider text-white/70">{s.day}</span>
                <span className="px-1 text-center text-[15px] font-bold text-white">{s.time}</span>
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <p className="text-[17px] font-bold text-[#0E0E0E]">{s.name}</p>
                <p className="text-[14px] leading-[1.6] text-[#666666]">{s.desc}</p>
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
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="h-5 w-5">
                    <path
                      d="M4 10h12M12 6l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="line-clamp-3 text-[#00000099]">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
