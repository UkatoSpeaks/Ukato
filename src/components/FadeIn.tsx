"use client";

import { motion, useReducedMotion } from "motion/react";

type Props = {
  /** Position in the load sequence; each step starts 50ms after the last. */
  index: number;
  as?: "div" | "header" | "section" | "footer";
  className?: string;
  children: React.ReactNode;
};

export function FadeIn({ index, as = "div", className, children }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      data-fade
      className={className}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </Tag>
  );
}
