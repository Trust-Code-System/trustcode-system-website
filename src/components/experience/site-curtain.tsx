"use client";
import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useExperienceMotion } from "./motion-preferences";
const REPLAY = "trustcode:replay-entrance";
const DURATION_MS = 2400;
const timing = { "--entrance-duration": `${DURATION_MS}ms` } as React.CSSProperties;
export function SiteCurtain() {
  const { enabled, ready } = useExperienceMotion();
  const [active, setActive] = useState(true);
  const [iteration, setIteration] = useState(0);
  const [opening, setOpening] = useState(false);
  const close = useCallback(() => {
    setActive(false);
    document.documentElement.dataset.entrance = "skip";
    try {
      sessionStorage.setItem("trustcode-entrance-v2", "seen");
    } catch {
      /* The entrance can still finish without storage. */
    }
  }, []);
  useLayoutEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("trustcode-entrance-v2") === "seen";
    } catch {
      /* Animation still finishes when storage is unavailable. */
    }
    if (seen || document.documentElement.dataset.entrance === "skip")
      setActive(false);
  }, []);
  useEffect(() => {
    const replay = () => {
      if (!ready || !enabled) return;
      document.documentElement.dataset.entrance = "pending";
      setOpening(false);
      setIteration((i) => i + 1);
      setActive(true);
    };
    window.addEventListener(REPLAY, replay);
    return () => window.removeEventListener(REPLAY, replay);
  }, [enabled, ready]);
  useEffect(() => {
    if (!active || !ready) return;
    if (!enabled) {
      close();
      return;
    }
    // Keep the server-rendered curtain closed until the hydrated page can paint.
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => setOpening(true));
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, [active, iteration, ready, enabled, close]);
  useEffect(() => {
    if (!active) return;
    // Animation-end is authoritative; this is a fallback if the browser drops it.
    const timer = opening ? setTimeout(close, DURATION_MS + 200) : undefined;
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", key);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", key);
    };
  }, [active, opening, iteration, close]);
  if (!active) return null;
  return (
    <>
      <div
        className="site-curtain"
        key={iteration}
        data-phase={opening ? "opening" : "holding"}
        style={timing}
        aria-hidden
        onAnimationEnd={(event) => {
          if (event.target === event.currentTarget && event.animationName === "curtain-away") close();
        }}
      >
        <div className="curtain-blades">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              className={`curtain-blade blade-${i}`}
              key={i}
              style={{ "--blade-index": i } as React.CSSProperties}
            >
              <span />
            </div>
          ))}
        </div>
        <div className="curtain-word curtain-word-top">TRUST</div>
        <div className="curtain-word curtain-word-bottom">
          CODE<span>.</span>
        </div>
        <div className="curtain-identity">
          <Image
            src="/trustcode-system-logo-dark.png"
            width={1640}
            height={430}
            alt=""
            priority
          />
          <span>DESIGN. ENGINEER. DELIVER.</span>
        </div>
        <div className="curtain-seam" />
        <div className="curtain-flash" />
      </div>
      <button className="curtain-skip" data-phase={opening ? "opening" : "holding"} style={timing} type="button" onClick={close}>
        Skip entrance ↗
      </button>
      <noscript>
        <style>{".site-curtain,.curtain-skip{display:none!important}"}</style>
      </noscript>
    </>
  );
}
export function ReplayEntrance() {
  const { enabled } = useExperienceMotion();
  return (
    <button
      className="replay-entrance"
      type="button"
      disabled={!enabled}
      title={enabled ? undefined : "Enable Motion to replay the entrance"}
      onClick={() => window.dispatchEvent(new Event(REPLAY))}
    >
      REPLAY ENTRANCE ↗
    </button>
  );
}
