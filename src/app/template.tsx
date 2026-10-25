"use client";
import { motion } from "framer-motion";
import { useExperienceMotion } from "@/components/experience/motion-preferences";
export default function Template({ children }: { children: React.ReactNode }) {
  const { enabled } = useExperienceMotion();
  return (
    <motion.div
      className="page-transition"
      initial={enabled ? { opacity: 0.1, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
