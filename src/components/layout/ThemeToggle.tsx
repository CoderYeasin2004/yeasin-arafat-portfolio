"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";

/** No-op subscription: the mounted flag never changes after hydration. */
const subscribe = () => () => {};

/**
 * Hydration-safe "mounted" flag.
 *
 * The server snapshot is always `false` and the client snapshot `true`, so
 * server and first client render match exactly and React can hydrate without
 * mismatches — then the toggle swaps in the real theme icon. This avoids a
 * `setState`-in-effect pattern that React's lint rules rightly reject.
 */
function useMounted(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

/**
 * Light/dark theme toggle for the navbar.
 *
 * Reads the resolved theme (including "system") from next-themes and flips
 * between light and dark on click; the choice is persisted by next-themes
 * and applied before first paint by its blocking script.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
      onClick={() => setTheme(nextTheme)}
      className={className}
    >
      {mounted ? (
        isDark ? (
          <Moon aria-hidden className="size-4 transition-transform duration-300" />
        ) : (
          <Sun aria-hidden className="size-4 transition-transform duration-300" />
        )
      ) : (
        // Placeholder keeps the button's footprint stable until hydration.
        <Sun aria-hidden className="size-4 opacity-0" />
      )}
    </Button>
  );
}
