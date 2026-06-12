export type Founder = {
  slug: string;
  name: string;
  role: string;
  location: string;
  flag: string;
  image?: string;
  oneLiner: string;
  bio: string[];
  highlights: string[];
  credentials: string[];
  stack: string[];
  links: { label: string; href: string }[];
  pillar: { title: string; proof: string };
};

export const team: Founder[] = [
  {
    slug: "bashir-abdulah",
    name: "Bashir Abdulah",
    role: "Co-Founder · Frontend & Product Engineering Lead",
    location: "London, UK",
    flag: "🇬🇧",
    image: "/team/bashir-abdulah.png",
    oneLiner:
      "Interfaces people trust at first click — UK-based, fintech and edtech proven.",
    bio: [
      "Software Engineer and Frontend Developer based in London. BSc Information Technology & Business Information Systems, Middlesex University, London (2025). Advanced Diploma in Software Engineering, Aptech Lagos (2023).",
      "Currently a Software Developer at Unify Giving Ltd, building a mental health web platform that improves digital access to emotional wellness tools.",
      "Previously a Junior Frontend Developer at Greatsome Innovations, where he shipped a fintech loan dashboard that cut manual handling by ~30% and a modular school management system that cut manual input by ~25%. He also delivered a full-stack automotive platform on contract at Clabed, reducing manual WhatsApp inquiries by 55%.",
    ],
    highlights: [
      "Loan dashboard that cut manual handling ~30% (Greatsome Innovations)",
      "Modular school management system that cut manual input ~25%",
      "Clabed automotive platform — 55% reduction in manual WhatsApp inquiries",
    ],
    credentials: [
      "BSc IT & Business Information Systems — Middlesex University (2025)",
      "Advanced Diploma in Software Engineering — Aptech Lagos (2023)",
    ],
    stack: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Express",
      "Dart/Flutter",
      "AWS",
      "PostgreSQL",
      "Prisma",
      "MongoDB",
      "Firebase",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/Bash-Abdul" },
      { label: "LinkedIn", href: "https://linkedin.com/in/bashir-abdulah" },
    ],
    pillar: {
      title: "Product craft",
      proof:
        "Interfaces shipped for UK and Nigerian fintech and edtech — measured in reduced manual work, not just pixels.",
    },
  },
  {
    slug: "abdulhaleem-sanuth",
    name: "Abdulhaleem Sanuth",
    role: "Co-Founder · Cloud & Backend Engineering Lead",
    location: "Lagos, NG",
    flag: "🇳🇬",
    image: "/team/abdulhaleem-sanuth.png",
    oneLiner: "Cloud architecture, payments, and AI pipelines that scale without drama.",
    bio: [
      "Full-Stack and Cloud Engineer with 3+ years of production experience. B.Sc. Statistics (in view), University of Lagos.",
      "Currently at Codygo (remote), where he builds multi-tenant auth with AWS Cognito + RBAC, KMS envelope-encrypted credential pipelines, EventBridge-triggered Lambda schedulers that optimize LLM inference costs, DOM automation frameworks for AI agents, and AWS CDK stacks orchestrating 7 services for a platform handling 49 third-party integrations.",
      "Also a Full-Stack Developer at Vascan Arts, where he built 3-tier caching (in-memory, Redis, pub/sub), Paystack payment pipelines with Bull queues and 10 webhook events, and a multi-vendor payment routing engine with merchant settlements.",
    ],
    highlights: [
      "7-service AWS CDK stack powering 49 third-party integrations (Codygo)",
      "KMS envelope-encrypted credential pipelines + Cognito RBAC",
      "Paystack pipelines with Bull queues, 10 webhook events, multi-vendor routing",
    ],
    credentials: ["B.Sc. Statistics (in view) — University of Lagos"],
    stack: [
      "TypeScript",
      "Node.js",
      "NestJS",
      "Next.js",
      "AWS CDK",
      "Lambda",
      "Fargate",
      "EventBridge",
      "Cognito",
      "DynamoDB",
      "Redis",
      "PostgreSQL",
      "Docker",
      "GitHub Actions",
      "Paystack",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/Abdulhaleem-6" },
      { label: "LinkedIn", href: "https://linkedin.com/in/abdulhaleem-sanuth" },
    ],
    pillar: {
      title: "Cloud scale",
      proof:
        "AWS-native systems handling 49 third-party integrations across a 7-service CDK stack — built to scale without 3am surprises.",
    },
  },
  {
    slug: "olamilekan-oyedele",
    name: "Olamilekan Emmanuel Oyedele",
    role: "Co-Founder · Security & SOC Lead",
    location: "Lagos, NG",
    flag: "🇳🇬",
    image: "/team/olamilekan-oyedele.png",
    oneLiner: "Every product we ship is watched, hardened, and audit-ready.",
    bio: [
      "Cybersecurity and SOC Analyst. ISC2 Certified in Cybersecurity (CC). BSc Statistics, University of Ilorin (2024).",
      "Built a simulated SOC with Microsoft Sentinel and Defender for Endpoint, and authored a 25+ query KQL threat-hunting playbook. Led simulated phishing-campaign investigations covering infection chains, privilege escalation, and malicious callbacks.",
      "Built a full home detection lab (PfSense, Splunk, Kali, Windows Server) mapped to MITRE ATT&CK. Former Help Desk Intern at Brandt Communication with 80%+ first-call resolution.",
    ],
    highlights: [
      "25+ query KQL threat-hunting playbook, MITRE ATT&CK-mapped",
      "Simulated SOC with Microsoft Sentinel + Defender for Endpoint",
      "Full home detection lab: PfSense, Splunk, Kali, Windows Server",
    ],
    credentials: [
      "ISC2 Certified in Cybersecurity (CC)",
      "BSc Statistics — University of Ilorin (2024)",
    ],
    stack: [
      "KQL",
      "Microsoft Sentinel",
      "Defender for Endpoint",
      "Splunk",
      "PfSense",
      "MITRE ATT&CK",
      "Incident reporting",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/Interleks" },
      { label: "LinkedIn", href: "https://linkedin.com/in/interleks" },
    ],
    pillar: {
      title: "Security by default",
      proof:
        "A SOC analyst on the founding team means every product is monitored, hardened, and audit-ready — not patched after a breach.",
    },
  },
  {
    slug: "abass-ibrahim",
    name: "Abass Ibrahim",
    role: "Co-Founder · Full-Stack Delivery & Design Lead",
    location: "Lagos, NG",
    flag: "🇳🇬",
    image: "/team/abass-ibrahim.jpg",
    oneLiner:
      "Seven live products and counting — design in Figma, ship to production.",
    bio: [
      "Self-taught full-stack developer with 3+ years and 7 live production products. Concurrent IT Officer/Assistant across two oil & gas companies (Metropole Petroleum, Bono Energy Group) — wired for uptime and calm execution.",
      "Founder of a 500+ member crypto trading and Web3 education community. B.Sc. Educational Management, University of Ilorin.",
      "Live products include The Thesis Desk, Helping Tribe Academy, Wearables Atelier, PetroBrain, Aureo, Atlas HR, and AirtimeVault. Writes on Hashnode (@ghost69) and Medium (@Ghost69).",
    ],
    highlights: [
      "7 live production products shipped solo",
      "Enterprise IT operations across two oil & gas companies",
      "Founder of a 500+ member Web3 education community",
    ],
    credentials: ["B.Sc. Educational Management — University of Ilorin"],
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Shadcn UI",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "MongoDB",
      "Supabase",
      "Firebase",
      "Figma",
      "Web3",
    ],
    links: [
      { label: "Website", href: "https://abassibrahim.xyz" },
      { label: "GitHub", href: "https://github.com/Lingz450" },
      { label: "LinkedIn", href: "https://linkedin.com/in/abass-ibrahim-devv" },
    ],
    pillar: {
      title: "Delivery discipline",
      proof:
        "Seven live products shipped while keeping enterprise IT running — the habit of finishing and keeping things up is built in.",
    },
  },
];
