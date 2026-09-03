# Portfolio

A fast, single-page portfolio site with a mustard "artisan" theme, built with
**React + TypeScript + Vite**.

---

## Running it

You need [Node.js](https://nodejs.org) 24+.

```bash
npm install     # once, to download dependencies
npm run contributions # GitHub conytribution map initializes
npm run dev     # start the site at http://localhost:5173
```

| Command | What it does |
|---|---|
| `npm run dev` | Local preview with live reload |
| `npm run build` | Produces the deployable site in `dist/` |
| `npm run preview` | Serves the built `dist/` to check it before deploying |
| `npm run typecheck` | Checks for type errors without building |

---

## Changing your content

**Everything is in one file: [`src/data/portfolio.ts`](src/data/portfolio.ts).**

Name, role, about text, jobs, projects, education, skills, blog links, footer —
all of it. The file is heavily commented, and each section is numbered so you
can find what you want. You do not need to touch any other file to change what
the site says.

Images are separate, in [`public/images/`](public/images/) — see the
[README there](public/images/README.md) for what to replace and how.

### A few things that happen automatically

- **Empty a section and it vanishes.** Delete everything from `blog: []` and
  both the Blog section and its top-bar link disappear. No broken headings.
- **Add a project, get a page.** Any project with a `detail` block gets its own
  page at `/projects/<slug>`. No route to register, no file to create.
- **The top bar follows you.** The link for the section you're looking at
  highlights itself as you scroll.

---

## How it's put together

```
src/
├── data/portfolio.ts     ← your content. The only file you normally edit.
├── types.ts              ← describes the shape of that content
├── App.tsx               ← routes + which nav links to show
├── main.tsx              ← app entry point
├── pages/
│   ├── Home.tsx          ← the long single page
│   ├── ProjectDetail.tsx ← /projects/<slug>
│   └── NotFound.tsx
├── components/           ← one file per piece of the page
│   ├── NavBar.tsx        ← sticky top bar
│   ├── Hero.tsx          ← avatar, name, role, socials
│   ├── Section.tsx       ← the underlined heading wrapper
│   ├── Entries.tsx       ← experience + education cards
│   ├── ProjectCard.tsx
│   ├── Skills.tsx
│   ├── Blog.tsx
│   ├── Footer.tsx
│   ├── Icons.tsx         ← every icon, inlined as SVG
│   └── Reveal.tsx        ← the fade-up-on-scroll animation
├── lib/useScrollSpy.ts   ← highlights the active nav link
└── styles/
    ├── theme.css         ← colours, fonts, texture  ← restyle here
    └── app.css           ← component styles
```


### Where the "translucent" look comes from

Three ingredients, all in the CSS:

1. **`backdrop-filter: blur()`** on the top bar, the status pills and the
   project cards — that's what makes content visibly soften as it passes
   underneath.
2. **Semi-transparent white fills** (`--glass`, `--glass-hover` in
   `theme.css`) layered over the mustard, rather than solid colours.
3. **An SVG noise filter** for the grain, generated in CSS rather than loaded
   as an image — so the texture costs zero network requests.

The fade-up as you scroll comes from `Reveal.tsx`, which uses
`IntersectionObserver` (the browser tells us when something scrolls into view)
instead of a scroll handler that fires constantly.

Anyone who has "reduce motion" turned on in their OS gets the site with every
animation switched off. That's one block at the bottom of `theme.css`.

### Restyling

Open `src/styles/theme.css` and change the variables at the top. Every colour,
font and radius on the site reads from there, so changing `--bg` re-skins the
whole thing.

---

## Deploying

The site is hosted on **GitHub Pages** at <https://pratsins.github.io>.

Deployment is handled by `.github/workflows/deploy.yml`, which runs on two
triggers:

- **When a GitHub Release is published** — this is how site changes go live.
  Pushing to `main` deploys nothing.
- **Daily at 10:00 IST** (`30 4 * * *`, cron is UTC) — this exists only to
  republish a fresh GitHub contribution graph. Without it the Activity
  section would freeze at whatever it looked like on your last release.

### Publishing a new version

1. Push your work to `main` as usual.
2. GitHub → **Releases** → **Draft a new release**.
3. Create a tag (e.g. `v1.1.0`), give it a title, and hit **Publish release**.
4. Watch it under the **Actions** tab. Live in a couple of minutes.

The workflow does three things: refreshes your GitHub contribution graph,
builds the site, and publishes it. If the contribution fetch fails — GitHub
unreachable, token expired — it logs a warning and builds with the JSON
committed in the repo, so a bad minute at GitHub can never take the site down.

### One-time setup

| What | Where |
|---|---|
| Repo named `PratSins.github.io` | Settings → rename (must match your username) |
| `GH_CONTRIB_TOKEN` secret | Settings → Secrets and variables → Actions |
| Pages source set to **GitHub Actions** | Settings → Pages |

### Why `build:gh` and not `build`

GitHub Pages has no rewrite rules, so a real URL like `/projects/frameverse`
would 404 on a refresh. `npm run build:gh` copies `index.html` to `404.html`;
Pages serves that for unknown paths and the router takes over from there.

One side effect: those pages return an HTTP **404 status** even though they
render correctly. Harmless for visitors, slightly worse for search engines.

### Moving to another host

`npm run build` writes a plain static site to `dist/` that will run anywhere,
but each host needs its own way of sending unknown paths to `index.html`:

| Host | What to add |
|---|---|
| **Netlify** | `public/_redirects` containing `/*  /index.html  200` |
| **Vercel** | `vercel.json` with a rewrite of `/(.*)` to `/index.html` |
| **Cloudflare Workers** | `wrangler.jsonc` with `assets.not_found_handling: "single-page-application"` |

Note that Cloudflare **rejects** the Netlify-style `/*  /index.html  200`
catch-all, reporting it as an infinite loop — Workers does the fallback
natively, so that file must not exist there.

### Custom domain

Buy the domain, then Settings → Pages → **Custom domain**. GitHub tells you
the exact DNS records; it's a handful of records and about ten minutes.

---

## Before you go live

- [ ] Replace the content in `src/data/portfolio.ts`
- [ ] Replace the images in `public/images/` (and `public/favicon.svg`)
- [ ] Update the `<title>`, `description` and `og:` tags in `index.html`
- [ ] Check it on your phone — `npm run dev` prints a network URL you can open
- [ ] `npm run build` to confirm it compiles cleanly
