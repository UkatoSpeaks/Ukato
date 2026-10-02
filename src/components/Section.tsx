import { Reveal } from "@/components/Reveal";

type Props = {
  /** Anchor target for the nav. */
  id: string;
  title: string;
  /** Optional control on the right of the header band, e.g. a "view all" link. */
  action?: React.ReactNode;
  children: React.ReactNode;
};

export function Section({ id, title, action, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-14">
      <div className="rule" />
      <div className="hatch">
        <div className="col flex items-end justify-between gap-6 px-6 py-5">
          <h2
            id={`${id}-title`}
            className="font-display text-4xl leading-none tracking-normal text-text md:text-5xl"
          >
            {title}
          </h2>
          {action && <div className="label shrink-0 pb-1">{action}</div>}
        </div>
      </div>
      <div className="rule" />
      <Reveal className="col px-6 py-12 md:py-16">{children}</Reveal>
    </section>
  );
}
