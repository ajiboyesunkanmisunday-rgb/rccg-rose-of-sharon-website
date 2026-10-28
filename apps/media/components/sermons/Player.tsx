"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Sermon } from "@/lib/sermons";

type Ctx = { play: (s: Sermon) => void };
const PlayerCtx = createContext<Ctx>({ play: () => {} });
export const usePlayer = () => useContext(PlayerCtx);

/** Plays a sermon in a pop-up player without leaving the page. */
export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [now, setNow] = useState<Sermon | null>(null);
  const play = useCallback((s: Sermon) => setNow(s), []);
  useEffect(() => {
    if (!now) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setNow(null); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [now]);

  return (
    <PlayerCtx.Provider value={{ play }}>
      {children}
      {now && (
        <div role="dialog" aria-modal="true" aria-label={now.title} onClick={() => setNow(null)} style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: "min(100%, 960px)", background: "#0a0a0a", borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 80px rgba(0,0,0,0.6)" }}>
            <div style={{ position: "relative", aspectRatio: "16 / 9", background: "#000" }}>
              <iframe src={`https://www.youtube-nocookie.com/embed/${now.id}?autoplay=1&rel=0&modestbranding=1`} title={now.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} />
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, padding: "16px 20px", color: "#fafafa" }}>
              <div>
                <p style={{ fontWeight: 800, fontSize: 18, lineHeight: 1.3 }}>{now.title}</p>
                <p style={{ marginTop: 4, fontSize: 13, color: "rgba(250,250,250,0.55)" }}>{now.series} · {new Date(now.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
              </div>
              <button onClick={() => setNow(null)} aria-label="Close player" style={{ fontSize: 30, lineHeight: 1, color: "#fff", flexShrink: 0 }}>×</button>
            </div>
          </div>
        </div>
      )}
    </PlayerCtx.Provider>
  );
}
