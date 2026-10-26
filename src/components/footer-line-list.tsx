"use client";
import Link from "next/link";
import LineSidebar from "./react-bits/LineSidebar/LineSidebar";
import { useExperienceMotion } from "./experience/motion-preferences";
export function FooterLineList({
  items,
  label,
}: {
  items: string[][];
  label: string;
}) {
  const { enabled } = useExperienceMotion();
  return (
    <LineSidebar
      items={items.map((x) => x[0])}
      hrefs={items.map((x) => x[1])}
      linkComponent={Link}
      ariaLabel={label}
      accentColor="#c5dbff"
      textColor="#b3c0d6"
      markerColor="#3a4c66"
      showIndex
      showMarker
      markerLength={25}
      markerGap={10}
      maxShift={enabled ? 9 : 0}
      proximityRadius={85}
      smoothing={enabled ? 280 : 0}
      fontSize={0.75}
      itemGap={3}
      scaleTick={enabled}
      className="footer-line-sidebar"
    />
  );
}
