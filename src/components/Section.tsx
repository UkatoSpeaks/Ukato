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
        <div className="col flex h-14 items-center justify-between gap-6 bg-bg px-8">
          <h2
            id={`${id}-title`}
            className="font-display text-[26px] leading-none tracking-normal text-text"
          >
            {title}
          </h2>
          {action && <div className="label shrink-0">{action}</div>}
        </div>
      </div>
      <div className="rule" />
      <Reveal className="col px-8 py-8 md:py-10">{children}</Reveal>
    </section>
  );
}
