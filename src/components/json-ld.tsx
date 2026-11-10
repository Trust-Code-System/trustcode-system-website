import { site, socialLinks } from "@/content/site";
import { team } from "@/content/team";
import { services } from "@/content/services";

export function JsonLd() {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      alternateName: site.shortName,
      url: site.url,
      logo: `${site.url}${site.logo}`,
      image: `${site.url}${site.logo}`,
      email: site.email,
      telephone: site.phone,
      description: site.thesis,
      slogan: "Software you can stake your business on.",
      foundingDate: "2026",
      areaServed: ["NG", "GB", "Worldwide"],
      ...(socialLinks.length ? { sameAs: socialLinks } : {}),
      address: [
        { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.email,
        telephone: site.phone,
        areaServed: ["NG", "GB", "Worldwide"],
        availableLanguage: "English",
      },
      founder: team.map((f) => ({ "@id": `${site.url}/about#${f.slug}` })),
      makesOffer: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.short },
      })),
    },
    ...team.map((f) => ({
      "@type": "Person",
      "@id": `${site.url}/about#${f.slug}`,
      name: f.name,
      jobTitle: f.role,
      worksFor: { "@id": `${site.url}/#organization` },
      knowsAbout: f.stack,
      sameAs: f.links.map((l) => l.href),
    })),
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { "@id": `${site.url}/#organization` },
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
