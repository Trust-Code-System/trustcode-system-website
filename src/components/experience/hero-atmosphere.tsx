"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useExperienceMotion } from "./motion-preferences";
const DotField = dynamic(() => import("../react-bits/DotField/DotField"), {
  ssr: false,
});
const DotGrid = dynamic(() => import("../react-bits/DotGrid/DotGrid"), {
  ssr: false,
});
const MicroSlats = dynamic(
  () => import("../react-bits/MicroSlats/MicroSlats"),
  { ssr: false },
);
export function HeroAtmosphere() {
  const { enabled } = useExperienceMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [wide, setWide] = useState(false);
  const [awake, setAwake] = useState(true);
  useEffect(() => {
    const media = matchMedia("(min-width: 800px)");
    const resize = () => setWide(media.matches);
    resize();
    media.addEventListener("change", resize);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.03 },
    );
    if (ref.current) observer.observe(ref.current);
    const visibility = () => setAwake(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      media.removeEventListener("change", resize);
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  const active = enabled && visible && awake;
  return (
    <div ref={ref} className="hero-atmosphere" aria-hidden>
      <div className="hero-static-lattice" />
      <div className="hero-static-slats" />
      {active && (
        <>
          <div className="hero-dot-grid">
            <DotGrid
              dotSize={2}
              gap={24}
              baseColor="#36547c"
              activeColor="#c3e3ff"
              proximity={130}
              strength={0.32}
              glow={0.5}
              opacity={0.52}
              dpr={1}
              intro={false}
            />
          </div>
          {wide && (
            <>
              <div className="hero-dot-field">
                <DotField
                  dotRadius={1.4}
                  dotSpacing={20}
                  pattern="hex"
                  gradientFrom="#517fb6"
                  gradientTo="#b9e1ff"
                  baseOpacity={0.35}
                  glowIntensity={0.5}
                  waveAmplitude={12}
                  speed={0.32}
                  opacity={0.58}
                  maxDevicePixelRatio={1}
                  intro={false}
                  sparkle={false}
                />
              </div>
              <div className="hero-micro-slats">
                <MicroSlats
                  preset="signal"
                  color="#3f6ba8"
                  glintColor="#9ad6ff"
                  backgroundColor="#09121f"
                  speed={0.32}
                  slatWidth={4}
                  slatHeight={1.2}
                  gap={4}
                  interactive={false}
                  intro={false}
                  glint={0.45}
                  fog={0.5}
                />
              </div>
            </>
          )}
        </>
      )}
      <div className="hero-atmosphere-shade" />
    </div>
  );
}
