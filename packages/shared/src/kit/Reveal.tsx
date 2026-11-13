"use client";

import { useEffect, useRef } from "react";

type Props = { children: React.ReactNode; className?: string; instant?: boolean };

/**
 * Same fade-up reveal the original cci-web sections use (fade in while rising 10%, 1 second, once). Done with a small
 * IntersectionObserver and a CSS transition instead of framer-motion, which removed about 130 KB of script.
 *
 * `instant` (page headers): the same fade-up, but started by CSS on the first paint, so the title shows as soon as the
 * page does instead of waiting for the scripts to load on a slow phone.
 */
export default function Reveal({ children, className = "", instant = false }: Props) {
  return instant ? <Instant className={className}>{children}</Instant> : <OnScroll className={className}>{children}</OnScroll>;
}

function Instant({ children, className }: Props) {
  return (
    <div className={className} style={{ animation: "ros-fade-up 1s ease both" }}>
      <style>{"@keyframes ros-fade-up{from{opacity:0;transform:translateY(10%)}to{opacity:1;transform:none}}"}</style>
      {children}
    </div>
  );
}

function OnScroll({ children, className }: Props) {
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
