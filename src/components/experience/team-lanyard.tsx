"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Founder } from "@/content/team";
import { useExperienceMotion } from "./motion-preferences";
const Lanyard = dynamic(() => import("../react-bits/Lanyard/Lanyard"), {
  ssr: false,
});
export function TeamLanyard({
  person,
}: {
  person: Pick<Founder, "name" | "image" | "slug">;
}) {
  const { enabled } = useExperienceMotion();
  const root = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [awake, setAwake] = useState(true);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "40px", threshold: 0.02 },
    );
    if (root.current) observer.observe(root.current);
    const visibility = () => setAwake(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  const active = enabled && visible && awake && Boolean(person.image);
  useEffect(() => {
    if (!active) setReady(false);
  }, [active]);
  return (
    <figure
      ref={root}
      className={`team-lanyard ${active && ready ? "lanyard-ready" : ""}`}
      aria-label={`${person.name} profile badge`}
    >
      <div className="lanyard-photo-fallback">
        {person.image ? (
          <Image
            src={person.image}
            alt={person.name}
            fill
            sizes="(max-width:640px) 85vw,30vw"
            className="object-cover object-top"
          />
        ) : (
          <span>{person.name}</span>
        )}
      </div>
      {active && (
        <Lanyard
          frontImage={person.image}
          backImage="/trustcode-system-logo-dark.png"
          cardColor="#12213a"
          strapColor="#193c73"
          strapWidth={0.5}
          metal="silver"
          size={0.68}
          strapLength={0.45}
          finish="matte"
          damping={0.8}
          breeze={0.15}
          intro={false}
          onReady={() => setReady(true)}
          className="trustcode-lanyard-scene"
        />
      )}
      <figcaption>
        {active ? "Drag to move · Tap to flip" : "The people behind TrustCode"}
      </figcaption>
    </figure>
  );
}
