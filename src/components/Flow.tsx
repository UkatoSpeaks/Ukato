"use client";

import { motion, useReducedMotion } from "motion/react";

type Props = {
  steps: string[];
  /** Seconds to wait before the first node, so it follows the section fade. */
  delay?: number;
};

export function Flow({ steps, delay = 0 }: Props) {
  const reduce = useReducedMotion();

  return (
    <ol className="flex flex-col items-start sm:flex-row sm:flex-wrap sm:items-center sm:gap-y-2.5">
      {steps.map((step, i) => (
        <motion.li
          key={i}
          data-fade
          className="flex flex-col items-start sm:flex-row sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 0.4, delay: delay + i * 0.06 }
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
              className="my-2 ml-3 rotate-90 text-ink-3 sm:mx-1.5 sm:my-0 sm:rotate-0"
            >
              <path d="M0 4h15M12 1.5 15 4l-3 2.5" />
            </svg>
          )}
          <span
            className={`rounded-md border px-2.5 py-1 text-[13px] leading-normal text-ink ${
              i === steps.length - 1 ? "border-seal" : "border-line"
            }`}
          >
            {step}
          </span>
        </motion.li>
      ))}
    </ol>
  );
}
