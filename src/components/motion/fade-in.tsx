"use client";

import type { ReactNode, CSSProperties } from "react";
import { useInView } from "@/hooks/use-in-view";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

const directionKeyframe: Record<string, string> = {
  up: "fade-in-up",
  down: "fade-in-down",
  left: "fade-in-left",
  right: "fade-in-right",
};

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className,
}: FadeInProps) {
  const { ref, inView } = useInView();
  const style: CSSProperties = inView
    ? {
        animation: `${directionKeyframe[direction]} 0.6s cubic-bezier(0.21,0.47,0.32,0.98) ${delay}s both`,
      }
    : { opacity: 0 };
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
