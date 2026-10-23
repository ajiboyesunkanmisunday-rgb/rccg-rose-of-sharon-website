import type { Metadata } from "next";
import ExamPage from "@/app/(site)/(more)/_kit/ExamPage";
import { getProgram } from "@/app/(site)/(more)/_kit/programs";

export const metadata: Metadata = { title: getProgram("workers-in-training").name + " — Online Exam" };

export default function Page() {
  return <ExamPage slug="workers-in-training" />;
}
