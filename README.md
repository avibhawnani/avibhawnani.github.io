# Avi's Portfolio

A minimal, multi-page developer portfolio. Vanilla HTML, CSS, and JS — no frameworks, no build step. Light default (dark toggle), monochrome + indigo accent, a persistent identity rail with a floating pill nav (top on web, bottom tab-bar on mobile), ⌘K command palette, cursor spotlight, scroll reveals, film-grain, and a live IST clock.

---

## Project Structure

```
portfolio/
├── index.html           ← Home (a LAYN "Open the map" intro — room to grow)
├── about.html           ← About me + My journey (work cards) + Education
├── projects.html        ← Selected work
├── skills.html          ← The stack
│   (LAYN lives only as the Home intro — edit via the NOW object in data.js;
│    "about me" is the ABOUT array; jobs are EXPERIENCE with metric `highlights`.)
│   (every page shares the same nav + identity rail; only the main content differs)
│
├── css/
│   ├── theme.css        ← design tokens (light/dark). Swap --accent to re-skin.
│   ├── base.css         ← resets, fonts, tags, grain, spotlight, reveal, section heads
│   ├── layout.css       ← pill nav, shell grid, identity rail, home, footer
│   ├── sections.css     ← LAYN page, experience timeline, projects grid, skills, education
│   └── command.css      ← ⌘K command palette
│
└── js/
    ├── data.js          ← ✏️  ALL YOUR CONTENT LIVES HERE — edit this file only
    ├── render.js        ← fills the rail + each page's content from data.js
    ├── theme.js         ← light/dark toggle + localStorage (default: light)
    ├── command.js       ← ⌘K palette (go to a page, copy email, open links, toggle theme)
    └── effects.js       ← scroll progress, cursor spotlight, scroll reveal, live clock
```

---

## How to update content

**Everything you'll ever change is in `js/data.js`.** Edit, then refresh.

- **What you're building now** → edit the `NOW` object (name, status, subtitle, description, tags).
- **A job** → push to the `EXPERIENCE` array (most recent first; set `current: true` on the top one).
- **A project** → push to the `PROJECTS` array (`featured: true` adds the badge).
- **A skill** → add to the relevant group's `items` in `SKILLS` (a group with 6+ items spans two bento columns).
- **Links / headline / stats** → `PROFILE` and `STATS` at the top of the file.
- **Profile photo** → replace `content/avi.png` (square works best), or point `PROFILE.photo` elsewhere.
- **LAYN live link** → `NOW.url`.

Default theme is **light**; the floating pill nav sits top-center on web and becomes a bottom tab-bar on mobile.

Descriptions accept inline HTML: `<strong>`, `<span class="metric">94% faster</span>`, and `<span class="inline-code">Code</span>`.

---

## Running locally

No build step. For the clipboard features and fonts to work cleanly, serve it:

```bash
python3 -m http.server 3000     # then open http://localhost:3000
# or
npx serve .
```

---

## Deploying (GitHub Pages)

Push to the `avibhawnani.github.io` repo → Settings → Pages → Source: `main` / root. Live at `https://avibhawnani.github.io`. (Vercel/Netlify also work — framework **Other**, no build command, publish dir `.`.)

---

## Customising the theme

Open `css/theme.css`. Everything is a CSS variable under `:root` (dark) and `[data-theme="light"]`. Change **one line** to re-skin the whole site:

```css
--accent: #6366f1;   /* indigo — try #2dd4bf teal, or #f97316 orange */
```

The accent drives links, the active states, metrics, the nav dot, the LAYN card glow, and the scroll bar — all at once.
