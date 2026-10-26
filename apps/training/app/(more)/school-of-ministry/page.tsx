import type { Metadata } from "next";
import ProgramHub from "@/components/ProgramHub";
import { getProgram } from "@ros/shared/kit/programs";

export const metadata: Metadata = { title: getProgram("school-of-ministry").name };

export default function Page() {
  return <ProgramHub slug="school-of-ministry" />;
}
