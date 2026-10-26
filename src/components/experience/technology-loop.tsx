"use client";
import Image from "next/image";
import LogoLoop from "../react-bits/LogoLoop/LogoLoop";
import { technologyLogos } from "@/content/technology";
import { useExperienceMotion } from "./motion-preferences";
export function TechnologyLoop() {
  const { enabled } = useExperienceMotion();
  return (
    <section className="technology-loop" aria-label="Technologies we work with">
      <div className="experience-container technology-loop-heading">
        <span>THE TOOLS BEHIND THE WORK</span>
        <span>DESIGN · ENGINEER · SHIP</span>
      </div>
      <LogoLoop
        logos={technologyLogos.map((logo) => ({
          node: (
            <span className="technology-mark">
              <Image src={logo.src} width={32} height={32} alt={logo.name} />
            </span>
          ),
          title: logo.name,
        }))}
        logoHeight={64}
        gap={40}
        speed={enabled ? 28 : 0}
        labels="below"
        fadeOut
        fadeOutColor="#080e18"
        pauseOnHover
        intro={false}
        ariaLabel="Technology logos"
      />
      <p className="technology-loop-note">
        Selected technologies across our practice.
      </p>
    </section>
  );
}
