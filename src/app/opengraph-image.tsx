import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #0a0a0a 0%, #111827 100%)",
        padding: "80px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.1,
            letterSpacing: "-1px",
          }}
        >
          Piyush Gupta
        </div>
        <div
          style={{
            fontSize: "32px",
            fontWeight: 400,
            color: "#94a3b8",
            lineHeight: 1.3,
          }}
        >
          Engineering Manager
        </div>
        <div
          style={{
            fontSize: "22px",
            fontWeight: 400,
            color: "#64748b",
            lineHeight: 1.5,
            marginTop: "8px",
            maxWidth: "800px",
          }}
        >
          Building autonomous AI tooling · Platform engineering · 10M+ users
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "auto",
        }}
      >
        <div
          style={{
            fontSize: "20px",
            color: "#475569",
          }}
        >
          piyushgupta.io
        </div>
      </div>
    </div>,
    size,
  );
}
