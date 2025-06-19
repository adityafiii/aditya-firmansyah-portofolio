// src/components/ProjectCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/data'; // Import tipe Project
import React from 'react'; // Import React jika belum ada

type ProjectCardProps = {
  project: Project;
  className?: string; // Tambahkan properti className opsional
  style?: React.CSSProperties; // Tambahkan properti style opsional
};

export default function ProjectCard({ project, className, style }: ProjectCardProps) {
  return (
    <div 
      className={`bg-gray-800 rounded-lg shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 group ${className || ''}`} 
      style={style} // Terapkan style yang diterima
    >
      {/* Gambar Proyek */}
      <div className="relative w-full h-52 sm:h-64 lg:h-72 overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-lg font-semibold px-4 py-2 bg-blue-600 rounded-lg">
            Lihat Detail
          </p>
        </div>
      </div>

      {/* Konten Detail Proyek */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-300 text-base mb-4 line-clamp-2">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span key={index} className="bg-gray-700 text-blue-300 text-xs font-medium px-3 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>

        {/* Tombol Aksi */}
        <div className="flex flex-wrap gap-4 mt-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 text-center text-sm"
            >
              GitHub
            </a>
          )}
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 text-center text-sm"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}