import { faqs } from "@/content/faq";
import { Section } from "./section";
import { ChevronDown } from "./icons";

/**
 * FAQ accordion (native <details>, no JS). `withSchema` adds FAQPage
 * JSON-LD — enable it on exactly one page (/contact) so search engines
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
          <details key={f.q} className="card group p-0">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-[1rem] font-medium text-ink [&::-webkit-details-marker]:hidden">
              {f.q}
              <ChevronDown
                aria-hidden
                className="h-4 w-4 shrink-0 text-slate transition-transform duration-200 group-open:rotate-180"
              />
            </summary>
            <p className="border-t border-grid px-5 py-4 text-[0.92rem] leading-relaxed text-slate">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
