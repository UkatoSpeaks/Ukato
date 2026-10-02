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
| `--soft`      | `#c4c4c4`                | `#3d3d3d`          | `soft`      | Longer copy that should read brighter than `muted` |
| `--muted`     | `#a1a1a1`                | `#5c5c5c`          | `muted`     | Body copy, nav links |
| `--faint`     | `#858585`                | `#6b6b6b`          | `faint`     | Mono labels, meta, rule dots |

- The border is 10% white, not a fixed grey, so it reads `#232323` on the page and gets lighter on cards and chips, as in the screenshots.
- Tokens are CSS variables in `src/app/globals.css`, exposed to Tailwind through `@theme inline` (`bg-bg`, `text-muted`, `border-border`, ...).
- `<html>` ships with the `dark` class. A pre-paint script in `src/app/layout.tsx` removes it when `localStorage.theme === "light"`. `ThemeToggle` flips the class and saves the choice.
- The light values are not part of the original spec; they were picked to mirror the dark set.
- `faint` is the dimmest text color and still meets 4.5:1 on the page background in both themes.
- Focus: a 2px ring in `text` at 60%, 2px outside the element, on every interactive element (`:focus-visible`, in the base layer). A project card shows the ring around the whole card.

## Layout

Measured from the inspiration screenshots in `design-ref/` (not committed). They were captured at 1.25x, so pixel measurements were divided by 1.25.

- A centered content column, 760px wide (`--col`), with 32px inner padding (`sm:px-8`; 16px below `sm`). 1px dashed vertical lines in the border color run down its left and right edges for the full page height.
- Nav (`Nav`): sticky, blurred page background, 52px tall including its bottom line. The nav line is plain, with no dot markers.
  - Left: the short name in the display font at 20px, then the pronunciation in 11px mono, `faint`.
  - Right: four links from `navLinks` (Home, Projects, Experience, Contact) in Geist 14px semibold. The active one is `text` with a 1px underline, the rest `muted`. One link is always active: Home covers the hero and About, and Experience also covers Tech Stack and GitHub Activity (`covers` in `navLinks`). Then a round search button that opens the command palette, and the round theme toggle.
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
- Right of the row: a bare star icon linking to GitHub (`muted`, brightening on hover) and a button with a search icon and "⌘K" (8px radius) that opens the command palette.
- Below `sm` the avatar stacks above the name and the two buttons move underneath.
- If an image file is missing, its frame stays as a plain `surface-2` block.

The banner and avatar are original SVG drawings in `public/`: greys only, screentone dot patterns, and a film-grain filter.

## About

`About`: the bullets from `about.bullets` in 16px `text`, each with a 3px `faint` dot, 16px apart.

Below them, `NowPlaying`:

- Left: a 100px vinyl record drawn in CSS gradients (dark disc, groove rings, light center dot, a soft sheen) and an SVG tonearm pivoting at its round head, top right.
- At rest the tonearm leans onto the outer part of the record. While playing the record turns once every 3s and the arm moves 10 degrees further in. On pause the record coasts to a stop and the arm swings back. With `prefers-reduced-motion` the record does not spin.
- Right: the `label` line, the track title in bold, the artist in mono, then previous (bare icon), play/pause (52px round bordered button) and next (bare icon). The title block is as wide as its text and the controls follow 64px after it. Below `sm` the controls sit under the title.
- A 2px progress bar across the right side; clicking it seeks. A click before the first play loads the track, seeks there and starts playing.
- A title wider than its box is truncated. While playing it scrolls instead: 2s hold, scroll left at 30px/s to show the end, 2s hold, jump back. With `prefers-reduced-motion` it stays truncated.
- The track is an `<audio>` element on `nowPlaying.audioSrc` with `preload="none"`, so nothing downloads until play is pressed. With a TODO title, a missing file or a load error, the play button is disabled and `nowPlaying.empty` is shown instead of the title and artist.
- There is one track, so previous and next both restart it.

## Contact

`Contact`: one row across the full column (`flush` on `Section`, so no padding), split into equal cells with 1px lines between them. One cell per entry in `contact.links`.

- Each cell, 64px tall: the icon in a 36px bordered square with 8px radius, the label in Geist semibold, and an up-right arrow.
- Hover: the cell turns `surface-2`, the arrow moves 2px up and right, and the icon takes its brand color (LinkedIn `#0a66c2`, Mail `#ea4335`, Resume `#22c55e`; GitHub and X take `text`, which is white on dark).
- Mail is a `mailto:` link; the others open in a new tab. The Resume cell is hidden until `public/resume.pdf` exists.
- Below `md`: two columns, with an odd last cell spanning both.

## Projects

Each project has an `accentColor`. It is set as `--accent` on the card or the case-study page and used for small highlights only.

- Header action on the home page: a `btn` (bordered, 8px radius, mono, 13px here and 12px elsewhere) reading "View All Projects" with a chevron that moves right on hover. It links to `/projects`.
- `ProjectGrid`: two columns from `md`, one below, 20px gap. The home page shows the featured projects; `/projects` shows all of them, featured first.
- `ProjectCard`: `card` with 24px padding.
  - `ProjectCover` on top: 16:10, 8px radius, 1px border, the screenshot in full colour. Without an image: a gradient from the accent (22%) to `surface`, the hatch, and the title in the display font.
  - The first card in a grid has a viewfinder over its image: white corner brackets 12px in, a pulsing red dot with "REC", "ISO 400", and a dark vignette.
  - Title in Geist bold 18px, with the year in mono on the right after a 6px accent dot. Description in 15px `muted`, clamped to 4 lines.
  - A divider, then tag chips on the left and the live (globe) and GitHub icons on the right. An icon is hidden when its URL is a TODO.
  - Chips are tinted (`chip-accent`): accent at 8% for the background and 25% for the border.
  - Hover (`card-accent`, 250ms): accent border, a glow (`0 0 0 1px` accent, `0 8px 30px` accent at 15%), a 2px lift, and the image at 1.03.
  - The title link covers the whole card and opens `/projects/[slug]`; the two icon links sit above it.
  - Cards fade up with `Reveal`, the right column 80ms after the left.
- `/projects`: the shell and nav, a "Projects" band as the page title with a "← Back" `btn` to the home page, then the grid.
- `/projects/[slug]`: the shell and nav, then a Back `btn` to `/projects`, the cover, the title in the display font at 40px, a mono line (accent dot, year, status, category), the description, tinted chips, and Live / GitHub `btn`s that take the accent on hover. Problem, How it works and Flow follow as `Section` bands, with accent dots on the bullets and an accent border on the last flow step. A "Next project" row closes the page.
- On these pages `Nav` gets `page="projects"`: Projects stays active and the links lead back to the home page sections.
- The labels for these pages are in `projectLabels`.

## Experience

`Experience`, most recent entry first, 56px between entries.

- Header line: the role in Geist bold 18px, a `faint` "·", the company in semibold `muted`, followed by the location after another "·" when there is one. The date range sits on the right in 12px mono, `muted`, and wraps under the title on narrow screens.
- The summary in 15px / 1.6, `soft`.
- `Timeline`: the entry's `points`, each with a bold 15px title and a `soft` description, on a 1px vertical line in the border color with an 8px dot per point.
  - A dot starts `faint`. Once its point is 30% up from the bottom of the viewport it fills with `text` and gets a soft 4px ring.
  - A second line in `muted` fills from the top as the list scrolls past the same mark.
  - With `prefers-reduced-motion` the dots are lit and the line is full from the start.
  - A title that is also a project title links to `/projects/[slug]`, with a hairline underline on hover.
- `Stats`, 48px below: one `card` split into four equal cells with 1px dividers, inset 16px top and bottom. Below `md` it is two rows of two with full dividers.
  - Value in Geist bold 20px, label under it in the `label` style, `muted`.
  - When the bar scrolls into view, values that start with a number count up from 0 over 1s (ease-out); other values fade in.
  - The first three cells are `stats`. The fourth is this calendar year's GitHub contributions with the label "Contributions in YEAR", the same number as under the heatmap, from `getContributions` in `src/lib/github.ts` (jogruber contributions API, fetched on the server and revalidated once a day). If that fails, `contributionsStat.fallback` is shown instead.

## Tech Stack

`TechStack`, in the `skills` section. The header action is the mono hint "( select tab to filter )" in `faint`.

- Tab bar: one container with 10px radius, 1px border and `surface` background, inset 16px from the column lines, with a full-width line under it. Tabs are "All" and then each category in `techStack`, with a 14px lucide icon and the label in Geist semibold 14px, `muted`.
  - The active tab is a pill in `text` with `bg`-colored text, so it inverts with the theme. It slides between tabs (framer-motion `layoutId`).
  - From `md` the tabs share the width equally. Below, the bar scrolls sideways with the scrollbar hidden.
- Chips (`tech-chip`): wrapping row, 12px gap. 1px border, 4px radius, 8px 14px padding, 13px mono in `soft`, and a 16px logo on the left in its brand color.
  - Logos and colors are in `src/components/techIcons.ts`: Simple Icons from react-icons, or a lucide icon in a picked color where Simple Icons has none (REST APIs, ChromaDB, RAG, Groq, Vector Embeddings). Black or white logos take `text`. Brand colors that are too dark on the dark theme have a lighter `dark` value.
  - Hover: the border takes the brand color, the background gets an 8% tint of it, and the icon scales to 1.1.
  - Changing tab animates chips in and out over 200ms (`AnimatePresence` with `layout`). "All" shows every chip in category order.
- Reduced motion: the pill and chips change without sliding or scaling.

## GitHub Activity

`GitHubActivity`, in the `github` section. The header action is "@username" in mono with an external-link icon, `muted`, linking to the GitHub profile in a new tab.

- Data: `getContributions(username, year)` in `src/lib/github.ts` (jogruber contributions API), fetched on the server for this year and the two before it and revalidated once a day.
- Year tabs, right-aligned above the graph: the active one is a pill in `text` with `bg`-colored text, the others bordered and `muted`.
- `ContributionGraph`: the whole year as 7 rows (Sunday on top) by 53 week columns of squares with 3px radius and a 3px gap, with mono month labels above the column holding the 1st of each month. Squares are 10px from `md`, so the year fits the column, and 11px below.
- Colors (`--gh-0` to `--gh-4`): level 0 is `surface-2`; then `#0e4429`, `#006d32`, `#26a641`, `#39d353` on dark and `#9be9a8`, `#40c463`, `#30a14e`, `#216e39` on light.
- Hovering a square shows "N contributions on Mon D, YYYY" in a mono tooltip above it. The grid as a whole links to the GitHub profile in a new tab.
- Days of the current year that are still to come are drawn at 40% opacity.
- Below the grid: the "Less ... More" legend on its own row, right-aligned, then "N contributions in YEAR" on the left.
- When the section scrolls into view the week columns fade in from left to right, about 600ms in all. Not with `prefers-reduced-motion`.
- Below `md` the grid scrolls sideways with the scrollbar hidden, and starts at the most recent weeks: the current week this year, the end of the year for earlier ones.
- Loading (`Suspense`): the same grid in pulsing level-0 squares. If a year cannot be loaded: `github.error` and the profile link in place of the grid.

## Footer

`Footer`, on every page. A `rule`, a 24px hatched band, a line, then three centred lines with 48px padding above and below:

- `footer.credit` in 16px `soft`, then the name in bold `text`.
- "© YEAR" and `footer.rights` in 12px mono, `muted`. The year is computed.
- A pulsing green dot (`#22c55e`), the location, "·", and `FooterClock`: the time in `profile.timezone` as h:mm:ss AM/PM, ticking every second. It renders a placeholder until mounted, so server and client markup match.

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

## Command palette

`CommandPalette`, mounted once in the root layout, so it works on every page.

- Opens with ⌘K / Ctrl+K and with the nav and hero search buttons (`PaletteTrigger`). Closes with Esc or a click on the backdrop.
- A dialog up to 560px wide, 12px radius, 1px border, `surface`, over a blurred dark backdrop; it fades and scales in over 160ms.
- Search input on top, focused on open. Below, results in groups with `label` headings: Sections (scroll to the section, or go to `/#id` from another page), Projects (every project with its accent dot, to its case-study page), Links (GitHub, LinkedIn, X, copy email with a "Copied" toast, Resume when the file exists) and Actions (toggle theme).
- Typing filters fuzzily: a substring match ranks first, then letters in order. Arrow keys move the highlight (`surface-2`), Enter selects, the mouse works too.
- While open the page does not scroll, Tab stays in the dialog, and focus returns to where it was on close. Roles: `dialog`, `combobox`, `listbox`, `option`.
- Its strings are in `palette`.

## 404

`src/app/not-found.tsx`: the shell, nav and footer, with "404" as a label, the title in the display font at 40px, a `muted` line and a `btn` back to the home page. Strings in `notFound`.

## Metadata and sharing

- `site` in `data.ts` holds the title, the description and the deployed URL. Until the URL is filled in, absolute URLs (canonical, Open Graph, sitemap) use `http://localhost:3000` (`src/lib/site.ts`).
- Each page sets its canonical URL; case-study pages have their own title and description.
- Link previews (`opengraph-image.tsx`, `twitter-image.tsx`, built with `next/og` in `src/lib/og.tsx`): 1200×630, dark, hatch pattern around a bordered panel. The site image has the avatar, the name in Instrument Serif and the role in mono. A case-study image has the project title, year and category, with a dot and a bar in the accent color. Fonts for these are in `src/assets/fonts`.
- Favicon and apple-touch-icon (`icon.tsx`, `apple-icon.tsx`): an "A" in the display font on the dark background. The avatar is too detailed to read at 32px.
- `sitemap.ts` lists the home page, `/projects` and every case study; `robots.ts` allows everything.

## Motion

- Subtle fade-up on scroll with framer-motion: `Reveal` (used by `Section`), 12px rise, 0.5s, once per element.
- `prefers-reduced-motion` is respected everywhere: fade-ups, the record, the marquee, the timeline, the counters, the heatmap fade, the tab pill, the chips and the palette are either off or instant, and smooth scrolling and theme transitions are turned off. Components read the preference with `useReducedMotion` from `src/hooks`, which is safe across hydration.
- Only the banner image is loaded with priority; the avatar and project images are lazy.
