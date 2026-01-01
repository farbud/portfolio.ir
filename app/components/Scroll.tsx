"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import HeroHeader from "./HeroHeader";
import AboutMe from "./AboutMe";
import SkillsSection from "./SkillSection";

export default function Page() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // هر سکشن 1/3 اسکرول
  const s1Opacity = useTransform(scrollYProgress, [0, 0.33], [1, 0]);
  const s2Opacity = useTransform(scrollYProgress, [0.33, 0.66], [0, 1]);

  return (
    <main ref={containerRef} className="relative h-[300vh] bg-black">
      {/* Section 1 */}
      <motion.section style={{ opacity: s1Opacity }} className="h-screen ">
        <HeroHeader />
      </motion.section>

      {/* Section 2 */}
      <motion.section
        style={{ opacity: s2Opacity }}
        className="h-screen sticky top-0"
      >
        <AboutMe />
      </motion.section>

      {/* Section 3 */}
      <motion.section className="h-screen ">
        <SkillsSection />
      </motion.section>
    </main>
  );
}
