import Link from "next/link";
import { site } from "@/content/data";
import { ThemeToggle } from "@/components/ThemeToggle";

export type NavItem = {
  id: string;
  title: string;
};

export function Nav({ items }: { items: NavItem[] }) {
  return (
    <header className="sticky top-0 z-20 bg-bg/85 backdrop-blur">
      <div className="col flex h-[51px] items-center justify-between gap-6 border-x border-dashed border-border px-8">
        <Link href="/" className="font-display text-xl leading-none text-text">
          {site.name}
        </Link>
        <nav className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 md:flex">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-sm font-semibold text-muted transition-colors duration-200 hover:text-text"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </div>
      <div className="h-px bg-border" />
    </header>
  );
}
