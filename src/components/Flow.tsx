"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  steps: string[];
};

/** Pipeline steps joined by arrows. The last one takes the --accent border. */
export function Flow({ steps }: Props) {
  const reduce = useReducedMotion();

  return (
    <ol className="flex flex-col items-start sm:flex-row sm:flex-wrap sm:items-center sm:gap-y-2.5">
      {steps.map((step, i) => (
        <motion.li
          key={i}
          data-fade
          className="flex flex-col items-start sm:flex-row sm:items-center"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={
            reduce ? { duration: 0 } : { duration: 0.4, delay: 0.15 + i * 0.06 }
          }
        >
          {i > 0 && (
            <svg
              aria-hidden
              width="16"
              height="8"
              viewBox="0 0 16 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="my-2 ml-3 rotate-90 text-faint sm:mx-1.5 sm:my-0 sm:rotate-0"
            >
              <path d="M0 4h15M12 1.5 15 4l-3 2.5" />
            </svg>
          )}
          <span
            className={`rounded-md border bg-surface px-2.5 py-1 font-mono text-xs tracking-normal text-text ${
              i === steps.length - 1 ? "border-(--accent)" : "border-border"
            }`}
          >
            {step}
          </span>
        </motion.li>
      ))}
    </ol>
  );
}
