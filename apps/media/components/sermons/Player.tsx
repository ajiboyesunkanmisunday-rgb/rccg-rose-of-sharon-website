"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { Sermon } from "@/lib/sermons";

type Ctx = {
  play: (s: Sermon, queue?: Sermon[]) => void;
  now: Sermon | null;
  playing: boolean;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  skip: (secs: number) => void;
  seek: (t: number) => void;
  close: () => void;
  time: number;
  duration: number;
  hasNext: boolean;
  hasPrev: boolean;
  failed: boolean;
};
const noop = () => {};
const PlayerCtx = createContext<Ctx>({ play: noop, now: null, playing: false, toggle: noop, next: noop, prev: noop, skip: noop, seek: noop, close: noop, time: 0, duration: 0, hasNext: false, hasPrev: false, failed: false });
export const usePlayer = () => useContext(PlayerCtx);

/** One audio element for the whole sermons app, so a message keeps playing while people browse series and the gallery. */
export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [now, setNow] = useState<Sermon | null>(null);
  const [queue, setQueue] = useState<Sermon[]>([]);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [failed, setFailed] = useState(false);

  const load = useCallback((s: Sermon) => {
    const a = audio.current;
    setNow(s); setTime(0); setDuration(0); setFailed(false);
    if (!a) return;
    if (!s.audio) { a.pause(); a.removeAttribute("src"); a.load(); setPlaying(false); setFailed(true); return; }
    a.src = s.audio;
    a.play().catch(() => setPlaying(false));
  }, []);

  const play = useCallback((s: Sermon, q?: Sermon[]) => { if (q) setQueue(q); load(s); }, [load]);
  const idx = now ? queue.findIndex((x) => x.id === now.id) : -1;
  const hasNext = idx >= 0 && idx < queue.length - 1;
  const hasPrev = idx > 0;
  const next = useCallback(() => { if (hasNext) load(queue[idx + 1]); }, [hasNext, queue, idx, load]);
  const prev = useCallback(() => {
    const a = audio.current;
    if (a && a.currentTime > 5) { a.currentTime = 0; return; }
    if (hasPrev) load(queue[idx - 1]);
  }, [hasPrev, queue, idx, load]);
  const toggle = useCallback(() => { const a = audio.current; if (!a || !now?.audio) return; if (a.paused) a.play().catch(() => {}); else a.pause(); }, [now]);
  const skip = useCallback((secs: number) => { const a = audio.current; if (a) a.currentTime = Math.max(0, Math.min(a.duration || 0, a.currentTime + secs)); }, []);
  const seek = useCallback((t: number) => { const a = audio.current; if (a) a.currentTime = t; }, []);
  const close = useCallback(() => { const a = audio.current; if (a) { a.pause(); a.removeAttribute("src"); a.load(); } setNow(null); setPlaying(false); }, []);

  useEffect(() => {
    if (!now) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && /INPUT|TEXTAREA|SELECT/.test(t.tagName)) return;
      if (e.code === "Space" && t?.tagName !== "BUTTON") { e.preventDefault(); toggle(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [now, toggle]);

  return (
    <PlayerCtx.Provider value={{ play, now, playing, toggle, next, prev, skip, seek, close, time, duration, hasNext, hasPrev, failed }}>
      {children}
      <audio
        ref={audio}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => (hasNext ? next() : setPlaying(false))}
        onError={() => { if (now?.audio) setFailed(true); }}
      />
    </PlayerCtx.Provider>
  );
}

const fmt = (t: number) => {
  if (!isFinite(t) || t < 0) t = 0;
  const h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), s = Math.floor(t % 60);
  const mm = String(m).padStart(2, "0"), ss = String(s).padStart(2, "0");
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
};

const Ico = ({ children, size = 22 }: { children: React.ReactNode; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{children}</svg>
);
const btn = "ros:flex ros:items-center ros:justify-center ros:text-white/80 ros:transition ros:hover:text-white disabled:ros:opacity-30";

/** The player bar along the bottom of the sermons app (audio only). */
export function PlayerBar() {
  const { now, playing, toggle, next, prev, skip, seek, close, time, duration, hasNext, hasPrev, failed } = usePlayer();
  if (!now) return null;
  const pct = duration ? (time / duration) * 100 : 0;
  return (
    <div role="region" aria-label="Audio player" className="ros:mb-14 ros:flex ros:flex-shrink-0 ros:items-center ros:gap-3 ros:px-3 ros:py-3 ros:md:mb-0 ros:md:px-4" style={{ background: "#000", boxShadow: "0 -1px 0 rgba(255,255,255,0.06)" }}>
      <div className="ros:flex ros:min-w-0 ros:flex-1 ros:items-center ros:gap-3 ros:md:w-1/4 ros:md:flex-none">
        <img src={now.thumb} alt="" className="ros:size-12 ros:flex-shrink-0 ros:rounded-md ros:object-cover" />
        <div className="ros:min-w-0">
          <p className="ros:line-clamp-1 ros:text-[14px] ros:font-bold">{now.title}</p>
          <p className="ros:line-clamp-1 ros:text-[11px] ros:font-semibold ros:uppercase ros:tracking-wider ros:text-white/45">{failed ? "Audio not available yet" : now.series || "Message"}</p>
        </div>
      </div>

      <div className="ros:flex ros:flex-col ros:items-center ros:gap-1 ros:md:flex-1">
        <div className="ros:flex ros:items-center ros:gap-4">
          <button type="button" className={`${btn} ros:max-md:hidden`} onClick={prev} disabled={!hasPrev && time < 5} aria-label="Previous message"><Ico><path d="M7 5v14M18 5v14l-9-7z" /></Ico></button>
          <button type="button" className={btn} onClick={() => skip(-10)} disabled={!now.audio} aria-label="Back 10 seconds"><Ico size={24}><path d="M4 12a8 8 0 1 0 3-6.2M4 4v5h5" /><text x="8.2" y="15.5" fontSize="7" fill="currentColor" stroke="none" fontWeight="700">10</text></Ico></button>
          <button type="button" onClick={toggle} disabled={!now.audio} aria-label={playing ? "Pause" : "Play"} className="ros:flex ros:size-10 ros:items-center ros:justify-center ros:rounded-full ros:bg-white ros:text-black ros:transition ros:hover:scale-105 disabled:ros:opacity-40">
            {playing ? <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /></svg> : <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ marginLeft: 2 }}><path d="M8 5v14l11-7z" /></svg>}
          </button>
          <button type="button" className={btn} onClick={() => skip(10)} disabled={!now.audio} aria-label="Forward 10 seconds"><Ico size={24}><path d="M20 12a8 8 0 1 1-3-6.2M20 4v5h-5" /><text x="8.2" y="15.5" fontSize="7" fill="currentColor" stroke="none" fontWeight="700">10</text></Ico></button>
          <button type="button" className={`${btn} ros:max-md:hidden`} onClick={next} disabled={!hasNext} aria-label="Next message"><Ico><path d="M17 5v14M6 5v14l9-7z" /></Ico></button>
        </div>
        <div className="ros:hidden ros:w-full ros:max-w-[640px] ros:items-center ros:gap-3 ros:text-[11px] ros:tabular-nums ros:text-white/60 ros:md:flex">
          <span className="ros:w-12 ros:text-right">{fmt(time)}</span>
          <input type="range" min={0} max={duration || 0} step={1} value={Math.min(time, duration || 0)} onChange={(e) => seek(+e.target.value)} disabled={!duration} aria-label="Seek" className="ros:h-1 ros:flex-1 ros:cursor-pointer" style={{ accentColor: "#DF4E4E", background: `linear-gradient(to right,#DF4E4E ${pct}%,rgba(255,255,255,0.2) ${pct}%)`, appearance: "none", borderRadius: 4 }} />
          <span className="ros:w-12">{fmt(duration)}</span>
        </div>
      </div>

      <div className="ros:flex ros:flex-shrink-0 ros:justify-end ros:md:w-1/4">
        <button type="button" onClick={close} aria-label="Close player" className={btn}><Ico size={24}><path d="M6 6l12 12M18 6 6 18" /></Ico></button>
      </div>
    </div>
  );
}
