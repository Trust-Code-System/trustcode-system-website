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

export type ProjectOwnerId =
  | "abass"
  | "abdulhaleem"
  | "olamilekan"
  | "bashir";

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

export const projects: Project[] = [
  // ── Featured (balanced internal mix; not shown as founder sections) ──
  {
    slug: "atlas-hr",
    title: "Atlas HR",
    sector: "HR Tech",
    categories: ["SaaS", "AI"],
    tagline:
      "Global HR, payroll, and compliance platform with an AI-powered compliance environment for distributed teams.",
    problem:
      "Hiring across Nigeria, India, the UK and the US means four sets of compliance rules and cost structures. Teams needed a way to model the risk and cost before committing to a hire.",
    built: [
      "AI Compliance Sandbox for testing scenarios",
      "Per-country cost and risk calculator (NG, IN, UK, US)",
      "Automated onboarding flows",
      "Payroll and compliance dashboards",
    ],
    outcome:
      "A single SaaS surface that turns four-country compliance and payroll into modeled, comparable decisions, with an AI sandbox to test scenarios first.",
    stack: ["Next.js", "TypeScript", "OpenAI", "PostgreSQL", "Tailwind"],
    team: ["Abass Ibrahim", "Abdulhaleem Sanuth"],
    live: "https://atlas-hr-fq24.vercel.app",
    ownerId: "abass",
    proofType: "live",
    visualType: "product-screenshot",
    featured: true,
    featuredOrder: 1,
    contribution: "TrustCode designed and implemented the product end to end, from interface to delivery.",
  },
  {
    slug: "helping-tribe-academy",
    title: "The Helping Tribe Academy",
    sector: "Education",
    categories: ["EdTech", "SaaS"],
    tagline:
      "School management and learning platform created for a counselling and positive psychology academy.",
    problem:
      "A Counselling & Positive Psychology program was running admissions and coursework manually. They needed role-separated portals and a public application pipeline that didn't depend on spreadsheets.",
    built: [
      "Three role-based portals: Student, Facilitator, Admin",
      "Dual authentication flows",
      "Public application form feeding the admin pipeline",
      "Course and cohort management",
    ],
    outcome:
      "Manual admissions and coursework replaced by three secure portals and a public application pipeline, live and in daily use.",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind"],
    team: ["Bashir Abdulah", "Abass Ibrahim"],
    live: "https://helpingtribeacademy.com",
    ownerId: "abass",
    proofType: "live",
    visualType: "product-screenshot",
    featured: true,
    featuredOrder: 2,
    contribution:
      "The engineering team designed and shipped the portal architecture, authentication flows, and learning management surfaces.",
  },
  {
    slug: "9th-luxe",
    title: "9th Luxe",
    sector: "Luxury E-Commerce",
    categories: ["E-Commerce", "SaaS"],
    tagline:
      "A full-stack luxury fragrance e-commerce platform with product discovery, secure checkout, customer accounts, order tracking, inventory management, and a comprehensive administration dashboard.",
    problem:
      "A luxury fragrance retailer needed more than a brochure site: customers expect discovery, accounts, secure payments, and order tracking, while operators need inventory, fulfilment, and campaign tools in one place.",
    built: [
      "Luxury perfume catalogue with search, filtering, brands, and collections",
      "Product galleries, reviews, wishlist, and persistent shopping cart",
      "Multi-step checkout with coupon codes and Paystack payment processing",
      "Customer accounts with saved delivery addresses, order history, and tracking",
      "Admin dashboard for products, inventory and low-stock alerts, orders, newsletter campaigns, notifications, and analytics",
      "Dynamic SEO metadata, sitemap, and responsive light and dark modes",
    ],
    outcome:
      "A production-ready luxury fragrance storefront and operations console: discoverable catalogue, secure checkout, and admin tooling on one platform.",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "NextAuth",
      "Zustand",
      "Zod",
      "Paystack",
      "Resend",
      "Vercel",
    ],
    team: ["TrustCode System"],
    live: "https://9thluxe-store-two.vercel.app/",
    ownerId: "abass",
    proofType: "live",
    visualType: "product-screenshot",
    featured: true,
    featuredOrder: 3,
    contribution:
      "TrustCode delivered the full-stack commerce platform: storefront, checkout, accounts, and administration.",
    coverImage: "/work/9th-luxe.png",
    liveCtaLabel: "Visit Live Store",
  },

  // ── Featured (continued) ─────────────────────────────────────────
  {
    slug: "debt-tracker-api",
    title: "Debt Tracker API",
    sector: "Fintech / Backend",
    categories: ["Fintech", "Backend"],
    tagline:
      "NestJS and Prisma API service supporting a debt-tracking product, with database migrations and automated testing foundations.",
    problem:
      "A debt-tracking product needed a structured API layer, authenticated endpoints, a migrated data model, and a testable service boundary rather than ad-hoc handlers.",
    built: [
      "NestJS API service structure for debt-tracker domain operations",
      "Prisma schema, generate step, and migration workflow",
      "Unit, e2e, and coverage test scripts wired into the project",
      "Environment-driven configuration with migrate and seed entry points",
    ],
    outcome:
      "A NestJS and Prisma API foundation with migrations, a test harness, and service structure ready for continued product work.",
    stack: ["NestJS", "Prisma", "TypeScript", "Jest", "Node.js"],
    team: ["Abdulhaleem Sanuth"],
    live: null,
    ownerId: "abdulhaleem",
    proofType: "github",
    visualType: "architecture-diagram",
    featured: false,
    secondaryOrder: 2,
    sourceUrl: "https://github.com/Abdulhaleem-6/debt-tracker-api",
    contribution:
      "The engineering team contributed to a NestJS and Prisma API service (public fork of AbdurrahmanSogbesan/debt-tracker-api), including migrations, testing foundations, and backend service structure.",
    coverImage: "/work/debt-tracker-api.svg",
  },
  {
    slug: "serverless-youtube-pipeline",
    title: "Serverless YouTube File Sync",
    sector: "Cloud Engineering",
    categories: ["Cloud", "Backend"],
    tagline:
      "Event-driven AWS pipeline that discovers new YouTube content, queues downloads, stores files in S3, and prevents duplicate processing through DynamoDB.",
    problem:
      "Syncing and processing YouTube content on a schedule needs an event-driven architecture that stays cheap at idle, retries safely, and never double-processes the same video.",
    built: [
      "AWS CDK (TypeScript) infrastructure-as-code for the full stack",
      "EventBridge hourly schedule → search Lambda → SQS → download Lambda",
      "Custom arm64 Docker runtime with yt-dlp and ffmpeg",
      "DynamoDB idempotency, S3 storage with lifecycle expiry, CloudWatch metrics, and DLQ retries",
    ],
    outcome:
      "A documented serverless pipeline architecture, scheduled discovery, queued downloads, idempotent state, and cost-aware storage controls.",
    stack: [
      "AWS CDK",
      "TypeScript",
      "EventBridge",
      "Lambda",
      "SQS",
      "S3",
      "DynamoDB",
      "Docker",
      "CloudWatch",
    ],
    team: ["Abdulhaleem Sanuth"],
    live: null,
    ownerId: "abdulhaleem",
    proofType: "architecture",
    visualType: "architecture-diagram",
    featured: false,
    secondaryOrder: 4,
    sourceUrl: "https://github.com/Abdulhaleem-6/youtube-file-sync",
    contribution: "TrustCode designed the serverless AWS pipeline, scheduling, queuing, idempotent state, and cost-aware storage.",
    coverImage: "/work/serverless-youtube-pipeline.svg",
  },
  {
    slug: "multi-carrier-shipping",
    title: "Multi-Carrier Shipping Integration",
    sector: "Logistics / Backend",
    categories: ["Backend", "Cloud"],
    tagline:
      "Extensible TypeScript shipping-rate service designed to integrate UPS, FedEx, DHL, and future carriers without coupling third-party APIs to core business logic.",
    problem:
      "Shipping rate APIs differ wildly by carrier. Embedding UPS-specific payloads in business logic makes every new carrier a rewrite, and OAuth token handling becomes fragile under load.",
    built: [
      "Strategy-pattern ICarrier interface isolating ShippingService from carrier quirks",
      "Mapper buffer zone so domain models stay free of carrier field names",
      "UPS adapter with OAuth 2.0 client-credentials, token caching, proactive refresh, and 401 retry",
      "Zod environment validation, Axios client, Jest + Nock integration tests, structured errors",
    ],
    outcome:
      "A carrier-agnostic shipping-rate module with a working UPS path and a clear extension point for future FedEx and DHL adapters, without implying those adapters are already complete.",
    stack: [
      "TypeScript",
      "Zod",
      "Axios",
      "Jest",
      "Nock",
      "OAuth 2.0",
    ],
    team: ["Abdulhaleem Sanuth"],
    live: null,
    ownerId: "abdulhaleem",
    proofType: "architecture",
    visualType: "architecture-diagram",
    featured: false,
    secondaryOrder: 3,
    sourceUrl: "https://github.com/Abdulhaleem-6/carrier-integration",
    contribution: "The engineering team implemented an extensible carrier-adapter architecture with OAuth handling and testable domain boundaries.",
    coverImage: "/work/multi-carrier-shipping.svg",
  },

  {
    slug: "home-detection-lab",
    title: "Home Detection Lab",
    sector: "Cybersecurity",
    categories: ["Security"],
    tagline:
      "Home-based detection environment using PfSense, Splunk, Kali Linux, Ubuntu, Windows Server, and Windows endpoints to monitor and investigate simulated attacks.",
    problem:
      "Detection skill without a controllable lab is theoretical. A home SOC needed segmented networks, log collection, and a place to practice MITRE-mapped investigations safely.",
    built: [
      "PfSense firewall with inbound/outbound traffic control",
      "Splunk for real-time log monitoring and search",
      "Kali Linux for offensive simulation alongside Ubuntu Desktop",
      "Windows Server 2019 and Windows 10 endpoints for realistic telemetry",
      "Incident documentation and mitigation notes mapped to MITRE ATT&CK",
    ],
    outcome:
      "A sanitised, documented detection lab that demonstrates monitoring, analysis, and incident write-ups without exposing real credentials or private infrastructure details.",
    stack: [
      "PfSense",
      "Splunk",
      "Kali Linux",
      "Ubuntu",
      "Windows Server 2019",
      "Windows 10",
      "MITRE ATT&CK",
    ],
    team: ["Olamilekan Emmanuel Oyedele"],
    live: null,
    ownerId: "olamilekan",
    proofType: "security-lab",
    visualType: "network-topology",
    featured: false,
    secondaryOrder: 5,
    contribution: "TrustCode built a home detection lab for monitoring, analysis, and MITRE-mapped incident documentation.",
    coverImage: "/work/home-detection-lab.svg",
    additionalInvestigations: [
      {
        label: "Forgando in Valdoria",
        note: "Documented investigation exercise (details kept sanitised)",
      },
      {
        label: "Titan Shield",
        note: "Documented investigation exercise (details kept sanitised)",
      },
      {
        label: "Azure Crest",
        note: "Documented investigation exercise (details kept sanitised)",
      },
    ],
  },
  {
    slug: "jojos-hospital-kql",
    title: "Jojo's Hospital, KQL Threat Investigation",
    sector: "Threat Hunting",
    categories: ["Security"],
    tagline:
      "Documented Microsoft Sentinel investigation using KQL to correlate endpoint and user events, reconstruct attack timelines, and identify suspicious behaviour.",
    problem:
      "Endpoint and identity telemetry only become useful when an analyst can join events, rebuild a timeline, and map findings to a known framework - not when logs stay siloed.",
    built: [
      "Kusto Query Language investigations in Microsoft Sentinel",
      "Correlation of Microsoft Defender for Endpoint and user events",
      "Timeline reconstruction covering suspicious PowerShell, file downloads, and unauthorised user creation",
      "Analysis of phishing activity, privilege escalation indicators, and malicious network callbacks",
      "Findings and mitigation recommendations mapped toward MITRE ATT&CK",
    ],
    outcome:
      "A written threat-investigation case study showing how KQL joins, summarizations, and parses turn raw telemetry into an infection-chain narrative and actionable mitigations.",
    stack: [
      "KQL",
      "Microsoft Sentinel",
      "Microsoft Defender for Endpoint",
      "MITRE ATT&CK",
    ],
    team: ["Olamilekan Emmanuel Oyedele"],
    live: null,
    ownerId: "olamilekan",
    proofType: "threat-investigation",
    visualType: "investigation",
    featured: false,
    secondaryOrder: 6,
    contribution: "The project demonstrates a Microsoft Sentinel investigation using KQL to correlate events and reconstruct attack timelines.",
    coverImage: "/work/jojos-hospital-kql.svg",
  },
  {
    slug: "network-security-segmentation-lab",
    title: "Network Security and Segmentation Lab",
    sector: "Network Security",
    categories: ["Security"],
    tagline:
      "Practical network-security lab covering VLANs, trunking, static routing, EtherChannel, wireless LAN design, and OSPF communication.",
    problem:
      "Flat networks fail open. Practising segmentation, trunking, and routing in a lab is how secure topologies become muscle memory before production change windows.",
    built: [
      "VLAN and trunk configuration for segmented traffic",
      "Static routing between lab segments",
      "EtherChannel for aggregated links",
      "Wireless LAN design alongside wired segments",
      "OSPF for dynamic routing between sites in Cisco Packet Tracer",
    ],
    outcome:
      "A demonstration lab that shows network segmentation and routing fundamentals, topology-first, without exposing real enterprise addressing.",
    stack: [
      "Cisco Packet Tracer",
      "VLANs",
      "Trunking",
      "EtherChannel",
      "OSPF",
      "WLAN",
    ],
    team: ["Olamilekan Emmanuel Oyedele"],
    live: null,
    ownerId: "olamilekan",
    proofType: "network-lab",
    visualType: "network-topology",
    featured: false,
    secondaryOrder: 7,
    contribution: "The engineering team configured a practical segmentation lab covering VLANs, routing, EtherChannel, WLAN, and OSPF.",
    coverImage: "/work/network-security-segmentation-lab.svg",
  },

  {
    slug: "clabed-autos",
    title: "Clabed Autos",
    sector: "Automotive",
    categories: ["E-Commerce"],
    tagline:
      "Responsive automotive marketplace with vehicle discovery, advanced filters, live listings, promotional content, and direct customer enquiry workflows.",
    problem:
      "An automotive dealer ran sales almost entirely through WhatsApp inquiries, slow, repetitive, and impossible to scale. They needed a real platform.",
    built: [
      "Vehicle catalogue with brand, model, and price-range filtering",
      "Latest arrivals and promotional offer surfaces",
      "Customer enquiry and lead flows",
      "Responsive storefront to replace manual chat browsing",
      "Admin management for listings",
    ],
    outcome:
      "Sales moved onto a self-serve automotive platform with structured discovery and enquiry workflows, reducing reliance on repetitive WhatsApp back-and-forth.",
    stack: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind", "Express", "MongoDB"],
    team: ["Bashir Abdulah"],
    live: "https://www.clabedautos.com",
    ownerId: "bashir",
    proofType: "live-client",
    visualType: "branded",
    featured: true,
    featuredOrder: 4,
    contribution:
      "TrustCode delivered the automotive marketplace, discovery, filtering, listings, and enquiry workflows.",
    coverImage: "/work/clabed-autos.svg",
  },
  {
    slug: "sln-engineering",
    title: "SLN Engineering Ltd",
    sector: "Engineering / Energy",
    categories: ["SaaS"],
    tagline:
      "Production corporate platform presenting electrical, power, solar, industrial, and engineering services for a Nigerian engineering company.",
    problem:
      "An engineering and energy firm had limited online presence, making it hard for clients to find services, partners, and a clear contact path.",
    built: [
      "React + Vite corporate marketing site with Tailwind",
      "Service pages for electrical, power, solar, lighting, BMS, and industrial work",
      "Partner and customer logo presentation",
      "Contact interface and responsive layout",
      "Search-engine metadata for discoverability",
    ],
    outcome:
      "A clear professional web presence for SLN Engineering: services, partners, and contact in one inspectable production site.",
    stack: ["React", "Vite", "Tailwind CSS"],
    team: ["Bashir Abdulah"],
    live: "https://www.slneng.com",
    ownerId: "bashir",
    proofType: "live-client",
    visualType: "product-screenshot",
    featured: true,
    featuredOrder: 5,
    sourceUrl: "https://github.com/Bash-Abdul/sln_react",
    contribution: "TrustCode developed the production corporate site for services, partners, and client contact.",
  },
  {
    slug: "event-photo-platform",
    title: "Event Photo Platform",
    sector: "Event Technology",
    categories: ["SaaS"],
    tagline:
      "Event media platform that lets organisers create events, generate QR codes, collect guest photo uploads, and build shared event galleries.",
    problem:
      "Event photo collection usually means a shared drive or a group chat. Organisers needed a structured flow: create an event, share access, collect uploads, and browse a gallery.",
    built: [
      "Next.js app with organiser authentication (signup/login)",
      "Event creation and event-code routes",
      "QR-code sharing screens for guest access",
      "Guest photo upload flow backed by Supabase storage",
      "Shared event galleries with Prisma-backed records",
    ],
    outcome:
      "A documented product showcase for event media collection: auth, events, QR sharing, uploads, and galleries in one Next.js codebase.",
    stack: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Prisma",
      "Supabase",
      "react-qr-code",
    ],
    team: ["Bashir Abdulah"],
    live: null,
    ownerId: "bashir",
    proofType: "github",
    visualType: "mixed",
    featured: false,
    secondaryOrder: 1,
    sourceUrl: "https://github.com/Bash-Abdul/Upload",
    contribution: "The engineering team developed event creation, QR sharing, guest uploads, and shared galleries.",
    coverImage: "/work/event-photo-platform.svg",
  },

  // ── More Work ────────────────────────────────────────────────────
  {
    slug: "airtimevault",
    title: "AirtimeVault",
    sector: "Fintech",
    categories: ["Fintech"],
    tagline: "Convert airtime to wallet cash in under 30 minutes.",
    problem:
      "Nigerians holding excess airtime (MTN, Airtel, Glo, 9mobile) had no fast, trusted way to turn it back into spendable cash. Existing options were slow, manual, and risky.",
    built: [
      "Airtime-to-cash conversion in under 30 minutes",
      "KYC and fraud monitoring",
      "P2P transfers and a virtual card",
      "Wallet with transaction history",
    ],
    outcome:
      "A fintech wallet that converts airtime across all four major networks to cash in under 30 minutes, with KYC and fraud monitoring built in.",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Paystack"],
    team: ["Abass Ibrahim", "Abdulhaleem Sanuth"],
    live: "https://airtime-vault-plhc.vercel.app",
    ownerId: "abass",
    proofType: "live",
    visualType: "product-screenshot",
    featured: true,
    featuredOrder: 6,
    contribution: "TrustCode designed and delivered the fintech wallet experience.",
  },
  {
    slug: "the-thesis-desk",
    title: "The Thesis Desk",
    sector: "Crypto / Community",
    categories: ["Fintech", "SaaS"],
    tagline:
      "Real-time crypto trading and education command centre built for a growing trading community.",
    problem:
      "A crypto trading community had no shared source of truth, prices, calls, and performance lived in scattered chats. They needed a command center the whole group could trust.",
    built: [
      "Live price feeds for BTC, ETH, SOL, BNB and XRP",
      "P&L tracking and a personal trade journal",
      "Role-based admin for managing calls and members",
      "Real-time dashboards built for fast, repeated use",
    ],
    outcome:
      "One inspectable home for the community, live feeds, tracked performance, and admin control in a single trusted surface.",
    stack: ["Next.js", "TypeScript", "Tailwind", "WebSockets", "PostgreSQL"],
    team: ["TrustCode System"],
    live: "https://thethesisdesk.xyz",
    ownerId: "abass",
    proofType: "live",
    visualType: "product-screenshot",
    featured: true,
    featuredOrder: 7,
    contribution: "TrustCode designed and implemented the product end to end.",
  },
  {
    slug: "wearables-atelier",
    title: "Wearables Atelier",
    sector: "Fashion / Retail",
    categories: ["E-Commerce"],
    tagline: "Editorial e-commerce for premium Nigerian womenswear.",
    problem:
      "A premium womenswear label needed a storefront that felt editorial, not generic, while still supporting custom orders and wholesale buyers.",
    built: [
      "Editorial product and collection pages",
      "Custom-order flow",
      "Wholesale support",
      "Persistent cart and checkout",
    ],
    outcome:
      "An editorial storefront that carries a premium brand while handling both retail custom orders and wholesale buyers.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Shadcn UI"],
    team: ["Abass Ibrahim"],
    live: "https://wearables-atelier.vercel.app",
    ownerId: "abass",
    proofType: "live",
    visualType: "product-screenshot",
    featured: true,
    featuredOrder: 8,
    contribution: "TrustCode designed and implemented the product end to end.",
  },
  {
    slug: "petrobrain",
    title: "PetroBrain",
    sector: "Oil & Gas / Energy AI",
    categories: ["AI", "SaaS"],
    tagline: "AI-native intelligence platform built exclusively for oil & gas.",
    problem:
      "Oil & gas teams sit on huge volumes of permits, procedures, and engineering standards, but answers are buried, and a wrong number on a safety-critical decision is unacceptable. They needed AI that cites its sources and never guesses.",
    built: [
      "Field Copilot, plain-English answers on permits and SOPs from company documents",
      "Engineering decision-support with worked calculations, formulas, and cited sources",
      "Compliance Guardian, audit-grade emissions reporting and methane quantification (NUPRC Tier-3 MRV)",
      "Safety-first protocols that defer critical calls to qualified personnel, with data sovereignty",
    ],
    outcome:
      "An AI platform for drilling, production, midstream and downstream that cites every source and shows its working, currently in pilot with selected operators.",
    stack: ["Next.js", "TypeScript", "OpenAI", "LangChain", "Tailwind"],
    team: ["Abass Ibrahim", "Abdulhaleem Sanuth"],
    live: "https://petro-brain-web.vercel.app",
    ownerId: "abass",
    proofType: "live",
    visualType: "product-screenshot",
    featured: true,
    featuredOrder: 9,
    contribution: "TrustCode designed and delivered the AI platform for oil and gas workflows.",
  },
  {
    slug: "aureo",
    title: "Aureo",
    sector: "Hiring",
    categories: ["Marketplace", "SaaS"],
    tagline: "Trust-first hiring marketplace with verified profiles.",
    problem:
      "Hiring marketplaces are full of unverifiable claims. Aureo needed verification and trust scoring at its core so employers could filter on credibility.",
    built: [
      "Verified candidate profiles",
      "Trust scores",
      "Search and filtering on credibility",
      "Marketplace matching flows",
    ],
    outcome:
      "A hiring marketplace where verification and trust scores are the product: letting employers filter on credibility, not claims.",
    stack: ["React", "Next.js", "TypeScript", "Tailwind"],
    team: ["Abass Ibrahim"],
    live: "https://aureeo.netlify.app",
    ownerId: "abass",
    proofType: "live",
    visualType: "product-screenshot",
    featured: true,
    featuredOrder: 10,
    contribution: "TrustCode designed and implemented the product end to end.",
  },
  {
    slug: "studycoach",
    title: "StudyCoach",
    sector: "Education / AI",
    categories: ["AI", "EdTech"],
    tagline: "Turn lecture notes into summaries and quizzes.",
    problem:
      "Students drown in lecture notes with no fast way to revise. StudyCoach needed to turn raw notes into structured study material automatically.",
    built: [
      "AI summarization of lecture notes (OpenAI + LangChain)",
      "Auto-generated quizzes",
      "Study session flows",
      "Note upload and processing",
    ],
    outcome:
      "An AI study assistant that turns raw lecture notes into summaries and quizzes for faster revision.",
    stack: ["Next.js", "OpenAI", "LangChain", "TypeScript", "Tailwind"],
    team: ["Abdulhaleem Sanuth", "Abass Ibrahim"],
    live: "https://study-coach-five.vercel.app",
    ownerId: "abdulhaleem",
    proofType: "live",
    visualType: "product-screenshot",
    featured: true,
    featuredOrder: 11,
    contribution: "The engineering team implemented the AI summarisation and quiz generation pipeline.",
  },
  {
    slug: "soc-detection-lab",
    title: "SOC Detection Lab & KQL Playbook",
    sector: "Cybersecurity",
    categories: ["Security"],
    tagline: "25+ documented threat-hunting queries, MITRE-mapped.",
    problem:
      "Detection is only as good as the queries behind it. This lab demonstrates a repeatable, documented threat-hunting capability mapped to a known framework.",
    built: [
      "25+ documented KQL threat-hunting queries",
      "Microsoft Sentinel + Defender for Endpoint",
      "MITRE ATT&CK-mapped incident reports",
      "Simulated phishing-campaign investigations",
    ],
    outcome:
      "A documented, MITRE-mapped detection capability with 25+ threat-hunting queries, the security rigor we apply to every product we ship.",
    stack: ["KQL", "Microsoft Sentinel", "Defender for Endpoint", "MITRE ATT&CK"],
    team: ["Olamilekan Emmanuel Oyedele"],
    live: null,
    ownerId: "olamilekan",
    proofType: "case-study",
    visualType: "investigation",
    featured: false,
    secondaryOrder: 8,
    contribution: "TrustCode documented a MITRE-mapped detection capability with a KQL threat-hunting playbook.",
    coverImage: "/work/soc-detection-lab.svg",
    additionalInvestigations: [
      {
        label: "Forgando in Valdoria",
        note: "Additional documented investigation",
      },
      { label: "Titan Shield", note: "Additional documented investigation" },
      { label: "Azure Crest", note: "Additional documented investigation" },
    ],
  },
];

/** Homepage: strongest interface-led product work */
export const homepagePreviewSlugs = [
  "atlas-hr",
  "9th-luxe",
  "helping-tribe-academy",
  "clabed-autos",
] as const;

/** @deprecated prefer homepagePreviewSlugs */
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
