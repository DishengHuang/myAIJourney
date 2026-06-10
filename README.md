# My AI Journey

**Live site: https://dishenghuang.github.io/myAIJourney/**

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
npm run dev      # local dev at http://localhost:4321/myAIJourney
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds
and publishes to GitHub Pages. One-time setup in the GitHub repo:
Settings → Pages → Source: **GitHub Actions**.

If the repo is renamed, update `base` in `astro.config.mjs` to match.
