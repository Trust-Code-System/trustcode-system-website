"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Scroll-driven timeline rail. A muted vertical line runs the full height;
 * a blueprint-colored fill scales down it as the user scrolls through the
 * steps. Step dots are drawn by `.timeline-step` CSS and light up when the
 * step's Reveal fires (`.reveal-in`). With reduced motion the rail renders
 * fully filled.
 */
export function Timeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setProgress(1);
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      // Fill tracks how far the "reading line" (60% down the viewport) has
      // travelled through the timeline block.
      const line = window.innerHeight * 0.6;
      const p = (line - rect.top) / rect.height;
      setProgress(Math.min(Math.max(p, 0), 1));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <div
        aria-hidden
        className="absolute bottom-8 left-[5px] top-8 w-px bg-grid"
      />
      <div
        aria-hidden
        className="absolute bottom-8 left-[5px] top-8 w-px origin-top bg-blueprint"
        style={{ transform: `scaleY(${progress})` }}
      />
      {children}
    </div>
  );
}
