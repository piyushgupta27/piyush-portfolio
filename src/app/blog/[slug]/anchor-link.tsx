"use client";

import { useState } from "react";

interface AnchorLinkProps {
  id: string;
  label: string;
}

export function AnchorLink({ id, label }: AnchorLinkProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.history.pushState(null, "", `#${id}`);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }).catch(() => {});
  };

  return (
    <a
      href={`#${id}`}
      onClick={handleClick}
      className="ml-2 font-normal text-lg text-muted-foreground/30 opacity-0 transition-opacity group-hover:opacity-100 hover:text-primary"
      aria-label={`Link to ${label}`}
    >
      {copied ? "✓" : "#"}
    </a>
  );
}
