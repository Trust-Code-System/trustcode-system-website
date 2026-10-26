"use client";
import { motion } from "framer-motion";
import { useId, useState, type ReactNode } from "react";
import { useExperienceMotion } from "./experience/motion-preferences";
import { ChevronDown } from "./icons";
export function SoftDisclosure({
  open,
  id,
  children,
  className = "",
}: {
  open: boolean;
  id: string;
  children: ReactNode;
  className?: string;
}) {
  const { enabled } = useExperienceMotion();
  return (
    <motion.div
      id={id}
      className="soft-disclosure"
      aria-hidden={!open}
      inert={!open}
      initial={false}
      animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
      transition={{
        height: { duration: enabled ? 0.55 : 0, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: enabled ? 0.45 : 0, ease: "easeOut" },
      }}
      style={{ overflow: "hidden", pointerEvents: open ? "auto" : "none" }}
    >
      <div className={className}>{children}</div>
    </motion.div>
  );
}
export function SoftFaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="card p-0">
      <h3>
        <button
          type="button"
          className="soft-faq-trigger"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(!open)}
        >
          {question}
          <ChevronDown
            aria-hidden
            className={`h-4 w-4 shrink-0 text-slate ${open ? "soft-chevron-open" : ""}`}
          />
        </button>
      </h3>
      <SoftDisclosure id={id} open={open}>
        <p className="border-t border-grid px-5 py-4 text-[0.92rem] leading-relaxed text-slate">
          {answer}
        </p>
      </SoftDisclosure>
    </div>
  );
}
