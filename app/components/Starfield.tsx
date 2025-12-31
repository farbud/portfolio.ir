"use client";
import { useEffect, useRef } from "react";

export default function Starfield({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const stars = Array.from({ length: 160 }, () => {
      const x = Math.random() * w;
      const y = Math.random() * h;
      return {
        x,
        y,
        ox: x,
        oy: y,
        r: Math.random() * 1.6 + 0.4,
        depth: Math.random(),
        vx: 0,
        vy: 0,
      };
    });

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const updatePointer = (x: number, y: number) => {
      pointer.current.x = x;
      pointer.current.y = y;
      pointer.current.active = true;
    };

    const clearPointer = () => (pointer.current.active = false);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) =>
      updatePointer(e.clientX, e.clientY)
    );
    window.addEventListener("mouseleave", clearPointer);
    window.addEventListener(
      "touchmove",
      (e) => updatePointer(e.touches[0].clientX, e.touches[0].clientY),
      { passive: true }
    );
    window.addEventListener("touchend", clearPointer);

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);

      stars.forEach((s) => {
        const dx = pointer.current.x - s.x;
        const dy = pointer.current.y - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        const radius = active ? 140 : 90;
        const force =
          pointer.current.active && dist < radius
            ? (1 - dist / radius) * (active ? 1.2 : 0.6)
            : 0;

        // Magnetic force
        s.vx += (dx / dist) * force * s.depth;
        s.vy += (dy / dist) * force * s.depth;

        // بازگشت نرم به جای اصلی
        s.vx += (s.ox - s.x) * 0.002;
        s.vy += (s.oy - s.y) * 0.002;

        // اصطکاک
        s.vx *= 0.92;
        s.vy *= 0.92;

        s.x += s.vx;
        s.y += s.vy;

        ctx.fillStyle = active
          ? "rgba(190,210,255,0.95)"
          : "rgba(200,200,255,0.65)";

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />;
}
