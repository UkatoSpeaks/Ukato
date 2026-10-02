import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Globe } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { isTodo, profile, projectLabels, projects } from "@/content/data";
import { projectImage } from "@/lib/projectImage";
import { Flow } from "@/components/Flow";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { PageShell } from "@/components/PageShell";
import { ProjectCover } from "@/components/ProjectCover";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const title = `${project.title} — ${profile.name}`;
  return {
    title,
    description: project.description,
    openGraph: { title, description: project.description, type: "article" },
  };
}

// Accent on hover only, so the color stays a small highlight.
const accentBtn = "btn hover:border-(--accent) hover:text-(--accent)";

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <PageShell>
      <Nav page="projects" />
      <div style={{ "--accent": project.accentColor } as React.CSSProperties}>
        <main>
          <Reveal className="col px-4 pt-6 pb-10 sm:px-8">
            <Link href="/projects" className={accentBtn}>
              ← {projectLabels.back}
            </Link>

            <div className="mt-6">
              <ProjectCover
                title={project.title}
                src={projectImage(project.image)}
                sizes="(min-width: 760px) 696px, 100vw"
                priority
              />
            </div>

            <h1 className="mt-8 font-display text-[40px] leading-none tracking-[-0.04em] text-text">
              {project.title}
            </h1>
            <p className="mt-3 flex flex-wrap items-center gap-x-2 font-mono text-xs tracking-normal text-muted">
              <span aria-hidden className="size-1.5 rounded-full bg-(--accent)" />
              {project.year}
              <span aria-hidden className="text-faint">·</span>
              {projectLabels.status[project.status]}
              <span aria-hidden className="text-faint">·</span>
              {project.category}
            </p>
            <p className="mt-5 text-base text-text">{project.description}</p>

            <ul className="mt-6 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <li key={tag} className="chip chip-accent">
                  {tag}
                </li>
              ))}
            </ul>

            {(!isTodo(project.liveUrl) || !isTodo(project.githubUrl)) && (
              <div className="mt-6 flex flex-wrap gap-2.5">
                {!isTodo(project.liveUrl) && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={accentBtn}
                  >
                    <Globe size={14} strokeWidth={1.75} />
                    {projectLabels.live}
                  </a>
                )}
                {!isTodo(project.githubUrl) && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={accentBtn}
                  >
                    <FaGithub size={14} />
                    {projectLabels.code}
                  </a>
                )}
              </div>
            )}
          </Reveal>

          <Section id="problem" title={projectLabels.problem}>
            <p className="text-muted">{project.problem}</p>
          </Section>

          <Section id="approach" title={projectLabels.approach}>
            <ul className="space-y-4">
              {project.approach.map((step) => (
                <li key={step} className="flex gap-3 text-muted">
                  <span
                    aria-hidden
                    className="mt-[0.7em] size-1 shrink-0 rounded-full bg-(--accent)"
                  />
                  {step}
                </li>
              ))}
            </ul>
          </Section>

          {project.flow && (
            <Section id="flow" title={projectLabels.flow}>
              <Flow steps={project.flow} />
            </Section>
          )}
        </main>

        <div className="rule" />
        <div className="col px-4 py-8 sm:px-8">
          <Link
            href={`/projects/${next.slug}`}
            className="group flex items-center justify-between gap-6"
          >
            <span>
              <span className="label block">{projectLabels.next}</span>
              <span className="mt-2 block font-display text-[26px] leading-none tracking-normal text-text">
                {next.title}
              </span>
            </span>
            <ArrowRight
              size={18}
              strokeWidth={1.75}
              aria-hidden
              className="text-muted transition-[color,transform] duration-[250ms] group-hover:translate-x-1 group-hover:text-(--accent) motion-reduce:transform-none"
            />
          </Link>
        </div>
      </div>
      <Footer />
    </PageShell>
  );
}
