import type { Metadata } from "next";
import ExamPage from "@/components/ExamPage";

export const metadata: Metadata = { title: "RILA — Online Exam" };

export default function Page() {
  return <ExamPage slug="rila" />;
}
