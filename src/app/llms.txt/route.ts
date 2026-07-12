import { site, socialLinks, nav } from "@/content/site";
import { team } from "@/content/team";
import { services } from "@/content/services";

// llms.txt, a plain-text/markdown summary of the company for AI crawlers and
// assistants (an emerging convention; see https://llmstxt.org). Generated from
// site content so it never drifts. Served at /llms.txt.
export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.thesis}`,
    "",
    `- Website: ${site.url}`,
    `- Email: ${site.email}`,
    `- WhatsApp: ${site.phone}`,
    `- Locations: ${site.locations.join(" · ")} · remote worldwide`,
    socialLinks.length ? `- Profiles: ${socialLinks.join(" · ")}` : "",
    "",
    "## About",
    "",
    site.description,
    "",
    "## Services",
    "",
    ...services.map((s) => `- **${s.title}**, ${s.short}`),
    "",
    "## Team",
    "",
    ...team.map((f) => `- **${f.name}**, ${f.role} (${f.location})`),
    "",
    "## Key pages",
    "",
    ...nav.map((n) => `- [${n.label}](${site.url}${n.href})`),
    "",
  ];

  return new Response(lines.filter((l) => l !== undefined).join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
