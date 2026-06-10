# My AI Journey — 3D Space Voyage Blog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A static Astro 5 blog where each markdown post becomes a glowing waypoint on a scroll-driven Three.js space voyage (robotics lab → starfield → nebula), deployed to GitHub Pages.

**Architecture:** Astro content collection holds markdown posts; the homepage serializes post metadata to JSON and a vanilla Three.js scene (split into focused modules: scene, starfield, camera path, waypoints, lab) renders the voyage. Post pages are static Astro layouts with a lightweight 2D canvas starfield. A WebGL/reduced-motion check swaps in a 2D fallback.

**Tech Stack:** Astro ^5, Three.js ^0.170 (vanilla, `three/addons` for CSS2D labels), GitHub Actions + GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-06-09-ai-journey-blog-design.md`

**Conventions used throughout:**
- All commands run from the repo root.
- Verification for 3D code is `npm run build` (bundling catches import/syntax errors) plus HTML structure checks; visual confirmation happens in Task 10.
- Commit after every task.

---

### Task 1: Scaffold the Astro project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `.gitignore`
- Create: `src/styles/global.css`
- Create: `src/pages/index.astro` (placeholder, replaced in Task 4)

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "my-ai-journey",
  "type": "module",
  "version": "0.1.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  },
  "dependencies": {
    "astro": "^5.0.0",
    "three": "^0.170.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.4",
    "typescript": "^5.6.0"
  }
}
```

- [ ] **Step 2: Create `astro.config.mjs`**

The `site`/`base` assume the repo is published at `github.com/<user>/myAIJourney` with GitHub Pages. If the repo name differs, change `base` to match.

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://edisonhuang5619.github.io',
  base: '/myAIJourney',
});
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/base"
}
```

- [ ] **Step 4: Create `.gitignore`**

```
node_modules/
dist/
.astro/
```

- [ ] **Step 5: Create `src/styles/global.css`**

```css
:root {
  --bg: #030412;
  --ink: #e8f1ff;
  --ink-dim: #8da3c0;
  --cyan: #00e5ff;
  --pink: #ff6ec7;
  --purple: #7b2ff7;
  --panel: rgba(10, 16, 38, 0.72);
  --font-display: 'Orbitron', sans-serif;
  --font-body: 'Space Grotesk', sans-serif;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-body);
  line-height: 1.7;
}

h1, h2, h3 { font-family: var(--font-display); letter-spacing: 0.04em; }

a { color: var(--cyan); }
```

- [ ] **Step 6: Create placeholder `src/pages/index.astro`**

```astro
---
import '../styles/global.css';
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>My AI Journey</title>
  </head>
  <body>
    <h1>My AI Journey — under construction</h1>
  </body>
</html>
```

- [ ] **Step 7: Install and verify build**

Run: `npm install && npm run build`
Expected: build completes, `dist/index.html` exists.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: scaffold Astro project"
```

---

### Task 2: Content collection and seed posts

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/blog/2026-06-09-mission-begins.md`
- Create: `src/content/blog/2026-05-20-first-contact-with-ai.md`
- Create: `src/content/blog/2026-04-15-building-my-first-robot.md`

- [ ] **Step 1: Create `src/content.config.ts`**

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    planetColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  }),
});

export const collections = { blog };
```

- [ ] **Step 2: Create `src/content/blog/2026-06-09-mission-begins.md`**

```markdown
---
title: "Mission begins: this blog launches"
date: 2026-06-09
excerpt: "The voyage starts here — why I'm documenting my AI journey."
planetColor: "#00e5ff"
---

Today this site goes live. I'm Edison, and I'm fascinated by AI, space,
spaceships, and robotics. This blog is my mission log: every discovery,
project, and idea gets an entry — and every entry becomes a new planet
on this voyage.

Strap in.
```

- [ ] **Step 3: Create `src/content/blog/2026-05-20-first-contact-with-ai.md`**

```markdown
---
title: "First contact with AI"
date: 2026-05-20
excerpt: "The moment AI stopped being science fiction for me."
---

*(Placeholder entry — replace with your real story.)* The first time I
had a real conversation with an AI model, something clicked. It wasn't
just autocomplete; it felt like talking to the future.
```

- [ ] **Step 4: Create `src/content/blog/2026-04-15-building-my-first-robot.md`**

```markdown
---
title: "Building my first robot"
date: 2026-04-15
excerpt: "Motors, sensors, and a lot of debugging."
planetColor: "#ff6ec7"
---

*(Placeholder entry — replace with your real story.)* Robotics is where
software meets the physical world. My first build barely rolled in a
straight line, but watching code move metal was magic.
```

- [ ] **Step 5: Verify the schema rejects bad posts (failing test)**

```bash
printf -- '---\ntitle: "Bad post"\ndate: 2026-01-01\n---\nMissing excerpt.\n' > src/content/blog/bad.md
npm run build
```
Expected: build FAILS with a zod error naming the `excerpt` field.

- [ ] **Step 6: Remove the bad post and verify build passes**

```bash
rm src/content/blog/bad.md
npm run build
```
Expected: build PASSES.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: blog content collection with seed posts"
```

---

### Task 3: Mission-log layout and post pages

**Files:**
- Create: `src/layouts/MissionLog.astro`
- Create: `src/pages/blog/[slug].astro`
- Create: `src/scripts/stars2d.js`

- [ ] **Step 1: Create `src/scripts/stars2d.js`** (2D canvas starfield, reused by post pages and the homepage fallback)

```js
export function startStarfield(canvas) {
  const ctx = canvas.getContext('2d');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let stars = [];

  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      speed: Math.random() * 1.5 + 0.5,
      phase: Math.random() * Math.PI * 2,
      drift: Math.random() * 0.05 + 0.01,
    }));
  }

  function draw(t) {
    ctx.fillStyle = '#030412';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (const s of stars) {
      const alpha = reduced ? 0.8 : 0.35 + 0.55 * Math.abs(Math.sin(t * 0.001 * s.speed + s.phase));
      ctx.fillStyle = `rgba(191, 217, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      if (!reduced) {
        s.x += s.drift;
        if (s.x > canvas.width) s.x = 0;
      }
    }
    if (!reduced) requestAnimationFrame(draw);
  }

  addEventListener('resize', resize);
  resize();
  if (reduced) draw(0);
  else requestAnimationFrame(draw);
}
```

- [ ] **Step 2: Create `src/layouts/MissionLog.astro`**

```astro
---
import '../styles/global.css';
const { title, date, excerpt } = Astro.props;
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const dateStr = date.toISOString().slice(0, 10);
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={excerpt} />
    <title>{title} — My AI Journey</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&family=Space+Grotesk:wght@400;500&display=swap" rel="stylesheet" />
  </head>
  <body>
    <canvas id="stars-2d" aria-hidden="true"></canvas>
    <main class="log-wrap">
      <article class="log-panel">
        <p class="log-meta">MISSION LOG — {dateStr}</p>
        <h1>{title}</h1>
        <div class="log-body"><slot /></div>
        <a class="log-back" href={`${base}/`}>&larr; Return to voyage</a>
      </article>
    </main>
    <style>
      #stars-2d { position: fixed; inset: 0; z-index: -1; }
      .log-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 6rem 1.25rem; }
      .log-panel {
        max-width: 720px;
        background: var(--panel);
        border: 1px solid rgba(0, 229, 255, 0.35);
        border-radius: 14px;
        box-shadow: 0 0 24px rgba(0, 229, 255, 0.18), inset 0 0 40px rgba(0, 229, 255, 0.04);
        backdrop-filter: blur(6px);
        padding: 2.5rem 2.75rem;
      }
      .log-meta { color: var(--cyan); font-family: var(--font-display); font-size: 0.8rem; letter-spacing: 0.2em; margin: 0 0 0.5rem; }
      .log-panel h1 { margin: 0 0 1.25rem; font-size: 1.7rem; color: var(--ink); }
      .log-body { color: var(--ink-dim); }
      .log-body :global(p) { margin: 0 0 1rem; }
      .log-back { display: inline-block; margin-top: 1.5rem; font-family: var(--font-display); font-size: 0.85rem; text-decoration: none; }
      .log-back:hover { text-shadow: 0 0 8px var(--cyan); }
    </style>
    <script>
      import { startStarfield } from '../scripts/stars2d.js';
      startStarfield(document.getElementById('stars-2d'));
    </script>
  </body>
</html>
```

- [ ] **Step 3: Create `src/pages/blog/[slug].astro`**

```astro
---
import { getCollection, render } from 'astro:content';
import MissionLog from '../../layouts/MissionLog.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---
<MissionLog title={post.data.title} date={post.data.date} excerpt={post.data.excerpt}>
  <Content />
</MissionLog>
```

- [ ] **Step 4: Verify post pages build**

Run: `npm run build && ls dist/blog`
Expected: build passes; `dist/blog/` contains one directory per post (e.g. `2026-06-09-mission-begins/`).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: mission-log post pages with 2D starfield"
```

---

### Task 4: Homepage shell, HUD, star-map, and fallback

The homepage works fully without WebGL after this task. The 3D scene (Tasks 5–8) is progressive enhancement.

**Files:**
- Modify: `src/pages/index.astro` (replace placeholder entirely)
- Create: `src/scripts/voyage/main.js` (boot + fallback only; 3D init added in Task 5)

- [ ] **Step 1: Replace `src/pages/index.astro`**

```astro
---
import { getCollection } from 'astro:content';
import '../styles/global.css';

const posts = (await getCollection('blog')).sort(
  (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
);
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const voyageData = posts.map((p) => ({
  slug: p.id,
  url: `${base}/blog/${p.id}/`,
  title: p.data.title,
  date: p.data.date.toISOString().slice(0, 10),
  excerpt: p.data.excerpt,
  color: p.data.planetColor ?? null,
}));
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Edison's AI journey — a 3D space voyage through AI, robotics, and spaceships." />
    <title>My AI Journey</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&family=Space+Grotesk:wght@400;500&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="scene-root" hidden>
      <canvas id="voyage-canvas"></canvas>
      <div id="labels"></div>
    </div>

    <header id="hud">
      <h1 class="hud-title">MY AI JOURNEY</h1>
      <details class="star-map">
        <summary>Star map</summary>
        <nav>
          <ul>
            {voyageData.map((p) => (
              <li><a href={p.url}><strong>{p.title}</strong><span>{p.date}</span></a></li>
            ))}
          </ul>
        </nav>
      </details>
      <p id="scroll-hint">Scroll to launch &darr;</p>
    </header>

    <section id="fallback" hidden>
      <canvas id="stars-2d" aria-hidden="true"></canvas>
      <div class="log-list">
        <h2>Mission logs</h2>
        {voyageData.map((p) => (
          <a class="log-card" href={p.url}>
            <p class="log-meta">{p.date}</p>
            <strong>{p.title}</strong>
            <p>{p.excerpt}</p>
          </a>
        ))}
      </div>
    </section>

    <div id="scroll-space"></div>

    <script type="application/json" id="voyage-data" set:html={JSON.stringify(voyageData)} />
    <script>
      import { boot } from '../scripts/voyage/main.js';
      boot();
    </script>

    <style>
      #scene-root, #scene-root canvas { position: fixed; inset: 0; }
      #labels { position: fixed; inset: 0; pointer-events: none; }
      #hud { position: fixed; inset: 0; pointer-events: none; z-index: 10; }
      .hud-title {
        position: absolute; top: 1.25rem; left: 1.5rem; margin: 0;
        font-size: 1.05rem; letter-spacing: 0.3em; color: var(--ink);
        text-shadow: 0 0 12px rgba(0, 229, 255, 0.6);
      }
      .star-map { position: absolute; top: 1.25rem; right: 1.5rem; pointer-events: auto; }
      .star-map summary {
        cursor: pointer; list-style: none; font-family: var(--font-display);
        font-size: 0.8rem; letter-spacing: 0.15em; color: var(--cyan);
        border: 1px solid rgba(0, 229, 255, 0.4); border-radius: 999px;
        padding: 0.4rem 1.1rem; background: var(--panel);
      }
      .star-map nav {
        margin-top: 0.5rem; background: var(--panel); backdrop-filter: blur(6px);
        border: 1px solid rgba(0, 229, 255, 0.3); border-radius: 12px;
        padding: 0.75rem 1rem; max-width: 320px; max-height: 60vh; overflow: auto;
      }
      .star-map ul { list-style: none; margin: 0; padding: 0; }
      .star-map a { display: block; padding: 0.5rem 0.25rem; text-decoration: none; color: var(--ink); }
      .star-map a:hover strong { text-shadow: 0 0 8px var(--cyan); }
      .star-map a span { display: block; font-size: 0.75rem; color: var(--ink-dim); }
      #scroll-hint {
        position: absolute; bottom: 1.5rem; left: 50%; transform: translateX(-50%);
        font-family: var(--font-display); font-size: 0.8rem; letter-spacing: 0.2em;
        color: var(--ink-dim); animation: float 2.4s ease-in-out infinite;
        transition: opacity 0.4s;
      }
      #scroll-hint.hidden { opacity: 0; }
      @keyframes float { 50% { transform: translate(-50%, -8px); } }
      #fallback { position: relative; min-height: 100vh; }
      #fallback canvas { position: fixed; inset: 0; z-index: -1; }
      .log-list { max-width: 720px; margin: 0 auto; padding: 7rem 1.25rem 4rem; }
      .log-card {
        display: block; text-decoration: none; color: var(--ink);
        background: var(--panel); border: 1px solid rgba(0, 229, 255, 0.3);
        border-radius: 12px; padding: 1.25rem 1.5rem; margin-bottom: 1rem;
      }
      .log-card:hover { box-shadow: 0 0 18px rgba(0, 229, 255, 0.25); }
      .log-card .log-meta { color: var(--cyan); font-size: 0.75rem; letter-spacing: 0.2em; margin: 0 0 0.25rem; font-family: var(--font-display); }
      .log-card p { color: var(--ink-dim); margin: 0.4rem 0 0; }
      :global(.wp-label) {
        pointer-events: auto; cursor: pointer; text-decoration: none; text-align: center;
        display: block; color: var(--ink); background: var(--panel);
        border: 1px solid rgba(0, 229, 255, 0.4); border-radius: 10px;
        padding: 0.45rem 0.9rem; backdrop-filter: blur(4px); white-space: nowrap;
      }
      :global(.wp-label strong) { display: block; font-family: var(--font-display); font-size: 0.8rem; }
      :global(.wp-label span) { font-size: 0.7rem; color: var(--ink-dim); }
      :global(.wp-label:hover) { box-shadow: 0 0 14px rgba(0, 229, 255, 0.5); }
    </style>
  </body>
</html>
```

- [ ] **Step 2: Create `src/scripts/voyage/main.js`** (fallback path only for now)

```js
import { startStarfield } from '../stars2d.js';

export function boot() {
  const data = JSON.parse(document.getElementById('voyage-data').textContent);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !webglAvailable()) {
    showFallback();
    return;
  }
  initVoyage(data);
}

function showFallback() {
  const fallback = document.getElementById('fallback');
  fallback.hidden = false;
  document.getElementById('scroll-space').style.height = '0';
  document.getElementById('scroll-hint').style.display = 'none';
  startStarfield(document.getElementById('stars-2d'));
}

function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

function initVoyage(posts) {
  // 3D scene wired up in Task 5. Until then, show the fallback.
  showFallback();
}
```

- [ ] **Step 3: Verify build and fallback content**

Run: `npm run build && grep -c "log-card" dist/index.html && grep -c "voyage-data" dist/index.html`
Expected: build passes; both grep counts are ≥ 1 (post cards and JSON data present in HTML).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: homepage shell with HUD, star map, and 2D fallback"
```

---

### Task 5: 3D scene core — stage, starfield, nebula

**Files:**
- Create: `src/scripts/voyage/scene.js`
- Create: `src/scripts/voyage/starfield.js`

- [ ] **Step 1: Create `src/scripts/voyage/scene.js`**

```js
import * as THREE from 'three';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';

export function createStage(canvas, labelsEl) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);

  const labelRenderer = new CSS2DRenderer({ element: labelsEl });
  labelRenderer.setSize(innerWidth, innerHeight);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x030412);
  scene.fog = new THREE.FogExp2(0x030412, 0.004);

  const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 1000);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const sun = new THREE.DirectionalLight(0x88aaff, 1.4);
  sun.position.set(5, 10, 7);
  scene.add(sun);

  addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
    labelRenderer.setSize(innerWidth, innerHeight);
  });

  return { renderer, labelRenderer, scene, camera };
}
```

- [ ] **Step 2: Create `src/scripts/voyage/starfield.js`**

```js
import * as THREE from 'three';

export function makeGlowTexture(hex) {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d');
  const col = new THREE.Color(hex);
  const r = Math.round(col.r * 255);
  const g = Math.round(col.g * 255);
  const b = Math.round(col.b * 255);
  const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.9)`);
  grad.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, 0.25)`);
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}

export function addStarfield(scene, depth) {
  const COUNT = 3500;
  const positions = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 600;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 300;
    positions[i * 3 + 2] = 60 - Math.random() * (depth + 260);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    size: 1.1,
    sizeAttenuation: true,
    color: 0xbfd9ff,
    transparent: true,
    opacity: 0.9,
  });
  scene.add(new THREE.Points(geo, mat));
}

export function addNebula(scene, curve) {
  const COLORS = ['#7b2ff7', '#00e5ff', '#ff6ec7'];
  const COUNT = 8;
  for (let i = 0; i < COUNT; i++) {
    const color = COLORS[i % COLORS.length];
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: makeGlowTexture(color),
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    const p = curve.getPointAt(Math.min(i / (COUNT - 1), 0.999));
    sprite.position.set(
      p.x + (Math.random() - 0.5) * 80,
      p.y + (Math.random() - 0.5) * 50,
      p.z - 30 - Math.random() * 40
    );
    sprite.scale.setScalar(120 + Math.random() * 100);
    scene.add(sprite);
  }
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: PASS (modules are not imported yet; this catches syntax errors via the bundler only after import — so also run a quick import smoke check):

```bash
node -e "import('./src/scripts/voyage/starfield.js').catch(e => { console.error(e.message); process.exit(0); })"
```
Expected: error mentions `three` resolution or DOM — NOT a syntax error. (Full integration is verified in Task 6 when main.js imports these.)

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: 3D stage, starfield, and nebula modules"
```

---

### Task 6: Camera path and scroll-driven flight

**Files:**
- Create: `src/scripts/voyage/cameraPath.js`
- Modify: `src/scripts/voyage/main.js` (replace the stub `initVoyage`)

- [ ] **Step 1: Create `src/scripts/voyage/cameraPath.js`**

```js
import * as THREE from 'three';

export function postPosition(i) {
  return new THREE.Vector3(
    Math.sin(i * 1.7) * 9,
    Math.cos(i * 1.3) * 4,
    -28 * (i + 1) - 10
  );
}

export function createVoyagePath(postCount) {
  const points = [
    new THREE.Vector3(0, 1.6, 10),
    new THREE.Vector3(0, 2.5, -6),
  ];
  for (let i = 0; i < postCount; i++) {
    points.push(postPosition(i));
  }
  const last = points[points.length - 1];
  points.push(new THREE.Vector3(last.x * 0.3, last.y + 2, last.z - 30));
  return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.3);
}
```

- [ ] **Step 2: Replace `src/scripts/voyage/main.js` entirely**

```js
import * as THREE from 'three';
import { startStarfield } from '../stars2d.js';
import { createStage } from './scene.js';
import { addStarfield, addNebula } from './starfield.js';
import { createVoyagePath } from './cameraPath.js';

export function boot() {
  const data = JSON.parse(document.getElementById('voyage-data').textContent);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !webglAvailable()) {
    showFallback();
    return;
  }
  document.getElementById('scene-root').hidden = false;
  initVoyage(data);
}

function showFallback() {
  const fallback = document.getElementById('fallback');
  fallback.hidden = false;
  document.getElementById('scroll-space').style.height = '0';
  document.getElementById('scroll-hint').style.display = 'none';
  startStarfield(document.getElementById('stars-2d'));
}

function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

function initVoyage(posts) {
  const canvas = document.getElementById('voyage-canvas');
  const labelsEl = document.getElementById('labels');
  const { renderer, labelRenderer, scene, camera } = createStage(canvas, labelsEl);

  const curve = createVoyagePath(posts.length);
  const depth = 28 * posts.length + 60;
  addStarfield(scene, depth);
  addNebula(scene, curve);

  document.getElementById('scroll-space').style.height =
    `${(posts.length + 2) * 150}vh`;

  addEventListener(
    'scroll',
    () => document.getElementById('scroll-hint').classList.toggle('hidden', scrollY > 40),
    { passive: true }
  );

  let running = true;
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
  });

  const clock = new THREE.Clock();
  const updaters = [];
  renderer.setAnimationLoop(() => {
    if (!running) return;
    const t = clock.getElapsedTime();
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = Math.min(max > 0 ? scrollY / max : 0, 0.999);
    camera.position.copy(curve.getPointAt(p));
    camera.lookAt(curve.getPointAt(Math.min(p + 0.015, 1)));
    for (const u of updaters) u(t);
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
  });

  return { scene, camera, curve, updaters };
}
```

- [ ] **Step 3: Verify build bundles the 3D modules**

Run: `npm run build && grep -rl "setAnimationLoop" dist/_astro | head -1`
Expected: build passes; grep prints one bundled JS file (Three.js code made it into the bundle).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: scroll-driven camera flight along voyage path"
```

---

### Task 7: Waypoints — planets, labels, click navigation

**Files:**
- Create: `src/scripts/voyage/waypoints.js`
- Modify: `src/scripts/voyage/main.js` (wire waypoints into `initVoyage`)

- [ ] **Step 1: Create `src/scripts/voyage/waypoints.js`**

```js
import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { postPosition } from './cameraPath.js';
import { makeGlowTexture } from './starfield.js';

const PALETTE = ['#00e5ff', '#ff6ec7', '#7b2ff7', '#ffd166', '#06d6a0'];

export function addWaypoints(scene, posts) {
  const clickable = [];
  const sphereGeo = new THREE.SphereGeometry(1.8, 32, 32);
  const ringGeo = new THREE.TorusGeometry(2.7, 0.08, 12, 64);

  posts.forEach((post, i) => {
    const color = post.color ?? PALETTE[i % PALETTE.length];
    const planet = new THREE.Mesh(
      sphereGeo,
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.55,
        roughness: 0.35,
      })
    );
    planet.position.copy(postPosition(i)).add(new THREE.Vector3(5, 0, 0));
    planet.userData.url = post.url;

    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: makeGlowTexture(color),
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    glow.scale.setScalar(9);
    planet.add(glow);

    if (i % 2 === 0) {
      const ring = new THREE.Mesh(
        ringGeo,
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5 })
      );
      ring.rotation.x = Math.PI / 2.4;
      planet.add(ring);
    }

    const el = document.createElement('a');
    el.className = 'wp-label';
    el.href = post.url;
    const title = document.createElement('strong');
    title.textContent = post.title;
    const date = document.createElement('span');
    date.textContent = post.date;
    el.append(title, date);
    const label = new CSS2DObject(el);
    label.position.set(0, 3, 0);
    planet.add(label);

    scene.add(planet);
    clickable.push(planet);
  });

  return {
    clickable,
    update(t) {
      clickable.forEach((p, i) => {
        p.rotation.y = t * 0.15 + i;
      });
    },
  };
}
```

- [ ] **Step 2: Wire waypoints into `src/scripts/voyage/main.js`**

Add the import at the top:

```js
import { addWaypoints } from './waypoints.js';
```

Inside `initVoyage`, after `addNebula(scene, curve);`, add:

```js
  const waypoints = addWaypoints(scene, posts);
  updaters.push(waypoints.update);

  const ray = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  addEventListener('click', (e) => {
    mouse.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
    ray.setFromCamera(mouse, camera);
    const hit = ray.intersectObjects(waypoints.clickable, false)[0];
    if (hit?.object.userData.url) location.href = hit.object.userData.url;
  });
```

Note: `updaters` must be declared *before* this block — move `const updaters = [];` up so it sits directly after `const curve = createVoyagePath(posts.length);`.

- [ ] **Step 3: Verify build**

Run: `npm run build && grep -rl "wp-label" dist/_astro | head -1`
Expected: build passes; grep prints one bundled JS file.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: post planets with labels and click navigation"
```

---

### Task 8: Robotics lab intro

**Files:**
- Create: `src/scripts/voyage/lab.js`
- Modify: `src/scripts/voyage/main.js` (wire lab into `initVoyage`)

- [ ] **Step 1: Create `src/scripts/voyage/lab.js`**

```js
import * as THREE from 'three';

export function addLab(scene) {
  const lab = new THREE.Group();

  const grid = new THREE.GridHelper(40, 40, 0x00e5ff, 0x0a2a3a);
  grid.position.y = -0.01;
  lab.add(grid);

  const robot = new THREE.Group();
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x9fb6c9,
    metalness: 0.7,
    roughness: 0.3,
  });
  const eyeMat = new THREE.MeshStandardMaterial({
    color: 0x00e5ff,
    emissive: 0x00e5ff,
    emissiveIntensity: 2,
  });
  const tipMat = new THREE.MeshStandardMaterial({
    color: 0xff6ec7,
    emissive: 0xff6ec7,
    emissiveIntensity: 2,
  });

  const body = new THREE.Mesh(new THREE.BoxGeometry(1, 1.2, 0.7), bodyMat);
  body.position.y = 1.0;
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.55, 0.6), bodyMat);
  head.position.y = 1.95;
  const eyeGeo = new THREE.SphereGeometry(0.07, 12, 12);
  const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
  eyeL.position.set(-0.16, 1.98, 0.31);
  const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
  eyeR.position.set(0.16, 1.98, 0.31);
  const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.35), bodyMat);
  antenna.position.y = 2.4;
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), tipMat);
  tip.position.y = 2.6;
  const armGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.8);
  const armL = new THREE.Mesh(armGeo, bodyMat);
  armL.position.set(-0.65, 1.0, 0);
  const armR = new THREE.Mesh(armGeo, bodyMat);
  armR.position.set(0.65, 1.0, 0);

  robot.add(body, head, eyeL, eyeR, antenna, tip, armL, armR);
  robot.position.set(0, 0, 2);
  lab.add(robot);

  const rings = [0, 1, 2].map((i) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.6 + i * 0.5, 0.02, 8, 64),
      new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.35 })
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 1.1;
    lab.add(ring);
    return ring;
  });

  const glow = new THREE.PointLight(0x00e5ff, 6, 12);
  glow.position.set(0, 2, 3);
  lab.add(glow);

  scene.add(lab);

  return {
    update(t) {
      robot.position.y = Math.sin(t * 1.5) * 0.08;
      head.rotation.y = Math.sin(t * 0.7) * 0.25;
      rings.forEach((r, i) => {
        r.rotation.z = t * (0.3 + i * 0.15);
      });
    },
  };
}
```

- [ ] **Step 2: Wire lab into `src/scripts/voyage/main.js`**

Add the import at the top:

```js
import { addLab } from './lab.js';
```

Inside `initVoyage`, after the waypoints block, add:

```js
  const lab = addLab(scene);
  updaters.push(lab.update);
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: robotics lab intro with robot companion"
```

---

### Task 9: GitHub Pages deployment and README

**Files:**
- Create: `.github/workflows/deploy.yml`
- Create: `README.md`

- [ ] **Step 1: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: withastro/action@v3

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Create `README.md`**

```markdown
# My AI Journey

A personal blog about my AI story — rendered as a 3D space voyage.
Each post is a glowing planet along a scroll-driven flight from a
robotics lab through a nebula. Built with Astro 5 + Three.js.

## Add a new post

Create a markdown file in `src/content/blog/` (filename becomes the URL slug):

​```markdown
---
title: "My new discovery"
date: 2026-06-15
excerpt: "One-line teaser shown on the planet label and post list."
planetColor: "#ffd166"   # optional — auto-assigned if omitted
---

Your story here.
​```

The next build adds its planet to the voyage automatically.

## Develop

​```bash
npm install
npm run dev      # local dev at http://localhost:4321/myAIJourney
npm run build    # production build to dist/
npm run preview  # preview the production build
​```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds
and publishes to GitHub Pages. One-time setup in the GitHub repo:
Settings → Pages → Source: **GitHub Actions**.

If the repo is renamed, update `base` in `astro.config.mjs` to match.
```

(Remove the zero-width characters before the inner code fences when creating the file — they exist only so this plan renders correctly.)

- [ ] **Step 3: Verify workflow syntax**

Run: `node -e "const yaml=require('node:fs').readFileSync('.github/workflows/deploy.yml','utf8'); console.log(yaml.includes('withastro/action') && yaml.includes('deploy-pages') ? 'OK' : 'MISSING')"`
Expected: `OK`

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: GitHub Pages deploy workflow and README"
```

---

### Task 10: Final verification

**Files:** none created — verification only.

- [ ] **Step 1: Full check and build**

Run: `npm run check && npm run build`
Expected: both PASS (warnings acceptable; errors are not).

- [ ] **Step 2: Verify built output structure**

```bash
ls dist/index.html
ls -d dist/blog/*/
grep -c "voyage-data" dist/index.html
grep -c "log-card" dist/index.html
```
Expected: `dist/index.html` exists; one directory per post under `dist/blog/`; both greps ≥ 1.

- [ ] **Step 3: Smoke-test the preview server**

```bash
npm run preview & sleep 3
curl -s http://localhost:4321/myAIJourney/ | grep -o "MY AI JOURNEY" | head -1
curl -s http://localhost:4321/myAIJourney/blog/2026-06-09-mission-begins/ | grep -o "MISSION LOG" | head -1
kill %1
```
Expected: both greps print their string.

- [ ] **Step 4: Visual verification**

If browser tooling is available, screenshot the homepage (3D scene with planets and labels) and one post page (holographic panel). Otherwise, ask Edison to run `npm run dev` and confirm: lab + robot visible at top, scrolling flies through space past labeled planets, clicking a planet opens its mission log, star-map menu lists all posts.

- [ ] **Step 5: Commit any fixes and finish**

```bash
git add -A
git commit -m "chore: final verification fixes" --allow-empty
```

---

## Self-review notes

- Spec coverage: experience (Tasks 4–8), content model (Task 2), mission-log pages (Task 3), fallback (Task 4), performance caps (pixel ratio clamp Task 5, visibility pause Task 6, geometry reuse Task 7), deploy (Task 9), seed posts (Task 2), verification (Task 10). Star-map menu: Task 4.
- Type consistency: `postPosition` defined in Task 6, consumed in Task 7. `makeGlowTexture` defined in Task 5, consumed in Task 7. `updaters` array defined in Task 6, pushed to in Tasks 7–8 (with explicit declaration-order note in Task 7).
- No placeholders; every code step contains complete code.

