import type { Metadata } from "next";
import ProgramHub from "@/components/ProgramHub";
import { getProgram } from "@ros/shared/kit/programs";

export const metadata: Metadata = { title: getProgram("water-baptism").name };

export default function Page() {
  return <ProgramHub slug="water-baptism" />;
}
