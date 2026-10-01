import { intro, type IntroPart } from "@/content/data";

function Part({ part }: { part: IntroPart }) {
  if (typeof part === "string") return part;
  if ("em" in part) {
    return <em className="font-serif text-[1.15em] leading-none text-ink">{part.em}</em>;
  }
  if (!part.href) return <span className="text-ink">{part.text}</span>;
  return (
    <a href={part.href} target="_blank" rel="noreferrer" className="link">
      {part.text}
    </a>
  );
}

export function Intro() {
  return (
    <div>
      <div className="space-y-4">
        {intro.paragraphs.map((parts, i) => (
          <p key={i}>
            {parts.map((part, j) => (
              <Part key={j} part={part} />
            ))}
          </p>
        ))}
      </div>
      <p className="mt-6 flex items-center gap-2.5 text-ink-3">
        <span
          aria-hidden
          className="size-1.5 animate-seal-pulse rounded-full bg-seal"
        />
        {intro.status}
      </p>
    </div>
  );
}
