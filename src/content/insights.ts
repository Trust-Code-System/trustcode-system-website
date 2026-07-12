export type Insight = {
  title: string;
  excerpt: string;
  href: string;
  source: "Hashnode" | "Medium";
  tag: string;
};

// Seed entries link out to the team's existing writing (Hashnode @ghost69, Medium @Ghost69).
// New posts can later be added as local MDX in /src/content/posts.
export const insights: Insight[] = [
  {
    title: "Shipping a fintech dashboard that cut manual work by 30%",
    excerpt:
      "What it actually takes to replace a manual loan-handling process with software people trust, and the metrics that proved it worked.",
    href: "https://hashnode.com/@ghost69",
    source: "Hashnode",
    tag: "Fintech",
  },
  {
    title: "Designing role-based portals for a real school",
    excerpt:
      "Three portals, two auth flows, one public application form. Lessons from building Helping Tribe Academy for production.",
    href: "https://hashnode.com/@ghost69",
    source: "Hashnode",
    tag: "EdTech",
  },
  {
    title: "AWS CDK for teams that don't want to babysit servers",
    excerpt:
      "An event-driven, serverless approach to infrastructure that scales on demand and costs nothing at idle.",
    href: "https://medium.com/@Ghost69",
    source: "Medium",
    tag: "Cloud",
  },
  {
    title: "Adding AI to a product without breaking it",
    excerpt:
      "Where LLM features create real value versus where they just make a demo, and how we decide which is which.",
    href: "https://medium.com/@Ghost69",
    source: "Medium",
    tag: "AI",
  },
  {
    title: "A practical KQL threat-hunting starter",
    excerpt:
      "Notes from building a 25+ query detection playbook in Microsoft Sentinel, mapped to MITRE ATT&CK.",
    href: "https://hashnode.com/@ghost69",
    source: "Hashnode",
    tag: "Security",
  },
  {
    title: "Web3 fundamentals for a 500+ member community",
    excerpt:
      "How we teach crypto and Web3 basics to a large learning community without the hype.",
    href: "https://medium.com/@Ghost69",
    source: "Medium",
    tag: "Web3",
  },
];
