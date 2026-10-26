"use client";
import { useState } from "react";
import Link from "next/link";
import { services } from "@/content/services";
import { serviceVisuals } from "@/content/redesign";
import AnimatedList from "../react-bits/AnimatedList/AnimatedList";
import SpotlightCard from "../react-bits/SpotlightCard/SpotlightCard";
import DecryptedText from "../react-bits/DecryptedText/DecryptedText";
import { useExperienceMotion } from "./motion-preferences";
export function ExpertiseExplorer() {
  const [selected, setSelected] = useState(0);
  const service = services[selected];
  const art = serviceVisuals[selected];
  const { enabled } = useExperienceMotion();
  return (
    <div className="expertise-explorer">
      <div>
        <p className="eyebrow mb-5">/ find your next move</p>
        <AnimatedList
          items={services.map((s, i) => ({
            title: s.title,
            meta: `0${i + 1}`,
          }))}
          onItemSelect={(_, index) => setSelected(index)}
          selectOnHover={false}
          initialSelectedIndex={0}
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
          <Link
            href={`/contact?service=${service.slug}`}
            className="button-solid"
          >
            Let’s talk about it ↗
          </Link>
          <Link href={service.proof.href} className="text-action">
            Discuss the approach ↗
          </Link>
        </div>
      </SpotlightCard>
    </div>
  );
}
