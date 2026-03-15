import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "the legal model — destroysaas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            color: "#dc2626",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          destroysaas
        </div>
        <div
          style={{
            color: "#f0f0f0",
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: 24,
          }}
        >
          you have rights here.
        </div>
        <div
          style={{
            color: "#a3a3a3",
            fontSize: 30,
            lineHeight: 1.3,
          }}
        >
          co-owner of a legal entity, not a customer clicking "I agree."
          <br />
          fork freedom. binding arbitration. real standing.
        </div>
        <div
          style={{
            color: "#525252",
            fontSize: 22,
            marginTop: 32,
          }}
        >
          destroysaas.coop/about/legal
        </div>
      </div>
    ),
    { ...size }
  );
}
