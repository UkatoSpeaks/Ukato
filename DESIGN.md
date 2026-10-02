# Design

The spec for the portfolio redesign, and where each part of it lives in the code.
All content, images and text come from `src/content/data.ts`; nothing is invented.
Values not known yet are strings ending in `_TODO`; `isTodo` detects them and the UI hides them. Image paths go through `projectImage`, which returns nothing for a TODO or a missing file so a placeholder is shown.
Section headings and the short side-index labels are both in `sections` there (`title` and `indexLabel`).

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

- A centered content column, 760px wide (`--col`), with 32px inner padding (`sm:px-8`; 16px below `sm`). 1px dashed vertical lines in the border color run down its left and right edges for the full page height.
- Nav (`Nav`): sticky, blurred page background, 52px tall including its bottom line. The nav line is plain, with no dot markers.
  - Left: the short name in the display font at 20px, then the pronunciation in 11px mono, `faint`.
  - Right: four links from `navLinks` (Home, Projects, Experience, Contact) in Geist 14px semibold. The active one is `text` with a 1px underline, the rest `muted`. One link is always active: Home covers the hero and About, and Experience also covers Tech Stack and GitHub Activity (`covers` in `navLinks`). Then a round search button (no action yet; it will open the command palette) and the round theme toggle.
  - Below `md` the links collapse into a menu opened by a third round button.
- Round icon buttons (`icon-btn` utility): 32px, 1px border, `muted` icon that brightens on hover.
- Full-width 1px horizontal lines between sections. Each has a 4px dot in `faint` centred on the page edge at both ends, so half of each dot shows.

In code:

- `PageShell` draws the dashed column lines as an overlay.
- `col` utility: the column itself, `min(760px, 100% - 2rem)`, centered.
- `rule` utility: the full-width line with its two edge dots.

## Hero

`Hero`, at the top of the column.

- Banner: `profile.banner`, 4:1, 12px radius, 1px border, inset 12px from the column lines. On hover it scales to 1.03 over 1.2s.
- Row below, 28px under the banner: the avatar (`profile.avatar`, 80px square, 12px radius, 1px border), then the name in the display font at 40px with -0.04em tracking, the role in 13px mono, and the location in 11px mono with a map-pin icon.
- Right of the row: a bare star icon linking to GitHub (`muted`, brightening on hover) and a button with a search icon and "⌘K" (8px radius, no action yet).
- Below `sm` the avatar stacks above the name and the two buttons move underneath.
- If an image file is missing, its frame stays as a plain `surface-2` block.

The banner and avatar are original SVG drawings in `public/`: greys only, screentone dot patterns, and a film-grain filter.

## About

`About`: the bullets from `about.bullets` in 15px `muted` text, each with a 3px `faint` dot, 16px apart.

Below them, `NowPlaying`:

- Left: a 120px vinyl record drawn in CSS gradients (dark disc, groove rings, light center dot, a soft sheen) and an SVG tonearm pivoting at its round head, top right.
- While playing the record turns once every 3s and the tonearm swings onto it. On pause the record coasts to a stop and the arm swings back. With `prefers-reduced-motion` the record does not spin.
- Right: the `label` line, the track title in bold, the artist in mono, then previous (bare icon), play/pause (52px round bordered button) and next (bare icon). Below `sm` the controls sit under the title.
- A 2px progress bar across the right side; clicking it seeks.
- The track is an `<audio>` element on `nowPlaying.audioSrc`. With a TODO title, a missing file or a load error, the play button is disabled and `nowPlaying.empty` is shown instead of the title and artist.
- There is one track, so previous and next both restart it.

## Contact

`Contact`: one row across the full column (`flush` on `Section`, so no padding), split into equal cells with 1px lines between them. One cell per entry in `contact.links`.

- Each cell, 64px tall: the icon in a 36px bordered square with 8px radius, the label in Geist semibold, and an up-right arrow.
- Hover: the cell turns `surface-2`, the arrow moves 2px up and right, and the icon takes its brand color (LinkedIn `#0a66c2`, Mail `#ea4335`, Resume `#22c55e`; GitHub and X take `text`, which is white on dark).
- Mail is a `mailto:` link; the others open in a new tab. The Resume cell is hidden until `public/resume.pdf` exists.
- Below `md`: two columns, with an odd last cell spanning both.

## Side index

`SideIndex`, from 1280px wide only. Fixed in the right gutter, 30px from the column line, vertically centred.

- An "INDEX" label, then the `indexLabel` of each entry in `sections`, in 12px mono.
- The active entry is `text`, semibold, with a 16px dash before it; the others are `faint`.
- Active state comes from `useActiveSection` (IntersectionObserver): the section sitting in a 68px strip under the nav. Above the first section, the first entry is marked; at the bottom of the page, the last one.
- Clicking uses the anchor; smooth scrolling and the nav offset come from CSS (`scroll-behavior`, `scroll-mt-14` on sections).

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
- Chips: 4px radius, `surface-2` background, Geist Mono 10px, about 21px tall (`chip` utility, `--radius-chip`).

## Motion

- Subtle fade-up on scroll with framer-motion: `Reveal` (used by `Section`), 12px rise, 0.5s, once per element.
- `prefers-reduced-motion` is respected: `Reveal` skips the animation, and smooth scrolling and theme transitions are turned off.
