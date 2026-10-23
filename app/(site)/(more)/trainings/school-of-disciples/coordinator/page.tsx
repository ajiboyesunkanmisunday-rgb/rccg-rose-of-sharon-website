import type { Metadata } from "next";
import CoordinatorView from "@/app/(site)/(more)/_kit/CoordinatorView";
import { getProgram } from "@/app/(site)/(more)/_kit/programs";

export const metadata: Metadata = { title: getProgram("school-of-disciples").name + " — Coordinator" };

export default function Page() {
  return <CoordinatorView slug="school-of-disciples" />;
}
