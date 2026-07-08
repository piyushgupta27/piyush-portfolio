"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Press", href: "/#press" },
  { label: "Projects", href: "/#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

const sectionIds = ["about", "experience", "press", "projects", "contact"];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const ratios = new Map<string, number>();
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            ratios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
          });
          let best = "";
          let bestRatio = 0;
          ratios.forEach((ratio, sectionId) => {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              best = sectionId;
            }
          });
          if (best) setActiveSection(best);
        },
        { threshold: [0, 0.1, 0.5], rootMargin: "-64px 0px -30% 0px" },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMenu = () => setOpen(false);

  const isActive = (href: string) =>
    href.startsWith("/#") && activeSection === href.slice(2);

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            className="inline-flex h-11 items-center font-mono text-sm font-bold tracking-wider"
          >
            <span className="text-primary">piyushgupta.io</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`inline-flex h-11 items-center rounded-md px-3 text-sm transition-colors hover:text-foreground ${
                  isActive(link.href)
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="min-h-[44px] min-w-[44px] cursor-pointer md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </nav>
      </header>

      {/* Mobile full-screen overlay — CSS fade-in, no framer-motion in layout bundle */}
      {open && (
        <div
          id="mobile-nav"
          className="animate-in fade-in fixed inset-0 z-40 bg-background/98 backdrop-blur-xl duration-150 md:hidden"
          onClick={closeMenu}
        >
          <nav
            aria-label="Mobile navigation"
            className="animate-in fade-in slide-in-from-top-3 flex flex-col gap-1 px-6 pb-8 pt-24 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`inline-flex h-14 items-center rounded-md px-3 text-base transition-colors hover:text-foreground ${
                  isActive(link.href)
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
