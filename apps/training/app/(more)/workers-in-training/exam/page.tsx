import type { Metadata } from "next";
import ExamPage from "@/components/ExamPage";
import { getProgram } from "@ros/shared/kit/programs";

export const metadata: Metadata = { title: getProgram("workers-in-training").name + " — Online Exam" };

export default function Page() {
  return <ExamPage slug="workers-in-training" />;
}
