"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { WhatsApp } from "./icons";
import { cn } from "@/lib/utils";

/**
 * Sticky WhatsApp chat button. Stays out of the way until the visitor has
 * scrolled past the hero, then slides in bottom-right.
 */
export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setVisible(window.scrollY > 480);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with TrustCode System on WhatsApp"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed bottom-5 right-5 z-40 inline-flex items-center justify-center rounded-full bg-[#25d366] p-3.5 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus-visible:outline-2 print:hidden",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <WhatsApp className="h-6 w-6" />
      <span
        aria-hidden
        className="absolute right-0.5 top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-verified animate-pulse-dot"
      />
    </a>
  );
}
