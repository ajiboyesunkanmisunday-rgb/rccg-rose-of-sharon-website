import type { Metadata } from "next";
import ResultsView from "@/components/ResultsView";
import { getProgram } from "@ros/shared/kit/programs";

export const metadata: Metadata = { title: getProgram("workers-in-training").name + " — Results" };

export default function Page() {
  return <ResultsView slug="workers-in-training" />;
}
