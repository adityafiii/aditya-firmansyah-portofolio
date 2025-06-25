// src/components/ProjectCard.tsx
import Image from 'next/image';
// Import Link dihapus karena tidak digunakan di sini
// import Link from 'next/link'; 
import { Project } from '@/lib/data'; // Import tipe Project
import React from 'react';

type ProjectCardProps = {
  project: Project;
  className?: string; // Tambahkan properti className opsional
  style?: React.CSSProperties; // Tambahkan properti style opsional
};

export default function ProjectCard({ project, className, style }: ProjectCardProps) {
  const formatImageUrl = (url: string) => {
    if (!url) return ''; // Mengatasi kasus URL kosong
    // Jika URL sudah dimulai dengan http://, https://, atau /, kembalikan apa adanya
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
      return url;
    }
    // Jika tidak, tambahkan '/images/' di depannya
    return `/images/${url}`;
  };

  // Variabel untuk URL gambar yang akan ditampilkan
  const displayedImageUrl = formatImageUrl(project.imageUrl);
  return (
    <div 
      className={`bg-black rounded-lg shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 group ${className || ''}`} 
      style={style} // Terapkan style yang diterima
    >
      {/* Gambar Proyek */}
      <div className="relative w-full h-52 sm:h-64 lg:h-72 overflow-hidden">
        {displayedImageUrl ? ( // Hanya render jika URL valid
          <Image
          src={displayedImageUrl} // Menggunakan URL yang sudah diformat
          alt={project.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-110"
          />
      ) : (
          // Tampilkan placeholder jika tidak ada gambar
          <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400 text-sm">
              Tidak Ada Gambar
          </div>
      )}
        <div className="absolute inset-0 bg-black/50 bg-opacity-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-black text-lg font-semibold px-4 py-2 bg-yellow-50 rounded-lg">
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
            <span key={index} className="bg-white text-black text-xs font-medium px-3 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>

        {/* Tombol Aksi (menggunakan a tag HTML biasa) */}
        <div className="flex flex-wrap gap-4 mt-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-yellow-50 hover:bg-orange-500 text-black font-semibold py-2 px-4 rounded-md transition-colors duration-300 text-center text-sm"
            >
              GitHub
            </a>
          )}
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border border-orange-500 text-white hover:text-black hover:bg-yellow-50 font-semibold py-2 px-4 rounded-md transition-all duration-300 text-center text-sm"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}