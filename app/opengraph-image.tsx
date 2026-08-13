import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const runtime = "edge";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#060608",
          color: "#f4f3f0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 26,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#9a9aa6",
          }}
        >
          <span>{site.name}</span>
          <span>AI Engineer</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
            }}
          >
            Intelligent systems,
          </div>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              color: "#9a9aa6",
            }}
          >
            experienced.
          </div>
        </div>

        <div
          style={{
            fontSize: 24,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#9a9aa6",
          }}
        >
          Portfolio — Come experience what I built
        </div>
      </div>
    ),
    size
  );
}
