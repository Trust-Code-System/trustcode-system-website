import Image from "next/image";
import type { Founder } from "@/content/team";

export function TeamPortrait({
  person,
}: {
  person: Pick<Founder, "name" | "image">;
}) {
  return (
    <figure className="team-portrait">
      {person.image ? (
        <Image
          src={person.image}
          alt={person.name}
          fill
          sizes="(max-width:700px) 90vw, (max-width:1100px) 45vw, 25vw"
          className="object-cover object-top"
        />
      ) : (
        <span>{person.name}</span>
      )}
    </figure>
  );
}
