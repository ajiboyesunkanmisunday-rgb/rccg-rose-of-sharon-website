import type { Metadata } from "next";
import ExamPage from "@/components/ExamPage";

export const metadata: Metadata = { title: "CSR Program — Online Exam" };

export default function Page() {
  return <ExamPage slug="csr" />;
}
