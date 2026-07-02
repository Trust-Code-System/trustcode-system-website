"use client";

import { useEffect } from "react";

/**
 * One delegated pointer listener that feeds every `.card` a cursor
 * position (--mx/--my) so CSS can draw a radial spotlight under the
 * pointer. Renders nothing; skipped entirely on touch devices.
 */
export function Spotlight() {
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.(
        ".card"
      ) as HTMLElement | null;
      if (!card || raf) return;
      const { clientX, clientY } = e;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${clientX - r.left}px`);
        card.style.setProperty("--my", `${clientY - r.top}px`);
      });
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
