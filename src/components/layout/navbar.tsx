"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "Education", href: "/#education" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

const sectionIds = [
  "about",
  "projects",
  "skills",
  "experience",
  "education",
  "contact",
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const shouldReduce = useReducedMotion();

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
            <span className="gradient-text">piyushgupta.io</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
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
            className="min-h-[44px] min-w-[44px] md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduce ? 0 : 0.15 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl md:hidden"
            onClick={closeMenu}
          >
            <motion.nav
              initial={{ opacity: 0, y: shouldReduce ? 0 : -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduce ? 0 : -12 }}
              transition={{
                duration: shouldReduce ? 0 : 0.2,
                delay: shouldReduce ? 0 : 0.05,
              }}
              aria-label="Mobile navigation"
              className="flex flex-col gap-1 px-6 pt-24 pb-8"
              onClick={(e) => e.stopPropagation()}
            >
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`inline-flex h-14 items-center rounded-md px-3 text-base transition-colors hover:text-foreground ${
                    isActive(link.href)
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
