"use client";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { useExperienceMotion } from "./motion-preferences";
import SplitText from "@/components/react-bits/SplitText/SplitText";
import BlurText from "@/components/react-bits/BlurText/BlurText";
import Magnet from "@/components/react-bits/Magnet/Magnet";
import SpotlightCard from "@/components/react-bits/SpotlightCard/SpotlightCard";
import AnimatedContent from "@/components/react-bits/AnimatedContent/AnimatedContent";
export { Magnet, SpotlightCard };
export const Orb = dynamic(() => import("@/components/react-bits/Orb/Orb"), {
  ssr: false,
});
export const Silk = dynamic(() => import("@/components/react-bits/Silk/Silk"), {
  ssr: false,
});
export function MotionTitle({
  text,
  className = "",
  tag = "h2",
}: {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3";
}) {
  const { enabled } = useExperienceMotion();
  const Tag = tag;
  if (!enabled) return <Tag className={className}>{text}</Tag>;
  return (
    <SplitText
      text={text}
      tag={tag}
      splitType="words"
      effect="rise"
      delay={45}
      duration={0.85}
      textAlign="left"
      className={className}
    />
  );
}
export function SoftText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const { enabled } = useExperienceMotion();
  return enabled ? (
    <BlurText text={text} delay={30} className={className} />
  ) : (
    <p className={className}>{text}</p>
  );
}
export function Enter({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { enabled } = useExperienceMotion();
  return enabled ? (
    <AnimatedContent
      distance={28}
      duration={0.7}
      delay={delay}
      className={className}
    >
      {children}
    </AnimatedContent>
  ) : (
    <div className={className}>{children}</div>
  );
}
