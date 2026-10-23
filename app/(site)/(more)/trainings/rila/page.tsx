import type { Metadata } from "next";
import ProgramHub from "@/app/(site)/(more)/_kit/ProgramHub";

export const metadata: Metadata = { title: "RILA" };

export default function Page() {
  return <ProgramHub slug="rila" />;
}
