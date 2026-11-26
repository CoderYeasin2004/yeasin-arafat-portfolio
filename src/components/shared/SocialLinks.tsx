import { GithubIcon, LinkedinIcon, type BrandIcon } from "@/components/icons/brand";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  className?: string;
  /** Size of the icon hit area, in Tailwind size units. */
  size?: "sm" | "md";
}

interface SocialPlatform {
  label: string;
  href: string;
  icon: BrandIcon;
}

/** External profiles shared by the hero, contact section and footer. */
const platforms: SocialPlatform[] = [
  { label: "GitHub", href: profile.links.github, icon: GithubIcon },
  { label: "LinkedIn", href: profile.links.linkedin, icon: LinkedinIcon },
];

/**
 * Accessible GitHub / LinkedIn icon links.
 *
 * Links open in a new tab with `rel="noopener noreferrer"` for safety and
 * carry visible focus rings plus screen-reader labels.
 */
export function SocialLinks({ className, size = "md" }: SocialLinksProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {platforms.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${label} profile (opens in a new tab)`}
          className={cn(
            "surface-card glow-on-hover inline-flex items-center justify-center rounded-xl text-muted-foreground transition-colors hover:text-foreground",
            size === "md" ? "size-11" : "size-9",
          )}
        >
          <Icon aria-hidden className={size === "md" ? "size-5" : "size-4"} />
        </a>
      ))}
    </div>
  );
}
