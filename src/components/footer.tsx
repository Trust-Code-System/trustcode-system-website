import Link from "next/link";
import { nav, site, social, stats } from "@/content/site";
import { team } from "@/content/team";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { Logo } from "./logo";
import { socialIcons, ArrowUp, ArrowRight, Mail, GitHub, LinkedIn, X } from "./icons";

const liveCount = stats.find((s) => s.label === "live products")?.value ?? "15+";

const companySocials = [
  { label: "GitHub", href: social.github, Icon: GitHub },
  { label: "LinkedIn", href: social.linkedin, Icon: LinkedIn },
  { label: "X", href: social.x, Icon: X },
].filter((s) => s.href);

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-grid bg-surface">
      <div aria-hidden className="grid-bg absolute inset-x-0 top-0 h-40" />

      <div className="container-x relative">
        {/* Brand band */}
        <div className="flex flex-col gap-8 py-14 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <Logo />
            <p className="mt-5 text-[0.98rem] leading-relaxed text-slate">
              Software you can stake your business on. Web platforms, cloud
              systems, AI features, and security. Shipped and kept live.
            </p>
            <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-grid bg-paper px-3.5 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verified opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-verified" />
              </span>
              <span className="font-mono text-[0.72rem] uppercase tracking-wider text-slate">
                {liveCount} products live
              </span>
            </div>

            {companySocials.length > 0 && (
              <div className="mt-6 flex items-center gap-2.5">
                {companySocials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.shortName} on ${label}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-grid text-slate transition-colors hover:border-blueprint hover:text-blueprint"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col items-start gap-3 lg:items-end">
            <Link
              href="/contact"
              className="btn-primary group"
            >
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 font-mono text-[0.8rem] text-slate hover:text-ink"
            >
              <Mail className="h-4 w-4" />
              {site.email}
            </a>
          </div>
        </div>

        {/* Columns */}
        <div className="grid gap-10 border-t border-grid py-12 md:grid-cols-12">
          <nav aria-label="Sitemap" className="md:col-span-2">
            <p className="eyebrow mb-5">/ navigate</p>
            <ul className="space-y-3">
              <li>
                <FooterLink href="/">Home</FooterLink>
              </li>
              {nav.map((i) => (
                <li key={i.href}>
                  <FooterLink href={i.href}>{i.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services" className="md:col-span-3">
            <p className="eyebrow mb-5">/ services</p>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <FooterLink href={`/services#${s.slug}`}>{s.title}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Industries" className="md:col-span-2">
            <p className="eyebrow mb-5">/ industries</p>
            <ul className="space-y-3">
              {industries.map((i) => (
                <li key={i.slug}>
                  <FooterLink href={`/industries/${i.slug}`}>
                    {i.name}
                  </FooterLink>
                </li>
              ))}
              <li>
                <FooterLink href="/estimate">Start a Project</FooterLink>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="eyebrow mb-5">/ team</p>
            <ul className="space-y-4">
              {team.map((f) => (
                <li
                  key={f.slug}
                  className="flex items-center justify-between gap-4"
                >
                  <Link
                    href={`/about#${f.slug}`}
                    className="group inline-flex items-center gap-2 text-[0.9rem] text-slate transition-colors hover:text-ink"
                  >
                    {f.name}
                    <span aria-hidden className="text-xs opacity-80">
                      {f.flag}
                    </span>
                  </Link>
                  <div className="flex items-center gap-1.5">
                    {f.links.map((l) => {
                      const Icon =
                        socialIcons[l.label as keyof typeof socialIcons];
                      if (!Icon) return null;
                      return (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${f.name} on ${l.label}`}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-grid text-slate transition-colors hover:border-blueprint hover:text-blueprint"
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </a>
                      );
                    })}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow mb-5">/ locations</p>
            <ul className="space-y-3">
              {site.locations.map((l) => (
                <li
                  key={l}
                  className="flex items-center gap-2.5 text-[0.9rem] text-slate"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-blueprint" />
                  {l}
                </li>
              ))}
              <li className="flex items-center gap-2.5 text-[0.9rem] text-slate">
                <span className="h-1.5 w-1.5 rounded-full bg-grid" />
                Remote, worldwide
              </li>
            </ul>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-blueprint hover:underline"
            >
              WhatsApp Business
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-grid">
        <div className="container-x flex flex-col items-start justify-between gap-3 py-5 sm:flex-row sm:items-center">
          <p className="text-[0.8rem] text-slate">© 2026 {site.name}.</p>
          <p className="font-mono text-[0.8rem] text-slate">
            Built. Shipped. <span className="text-verified">Still live.</span>
          </p>
          <a
            href="#main"
            className="group inline-flex items-center gap-1.5 font-mono text-[0.75rem] uppercase tracking-wider text-slate hover:text-ink"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 text-[0.9rem] text-slate transition-colors hover:text-ink"
    >
      <span className="h-px w-0 bg-blueprint transition-all duration-200 group-hover:w-3" />
      {children}
    </Link>
  );
}
