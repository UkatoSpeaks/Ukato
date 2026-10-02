"use client";

import { useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import {
  Box,
  Code,
  Database,
  Layers,
  Layout,
  Server,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import {
  techStack,
  techStackAll,
  type TechCategory,
} from "@/content/data";
import { fallbackIcon, techIcons } from "@/components/techIcons";

const categoryIcons: Record<TechCategory, LucideIcon> = {
  Languages: Code,
  Frontend: Layout,
  Backend: Server,
  Databases: Database,
  "AI/ML": Sparkles,
  DevOps: Box,
};

const tabs: { label: string; category: TechCategory | null; icon: LucideIcon }[] =
  [
    { label: techStackAll, category: null, icon: Layers },
    ...techStack.map((g) => ({
      label: g.category,
      category: g.category,
      icon: categoryIcons[g.category],
    })),
  ];

export function TechStack() {
  const [active, setActive] = useState<TechCategory | null>(null);

  // "All" lists every chip in category order.
  const items = techStack
    .filter((g) => active === null || g.category === active)
    .flatMap((g) => g.items);

  return (
    // reducedMotion="user" drops the sliding and scaling for visitors who ask.
    <MotionConfig reducedMotion="user">
      <div className="relative px-3 py-2 sm:px-4">
        <div
          role="tablist"
          aria-label={techStackAll}
          className="flex gap-1 overflow-x-auto rounded-[10px] border border-border bg-surface p-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map((tab) => {
            const selected = tab.category === active;
            return (
              <button
                key={tab.label}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(tab.category)}
                className={`relative flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-md px-3.5 text-sm font-semibold whitespace-nowrap transition-colors duration-200 md:flex-1 md:px-2 ${
                  selected ? "text-bg" : "text-muted hover:text-text"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="tech-tab"
                    className="absolute inset-0 rounded-md bg-text"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                <tab.icon
                  size={14}
                  strokeWidth={2}
                  aria-hidden
                  className="relative"
                />
                <span className="relative">{tab.label}</span>
              </button>
            );
          })}
        </div>
        {/* Line under the tab bar, across the page like the section rules. */}
        <div
          aria-hidden
          className="absolute bottom-0 left-1/2 h-px w-screen -translate-x-1/2 bg-border"
        />
      </div>

      <ul className="flex flex-wrap gap-3 px-4 py-8 sm:px-8">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((name) => {
            const { icon: Icon, color, dark } = techIcons[name] ?? fallbackIcon;
            return (
              <motion.li
                key={name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                style={
                  {
                    "--brand-light": color,
                    "--brand-dark": dark ?? color,
                  } as React.CSSProperties
                }
                className="tech-chip group"
              >
                <Icon
                  size={16}
                  className="shrink-0 text-(--brand) transition-transform duration-200 group-hover:scale-110 motion-reduce:transform-none"
                />
                {name}
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </MotionConfig>
  );
}
