# Razin Abdullah — Portfolio Website

A single-page portfolio for Razin Abdullah, Learning Experience Designer. Pure HTML, CSS and vanilla JavaScript — no build step, no framework, no server. Works as a static site and deploys directly to GitHub Pages.

## File structure

```
ra-portfolio/
├── index.html               ← the whole site
├── css/style.css
├── js/main.js                ← config, project data, all interactivity
├── assets/
│   ├── images/
│   │   ├── hero-poster.svg   ← placeholder, replace with hero-poster.webp
│   │   ├── projects/         ← project cover images
│   │   └── services/
│   ├── videos/
│   │   ├── hero.mp4          ← not included yet, see below
│   │   └── projects/
│   ├── icons/
│   └── documents/            ← put CV/PDF here
└── projects/
    ├── project-01.html       ← placeholder case-study pages
    ├── project-02.html
    └── project-03.html
```

## Design note

This design is inspired by Tyto's dark, saturated, game-world aesthetic (deep indigo background, vivid multi-color accents, playful geometric type) — reinterpreted as an original visual identity for Razin, not a copy. It doesn't reuse Tyto's actual photography, illustrations, fonts, or code, since those are Immersed Games' proprietary assets; copying them directly would be a real problem for both parties. Instead the palette, type pairing, and illustration style below are original.

## What's placeholder right now

- **Hero video** — `assets/videos/hero.mp4` currently ships with a short animated gradient loop (in the site's own colors) as a real, working placeholder — so the hero is never blank, but it's clearly meant to be replaced.
- **Project & hero imagery** — the abstract colored illustrations (`hero-poster.svg`, `project-01/02/03.svg`) are original placeholder graphics in the same palette, standing in for real screenshots, photos, or footage. They're intentionally schematic so they read as "add your image here," not as finished art.
- **Project links** — all three "Selected Work" cards currently link to placeholder pages in `/projects/` that say "coming soon."
- **Email / LinkedIn** — intentionally blank until you provide them (see below). The site does not invent contact details.

## How to change the hero video

1. Export a compressed, web-friendly `.mp4` (H.264, ideally under ~8–10MB for a ~15–20s loop).
2. Save it as `assets/videos/hero.mp4`, replacing the existing placeholder file exactly (same name).
3. That's it — `js/main.js` now controls the video path and poster centrally, so you only need to edit the file, not the HTML. If you do want a different filename, change this one line in `js/main.js`:
   ```js
   heroVideo: "assets/videos/hero.mp4",
   ```
   and, optionally, the matching poster:
   ```js
   heroPoster: "assets/images/hero-poster.svg",
   ```

**If the video doesn't appear after replacing it**, check these in order:

- **Open the browser console** (F12 → Console tab). If the video failed, you'll see a `[hero]` warning telling you exactly why — wrong path, unsupported codec, or a missing file.
- **View the site through a local server, not by double-clicking `index.html`.** Some browsers restrict video/autoplay behavior on pages opened directly from disk (`file://...`). Run this from the project folder and open the printed address instead:
  ```
  python3 -m http.server 8000
  ```
  then visit `http://localhost:8000`. GitHub Pages serves the site the same correct way, so this is only a local-preview quirk.
- **Check the codec.** Not all `.mp4` exports are browser-playable — some use H.265/HEVC, which most browsers reject. Re-export as H.264 (the default in most editors/compressors) if the console shows a decode error.
- **Check the exact filename and folder.** It must be `assets/videos/hero.mp4` (or whatever path you set in `heroVideo`) — capitalization and extension matter.

Until a real video is in place, the hero shows an animated gradient loop in the site's own colors, so it's never a blank frame.

**Large video files:** GitHub repositories aren't a great home for large video files. For anything beyond a small, well-compressed loop, host the video on a CDN or video platform (e.g. Cloudflare Stream, Mux, Vimeo's direct file URL, or an S3 bucket) and point `heroVideo` in `js/main.js` at that external URL instead — no other file needs to change.

## How to add images

- General images: `assets/images/`
- Project cover images: `assets/images/projects/`
- Service illustrations (optional, not wired up by default): `assets/images/services/`

Use `.webp` where possible for smaller file sizes.

## How to add a project

Open `js/main.js` and find the `projects` array near the top. Duplicate one object and edit the fields:

```js
{
  title: "Your Project Title",
  category: "Simulation Learning",       // shown as the small label
  image: "assets/images/projects/project-04.webp",
  description: "One or two sentences describing the project.",
  cta: "View project",                    // button text
  link: "https://example.com"             // or "" to auto-generate a placeholder page
}
```

That's the only place you need to edit — the "Selected Work" carousel renders itself from this array. Order in the array = order on the page.

## How to add a PDF (e.g. CV)

Put the file in `assets/documents/`, e.g. `assets/documents/razin-cv.pdf`, then link to it from anywhere using that relative path, for example:

```html
<a href="assets/documents/razin-cv.pdf">Download CV</a>
```

## How to change contact information

Open `js/main.js` and edit the top of the `siteConfig` object:

```js
const siteConfig = {
  ...
  email: "hello@razinabdullah.com",
  linkedin: "https://www.linkedin.com/in/razinabdullah",
  ...
};
```

Once filled in, the "Start a conversation" button, the email/LinkedIn links in the contact section, and the footer LinkedIn link all activate automatically. Leaving them blank keeps the buttons visibly present but inactive, rather than linking nowhere.

## Deploying to GitHub Pages

You don't need Node, npm, or any local setup — just a GitHub account.

1. Create a new repository on GitHub (e.g. `ra-portfolio`).
2. Upload every file and folder from this project into the repository, keeping the folder structure intact (drag-and-drop via the GitHub web UI works fine, or use `git push` if you're comfortable with it).
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Choose the `main` branch and the `/ (root)` folder, then click **Save**.
6. GitHub will give you a URL like `https://yourusername.github.io/ra-portfolio/` — it can take a minute or two to go live.
7. Whenever you push changes (new projects, new video, updated contact info), the live site updates automatically within a minute or so.

All asset paths in this project are relative (e.g. `assets/images/...`, not `/assets/images/...`), so the site works correctly whether it's hosted at the root of a domain or inside a repository subpath like `/ra-portfolio/`.

## Before publishing, replace:

- [ ] `assets/videos/hero.mp4` — real hero video
- [ ] `assets/images/projects/project-0X.*` — real project imagery
- [ ] The three placeholder pages in `/projects/` — real case studies, or external links set directly in `js/main.js`
- [ ] `email` and `linkedin` in `js/main.js`
- [ ] `assets/documents/razin-cv.pdf` if you want a downloadable CV linked anywhere

## Notes on the build

- No invented biographical details are included — education, years of experience, and role are exactly as provided in the brief. Everything else (testimonials, employers, project outcomes) was intentionally left out rather than fabricated.
- Respects `prefers-reduced-motion`: parallax, scroll-reveal and the hero role-text rotation are all disabled for visitors with that OS-level setting, and all content is fully visible without animation.
- Keyboard-navigable throughout, with visible focus states.

## V2 design direction

V2 intentionally keeps the placeholder project pages and placeholder project images until the real work is ready. Replace the SVGs and project-page content when ready; do not delete the project slots.

The visual direction is editorial rather than SaaS: fewer pills, larger typography, asymmetric project rhythm, restrained color, and motion used only when it supports the story.

### GitHub Pages

This is still a static site: HTML + CSS + vanilla JavaScript. Keep asset paths relative (`assets/...`, `css/...`, `js/...`) so the site works from a GitHub Pages project URL.

For larger hero/project videos, prefer external hosting or a video/CDN service rather than committing large binaries to the Git repository. GitHub Pages is the host for the site itself.

### Project placeholders

Until projects are ready, keep:

- `assets/images/projects/project-01.svg`
- `assets/images/projects/project-02.svg`
- `assets/images/projects/project-03.svg`
- `projects/project-01.html`
- `projects/project-02.html`
- `projects/project-03.html`

When replacing a placeholder, update the `projects` array in `js/main.js` and the matching project page. Do not invent outcomes, client names, metrics, testimonials, awards, or project details.
