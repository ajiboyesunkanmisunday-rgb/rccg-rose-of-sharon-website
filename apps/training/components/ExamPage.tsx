import { Hero, Section } from "@ros/shared/kit/ui";
import ProgramTabs from "./ProgramTabs";
import ExamRunner from "./ExamRunner";
import { getProgram } from "@ros/shared/kit/programs";

/** Page wrapper for a program's online timed exam. */
export default function ExamPage({ slug }: { slug: string }) {
  const p = getProgram(slug);
  return (
    <>
      <Hero
        pill="⏱️ ONLINE TIMED EXAM"
        title={<>{p.short} <span className="text-textRed">Exam</span></>}
        subtitle={`${p.exam.questions.length} questions · ${p.exam.minutes} minutes · pass mark ${p.exam.passMark}%`}
        bg="/assets/hero-bg.png"
      />
      <Section>
        <div className="ros:mx-auto ros:max-w-3xl">
          <ProgramTabs slug={slug} />
          <ExamRunner slug={slug} />
        </div>
      </Section>
    </>
  );
}
