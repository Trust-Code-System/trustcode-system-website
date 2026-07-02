"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * 3D perspective tilt that follows the cursor. Children with inline
 * `translateZ` transforms float at different depths (`.tilt-body` is
 * `preserve-3d`). Mouse-only — touch pointers and reduced motion get a
 * static card.
 */
export function Tilt({
  children,
  max = 7,
  className,
}: {
  children: ReactNode;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  function onMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.transform = `rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
    });
  }

  function onLeave() {
    cancelAnimationFrame(raf.current);
    const el = ref.current;
    if (el) el.style.transform = "";
  }

  return (
    <div
      className={cn("tilt-scene", className)}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div ref={ref} className="tilt-body relative">
        {children}
      </div>
    </div>
  );
}
