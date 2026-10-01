import { FadeIn } from "@/components/FadeIn";

type Props = {
  index: number;
  /** Omit for an unlabelled row; content still sits in the right column. */
  label?: string;
  children: React.ReactNode;
};

export function Section({ index, label, children }: Props) {
  return (
    <FadeIn
      as="section"
      index={index}
      className="md:grid md:grid-cols-[120px_1fr]"
    >
      {label ? (
        <h2 className="mb-4 font-normal text-ink-3 md:mb-0">{label}</h2>
      ) : (
        <div aria-hidden className="hidden md:block" />
      )}
      <div className="min-w-0">{children}</div>
    </FadeIn>
  );
}
