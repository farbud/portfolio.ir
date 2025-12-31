/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { motion } from "framer-motion";
import Starfield from "./Starfield";
import { useEffect, useRef, useState } from "react";

const skills = [
  { name: "JavaScript", glow: "from-cyan-400 to-yellow-500" },
  { name: "React", glow: "from-cyan-400 to-blue-500" },
  { name: "Next.js", glow: "from-purple-400 to-indigo-500" },
  { name: "TypeScript", glow: "from-blue-400 to-sky-500" },
  { name: "Tailwind CSS", glow: "from-teal-400 to-gray-800" },
  { name: "UI Motion", glow: "from-pink-400 to-rose-500" },
  { name: "Performance", glow: "from-yellow-400 to-orange-500" },
];

interface DeviceOrientationEventWithPermission extends DeviceOrientationEvent {
  requestPermission?: () => Promise<PermissionState>;
}

const roles = [
  "Front-End Intern",
  "React / Next.js Developer",
  "UI & Animation Lover",
];

export default function SkillSection() {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const startY = useRef<number | null>(null);

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
      onTouchStart={(e) => (startY.current = e.touches[0].clientY)}
      onTouchEnd={(e) => {
        if (startY.current === null) return;
        const diff = startY.current - e.changedTouches[0].clientY;
        if (diff > 60) setExpanded(true); // Swipe Up باز کردن
        if (diff < -60) setExpanded(false); // Swipe Down بستن
      }}
      className="relative h-screen overflow-hidden w-full  rounded-3xl
           bg-black/60 backdrop-blur-2xl
          text-white transition-all duration-700 
          "
    >
      {/* background glow */}
      <Starfield active={expanded} />
      <div className="max-w-5xl mx-auto">
        {/* title */}

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-3xl md:text-4xl font-bold mb-16"
        >
          My <span className="text-purple-400">Skills</span>
        </motion.h2>

        {/* grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.08, rotateX: 6, rotateY: -6 }}
              className="relative group perspective"
            >
              {/* glow */}
              <div
                className={`
                  absolute -inset-1 rounded-2xl blur opacity-40
                  bg-linear-to-br ${skill.glow}
                  group-hover:opacity-80 transition
                `}
              />

              {/* card */}
              <div className="relative rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 py-10 text-center font-medium">
                {skill.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
