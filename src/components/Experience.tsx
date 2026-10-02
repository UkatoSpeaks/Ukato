import {
  contributionsStat,
  experience,
  github,
  projects,
  stats,
  type Stat,
} from "@/content/data";
import { getContributions } from "@/lib/github";
import { Stats } from "@/components/Stats";
import { Timeline } from "@/components/Timeline";

export async function Experience() {
  // This year's total, as under the heatmap.
  const year = new Date().getFullYear();
  const contributions = await getContributions(github.username, year);
  const last: Stat = contributions
    ? {
        value: String(contributions.total),
        label: `${contributionsStat.label} ${year}`,
      }
    : contributionsStat.fallback;

  return (
    <div>
      <ul className="space-y-14">
        {experience.map((job) => (
          <li key={`${job.company}-${job.start}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="text-lg leading-snug font-bold text-text">
                {job.role}
                <span aria-hidden className="mx-2.5 font-normal text-faint">
                  ·
                </span>
                <span className="font-semibold text-muted">
                  {job.company}
                  {job.location && (
                    <>
                      <span aria-hidden className="mx-2.5 font-normal text-faint">
                        ·
                      </span>
                      {job.location}
                    </>
                  )}
                </span>
              </h3>
              <p className="font-mono text-xs tracking-normal text-muted">
                {job.start} – {job.end}
              </p>
            </div>
            <p className="mt-2 text-[15px] leading-[1.6] text-soft">
              {job.summary}
            </p>
            <Timeline
              points={job.points.map((point) => {
                const project = projects.find((p) => p.title === point.title);
                return {
                  ...point,
                  href: project && `/projects/${project.slug}`,
                };
              })}
            />
          </li>
        ))}
      </ul>

      <Stats stats={[...stats, last]} />
    </div>
  );
}
