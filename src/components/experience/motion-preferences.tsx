"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
const MotionContext = createContext({ enabled: false, ready: false, toggle: () => {} });
export function MotionPreferences({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      let paused = false;
      try {
        paused = localStorage.getItem("trustcode-motion") === "off";
      } catch {
        /* Storage can be unavailable in private sessions. */
      }
      setEnabled(!query.matches && !paused);
      setReady(true);
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.motion = enabled ? "on" : "off";
  }, [enabled, ready]);
  const toggle = () =>
    setEnabled((value) => {
      try {
        localStorage.setItem("trustcode-motion", value ? "off" : "on");
      } catch {
        /* The preference still applies for this session. */
      }
      return !value;
    });
  return (
    <MotionContext.Provider value={{ enabled, ready, toggle }}>
      {children}
    </MotionContext.Provider>
  );
}
export const useExperienceMotion = () => useContext(MotionContext);
