import { itemPrice, priceFor } from "@/lib/pricing";

function price(id: string) {
  const item = priceFor(id);
  if (!item) throw new Error(`Unknown service price: ${id}`);
  return itemPrice(item);
}

function timeline(id: string) {
  return priceFor(id)?.timeline ?? "Agreed after scoping";
}

export const servicePageUi = {
  home: "Home",
  services: "Services",
  breadcrumb: "Breadcrumb",
  heroProof: "From our portfolio",
  caseStudy: "Explore the case study",
  scopeEyebrow: "your starting point",
  preparation: "What to bring",
  benefitsEyebrow: "built around your business",
  benefitsTitle: "Useful for your customers. Clear for your team.",
  processEyebrow: "how we work",
  processTitle: "A clear route from brief to handover.",
  proofEyebrow: "selected work",
  pricingEyebrow: "starting prices",
  pricingTitle: "Choose a starting scope.",
  pricingIntro:
    "We confirm the scope and final price in a written proposal before work starts.",
  scopeCta: "Discuss this scope",
  questionsEyebrow: "questions, answered",
  questionsTitle: "Before we start.",
  relatedEyebrow: "explore services",
  relatedTitle: "Looking for something else?",
  hubTitle: "Find the right starting point.",
  hubEyebrow: "websites, stores & care",
  explore: "Explore the service",
  closingTitle: "Tell us what your business needs next.",
  closingIntro:
    "Start with a project brief, or book a free 15-minute call to work through the scope together.",
  careTitle: "Care with a clear scope.",
  careEyebrow: "your monthly plan",
  careNote:
    "Coverage, edit allowances and response commitments are agreed after reviewing your website.",
};

export type ServicePage = {
  slug: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  headline: string;
  intro: string;
  audience: string;
  primaryPriceId: string;
  priceIds: string[];
  cta: string;
  hubSummary: string;
  heroProject?: string;
  proofSlugs: string[];
  proofTitle: string;
  proofIntro: string;
  benefits: { title: string; body: string }[];
  scopeTitle: string;
  scope: string[];
  preparation: string;
  steps: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "business-websites",
    name: "Business websites",
    seoTitle: "Business Website Design in Lagos",
    seoDescription: `Business website design ${price("business-website").toLowerCase()}. Clear service pages, mobile layouts and enquiry routes. Lagos-based, serving Nigeria and the UK remotely.`,
    headline: "A business website that makes the next step clear.",
    intro:
      "Give people a useful place to understand your business, see your work and get in touch. We plan, design and build around the questions your customers ask before they enquire.",
    audience:
      "For service businesses, property companies and growing teams in Nigeria and the UK. Based in Lagos, working remotely worldwide.",
    primaryPriceId: "business-website",
    priceIds: ["landing-page", "business-website", "corporate-website"],
    cta: "Plan my business website",
    hubSummary:
      "Explain what you do, show relevant work and give customers a clear way to enquire.",
    heroProject: "sekibat",
    proofSlugs: ["sekibat"],
    proofTitle: "See how a property business presents its work.",
    proofIntro:
      "Sekibat brings property listings, service information and enquiry routes together. It is an example of our website work; your scope and price are agreed separately.",
    benefits: [
      {
        title: "Make your offer easier to understand",
        body: "Organise your services, examples and common questions around the decisions your customers need to make.",
      },
      {
        title: "Make contact straightforward",
        body: "Give visitors clear enquiry routes, with the form, WhatsApp or call-booking option agreed for your project.",
      },
      {
        title: "Keep ownership clear",
        body: "Your code, domain and accounts belong to you. We agree the handover and any ongoing support before the build starts.",
      },
    ],
    scopeTitle: "A practical foundation for your business.",
    scope: [
      "A page structure and design agreed around your business",
      "Responsive layouts for phones, tablets and computers",
      "Service, company and contact information within the agreed page count",
      "Enquiry entry points matched to how your team works",
      "Review on a staging link, QA, deployment and handover",
      "30 days of post-launch support for the delivered build",
    ],
    preparation:
      "Bring your service details, logo, available photographs and examples of the enquiries you want. We identify copywriting, a content editor, extra pages and search-engine setup separately in the proposal when needed.",
    steps: [
      {
        title: "Agree the job",
        body: "We discuss your customers, content and required pages, then set the scope, price and delivery plan in writing.",
      },
      {
        title: "Review the build",
        body: "Review the design and follow progress through weekly demos and a staging link. Feedback becomes part of the agreed delivery process.",
      },
      {
        title: "Launch with a handover",
        body: "We check the agreed pages and enquiry routes, deploy the website and hand over the code and accounts.",
      },
    ],
    faqs: [
      {
        question: "How much does a business website cost?",
        answer: `Business website: ${price("business-website")} for up to six pages. Landing page: ${price("landing-page")}. Corporate website: ${price("corporate-website")}. The final scope and price are confirmed in a written proposal. Hosting, domain and third-party fees are separate.`,
      },
      {
        question: "How long does a business website take?",
        answer: `The standard starting timeline is ${timeline("business-website")} for a business website. Content readiness, page count, feedback and additional features affect the schedule. Your proposal confirms the delivery plan.`,
      },
      {
        question: "Can you redesign a website we already have?",
        answer: `Yes. We first review the existing website, content and access. Website redesign is ${price("redesign").toLowerCase()}; the right scope depends on what can be retained and what needs rebuilding.`,
      },
      {
        question: "Will we be able to update the content?",
        answer:
          "We agree editing needs during discovery. A content editor can be included where required; it is not assumed in every starting scope. Corporate website pricing includes a blog/content editor.",
      },
      {
        question: "Do you work with UK businesses?",
        answer:
          "Yes. TrustCode is based in Lagos and serves clients in Nigeria, the UK and elsewhere remotely. We use online calls, staging links and written feedback to keep delivery clear across locations.",
      },
      {
        question: "What happens after launch?",
        answer:
          "Every build includes 30 days of free support after launch. Ongoing maintenance is available through a separately agreed monthly care plan. You retain ownership of the code, domain and accounts.",
      },
    ],
  },
  {
    slug: "ecommerce-development",
    name: "E-commerce development",
    seoTitle: "E-Commerce Website Development in Nigeria",
    seoDescription: `Online stores ${price("online-store").toLowerCase()}, with an agreed catalogue, checkout and order workflow. Lagos-based development for Nigerian and international brands.`,
    headline: "An online store built around how you sell.",
    intro:
      "Bring your products, brand and buying journey into one considered storefront. We scope the catalogue, payments, order handling and customer-care routes before the build begins.",
    audience:
      "For fashion, jewellery and retail brands selling in Nigeria or serving customers internationally. Based in Lagos, working remotely worldwide.",
    primaryPriceId: "online-store",
    priceIds: ["online-store", "custom-store", "marketplace"],
    cta: "Plan my online store",
    hubSummary:
      "Bring your catalogue, shopping journey and order workflow into an online store shaped around your brand.",
    heroProject: "wearables-by-ashabi",
    proofSlugs: ["wearables-by-ashabi", "nelo-woman"],
    proofTitle: "Storefront work you can explore.",
    proofIntro:
      "Explore the fashion storefront for Wearables by Ashabi and the NELO Woman storefront-interface preview, including regional shopping and atelier entry points.",
    benefits: [
      {
        title: "Keep the brand present while people shop",
        body: "Connect your collection imagery and product information with a shopping journey that feels consistent from the first page onward.",
      },
      {
        title: "Agree the buying journey early",
        body: "Map variants, payments, delivery information and order communications before deciding what the store needs to do.",
      },
      {
        title: "Give the team a manageable handover",
        body: "Agree catalogue and order-management needs, account ownership and the practical work your team will handle after launch.",
      },
    ],
    scopeTitle: "Work out the selling details before the screens.",
    scope: [
      "Product and collection structure within the agreed catalogue size",
      "Mobile-friendly product, cart and checkout journeys",
      "Paystack or Stripe integration where the merchant account is eligible",
      "Order emails and agreed inventory/order-management requirements",
      "Customer-care, shipping and returns information supplied by your team",
      "Staging reviews, QA, launch and an ownership handover",
    ],
    preparation:
      "Bring product information, images, variants, prices, delivery rules and returns policies. Merchant accounts, domains, hosting, payment processing and other third-party fees remain separate. Bespoke orders, wholesale and multi-currency requirements need explicit scoping.",
    steps: [
      {
        title: "Map the order",
        body: "We agree the catalogue, customer journey, payment provider and how your team will process an order.",
      },
      {
        title: "Build and review",
        body: "Review the storefront and agreed workflows on staging, with weekly demos and a clear feedback process.",
      },
      {
        title: "Test and hand over",
        body: "Test the scoped buying and order routes with the relevant accounts, then launch and hand over the store and its access.",
      },
    ],
    faqs: [
      {
        question: "What does an online store cost?",
        answer: `Starter online store: ${price("online-store")} for a standard scope of up to about 50 products, payments through Paystack or Stripe and order emails. Custom store: ${price("custom-store")}. Multi-vendor marketplace: ${price("marketplace")}. A written proposal confirms the final scope and price.`,
      },
      {
        question: "How long does an online store take?",
        answer: `The starting timeline is ${timeline("online-store")} for a starter store and ${timeline("custom-store")} for a custom store. Catalogue readiness, integrations and feedback affect delivery. We agree the actual plan before work starts.`,
      },
      {
        question: "Can customers pay from Nigeria or abroad?",
        answer:
          "We can scope Paystack or Stripe integration and the required checkout currencies. Availability depends on your merchant account, business and target markets. Provider onboarding, eligibility and processing fees are confirmed with the relevant provider.",
      },
      {
        question: "Can the store support made-to-order or wholesale products?",
        answer:
          "Yes, these can be scoped in a custom-store engagement. We first define the information collected, approval steps, production expectations and how pricing or delivery differs from the standard catalogue.",
      },
      {
        question:
          "Do you provide product photos or upload an unlimited catalogue?",
        answer:
          "You supply approved product content and imagery unless separate content work is agreed. Catalogue size and import work are defined in the proposal; the starter scope is up to about 50 products.",
      },
      {
        question: "What do the portfolio examples show?",
        answer:
          "Wearables by Ashabi demonstrates a public fashion storefront. The NELO Woman preview demonstrates collection, regional shopping and atelier interfaces. For your store, payment and order-processing requirements are separately scoped and tested before launch.",
      },
    ],
  },
  {
    slug: "website-maintenance",
    name: "Website maintenance",
    seoTitle: "Website Maintenance & Support in Nigeria",
    seoDescription: `Website care ${price("basic-care").toLowerCase()}: agreed backups, updates, uptime checks and small changes. Lagos-based maintenance and support for businesses online.`,
    headline: "Give your website a plan for what happens next.",
    intro:
      "A launch is the start of running a website. Keep updates, backups and small changes organised through a monthly care plan with a clear scope and a team you can contact.",
    audience:
      "For businesses with an existing website, including sites built by another team. Based in Lagos, supporting clients remotely in Nigeria, the UK and worldwide.",
    primaryPriceId: "basic-care",
    priceIds: ["basic-care", "standard-care", "growth-care"],
    cta: "Discuss my website care",
    hubSummary:
      "Keep updates, backups and small changes organised with an agreed monthly care plan.",
    proofSlugs: [],
    proofTitle: "A clear scope before a monthly commitment.",
    proofIntro:
      "We review access, hosting and the condition of your website before confirming the care plan. You receive a written scope covering responsibilities, allowances and the process for requesting changes.",
    benefits: [
      {
        title: "Know what is covered",
        body: "Agree the update work, monitoring and edit allowance for your website, with a separate scope for bigger improvements.",
      },
      {
        title: "Keep routine work visible",
        body: "Put backups, applicable security updates and uptime checks into an organised care process rather than relying on memory.",
      },
      {
        title: "Keep the accounts in your name",
        body: "You retain ownership of your website and accounts. We agree the access needed to deliver support and how changes are handed over.",
      },
    ],
    scopeTitle: "Choose the amount of care your site needs.",
    scope: [
      "Hosting setup and access review within the agreed scope",
      "Backups, uptime checks and applicable security updates",
      "A defined allowance for edits or agreed developer work",
      "A clear contact route and a process for prioritising requests",
      "A separate proposal for work outside the monthly allowance",
      "A monthly report on the Standard plan",
    ],
    preparation:
      "Share the website URL and describe what needs attention. We review the platform, hosting and available access before confirming coverage. Hosting, domains and third-party subscriptions are separate; major rebuilds, incident recovery and new features need explicit agreement.",
    steps: [
      {
        title: "Review the website",
        body: "We understand the platform, current condition and available access, then identify onboarding work or a separate audit if required.",
      },
      {
        title: "Agree the care plan",
        body: "Set the monthly allowance, responsibilities, request process and any response commitments in writing.",
      },
      {
        title: "Maintain and improve",
        body: "Carry out the agreed checks and changes, and scope larger work separately so the monthly plan stays understandable.",
      },
    ],
    faqs: [
      {
        question: "How much does website maintenance cost?",
        answer: `Basic care: ${price("basic-care")}. Standard care: ${price("standard-care")}. Growth: ${price("growth-care")}. Plans are billed monthly in advance, and coverage is confirmed after reviewing the website.`,
      },
      {
        question: "What is included in Basic care?",
        answer:
          "The approved starting scope covers hosting setup, backups, uptime checks, security updates and one hour of small edits each month. Hosting charges, domains and third-party fees are separate.",
      },
      {
        question: "What changes with Standard or Growth?",
        answer:
          "Standard includes everything in Basic, four hours of edits or improvements and a monthly report. Growth provides dedicated developer hours for new features, with the actual allowance and scope agreed to fit your needs.",
      },
      {
        question: "Can you maintain a website built by someone else?",
        answer:
          "Yes, subject to an initial review. We need to understand its platform, access, hosting and condition before accepting responsibility. An audit or remedial work may be quoted separately.",
      },
      {
        question: "Does a care plan guarantee uptime or immediate fixes?",
        answer:
          "Monitoring and support are agreed services, not a promise that failures cannot occur. Any response targets, escalation process and out-of-hours coverage must be explicitly agreed in your plan.",
      },
      {
        question: "Are major redesigns or security incidents included?",
        answer:
          "They are not automatically covered by a small-edit allowance. We assess the work and confirm a separate scope where needed. Ask us to clarify incident response or new-feature requirements before choosing a plan.",
      },
    ],
  },
];

export function servicePageFor(slug: string) {
  return servicePages.find((page) => page.slug === slug);
}
