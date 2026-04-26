# Avi's Portfolio

A minimal, dark/light portfolio site. Built with vanilla HTML, CSS, and JS — no frameworks, no build step.

---

## Project Structure

```
portfolio/
├── index.html          ← HTML skeleton only, no content or styles inline
│
├── css/
│   ├── theme.css       ← CSS variables for dark/light colours — edit to retheme
│   ├── base.css        ← Resets, body, fonts, shared utilities, animations
│   ├── nav.css         ← Navigation bar
│   ├── hero.css        ← Headline, work blurb, stats row
│   ├── tabs.css        ← Tab bar + all panel styles (posts, exp, writings, projects)
│   └── footer.css      ← Footer
│
└── js/
    ├── data.js         ← ✏️  ALL YOUR CONTENT LIVES HERE — edit this file only
    ├── render.js       ← Reads data.js and builds DOM — don't touch unless restructuring
    ├── theme.js        ← Dark/light toggle logic + localStorage persistence
    └── tabs.js         ← Tab switching logic
```

---

## How to update content

**Everything you'll ever need to change is in `js/data.js`.**

### Add a new post
```js
// In POSTS array:
{ title: "Your post title", category: "ENGINEERING", year: 2026, url: "/posts/your-post" },
```

### Add a new job
```js
// In EXPERIENCE array:
{
  role:    "Senior Backend Engineer",
  company: "Your Company",
  location: "Mumbai, India",
  period:  "Jan 2026 – Present",
  description: `Your description with <strong>bold</strong> support.`,
  tags: ["Java", "Kafka", "PostgreSQL"],
},
```

### Update your links
```js
// At the top of data.js in PROFILE:
email:    "your@email.com",
twitter:  "https://x.com/yourhandle",
github:   "https://github.com/yourusername",
linkedin: "https://linkedin.com/in/yourprofile",
```

---

## Running locally

No build step needed. Just open `index.html` in a browser.

If you see blank content (CORS on scripts), use a local server:
```bash
# Python
python3 -m http.server 3000

# Node (npx)
npx serve .
```
Then visit http://localhost:3000

---

## Deploying

### Vercel (recommended)
1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → Import your repo
3. Framework: **Other** (static site, no build command needed)
4. Deploy — done. Live in ~30 seconds.

### Netlify
1. Push to GitHub
2. netlify.com → Add new site → Import from Git
3. Build command: *(leave empty)*
4. Publish directory: `.` (root)
5. Deploy

### GitHub Pages
1. Push to a repo named `yourusername.github.io`
2. Settings → Pages → Source: main branch / root
3. Live at `https://yourusername.github.io`

---

## Customising the theme

Open `css/theme.css`. The two blocks control dark and light mode:

```css
:root {                     /* dark mode */
  --accent: #f97316;        /* ← change this for a different accent colour */
  --bg: #0c0c0c;
  --text: #e8e8e8;
  ...
}

[data-theme="light"] {      /* light mode */
  --accent: #ea580c;
  --bg: #fafaf8;
  ...
}
```

Change `--accent` to any colour and the dot, hover states, and active tab all update automatically.
