# My AI Journey

A personal blog about my AI story — rendered as a 3D space voyage.
Each post is a glowing planet along a scroll-driven flight from a
robotics lab through a nebula. Built with Astro 5 + Three.js.

## Add a new post

Create a markdown file in `src/content/blog/` (filename becomes the URL slug):

```markdown
---
title: "My new discovery"
date: 2026-06-15
excerpt: "One-line teaser shown on the planet label and post list."
planetColor: "#ffd166"   # optional — auto-assigned if omitted
---

Your story here.
```

The next build adds its planet to the voyage automatically.

## Develop

```bash
npm install
npm run dev      # local dev at http://localhost:4321
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Deploy

The site is deployed on Vercel. To redeploy, ask Claude (via the Vercel
connector) or push to the connected git repo.

Alternative: GitHub Pages via `.github/workflows/deploy.yml` — for that,
set `site`/`base` in `astro.config.mjs` (base must match the repo name)
and enable Settings → Pages → Source: **GitHub Actions**.
