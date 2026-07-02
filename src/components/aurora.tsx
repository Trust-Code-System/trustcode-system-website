import { cn } from "@/lib/utils";

/**
 * Ambient gradient light. Three blurred orbs — blueprint blue, cyan,
 * verified green (the brand's plan → live gradient) — drifting very slowly.
 * Purely decorative; animation stops under reduced motion.
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("aurora", className)}>
      <i />
      <i />
      <i />
    </div>
  );
}
