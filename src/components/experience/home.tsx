"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { redesign } from "@/content/redesign";
import { serviceGroups } from "@/content/services";
import { team } from "@/content/team";
import { steps } from "@/content/process";
import {
  Enter,
  Magnet,
  MotionTitle,
  Orb,
  Silk,
  SoftText,
  SpotlightCard,
} from "./bits";
import { HeroAtmosphere } from "./hero-atmosphere";
import { ProjectShowcase } from "./project-showcase";
import { TeamPortrait } from "./team-portrait";
import { TechnologyLoop } from "./technology-loop";
import { StarLink } from "../star-link";
import { useExperienceMotion } from "./motion-preferences";
import { priceFor, formatFrom, commercialTerms } from "@/lib/pricing";
import { stats, site } from "@/content/site";
import { ProjectTypeCards } from "../project-type-cards";
import { FaqSection } from "../faq";
import { BookingLink } from "../booking-link";
import FoldText from "../react-bits/FoldText/FoldText";
import { SoftDisclosure } from "../soft-disclosure";
import ScrollReveal from "../react-bits/ScrollReveal/ScrollReveal";
function Ambient({ kind }: { kind: "orb" | "silk" }) {
  const { enabled } = useExperienceMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      rootMargin: "150px",
    });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} aria-hidden className={`ambient ambient-${kind}`}>
      {enabled &&
        visible &&
        (kind === "orb" ? (
          <Orb
            hue={210}
            hoverIntensity={0.35}
            rotateOnHover
            forceHoverState={false}
          />
        ) : (
          <Silk color="#4269bb" speed={3} scale={0.8} />
        ))}
    </div>
  );
}
export function HomeExperience() {
  const { enabled, ready } = useExperienceMotion();
  const [entranceDone, setEntranceDone] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    const update = () => setEntranceDone(root.dataset.entrance !== "pending");
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-entrance"],
    });
    return () => observer.disconnect();
  }, []);
  const [activeStep, setActiveStep] = useState(0);
  const [serviceOpen, setServiceOpen] = useState<number | null>(null);
  return (
    <div className="home-experience">
      <section className="hero-stage">
        <HeroAtmosphere />
        <div className="hero-noise" aria-hidden />
        <div className="hero-orbit" aria-hidden>
          <i />
          <i />
          <i />
          <span className="orbit-core">↗</span>
        </div>
        <div className="experience-container hero-content">
          <h1
            className="hero-heading"
            data-hero-ready={
              ready && (!enabled || entranceDone) ? "true" : undefined
            }
          >
            {enabled && entranceDone ? (
              <FoldText
                text={"Software you can\nstake your\nbusiness on."}
                splitBy="line"
                hinge="top"
                foldStyle="paper"
                duration={1.15}
                delay={0.35}
                stagger={0.14}
                foldAngle={85}
                fontSize="inherit"
                fontWeight="inherit"
                creaseShading={0.3}
                className="hero-fold"
              />
            ) : (
              <>
                <span>Software you can</span>
                <span>stake your</span>
                <span className="hero-heading-last">
                  business on<span className="blue-period">.</span>
                </span>
              </>
            )}
          </h1>
          <div className="hero-bottom">
            <SoftText className="hero-intro" text={redesign.intro} />
            <div className="hero-links">
              <Magnet disabled={!enabled} maxOffset={7}>
                <StarLink className="button-solid" href="/estimate">
                  Start a project <span aria-hidden>↗</span>
                </StarLink>
              </Magnet>
              <BookingLink />
              <Link className="text-action" href="#selected-work">
                Explore our work <span aria-hidden>↓</span>
              </Link>
            </div>
          </div>
          <div className="hero-footnote">
            <span>STRATEGY → DESIGN → ENGINEERING</span>
            <span className="hero-location">{site.locationStatement}</span>
            <a
              href="#intro"
              aria-label="Scroll to discover"
              className="scroll-disc"
            >
              ↓
            </a>
          </div>
        </div>
      </section>
      <section
        className="experience-container py-12"
        aria-labelledby="home-start-title"
      >
        <ul className="grid gap-4 text-[0.9rem] leading-relaxed text-ink sm:grid-cols-2 lg:grid-cols-4">
          <li>You own the code and accounts.</li>
          <li>Payments follow agreed milestones.</li>
          <li>A demo every week during the build.</li>
          <li>Clear written scope and staging visibility.</li>
        </ul>
        <p className="mb-10 mt-4 text-[0.78rem] leading-relaxed text-slate">
          Scope, payment terms and handover are agreed in your written proposal.
        </p>
        <h2 id="home-start-title" className="experience-h2">
          What are you building?
        </h2>
        <p className="section-copy">
          Choose a starting point. We’ll help you shape the brief.
        </p>
        <ProjectTypeCards />
        <div className="card mt-6 flex flex-wrap items-center justify-between gap-4 p-5 text-[0.9rem]">
          <p>
            Websites {formatFrom(priceFor("landing-page")!.ngn!, true)} · Online
            stores {formatFrom(priceFor("online-store")!.ngn!, true)} · Web apps{" "}
            {formatFrom(priceFor("app-platform")!.ngn!, true)}
          </p>
          <Link className="text-action" href="/services#pricing">
            See all prices ↗
          </Link>
        </div>
        <p className="mt-3 text-[0.78rem] leading-relaxed text-slate">
          {commercialTerms.disclaimer}
        </p>
      </section>
      <TechnologyLoop />
      <section className="experience-container manifesto-section" id="intro">
        <div className="section-index">
          <span>01 / THE TRUSTCODE STANDARD</span>
          <span>ENGINEERED WITH INTENT</span>
        </div>
        <div className="manifesto-grid">
          <div className="small-label">
            <span className="status-dot" /> A better kind of build.
          </div>
          <div>
            {enabled ? (
              <ScrollReveal
                mode="enter"
                effect="rise"
                baseOpacity={0.3}
                containerClassName="manifesto-text"
                textClassName="manifesto-words"
              >
                {redesign.manifesto}
              </ScrollReveal>
            ) : (
              <h2 className="manifesto-text">{redesign.manifesto}</h2>
            )}
            <p className="manifesto-description">
              We connect product thinking, design, cloud and security. One team
              that understands the whole picture, and stays with you beyond
              launch.
            </p>
          </div>
        </div>
        <div className="new-stats">
          {stats.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>
      <ProjectShowcase />
      <section className="expertise-section experience-container">
        <div className="section-index">
          <span>03 / CONNECTED EXPERTISE</span>
          <span>EVERY LAYER, CONSIDERED</span>
        </div>
        <div className="section-title-row">
          <MotionTitle text={redesign.serviceTitle} className="experience-h2" />
          <Link href="/services" className="text-action">
            Explore our expertise ↗
          </Link>
        </div>
        <div className="expertise-grid">
          {serviceGroups.map((s, i) => (
            <SpotlightCard
              key={s.id}
              className={`expertise-card expertise-${i}`}
              spotlightColor="rgba(90,140,255,.22)"
              borderGlow={0.6}
            >
              <div className="service-card-top">
                <span>0{i + 1}</span>
                <span className="service-code">{s.title.toUpperCase()}</span>
              </div>
              <div
                className={`service-art art-${i}`}
                style={{ "--art-color": s.color } as CSSProperties}
                aria-hidden
              >
                <span>{s.glyph}</span>
                <i />
                <i />
                <i />
              </div>
              <h3>{s.title}</h3>
              <p className="service-problem">{s.problem}</p>
              <p>{s.outcome}</p>
              <button
                className="service-disclosure"
                type="button"
                onClick={() => setServiceOpen(serviceOpen === i ? null : i)}
                aria-expanded={serviceOpen === i}
                aria-controls={`service-details-${i}`}
              >
                What’s included{" "}
                <span aria-hidden>{serviceOpen === i ? "−" : "+"}</span>
              </button>
              <SoftDisclosure
                open={serviceOpen === i}
                id={`service-details-${i}`}
                className="service-expanded"
              >
                <ul>
                  {s.includes.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <Link href={`/services#${s.id}`}>Explore this service ↗</Link>
              </SoftDisclosure>
            </SpotlightCard>
          ))}
        </div>
      </section>
      <section className="process-experience">
        <div className="experience-container">
          <div className="section-index">
            <span>04 / THE WAY WE WORK</span>
            <Link href="/process">INSIDE THE PROCESS ↗</Link>
          </div>
          <div className="process-layout">
            <div>
              <MotionTitle
                text={redesign.processTitle}
                className="experience-h2"
              />
              <p className="section-copy">
                Clear milestones. Real staging links. A demo every week. You see
                the product take shape, and you always know what’s next.
              </p>
              <div className="process-orb">
                <Ambient kind="orb" />
                <span>
                  IDEA<span aria-hidden>→</span>IMPACT
                </span>
              </div>
            </div>
            <div className="process-accordion">
              {steps.map((s, i) => (
                <div
                  className={`process-item ${activeStep === i ? "is-active" : ""}`}
                  key={s.n}
                >
                  <h3>
                    <button
                      aria-expanded={activeStep === i}
                      aria-controls={`process-panel-${i}`}
                      onClick={() => setActiveStep(i)}
                    >
                      <span className="step-number">{s.n}</span>
                      <span>{s.title}</span>
                      <span aria-hidden>{activeStep === i ? "−" : "+"}</span>
                    </button>
                  </h3>
                  <SoftDisclosure
                    id={`process-panel-${i}`}
                    open={activeStep === i}
                  >
                    <p>{s.summary}</p>
                    <div className="step-progress" aria-hidden>
                      <span />
                    </div>
                  </SoftDisclosure>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="studio-section experience-container">
        <div className="section-index">
          <span>05 / THE PEOPLE BEHIND THE SYSTEM</span>
          <Link href="/about">MEET THE STUDIO ↗</Link>
        </div>
        <div className="section-title-row">
          <MotionTitle text={redesign.teamTitle} className="experience-h2" />
          <p>
            Good people. Deep expertise.
            <br />A shared commitment to getting it right.
          </p>
        </div>
        <div className="team-experience">
          {team.map((person, i) => (
            <Enter key={person.slug} delay={i * 0.06}>
              <article className="team-portrait-card">
                <TeamPortrait person={person} />
                <span className="person-index">
                  0{i + 1} / {person.flag}
                </span>
                <h3>
                  <Link href={`/about#${person.slug}`}>{person.name}</Link>
                </h3>
                <p>{person.role}</p>
              </article>
            </Enter>
          ))}
        </div>
      </section>
      <FaqSection />
      <section className="closing-experience">
        <Ambient kind="silk" />
        <div className="experience-container relative">
          <p className="small-label">THE NEXT CHAPTER STARTS HERE</p>
          <MotionTitle text={redesign.ctaTitle} className="closing-title" />
          <p className="section-copy">{redesign.ctaIntro}</p>
          <Magnet disabled={!enabled} maxOffset={8}>
            <StarLink href="/estimate" className="button-solid">
              Start a project <span aria-hidden>↗</span>
            </StarLink>
          </Magnet>
          <BookingLink className="button-solid mt-4" />
        </div>
      </section>
    </div>
  );
}
