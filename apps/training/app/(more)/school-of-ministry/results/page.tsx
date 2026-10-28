import type { Metadata } from "next";
import ResultsView from "@/components/ResultsView";
import { getProgram } from "@ros/shared/kit/programs";

export const metadata: Metadata = { title: getProgram("school-of-ministry").name + " — Results" };

export default function Page() {
  return <ResultsView slug="school-of-ministry" />;
}
