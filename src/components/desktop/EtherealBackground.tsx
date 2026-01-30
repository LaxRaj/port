"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  lifeSpeed: number;
  color: string;
};

const COLORS = ["#fbbf24", "#a78bfa", "#f5f5f5"];
const PARTICLE_COUNT = 1500;
const ATTRACT_RADIUS = 150;

export function EtherealBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const resizeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initParticles = () => {
      const { w, h } = sizeRef.current;
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        life: Math.random(),
        lifeSpeed: 0.004 + Math.random() * 0.006,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
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

    const handleResize = () => {
      if (resizeTimeoutRef.current) window.clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = window.setTimeout(resize, 120);
    };

    resize();
    window.addEventListener("resize", handleResize);

    const drawGradient = () => {
      const { w, h } = sizeRef.current;
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, "#050505");
      gradient.addColorStop(1, "#0f0f0f");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    };

    drawGradient();

    const step = () => {
      const { w, h } = sizeRef.current;
      const mouse = mouseRef.current;

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "screen";

      for (const p of particlesRef.current) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < ATTRACT_RADIUS) {
          const strength = (1 - dist / ATTRACT_RADIUS) * 0.08;
          p.vx += (dx / (dist || 1)) * strength;
          p.vy += (dy / (dist || 1)) * strength;
        }

        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        p.life += p.lifeSpeed;
        if (p.life > 1) p.life = 0;

        const alpha = 0.12 + 0.3 * Math.sin(p.life * Math.PI);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    };

    step();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) window.clearTimeout(resizeTimeoutRef.current);
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
