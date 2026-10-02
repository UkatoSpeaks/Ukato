import type { Metadata } from "next";
import Link from "next/link";
import { profile, projectLabels, projects, sections } from "@/content/data";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { PageShell } from "@/components/PageShell";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Section } from "@/components/Section";

const title = sections.find((s) => s.id === "projects")?.title ?? "";

export const metadata: Metadata = {
  title: `${title} — ${profile.name}`,
};

// Featured first, then the rest, each in content order.
const ordered = [
  ...projects.filter((p) => p.featured),
  ...projects.filter((p) => !p.featured),
];

export default function ProjectsPage() {
  return (
    <PageShell>
      <Nav page="projects" />
      <main>
        <Section
          id="projects"
          title={title}
          heading="h1"
          action={
            <Link href="/" className="btn">
              ← {projectLabels.back}
            </Link>
          }
        >
          <ProjectGrid projects={ordered} />
        </Section>
      </main>
      <Footer />
    </PageShell>
  );
}
