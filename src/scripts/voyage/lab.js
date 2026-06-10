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
