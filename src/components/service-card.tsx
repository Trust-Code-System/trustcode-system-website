import Link from "next/link";
import type { Service } from "@/content/services";
import { serviceIcons, ArrowRight } from "./icons";
import { ArrowUpRight } from "./icons";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = serviceIcons[service.icon as keyof typeof serviceIcons];
  return (
    <div className="card card-hover group flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-grid bg-paper text-blueprint">
          {Icon && <Icon className="h-5 w-5" />}
        </div>
      </div>
      <h3 className="display-h3 mt-5 text-[1.2rem]">{service.title}</h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-slate">
        {service.short}
      </p>
      <div className="mt-5 flex flex-1 flex-col justify-end gap-3 pt-1">
        <Link
          href={service.proof.href}
          className="inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-ink hover:text-blueprint"
        >
          <span className="font-mono text-[0.7rem] uppercase tracking-wider text-verified">
            proof
          </span>
          {service.proof.label}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
        <Link
          href={`/contact?service=${service.slug}`}
          className="inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-blueprint"
        >
          {service.ctaLabel}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
