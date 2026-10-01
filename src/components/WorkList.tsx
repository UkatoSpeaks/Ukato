"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { ProjectArt } from "@/components/ProjectArt";

type Featured = {
  slug: string;
  name: string;
  oneLiner: string;
  year: number;
  live: boolean;
  image?: string;
};

type Other = {
  slug: string;
  name: string;
  category: string;
  year: number;
};

const PREVIEW = { width: 300, height: 188, offset: 20 };
const VISIBLE_OTHERS = 4;
const spring = { stiffness: 300, damping: 30 };
const row =
  "group -mx-3 flex justify-between gap-6 rounded-lg px-3 transition-colors duration-150 hover:bg-paper-2";

export function WorkList({
  featured,
  others,
}: {
  featured: Featured[];
  others: Other[];
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<Featured | null>(null);
  const [canPreview, setCanPreview] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  useEffect(() => {
    // Desktop pointers only, and never under reduced motion.
    const ok =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCanPreview(ok);
    if (!ok) return;
    for (const p of featured) {
      if (p.image) new window.Image().src = p.image;
    }
  }, [featured]);

  // Sits 20px right/down of the cursor, flipping to the other side at the
  // viewport edges so it never leaves the screen.
  const place = (e: React.MouseEvent) => {
    const { width, height, offset } = PREVIEW;
    const flipX = e.clientX + offset + width > window.innerWidth;
    const flipY = e.clientY + offset + height > window.innerHeight;
    return {
      px: flipX ? e.clientX - offset - width : e.clientX + offset,
      py: flipY ? e.clientY - offset - height : e.clientY + offset,
    };
  };

  const enter = (e: React.MouseEvent, project: Featured) => {
    if (!canPreview) return;
    if (!active) {
      // Start at the cursor instead of springing in from the last position.
      const { px, py } = place(e);
      sx.jump(px);
      sy.jump(py);
    }
    setActive(project);
  };

  const move = (e: React.MouseEvent) => {
    if (!canPreview) return;
    const { px, py } = place(e);
    x.set(px);
    y.set(py);
  };

  const first = others.slice(0, VISIBLE_OTHERS);
  const rest = others.slice(VISIBLE_OTHERS);

  return (
    <div>
      <ul
        className="-mt-2.5 flex flex-col gap-1"
        onMouseMove={move}
        onMouseLeave={() => setActive(null)}
      >
        {featured.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              className={`${row} items-start py-2.5`}
              onMouseEnter={(e) => enter(e, p)}
            >
              <span className="min-w-0">
                <span className="block font-name text-ink">
                  {p.name}
                  <span
                    aria-hidden
                    className="ml-1.5 font-normal text-ink-3 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    ↗
                  </span>
                </span>
                <span className="block text-[15px]">{p.oneLiner}</span>
              </span>
              <span className="meta flex shrink-0 items-center gap-2 pt-[3px]">
                {p.live && (
                  <span
                    role="img"
                    aria-label="Live"
                    className="size-[5px] rounded-full bg-seal"
                  />
                )}
                {p.year}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <h3 className="mt-10 font-normal text-ink-3">Other projects</h3>
      <ul className="mt-1.5 flex flex-col gap-1">
        {first.map((p) => (
          <OtherRow key={p.slug} project={p} />
        ))}
      </ul>
      <AnimatePresence initial={false}>
        {showAll && (
          <motion.ul
            // Padded so the rows' -mx-3 hover fill stays inside the clipped box.
            className="-mx-3 flex flex-col gap-1 overflow-hidden px-3 pt-1"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
            }
          >
            {rest.map((p) => (
              <OtherRow key={p.slug} project={p} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      {rest.length > 0 && !showAll && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="mt-2.5 text-[15px] text-ink-3 decoration-1 underline-offset-[3px] hover:underline"
        >
          Show all
        </button>
      )}

      {canPreview &&
        createPortal(
          <AnimatePresence>
            {active && (
              <motion.div
                aria-hidden
                className="pointer-events-none fixed top-0 left-0 z-50"
                style={{ x: sx, y: sy }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <motion.div
                  className="relative overflow-hidden rounded-lg border border-line bg-paper-2 shadow-[0_8px_24px_-12px_rgb(0_0_0/0.25)]"
                  style={{ width: PREVIEW.width, height: PREVIEW.height }}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProjectArt
                    key={active.slug}
                    name={active.name}
                    src={active.image}
                    sizes={`${PREVIEW.width}px`}
                    priority
                    unoptimized
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}

function OtherRow({ project }: { project: Other }) {
  return (
    <li>
      <Link
        href={`/projects/${project.slug}`}
        className={`${row} items-baseline py-1.5`}
      >
        <span className="min-w-0 truncate text-[15px]">
          <span className="text-ink">{project.name}</span>
          <span className="text-ink-3"> · {project.category}</span>
        </span>
        <span className="meta shrink-0">{project.year}</span>
      </Link>
    </li>
  );
}
