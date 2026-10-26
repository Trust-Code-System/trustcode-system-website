import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "TrustCode System, Software you can stake your business on";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F7F8F6",
          backgroundImage:
            "linear-gradient(to right, #E3E7E2 1px, transparent 1px), linear-gradient(to bottom, #E3E7E2 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#1B3FAE",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 40,
              fontWeight: 700,
            }}
          >
            ✓
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 34, fontWeight: 700, color: "#10151F" }}>
              TrustCode
            </span>
            <span
              style={{
                fontSize: 16,
                letterSpacing: 4,
                color: "#5B6472",
                textTransform: "uppercase",
              }}
            >
              Systems
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span
            style={{
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.05,
              color: "#10151F",
              letterSpacing: -2,
              maxWidth: 980,
            }}
          >
            Software you can stake your business on.
          </span>
          <span style={{ fontSize: 26, color: "#5B6472", maxWidth: 900 }}>
            Product engineering · Cloud · AI · Security.
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 22,
              color: "#0E9F6E",
              fontWeight: 600,
            }}
          >
            ● LIVE
          </span>
          <span style={{ fontSize: 22, color: "#5B6472" }}>
            Lagos · London · Remote worldwide
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
