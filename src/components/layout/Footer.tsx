import Link from "next/link";
import { navLinks } from "@/config/site";
import { profile } from "@/data/profile";
import { FooterActions } from "@/components/layout/FooterActions";
import { SocialLinks } from "@/components/shared/SocialLinks";

/**
 * Copyright year.
 *
 * The value is cached at build time (`"use cache"`) because Next.js'
 * prerender pass rejects unstable values like `new Date()` in the static
 * shell — caching makes the output deterministic while still refreshing on
 * every build.
 */
async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

/**
 * Site footer — server component.
 *
 * Mirrors the navbar navigation so users who scrolled to the bottom can jump
 * anywhere (or open the resume) without scrolling back up.
 */
export function Footer() {
  return (
    <footer className="no-print border-t border-border bg-background/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Brand block */}
        <div className="space-y-3">
          <p className="flex items-center gap-2 text-sm font-bold tracking-[0.22em]">
            <span
              aria-hidden
              className="size-2.5 rounded-full bg-gradient-to-br from-sky-500 to-cyan-400"
            />
            {profile.brand}
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            {profile.role} building modern, scalable and user-friendly web
            applications.
          </p>
          <SocialLinks size="sm" />
        </div>

        {/* Quick links */}
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © <CopyrightYear /> {profile.name}. All rights reserved.
          </p>

          {/* Availability status + back-to-top, filling the empty corner. */}
          <FooterActions className="mt-1 sm:mt-0" />
        </div>
      </div>
    </footer>
  );
}
