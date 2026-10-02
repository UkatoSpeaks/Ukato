import { site } from "@/content/data";
import { Nav } from "@/components/Nav";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

// Placeholder sections: the shell only. Real content lands section by section.
const sections = [
  { id: "about", title: "About" },
  { id: "experience", title: "Experience" },
  { id: "projects", title: "Projects", action: "View all" },
  { id: "stack", title: "Stack" },
  { id: "recognition", title: "Recognition" },
  { id: "contact", title: "Contact" },
];

function Placeholder({ title }: { title: string }) {
  return (
    <div className="card p-6">
      <p className="label">Placeholder</p>
      <p className="mt-3 text-muted">{title} content goes here.</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <span className="chip">chip</span>
        <span className="chip">tag</span>
        <span className="chip">meta</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <PageShell>
      <Nav items={sections} />

      <Reveal className="col px-6 py-20 md:py-28">
        <p className="label">{site.title}</p>
        <h1 className="mt-4 font-display text-6xl leading-[0.95] tracking-normal text-text md:text-8xl">
          {site.name}
        </h1>
        <p className="mt-6 max-w-[52ch] text-muted">{site.tagline}</p>
      </Reveal>

      <main>
        {sections.map((s) => (
          <Section key={s.id} id={s.id} title={s.title} action={s.action}>
            <Placeholder title={s.title} />
          </Section>
        ))}
      </main>

      <footer>
        <div className="rule" />
        <div className="col flex items-center justify-between gap-6 px-6 py-8">
          <p className="label">© 2026 {site.name}</p>
          <p className="label">{site.location}</p>
        </div>
      </footer>
    </PageShell>
  );
}
