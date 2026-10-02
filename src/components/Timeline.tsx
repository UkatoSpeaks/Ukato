"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import type { ExperiencePoint } from "@/content/data";

/** A point, with the page its title links to when there is one. */
type TimelinePoint = ExperiencePoint & { href?: string };

function Point({ point, still }: { point: TimelinePoint; still: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  // Reached once the point is 30% up from the bottom of the viewport. The top
  // margin keeps it reached after it has scrolled out above.
  const inView = useInView(ref, { margin: "9999px 0px -30% 0px" });
  const lit = still || inView;

  return (
    <li ref={ref} className="relative pl-7">
      {/* Dim until the point is reached, then filled with a soft ring. */}
      <span
        aria-hidden
        className={`absolute top-[7px] left-0 size-2 rounded-full transition-[background-color,box-shadow] duration-500 motion-reduce:transition-none ${
          lit
            ? "bg-text shadow-[0_0_0_4px_color-mix(in_srgb,var(--text)_14%,transparent)]"
            : "bg-faint shadow-[0_0_0_4px_transparent]"
        }`}
      />
      <p className="text-[15px] font-bold text-text">
        {point.href ? (
          <Link
            href={point.href}
            className="underline decoration-transparent decoration-1 underline-offset-4 transition-[text-decoration-color] duration-200 hover:decoration-faint"
          >
            {point.title}
          </Link>
        ) : (
          point.title
        )}
      </p>
      <p className="mt-1 text-[15px] leading-[1.6] text-soft">
        {point.detail}
      </p>
    </li>
  );
}

/** Points on a vertical line that fills as the list scrolls past. */
export function Timeline({ points }: { points: TimelinePoint[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const still = useReducedMotion() ?? false;
  // Same 70% mark as the points.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.7"],
  });

  return (
    <ol ref={ref} className="relative mt-6 space-y-7">
      <span
        aria-hidden
        className="absolute top-[11px] bottom-0 left-[3.5px] w-px bg-border"
      />
      <motion.span
        aria-hidden
        className="absolute top-[11px] bottom-0 left-[3.5px] w-px origin-top bg-muted"
        style={{ scaleY: still ? 1 : scrollYProgress }}
      />
      {points.map((point) => (
        <Point key={point.title} point={point} still={still} />
      ))}
    </ol>
  );
}
