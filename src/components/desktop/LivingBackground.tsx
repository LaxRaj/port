"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
};

const PARTICLE_COUNT = 1400;
const ATTRACT_RADIUS = 200;
const TRAIL_ALPHA = 0.1;

export function LivingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const sizeRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initParticles = () => {
      const { w, h } = sizeRef.current;
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => {
        const x = Math.random() * w;
        const y = Math.random() * h;
        return {
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
        };
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      sizeRef.current = { w, h };
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    };

    let resizeTimeout: number | null = null;
    const handleResize = () => {
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resize, 120);
    };

    resize();
    window.addEventListener("resize", handleResize);

    const drawBackground = () => {
      const { w, h } = sizeRef.current;
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, "#0a0a0a");
      gradient.addColorStop(1, "#121212");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    };

    const step = () => {
      const { w, h } = sizeRef.current;

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = TRAIL_ALPHA;
      drawBackground();

      ctx.globalCompositeOperation = "overlay";
      ctx.globalAlpha = 0.8;

      const mouse = mouseRef.current;
      const particles = particlesRef.current;

      for (const p of particles) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < ATTRACT_RADIUS) {
          const strength = (1 - dist / ATTRACT_RADIUS) * 0.06;
          p.vx += (dx / (dist || 1)) * strength;
          p.vy += (dy / (dist || 1)) * strength;
        }

        // gentle drift back to base
        p.vx += (p.baseX - p.x) * 0.0006;
        p.vy += (p.baseY - p.y) * 0.0006;

        // damping
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx;
        p.y += p.vy;

        // wrap edges
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const speed = Math.min(Math.hypot(p.vx, p.vy) * 6, 1);
        const r = 255 * (0.85 - speed * 0.2);
        const g = 204 * (0.85 + speed * 0.05);
        const b = 255 * (0.9 - speed * 0.1);
        const amber = `rgba(244, 196, 126, ${0.12 + speed * 0.15})`;
        const violet = `rgba(186, 162, 255, ${0.1 + speed * 0.15})`;
        ctx.fillStyle = speed > 0.45 ? amber : violet;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.1 + speed * 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    };

    step();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      onMouseMove={(event) => {
        mouseRef.current = { x: event.clientX, y: event.clientY };
      }}
      onMouseLeave={() => {
        mouseRef.current = { x: -9999, y: -9999 };
      }}
    />
  );
}
