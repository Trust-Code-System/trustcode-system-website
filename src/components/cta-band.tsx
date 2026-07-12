import Link from "next/link";
import { Aurora } from "./aurora";
import { ArrowRight } from "./icons";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden border-y border-grid bg-surface">
      <div aria-hidden className="grid-bg absolute inset-0" />
      <Aurora />
      <div className="container-x relative py-16 sm:py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <p className="eyebrow">/ start here</p>
          <h2 className="display-h2">
            Have a project in mind? Get a free 30-minute consultation and a
            written proposal within 72 hours.
          </h2>
          <p className="lead max-w-xl">
            Tell us what you&apos;re building. No obligation, no jargon, just a
            clear plan and a price.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="btn-primary">
              Book a free consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/work" className="btn-secondary">
              See live work
            </Link>
          </div>
          <Link
            href="/estimate"
            className="inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-blueprint hover:underline"
          >
            Or scope it yourself, 60-second estimator
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
