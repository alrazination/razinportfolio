# Razin Abdullah — Portfolio Website (V2)

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
│   │   ├── projects/         ← project cover art
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

## What changed in V2

This is a full editorial redesign, built on top of the same architecture as V1 — same file structure, same relative paths, same `siteConfig` / `projects` data model in `js/main.js`, same GitHub Pages deployment. What changed is the visual system and the information order:

- **Palette:** warm paper (`#F1EEE7` / `#E8E3D9`) with near-black ink (`#171715`) and a deep dark-green surface (`#1B211F`) for two deliberate dark moments — the design-philosophy manifesto and the closing contact section. Acid (`#D9F36B`) and orange (`#F06A4E`) are used as punctuation, not paint.
- **Type:** Newsreader (an editorial serif, used for headlines and italic accents) paired with Archivo (a grotesk sans, used for UI, labels and body copy) — no rounded geometric heading + Inter body formula.
- **Shape:** rectangular buttons, underlined links, hairline rules. No pill buttons, no card grids, no border-radius-everything.
- **Information order:** Selected Work now appears right after the hero, before Services — so a visitor sees evidence of the work before reading about what's on offer, per the brief.
- **Selected Work layout:** the three projects are no longer identical cards in a horizontal carousel. They're a vertical sequence with a repeating three-part rhythm — full-width featured, then alternating offset compositions — so new projects added to the array pick the rhythm back up automatically (see `js/main.js`).
- **Motion:** pulled back deliberately. Instead of a fade-up reveal on every section, there's a single orchestrated scroll moment on the "Every click should earn its place" manifesto section. Everything else is static, with hover and focus states doing the rest.

## Design note

This design is not a copy of Tyto's dark, game-world aesthetic, its typography, its illustrations, or its code — Tyto belongs to Immersed Games. It takes inspiration only from the *quality* of high-end editorial creative portfolios (typographic confidence, restraint, deliberate rhythm), reinterpreted from scratch in an original warm/editorial palette and layout specific to Razin.

## What's placeholder right now

- **Hero video** — `assets/videos/hero.mp4` isn't included yet. Until it's added, the hero shows a quiet warm-toned placeholder texture (in the site's own palette) as a real, working fallback — so the hero is never blank.
- **Project & hero imagery** — the abstract line-art illustrations (`hero-poster.svg`, `project-01/02/03.svg`) are original placeholder graphics in the site's palette, standing in for real screenshots, photos or footage. They're intentionally schematic — a decision tree, a static-to-interactive transformation, a measurement chart — so they read as considered placeholders, not empty boxes.
- **Project links** — all three "Selected Work" entries link to placeholder pages in `/projects/` with the full case-study section scaffold (problem, audience, design question, approach, experience, process, result, reflection) marked "coming soon." No metrics, outcomes or testimonials are invented anywhere.
- **Email / LinkedIn** — intentionally blank until you provide them (see below). The site does not invent contact details.

## How to change the hero video

1. Export a compressed, web-friendly `.mp4` (H.264, ideally under ~8–10MB for a ~15–20s loop).
2. Save it as `assets/videos/hero.mp4`, replacing the existing placeholder file exactly (same name).
3. That's it — `js/main.js` controls the video path and poster centrally, so you only need to edit the file, not the HTML. To use a different filename, change this one line in `js/main.js`:
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
- **Check the codec.** Not all `.mp4` exports are browser-playable — some use H.265/HEVC, which most browsers reject. Re-export as H.264 if the console shows a decode error.
- **Check the exact filename and folder.** It must be `assets/videos/hero.mp4` (or whatever path you set in `heroVideo`) — capitalization and extension matter.

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
  cta: "View project",                    // link text
  link: ""                                // or a URL / path to the real case study
}
```

That's the only place you need to edit — the "Selected Work" section renders itself from this array, and CSS assigns each new entry the next position in the repeating three-part layout rhythm (featured / offset-right / offset-left). Order in the array = order on the page.

## How to add a PDF (e.g. CV)

Put the file in `assets/documents/`, e.g. `assets/documents/razin-cv.pdf`, then link to it from anywhere using that relative path:

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

## Before publishing, replace

- [ ] `assets/videos/hero.mp4` — real hero video
- [ ] `assets/images/projects/project-0X.*` — real project imagery
- [ ] The three placeholder pages in `/projects/` — real case studies, or external links set directly in `js/main.js`
- [ ] `email` and `linkedin` in `js/main.js`
- [ ] `assets/documents/razin-cv.pdf` if you want a downloadable CV linked anywhere

## Notes on the build

- No invented biographical details are included — education, years of experience, and role are exactly as provided in the brief. Everything else (testimonials, employers, project outcomes) is intentionally left as a marked placeholder rather than fabricated.
- Respects `prefers-reduced-motion`: the hero parallax, the hero role-text rotation, and the one manifesto-section scroll reveal are all disabled for visitors with that OS-level setting, and all content is fully visible without animation.
- Keyboard-navigable throughout, with visible focus states and a skip-to-content link.
