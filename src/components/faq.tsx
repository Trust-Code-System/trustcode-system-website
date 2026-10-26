import { faqs } from "@/content/faq";
import { Section } from "./section";
import { SoftFaqItem } from "./soft-disclosure";

/**
 * FAQ accordion with shared soft disclosure motion. `withSchema` adds FAQPage
 * JSON-LD, enable it on exactly one page (/contact) so search engines
 * see a single canonical FAQ.
 */
export function FaqSection({
  withSchema = false,
  className,
}: {
  withSchema?: boolean;
  className?: string;
}) {
  return (
    <Section className={className} id="faq">
      {withSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      )}
      <p className="eyebrow">/ questions, answered</p>
      <h2 className="display-h2 mt-4 max-w-2xl">
        The things everyone asks before starting.
      </h2>
      <div className="mt-10 grid gap-3 lg:grid-cols-2 lg:items-start">
        {faqs.map((f) => (
          <SoftFaqItem key={f.q} question={f.q} answer={f.a} />
        ))}
      </div>
    </Section>
  );
}
