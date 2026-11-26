"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * Theme provider wrapper.
 *
 * `next-themes` writes the resolved theme as a `class` on <html> (matching
 * the `.dark` token block in globals.css) and injects a blocking script that
 * applies the stored/system theme before first paint — preventing the
 * light/dark flash on load. Transitions stay enabled so switching themes is
 * a subtle 300ms fade (see globals.css) instead of a hard cut.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
