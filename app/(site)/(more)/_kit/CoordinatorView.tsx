import Link from "next/link";
import { Hero, Section, SectionTitle, Btn } from "./ui";
import ProgramTabs from "./ProgramTabs";
import { getProgram } from "./programs";

/** Church management system where coordinators sign in (RCCG Rose of Sharon Management System). */
const COORDINATOR_PORTAL = "https://aquamarine-chaja-11dedd.netlify.app";

const TOOLS = [
  { icon: "🧾", title: "Student register", text: "View everyone enrolled, confirm details and give admission numbers." },
  { icon: "🗓️", title: "Attendance", text: "Take attendance for each class and follow up with absentees." },
  { icon: "💳", title: "Fees", text: "Record and confirm fee payments for each student." },
  { icon: "📊", title: "Score sheets", text: "Upload exam results and view the broadsheet for the class." },
  { icon: "✍️", title: "Official remarks", text: "Give each student an official remark when the course ends." },
  { icon: "🎓", title: "Graduation", text: "Mark students who have completed the program as graduated." },
];

export default function CoordinatorView({ slug }: { slug: string }) {
  const p = getProgram(slug);
  return (
    <>
      <Hero
        pill="🧑‍🏫 PROGRAM COORDINATOR"
        title={<>{p.short} <span className="text-textRed">Coordinator</span></>}
        subtitle={`Everything a coordinator needs to run ${p.name}: students, attendance, fees, scores and graduation.`}
        bg="/assets/hero-bg.png"
      >
        <Btn href={COORDINATOR_PORTAL} variant="white" className="ros:mt-2">Open coordinator portal</Btn>
      </Hero>

      <Section>
        <ProgramTabs slug={slug} />
        <SectionTitle pill="🧰 COORDINATOR TOOLS" title={<>What you can <span className="text-textRed">manage</span></>} sub="Coordinators sign in to the church management system to do the following for their program." />
        <div className="ros:mt-8 ros:grid ros:grid-cols-1 ros:gap-6 ros:sm:grid-cols-2 ros:lg:grid-cols-3">
          {TOOLS.map((t) => (
            <div key={t.title} className="ros:flex ros:flex-col ros:gap-3 ros:rounded-lg ros:border ros:border-[#00000014] ros:bg-[#FAFAFA8F] ros:p-6">
              <span className="ros:flex ros:size-12 ros:items-center ros:justify-center ros:rounded-full ros:bg-black ros:text-[22px]">{t.icon}</span>
              <h3 className="ros:text-lg ros:font-bold">{t.title}</h3>
              <p className="ros:text-[#00000099]">{t.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="ros:pt-0">
        <div className="ros:grid ros:grid-cols-1 ros:gap-6 ros:md:grid-cols-2">
          <div className="ros:flex ros:flex-col ros:gap-3 ros:rounded-2xl ros:bg-black ros:p-8 ros:text-white">
            <h3 className="ros-anton ros:text-2xl ros:uppercase">Coordinator sign-in</h3>
            <p className="ros:text-[#FFFFFFB2]">Use the account the church office gave you. If you don&apos;t have one yet, ask the training office.</p>
            <Btn href={COORDINATOR_PORTAL} variant="white" className="ros:mt-2">Open coordinator portal</Btn>
          </div>
          <div className="ros:flex ros:flex-col ros:gap-3 ros:rounded-2xl ros:border ros:border-[#00000014] ros:bg-[#FAFAFA8F] ros:p-8">
            <h3 className="ros-anton ros:text-2xl ros:uppercase">Need help?</h3>
            <p className="ros:text-[#00000099]">Send the training office a message and we will get back to you.</p>
            <div className="ros:mt-2 ros:flex ros:flex-wrap ros:gap-3">
              <Btn href="/requests/suggestion" variant="outline">Contact the office</Btn>
              <Btn href={p.base} variant="outline">Back to overview</Btn>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
