"use client";

import { type ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
}

export function StaggerChildren({ children, className }: StaggerChildrenProps) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      data-stagger={inView ? "visible" : "hidden"}
    >
      {children}
    </div>
  );
}
