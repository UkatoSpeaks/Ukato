"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { github } from "@/content/data";
import type { ContributionDay, Contributions } from "@/lib/github";

type Year = { year: number; data: Contributions | null };

type Props = {
  years: Year[];
  /** GitHub profile the grid links to. */
  href: string;
  /** Today as YYYY-MM-DD, to scroll a narrow grid to the current week. */
  today: string;
};

const LEVELS = [0, 1, 2, 3, 4];
/** Gap between squares, in px. The square size is the --cell variable. */
const GAP = 3;

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});
const monthFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
});

const utc = (date: string) => new Date(`${date}T00:00:00Z`);
const plural = (n: number) => `${n} contribution${n === 1 ? "" : "s"}`;

/** Days in columns of one week, Sunday on top. The first and last columns
    are padded with nulls. */
function toWeeks(days: ContributionDay[]) {
  const cells: (ContributionDay | null)[] = [
    ...Array<null>(days.length ? utc(days[0].date).getUTCDay() : 0).fill(null),
    ...days,
  ];
  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    const week = cells.slice(i, i + 7);
    weeks.push([...week, ...Array<null>(7 - week.length).fill(null)]);
  }
  return weeks;
}

/** A month label over the first column that holds the 1st of that month. */
function monthLabels(weeks: (ContributionDay | null)[][]) {
  return weeks.flatMap((week, column) => {
    const first = week.find((d) => d?.date.endsWith("-01"));
    return first ? [{ column, label: monthFormat.format(utc(first.date)) }] : [];
  });
}

const frame = "[--cell:11px] md:[--cell:10px]";
const cell = "size-(--cell) rounded-[3px]";
const column = "flex flex-col gap-[3px]";
const grid = "flex w-max gap-[3px]";

function YearTabs({
  years,
  active,
  onSelect,
}: {
  years: number[];
  active: number;
  onSelect?: (year: number) => void;
}) {
  return (
    <div className="flex justify-end gap-1.5">
      {years.map((year) => (
        <button
          key={year}
          type="button"
          aria-pressed={year === active}
          disabled={!onSelect}
          onClick={() => onSelect?.(year)}
          className={`h-7 rounded-md border px-3 font-mono text-xs tracking-normal transition-colors duration-200 ${
            year === active
              ? "border-text bg-text text-bg"
              : "border-border text-muted hover:text-text"
          }`}
        >
          {year}
        </button>
      ))}
    </div>
  );
}

/** Shown while the contributions load: the same grid in level-0 squares. */
export function ContributionSkeleton({ years }: { years: number[] }) {
  return (
    <div className={frame} aria-busy>
      <YearTabs years={years} active={years[0]} />
      <div className="mt-5 overflow-hidden pt-6">
        <div className={`${grid} animate-pulse motion-reduce:animate-none`}>
          {Array.from({ length: 53 }, (_, w) => (
            <div key={w} className={column}>
              {Array.from({ length: 7 }, (_, d) => (
                <span key={d} className={`${cell} bg-(--gh-0)`} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 h-[52px]" />
    </div>
  );
}

export function ContributionGraph({ years, href, today }: Props) {
  const [active, setActive] = useState(years[0].year);
  const [tip, setTip] = useState<{ text: string; x: number; y: number } | null>(
    null,
  );
  const root = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const shown = useInView(root, { once: true, margin: "0px 0px -10% 0px" });

  const data = years.find((y) => y.year === active)?.data ?? null;
  const weeks = data ? toWeeks(data.days) : [];

  // A grid wider than its box starts at the most recent weeks: the current
  // week this year, the end of the year for earlier ones.
  useEffect(() => {
    const el = scroller.current;
    if (!el || !data) return;
    const recent = data.days.filter((d) => d.date <= today).length;
    const offset = utc(data.days[0].date).getUTCDay();
    const week = Math.ceil((recent + offset) / 7);
    const pitch = el.scrollWidth / Math.ceil((data.days.length + offset) / 7);
    el.scrollLeft = (week + 1) * pitch - el.clientWidth;
  }, [data, today]);

  const profile = (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 text-muted transition-colors duration-200 hover:text-text"
    >
      @{github.username}
      <ExternalLink size={13} strokeWidth={1.75} aria-hidden />
    </a>
  );

  return (
    <div ref={root} className={`relative ${frame}`}>
      <YearTabs
        years={years.map((y) => y.year)}
        active={active}
        onSelect={(year) => {
          setTip(null);
          setActive(year);
        }}
      />

      {data ? (
        <>
          <div
            ref={scroller}
            className="mt-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="w-max">
              <div aria-hidden className="relative h-6 font-mono text-[11px] tracking-normal text-faint">
                {monthLabels(weeks).map((m) => (
                  <span
                    key={m.column}
                    className="absolute top-0"
                    style={{
                      left: `calc(${m.column} * (var(--cell) + ${GAP}px))`,
                    }}
                  >
                    {m.label}
                  </span>
                ))}
              </div>
              <a
                key={active}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${plural(data.total)} in ${active}. @${github.username} on GitHub`}
                data-shown={shown || undefined}
                className={`${grid} cursor-pointer`}
                onMouseLeave={() => setTip(null)}
                onMouseOver={(e) => {
                  const el = e.target as HTMLElement;
                  const box = root.current?.getBoundingClientRect();
                  if (!el.dataset.tip || !box) return setTip(null);
                  const at = el.getBoundingClientRect();
                  setTip({
                    text: el.dataset.tip,
                    x: at.left + at.width / 2 - box.left,
                    y: at.top - box.top,
                  });
                }}
              >
                {weeks.map((week, w) => (
                  <span
                    key={w}
                    data-fade
                    className={`gh-col ${column}`}
                    style={{ "--i": w } as React.CSSProperties}
                  >
                    {week.map((day, d) =>
                      day ? (
                        <span
                          key={d}
                          data-tip={`${plural(day.count)} on ${dateFormat.format(utc(day.date))}`}
                          // Days still to come are dimmed.
                          className={`${cell} ${day.date > today ? "opacity-40" : ""}`}
                          style={{ background: `var(--gh-${day.level})` }}
                        />
                      ) : (
                        <span key={d} className={cell} />
                      ),
                    )}
                  </span>
                ))}
              </a>
            </div>
          </div>

          {tip && (
            <div
              role="tooltip"
              className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-md border border-border bg-surface-2 px-2 py-1 font-mono text-[11px] tracking-normal whitespace-nowrap text-text"
              style={{
                // Kept inside the section at the edges.
                left: `clamp(110px, ${tip.x}px, calc(100% - 110px))`,
                top: tip.y - 6,
              }}
            >
              {tip.text}
            </div>
          )}

          <div className="mt-3 font-mono text-xs tracking-normal">
            <p className="flex items-center justify-end gap-[3px] text-faint">
              <span className="mr-1.5">{github.less}</span>
              {LEVELS.map((level) => (
                <span
                  key={level}
                  aria-hidden
                  className={cell}
                  style={{ background: `var(--gh-${level})` }}
                />
              ))}
              <span className="ml-1.5">{github.more}</span>
            </p>
            <p className="mt-3 text-muted">
              {plural(data.total)} in {active}
            </p>
          </div>
        </>
      ) : (
        <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 py-8 text-[15px] text-muted">
          {github.error}
          <span className="font-mono text-xs tracking-normal">{profile}</span>
        </p>
      )}
    </div>
  );
}
