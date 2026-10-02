"use client";

import { useEffect, useState } from "react";

/** Height of the sticky nav, and of the strip under it that picks the section. */
const NAV = 52;
const STRIP = 68;

/**
 * Scrollspy: the id of the section sitting just under the sticky nav, or null
 * above the first one. When two sections touch the strip, the later one wins.
 * At the very bottom of the page the last section wins, since it may be too
 * short to ever reach the nav.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const visible = new Set<string>();
    let observer: IntersectionObserver | undefined;

    const update = () => {
      const page = document.documentElement;
      const atBottom =
        window.scrollY > 0 &&
        window.innerHeight + window.scrollY >= page.scrollHeight - 2;
      const last = atBottom
        ? ids[ids.length - 1]
        : ids.filter((id) => visible.has(id)).pop();
      setActive(last ?? null);
    };

    // rootMargin takes no calc(), so the strip is rebuilt when the height changes.
    const observe = () => {
      observer?.disconnect();
      visible.clear();
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) visible.add(entry.target.id);
            else visible.delete(entry.target.id);
          }
          update();
        },
        {
          rootMargin: `-${NAV}px 0px -${Math.max(0, window.innerHeight - NAV - STRIP)}px 0px`,
        },
      );
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      }
    };

    observe();
    window.addEventListener("resize", observe);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", observe);
      window.removeEventListener("scroll", update);
    };
  }, [ids]);

  return active;
}
