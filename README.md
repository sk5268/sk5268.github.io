# sk5268.github.io

Source for my personal portfolio — **[sk5268.github.io](https://sk5268.github.io/)**.

A single hand-written page: no framework, no build step, no bundler. Edit the HTML, refresh,
done. That is deliberate — a portfolio shouldn't need a toolchain to stay alive.

## Contents

```
index.html          the whole page (semantic HTML + JSON-LD Person schema)
style.css           all styling — design tokens at the top, one file
script.js           ~180 lines of progressive enhancement
assets/opt/         optimised, responsive images actually served to visitors
assets/src/         original full-resolution photos (not referenced by the page)
```

## What's on the page

Built to work for two audiences at once — someone skimming for 30 seconds, and someone
who actually reads.

1. **Hero** — one sentence on what I do, with the code card and the Google Maps Local
   Guide Level 7 detail.
2. **Focus** — the three things I actually work on: applied AI / Tiny Language Models,
   multi-agent systems, and end-to-end platforms.
3. **Selected work** — five shipped things, each told as *why it had to exist* rather
   than a repo description, ordered by usefulness:
   - **AGY Remote** — unofficial Antigravity CLI client; laptop as server, phone as client
   - **The extensions** — AI_TOC / Gemini_Xtension / Ipynb2Py_VSCode, 1,600+ installs
   - **Sanbo Dojo** — dojo management app on Google Play, 150+ monthly active members
   - **HNSW** — interactive 3D vector-index lab, built because no good one existed
   - **Image-To-Calendar** — timetable photo → calendar events, from college
4. **Freelance** — how an end-to-end engagement runs, with an agent-orchestration and
   AWS keyword card.
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
- **Stats** — numbers in `.stat-bar` animate from `data-count`, with an optional
  `data-suffix` (for example `data-count="1200" data-suffix="+"`).
- **Sections** — anything with `class="reveal"` fades in on scroll.
- **Links** — every outbound link carries `target="_blank" rel="noopener"`.
