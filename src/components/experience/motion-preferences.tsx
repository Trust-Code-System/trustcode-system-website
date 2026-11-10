"use client";
import {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
const MotionContext = createContext({
  enabled: false,
  ready: false,
  toggle: () => {},
});
export function MotionPreferences({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const reduced = useRef(false);
  const optedOut = useRef(false);
  useLayoutEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    try {
      optedOut.current = localStorage.getItem("trustcode-motion") === "off";
    } catch {
      /* Keep the session preference if storage is unavailable. */
    }
    const update = () => {
      reduced.current = query.matches;
      setEnabled(!query.matches && !optedOut.current);
      setReady(true);
    };
    update();
    query.addEventListener("change", update);
    const storage = (event: StorageEvent) => {
      if (event.key === "trustcode-motion") {
        optedOut.current = event.newValue === "off";
        update();
      }
    };
    window.addEventListener("storage", storage);
    return () => {
      query.removeEventListener("change", update);
      window.removeEventListener("storage", storage);
    };
  }, []);
  useLayoutEffect(() => {
    if (ready) document.documentElement.dataset.motion = enabled ? "on" : "off";
  }, [enabled, ready]);
  const toggle = () => {
    if (reduced.current) return;
    optedOut.current = enabled;
    try {
      localStorage.setItem("trustcode-motion", enabled ? "off" : "on");
    } catch {
      /* The preference still applies in this session. */
    }
    setEnabled(!enabled);
  };
  return (
    <MotionContext.Provider value={{ enabled, ready, toggle }}>
      {children}
    </MotionContext.Provider>
  );
}
export const useExperienceMotion = () => useContext(MotionContext);
