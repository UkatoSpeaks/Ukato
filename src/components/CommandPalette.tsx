"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Copy, FileText, Hash, Search, SunMoon } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { contact, palette, projects, sections } from "@/content/data";
import { OPEN_PALETTE } from "@/components/PaletteTrigger";
import { toggleTheme } from "@/components/ThemeToggle";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Item = {
  id: string;
  group: string;
  label: string;
  icon: React.ReactNode;
  run: () => void;
};

type Props = {
  /** Whether the resume file exists; its link is left out otherwise. */
  resume: boolean;
};

const linkIcons = {
  github: <FaGithub size={15} />,
  linkedin: <FaLinkedin size={15} />,
  x: <FaXTwitter size={15} />,
  resume: <FileText size={15} strokeWidth={1.75} />,
};

/**
 * How well `text` matches `query`: null for no match, otherwise lower is
 * better. A substring beats letters that only appear in order.
 */
function fuzzy(query: string, text: string): number | null {
  const q = query.toLowerCase().replace(/\s+/g, "");
  const t = text.toLowerCase().replace(/\s+/g, "");
  if (!q) return 0;

  const at = t.indexOf(q);
  if (at >= 0) return at;

  let last = -1;
  let gaps = 0;
  for (const char of q) {
    const i = t.indexOf(char, last + 1);
    if (i < 0) return null;
    gaps += i - last - 1;
    last = i;
  }
  return 100 + gaps;
}

export function CommandPalette({ resume }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const pressed = useRef(false);

  const show = () => {
    setQuery("");
    setActive(0);
    setOpen(true);
  };

  // ⌘K / Ctrl+K anywhere, and the search buttons.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setQuery("");
        setActive(0);
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE, show);
    };
  }, []);

  // While open: the page behind does not scroll, and focus returns to where
  // it was on close.
  useEffect(() => {
    if (!open) return;
    const before = document.activeElement as HTMLElement | null;
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbar}px`;
    input.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      before?.focus({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 1600);
    return () => window.clearTimeout(id);
  }, [toast]);

  const visit = (href: string) => window.open(href, "_blank", "noreferrer");

  const items: Item[] = [
    ...sections.map((s) => ({
      id: `section-${s.id}`,
      group: palette.groups.sections,
      label: s.title,
      icon: <Hash size={15} strokeWidth={1.75} />,
      run: () => {
        const el = pathname === "/" ? document.getElementById(s.id) : null;
        if (!el) return router.push(`/#${s.id}`);
        // Smooth scrolling and the nav offset come from CSS.
        el.scrollIntoView();
        window.history.replaceState(null, "", `#${s.id}`);
      },
    })),
    ...projects.map((p) => ({
      id: `project-${p.slug}`,
      group: palette.groups.projects,
      label: p.title,
      icon: (
        <span
          className="size-2 rounded-full"
          style={{ background: p.accentColor }}
        />
      ),
      run: () => router.push(`/projects/${p.slug}`),
    })),
    ...contact.links.flatMap((l) =>
      l.id === "mail"
        ? [
            {
              id: "link-email",
              group: palette.groups.links,
              label: palette.copyEmail,
              icon: <Copy size={15} strokeWidth={1.75} />,
              run: () => {
                navigator.clipboard
                  .writeText(contact.email)
                  .then(() => setToast(palette.copied))
                  // No clipboard access: open the mail app instead.
                  .catch(() => window.location.assign(l.href));
              },
            },
          ]
        : l.id === "resume" && !resume
          ? []
          : [
              {
                id: `link-${l.id}`,
                group: palette.groups.links,
                label: l.label,
                icon: linkIcons[l.id],
                run: () => visit(l.href),
              },
            ],
    ),
    {
      id: "action-theme",
      group: palette.groups.actions,
      label: palette.toggleTheme,
      icon: <SunMoon size={15} strokeWidth={1.75} />,
      run: toggleTheme,
    },
  ];

  // Groups keep their order; within a group the best match comes first.
  const groups = Object.values(palette.groups)
    .map((group) => ({
      group,
      items: items
        .filter((item) => item.group === group)
        .map((item) => ({ item, score: fuzzy(query, item.label) }))
        .filter((m): m is { item: Item; score: number } => m.score !== null)
        .sort((a, b) => a.score - b.score)
        .map((m) => m.item),
    }))
    .filter((g) => g.items.length > 0);
  const results = groups.flatMap((g) => g.items);
  const current = results[Math.min(active, results.length - 1)];

  useEffect(() => {
    if (!current) return;
    list.current
      ?.querySelector(`#${CSS.escape(current.id)}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [current]);

  const select = (item: Item) => {
    setOpen(false);
    // After the dialog has let go of the page scroll.
    window.setTimeout(item.run, 60);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = results.length - 1;
    if (e.key === "ArrowDown") setActive((i) => (i >= last ? 0 : i + 1));
    else if (e.key === "ArrowUp") setActive((i) => (i <= 0 ? last : i - 1));
    else if (e.key === "Home") setActive(0);
    else if (e.key === "End") setActive(last);
    else if (e.key === "Enter" && current) select(current);
    else if (e.key === "Escape") setOpen(false);
    // The input is the only stop, so Tab stays inside the dialog.
    else if (e.key !== "Tab") return;
    e.preventDefault();
  };

  const duration = reduce ? 0 : 0.16;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/55 px-4 pt-[14vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
            // A click that both starts and ends on the backdrop closes.
            onMouseDown={(e) => {
              pressed.current = e.target === e.currentTarget;
            }}
            onClick={(e) => {
              if (pressed.current && e.target === e.currentTarget) {
                setOpen(false);
              }
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={palette.label}
              className="w-full max-w-[560px] overflow-hidden rounded-xl border border-border bg-surface shadow-[0_24px_60px_rgb(0_0_0/0.45)]"
              initial={reduce ? false : { opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
              onKeyDown={onKeyDown}
            >
              <div className="flex items-center gap-3 border-b border-border px-4">
                <Search
                  size={16}
                  strokeWidth={1.75}
                  aria-hidden
                  className="shrink-0 text-faint"
                />
                <input
                  ref={input}
                  type="text"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="palette-list"
                  aria-autocomplete="list"
                  aria-activedescendant={current?.id}
                  aria-label={palette.placeholder}
                  placeholder={palette.placeholder}
                  autoComplete="off"
                  spellCheck={false}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(0);
                  }}
                  className="h-12 min-w-0 flex-1 bg-transparent text-[15px] text-text outline-none placeholder:text-faint"
                />
                <kbd className="chip shrink-0">Esc</kbd>
              </div>

              <div
                ref={list}
                id="palette-list"
                role="listbox"
                aria-label={palette.label}
                className="max-h-[min(54vh,400px)] overflow-y-auto p-2"
              >
                {groups.map(({ group, items }) => (
                  <div key={group} role="group" aria-labelledby={`group-${group}`}>
                    <p id={`group-${group}`} className="label px-2.5 pt-3 pb-2">
                      {group}
                    </p>
                    {items.map((item) => (
                      <div
                        key={item.id}
                        id={item.id}
                        role="option"
                        aria-selected={item === current}
                        onMouseMove={() => setActive(results.indexOf(item))}
                        onClick={() => select(item)}
                        className={`flex h-10 cursor-pointer items-center gap-3 rounded-md px-2.5 text-[15px] ${
                          item === current
                            ? "bg-surface-2 text-text"
                            : "text-muted"
                        }`}
                      >
                        <span className="flex w-4 shrink-0 justify-center">
                          {item.icon}
                        </span>
                        <span className="truncate">{item.label}</span>
                      </div>
                    ))}
                  </div>
                ))}
                {results.length === 0 && (
                  <p className="px-2.5 py-8 text-center text-[15px] text-muted">
                    {palette.empty}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-8 z-50 flex justify-center"
      >
        <AnimatePresence>
          {toast && (
            <motion.p
              className="rounded-lg border border-border bg-surface-2 px-3.5 py-2 font-mono text-xs tracking-normal text-text shadow-[0_8px_30px_rgb(0_0_0/0.3)]"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration }}
            >
              {toast}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
