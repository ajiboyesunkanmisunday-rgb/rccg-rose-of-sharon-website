import type { Metadata } from "next";
import CoordinatorView from "@/app/(site)/(more)/_kit/CoordinatorView";

export const metadata: Metadata = { title: "CSR Program — Coordinator" };

export default function Page() {
  return <CoordinatorView slug="csr" />;
}
