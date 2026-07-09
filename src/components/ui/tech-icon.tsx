import { techIcons } from "@/data/tech-icons";

interface TechIconProps {
  slug: string;
  size?: number;
}

export function TechIcon({ slug, size = 18 }: TechIconProps) {
  const icon = techIcons[slug];
  if (!icon) return null;
  if (!icon.path) {
    return (
      <span
        aria-hidden="true"
        style={{
          color: `#${icon.hex}`,
          fontSize: "9px",
          fontWeight: 700,
          fontFamily: "monospace",
          lineHeight: 1,
        }}
      >
        {icon.title}
      </span>
    );
  }
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      style={{ fill: `#${icon.hex}`, flexShrink: 0 }}
    >
      <path d={icon.path} />
    </svg>
  );
}
