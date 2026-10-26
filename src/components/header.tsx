"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./logo";
import PillNav from "./react-bits/PillNav/PillNav";
import Magnet from "./react-bits/Magnet/Magnet";
import SquishSwitch from "./react-bits/SquishSwitch/SquishSwitch";
import { useExperienceMotion } from "./experience/motion-preferences";
const links = [
  { label: "Work", href: "/work" },
  { label: "Expertise", href: "/services" },
  { label: "Studio", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Insights", href: "/insights" },
];
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { enabled, toggle } = useExperienceMotion();
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    let previous = window.scrollY;
    let accumulated = 0;
    let scheduled = false;
    const update = () => {
      const current = window.scrollY;
      const delta = current - previous;
      if (current < 80 || open) {
        setHidden(false);
        accumulated = 0;
      } else if (Math.abs(delta) > 1) {
        accumulated =
          Math.sign(delta) === Math.sign(accumulated)
            ? accumulated + delta
            : delta;
        if (accumulated > 16) setHidden(true);
        if (accumulated < -10) setHidden(false);
      }
      previous = current;
      scheduled = false;
    };
    const scroll = () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, [open]);
  useEffect(() => setHidden(false), [pathname, open]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  return (
    <header
      className={`experience-header ${hidden && !open ? "header-away" : ""}`}
      onFocusCapture={() => setHidden(false)}
    >
      <div className="header-inner">
        <Link
          href="/"
          aria-label="TrustCode System home"
          className="brand-home"
        >
          <Logo />
        </Link>
        <div className="desktop-nav">
          <PillNav
            items={links}
            activeHref={pathname}
            linkComponent={Link}
            surface="none"
            itemStyle="plain"
            hoverEffect="fill"
            highlightColor="#b8d0ff"
            highlightTextColor="#0a1224"
            textColor="#c2c7d2"
            collapse="never"
            intro={false}
            ariaLabel="Primary navigation"
          />
        </div>
        <div className="header-actions">
          <SquishSwitch
            checked={enabled}
            onChange={toggle}
            width={40}
            height={23}
            ariaLabel="Motion effects"
            label="Motion"
            trackColor="#20304a"
            trackOnColor="#b8d0ff"
            thumbOnColor="#15213a"
            className="header-motion-control"
          />
          <Magnet disabled={!enabled} magnetStrength={4} maxOffset={5}>
            <Link className="header-cta" href="/contact">
              Let’s talk <span aria-hidden>↗</span>
            </Link>
          </Magnet>
          <button
            ref={menuButton}
            className="mobile-menu-toggle"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? "×" : "☰"}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-navigation"
          aria-label="Mobile navigation"
        >
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname === l.href ? "page" : undefined}
            >
              <span>0{i + 1}</span>
              {l.label}
              <span aria-hidden>↗</span>
            </Link>
          ))}
          <Link href="/contact">
            <span>06</span>Start a project<span aria-hidden>↗</span>
          </Link>
        </nav>
      )}
    </header>
  );
}
