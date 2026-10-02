import Link from "next/link";
import { contact, profile } from "@/content/data";
import { Seal } from "@/components/Seal";
import { ThemeToggle } from "@/components/ThemeToggle";

/** `home` makes the name the page's h1; case-study pages have their own. */
export function Header({ home = false }: { home?: boolean }) {
  const Name = home ? "h1" : "p";
  const resume = contact.links.find((l) => l.id === "resume");

  return (
    <div className="flex items-start justify-between gap-6">
      <Link href="/" className="flex items-center gap-3">
        <Seal />
        <div className="leading-[1.4]">
          <Name className="font-name text-ink">{profile.name}</Name>
          <p className="text-[15px] text-ink-3">{profile.role}</p>
        </div>
      </Link>
      <div className="flex items-center gap-4">
        {resume && (
          <a
            href={resume.href}
            target="_blank"
            rel="noreferrer"
            className="text-ink decoration-1 underline-offset-[3px] hover:underline"
          >
            {resume.label} ↗
          </a>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
}
