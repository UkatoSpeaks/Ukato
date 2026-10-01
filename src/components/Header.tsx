import { site } from "@/content/data";
import { Seal } from "@/components/Seal";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <div className="flex items-start justify-between gap-6">
      <div className="flex items-center gap-3">
        <Seal />
        <div className="leading-[1.4]">
          <h1 className="font-medium text-ink">{site.name}</h1>
          <p>{site.title}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <a
          href={site.links.resume}
          target="_blank"
          rel="noreferrer"
          className="link"
        >
          Resume ↗
        </a>
        <ThemeToggle />
      </div>
    </div>
  );
}
