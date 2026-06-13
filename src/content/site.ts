export const site = {
  name: "TrustCode System Limited",
  shortName: "TrustCode System",
  domain: "trustcodesystem.tech",
  url: "https://trustcodesystem.tech",
  email: "hello@trustcodesystem.tech",
  phone: "+2349134062773",
  whatsapp:
    "https://wa.me/2349134062773?text=Hi%20TrustCode%20System%2C%20I%27d%20like%20to%20discuss%20a%20project.",
  logo: "/trustcode-systems-logo.png",
  locations: ["Lagos, Nigeria", "London, United Kingdom"],
  thesis:
    "TrustCode System builds software you can stake your business on. Full-stack product engineering, cloud infrastructure, AI integration, and security — delivered by a team that has shipped 15+ live products across fintech, edtech, e-commerce, HR tech, and Web3.",
  description:
    "TrustCode System is a four-engineer team shipping web platforms, cloud systems, AI features, and security — 15+ live products across fintech, edtech, e-commerce and beyond.",
  responsePromise: "We reply within 24 hours.",
} as const;

// Public profiles for the organization. These power JSON-LD `sameAs`, which is
// how search engines and AI link this site to the company's other presences.
// Add a URL as each profile goes live; empty strings are filtered out.
export const social = {
  github: "https://github.com/Trust-Code-System",
  linkedin: "https://www.linkedin.com/company/trustcode-system-limited/",
  x: "https://x.com/trustcodesys",
  crunchbase: "",
} as const;

export const socialLinks = Object.values(social).filter(Boolean);

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;

export const stats = [
  { value: "4", label: "engineers" },
  { value: "15+", label: "live products" },
  { value: "6+", label: "industries served" },
  { value: "NG · UK", label: "two countries, remote worldwide" },
] as const;
