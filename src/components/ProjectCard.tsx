import Link from "next/link";
import { Globe } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { isTodo, projectLabels, type Project } from "@/content/data";
import { projectImage } from "@/lib/projectImage";
import { ProjectCover } from "@/components/ProjectCover";

type Props = {
  project: Project;
  viewfinder?: boolean;
  priority?: boolean;
};

const iconLink =
  "text-muted transition-colors duration-[250ms] hover:text-text";

export function ProjectCard({ project, viewfinder, priority }: Props) {
  return (
    <article
      style={{ "--accent": project.accentColor } as React.CSSProperties}
      className="card card-accent group relative flex h-full flex-col p-6"
    >
      <ProjectCover
        title={project.title}
        src={projectImage(project.image)}
        sizes="(min-width: 768px) 290px, 100vw"
        priority={priority}
        viewfinder={viewfinder}
      />

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="text-lg leading-snug font-bold text-text">
          {/* The link covers the whole card; the icon links sit above it. */}
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:rounded-[inherit]"
          >
            {project.title}
          </Link>
        </h3>
        <span className="flex shrink-0 items-center gap-1.5 font-mono text-xs tracking-normal text-muted">
          <span
            aria-hidden
            className="size-1.5 rounded-full bg-(--accent)"
          />
          {project.year}
        </span>
      </div>

      <p className="mt-2.5 mb-5 line-clamp-4 text-[15px] text-muted">
        {project.description}
      </p>

      <div className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-4">
        <ul className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li key={tag} className="chip chip-accent">
              {tag}
            </li>
          ))}
        </ul>
        <div className="relative z-10 flex shrink-0 items-center gap-3">
          {!isTodo(project.liveUrl) && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title}: ${projectLabels.live}`}
              className={iconLink}
            >
              <Globe size={17} strokeWidth={1.75} />
            </a>
          )}
          {!isTodo(project.githubUrl) && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title}: ${projectLabels.code}`}
              className={iconLink}
            >
              <FaGithub size={17} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
