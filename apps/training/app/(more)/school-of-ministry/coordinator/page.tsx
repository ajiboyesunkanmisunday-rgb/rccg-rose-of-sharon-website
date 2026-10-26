import type { Metadata } from "next";
import CoordinatorView from "@/components/CoordinatorView";
import { getProgram } from "@ros/shared/kit/programs";

export const metadata: Metadata = { title: getProgram("school-of-ministry").name + " — Coordinator" };

export default function Page() {
  return <CoordinatorView slug="school-of-ministry" />;
}
