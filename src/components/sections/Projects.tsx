import { ArrowUpRight } from "lucide-react";
import { GithubIcon, type BrandIcon } from "@/components/icons/brand";
import Image from "next/image";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";

/** Real screenshots mapped to projects in display order. */
const projectImages = [
  "/images/repair-lagbe.png",
  "/images/studio-space.png",
  "/images/bazar-dor.png",
];

interface ProjectLinkProps {
  href: string;
  label: string;
  icon: BrandIcon;
}

/** External project action link that opens in a new tab. */
function ProjectLink({ href, label, icon: Icon }: ProjectLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/70 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent/50 hover:bg-accent/10"
    >
      <Icon aria-hidden className="size-3.5" />
      {label}
      <ArrowUpRight aria-hidden className="size-3" />
    </a>
  );
}

/**
 * Featured projects section (`#projects`).
 *
 * Renders exactly three real projects from `data/projects.ts` in order, with
 * the highlighted entry carrying a "Featured" badge. Each card opens with a
 * real screenshot in a consistent 16:9 frame that zooms gently on hover.
 */
export function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Projects"
          title="Featured Projects"
          description="A selection of work — project details live in one editable data file."
        />

        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.1}>
              <article className="surface-card glow-on-hover group flex h-full flex-col overflow-hidden rounded-2xl">
                {/* Screenshot — 16:9 frame, object-cover to avoid distortion, subtle hover zoom */}
                <div className="relative aspect-video overflow-hidden border-b border-border bg-muted">
                  <Image
                    src={projectImages[index]}
                    alt={`${project.title} screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {project.title}
                    </h3>
                    {project.featured ? (
                      <Badge
                        variant="secondary"
                        className="border-accent/30 bg-accent/10 text-accent-text"
                      >
                        Featured
                      </Badge>
                    ) : null}
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li key={tag}>
                        <Badge
                          variant="outline"
                          className="border-accent/30 bg-accent/10 text-accent-text"
                        >
                          {tag}
                        </Badge>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2.5 border-t border-border pt-5">
                    <ProjectLink
                      href={project.githubUrl}
                      label="GitHub"
                      icon={GithubIcon}
                    />
                    <ProjectLink
                      href={project.liveUrl}
                      label="Live Demo"
                      icon={ArrowUpRight}
                    />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
