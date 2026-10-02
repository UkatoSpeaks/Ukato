import { profile, sections } from "@/content/data";
import { Nav } from "@/components/Nav";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

// The top nav keeps the short labels for now.
const navItems = sections.map((s) => ({ id: s.id, title: s.indexLabel }));

// Placeholder content: the shell only. Real content lands section by section.
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
      <Nav items={navItems} />

      <Reveal className="col px-8 py-12 md:py-16">
        <p className="label">{profile.role}</p>
        <h1 className="mt-3 font-display text-[40px] leading-none tracking-[-0.04em] text-text">
          {profile.name}
        </h1>
        <p className="mt-4 max-w-[52ch] text-muted">{profile.tagline}</p>
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
        <div className="col flex items-center justify-between gap-6 px-8 py-8">
          <p className="label">© 2026 {profile.name}</p>
          <p className="label">{profile.location}</p>
        </div>
      </footer>
    </PageShell>
  );
}
