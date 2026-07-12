import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="grid-bg absolute inset-0" />
      <div className="container-x relative flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-mono text-[0.8rem] uppercase tracking-[0.2em] text-verified">
          status: 404
        </p>
        <h1 className="display-h1 mt-5 text-[clamp(2.5rem,8vw,5rem)]">404</h1>
        <p className="mt-4 max-w-md font-display text-[1.4rem] font-semibold tracking-tight">
          This route isn&apos;t deployed. Everything else is.
        </p>
        <p className="lead mt-3 max-w-md">
          The page you were looking for doesn&apos;t exist, but our live work
          does. Take a look.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-primary">
            Back home
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/work" className="btn-secondary">
            See live work
          </Link>
        </div>
      </div>
    </section>
  );
}
