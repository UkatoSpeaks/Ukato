"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import type { Stat } from "@/content/data";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Borders between cells: one row of four from `md`, two rows of two below. */
const dividers = [
  "",
  "border-l",
  "border-t md:border-t-0 md:border-l",
  "border-t border-l md:border-t-0",
];

/** A value that starts with a number ("6+", "219+") counts up from 0 once
    `run` is set; anything else ("AI+Web") fades in. */
function Value({ value, run }: { value: string; run: boolean }) {
  const reduce = useReducedMotion();
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : null;
  const [shown, setShown] = useState(target);

  useEffect(() => {
    if (!run || reduce || target === null) return;
    const controls = animate(0, target, {
      duration: 1,
      ease: "easeOut",
      onUpdate: (n) => setShown(Math.round(n)),
    });
    return () => controls.stop();
  }, [run, reduce, target]);

  if (match) {
    return (
      <span className="tabular-nums">
        {shown}
        {match[2]}
      </span>
    );
  }
  return (
    <motion.span
      data-fade
      className="inline-block"
      initial={reduce ? false : { opacity: 0 }}
      animate={run || reduce ? { opacity: 1 } : undefined}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {value}
    </motion.span>
  );
}

export function Stats({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDListElement>(null);
  const run = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <dl ref={ref} className="card mt-12 grid grid-cols-2 md:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`flex flex-col-reverse items-center justify-end gap-1.5 border-border px-3 py-5 text-center md:my-4 md:py-1 ${dividers[i] ?? ""}`}
        >
          <dt className="label text-muted">{stat.label}</dt>
          <dd className="text-xl leading-tight font-bold text-text">
            <Value value={stat.value} run={run} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
