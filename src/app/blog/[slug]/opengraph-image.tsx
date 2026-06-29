import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/content/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogOGImage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return new ImageResponse(
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#0b0c15",
        }}
      />,
      size,
    );
  }

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        background: "#0b0c15",
        padding: "72px 80px",
        fontFamily: "monospace, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: "16px",
          fontFamily: "monospace",
          color: "#6ee7c0",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "28px",
        }}
      >
        {post.tag}
      </div>

      <div
        style={{
          display: "flex",
          fontSize: "52px",
          fontWeight: 700,
          color: "#ffffff",
          lineHeight: 1.15,
          letterSpacing: "-1px",
          maxWidth: "980px",
          flex: 1,
        }}
      >
        {post.title}
      </div>

      {post.githubUrl && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "32px",
            marginBottom: "32px",
            fontFamily: "monospace",
            fontSize: "18px",
          }}
        >
          <span style={{ color: "#6ee7c0", fontWeight: 700 }}>14 min</span>
          <span style={{ color: "#64748b" }}>·</span>
          <span style={{ color: "#6ee7c0", fontWeight: 700 }}>4 agents</span>
          <span style={{ color: "#64748b" }}>·</span>
          <span style={{ color: "#6ee7c0", fontWeight: 700 }}>87%</span>
          <span style={{ color: "#64748b" }}>straight-through</span>
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #1e2030",
          paddingTop: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "20px",
            color: "#94a3b8",
            fontFamily: "sans-serif",
          }}
        >
          Piyush Gupta · Sr Engineering Manager
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "20px",
            color: "#6ee7c0",
            fontFamily: "monospace",
          }}
        >
          piyushgupta.io
        </div>
      </div>
    </div>,
    size,
  );
}
