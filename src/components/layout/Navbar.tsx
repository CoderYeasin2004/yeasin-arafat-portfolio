"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { navLinks, sectionLinks } from "@/config/site";
import { profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

/**
 * Section ids watched by the scroll spy.
 * Derived from config at module scope so the array reference stays stable
 * and the observer inside the hook is never needlessly re-created.
 */
const SECTION_IDS = sectionLinks.map((link) => link.href.replace("#", ""));

/**
 * Fixed primary navigation.
 *
 * Behaviour:
 * - sticks to the top with a frosted backdrop,
 * - highlights the section currently in view (desktop only),
 * - smooth-scrolls to homepage sections (scroll offset comes from
 *   `scroll-padding-top` in globals.css),
 * - links directly to the real resume PDF at /resume.pdf,
 * - collapses into an accessible mobile menu that closes after navigation.
 */
export function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // The scroll spy only watches homepage sections; on any other route the
  // hook finds no elements and simply stays idle.
  const activeSection = useActiveSection(SECTION_IDS);
  const isHomepage = pathname === "/";

  /** Closes the mobile menu when it loses relevance (navigation, Escape). */
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const isActive = (href: string): boolean => {
    // The PDF opens in the browser rather than an app route, so it never
    // participates in section highlighting.
    if (href.endsWith(".pdf")) return false;
    return isHomepage && activeSection === href.replace("#", "");
  };

  /** Hash links need the homepage origin path when visited from another route. */
  const resolveHref = (href: string): string =>
    href.startsWith("#") && !isHomepage ? `/${href}` : href;

  /** Static assets use a plain anchor so the router does not intercept them. */
  const isPdfLink = (href: string): boolean => href.endsWith(".pdf");

  return (
    <header className="no-print fixed inset-x-0 top-0 z-50 border-b border-border bg-background/75 backdrop-blur-xl">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        {/* Brand */}
        <Link
          href="/#home"
          className="group flex items-center gap-2 text-sm font-bold tracking-[0.22em] text-foreground"
        >
          <span
            aria-hidden
            className="size-2.5 rounded-full bg-gradient-to-br from-sky-500 to-cyan-400 shadow-[0_0_12px_rgb(56_189_248_/_0.7)] transition-transform duration-300 group-hover:scale-125"
          />
          {profile.brand}
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const isResume = isPdfLink(link.href);
            const className = cn(
              "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
              isResume
                ? "ml-2 border border-border text-foreground hover:border-accent/50 hover:bg-muted"
                : "text-muted-foreground hover:text-foreground",
              active && !isResume && "text-foreground",
            );

            return (
              <li key={link.href}>
                {isResume ? (
                  <a href={resolveHref(link.href)} className={className}>
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={resolveHref(link.href)}
                    aria-current={active ? "page" : undefined}
                    className={className}
                  >
                    {link.label}
                    {active ? (
                      <span
                        aria-hidden
                        className="gradient-line absolute inset-x-3 -bottom-0.5 h-px rounded-full"
                      />
                    ) : null}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {/* Theme toggle + mobile menu toggle */}
        <div className="flex items-center gap-2">
          <ThemeToggle className="size-10 rounded-xl border border-border bg-card/60 text-foreground hover:bg-muted hover:text-foreground" />
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="surface-card inline-flex size-10 items-center justify-center rounded-xl text-foreground transition-colors hover:text-accent-text lg:hidden"
          >
            {isMenuOpen ? (
              <X aria-hidden className="size-5" />
            ) : (
              <Menu aria-hidden className="size-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile navigation panel */}
      <AnimatePresence initial={false}>
        {isMenuOpen ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background/95 lg:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                const className = cn(
                  "flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors",
                  active
                    ? "bg-accent/10 text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                );

                return (
                  <li key={link.href}>
                    {isPdfLink(link.href) ? (
                      <a
                        href={resolveHref(link.href)}
                        onClick={() => setIsMenuOpen(false)}
                        className={className}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={resolveHref(link.href)}
                        onClick={() => setIsMenuOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={className}
                      >
                        {link.label}
                        {active ? (
                          <span
                            aria-hidden
                            className="size-1.5 rounded-full bg-gradient-to-br from-sky-500 to-cyan-400"
                          />
                        ) : null}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Compact social row keeps profiles one tap away on mobile. */}
            <div className="mx-auto flex max-w-6xl items-center gap-4 border-t border-border px-4 py-4 sm:px-6">
              <ThemeToggle className="size-9 rounded-lg border border-border bg-card/60 text-foreground hover:bg-muted" />
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in a new tab)"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <GithubIcon className="size-5" />
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile (opens in a new tab)"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <LinkedinIcon className="size-5" />
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
