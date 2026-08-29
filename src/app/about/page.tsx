import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Meet the Church",
  description: "Learn about RCCG Rose of Sharon — our story, beliefs, service times, and how you can get involved.",
};

const vs = { fontVariationSettings: '"wdth" 100' };

const beliefs = [
  { title: "The Word of God", desc: "We believe the Bible is the inspired, infallible Word of God — the final authority for faith and practice." },
  { title: "The Trinity", desc: "We believe in one God eternally existing in three persons: Father, Son, and Holy Spirit." },
  { title: "Salvation", desc: "We believe in salvation by grace through faith in Jesus Christ alone, available to all who repent and believe." },
  { title: "The Holy Spirit", desc: "We believe in the baptism of the Holy Spirit as a distinct experience that empowers believers for service." },
  { title: "Healing", desc: "We believe in divine healing as provided for in the redemptive work of Christ for spirit, soul, and body." },
  { title: "The Second Coming", desc: "We believe in the personal, visible, and imminent return of our Lord Jesus Christ." },
];

const services = [
  { day: "Sunday", name: "Sunday Service", time: "7:45 AM", desc: "Main worship service with praise, Word, and prayer" },
  { day: "Wednesday", name: "Digging Deep", time: "6:30 PM", desc: "Mid-week Bible study and prayer meeting" },
  { day: "Friday", name: "Vigil / Night Prayer", time: "10:00 PM", desc: "All-night prayer for special seasons" },
  { day: "Monthly", name: "Holy Communion", time: "First Sunday", desc: "Communion service — first Sunday of every month" },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[500px] md:h-[600px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/assets/hero-bg.png" alt="" fill className="object-cover pointer-events-none" priority />
          <div className="absolute inset-0 bg-[rgba(16,14,26,0.70)]" />
        </div>
        <Navbar />
        <div className="relative z-10 w-full max-w-[900px] px-6 mt-16 md:mt-12 flex flex-col gap-4 items-center text-center">
          <p className="text-[#B5B5F3] text-[14px] font-normal uppercase tracking-[0.15em]" style={vs}>Who We Are</p>
          <h1 className="text-[#FFFDFD] text-[38px] md:text-[60px] lg:text-[72px] font-medium leading-tight" style={vs}>Meet the Church</h1>
          <p className="text-[#FFFDFD] text-[16px] md:text-[20px] font-normal leading-[1.6] max-w-[700px]" style={vs}>
            A family of believers anchored in God&apos;s Word, alive in worship, and committed to making a difference.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section id="about" className="bg-[#100E1A] px-4 sm:px-[60px] lg:px-[120px] py-[64px] md:py-[84px] flex flex-col gap-[48px] items-center w-full">
        <div className="flex flex-col lg:flex-row gap-[48px] lg:gap-[64px] items-center w-full max-w-[1148px]">
          <div className="flex flex-col gap-[24px] flex-1 min-w-0">
            <p className="text-[#B5B5F3] text-[14px] font-normal uppercase tracking-[0.15em]" style={vs}>Our Story</p>
            <h2 className="text-[#FFFDFD] text-[32px] md:text-[42px] lg:text-[48px] font-bold leading-[1.2]" style={vs}>
              RCCG Rose of Sharon
            </h2>
            <p className="text-[#A3A1AF] text-[16px] md:text-[18px] font-normal leading-[1.8]" style={vs}>
              RCCG Rose of Sharon is a vibrant assembly of the Redeemed Christian Church of God,
              a global church movement founded on the unchanging Word of God. We are a community
              where lives are transformed, destinies are shaped, and God&apos;s presence is constant.
            </p>
            <p className="text-[#A3A1AF] text-[16px] md:text-[18px] font-normal leading-[1.8]" style={vs}>
              We believe in the power of God&apos;s Word to save, heal, restore and transform. Our church
              is a place of love, belonging, and growth — where every person is welcomed, valued, and
              equipped to fulfil their God-given purpose.
            </p>
            <div className="flex gap-[16px] flex-wrap">
              <Link
                href="/first-timer"
                className="px-[28px] py-[13px] bg-[#000080] text-[#FFFDFD] text-[15px] font-medium rounded-[30px] hover:bg-[#0000a0] transition-colors"
                style={vs}
              >
                I&apos;m a First Timer
              </Link>
              <Link
                href="/e-member"
                className="px-[28px] py-[13px] border-2 border-[#B5B5F3] text-[#B5B5F3] text-[15px] font-medium rounded-[30px] hover:bg-[#B5B5F3]/10 transition-colors"
                style={vs}
              >
                Become an E-Member
              </Link>
            </div>
          </div>
          <div className="relative w-full lg:w-[440px] h-[280px] md:h-[360px] lg:h-[420px] flex-shrink-0 rounded-[20px] overflow-hidden">
            <Image src="/assets/thanksgiving-bg.png" alt="Church" fill className="object-cover" />
            <div className="absolute inset-0 bg-[rgba(0,0,128,0.25)]" />
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section className="bg-[#D2D2E2] px-4 sm:px-[60px] lg:px-[120px] py-[64px] md:py-[84px] flex flex-col gap-[48px] items-center w-full">
        <div className="flex flex-col gap-[8px] items-center text-center">
          <p className="text-[#000080] text-[14px] font-normal uppercase tracking-[0.15em]" style={vs}>Join Us</p>
          <h2 className="text-[#100E1A] text-[32px] md:text-[48px] font-bold leading-normal" style={vs}>Service Times</h2>
          <p className="text-[#6B7280] text-[16px] md:text-[18px] font-normal" style={vs}>
            Come as you are — everyone is welcome at any of our services.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] md:gap-[20px] w-full max-w-[900px]">
          {services.map((s) => (
            <div
              key={s.name}
              className="bg-white rounded-[16px] p-[20px] md:p-[28px] flex items-start gap-[16px] md:gap-[20px] shadow-[0px_4px_20px_rgba(0,0,0,0.06)]"
            >
              <div className="flex-shrink-0 w-[76px] h-[76px] md:w-[90px] md:h-[90px] rounded-[14px] bg-[#000080] flex flex-col items-center justify-center">
                <span className="text-[#B5B5F3] text-[11px] font-medium uppercase tracking-wider" style={vs}>{s.day}</span>
                <span className="text-[#FFFDFD] text-[15px] md:text-[17px] font-bold text-center px-1" style={vs}>{s.time}</span>
              </div>
              <div className="flex flex-col gap-[4px] flex-1 min-w-0">
                <p className="text-[#100E1A] text-[17px] md:text-[20px] font-bold leading-normal" style={vs}>{s.name}</p>
                <p className="text-[#6B7280] text-[14px] font-normal leading-[1.6]" style={vs}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-[16px] flex-wrap justify-center">
          <Link
            href="/events"
            className="px-[28px] py-[13px] bg-[#000080] text-[#FFFDFD] text-[15px] font-medium rounded-[30px] hover:bg-[#0000a0] transition-colors"
            style={vs}
          >
            View All Events
          </Link>
          <Link
            href="/announcements"
            className="px-[28px] py-[13px] border-2 border-[#000080] text-[#000080] text-[15px] font-medium rounded-[30px] hover:bg-[#000080]/10 transition-colors"
            style={vs}
          >
            Announcements
          </Link>
        </div>
      </section>

      {/* What We Believe */}
      <section className="bg-[#100E1A] px-4 sm:px-[60px] lg:px-[120px] py-[64px] md:py-[84px] flex flex-col gap-[48px] items-center w-full">
        <div className="flex flex-col gap-[8px] items-center text-center">
          <p className="text-[#B5B5F3] text-[14px] font-normal uppercase tracking-[0.15em]" style={vs}>Our Foundation</p>
          <h2 className="text-[#FFFDFD] text-[32px] md:text-[48px] font-bold leading-normal" style={vs}>What We Believe</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] md:gap-[20px] w-full max-w-[1148px]">
          {beliefs.map((b, i) => (
            <div
              key={b.title}
              className="bg-[#1a1826] rounded-[16px] p-[24px] md:p-[28px] flex flex-col gap-[12px] border border-[#B5B5F3]/10 hover:border-[#B5B5F3]/25 transition-colors"
            >
              <div className="size-[40px] rounded-full bg-[#000080] flex items-center justify-center flex-shrink-0">
                <span className="text-[#B5B5F3] text-[16px] font-bold" style={vs}>{i + 1}</span>
              </div>
              <p className="text-[#FFFDFD] text-[18px] md:text-[20px] font-bold leading-normal" style={vs}>{b.title}</p>
              <p className="text-[#A3A1AF] text-[14px] md:text-[15px] font-normal leading-[1.7]" style={vs}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Get Involved */}
      <section className="bg-[#000080] px-4 sm:px-[60px] lg:px-[120px] py-[64px] md:py-[84px] flex flex-col gap-[32px] items-center w-full text-center">
        <h2 className="text-[#FFFDFD] text-[30px] md:text-[48px] font-bold leading-normal" style={vs}>Ready to Take a Step?</h2>
        <p className="text-[#B5B5F3] text-[16px] md:text-[20px] font-normal leading-[1.7] max-w-[600px]" style={vs}>
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
              className="px-[22px] py-[11px] border-2 border-[#B5B5F3] text-[#B5B5F3] text-[14px] md:text-[15px] font-medium rounded-[30px] hover:bg-[#B5B5F3]/20 transition-colors"
              style={vs}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
