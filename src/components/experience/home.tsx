"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { redesign, serviceVisuals } from "@/content/redesign";
import { services } from "@/content/services";
import {
  projects,
  homepagePreviewSlugs,
  PROOF_LABELS,
} from "@/content/portfolio";
import { team } from "@/content/team";
import { steps } from "@/content/process";
import {
  Enter,
  LightRays,
  Magnet,
  MotionTitle,
  Orb,
  Silk,
  SoftText,
  SpotlightCard,
} from "./bits";
import { useExperienceMotion } from "./motion-preferences";
import CountUp from "../react-bits/CountUp/CountUp";
import DecryptedText from "../react-bits/DecryptedText/DecryptedText";
import RotatingText from "../react-bits/RotatingText/RotatingText";
import LogoLoop from "../react-bits/LogoLoop/LogoLoop";
import StarBorder from "../react-bits/StarBorder/StarBorder";
import TiltedCard from "../react-bits/TiltedCard/TiltedCard";
import BorderGlow from "../react-bits/BorderGlow/BorderGlow";
import ScrollReveal from "../react-bits/ScrollReveal/ScrollReveal";
import GlareHover from "../react-bits/GlareHover/GlareHover";
import { ProjectThumb } from "../project-thumb";
const featured = homepagePreviewSlugs
  .map((s) => projects.find((p) => p.slug === s))
  .filter(Boolean) as typeof projects;
function Ambient({ kind }: { kind: "rays" | "orb" | "silk" }) {
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
        (kind === "rays" ? (
          <LightRays
            raysOrigin="top-center"
            raysColor="#7ba7ff"
            intensity={1.1}
            rayLength={1.5}
            lightSpread={0.75}
            maxDevicePixelRatio={1.3}
          />
        ) : kind === "orb" ? (
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
  const { enabled } = useExperienceMotion();
  const [activeStep, setActiveStep] = useState(0);
  const [serviceOpen, setServiceOpen] = useState<number | null>(null);
  return (
    <div className="home-experience">
      <section className="hero-stage">
        <Ambient kind="rays" />
        <div className="hero-noise" aria-hidden />
        <div className="hero-orbit" aria-hidden>
          <i />
          <i />
          <i />
          <span className="orbit-core">↗</span>
        </div>
        <div className="experience-container hero-content">
          <div className="hero-kicker">
            <span className="status-dot" />
            {enabled ? (
              <DecryptedText
                text={redesign.eyebrow}
                animateOn="view"
                speed={25}
                maxIterations={7}
              />
            ) : (
              redesign.eyebrow
            )}
          </div>
          <h1 className="hero-heading">
            <span>Software you can</span>
            <span>stake your</span>
            <span className="hero-heading-last">
              business on<span className="blue-period">.</span>
            </span>
          </h1>
          <div className="hero-bottom">
            <SoftText className="hero-intro" text={redesign.intro} />
            <div className="hero-links">
              <Magnet disabled={!enabled} maxOffset={7}>
                <Link className="button-solid" href="/contact">
                  Build something great <span aria-hidden>↗</span>
                </Link>
              </Magnet>
              <Link className="text-action" href="#selected-work">
                Explore our work <span aria-hidden>↓</span>
              </Link>
            </div>
          </div>
          <div className="hero-footnote">
            <span>STRATEGY → DESIGN → ENGINEERING</span>
            <span className="hero-location">
              LAGOS, NIGERIA · WORKING WORLDWIDE
            </span>
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
      <section className="capability-loop" aria-label="Our disciplines">
        <LogoLoop
          logos={redesign.disciplines.map((text, i) => ({
            node: (
              <span className="discipline-word">
                <span aria-hidden>{["✳", "⌘", "◈", "↗", "✦", "◇"][i]}</span>
                {text}
              </span>
            ),
            title: text,
          }))}
          speed={enabled ? 35 : 0}
          logoHeight={22}
          gap={72}
          fadeOut
          fadeOutColor="var(--paper)"
          pauseOnHover
        />
      </section>
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
          <div>
            <strong>
              {enabled ? <CountUp to={15} suffix="+" duration={1.6} /> : "15+"}
            </strong>
            <span>Products in the portfolio</span>
          </div>
          <div>
            <strong>
              {enabled ? <CountUp to={6} suffix="+" duration={1.5} /> : "6+"}
            </strong>
            <span>Industries explored</span>
          </div>
          <div>
            <strong>End to end</strong>
            <span>From discovery to ongoing support</span>
          </div>
          <div>
            <strong>
              {enabled ? <CountUp to={24} suffix="h" duration={1.6} /> : "24h"}
            </strong>
            <span>Typical response window</span>
          </div>
        </div>
      </section>
      <section id="selected-work" className="work-section">
        <div className="experience-container">
          <div className="section-index">
            <span>02 / SELECTED WORK</span>
            <Link href="/work">THE FULL PORTFOLIO ↗</Link>
          </div>
          <div className="section-title-row">
            <MotionTitle text={redesign.workTitle} className="experience-h2" />
            <p>
              Real challenges. Considered solutions.
              <br />
              Take a closer look at the work.
            </p>
          </div>
          <div className="featured-grid">
            {featured.slice(0, 4).map((p, i) => (
              <Enter key={p.slug} delay={(i % 2) * 0.08}>
                <article className={`featured-project project-color-${i}`}>
                  <Link
                    href={`/work/${p.slug}`}
                    className="project-visual-link"
                    aria-label={`Explore ${p.title} case study`}
                  >
                    <TiltedCard
                      containerWidth="100%"
                      containerHeight="100%"
                      imageWidth="100%"
                      imageHeight="100%"
                      rotateAmplitude={enabled ? 4 : 0}
                      scaleOnHover={1.015}
                      showTooltip={false}
                      glare={0.1}
                    >
                      <div className="project-browser">
                        <div className="browser-bar">
                          <span>● ● ●</span>
                          <span>{p.title}</span>
                          <span>↗</span>
                        </div>
                        <ProjectThumb project={p} />
                      </div>
                    </TiltedCard>
                    <span className="project-open" aria-hidden>
                      ↗
                    </span>
                  </Link>
                  <div className="project-details">
                    <div>
                      <span className="project-number">
                        0{i + 1} / {p.sector}
                      </span>
                      <h3>
                        <Link href={`/work/${p.slug}`}>{p.title}</Link>
                      </h3>
                      <p>{p.tagline}</p>
                    </div>
                    <span className="proof-tag">
                      {PROOF_LABELS[p.proofType]}
                    </span>
                  </div>
                </article>
              </Enter>
            ))}
          </div>
          <div className="work-footer">
            <span>
              Product, infrastructure and security projects, with clear evidence
              for each.
            </span>
            <Link href="/work" className="text-action">
              Discover all work <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </section>
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
          {services.map((s, i) => (
            <SpotlightCard
              key={s.slug}
              className={`expertise-card expertise-${i}`}
              spotlightColor="rgba(90,140,255,.22)"
              borderGlow={0.6}
            >
              <div className="service-card-top">
                <span>0{i + 1}</span>
                <span className="service-code">{serviceVisuals[i].label}</span>
              </div>
              <div
                className={`service-art art-${i}`}
                style={
                  { "--art-color": serviceVisuals[i].color } as CSSProperties
                }
                aria-hidden
              >
                <span>{serviceVisuals[i].glyph}</span>
                <i />
                <i />
                <i />
              </div>
              <h3>{s.title}</h3>
              <p>{s.short}</p>
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
              {serviceOpen === i && (
                <div className="service-expanded" id={`service-details-${i}`}>
                  <ul>
                    {s.includes.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <Link href={`/contact?service=${s.slug}`}>
                    Discuss this service ↗
                  </Link>
                </div>
              )}
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
                  <div id={`process-panel-${i}`} hidden={activeStep !== i}>
                    <p>{s.summary}</p>
                    <div className="step-progress" aria-hidden>
                      <span />
                    </div>
                  </div>
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
              <Link
                className="team-portrait-card"
                href={`/about#${person.slug}`}
              >
                <GlareHover
                  width="100%"
                  height="auto"
                  background="transparent"
                  borderColor="transparent"
                  glareOpacity={enabled ? 0.15 : 0}
                  className="team-glare"
                >
                  <div className="team-photo">
                    {person.image && (
                      <Image
                        src={person.image}
                        alt={person.name}
                        fill
                        sizes="(max-width:640px) 80vw,25vw"
                        className="object-cover object-top"
                      />
                    )}
                    <span className="portrait-arrow" aria-hidden>
                      ↗
                    </span>
                  </div>
                </GlareHover>
                <span className="person-index">
                  0{i + 1} / {person.flag}
                </span>
                <h3>{person.name.split(" ").slice(0, 2).join(" ")}</h3>
                <p>{person.role}</p>
              </Link>
            </Enter>
          ))}
        </div>
      </section>
      <section className="lab-invitation">
        <div className="experience-container lab-invitation-grid">
          <div>
            <div className="section-index">
              <span>06 / THE INTERACTION LAB</span>
            </div>
            <MotionTitle text={redesign.labTitle} className="experience-h2" />
            <p className="section-copy">{redesign.labIntro}</p>
            <StarBorder
              as={Link}
              href="/lab"
              color="#a1c4ff"
              backgroundColor="#101a2b"
              className="lab-link"
            >
              Enter the lab <span aria-hidden>↗</span>
            </StarBorder>
          </div>
          <Link
            href="/lab"
            className="lab-object"
            aria-label="Explore the interaction lab"
          >
            <BorderGlow
              borderRadius={24}
              backgroundColor="#0b1220"
              colors={["#215df4", "#72b5ff", "#afe4ff"]}
              glowColor="215 90 75"
              className="lab-object-border"
            >
              <div className="lab-object-inner">
                <div className="lab-topline">
                  <span>TRUSTCODE / EXPERIMENTAL</span>
                  <span>↗</span>
                </div>
                <div className="kinetic-type">
                  {enabled ? (
                    <RotatingText
                      texts={["Explore.", "Interact.", "Imagine."]}
                      rotationInterval={2800}
                      effect="blur"
                      splitBy="words"
                    />
                  ) : (
                    "Explore."
                  )}
                </div>
                <div className="lab-bottomline">
                  <span>218 COMPONENTS</span>
                  <span>ENDLESS POSSIBILITIES</span>
                </div>
              </div>
            </BorderGlow>
          </Link>
        </div>
      </section>
      <section className="closing-experience">
        <Ambient kind="silk" />
        <div className="experience-container relative">
          <p className="small-label">THE NEXT CHAPTER STARTS HERE</p>
          <MotionTitle text={redesign.ctaTitle} className="closing-title" />
          <p className="section-copy">{redesign.ctaIntro}</p>
          <Magnet disabled={!enabled} maxOffset={8}>
            <Link href="/contact" className="button-solid">
              Let’s build it together <span aria-hidden>↗</span>
            </Link>
          </Magnet>
        </div>
      </section>
    </div>
  );
}
