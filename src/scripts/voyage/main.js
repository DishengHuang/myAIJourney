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
