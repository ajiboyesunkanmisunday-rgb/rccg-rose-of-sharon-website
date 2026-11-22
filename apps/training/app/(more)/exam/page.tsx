import type { Metadata } from "next";
import { Hero, Section } from "@ros/shared/kit/ui";
import LiveExam from "@/components/LiveExam";

export const metadata: Metadata = { title: "Online Exams" };

export default function Page() {
  return (
    <>
      <Hero
        pill="⏱️ ONLINE TIMED EXAM"
        title={<>Your <span className="text-textRed">Exams</span></>}
        subtitle="See the exams assigned to you, read the instructions and sit them online."
        bg="/assets/hero-bg.png"
      />
      <Section>
        <div className="ros:mx-auto ros:max-w-3xl">
          <LiveExam />
        </div>
      </Section>
    </>
  );
}
