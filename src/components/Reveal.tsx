"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  className?: string;
  /** Seconds to wait, for staggering siblings. */
  delay?: number;
  children: React.ReactNode;
};

/** Fades content up once, the first time it scrolls into view. */
export function Reveal({ className, delay = 0, children }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      data-fade
      className={className}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{
        duration: 0.5,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
