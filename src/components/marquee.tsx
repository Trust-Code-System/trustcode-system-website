/**
 * Infinite horizontal marquee (pure CSS). Content is duplicated once and the
 * track translates -50% for a seamless loop; edges are masked out. Pauses on
 * hover, freezes under reduced motion.
 */
export function Marquee({ items }: { items: readonly string[] }) {
  const row = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className="flex items-center gap-10 pr-10"
    >
      {items.map((item) => (
        <span
          key={item}
          className="flex items-center gap-10 whitespace-nowrap font-mono text-[0.72rem] uppercase tracking-[0.22em] text-slate"
        >
          {item}
          <span aria-hidden className="h-1 w-1 rounded-full bg-verified" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee" aria-label={items.join(", ")}>
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
