"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  depth: number;
};

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let pointerX = width / 2;
    let pointerY = height / 2;
    let scrollY = window.scrollY;

    const stars: Star[] = Array.from({ length: 160 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2 + 0.5,
      speed: Math.random() * 0.3 + 0.05,
      depth: Math.random() * 1.5 + 0.5,
    }));

    /* ---------- Events ---------- */

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const mouseMove = (e: MouseEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
    };

    const deviceMove = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        pointerX = width / 2 + e.gamma * 15;
        pointerY = height / 2 + e.beta * 15;
      }
    };

    const scroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("deviceorientation", deviceMove);
    window.addEventListener("scroll", scroll);

    /* ---------- Animation ---------- */

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        const parallaxX = (pointerX - width / 2) * 0.02 * star.depth;
        const parallaxY = (pointerY - height / 2) * 0.02 * star.depth;

        star.y += star.speed * star.depth + scrollY * 0.0005 * star.depth;

        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(
          star.x + parallaxX,
          star.y + parallaxY,
          star.radius * star.depth,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255,255,255,${0.35 + star.depth * 0.3})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("deviceorientation", deviceMove);
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}
