import Link from "@ros/shared/link";
import { Hero, Section, SectionTitle, Btn } from "@ros/shared/kit/ui";
import ProgramTabs from "./ProgramTabs";
import { PROGRAMS, getProgram, programMenu } from "@ros/shared/kit/programs";

/**
 * General page of a training program: who heads it, what it is, what you need first, when the next class is,
 * and the buttons to register, take the exam and view results.
 */
export default function ProgramHub({ slug }: { slug: string }) {
  const p = getProgram(slug);
  const register = programMenu(p)[1];
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
  const initial = p.head.name === "To be announced" ? "?" : p.head.name.replace(/^(Pastor|Pst\.?|Bro\.?|Sis\.?|Elder|Dr\.?|Mrs?\.?)\s+/i, "").charAt(0);
  return (
    <>
      <Hero pill="🌍 TRAINING PROGRAM" title={heroTitle} subtitle={p.description} bg="/assets/hero-bg.png">
        <div className="ros:mt-2 ros:flex ros:flex-wrap ros:justify-center ros:gap-3 ros:max-sm:w-full ros:max-sm:max-w-[320px]">
          <Btn href={register.href} variant="white">{p.registerLabel}</Btn>
          <Btn href={`${p.base}/exam`} variant="outline-white">Take exam</Btn>
          <Btn href={`${p.base}/results`} variant="outline-white">View results</Btn>
        </div>
      </Hero>

      <Section>
        <ProgramTabs slug={slug} />
        <div className="ros:grid ros:grid-cols-1 ros:gap-10 ros:md:grid-cols-[300px_1fr]">
          {/* head of the program */}
          <div className="ros:flex ros:flex-col ros:gap-3">
            <div className="ros:overflow-hidden ros:rounded-lg ros:bg-[#F4F4F4]" style={{ aspectRatio: "4 / 5" }}>
              {p.head.photo ? (
                <img src={p.head.photo} alt={p.head.name} className="ros:h-full ros:w-full ros:object-cover ros:object-top" />
              ) : (
                <div className="ros:flex ros:h-full ros:w-full ros:flex-col ros:items-center ros:justify-center ros:gap-2 ros:text-[#00000066]">
                  <span className="ros-anton ros:uppercase" style={{ fontSize: 88, lineHeight: 1 }}>{initial}</span>
                  <span className="ros:text-[10px] ros:font-bold ros:uppercase ros:tracking-[0.2em]">Photo coming soon</span>
                </div>
              )}
            </div>
            <h3 className="ros:text-lg ros:font-bold">{p.head.name}</h3>
            <p className="ros:text-[10px] ros:font-bold ros:uppercase ros:tracking-[0.2em] ros:text-[#DF4E4E]">{p.head.title.replace("Head of program", `Head of ${p.short}`)}</p>
          </div>

          <div className="ros:flex ros:flex-col ros:gap-8">
            <div className="ros:flex ros:flex-col ros:gap-4">
              <SectionTitle pill="📘 ABOUT THE PROGRAM" title={<>What is <span className="text-textRed">{p.short}</span>?</>} />
              <p className="ros:text-[#00000099]">{p.description}</p>
              <p className="ros:text-sm ros:text-[#00000099]"><span className="ros:font-bold ros:text-black">Who it&apos;s for: </span>{p.audience}</p>
              <ul className="ros:flex ros:flex-wrap ros:gap-2">
                {p.highlights.map((h) => (
                  <li key={h} className="ros:rounded-full ros:border ros:border-[#00000014] ros:bg-[#FAFAFA8F] ros:px-4 ros:py-2 ros:text-sm ros:font-medium">{h}</li>
                ))}
              </ul>
            </div>

            <div className="ros:grid ros:grid-cols-1 ros:gap-4 ros:md:grid-cols-2">
              <div className="ros:flex ros:flex-col ros:gap-3 ros:rounded-lg ros:border ros:border-[#00000014] ros:bg-[#FAFAFA8F] ros:p-6">
                <h3 className="ros:text-[11px] ros:font-extrabold ros:uppercase ros:tracking-[0.2em] ros:text-[#DF4E4E]">Prerequisites</h3>
                <ul className="ros:flex ros:flex-col ros:gap-2">
                  {p.prerequisites.map((x) => (
                    <li key={x} className="ros:flex ros:items-start ros:gap-3 ros:text-sm">
                      <span className="ros:mt-[7px] ros:size-[6px] ros:flex-shrink-0 ros:rounded-full ros:bg-[#DF4E4E]" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
                <p className="ros:text-xs ros:text-[#00000066]">Confirmed by the training office.</p>
              </div>
              <div className="ros:flex ros:flex-col ros:gap-3 ros:rounded-lg ros:border ros:border-[#00000014] ros:bg-[#FAFAFA8F] ros:p-6">
                <h3 className="ros:text-[11px] ros:font-extrabold ros:uppercase ros:tracking-[0.2em] ros:text-[#DF4E4E]">Next class</h3>
                <p className="ros:text-[22px] ros:font-bold ros:leading-snug">{p.nextClass}</p>
                <p className="ros:text-sm ros:text-[#00000099]">Register online and the training office will confirm the date and venue with you.</p>
              </div>
            </div>

            <div className="ros:flex ros:flex-wrap ros:gap-3">
              <Btn href={register.href} variant="red">{p.registerLabel}</Btn>
              <Btn href={`${p.base}/exam`} variant="outline">Take exam</Btn>
              <Btn href={`${p.base}/results`} variant="outline">View results</Btn>
            </div>
            {p.extraPages && (
              <div className="ros:flex ros:flex-wrap ros:gap-2">
                {p.extraPages.map((e) => (
                  <Link key={e.href} href={e.href} className="ros:rounded-full ros:border ros:border-[#00000029] ros:bg-white ros:px-3 ros:py-1.5 ros:text-[10px] ros:font-bold ros:uppercase ros:tracking-[0.15em] ros:transition ros:hover:border-[#DF4E4E] ros:hover:text-[#DF4E4E]">{e.label}</Link>
                ))}
              </div>
            )}
          </div>
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
