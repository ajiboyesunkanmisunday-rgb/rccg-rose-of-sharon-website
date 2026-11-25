"use client";

import { useEffect, useRef } from "react";

/** A loss of focus shorter than this (a system notice, a tap on the status bar) is not counted. */
const BLUR_GRACE_MS = 1000;

/**
 * Watches an exam in progress. A browser cannot stop a student switching or closing tabs, so each time the page is
 * left (hidden, out of focus or out of full screen) `onLeave` is called once, until the student is back on the page.
 * Copying, pasting, the context menu, printing and saving are blocked, and closing the tab asks for confirmation.
 */
export function useExamGuard(active: boolean, onLeave: () => void) {
  const leave = useRef(onLeave);
  const away = useRef(false);
  useEffect(() => { leave.current = onLeave; });

  useEffect(() => {
    if (!active) return;
    away.current = false;
    let blurTimer: ReturnType<typeof setTimeout> | undefined;
    const left = () => {
      if (away.current) return;
      away.current = true;
      leave.current();
    };
    const back = () => {
      clearTimeout(blurTimer);
      if (!document.hidden) away.current = false;
    };
    const onVisibility = () => { if (document.hidden) left(); else back(); };
    const onBlur = () => { clearTimeout(blurTimer); blurTimer = setTimeout(() => { if (!document.hasFocus()) left(); }, BLUR_GRACE_MS); };
    const onFullscreen = () => { if (!document.fullscreenElement) left(); else back(); };
    const block = (e: Event) => e.preventDefault();
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && ["a", "c", "v", "x", "p", "s", "u"].includes(e.key.toLowerCase())) e.preventDefault();
      if (e.key === "F12") e.preventDefault();
    };
    const onUnload = (e: BeforeUnloadEvent) => { e.preventDefault(); };
    const blocked = ["copy", "cut", "paste", "contextmenu", "dragstart", "drop", "selectstart"];

    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("fullscreenchange", onFullscreen);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", back);
    window.addEventListener("keydown", onKey);
    window.addEventListener("beforeunload", onUnload);
    blocked.forEach((name) => document.addEventListener(name, block));
    return () => {
      clearTimeout(blurTimer);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("fullscreenchange", onFullscreen);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", back);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("beforeunload", onUnload);
      blocked.forEach((name) => document.removeEventListener(name, block));
    };
  }, [active]);

  /** Call from the button that closes a warning, so the next departure is counted again. */
  return () => { away.current = false; };
}

/** True when another tab of this browser is already running the exam. */
export function examRunningElsewhere(key: string): Promise<boolean> {
  if (typeof BroadcastChannel === "undefined") return Promise.resolve(false);
  return new Promise((resolve) => {
    const channel = new BroadcastChannel(key);
    const done = (busy: boolean) => { channel.close(); resolve(busy); };
    channel.onmessage = (e) => { if (e.data === "running") done(true); };
    channel.postMessage("who");
    setTimeout(() => done(false), 400);
  });
}

/** Answers other tabs that ask whether this exam is already running. */
export function useExamTabLock(key: string | null) {
  useEffect(() => {
    if (!key || typeof BroadcastChannel === "undefined") return;
    const channel = new BroadcastChannel(key);
    channel.onmessage = (e) => { if (e.data === "who") channel.postMessage("running"); };
    return () => channel.close();
  }, [key]);
}
