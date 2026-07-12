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
          <h2 className="display-h2">Let&apos;s scope your project properly.</h2>
          <p className="lead max-w-xl">
            Share your objectives, required features and timeline. Our team will
            review the project and provide a tailored proposal.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="btn-primary">
              Start a Project
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/estimate" className="btn-secondary">
              Request a Consultation
            </Link>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-blueprint hover:underline"
          >
            See live work
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
