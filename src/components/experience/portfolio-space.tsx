import Link from "next/link";
export function PortfolioSpace({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  return (
    <section
      id="selected-work"
      className={`portfolio-space ${standalone ? "portfolio-space-standalone" : ""}`}
    >
      <div className="experience-container">
        <div className="section-index">
          <span>02 / SELECTED WORK</span>
          <span>A NEW SELECTION IS ON ITS WAY</span>
        </div>
        {!standalone && (
          <div className="section-title-row">
            <h2 className="experience-h2">Room for what’s next.</h2>
            <p>A new collection of projects is being prepared.</p>
          </div>
        )}
        <div
          className="portfolio-reserved"
          aria-label="Reserved space for upcoming TrustCode projects"
        >
          <div className="reserved-corner corner-tl" />
          <div className="reserved-corner corner-tr" />
          <div className="reserved-corner corner-bl" />
          <div className="reserved-corner corner-br" />
          <span className="reserved-cross" aria-hidden>
            +
          </span>
          <div>
            <span className="reserved-eyebrow">THE NEXT CHAPTER</span>
            <p>New work. Coming into focus.</p>
            <span className="reserved-note">
              Our next project selection will live here.
            </span>
          </div>
          <span className="reserved-caption">TRUSTCODE / SELECTED WORK</span>
        </div>
        <div className="portfolio-space-footer">
          <span>Good things take intention.</span>
          <Link href="/contact" className="text-action">
            Let’s talk about your project ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
