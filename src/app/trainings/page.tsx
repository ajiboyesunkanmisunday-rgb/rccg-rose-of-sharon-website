import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Training Programs",
  description: "Grow in faith and ministry. Explore Water Baptism, WIT, School of Disciples, School of Ministry, and RILA at RCCG Rose of Sharon.",
};

const vs = { fontVariationSettings: '"wdth" 100' };

const programs = [
  {
    title: "Water Baptism",
    slug: "water-baptism",
    description: "Take the step of public declaration of your faith in Jesus Christ through water baptism as commanded in scripture.",
    highlights: ["Open to all believers", "Biblical foundation class", "Certificate of baptism"],
    color: "#000080",
  },
  {
    title: "Workers in Training (WIT)",
    slug: "workers-in-training",
    description: "Equip yourself for effective ministry service within the local church and beyond through structured training.",
    highlights: ["Leadership development", "Ministry placement", "Mentorship program"],
    color: "#000080",
  },
  {
    title: "School of Disciples (SOD)",
    slug: "school-of-disciples",
    description: "A discipleship training program designed to ground believers in the Word of God and prepare them for life-long ministry.",
    highlights: ["In-depth Bible study", "Spiritual formation", "Practical ministry training"],
    color: "#000080",
  },
  {
    title: "School of Ministry (SOM)",
    slug: "school-of-ministry",
    description: "A comprehensive ministry training school for those called to full-time or part-time pastoral and ministerial work.",
    highlights: ["Theology & doctrine", "Preaching & teaching", "Pastoral care skills"],
    color: "#000080",
  },
  {
    title: "RILA",
    slug: "rila",
    description: "The Redeemed International Leadership Academy — advanced leadership formation for ministers and church leaders.",
    highlights: ["Advanced leadership training", "International certification", "Network of leaders"],
    color: "#000080",
  },
];

export default function TrainingsPage() {
  return (
    <main>
      <section className="relative min-h-[400px] md:h-[735px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/assets/hero-bg.png" alt="" fill className="object-cover pointer-events-none" priority />
          <div className="absolute inset-0 bg-[rgba(16,14,26,0.72)]" />
        </div>
        <Navbar activePage="trainings" />
        <div className="relative z-10 w-full max-w-[860px] px-6 mt-16 md:mt-[58px] flex flex-col gap-[48px] md:gap-[84px] items-center text-center">
          <div className="flex flex-col gap-[24px] md:gap-[32px] items-center w-full">
            <h1 className="text-[#FFFDFD] text-[36px] md:text-[56px] lg:text-[84px] font-medium leading-tight" style={vs}>
              Training Programs
            </h1>
            <p className="text-[#FFFDFD] text-[16px] md:text-[20px] md:text-[25px] font-normal leading-[1.5] md:leading-[32px] w-full" style={vs}>
              Grow in faith, ministry, and leadership. Explore our structured training programs designed to equip believers at every stage of their walk with God.
            </p>
          </div>
          <Link
            href="#programs"
            className="flex items-center gap-[5px] px-[24px] md:px-[32px] py-[14px] md:py-[16px] bg-[#000080] text-[#FFFDFD] text-[16px] md:text-[20px] lg:text-[25px] font-medium rounded-[35px] drop-shadow-[19px_19px_20px_rgba(0,0,0,0.1)] hover:bg-[#0000a0] transition-colors"
            style={vs}
          >
            Explore Programs
          </Link>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="bg-[#100E1A] px-4 sm:px-[40px] lg:px-[80px] xl:px-[120px] py-[60px] md:py-[84px] flex flex-col gap-[48px] items-center w-full">
        <h2 className="text-[#FFFDFD] text-[28px] md:text-[40px] lg:text-[48px] font-bold leading-normal text-center" style={vs}>
          Our Training Programs
        </h2>

        <div className="flex flex-col gap-[24px] w-full">
          {programs.map((prog, i) => (
            <div
              key={prog.slug}
              className={`flex flex-col md:flex-row items-start md:items-center gap-[24px] md:gap-[48px] p-[24px] md:p-[40px] rounded-[16px] ${i % 2 === 0 ? "bg-[rgba(255,255,255,0.05)]" : "bg-[#000080]/20"} border border-[rgba(255,255,255,0.08)]`}
            >
              <div className="flex flex-col gap-[16px] flex-1">
                <h3 className="text-[#FFFDFD] text-[22px] md:text-[28px] lg:text-[32px] font-bold leading-normal" style={vs}>{prog.title}</h3>
                <p className="text-[#A3A1AF] text-[18px] font-normal leading-[1.6]" style={vs}>{prog.description}</p>
                <ul className="flex flex-col gap-[8px]">
                  {prog.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-[8px]">
                      <span className="size-[6px] rounded-full bg-[#B5B5F3] flex-shrink-0" />
                      <span className="text-[#B5B5F3] text-[16px] font-normal" style={vs}>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={`/trainings/${prog.slug}`}
                className="flex-shrink-0 bg-[#000080] px-[24px] md:px-[32px] py-[12px] md:py-[16px] rounded-[35px] text-[#FFFDFD] text-[16px] md:text-[20px] font-medium hover:bg-[#0000a0] transition-colors whitespace-nowrap self-start md:self-auto"
                style={vs}
              >
                Register Now
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Progression path */}
      <section className="bg-[#D2D2E2] px-4 sm:px-[40px] lg:px-[80px] xl:px-[120px] py-[60px] md:py-[84px] flex flex-col gap-[48px] items-center w-full">
        <h2 className="text-[#100E1A] text-[28px] md:text-[40px] lg:text-[48px] font-bold leading-normal text-center" style={vs}>
          Your Growth Journey
        </h2>
        <div className="flex items-center justify-center gap-0 w-full overflow-x-auto pb-2">
          {["New Believer", "Water Baptism", "WIT", "SOD", "SOM", "RILA"].map((step, i, arr) => (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center gap-[8px]">
                <div className="size-[56px] rounded-full bg-[#000080] flex items-center justify-center text-white text-[16px] font-bold" style={vs}>
                  {i + 1}
                </div>
                <span className="text-[#100E1A] text-[13px] font-medium text-center max-w-[80px]" style={vs}>{step}</span>
              </div>
              {i < arr.length - 1 && <div className="h-[2px] w-[80px] bg-[#000080]/30 mx-[4px] mb-[24px]" />}
            </div>
          ))}
        </div>
        <p className="text-[#100E1A] text-[16px] md:text-[20px] font-normal leading-[1.6] text-center max-w-[800px]" style={vs}>
          From the moment you give your life to Christ, through water baptism, to advanced leadership — Rose of Sharon offers a structured path of spiritual growth and ministry development.
        </p>
        <Link
          href="/new-believer"
          className="bg-[#000080] px-[32px] py-[16px] rounded-[35px] text-[#FFFDFD] text-[20px] font-medium hover:bg-[#0000a0] transition-colors"
          style={vs}
        >
          I&apos;m a New Believer
        </Link>
      </section>

      <Footer />
    </main>
  );
}
