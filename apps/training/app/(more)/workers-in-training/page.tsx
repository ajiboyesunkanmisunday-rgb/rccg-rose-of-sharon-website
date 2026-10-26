import type { Metadata } from "next";
import ProgramHub from "@/components/ProgramHub";
import { getProgram } from "@ros/shared/kit/programs";

export const metadata: Metadata = { title: getProgram("workers-in-training").name };

export default function Page() {
  return <ProgramHub slug="workers-in-training" />;
}
