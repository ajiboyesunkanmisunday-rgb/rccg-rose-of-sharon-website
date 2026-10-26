"use client";

import { useSearchParams } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const isMini = searchParams.get("t") === "mini";

  return (
    <>
      {!isMini && <Navbar />}
      <main className={isMini ? "" : "mt-[72px]"}>
        {children}
      </main>
      {!isMini && <Footer />}
    </>
  );
}
