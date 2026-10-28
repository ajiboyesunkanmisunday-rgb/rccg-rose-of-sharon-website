import type { Metadata } from "next";
import ResultsView from "@/components/ResultsView";
import { getProgram } from "@ros/shared/kit/programs";

export const metadata: Metadata = { title: getProgram("water-baptism").name + " — Results" };

export default function Page() {
  return <ResultsView slug="water-baptism" />;
}
