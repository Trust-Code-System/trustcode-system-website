"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import dynamic from "next/dynamic";
import CardNav from "./react-bits/CardNav/CardNav";
import { StarLink, CardNavAnchor } from "./star-link";
import Magnet from "./react-bits/Magnet/Magnet";
import SquishSwitch from "./react-bits/SquishSwitch/SquishSwitch";
import { useExperienceMotion } from "./experience/motion-preferences";
import {
  navigationLinks as links,
  navigationCards as cards,
} from "@/content/navigation";
const GooeyNav = dynamic(() => import("./react-bits/GooeyNav/GooeyNav"), {
  ssr: false,
});
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { enabled, toggle } = useExperienceMotion();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    let previous = window.scrollY;
    let accumulated = 0;
    let frame = 0;
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
      frame = 0;
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", scroll);
      cancelAnimationFrame(frame);
    };
  }, [open]);
  useEffect(() => setHidden(false), [pathname, open]);
  useEffect(() => {
    const media = matchMedia("(min-width: 961px)");
    const resize = () => {
      setDesktop(media.matches);
      if (media.matches) setOpen(false);
    };
    resize();
    media.addEventListener("change", resize);
    return () => media.removeEventListener("change", resize);
  }, []);
  const motionControl = (mobile = false) => (
    <SquishSwitch
      checked={enabled}
      onChange={toggle}
      width={40}
      height={23}
      ariaLabel="Motion effects"
      label={mobile ? undefined : "Motion"}
      trackColor="#20304a"
      trackOnColor="#b8d0ff"
      thumbOnColor="#15213a"
      className="header-motion-control"
    />
  );
  const activeIndex = links.findIndex((link) =>
    link.href === "/" ? pathname === "/" : pathname.startsWith(link.href),
  );
  return (
    <header
      className={`experience-header ${hidden && !open ? "header-away" : ""}`}
      onFocusCapture={() => setHidden(false)}
    >
      <div className="header-inner desktop-header-inner">
        <Link
          href="/"
          aria-label="TrustCode System home"
          className="brand-home"
        >
          <Logo />
        </Link>
        <div className="desktop-nav">
          {desktop ? (
            <GooeyNav
              items={links}
              activeIndex={activeIndex}
              linkComponent={CardNavAnchor}
              ariaLabel="Primary navigation"
              theme="dark"
              color="#b8d0ff"
              activeTextColor="#10213a"
              size="sm"
              frame={false}
              animationTime={480}
              particleCount={10}
              timeVariance={80}
              spread={28}
              gooeyness={0.55}
              wobble={0.22}
              motionEnabled={enabled}
              hoverEffect={enabled}
            />
          ) : (
            <nav aria-label="Primary navigation" className="desktop-nav-static">
              {links.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={i === activeIndex ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
        <div className="header-actions">
          {motionControl()}
          <Magnet disabled={!enabled} maxOffset={5}>
            <StarLink className="header-cta" href="/contact">
              Let’s talk <span aria-hidden>↗</span>
            </StarLink>
          </Magnet>
        </div>
      </div>
      <div className="mobile-card-shell">
        <CardNav
          logo="/trustcode-system-logo-dark.png"
          logoAlt="TrustCode System home"
          logoHref="/"
          items={cards}
          cta={{ label: "Let’s talk about your project ↗", href: "/contact" }}
          theme="dark"
          surface="solid"
          openOn="click"
          cardEffect="rise"
          stagger={0.09}
          bounce={0.03}
          speed={0.85}
          cardHeight={130}
          accentColor="#b8d0ff"
          menuLabel={false}
          ctaInContent
          intro={false}
          open={open}
          onOpenChange={setOpen}
          linkComponent={CardNavAnchor}
          ariaLabel="Mobile navigation"
          motionEnabled={enabled}
          className="trustcode-card-nav"
        />
        <div className="mobile-card-motion">{motionControl(true)}</div>
      </div>
    </header>
  );
}
