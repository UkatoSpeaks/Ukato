import type { Metadata } from "next";
import Link from "next/link";
import { notFound, profile } from "@/content/data";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: `${notFound.title} — ${profile.name}`,
};

export default function NotFound() {
  return (
    <PageShell>
      <Nav page="none" />
      <main>
        <Reveal className="col px-4 py-24 sm:px-8 md:py-32">
          <p className="label">404</p>
          <h1 className="mt-5 font-display text-[40px] leading-none tracking-[-0.04em] text-text">
            {notFound.title}
          </h1>
          <p className="mt-4 text-muted">{notFound.text}</p>
          <Link href="/" className="btn mt-8">
            ← {notFound.back}
          </Link>
        </Reveal>
      </main>
      <Footer />
    </PageShell>
  );
}
