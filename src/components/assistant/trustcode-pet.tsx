"use client";
import Image from "next/image";
export function TrustCodePet({
  thinking = false,
  small = false,
}: {
  thinking?: boolean;
  small?: boolean;
}) {
  return (
    <span
      className={`trustcode-pet ${thinking ? "pet-thinking" : ""} ${small ? "pet-small" : ""}`}
      aria-hidden
    >
      <Image
        src="/assistant/trustcode-robot.webp"
        alt=""
        width={320}
        height={480}
        sizes={small ? "40px" : "82px"}
        className="pet-character"
        priority={!small}
      />
    </span>
  );
}
