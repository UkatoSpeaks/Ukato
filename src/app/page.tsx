import { FadeIn } from "@/components/FadeIn";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Intro } from "@/components/Intro";
import { Section } from "@/components/Section";
import { SelectedWork } from "@/components/SelectedWork";

const upcoming = ["Experience", "Stack", "Recognition", "Contact"];

export default function Home() {
  return (
    <div className="mx-auto max-w-[640px] px-6 pt-20 pb-32 md:pt-28">
      <FadeIn as="header" index={0}>
        <Header home />
      </FadeIn>
      <FadeIn index={1} className="mt-12">
        <Intro />
      </FadeIn>

      <main className="mt-20 flex flex-col gap-20">
        <Section index={2} label="Selected work">
          <SelectedWork />
        </Section>
        {upcoming.map((label, i) => (
          <Section key={label} index={i + 3} label={label}>
            <p className="text-ink-3">—</p>
          </Section>
        ))}
      </main>

      <FadeIn as="footer" index={upcoming.length + 3} className="mt-20">
        <Footer />
      </FadeIn>
    </div>
  );
}
