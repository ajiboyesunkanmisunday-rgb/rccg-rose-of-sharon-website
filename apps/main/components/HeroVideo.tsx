"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Looping, silent banner video for the home page hero. It sits on top of the hero photo, which stays visible until
 * the video is actually playing, so the page paints exactly as before and the video never delays it:
 *  - it only starts loading after the page has finished loading
 *  - it is skipped for visitors who asked for reduced motion, use Data Saver, or are on a 2G connection
 *  - phones get a smaller file (about 1.2 MB instead of 3.4 MB)
 *  - it pauses while the hero is scrolled out of view
 */
export default function HeroVideo({ src, srcSmall }: { src: string; srcSmall: string }) {
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? "")) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = () => { timer = setTimeout(() => setLoad(true), 600); };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => { window.removeEventListener("load", start); if (timer) clearTimeout(timer); };
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!load || !v) return;
    v.muted = true;
    v.play().catch(() => { /* the browser refused autoplay: the photo simply stays */ });
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); });
    io.observe(v);
    return () => io.disconnect();
  }, [load]);

  if (!load) return null;
  const small = window.innerWidth <= 768;
  return (
    <video
      ref={ref}
      src={small ? srcSmall : src}
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      onPlaying={() => setReady(true)}
      className="absolute left-0 top-0 h-full w-full object-cover"
      style={{ opacity: ready ? 1 : 0, transition: "opacity 0.8s ease" }}
    />
  );
}
