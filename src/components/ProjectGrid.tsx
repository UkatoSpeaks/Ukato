import type { Project } from "@/content/data";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";

/** Project cards in two columns. The first card gets the viewfinder. */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {projects.map((project, i) => (
        <li key={project.slug}>
          {/* Stagger within a row; later rows reveal as they scroll in. */}
          <Reveal className="h-full" delay={(i % 2) * 0.08}>
            <ProjectCard project={project} viewfinder={i === 0} priority={i < 2} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
