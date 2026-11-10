import { privacySections } from "@/content/privacy";
import { AnalyticsSettingsButton } from "@/components/google-analytics";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Website privacy", description: "How TrustCode System uses website information and optional analytics cookies.", path: "/privacy" });

export default function PrivacyPage() {
  return <article className="experience-container privacy-notice">
    <p className="small-label">TRUSTCODE SYSTEM LIMITED</p>
    <h1 className="experience-h2">Website privacy</h1>
    <p>Updated 10 November 2026</p>
    {privacySections.map(section => <section key={section.title}>
      <h2>{section.title}</h2>
      {section.paragraphs.map(paragraph => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
    </section>)}
    <p><a href="https://policies.google.com/technologies/partner-sites">How Google uses information from sites that use its services</a></p>
    <p><a href="https://vercel.com/docs/analytics/privacy-policy">Vercel Web Analytics privacy information</a></p>
    <p><a href="mailto:hello@trustcodesystem.tech">Contact hello@trustcodesystem.tech</a></p>
    <AnalyticsSettingsButton />
  </article>;
}
