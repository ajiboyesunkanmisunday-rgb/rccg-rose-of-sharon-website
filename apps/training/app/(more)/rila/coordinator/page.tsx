import type { Metadata } from "next";
import CoordinatorView from "@/components/CoordinatorView";

export const metadata: Metadata = { title: "RILA — Coordinator" };

export default function Page() {
  return <CoordinatorView slug="rila" />;
}
