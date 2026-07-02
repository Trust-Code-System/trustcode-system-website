"use client";

import { useEffect, useState } from "react";

/** Gradient hairline along the top edge that fills as the page scrolls. */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
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
    <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-[2px]">
      <div
        className="h-full"
        style={{
          clipPath: `inset(0 ${(1 - progress) * 100}% 0 0)`,
          backgroundImage:
            "linear-gradient(90deg, var(--blueprint), var(--accent-2), var(--verified))",
        }}
      />
    </div>
  );
}
