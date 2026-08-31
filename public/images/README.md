# Images

**Every image on the site lives in this folder.** Nothing here is imported by
the code — the site refers to each file by its path, so swapping a picture is
just dropping a file in and (if the extension changed) updating one line in
`src/data/portfolio.ts`.

## What's here now

| File | Shown where | Referenced in `portfolio.ts` as | Best size |
|---|---|---|---|
| `avatar.svg` | Round photo at the top of the page | `profile.avatar` | square, 500×500 |
| `projects/project-one.svg` | First project card + its page | `projects[0].image` | 3:2, 1200×750 |
| `projects/project-two.svg` | Second project card + its page | `projects[1].image` | 3:2, 1200×750 |
| `og-cover.svg` | Preview card when the link is shared | `index.html` `og:image` | 1200×630 |
| `../favicon.svg` | Browser tab icon (one folder up) | `index.html` `rel="icon"` | square |

## Replacing one

1. Drop your file in this folder — say `avatar.jpg`.
2. Open `src/data/portfolio.ts` and change the path to match:
   ```ts
   avatar: '/images/avatar.jpg',
   ```

The leading `/` matters. It means "the root of the site", **not** a folder on
your Mac — so `/images/avatar.jpg` is the correct path even though the file
sits in `public/images/`.

## Adding a project image

Put it in `projects/`, then point the new project's `image` field at it:

```ts
image: '/images/projects/my-new-thing.png',
imageAlt: 'Dashboard showing weekly revenue',   // describe it — screen readers read this
```

## Keeping the site fast

The three things that matter, in order:

1. **Resize before you upload.** A 4000px-wide photo displayed at 250px is
   ~40x more data than needed. Export the avatar at about 500×500 and project
   shots at about 1200px wide.
2. **Use `.webp` if you can** — usually 25–35% smaller than `.jpg` at the same
   quality, and every current browser supports it. On a Mac:
   `cwebp -q 82 photo.jpg -o photo.webp` (`brew install webp`).
3. **Leave the `loading` attributes alone.** The avatar is set to load
   immediately; project images below the fold are set to load lazily. That is
   already handled in the components.
