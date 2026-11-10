import { commercialTerms, priceFor, itemPrice } from "@/lib/pricing";

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "How do you price a website or platform?",
    a: `See the starting prices on our Services page. For example, a business website is ${itemPrice(priceFor("business-website")!)}. ${commercialTerms.disclaimer}`,
  },
  {
    q: "How long will my project take?",
    a: `Typical starting timelines: landing page ${priceFor("landing-page")!.timeline}, business website ${priceFor("business-website")!.timeline}, starter online store ${priceFor("online-store")!.timeline}, and web app ${priceFor("app-platform")!.timeline}. Scope and feedback affect delivery. We agree a written plan and share progress on staging.`,
  },
  {
    q: "How do payments work?",
    a: `${commercialTerms.payment} Terms and scope are agreed in your written proposal before work begins.`,
  },
  {
    q: "Who owns the code and the accounts?",
    a: "You do. Code, domain, hosting, and third-party accounts are set up in your name (or transferred to you at handover), so you are never locked in to us to keep your product running.",
  },
  {
    q: "How do we communicate during the build?",
    a: "Weekly demos, a shared channel (WhatsApp, Slack, or email - your choice), and a live staging link from week one so you can see and click the real product as it grows. Communication is a deliverable, not a courtesy.",
  },
  {
    q: "Do you work with clients outside Nigeria and the UK?",
    a: "Yes. Based in Lagos, Nigeria. Working remotely worldwide. We schedule calls across time zones and can work with the payment arrangements that suit your organisation.",
  },
  {
    q: "What happens after launch?",
    a: `${commercialTerms.support} We hand over your code and accounts. Optional monthly care plans cover ongoing maintenance and improvements; see the Services pricing section for starting prices.`,
  },
  {
    q: "Can you take over or fix an existing project?",
    a: "Yes. We regularly take over half-finished builds, redesign existing sites, and audit codebases from other developers. We'll review what exists first and tell you honestly what's worth keeping.",
  },
];
