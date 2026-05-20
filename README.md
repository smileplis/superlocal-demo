# Superlocal — Scroll-Driven Demo Page

An Apple product-intro quality marketing/demo page for [Superlocal](https://superlocalind.vercel.app) — the operating system for India's local businesses.

## What this is

A standalone static web page (`index.html` + `style.css` + `script.js`) with:
- Cinematic dark design matching the Superlocal brand palette
- GSAP + ScrollTrigger powered scroll-driven animations
- CSS phone mockups (no images needed)
- Live demo shop links for 5 business types
- Fully responsive from 375px mobile to 1440px desktop
- Zero build step — open in any browser

## How to open locally

Just open `index.html` in any modern browser:

```bash
# Option 1: double-click index.html in Finder / Explorer

# Option 2: open from terminal (macOS)
open index.html

# Option 3: serve with a local dev server (avoids CORS on some browsers)
npx serve .
# or
python3 -m http.server 8080
# then visit http://localhost:8080
```

No build step. No npm install. No environment variables.

## How to deploy to GitHub Pages

1. Push this folder to a GitHub repository (or the root of an existing repo).
2. Go to your repo on GitHub → **Settings** → **Pages**.
3. Under **Source**, select **Deploy from a branch**.
4. Choose branch: `main` (or `master`), folder: `/ (root)`.
5. Click **Save**.
6. GitHub Pages will publish the site at `https://<username>.github.io/<repo>/`.

If this folder is a subdirectory (e.g. `superlocal_demo/`) within a larger repo, point GitHub Pages at the `main` branch `/root` and use the subfolder path, or move the three files to the repo root.

## Structure

```
superlocal_demo/
  index.html    — All markup, sections, semantic HTML
  style.css     — Design system, layout, components, responsive
  script.js     — GSAP animations, ScrollTrigger scenes
  README.md     — This file
  assets/       — Reserved for any future image assets
```

## Sections

1. Sticky nav (visible after hero scrolls out)
2. Hero — animated word reveal, ambient orbs
3. The Scale — pinned 3-stat scroll scrub with counter animation
4. The Chaos — 3 illustrated chaos panels (tiffin / clinic / tutor)
5. Enter Superlocal — wordmark reveal + 10 business module grid
6. For Providers — 3 feature rows with CSS phone mockups
7. For Consumers — 3-step booking flow
8. The Shop Link — URL display with typing effect + shop card + QR mockup
9. Built for India — 3 pillars (WhatsApp, UPI, Works Everywhere)
10. Try Live Demos — 5 demo shop cards with live links
11. CTA + Footer — brand blue gradient, sign-up CTA

## CDN dependencies

- GSAP 3.12.5 — `cdnjs.cloudflare.com`
- ScrollTrigger 3.12.5 — `cdnjs.cloudflare.com`

Both loaded from `index.html` `<head>`. No other external dependencies.

## Customising demo shop slugs

The demo shop URLs in section 10 are placeholders. Replace the `href` values in `index.html` under `#demo-section` with the actual Superlocal shop slugs once demo shops are set up.

## Brand

- Primary blue: `#2563eb`
- Accent yellow: `#eab308`
- Background: `#06060f`
- Live app: https://superlocalind.vercel.app
