import { Hero, Section } from "@ros/shared/kit/ui";
import ProgramTabs from "./ProgramTabs";
import ExamRunner from "./ExamRunner";
import LiveExam from "./LiveExam";
import { getProgram } from "@ros/shared/kit/programs";

/** The exam system's training category for each program that has one. */
const EXAM_CATEGORY: Record<string, string> = {
  "water-baptism": "BAPTISM",
  "workers-in-training": "WORKERS_IN_TRAINING",
  "school-of-ministry": "SCHOOL_OF_MINISTRY",
  "school-of-disciples": "SCHOOL_OF_DISCIPLES",
  rila: "RILA",
};

/** Page wrapper for a program's online timed exam. Programs the exam system covers show the student's real exams. */
export default function ExamPage({ slug }: { slug: string }) {
  const p = getProgram(slug);
  const category = EXAM_CATEGORY[slug];
  return (
    <>
      <Hero
        pill="⏱️ ONLINE TIMED EXAM"
        title={<>{p.short} <span className="text-textRed">Exam</span></>}
        subtitle={category ? "See the exams assigned to you, read the instructions and sit them online." : `${p.exam.questions.length} questions · ${p.exam.minutes} minutes · pass mark ${p.exam.passMark}%`}
        bg="/assets/hero-bg.png"
      />
      <Section>
        <div className="ros:mx-auto ros:max-w-3xl">
          <ProgramTabs slug={slug} />
          {category ? <LiveExam category={category} /> : <ExamRunner slug={slug} />}
        </div>
      </Section>
    </>
  );
}
