import type { Metadata } from "next";
import Link from "next/link";
import { Hero, Section, SectionTitle, Btn } from "@/app/(site)/(more)/_kit/ui";
import { PROGRAMS, programPages } from "@/app/(site)/(more)/_kit/programs";

export const metadata: Metadata = {
  title: "Training Programs",
  description: "Grow in faith and ministry: Water Baptism, WIT, School of Disciples, School of Ministry, RILA and the CSR skills program at RCCG Rose of Sharon.",
};

export default function TrainingsPage() {
  return (
    <>
      <Hero
        pill="🌍 TRAINING PROGRAMS"
        title={<>Grow in <span className="text-textRed">faith</span> and ministry</>}
        subtitle="Grow in faith, ministry and leadership. Every program has its own pages: overview, registration, online exam and coordinator."
        bg="/assets/hero-bg.png"
      >
        <Btn href="#programs" variant="white" className="ros:mt-2">Explore programs</Btn>
      </Hero>

      <Section id="programs">
        <SectionTitle pill="🗂️ ALL PROGRAMS" title={<>Our <span className="text-textRed">programs</span></>} sub="Open a program to see everything that belongs to it." />
        <div className="ros:mt-10 ros:flex ros:flex-col ros:gap-6">
          {PROGRAMS.map((p) => (
            <div key={p.slug} className="ros:flex ros:flex-col ros:gap-6 ros:rounded-2xl ros:border ros:border-[#00000014] ros:bg-[#FAFAFA8F] ros:p-6 ros:md:flex-row ros:md:items-center ros:md:p-10">
              <div className="ros:flex ros:flex-1 ros:flex-col ros:gap-4">
                <span className="ros:w-fit ros:rounded-full ros:bg-black ros:px-3 ros:py-1 ros:text-[10px] ros:font-bold ros:uppercase ros:tracking-[0.2em] ros:text-white">{p.step}</span>
                <h3 className="ros-anton ros:text-2xl ros:uppercase ros:md:text-3xl">{p.name}</h3>
                <p className="ros:text-[#00000099]">{p.description}</p>
                <ul className="ros:flex ros:flex-wrap ros:gap-x-5 ros:gap-y-2">
                  {p.highlights.map((h) => (
                    <li key={h} className="ros:flex ros:items-center ros:gap-2 ros:text-sm ros:text-[#000000CC]">
                      <span className="ros:size-[6px] ros:rounded-full ros:bg-[#DF4E4E]" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="ros:flex ros:flex-wrap ros:gap-2">
                  {programPages(p).map((pg) => (
                    <Link key={pg.label} href={pg.href} className="ros:rounded-full ros:border ros:border-[#00000029] ros:bg-white ros:px-3 ros:py-1.5 ros:text-[10px] ros:font-bold ros:uppercase ros:tracking-[0.15em] ros:transition ros:hover:border-[#DF4E4E] ros:hover:text-[#DF4E4E]">
                      {pg.label}
                    </Link>
                  ))}
                </div>
              </div>
              <Btn href={p.base} variant="red" className="ros:flex-shrink-0">Open program</Btn>
            </div>
          ))}
        </div>
      </Section>

      <section className="ros:bg-black ros:px-4 ros:py-16 ros:md:py-20">
        <div className="ros:mx-auto ros:flex ros:max-w-5xl ros:flex-col ros:items-center ros:gap-10">
          <SectionTitle center dark pill="🧭 YOUR GROWTH JOURNEY" title={<>From new believer to <span className="text-textRed">leader</span></>} />
          <div className="no-scrollbar ros:flex ros:w-full ros:items-start ros:justify-between ros:gap-4 ros:overflow-x-auto ros:pb-2">
            {[{ label: "New Believer", href: "/new-believer" }, ...PROGRAMS.filter((x) => x.slug !== "csr").map((x) => ({ label: x.short, href: x.base }))].map((s, i) => (
              <Link key={s.label} href={s.href} className="ros:flex ros:min-w-[96px] ros:flex-col ros:items-center ros:gap-2 ros:text-center">
                <span className="ros:flex ros:size-14 ros:items-center ros:justify-center ros:rounded-full ros:border ros:border-[#FFFFFF44] ros:text-base ros:font-bold ros:text-white">{i + 1}</span>
                <span className="ros:text-xs ros:font-semibold ros:text-[#FFFFFFB2]">{s.label}</span>
              </Link>
            ))}
          </div>
          <p className="ros:max-w-3xl ros:text-center ros:text-[#FFFFFFB2] ros:md:text-lg">
            From the moment you give your life to Christ, through water baptism, to advanced leadership — Rose of Sharon offers a structured path of spiritual growth and ministry development.
          </p>
          <Btn href="/new-believer" variant="white">I&apos;m a new believer</Btn>
        </div>
      </section>
    </>
  );
}
