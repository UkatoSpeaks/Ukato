import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { contact, type ContactLink } from "@/content/data";
import { projectImage } from "@/lib/projectImage";

type IconProps = { size?: number; className?: string };

// Icon and hover color per link. GitHub and X are white on the dark theme, so
// they take the text color and stay visible on the light one.
const brand: Record<
  ContactLink["id"],
  { icon: React.ComponentType<IconProps>; color: string }
> = {
  github: { icon: FaGithub, color: "var(--text)" },
  linkedin: { icon: FaLinkedin, color: "#0a66c2" },
  x: { icon: FaXTwitter, color: "var(--text)" },
  mail: { icon: Mail, color: "#ea4335" },
  resume: { icon: FileText, color: "#22c55e" },
};

const columns: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
};

export function Contact() {
  // The resume cell is left out until its file is in public/.
  const links = contact.links.filter(
    (l) => l.id !== "resume" || projectImage(l.href),
  );

  return (
    // The 1px gaps show the border color between cells.
    <ul className={`grid grid-cols-2 gap-px bg-border ${columns[links.length]}`}>
      {links.map((l) => {
        const { icon: Icon, color } = brand[l.id];
        const external = l.id !== "mail";
        return (
          <li
            key={l.id}
            className="bg-bg last:odd:col-span-2 md:last:odd:col-span-1"
          >
            <a
              href={l.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              style={{ "--brand": color } as React.CSSProperties}
              className="group flex h-16 items-center justify-center gap-3 px-3 transition-colors duration-200 hover:bg-surface-2"
            >
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors duration-200 group-hover:text-(--brand)">
                <Icon size={17} />
              </span>
              <span className="text-[15px] font-semibold text-text">
                {l.label}
              </span>
              <ArrowUpRight
                size={14}
                strokeWidth={1.75}
                aria-hidden
                className="shrink-0 text-faint transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
