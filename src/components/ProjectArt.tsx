import Image from "next/image";
import { Seal } from "@/components/Seal";

type Props = {
  name: string;
  /** Screenshot path; without one a generated placeholder is drawn. */
  src?: string;
  sizes: string;
  priority?: boolean;
  unoptimized?: boolean;
};

/** Fills its parent, which must be positioned and sized. */
export function ProjectArt({ name, src, sizes, priority, unoptimized }: Props) {
  if (src) {
    return (
      <Image
        src={src}
        alt={`${name} screenshot`}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={unoptimized}
        className="object-cover object-top"
      />
    );
  }

  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-paper-2 px-6 text-center"
      style={{
        backgroundImage:
          "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <span className="font-serif text-[22px] leading-tight tracking-normal text-ink italic">
        {name}
      </span>
      <span className="absolute right-3 bottom-3">
        <Seal size={18} />
      </span>
    </div>
  );
}
