import type { Metadata } from "next";
import ProgramHub from "@/app/(site)/(more)/_kit/ProgramHub";
import { getProgram } from "@/app/(site)/(more)/_kit/programs";

export const metadata: Metadata = { title: getProgram("water-baptism").name };

export default function Page() {
  return <ProgramHub slug="water-baptism" />;
}
