import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";
import { contact, github, projects, sections } from "@/content/data";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { GitHubActivity } from "@/components/GitHubActivity";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { PageShell } from "@/components/PageShell";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Section } from "@/components/Section";
import { SideIndex } from "@/components/SideIndex";
import { TechStack } from "@/components/TechStack";

const featured = projects.filter((p) => p.featured);
const githubUrl = contact.links.find((l) => l.id === "github")?.href;

export default function Home() {
  return (
    <PageShell>
      <Nav />
      <SideIndex />
      <div id="top">
        <Hero />
      </div>

      <main>
        {sections.map((s) => (
          <Section
            key={s.id}
            id={s.id}
            title={s.title}
            action={
              s.id === "projects" && s.action ? (
                <Link href="/projects" className="btn group text-[13px]">
                  {s.action}
                  <ChevronRight
                    size={14}
                    strokeWidth={1.75}
                    className="transition-transform duration-[250ms] group-hover:translate-x-0.5 motion-reduce:transform-none"
                  />
                </Link>
              ) : s.id === "github" ? (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs tracking-normal text-muted transition-colors duration-200 hover:text-text"
                >
                  @{github.username}
                  <ExternalLink size={13} strokeWidth={1.75} aria-hidden />
                </a>
              ) : s.action ? (
                <span className="font-mono text-xs tracking-normal text-faint">
                  {s.action}
                </span>
              ) : undefined
            }
            flush={s.id === "contact" || s.id === "skills"}
          >
            {s.id === "about" ? (
              <About />
            ) : s.id === "contact" ? (
              <Contact />
            ) : s.id === "projects" ? (
              <ProjectGrid projects={featured} />
            ) : s.id === "experience" ? (
              <Experience />
            ) : s.id === "skills" ? (
              <TechStack />
            ) : (
              <GitHubActivity />
            )}
          </Section>
        ))}
      </main>

      <Footer />
    </PageShell>
  );
}
