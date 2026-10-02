import {
  contributionsStat,
  experience,
  github,
  stats,
  type Stat,
} from "@/content/data";
import { getContributions } from "@/lib/github";
import { Stats } from "@/components/Stats";
import { Timeline } from "@/components/Timeline";

/** "Apr 2026", "Jun 2026" → "Apr – Jun 2026"; different years keep both. */
function period(start: string, end: string) {
  const year = end.split(" ").pop();
  const shared = start.includes(" ") && start.endsWith(` ${year}`);
  return `${shared ? start.slice(0, -` ${year}`.length) : start} – ${end}`;
}

export async function Experience() {
  const contributions = await getContributions(github.username);
  const last: Stat = contributions
    ? { value: `${contributions.total}+`, label: contributionsStat.label }
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
                <span className="font-semibold text-muted">{job.company}</span>
              </h3>
              <p className="font-mono text-xs tracking-normal text-muted">
                {period(job.start, job.end)}
              </p>
            </div>
            <p className="mt-2 text-[15px] leading-[1.6] text-muted">
              {job.summary}
            </p>
            <Timeline points={job.points} />
          </li>
        ))}
      </ul>

      <Stats stats={[...stats, last]} />
    </div>
  );
}
