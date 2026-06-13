export const site = {
  name: "TrustCode Systems Limited",
  shortName: "TrustCode Systems",
  domain: "trustcodesystem.tech",
  url: "https://trustcodesystem.tech",
  email: "hello@trustcodesystem.tech",
  whatsapp: "https://wa.me/2349134062773",
  locations: ["Lagos, Nigeria", "London, United Kingdom"],
  thesis:
    "TrustCode Systems builds software you can stake your business on. Full-stack product engineering, cloud infrastructure, AI integration, and security — delivered by a team that has shipped 15+ live products across fintech, edtech, e-commerce, HR tech, and Web3.",
  description:
    "TrustCode Systems is a four-engineer team shipping web platforms, cloud systems, AI features, and security — 15+ live products across fintech, edtech, e-commerce and beyond.",
  responsePromise: "We reply within 24 hours.",
} as const;

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
