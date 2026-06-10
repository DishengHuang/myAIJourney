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
