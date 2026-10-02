import { profile, sections } from "@/content/data";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { SideIndex } from "@/components/SideIndex";

// Placeholder for the sections that have not been built yet.
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
            action={s.action}
            flush={s.id === "contact"}
          >
            {s.id === "about" ? (
              <About />
            ) : s.id === "contact" ? (
              <Contact />
            ) : (
              <Placeholder title={s.title} />
            )}
          </Section>
        ))}
      </main>

      <footer>
        <div className="rule" />
        <div className="col flex items-center justify-between gap-6 px-4 py-8 sm:px-8">
          <p className="label">© 2026 {profile.name}</p>
          <p className="label">{profile.location}</p>
        </div>
      </footer>
    </PageShell>
  );
}
