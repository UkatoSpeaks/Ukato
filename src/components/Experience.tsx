import { education, experience } from "@/content/data";
import { Entry } from "@/components/Entry";

/** "Apr 2026", "Jun 2026" → "Apr – Jun 2026"; different years keep both. */
function period(start: string, end: string) {
  const year = end.split(" ").pop();
  const shared = start.includes(" ") && start.endsWith(` ${year}`);
  return `${shared ? start.slice(0, -` ${year}`.length) : start} – ${end}`;
}

export function Experience() {
  return (
    <div>
      <ul className="space-y-8">
        {experience.map((job) => (
          <li key={`${job.company}-${job.start}`}>
            <Entry
              title={job.role}
              subtitle={[job.company, job.location].filter(Boolean).join(" · ")}
              meta={period(job.start, job.end)}
              href={job.href}
            >
              <p>{job.summary}</p>
            </Entry>
          </li>
        ))}
      </ul>

      <h3 className="mt-10 font-normal text-ink-3">Education</h3>
      <ul className="mt-3 space-y-8">
        {education.map((e) => (
          <li key={e.school}>
            <Entry
              title={e.degree}
              subtitle={`${e.school}, ${e.location}`}
              meta={period(e.start, e.end)}
              href={e.href}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
