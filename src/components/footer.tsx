import Link from "next/link";
import { Logo } from "./logo";
import { site, social } from "@/content/site";
const footerLinks = [
  {
    title: "EXPLORE",
    items: [
      ["Selected work", "/work"],
      ["Our expertise", "/services"],
      ["The studio", "/about"],
      ["Our process", "/process"],
    ],
  },
  {
    title: "DISCOVER",
    items: [
      ["Interaction lab", "/lab"],
      ["Insights", "/insights"],
      ["Project planner", "/estimate"],
      ["Start a project", "/contact"],
    ],
  },
  {
    title: "SAY HELLO",
    items: [
      [site.email, `mailto:${site.email}`],
      ["GitHub ↗", social.github],
      ["LinkedIn ↗", social.linkedin],
      ["WhatsApp ↗", site.whatsapp],
    ],
  },
];
export function Footer() {
  return (
    <footer className="experience-footer">
      <div className="experience-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo />
            <p>
              Software you can stake your business on.
              <br />
              Based in Lagos. Building for the world.
            </p>
          </div>
          <div className="footer-links">
            {footerLinks.map((g) => (
              <div key={g.title}>
                <h3>{g.title}</h3>
                {g.items.map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    {...(href.startsWith("https")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden>
          TrustCode<span style={{ color: "#345681" }}>.</span>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} TRUSTCODE SYSTEM LIMITED · RC 9713661
          </span>
          <span>THOUGHTFULLY DESIGNED. DEPENDABLY ENGINEERED.</span>
          <a href="#main">BACK TO TOP ↑</a>
        </div>
      </div>
    </footer>
  );
}
