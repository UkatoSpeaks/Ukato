"use client";

import { sections } from "@/content/data";
import { useActiveSection } from "@/hooks/useActiveSection";

const ids = sections.map((s) => s.id);

/** Section index in the right gutter. Wide screens only. */
export function SideIndex() {
  // Above the first section, the first one is marked.
  const active = useActiveSection(ids) ?? ids[0];

  return (
    <nav
      aria-label="Index"
      className="fixed top-1/2 left-[calc(50%+var(--col)/2+30px)] z-10 hidden -translate-y-1/2 xl:block"
    >
      <p className="label">Index</p>
      <ul className="mt-6 space-y-3.5">
        {sections.map((s) => {
          const current = s.id === active;
          return (
            <li key={s.id}>
              {/* Smooth scrolling and the nav offset come from CSS
                  (scroll-behavior, scroll-margin on the section). */}
              <a
                href={`#${s.id}`}
                aria-current={current ? "true" : undefined}
                className={`flex items-center font-mono text-xs tracking-[0.08em] transition-colors duration-200 hover:text-text ${
                  current ? "font-semibold text-text" : "pl-2.5 text-faint"
                }`}
              >
                {current && (
                  <span aria-hidden className="mr-2.5 h-px w-4 bg-text" />
                )}
                {s.indexLabel}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
