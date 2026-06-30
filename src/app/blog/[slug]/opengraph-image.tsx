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

  const hasStats = post.stats && post.stats.length > 0;

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        background: "#0b0c15",
        padding: "60px 72px",
        fontFamily: "monospace, sans-serif",
      }}
    >
      {/* Tag */}
      <div
        style={{
          display: "flex",
          fontSize: "13px",
          fontFamily: "monospace",
          color: "#6ee7c0",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "24px",
        }}
      >
        {post.tag}
      </div>

      {/* Title */}
      <div
        style={{
          display: "flex",
          fontSize: "46px",
          fontWeight: 700,
          color: "#ffffff",
          lineHeight: 1.2,
          letterSpacing: "-0.5px",
          maxWidth: "1000px",
          flex: 1,
        }}
      >
        {post.title}
      </div>

      {/* Stat cards — driven from post.stats, never hardcoded */}
      {hasStats && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          {post.stats!.map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                border: "1px solid rgba(110, 231, 192, 0.2)",
                background: "rgba(110, 231, 192, 0.04)",
                borderRadius: "10px",
                padding: "16px 20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                  gap: "3px",
                }}
              >
                <span
                  style={{
                    fontSize: "30px",
                    fontWeight: 700,
                    color: "#6ee7c0",
                    fontFamily: "monospace",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </span>
                {stat.unit ? (
                  <span
                    style={{
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "rgba(110, 231, 192, 0.65)",
                      fontFamily: "monospace",
                      lineHeight: 1,
                    }}
                  >
                    {stat.unit}
                  </span>
                ) : null}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "11px",
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginTop: "8px",
                  fontFamily: "monospace",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #1e2030",
          paddingTop: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "18px",
            color: "#94a3b8",
            fontFamily: "sans-serif",
          }}
        >
          Piyush Gupta · Engineering Manager
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "18px",
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
