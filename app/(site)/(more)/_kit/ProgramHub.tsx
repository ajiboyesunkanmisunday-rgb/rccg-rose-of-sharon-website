import Link from "next/link";
import { Hero, Section, SectionTitle, Btn } from "./ui";
import ProgramTabs from "./ProgramTabs";
import { PROGRAMS, getProgram, programPages } from "./programs";

/** Overview ("hub") page of a training program: what it is, and every page that belongs to it. */
export default function ProgramHub({ slug }: { slug: string }) {
  const p = getProgram(slug);
  const pages = programPages(p).filter((x) => x.key !== "overview");
  const journey = PROGRAMS.filter((x) => x.slug !== "csr");
  const words = p.name.replace(/ \(.*\)/, "").split(" ");
  const heroTitle =
    words.length > 1 ? (
      <>
        {words.slice(0, -1).join(" ")} <span className="text-textRed">{words[words.length - 1]}</span>
      </>
    ) : (
      <span className="text-textRed">{words[0]}</span>
    );
  return (
    <>
      <Hero
        pill={`🌍 ${p.slug === "csr" ? "CSR PROGRAM" : "TRAINING PROGRAM"}`}
        title={heroTitle}
        subtitle={p.description}
        bg="/assets/hero-bg.png"
      >
        <div className="ros:mt-2 ros:flex ros:flex-wrap ros:justify-center ros:gap-3">
          <Btn href={pages.find((x) => x.key === "register")!.href} variant="white">{p.registerLabel}</Btn>
          <Btn href={`${p.base}/exam`} variant="outline-white">Online exam</Btn>
        </div>
      </Hero>

      <Section>
        <ProgramTabs slug={slug} />
        <div className="ros:grid ros:grid-cols-1 ros:gap-10 ros:md:grid-cols-2">
          <div className="ros:flex ros:flex-col ros:gap-4">
            <SectionTitle pill="📘 ABOUT THE PROGRAM" title={<>What is <span className="text-textRed">{p.short}</span>?</>} />
            <p className="ros:text-[#00000099]">{p.description}</p>
            <p className="ros:text-sm ros:text-[#00000099]"><span className="ros:font-bold ros:text-black">Who it&apos;s for: </span>{p.audience}</p>
          </div>
          <ul className="ros:flex ros:flex-col ros:gap-3 ros:self-center">
            {p.highlights.map((h) => (
              <li key={h} className="ros:flex ros:items-center ros:gap-3 ros:rounded-lg ros:border ros:border-[#00000014] ros:bg-[#FAFAFA8F] ros:px-5 ros:py-4">
                <span className="ros:size-[8px] ros:flex-shrink-0 ros:rounded-full ros:bg-[#DF4E4E]" />
                <span className="ros:font-medium">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="ros:pt-0">
        <SectionTitle pill="🗂️ PROGRAM PAGES" title={<>Everything for <span className="text-textRed">{p.short}</span> in one place</>} sub="Each part of the program has its own page." />
        <div className="ros:mt-8 ros:grid ros:grid-cols-1 ros:gap-6 ros:sm:grid-cols-2 ros:lg:grid-cols-3">
          {pages.map((pg) => (
            <Link key={pg.label} href={pg.href} className="ros:group ros:flex ros:flex-col ros:gap-3 ros:rounded-lg ros:border ros:border-[#00000014] ros:bg-[#FAFAFA8F] ros:p-6 ros:transition ros:hover:border-[#DF4E4E]">
              <span className="ros:flex ros:size-12 ros:items-center ros:justify-center ros:rounded-full ros:bg-black ros:text-[22px]">{pg.icon}</span>
              <h3 className="ros:text-lg ros:font-bold ros:group-hover:underline">{pg.label}</h3>
              <p className="ros:text-[#00000099]">{pg.text}</p>
              <span className="ros:mt-auto ros:text-[10px] ros:font-extrabold ros:uppercase ros:tracking-[0.2em] ros:text-[#DF4E4E]">Open →</span>
            </Link>
          ))}
        </div>
      </Section>

      {p.slug !== "csr" && (
        <section className="ros:bg-black ros:px-4 ros:py-16">
          <div className="ros:mx-auto ros:max-w-5xl">
            <SectionTitle center dark pill="🧭 YOUR GROWTH JOURNEY" title={<>Where <span className="text-textRed">{p.short}</span> fits</>} />
            <div className="no-scrollbar ros:mt-10 ros:flex ros:items-start ros:justify-between ros:gap-4 ros:overflow-x-auto ros:pb-2">
              {journey.map((j, i) => (
                <Link key={j.slug} href={j.base} className="ros:flex ros:min-w-[110px] ros:flex-col ros:items-center ros:gap-2 ros:text-center">
                  <span className={`ros:flex ros:size-14 ros:items-center ros:justify-center ros:rounded-full ros:text-base ros:font-bold ${j.slug === p.slug ? "ros:bg-[#DF4E4E] ros:text-white" : "ros:border ros:border-[#FFFFFF44] ros:text-white"}`}>
                    {i + 2}
                  </span>
                  <span className={`ros:text-xs ros:font-semibold ${j.slug === p.slug ? "ros:text-[#DF4E4E]" : "ros:text-[#FFFFFFB2]"}`}>{j.short}</span>
                </Link>
              ))}
            </div>
            <div className="ros:mt-10 ros:flex ros:justify-center">
              <Btn href="/trainings" variant="outline-white">All training programs</Btn>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
