# Radiant Rootz

A single static marketing website (HTML/CSS/vanilla JS) for the "Radiant Rootz" natural beauty brand.

- `index.html` — the single page (all content/sections).
- `css/styles.css` — all styling.
- `js/main.js` — all interactions/animations (custom cursor, preloader, GSAP scroll animations, Lenis smooth scroll, contact form toast).
- `assets/images/` — image assets.

## Cursor Cloud specific instructions

- This is a fully static site: no package manager, no build step, no backend, no database, and no tests/lint tooling are configured. There is nothing to install; the update script is intentionally a no-op.
- To run it in development, serve the repo root with any static HTTP server, e.g. `python3 -m http.server 8000`, then open `http://localhost:8000/`. Do NOT open `index.html` via `file://` — relative asset paths are served best over HTTP.
- GSAP, ScrollTrigger, and Lenis are loaded from CDNs (cdnjs/unpkg) and Google Fonts is used, so full animations/fonts require outbound internet. The JS degrades gracefully (checks `typeof gsap`/`ScrollTrigger`/`Lenis`) and still shows content if CDNs are blocked.
- The contact form (`#contactForm`) is front-end only: on valid submit it resets the form and shows a toast ("Message sent — we'll be in touch soon."). There is no backend submission/email delivery.
