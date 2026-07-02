import type { ReactNode } from "react";
import { Aurora } from "./aurora";
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
    <section className="relative overflow-hidden border-b border-grid">
      <div aria-hidden className="grid-bg absolute inset-0" />
      <Aurora />
      <div className="container-x relative py-16 sm:py-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="display-h1 mt-5 max-w-4xl">{title}</h1>
        {intro && <p className="lead mt-6 max-w-2xl">{intro}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
