import Link from "next/link";
import { site } from "@/content/data";
import { Seal } from "@/components/Seal";
import { ThemeToggle } from "@/components/ThemeToggle";

/** `home` makes the name the page's h1; case-study pages have their own. */
export function Header({ home = false }: { home?: boolean }) {
  const Name = home ? "h1" : "p";

  return (
    <div className="flex items-start justify-between gap-6">
      <Link href="/" className="flex items-center gap-3">
        <Seal />
        <div className="leading-[1.4]">
          <Name className="font-name text-ink">{site.name}</Name>
          <p className="text-[15px] text-ink-3">{site.title}</p>
        </div>
      </Link>
      <div className="flex items-center gap-4">
        <a
          href={site.links.resume}
          target="_blank"
          rel="noreferrer"
          className="text-ink decoration-1 underline-offset-[3px] hover:underline"
        >
          Resume ↗
        </a>
        <ThemeToggle />
      </div>
    </div>
  );
}
