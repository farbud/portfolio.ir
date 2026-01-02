/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { projects, Project } from "../data/data";
import ProjectCard from "./PjCard";
import { Footer } from "./Footer";
import Starfield from "./Starfield";

export default function ProjectsSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Starfield active={expanded} />
      <section className="w-full py-12 px-4 sm:px-6 lg:px-12 ">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">
          My Projects
        </h2>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4">
          {projects.map((project: Project) => (
            <div
              key={project.id}
              className="snap-center shrink-0 w-65 sm:w-75 md:w-[320px]"
            >
              <ProjectCard
                project={project}
                activeId={activeId}
                setActiveId={setActiveId}
              />
            </div>
          ))}
        </div>

        {/* Optional: Mobile hint */}
        <p className="mt-4 text-center text-sm text-gray-400">
          Swipe left/right to view more projects
        </p>
      </section>
      <Footer />
    </>
  );
}
