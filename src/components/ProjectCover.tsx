import Image from "next/image";

type Props = {
  title: string;
  /** Screenshot path; without one a placeholder in the accent color is drawn. */
  src?: string;
  sizes: string;
  /** Camera-viewfinder overlay: corner brackets, REC and ISO marks. */
  viewfinder?: boolean;
};

const corners = [
  "top-3 left-3 border-t border-l",
  "top-3 right-3 border-t border-r",
  "bottom-3 left-3 border-b border-l",
  "bottom-3 right-3 border-b border-r",
];

/**
 * A project's image in its 16:10 frame. Reads --accent from an ancestor, and
 * zooms when an ancestor `group` is hovered.
 */
export function ProjectCover({ title, src, sizes, viewfinder }: Props) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border bg-surface-2">
      <div className="absolute inset-0 transition-transform duration-[250ms] ease-out group-hover:scale-[1.03] motion-reduce:transform-none">
        {src ? (
          <Image
            src={src}
            alt={`${title} screenshot`}
            fill
            sizes={sizes}
            className="object-cover object-top"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--accent) 22%, var(--surface)), var(--surface) 75%)",
            }}
          >
            <div className="hatch absolute inset-0 flex items-center justify-center px-6 text-center">
              <span className="font-display text-[26px] leading-tight tracking-normal text-text">
                {title}
              </span>
            </div>
          </div>
        )}
      </div>

      {viewfinder && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 font-mono text-[9px] font-semibold tracking-[0.08em] text-white [text-shadow:0_0_4px_rgb(0_0_0/0.9)]"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 45%, rgb(0 0 0 / 0.55))",
          }}
        >
          {corners.map((corner) => (
            <span
              key={corner}
              className={`absolute size-3 border-white/80 drop-shadow-[0_0_2px_rgb(0_0_0/0.8)] ${corner}`}
            />
          ))}
          <span className="absolute top-4 left-7 flex items-center gap-1.5">
            <span className="size-1.5 animate-dot-pulse rounded-full bg-[#ef4444]" />
            REC
          </span>
          <span className="absolute top-4 right-7">ISO 400</span>
        </div>
      )}
    </div>
  );
}
