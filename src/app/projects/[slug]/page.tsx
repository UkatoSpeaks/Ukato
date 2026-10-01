import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, site, type Project } from "@/content/data";
import { projectImage } from "@/lib/projectImage";
import { FadeIn } from "@/components/FadeIn";
import { Flow } from "@/components/Flow";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProjectArt } from "@/components/ProjectArt";
import { Section } from "@/components/Section";

type Props = { params: Promise<{ slug: string }> };

const statusLabel: Record<Project["status"], string> = {
  live: "Live",
  building: "In progress",
  shipped: "Shipped",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const title = `${project.name} — ${site.name}`;
  return {
    title,
    description: project.oneLiner,
    openGraph: { title, description: project.oneLiner, type: "article" },
  };
}

function Term({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="meta">{label}</dt>
      <dd className="text-[15px] text-ink">{children}</dd>
    </div>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const links = [
    { label: "Live", href: project.liveUrl },
    { label: "Code", href: project.repoUrl },
  ].filter((l) => l.href);

  const sections = [
    { label: "Problem", body: <p>{project.problem}</p> },
    {
      label: "How it works",
      body: (
        <ul className="space-y-3">
          {project.approach.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span aria-hidden className="text-ink-3">
                —
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      ),
    },
    { label: "Stack", body: <p>{project.stack.join(", ")}</p> },
  ];
  // Header, title, meta and screenshot fade in before the sections.
  const firstSection = 4;
  const flowIndex = firstSection + sections.length;

  return (
    <div className="mx-auto max-w-[640px] px-6 pt-20 pb-32 md:pt-28">
      <FadeIn as="header" index={0}>
        <Header />
      </FadeIn>

      <main className="mt-12">
        <FadeIn index={1}>
          <Link
            href="/"
            className="text-[15px] text-ink-3 transition-colors duration-150 hover:text-ink"
          >
            ← Back
          </Link>
          <h1 className="mt-6 text-[22px] leading-snug font-name tracking-[-0.02em] text-ink">
            {project.name}
          </h1>
          <p className="mt-1">{project.oneLiner}</p>
        </FadeIn>

        <FadeIn index={2} className="mt-10">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
            <Term label="Year">
              <span className="tabular-nums">{project.year}</span>
            </Term>
            <Term label="Status">
              <span className="flex items-center gap-2">
                {project.status === "live" && (
                  <span
                    aria-hidden
                    className="size-[5px] rounded-full bg-seal"
                  />
                )}
                {statusLabel[project.status]}
              </span>
            </Term>
            <Term label="Category">{project.category}</Term>
            <Term label="Links">
              {links.length === 0 ? (
                <span className="text-ink-3">—</span>
              ) : (
                <span className="flex gap-3">
                  {links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link"
                    >
                      {l.label} ↗
                    </a>
                  ))}
                </span>
              )}
            </Term>
          </dl>
        </FadeIn>

        <FadeIn index={3} className="mt-10">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-paper-2">
            <ProjectArt
              name={project.name}
              src={projectImage(project.slug)}
              sizes="(min-width: 640px) 592px, 100vw"
              priority
            />
          </div>
        </FadeIn>

        <div className="mt-20 flex flex-col gap-20">
          {sections.map((s, i) => (
            <Section key={s.label} index={firstSection + i} label={s.label}>
              {s.body}
            </Section>
          ))}
          {project.flow && (
            <Section index={flowIndex} label="Flow">
              <Flow steps={project.flow} delay={flowIndex * 0.05 + 0.15} />
            </Section>
          )}
        </div>

        <FadeIn
          index={flowIndex + 1}
          className="mt-20 border-t border-line pt-8"
        >
          <Link href={`/projects/${next.slug}`} className="group block">
            <span className="block text-[15px] text-ink-3">Next project →</span>
            <span className="font-name text-ink decoration-seal decoration-1 underline-offset-[3px] group-hover:underline">
              {next.name}
            </span>
          </Link>
        </FadeIn>
      </main>

      <FadeIn as="footer" index={flowIndex + 2} className="mt-20">
        <Footer />
      </FadeIn>
    </div>
  );
}
