import { techIcons } from "@/data/tech-icons";

interface TechIconProps {
  slug: string;
  size?: number;
}

export function TechIcon({ slug, size = 18 }: TechIconProps) {
  const icon = techIcons[slug];
  if (!icon) return null;
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={icon.title}
      width={size}
      height={size}
      style={{ fill: `#${icon.hex}`, flexShrink: 0 }}
    >
      <path d={icon.path} />
    </svg>
  );
}
