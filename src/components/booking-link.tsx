import { sales } from "@/content/sales";
import { StarLink } from "./star-link";
export function BookingLink({
  className = "button-solid",
}: {
  className?: string;
}) {
  if (!sales.bookingUrl) return null;
  return (
    <StarLink
      href={sales.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      variant="quiet"
      className={className}
    >
      {sales.bookingLabel} <span aria-hidden>↗</span>
    </StarLink>
  );
}
