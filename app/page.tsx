"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import HeroHeader from "./components/HeroHeader";
import AboutMe from "./components/AboutMe";
import SkillsSection from "./components/SkillSection";
import ProjectsSection from "./components/PJSection";

export default function Page() {
  const { scrollYProgress } = useScroll();

  // Fade بخش‌ها
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const aboutOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.35, 0.45],
    [0, 1, 0]
  );
  const skillsOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.66, 0.65],
    [0, 1, 0]
  );
  const projectsOpacity = useTransform(
    scrollYProgress,
    [0.6, 0.75, 1],
    [0, 1, 1]
  );

  return (
    <main className="bg-black text-white">
      {/* هر بخش sticky خودش */}
      <section className="relative h-screen">
        <motion.div
          className="sticky top-0 h-screen"
          style={{ opacity: heroOpacity }}
        >
          <HeroHeader />
        </motion.div>
      </section>

      <section className="relative h-screen">
        <motion.div
          className="sticky top-0 h-screen"
          style={{ opacity: aboutOpacity }}
        >
          <AboutMe />
        </motion.div>
      </section>

      <section className="relative h-screen">
        <motion.div
          className="sticky top-0 h-screen"
          style={{ opacity: skillsOpacity }}
        >
          <SkillsSection />
        </motion.div>
      </section>

      <section className="relative h-screen">
        <motion.div
          className="sticky top-0 h-screen"
          style={{ opacity: projectsOpacity }}
        >
          <ProjectsSection />
        </motion.div>
      </section>
    </main>
  );
}
