import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Positions are in CSS pixels; the backing store is scaled by the device
    // pixel ratio (capped at 2, which is past what the eye resolves on dots
    // this small) so the field is crisp on high-density screens.
    let width = 0;
    let height = 0;
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createParticles = () => {
      const particles: Particle[] = [];
      // Density by area, capped: linking is pairwise, so an uncapped 4K
      // screen (~550 particles) meant ~150,000 distance checks every frame.
      // 160 keeps a 1080p screen's look (~140) and bounds the worst case.
      const particleCount = Math.min(160, Math.floor((width * height) / 15000));

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2
        });
      }

      particlesRef.current = particles;
    };

    const updateParticles = () => {
      particlesRef.current.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Turn back only when heading further out, so a particle left outside
        // by a resize returns instead of flipping direction every frame.
        if ((particle.x < 0 && particle.vx < 0) || (particle.x > width && particle.vx > 0)) particle.vx *= -1;
        if ((particle.y < 0 && particle.vy < 0) || (particle.y > height && particle.vy > 0)) particle.vy *= -1;
      });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        // The site accent at reduced strength: the field sits behind content,
        // so it reads as texture rather than a second light source.
        ctx.fillStyle = `rgba(91, 184, 204, ${particle.opacity * 0.6})`;
        ctx.fill();
      });

      // Connect nearby particles. Plain index loops (the old slice() made a
      // new array per particle, every frame) and squared distances, so the
      // square root is only taken for the few pairs that actually link.
      const particles = particlesRef.current;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distanceSq = dx * dx + dy * dy;
          if (distanceSq < 10000) {
            const distance = Math.sqrt(distanceSq);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(200, 210, 220, ${0.12 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        }
      }
    };

    // With reduced motion the field is drawn once and held still, so the
    // background keeps its look without anything drifting.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = () => {
      updateParticles();
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    if (reduceMotion) drawParticles();
    else animate();

    // A phone's address bar showing or hiding resizes the viewport height on
    // every scroll direction change. Only a width change (rotation, a desktop
    // window resize) reshuffles the field; a height change keeps every
    // particle where it is, and any now below the edge drift back in.
    const handleResize = () => {
      const previousWidth = width;
      resizeCanvas();
      if (width !== previousWidth) createParticles();
      if (reduceMotion) drawParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default ParticleBackground;
