import { site } from "@/content/data";

// Placeholder that exercises the tokens. Real sections come next.
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center">
      <div className="mx-auto w-full max-w-2xl px-6">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          <span className="mr-2 inline-block size-1.5 rounded-full bg-accent align-middle" />
          {site.title} / {site.location}
        </p>
        <h1 className="mt-4 font-serif text-5xl text-text">{site.name}</h1>
        <p className="mt-3 text-muted">{site.tagline}</p>
      </div>
      <div className="hatched mt-12 h-10 border-y border-border" />
    </main>
  );
}
