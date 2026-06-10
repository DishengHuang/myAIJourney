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
