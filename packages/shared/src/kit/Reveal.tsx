"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  /** page headers: start on the first paint (CSS) instead of when scrolled into view */
  instant?: boolean;
  /** fade only (no rise) */
  fade?: boolean;
  /** seconds (default 1) */
  duration?: number;
};

/**
 * The fade-up reveal the original cci-web sections use (fade in while rising 10%, 1 second, once), done with a small
 * IntersectionObserver and a CSS transition instead of framer-motion, which keeps ~40 KB of script off the page.
 *
 * `instant`: the same effect started by CSS on the first paint, so a title shows as soon as the page does instead of
 * waiting for the scripts to load on a slow phone.
 */
export default function Reveal({ children, className = "", id, style, instant = false, fade = false, duration = 1 }: Props) {
  return instant
    ? <Instant className={className} id={id} style={style} fade={fade} duration={duration}>{children}</Instant>
    : <OnScroll className={className} id={id} style={style} fade={fade} duration={duration}>{children}</OnScroll>;
}

function Instant({ children, className, id, style, fade, duration }: Props) {
  const name = fade ? "ros-fade-in" : "ros-fade-up";
  return (
    <div id={id} className={className} style={{ ...style, animation: `${name} ${duration}s ease-in-out both` }}>
      <style>{"@keyframes ros-fade-up{from{opacity:0;transform:translateY(10%)}to{opacity:1;transform:none}}@keyframes ros-fade-in{from{opacity:0}to{opacity:1}}"}</style>
      {children}
    </div>
  );
}

function OnScroll({ children, className, id, style, fade, duration }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => { el.style.opacity = "1"; el.style.transform = "none"; };
    if (typeof IntersectionObserver === "undefined") { show(); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { show(); io.disconnect(); }
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      className={className}
      style={{ ...style, opacity: 0, transform: fade ? "none" : "translateY(10%)", transition: `opacity ${duration}s ease-in-out, transform ${duration}s ease-in-out` }}
    >
      {children}
    </div>
  );
}
