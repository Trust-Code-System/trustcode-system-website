import type { ReactNode } from "react";
import { MotionTitle, SoftText } from "./experience/bits";
import { Eyebrow } from "./section";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero-new relative overflow-hidden border-b border-grid">
      <div className="container-x relative py-16 sm:py-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <MotionTitle
          text={title}
          tag="h1"
          className="display-h1 mt-5 max-w-4xl"
        />
        {intro && <SoftText text={intro} className="lead mt-6 max-w-2xl" />}
        {children && <div className="mt-8">{children}</div>}
        <div className="hero-rule">
          <span>TRUSTCODE SYSTEM / {eyebrow.toUpperCase()}</span>
          <span>DESIGN IN EVERY DETAIL. ENGINEERING AT EVERY LAYER.</span>
        </div>
      </div>
    </section>
  );
}
