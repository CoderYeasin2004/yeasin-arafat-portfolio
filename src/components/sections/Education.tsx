import { BookOpen, CalendarDays, GraduationCap, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { education } from "@/data/education";

/** Supporting detail shown in the tile column beside the institute card. */
interface DetailTile {
  label: string;
  value: string;
  icon: LucideIcon;
}

const detailTiles: DetailTile[] = [
  { label: "Degree", value: education.degree, icon: GraduationCap },
  { label: "Department", value: education.department, icon: BookOpen },
  { label: "Current Semester", value: education.semester, icon: CalendarDays },
];

/**
 * Education section (`#education`).
 *
 * A standalone section between Skills and Projects — it is intentionally not
 * folded into About. Content comes from `data/education.ts` and contains only
 * the supplied facts (institute, department, degree, semester, location):
 * no GPA, year of passing or achievements are shown.
 *
 * Styling reuses the shared `surface-card` / `glow-on-hover` / `gradient-line`
 * language, so light and dark themes inherit it unchanged.
 */
export function Education() {
  return (
    <section id="education" className="relative scroll-mt-24 py-24 sm:py-28">
      {/* Soft section backdrop, matching the other sections' ambient orbs */}
      <div
        aria-hidden
        className="orb -right-32 top-1/3 h-72 w-72 bg-cyan-500/20"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Education"
          title="My Education"
          description="The programme I am currently pursuing, along with my department and semester."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Institute card */}
          <Reveal>
            <article className="surface-card glow-on-hover relative h-full rounded-2xl p-7">
              <div
                aria-hidden
                className="gradient-line absolute top-0 left-7 h-px w-20"
              />

              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/20 to-cyan-400/15 text-accent-text ring-1 ring-accent/30">
                    <GraduationCap aria-hidden className="size-6" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.3em] text-accent-text uppercase">
                      Institute
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-balance text-foreground sm:text-2xl">
                      {education.institute}
                    </h3>
                  </div>
                </div>

                {/* Subtle enrolment status — the dot reuses the shared
                    `pulse-dot` keyframes so it behaves like the hero badge. */}
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent-text">
                  <span
                    aria-hidden
                    className="size-1.5 rounded-full bg-accent"
                    style={{ animation: "pulse-dot 2.4s ease-in-out infinite" }}
                  />
                  {education.status}
                </span>
              </div>

              <div
                aria-hidden
                className="gradient-line mt-6 h-px w-full opacity-60"
              />

              <p className="mt-6 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-accent-text" />
                <span>{education.location}</span>
              </p>
            </article>
          </Reveal>

          {/* Degree / department / semester tiles */}
          <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1 lg:grid-rows-3">
            {detailTiles.map((tile, index) => {
              const Icon = tile.icon;

              return (
                <Reveal key={tile.label} delay={(index + 1) * 0.08}>
                  <article className="surface-card glow-on-hover h-full rounded-2xl p-6">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500/20 to-cyan-400/15 text-accent-text ring-1 ring-accent/30">
                        <Icon aria-hidden className="size-4.5" />
                      </span>
                      <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                        {tile.label}
                      </p>
                    </div>
                    <p className="mt-4 text-base font-semibold text-balance text-foreground">
                      {tile.value}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
