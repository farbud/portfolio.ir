/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Starfield from "./Starfield";

interface DeviceOrientationEventWithPermission extends DeviceOrientationEvent {
  requestPermission?: () => Promise<PermissionState>;
}

const roles = [
  "Front-End Intern",
  "React / Next.js Developer",
  "UI & Animation Lover",
];

export default function HeroHeader() {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // Typing Effect
  useEffect(() => {
    const current = roles[roleIndex];

    if (charIndex < current.length) {
      const t = setTimeout(() => {
        setText((p) => p + current[charIndex]);
        setCharIndex(charIndex + 1);
      }, 80);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setText("");
        setCharIndex(0);
        setRoleIndex((i) => (i + 1) % roles.length);
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [charIndex, roleIndex]);

  const enableGyro = async () => {
    if (typeof window === "undefined") return;

    const DeviceOrientation =
      window.DeviceOrientationEvent as unknown as DeviceOrientationEventWithPermission;

    if (typeof DeviceOrientation?.requestPermission === "function") {
      try {
        const permission = await DeviceOrientation.requestPermission();
        if (permission !== "granted") {
          console.warn("Gyroscope permission denied");
        }
      } catch (err) {
        console.error("Gyroscope permission error:", err);
      }
    }
  };

  return (
    <section
      onClick={enableGyro}
      className="relative h-screen overflow-hidden bg-black text-white"
    >
      {/* Real Particles */}
      <Starfield />

      {/* Galaxy Glow */}
      <div className="absolute inset-0 galaxy-bg" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col-reverse md:flex-row items-center justify-center gap-10 px-6 md:px-24">
        {/* Text */}
        <div className="max-w-xl text-center md:text-left space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">فربد خورشیدی</h1>

          <h2 className="h-8 text-xl font-mono text-indigo-300">
            {text}
            <span className="animate-pulse">|</span>
          </h2>

          <p dir="ltr" className="text-gray-300 font-mono">
            تمرکز روی{" "}
            <bdi dir="ltr" className="font-semibold">
              React
            </bdi>{" "}
            و{" "}
            <bdi dir="ltr" className="font-semibold">
              Next.js&nbsp;
            </bdi>{" "}
            علاقه‌مند به{" "}
            <bdi dir="ltr" className="font-semibold">
              ui&nbsp;
            </bdi>{" "}
            و توسعه رابط های کاربری تمیز،سریع و کاربردی
          </p>

          <span className="inline-block rounded-full border border-white/20 px-4 py-2 text-sm text-gray-400">
            Available for Internship
          </span>
        </div>

        {/* Image */}
        <img
          src="/profile.png"
          alt="Farbud"
          className="w-52 md:w-80 md:h-80  object-cover rounded-full
          shadow-[0_0_50px_rgba(99,102,241,0.35)]
          transition-transform duration-500 hover:scale-105"
        />
      </div>
    </section>
  );
}
