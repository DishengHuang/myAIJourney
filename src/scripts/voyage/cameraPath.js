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
