# Portfolio

A fast, single-page portfolio site with a mustard "artisan" theme, built with
**React + TypeScript + Vite**.

---

## Running it

You need [Node.js](https://nodejs.org) 24 or newer.

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

`npm run build` writes a plain static site to `dist/`. Upload that anywhere.

Because project pages use real URLs (`/projects/ecommerce-platform`) rather
than `#hash` ones, **the host must send unknown paths to `index.html`** —
otherwise refreshing a project page gives a 404. Config for that is already
included:

| Host | What's needed | Status |
|---|---|---|
| **Netlify** | `public/_redirects` | ✅ included |
| **Vercel** | `vercel.json` | ✅ included |
| **Cloudflare Pages** | works out of the box | ✅ |

All 3 have a free tier that covers a portfolio comfortably.

### Custom domain

Buy the domain, then point it at your host — each of the above has a
"Custom domain" panel that tells you the exact DNS records to add. It's two
records and about ten minutes.

---

## Before you go live

- [ ] Replace the content in `src/data/portfolio.ts`
- [ ] Replace the images in `public/images/` (and `public/favicon.svg`)
- [ ] Update the `<title>`, `description` and `og:` tags in `index.html`
- [ ] Check it on your phone — `npm run dev` prints a network URL you can open
- [ ] `npm run build` to confirm it compiles cleanly
