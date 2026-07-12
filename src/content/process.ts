export type Step = {
  n: string;
  title: string;
  summary: string;
  what: string;
  deliverable: string;
  duration: string;
};

export const steps: Step[] = [
  {
    n: "01",
    title: "Discover",
    summary: "We learn your business, users, and constraints before writing a line of code.",
    what: "A free 30-minute consultation followed by a short discovery: goals, users, scope, risks, and success metrics. We map what 'done' looks like.",
    deliverable: "Written proposal with scope, timeline, and engagement model after reviewing your brief.",
    duration: "2–5 days",
  },
  {
    n: "02",
    title: "Design",
    summary: "We turn scope into screens and architecture you can review before we build.",
    what: "Information architecture, key flows, and UI design in Figma. For platforms, we also agree the data model and infrastructure shape up front.",
    deliverable: "Figma designs and a technical plan you sign off on.",
    duration: "3–10 days",
  },
  {
    n: "03",
    title: "Build",
    summary: "We ship to a real staging link from week one, with a demo every week.",
    what: "Engineering in focused increments. You get a live staging URL from the first week and a working demo every week, no black box.",
    deliverable: "Live staging environment, updated continuously, plus weekly demos.",
    duration: "2–10 weeks",
  },
  {
    n: "04",
    title: "Harden",
    summary: "An ISC2-certified SOC analyst reviews and hardens before you go live.",
    what: "Security review, performance pass (Lighthouse), accessibility checks, and load/error handling. We close the gaps most teams ship past.",
    deliverable: "Hardened, audit-ready build with a short security and performance report.",
    duration: "2–5 days",
  },
  {
    n: "05",
    title: "Support",
    summary: "We keep it running: monitoring, maintenance, and retainer support.",
    what: "Deployment to production, monitoring, and ongoing maintenance. Retainer options for teams that want us on call.",
    deliverable: "Production launch plus an optional support retainer.",
    duration: "Ongoing",
  },
];

export const communication = [
  {
    title: "Weekly demos",
    body: "Every week you see working software, not a status update. Progress is visible, not described.",
  },
  {
    title: "Shared channel",
    body: "A shared Slack or WhatsApp channel from day one. You talk to the engineers building your product, directly.",
  },
  {
    title: "Staging from week one",
    body: "A real staging link the moment we start building. You can click through progress whenever you want.",
  },
];
