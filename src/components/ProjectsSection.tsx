'use client';

import React from 'react';
import ProjectCard from './ProjectCard';
import { projects } from '@/lib/data';
import Link from 'next/link';
import { useInView } from '@/hooks/useInView';

export default function ProjectsSection() {
  const [ref, inView] = useInView({ threshold: 0.1 });

  const animationClasses = 'opacity-0 transform transition-all duration-1000 ease-out';
  const animatedInClasses = 'opacity-100 translate-y-0';
  const revealAnimation = 'translate-y-10';

  // Responsive grid: center if 1 or 2 projects, normal grid if 3+
  let gridClass = "grid gap-10";
if (projects.length === 1) {
  gridClass += " justify-center grid-cols-1 max-w-xl mx-auto";
} else if (projects.length === 2) {
  gridClass += " justify-center grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto";
} else {
  gridClass += " grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
}

  return (
    <section
      id="projects"
      ref={ref}
      className="py-20 px-8 bg-yellow-50 text-white flex flex-col items-center overflow-hidden"
    >
      <div className="container mx-auto text-center">
        <h2
          className={`text-6xl font-extrabold mb-12 text-black ${animationClasses} ${inView ? animatedInClasses : revealAnimation}`}
        >
          Proyek Terbaik
        </h2>

        <div className={gridClass}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              className={`${animationClasses} ${inView ? animatedInClasses : revealAnimation}`}
              style={{ transitionDelay: `${0.1 * index}s` }}
            />
          ))}
        </div>

        <div
          className={`mt-16 ${animationClasses} ${inView ? animatedInClasses : revealAnimation}`}
          style={{ transitionDelay: `${0.1 * projects.length}s` }}
        >
          <Link
            href="/projects"
            className="bg-[#2d2926] hover:bg-orange-500 text-white md:text-2xl font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg transform hover:scale-105 inline-block"
          >
            Lihat Semua Proyek
          </Link>
        </div>
      </div>
    </section>
  );
}