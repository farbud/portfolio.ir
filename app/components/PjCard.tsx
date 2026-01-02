"use client";

import { motion } from "framer-motion";
import { Project } from "../data/data";
import VideoPreview from "./VideoPreview";
import Link from "next/link";

type Props = {
  project: Project;
  activeId: string | null;
  setActiveId: (id: string) => void;
};

export default function ProjectCard({ project, activeId, setActiveId }: Props) {
  const isActive = activeId === project.id;
  const isDimmed = activeId && !isActive;

  return (
    <motion.article
      animate={{
        scale: isActive ? 1.03 : 1,
        filter: isDimmed ? "blur(4px)" : "blur(0px)",
        opacity: isDimmed ? 0.4 : 1,
      }}
      transition={{ duration: 0.4 }}
      className="
        min-w-65 max-w-[320px]
        sm:min-w-0 sm:max-w-none
      
        rounded-2xl p-4
        transition-transform duration-300
        hover:scale-[1.03]
        snap-center
      "
    >
      <div className="aspect-4/3 overflow-hidden rounded-xl mb-3">
        <VideoPreview
          poster={project.image}
          video={project.video}
          isActive={isActive}
          onActivate={() => setActiveId(project.id)}
        />
      </div>

      <div className="flex flex-col text-center gap-2 p-3 text-white">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <div className="flex justify-center gap-4">
          <Link
            className="text-sm font-medium hover:text-blue-400"
            href={project.github}
            target="_blank"
          >
            Github
          </Link>
          <Link
            className="text-sm font-medium hover:text-blue-400"
            href={project.demo}
            target="_blank"
          >
            Demo
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
