"use client";

import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { navLinks, profile, sections } from "@/content/data";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useActiveSection } from "@/hooks/useActiveSection";

const ids = sections.map((s) => s.id);
// Home covers the hero and the first section.
const home: (string | null)[] = [null, ids[0]];

export function Nav() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(ids);

  const links = navLinks.map((link) => ({
    label: link.label,
    href: link.section ? `#${link.section}` : "#top",
    current: link.section ? active === link.section : home.includes(active),
  }));

  return (
    <header className="sticky top-0 z-20 bg-bg/85 backdrop-blur">
      <div className="col flex h-[51px] items-center justify-between gap-6 border-x border-dashed border-border px-4 sm:px-8">
        <a href="#top" className="flex items-baseline gap-2.5">
          <span className="font-display text-xl leading-none text-text">
            {profile.shortName}
          </span>
          <span className="font-mono text-[11px] tracking-[0.04em] text-faint">
            {profile.pronunciation}
          </span>
        </a>

        <nav className="flex items-center gap-3" aria-label="Main">
          <ul className="mr-2 hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  aria-current={link.current ? "true" : undefined}
                  className={`border-b pb-1 text-sm font-semibold transition-colors duration-200 hover:text-text ${
                    link.current
                      ? "border-text text-text"
                      : "border-transparent text-muted"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          {/* Will open the command palette. */}
          <button type="button" aria-label="Search" className="icon-btn">
            <Search size={15} strokeWidth={1.75} />
          </button>
          <ThemeToggle className="icon-btn" />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="nav-menu"
            onClick={() => setOpen((v) => !v)}
            className="icon-btn md:hidden"
          >
            {open ? (
              <X size={15} strokeWidth={1.75} />
            ) : (
              <Menu size={15} strokeWidth={1.75} />
            )}
          </button>
        </nav>
      </div>
      <div className="h-px bg-border" />

      {open && (
        <div id="nav-menu" className="md:hidden">
          <ul className="col border-x border-dashed border-border px-4 py-2 sm:px-8">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={link.current ? "true" : undefined}
                  className={`block py-2.5 text-sm font-semibold ${
                    link.current ? "text-text" : "text-muted"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="h-px bg-border" />
        </div>
      )}
    </header>
  );
}
