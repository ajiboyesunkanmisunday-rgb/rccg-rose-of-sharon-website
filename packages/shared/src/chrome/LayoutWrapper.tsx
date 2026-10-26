"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

/*
 * Header, page and footer. The "?t=mini" embed mode (no header/footer) is detected after the page has loaded,
 * on purpose: reading the query string while rendering would force the whole page to be built in the browser
 * instead of arriving as ready-made HTML, which makes every first visit slow.
 */
export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isMini, setIsMini] = useState(false);
  useEffect(() => {
    setIsMini(new URLSearchParams(window.location.search).get("t") === "mini");
  }, []);

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
