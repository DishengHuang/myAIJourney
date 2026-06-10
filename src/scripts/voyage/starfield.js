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
