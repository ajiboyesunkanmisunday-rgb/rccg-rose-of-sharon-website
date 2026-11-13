"use client";

import { useEffect, useRef } from "react";

/**
 * Same fade-up reveal the original cci-web sections use (fade in while rising 10%, 1 second, once when scrolled into
 * view). Done with a small IntersectionObserver and a CSS transition instead of framer-motion, which removed about
 * 130 KB of script from every page.
 */
export default function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; };
    if (typeof IntersectionObserver === "undefined") { show(); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { show(); io.disconnect(); }
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={{ opacity: 0, transform: "translateY(10%)", transition: "opacity 1s ease, transform 1s ease" }}>
      {children}
    </div>
  );
}
