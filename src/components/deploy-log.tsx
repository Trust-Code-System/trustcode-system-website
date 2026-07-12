"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Entry = {
  verb: string;
  target: string;
  href?: string;
  status: string;
  live?: boolean;
};

const entries: Entry[] = [
  { verb: "deployed", target: "helpingtribeacademy.com", href: "https://helpingtribeacademy.com", status: "● LIVE", live: true },
  { verb: "deployed", target: "thethesisdesk.xyz", href: "https://thethesisdesk.xyz", status: "● LIVE", live: true },
  { verb: "deployed", target: "atlas-hr.vercel.app", href: "https://atlas-hr-fq24.vercel.app", status: "● LIVE", live: true },
  { verb: "deployed", target: "airtime-vault.vercel.app", href: "https://airtime-vault-plhc.vercel.app", status: "● LIVE", live: true },
  { verb: "secured", target: "SOC playbook · 25+ detections", status: "✓ MITRE", live: false },
  { verb: "shipped", target: "49 third-party integrations on AWS", status: "✓ CDK", live: false },
];

function Line({ entry, typed }: { entry: Entry; typed: boolean }) {
  const verbCol = entry.verb.padEnd(9, " ");
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 whitespace-pre">
      <span className="text-verified">✓</span>
      <span className="text-slate">{verbCol}</span>
      {entry.href ? (
        <a
          href={entry.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink underline-offset-4 hover:text-blueprint hover:underline"
        >
          {entry.target}
        </a>
      ) : (
        <span className="text-ink">{entry.target}</span>
      )}
      {typed && (
        <span
          className={
            entry.live
              ? "ml-auto text-verified" + " animate-pulse-dot"
              : "ml-auto text-slate"
          }
        >
          {entry.status}
        </span>
      )}
    </div>
  );
}

export function DeployLog() {
  const reduce = useReducedMotion();
  // Always start at 0 so server HTML matches the first client paint.
  // useReducedMotion() can differ between SSR and the browser.
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduce) {
      setCount(entries.length);
      return;
    }
    if (count >= entries.length) return;
    const t = setTimeout(() => setCount((c) => c + 1), count === 0 ? 350 : 520);
    return () => clearTimeout(t);
  }, [count, reduce]);

  return (
    <div
      className="card overflow-hidden font-mono text-[0.8rem] leading-relaxed shadow-[0_1px_0_var(--grid)] sm:text-[0.85rem]"
      aria-label="Live deployment log of TrustCode products"
    >
      <div className="flex items-center gap-2 border-b border-grid bg-paper px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-grid" />
          <span className="h-2.5 w-2.5 rounded-full bg-grid" />
          <span className="h-2.5 w-2.5 rounded-full bg-verified" />
        </span>
        <span className="ml-1 text-[0.7rem] uppercase tracking-[0.2em] text-slate">
          deploy.log
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[0.7rem] text-verified">
          <span className="h-1.5 w-1.5 rounded-full bg-verified animate-pulse-dot" />
          live
        </span>
      </div>
      <div className="space-y-1.5 px-4 py-4">
        {entries.slice(0, count).map((e) => (
          <Line key={e.target} entry={e} typed />
        ))}
        {count < entries.length && (
          <div className="flex items-center gap-2 text-slate">
            <span className="text-verified">✓</span>
            <span className="inline-block h-3.5 w-2 animate-blink bg-blueprint align-middle" />
          </div>
        )}
        {count >= entries.length && (
          <div className="flex items-center gap-2 pt-1 text-slate">
            <span className="text-blueprint">$</span>
            <span className="inline-block h-3.5 w-2 animate-blink bg-blueprint align-middle" />
          </div>
        )}
      </div>
    </div>
  );
}
