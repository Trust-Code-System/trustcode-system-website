import { team } from "./team";

export type Category =
  | "Web Platforms"
  | "Fintech"
  | "EdTech"
  | "E-Commerce"
  | "SaaS"
  | "AI"
  | "Marketplace"
  | "Cloud"
  | "Security"
  | "Backend";

export type ProjectOwnerId = "abass" | "abdulhaleem" | "olamilekan" | "bashir";

export type ProjectProofType =
  | "website"
  | "preview"
  | "live"
  | "live-client"
  | "github"
  | "case-study"
  | "security-lab"
  | "architecture"
  | "threat-investigation"
  | "network-lab"
  | "demonstration"
  | "internal";

export type ProjectVisualType =
  | "product-screenshot"
  | "architecture-diagram"
  | "network-topology"
  | "investigation"
  | "code"
  | "mixed"
  | "branded";

export type Project = {
  slug: string;
  title: string;
  sector: string;
  categories: Category[];
  tagline: string;
  problem: string;
  built: string[];
  outcome: string;
  stack: string[];
  team: string[];
  live: string | null;
  ownerId?: ProjectOwnerId;
  proofType: ProjectProofType;
  visualType: ProjectVisualType;
  featured: boolean;
  featuredOrder?: number;
  secondaryOrder?: number;
  sourceUrl?: string;
  contribution?: string;
  coverImage?: string;
  additionalInvestigations?: { label: string; note?: string }[];
  liveCtaLabel?: string;
  sourceCtaLabel?: string;
};

export type PortfolioOwner = {
  id: ProjectOwnerId;
  teamSlug: string;
  name: string;
  shortName: string;
  role: string;
  portfolioFocus: string;
  sectionLabel: string;
  githubUrl?: string;
  order: number;
};

const OWNER_META: Record<
  ProjectOwnerId,
  {
    teamSlug: string;
    shortName: string;
    portfolioFocus: string;
    sectionLabel: string;
    order: number;
  }
> = {
  abass: {
    teamSlug: "abass-ibrahim",
    shortName: "Abass",
    portfolioFocus: "Full-stack delivery and product design",
    sectionLabel: "Full-Stack Delivery & Product Design",
    order: 1,
  },
  abdulhaleem: {
    teamSlug: "abdulhaleem-sanuth",
    shortName: "Abdulhaleem",
    portfolioFocus: "Cloud architecture and backend systems",
    sectionLabel: "Cloud & Backend Engineering",
    order: 2,
  },
  olamilekan: {
    teamSlug: "olamilekan-oyedele",
    shortName: "Olamilekan",
    portfolioFocus: "Detection engineering and SOC investigations",
    sectionLabel: "Security & SOC Engineering",
    order: 3,
  },
  bashir: {
    teamSlug: "bashir-abdulah",
    shortName: "Bashir",
    portfolioFocus: "Frontend craft and product interfaces",
    sectionLabel: "Frontend & Product Engineering",
    order: 4,
  },
};

export const portfolioOwners: PortfolioOwner[] = (
  Object.keys(OWNER_META) as ProjectOwnerId[]
)
  .map((id) => {
    const meta = OWNER_META[id];
    const founder = team.find((f) => f.slug === meta.teamSlug)!;
    const github = founder.links.find((l) => l.label === "GitHub");
    return {
      id,
      teamSlug: meta.teamSlug,
      name: founder.name,
      shortName: meta.shortName,
      role: founder.role.replace(/^Co-Founder · /, ""),
      portfolioFocus: meta.portfolioFocus,
      sectionLabel: meta.sectionLabel,
      githubUrl: github?.href,
      order: meta.order,
    };
  })
  .sort((a, b) => a.order - b.order);

export function getPortfolioOwner(id: ProjectOwnerId): PortfolioOwner {
  return portfolioOwners.find((o) => o.id === id)!;
}

export const PROOF_LABELS: Record<ProjectProofType, string> = {
  website: "Website",
  preview: "Storefront preview",
  live: "Live product",
  "live-client": "Live client product",
  github: "GitHub",
  "case-study": "Case study",
  "security-lab": "Security lab",
  architecture: "Architecture",
  "threat-investigation": "Threat investigation",
  "network-lab": "Network lab",
  demonstration: "Demonstration",
  internal: "Internal showcase",
};

export const CATEGORY_FILTERS: (Category | "All")[] = [
  "All",
  "Web Platforms",
  "Fintech",
  "EdTech",
  "E-Commerce",
  "SaaS",
  "AI",
  "Cloud",
  "Backend",
  "Security",
  "Marketplace",
];

/** @deprecated use CATEGORY_FILTERS, kept for any residual imports */
export const categories = CATEGORY_FILTERS;

// Project selection supplied by the user; copy describes visible interfaces, not unverified results.
export const projects: Project[] = [
  {
    slug: "sekibat",
    title: "Sekibat Nig Limited",
    sector: "Property & real estate",
    categories: ["Web Platforms"],
    tagline:
      "A property website connecting homes, land and real-estate services.",
    problem:
      "Bring property listings, development services and enquiries together in one clear public destination.",
    built: [
      "Property listing and detail pages",
      "Property-type browsing",
      "Development, sales and management service pages",
      "Contact and enquiry entry points",
    ],
    outcome:
      "Visitors can explore the property portfolio, understand the services and start an enquiry.",
    stack: [],
    team: ["TrustCode System"],
    live: "https://www.sekibat-nig-limited.com/",
    proofType: "website",
    visualType: "product-screenshot",
    featured: true,
    featuredOrder: 1,
    coverImage: "/work/sekibat.png",
  },
  {
    slug: "nelo-woman",
    title: "NELO Woman",
    sector: "Fashion & atelier",
    categories: ["E-Commerce"],
    tagline:
      "A campaign-led fashion storefront with regional shopping and atelier journeys.",
    problem:
      "Connect a fashion collection, the atelier and measurement-profile entry points in a coherent digital experience.",
    built: [
      "Campaign-led collection presentation",
      "Nigeria and international region entry points",
      "Shop, collection and product routes",
      "Atelier, fitting and measurement-profile entry points",
    ],
    outcome:
      "The supplied storefront preview brings the collection, the house and client-care journeys into one interface.",
    stack: [],
    team: ["TrustCode System"],
    live: "https://nelo-frontend.vercel.app/ng",
    proofType: "preview",
    visualType: "product-screenshot",
    featured: true,
    featuredOrder: 2,
    coverImage: "/work/nelo-woman.png",
    liveCtaLabel: "Explore preview",
  },
  {
    slug: "wearables-by-ashabi",
    title: "Wearables by Ashabi",
    sector: "Fashion & jewellery",
    categories: ["E-Commerce"],
    tagline:
      "An editorial storefront for Nigerian occasionwear and statement jewellery.",
    problem:
      "Present clothing and jewellery through a distinctive campaign, with clear routes into the collection and customer care.",
    built: [
      "Clothing and jewellery collection routes",
      "Campaign and brand-story presentation",
      "Search, wishlist and shopping-bag interfaces",
      "Currency display and customer-care navigation",
    ],
    outcome:
      "A public storefront brings the Ashabi visual identity, collection categories and shopping entry points together.",
    stack: [],
    team: ["TrustCode System"],
    live: "https://wearablesbyashabi.store/",
    proofType: "website",
    visualType: "product-screenshot",
    featured: true,
    featuredOrder: 3,
    coverImage: "/work/wearables-by-ashabi.png",
  },
];
export const homepagePreviewSlugs = projects.map((project) => project.slug);
export const featuredSlugs = [...homepagePreviewSlugs];

export function getFeaturedProjects(): Project[] {
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0));
}

export function getFeaturedByOwner(ownerId: ProjectOwnerId): Project[] {
  return getFeaturedProjects().filter((p) => p.ownerId === ownerId);
}

export function getMoreWork(): Project[] {
  return projects
    .filter((p) => !p.featured)
    .sort((a, b) => (a.secondaryOrder ?? 0) - (b.secondaryOrder ?? 0));
}

export function getProjectsForOwner(ownerId: ProjectOwnerId): Project[] {
  const featured = getFeaturedByOwner(ownerId);
  const more = getMoreWork().filter((p) => p.ownerId === ownerId);
  return [...featured, ...more];
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function proofCtaLabel(proof: ProjectProofType): string {
  switch (proof) {
    case "website":
      return "Visit website";
    case "preview":
      return "Explore preview";
    case "live":
    case "live-client":
      return "View live product";
    case "github":
      return "View GitHub";
    case "architecture":
      return "View architecture";
    case "security-lab":
      return "View security lab";
    case "threat-investigation":
      return "View investigation";
    case "network-lab":
    case "demonstration":
      return "View demonstration";
    case "case-study":
      return "View case study";
    default:
      return "View case study";
  }
}
