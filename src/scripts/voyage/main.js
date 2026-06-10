import * as THREE from 'three';
import { startStarfield } from '../stars2d.js';
import { createStage } from './scene.js';
import { addStarfield, addNebula } from './starfield.js';
import { createVoyagePath } from './cameraPath.js';
import { addWaypoints } from './waypoints.js';

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
  const updaters = [];
  const depth = 28 * posts.length + 60;
  addStarfield(scene, depth);
  addNebula(scene, curve);

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
