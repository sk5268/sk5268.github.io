# sk5268.github.io

Source for my personal portfolio — **[sk5268.github.io](https://sk5268.github.io/)**.

A single hand-written page: no framework, no build step, no bundler. Edit the HTML, refresh,
done. That is deliberate — a portfolio shouldn't need a toolchain to stay alive.

## Contents

```
index.html          the whole page (semantic HTML + JSON-LD Person schema)
style.css           all styling — design tokens at the top, one file
script.js           ~180 lines of progressive enhancement
assets/opt/         optimised images actually served — photos + the brand mark
assets/src/         originals (not referenced by the page)
```

The nav brand mark is an illustration, not a screenshot: served as
`assets/opt/mark-{96,144}` with a WebP `srcset` so the 1.35 KB variant is
used where supported (the PNG fallback is 15 KB). It doubles as the
favicon and the iOS home-screen icon.

## What's on the page

Built to work for two audiences at once — someone skimming for 30 seconds, and someone
who actually reads.

1. **Hero** — one sentence on what I do, with the code card and the Google Maps Local
   Guide Level 7 detail.
2. **Focus** — the three things I actually work on: applied AI / Tiny Language Models,
   multi-agent systems, and end-to-end platforms, closing with the through-line
   principle: *only what's actually needed*, smaller-beats-bigger, nothing added
   "just in case".
3. **Selected work** — five shipped things, each told as *why it had to exist* rather
   than a repo description, ordered by usefulness:
   - **AGY Remote** — unofficial Antigravity CLI client; laptop as server, phone as client
   - **The extensions** — AI_TOC / Gemini_Xtension / Ipynb2Py_VSCode, 1,600+ installs
   - **Sanbo Dojo** — dojo management app on Google Play, 150+ monthly active members
   - **HNSW** — interactive 3D vector-index lab, built because no good one existed
   - **Image-To-Calendar** — timetable photo → calendar events, from college
   - **wearsc** — Wear OS Modes replacement for watches paired to a non-Samsung phone

   Followed by a **small-friction strip** (Send2TV, gtasks-win): deliberately minor
   tools that show the threshold for building something is low. The point isn't that
   they're impressive, it's that the friction was real and nobody had removed it.
4. **Freelance** — how an end-to-end engagement runs, with agent-orchestration and
   AWS keyword cards. No process promises: just the stack, and the practical details
   (location, overlap, engagement shape).
5. **Beyond the terminal** — karate, the bike, the flute, and the odd facts.
6. **Contact** — LinkedIn and GitHub. There is intentionally no public email address.

## Design notes

- **Palette** — near-black `#07070b` with an orange → violet → cyan gradient accent.
- **Type** — Space Grotesk (headings), Inter (body), JetBrains Mono (labels and code).
- **Motion** — scroll reveals, animated counters, and a progress rail, all disabled under
  `prefers-reduced-motion: reduce`.
- **Accessibility** — skip link, visible focus rings, `aria-pressed` on filters,
  `aria-expanded` on the menu, labelled landmarks, and readable contrast throughout.

## Images

The source photographs are 4000–5700px wide and 2–6 MB each. All are pre-optimised into
`assets/opt/` and served as WebP with a JPEG fallback via `srcset`.

To regenerate after adding a photo:

```bash
# large fallback + responsive WebP set (example: hero)
magick assets/src/hero.jpeg -auto-orient -resize 1920x -strip -quality 82 assets/opt/hero-1920.jpg
magick assets/src/hero.jpeg -auto-orient -resize 1280x -strip -quality 80 assets/opt/hero-1280.jpg
magick assets/src/hero.jpeg -auto-orient -resize 1600x -strip -quality 74 assets/opt/hero-1600.webp
magick assets/src/hero.jpeg -auto-orient -resize 1280x -strip -quality 76 assets/opt/hero-1280.webp
magick assets/src/hero.jpeg -auto-orient -resize  960x -strip -quality 76 assets/opt/hero-960.webp
```

Then reference them from `index.html` with a `srcset`/`sizes` pair as the existing cards do.

`assets/src/` is not linked from the page, so visitors never download it — it exists only
so the originals aren't lost. It can be deleted from the repo if size matters more.

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` directly from the filesystem also works.

## Deployment

GitHub Pages serves this repository's `main` branch root automatically. Commit and push —
there is no build step to run.

> Note: `https://sk5268.github.io/hnsw/` is a **separate repository** and is untouched by
> changes here.

## Editing content

- **Features** — each entry is an `<article class="feature">`; add `reverse` to flip the
  media to the right. The media is hand-built CSS mockups (`.agy-mock`, `.dojo-mock`,
  `.ext-window`, `.graph`, `.cal-grid`) — no screenshots to keep in sync.
- **Small-friction cards** — plain `<li>` entries in `.friction-grid`; three across on
  desktop, stacked under 1024px.
- **Stats** — numbers in `.stat-bar` animate from `data-count`, with an optional
  `data-suffix` (for example `data-count="1200" data-suffix="+"`).
- **Sections** — anything with `class="reveal"` fades in on scroll.
- **Links** — every outbound link carries `target="_blank" rel="noopener"`.
