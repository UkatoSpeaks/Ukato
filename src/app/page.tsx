import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { FadeIn } from "@/components/FadeIn";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Intro } from "@/components/Intro";
import { Recognition } from "@/components/Recognition";
import { Section } from "@/components/Section";
import { SelectedWork } from "@/components/SelectedWork";
import { Stack } from "@/components/Stack";

const sections = [
  { label: "Selected work", body: <SelectedWork /> },
  { label: "Experience", body: <Experience /> },
  { label: "Stack", body: <Stack /> },
  { label: "Recognition", body: <Recognition /> },
  { label: "Contact", body: <Contact /> },
];

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
        {sections.map((s, i) => (
          <Section key={s.label} index={i + 2} label={s.label}>
            {s.body}
          </Section>
        ))}
      </main>

      <FadeIn as="footer" index={sections.length + 2} className="mt-20">
        <Footer />
      </FadeIn>
    </div>
  );
}
