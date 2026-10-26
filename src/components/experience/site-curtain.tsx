"use client";
import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
const REPLAY = "trustcode:replay-entrance";
export function SiteCurtain() {
  const [active, setActive] = useState(true);
  const [iteration, setIteration] = useState(0);
  const close = useCallback(() => setActive(false), []);
  useLayoutEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("trustcode-entrance-v2") === "seen";
      sessionStorage.setItem("trustcode-entrance-v2", "seen");
    } catch {
      /* Animation still finishes when storage is unavailable. */
    }
    if (seen || matchMedia("(prefers-reduced-motion: reduce)").matches)
      setActive(false);
  }, []);
  useEffect(() => {
    const replay = () => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      setIteration((i) => i + 1);
      setActive(true);
    };
    window.addEventListener(REPLAY, replay);
    return () => window.removeEventListener(REPLAY, replay);
  }, []);
  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(close, 1700);
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", key);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", key);
    };
  }, [active, iteration, close]);
  if (!active) return null;
  return (
    <>
      <div className="site-curtain" key={iteration} aria-hidden>
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
      <button className="curtain-skip" type="button" onClick={close}>
        Skip entrance ↗
      </button>
      <noscript>
        <style>{".site-curtain,.curtain-skip{display:none!important}"}</style>
      </noscript>
    </>
  );
}
export function ReplayEntrance() {
  return (
    <button
      className="replay-entrance"
      type="button"
      onClick={() => window.dispatchEvent(new Event(REPLAY))}
    >
      REPLAY ENTRANCE ↗
    </button>
  );
}
