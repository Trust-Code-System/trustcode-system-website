import { team } from "./team";

export type Category =
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
  ownerId: ProjectOwnerId;
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

// Intentionally empty while the new project selection is being prepared.
export const projects: Project[] = [];
export const homepagePreviewSlugs: string[] = [];
export const featuredSlugs: string[] = [];

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
