import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import "./experience.css";
import "./lab.css";
import { MotionPreferences } from "@/components/experience/motion-preferences";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { ChatWidget } from "@/components/assistant/chat-widget";
import { ScrollProgress } from "@/components/scroll-progress";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/content/site";

const mono = localFont({
  src: "./fonts/JetBrainsMono.woff2",
  display: "swap",
  variable: "--font-mono",
  weight: "400 600",
});
const sans = localFont({
  src: "./fonts/Manrope.woff2",
  weight: "200 800",
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "TrustCode System, Software you can stake your business on",
    template: "%s",
  },
  description: site.description,
  keywords: [
    "web developer Lagos",
    "AWS consultant Nigeria",
    "cybersecurity services Lagos",
    "Next.js agency UK",
    "software engineering Nigeria",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/icon.svg",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080c14",
};

// The redesigned studio experience uses a consistent dark palette.
const themeInit = `(function(){document.documentElement.classList.add('dark');})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${mono.variable} ${sans.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <MotionPreferences>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-blueprint focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <JsonLd />
          {/* Wave-distortion filter for the background grid (.grid-bg) */}
          <svg aria-hidden width="0" height="0" className="absolute">
            <filter
              id="grid-wave"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.009 0.013"
                numOctaves={2}
                seed={4}
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                xChannelSelector="R"
                yChannelSelector="G"
                scale={16}
              />
            </filter>
          </svg>
          <ScrollProgress />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppFab />
          <ChatWidget />
          <Analytics />
          <SpeedInsights />
        </MotionPreferences>
      </body>
    </html>
  );
}
