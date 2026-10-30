"use client";

import { useEffect, useState } from "react";

/**
 * The paper forms are laid out at a fixed A4 width (794px). On a phone that is wider than the screen, so this
 * returns a CSS `zoom` that shrinks the sheet to fit the screen (1 on anything wide enough). Visitors can still
 * pinch to zoom in, and printing is unaffected because the print stylesheet resets the zoom.
 */
export function usePaperScale(paperWidth = 794, gutter = 12): number {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const update = () => setScale(Math.min(1, (window.innerWidth - gutter * 2) / paperWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [paperWidth, gutter]);
  return scale;
}
