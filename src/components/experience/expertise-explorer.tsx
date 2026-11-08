"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { StarLink } from "../star-link";
import { services } from "@/content/services";
import { serviceVisuals } from "@/content/redesign";
import AnimatedList from "../react-bits/AnimatedList/AnimatedList";
import SpotlightCard from "../react-bits/SpotlightCard/SpotlightCard";
import DecryptedText from "../react-bits/DecryptedText/DecryptedText";
import { useExperienceMotion } from "./motion-preferences";
export function ExpertiseExplorer() {
  const [selected, setSelected] = useState(0);
  const [linkedService, setLinkedService] = useState("");
  const detailRef = useRef<HTMLDivElement>(null);
  const service = services[selected];
  const art = serviceVisuals[selected];
  const { enabled } = useExperienceMotion();
  useEffect(() => {
    const followHash = () => {
      const slug = window.location.hash.slice(1);
      const index = services.findIndex((item) => item.slug === slug);
      if (index < 0) return;
      setSelected(index);
      setLinkedService(slug);
    };
    followHash();
    window.addEventListener("hashchange", followHash);
    return () => window.removeEventListener("hashchange", followHash);
  }, []);
  useEffect(() => {
    if (linkedService) {
      detailRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
    }
  }, [linkedService]);
  return (
    <div className="expertise-explorer">
      <div>
        <p className="eyebrow mb-5">/ find your next move</p>
        <AnimatedList
          key={linkedService}
          items={services.map((s, i) => ({
            title: s.title,
            meta: `0${i + 1}`,
          }))}
          onItemSelect={(_, index) => setSelected(index)}
          selectOnHover={false}
          motionEnabled={enabled}
          initialSelectedIndex={selected}
          enableArrowNavigation
          width="100%"
          maxHeight="none"
          frame={false}
          showGradients={false}
          accentColor="#b9d1ff"
        />
        <p className="explorer-hint">
          Choose a discipline. See how the pieces connect.
        </p>
      </div>
      <div ref={detailRef} id={service.slug} className="expertise-anchor">
        <SpotlightCard
          key={service.slug}
          className="expertise-detail"
          spotlightColor="rgba(105,156,255,.2)"
        >
          <div className="expertise-detail-top">
            <span>
              0{selected + 1} / {art.label}
            </span>
            <span>{service.timeline} · TYPICAL SCOPE</span>
          </div>
          <div className="expertise-detail-heading">
            <h2>{service.title}</h2>
            <span style={{ color: art.color }} aria-hidden>
              {art.glyph}
            </span>
          </div>
          <p className="expertise-detail-description">{service.description}</p>
          <h3>
            {enabled ? (
              <DecryptedText
                text="THE DETAILS THAT MAKE THE DIFFERENCE"
                animateOn="view"
                speed={20}
              />
            ) : (
              "THE DETAILS THAT MAKE THE DIFFERENCE"
            )}
          </h3>
          <ul>
            {service.includes.map((inc, i) => (
              <li key={inc}>
                <span>0{i + 1}</span>
                {inc}
                <span aria-hidden>↗</span>
              </li>
            ))}
          </ul>
          <div className="expertise-detail-actions">
            <StarLink
              href={`/contact?service=${service.slug}`}
              className="button-solid"
            >
              Let’s talk about it ↗
            </StarLink>
            <Link href={service.proof.href} className="text-action">
              Discuss the approach ↗
            </Link>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}
