# Design

The spec for the portfolio redesign, and where each part of it lives in the code.
All content, images and text come from `src/content/data.ts`; nothing is invented.

## Theme

Dark by default, with a light theme behind the toggle in the nav.

| Token        | Dark                     | Light              | Tailwind class suffix | Use |
| ------------ | ------------------------ | ------------------ | --------------------- | --- |
| `--bg`        | `#0a0a0a`                | `#fafafa`          | `bg`        | Page |
| `--surface`   | `#101010`                | `#ffffff`          | `surface`   | Cards |
| `--surface-2` | `#161616`                | `#f3f3f3`          | `surface-2` | Chips, buttons |
| `--border`    | `rgb(255 255 255 / 0.1)` | `rgb(0 0 0 / 0.1)` | `border`    | Every line and border |
| `--text`      | `#f5f5f5`                | `#171717`          | `text`      | Titles, strong text |
| `--muted`     | `#a1a1a1`                | `#5c5c5c`          | `muted`     | Body copy, nav links |
| `--faint`     | `#737373`                | `#8c8c8c`          | `faint`     | Mono labels, meta, rule dots |

- The border is 10% white, not a fixed grey, so it reads `#232323` on the page and gets lighter on cards and chips, as in the screenshots.
- Tokens are CSS variables in `src/app/globals.css`, exposed to Tailwind through `@theme inline` (`bg-bg`, `text-muted`, `border-border`, ...).
- `<html>` ships with the `dark` class. A pre-paint script in `src/app/layout.tsx` removes it when `localStorage.theme === "light"`. `ThemeToggle` flips the class and saves the choice.
- The light values are not part of the original spec; they were picked to mirror the dark set.
- The old washi names (`paper`, `ink`, `line`, `seal`) are aliased to the new tokens so the case-study pages keep rendering. Remove them once those pages are rebuilt.

## Layout

Measured from the inspiration screenshots in `design-ref/` (not committed). They were captured at 1.25x, so pixel measurements were divided by 1.25.

- A centered content column, 760px wide (`--col`), with 32px inner padding (`px-8`). 1px dashed vertical lines in the border color run down its left and right edges for the full page height.
- Nav: 52px tall including its bottom line. The nav line is plain, with no dot markers. Links are Geist 14px semibold in `muted`; the wordmark is the display font at 20px.
- Full-width 1px horizontal lines between sections. Each has a 4px dot in `faint` centred on the page edge at both ends, so half of each dot shows.

In code:

- `PageShell` draws the dashed column lines as an overlay.
- `col` utility: the column itself, `min(760px, 100% - 2rem)`, centered.
- `rule` utility: the full-width line with its two edge dots.

## Section headers

Each section title sits in a band 56px tall with a horizontal line above and below. Diagonal hatch stripes fill the band in the gutters only; the column inside the band is plain page background. The title is inside the column, left-aligned and vertically centred.

- Hatch: `repeating-linear-gradient` at 135deg (stripes rise to the right), 1px stripe every 7px, text color at 5%.
- Content below the band starts after 32px (`py-8`, 40px from `md`).

In code: `<Section id title action?>` renders rule, hatched band (`hatch` utility, with `bg-bg` on the column), rule, then the content area in the column. `action` is an optional control on the right of the band.

## Type

Loaded with `next/font/google` in `src/app/layout.tsx`.

| Role | Font | Tailwind | Use |
| ---- | ---- | -------- | --- |
| Display | Instrument Serif | `font-display` | The name (40px, tracking -0.04em), section titles (26px), nav wordmark (20px) |
| Body | Geist, 15px / 1.6, medium, tracking -0.02em | `font-sans` | Everything else |
| Labels, meta, tags | Geist Mono, 10px, tracking 0.16em, uppercase, `faint` | `font-mono`, `label` utility | Labels, dates, tags |

Instrument Serif was checked against the screenshots and kept. For "About", the width divided by the capital height is 2.78 in the screenshot and 2.79 in Instrument Serif. The nearest alternatives (Noto Serif Display condensed, Oranienbaum, Fraunces) are all 3.2 or wider. The name in the screenshots is the same font set tighter, hence the -0.04em tracking.

## Cards and chips

- 1px borders, no heavy shadows.
- Cards: about 12px radius, `surface` background (`card` utility, `--radius-card`).
- Chips: about 6px radius, `surface-2` background, Geist Mono 10px, about 21px tall (`chip` utility, `--radius-chip`).

## Motion

- Subtle fade-up on scroll with framer-motion: `Reveal` (used by `Section`), 12px rise, 0.5s, once per element.
- `prefers-reduced-motion` is respected: `Reveal` skips the animation, and smooth scrolling and theme transitions are turned off.
