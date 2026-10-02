# Design

The spec for the portfolio redesign, and where each part of it lives in the code.
All content, images and text come from `src/content/data.ts`; nothing is invented.

## Theme

Dark by default, with a light theme behind the toggle in the nav.

| Token     | Dark      | Light     | Tailwind class suffix |
| --------- | --------- | --------- | --------------------- |
| `--bg`      | `#0a0a0a` | `#fafafa` | `bg`      |
| `--surface` | `#111111` | `#ffffff` | `surface` |
| `--border`  | `#262626` | `#e4e4e4` | `border`  |
| `--text`    | `#ededed` | `#171717` | `text`    |
| `--muted`   | `#8a8a8a` | `#6b6b6b` | `muted`   |

- Tokens are CSS variables in `src/app/globals.css`, exposed to Tailwind through `@theme inline` (`bg-bg`, `text-muted`, `border-border`, ...).
- `<html>` ships with the `dark` class. A pre-paint script in `src/app/layout.tsx` removes it when `localStorage.theme === "light"`. `ThemeToggle` flips the class and saves the choice.
- The light values are not part of the original spec; they were picked to mirror the dark set.
- The old washi names (`paper`, `ink`, `line`, `seal`) are aliased to the new tokens so the case-study pages keep rendering. Remove them once those pages are rebuilt.

## Layout

- A centered content column, about 900px wide (`--col`), with thin dashed vertical lines on its left and right edges running the full page height.
- Full-width thin horizontal lines between sections, with tiny dot markers where the lines meet the page edges.

In code:

- `PageShell` draws the dashed column lines as an overlay.
- `col` utility: the column itself, `min(900px, 100% - 2rem)`, centered.
- `rule` utility: a full-width 1px line with a dot just inside each page edge.

## Section headers

Each section title sits in a full-width band filled with subtle diagonal hatch stripes (`repeating-linear-gradient` at 45deg, very low opacity), with a horizontal line above and below. The title is inside the column, left-aligned.

In code: `<Section id title action?>` renders rule, hatched band (`hatch` utility), rule, then the content area in the column. `action` is an optional control on the right of the band.

## Type

Loaded with `next/font/google` in `src/app/layout.tsx`.

| Role | Font | Tailwind | Use |
| ---- | ---- | -------- | --- |
| Display | Instrument Serif | `font-display` | The name and section titles |
| Body | Geist, medium/semibold | `font-sans` | Everything else |
| Labels, meta, tags | Geist Mono, small, wide letter-spacing | `font-mono`, `label` utility | Labels, dates, tags |

Instrument Serif is the starting choice for the tall, condensed serif; it has not yet been compared against the inspiration screenshots.

## Cards and chips

- 1px borders, no heavy shadows.
- Cards: about 12px radius (`card` utility, `--radius-card`).
- Chips: about 6px radius (`chip` utility, `--radius-chip`).

## Motion

- Subtle fade-up on scroll with framer-motion: `Reveal` (used by `Section`), 12px rise, 0.5s, once per element.
- `prefers-reduced-motion` is respected: `Reveal` skips the animation, and smooth scrolling and theme transitions are turned off.
