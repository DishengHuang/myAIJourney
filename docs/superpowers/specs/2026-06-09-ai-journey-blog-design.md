# My AI Journey — 3D Space Voyage Blog: Design

Date: 2026-06-09
Status: Approved by Edison

## Purpose

A personal blog where Edison documents his AI journey over time (entries added day by day, week by week, or month by month). The site is a magical, high-tech 3D experience blending his passions: AI, space, spaceships, and robotics. Adding a new post must be trivial — drop a markdown file in a folder.

## The experience

The homepage is a full-screen scroll-driven 3D voyage built with Three.js:

1. **Opening: robotics lab.** A robot companion powers up amid glowing holographic circuits.
2. **Launch.** As the visitor scrolls, the camera flies a spaceship out of the lab into a star field and a colorful nebula.
3. **Waypoints.** Each blog post is a glowing planet/waypoint along the flight path, labeled with title and date, ordered newest to oldest. A star-map menu allows jumping directly to any post.
4. **Posts.** Clicking a waypoint navigates to that post's page, styled as a holographic mission log: dark space background, glowing panel, clean readable text, subtle animated 2D stars (no heavy 3D on post pages).

**Fallback:** devices without WebGL, with `prefers-reduced-motion`, or small/low-power screens get an animated 2D starfield with the same mission-log post list. The site never breaks.

## Architecture

- **Framework:** Astro 5, static output. Vanilla Three.js on the homepage only (no React).
- **Content:** posts are markdown files in `src/content/blog/`, validated by an Astro content-collection schema:
  - `title` (string, required)
  - `date` (date, required)
  - `excerpt` (string, required)
  - `planetColor` (string, optional — hex color for the post's planet; assigned from a palette if omitted)
- **Data flow:** at build time, Astro serializes the post list (title, date, excerpt, slug, planetColor) to JSON embedded in the homepage. The Three.js scene reads it and generates one waypoint per post along the camera path. Scroll position drives the camera. Raycast click on a waypoint navigates to `/blog/<slug>/`.
- **Adding a post:** add one `.md` file; the next build adds its waypoint automatically. No code changes.

## Components

| Unit | Responsibility |
|---|---|
| `src/content/blog/` + schema | Post storage and validation |
| `src/scripts/voyage/` (Three.js modules) | 3D scene: lab intro, spaceship, starfield/nebula, waypoints, scroll-camera, raycasting |
| `src/pages/index.astro` | Homepage shell; embeds scene + serialized post data; hosts fallback |
| `src/layouts/MissionLog.astro` | Post page layout (holographic mission-log styling) |
| `src/pages/blog/[slug].astro` | Static post pages from the collection |
| Fallback module | WebGL/reduced-motion detection; 2D starfield + post list |
| `.github/workflows/deploy.yml` | Build and deploy to GitHub Pages on push to main |

The scene code is split into focused modules (scene setup, camera path, waypoints, effects) so each can be understood and modified independently.

## Performance and error handling

- Particle counts capped; `renderer.setPixelRatio` clamped to 2.
- Geometry/material reuse for waypoints; single render loop paused when tab is hidden.
- WebGL detection before scene init; failure path renders the 2D fallback.
- Malformed post frontmatter fails `astro build` with a clear schema error.

## Deployment

GitHub Pages via GitHub Actions: push to `main` → `astro build` → publish. Astro `site`/`base` configured for the repo's Pages URL.

## Testing and verification

- `astro check` and `astro build` must pass.
- Manual verification: run the site, screenshot the 3D scene and a post page, confirm waypoints match posts, confirm fallback renders with WebGL disabled.
- Seed content: 2–3 sample posts marking the start of the journey, which Edison will replace/extend over time.

## Out of scope (YAGNI)

Comments, search, RSS, tags, analytics, CMS integration. Can be added later — Astro supports all of these — but not in v1.
