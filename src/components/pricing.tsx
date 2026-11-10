import {
  pricing,
  addOns,
  commercialTerms,
  itemPrice,
  formatFrom,
} from "@/lib/pricing";
import { Section } from "./section";
import { StarLink } from "./star-link";
export function PricingTerms() {
  return (
    <div className="mt-6 text-[0.85rem] leading-relaxed text-slate">
      <p>{commercialTerms.disclaimer}</p>
    </div>
  );
}
export function PricingSection() {
  return (
    <Section id="pricing" className="border-y border-grid bg-surface">
      <p className="eyebrow">/ pricing</p>
      <h2 className="display-h2 mt-4">A clear starting point.</h2>
      <p className="lead mt-4 max-w-2xl">
        Choose the kind of work you need. We confirm the scope and final price
        with you before work starts.
      </p>
      {(["Build", "Run", "Protect", "Other"] as const).map((pillar) => (
        <div key={pillar} className="mt-10">
          <h3 className="display-h3">{pillar}</h3>
          {[
            ...new Set(
              pricing
                .filter((item) => item.pillar === pillar)
                .map((item) => item.group),
            ),
          ].map((group) => (
            <div key={group} className="mt-6">
              {pillar === "Build" && (
                <p className="mb-4 font-semibold text-ink">{group}</p>
              )}
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {pricing
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <article key={item.id} className="card flex flex-col p-6">
                      <h4 className="display-h3 text-[1.15rem]">
                        {item.title}
                      </h4>
                      <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-slate">
                        {item.description}
                      </p>
                      <p className="mt-5 font-display text-[1.4rem] font-semibold">
                        {itemPrice(item)}
                      </p>
                      <p className="mt-2 text-[0.85rem] text-slate">
                        {item.timeline}
                      </p>
                      <StarLink
                        href={`/estimate?type=${item.id}`}
                        variant="quiet"
                        className="mt-5"
                      >
                        Get a quote <span aria-hidden>↗</span>
                      </StarLink>
                    </article>
                  ))}
              </div>
              <PricingTerms />
            </div>
          ))}
        </div>
      ))}
      <div className="mt-10">
        <h3 className="display-h3">Add-ons</h3>
        <p className="mt-2 text-slate">
          Optional extras, agreed with your scope.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {addOns.map((item) => (
            <div className="card p-5" key={item.id}>
              <h4 className="font-medium">{item.title}</h4>
              <p className="mt-2 text-blueprint">+ {formatFrom(item.ngn)}</p>
            </div>
          ))}
          <div className="card p-5">
            <h4 className="font-medium">Rush delivery</h4>
            <p className="mt-2 text-blueprint">
              +{commercialTerms.rushPercent}% · subject to availability
            </p>
          </div>
        </div>
        <PricingTerms />
      </div>
      <div className="card mt-10 p-6">
        <h3 className="display-h3">Payments, ownership and support</h3>
        <p className="mt-4 text-slate">{commercialTerms.payment}</p>
        <p className="mt-3 text-slate">{commercialTerms.ownership}</p>
        <p className="mt-3 text-slate">{commercialTerms.support}</p>
      </div>
    </Section>
  );
}
