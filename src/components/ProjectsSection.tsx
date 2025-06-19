// src/components/ProjectsSection.tsx
'use client'; // PENTING: Tambahkan directive ini karena menggunakan hook useState/useEffect

import React from 'react';
import ProjectCard from './ProjectCard'; // Import ProjectCard
import { featuredProjects } from '@/lib/data'; // Import data proyek
import Link from 'next/link';
import { useInView } from '@/hooks/useInView'; // Import hook useInView

export default function ProjectsSection() {
  // Menggunakan hook useInView untuk mendeteksi visibilitas
  const [ref, inView] = useInView({ threshold: 0.1 }); // Dimulai saat 10% elemen terlihat

  // Kelas animasi dasar yang akan ditambahkan secara kondisional
  const animationClasses = 'opacity-0 transform transition-all duration-1000 ease-out';
  // Kelas ketika elemen terlihat (mengaktifkan animasi)
  const animatedInClasses = 'opacity-100 translate-y-0';
  // Kelas untuk animasi agar muncul dari bawah
  const revealAnimation = 'translate-y-10'; // Awalnya 10px ke bawah

  // Pastikan 'return' dan '(' dan '<section>' berada di baris yang sama
  return (<section
      id="projects"
      ref={ref} // Attach ref ke elemen section
      className="py-20 px-8 bg-gray-800 text-white flex flex-col items-center overflow-hidden" // overflow-hidden untuk mencegah scrollbar saat animasi
    >
      <div className="container mx-auto text-center">
        <h2
          className={`text-4xl font-extrabold mb-12 text-blue-400 ${animationClasses} ${inView ? animatedInClasses : revealAnimation}`}
        >
          Proyek Unggulan (Sedang dalam Proses pengembangan)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              // Terapkan animasi kondisional ke setiap ProjectCard
              className={`${animationClasses} ${inView ? animatedInClasses : revealAnimation}`}
              style={{ transitionDelay: `${0.1 * index}s` }} // Delay berurutan untuk setiap kartu
            />
          ))}
        </div>

        {/* Tombol Lihat Semua Proyek (opsional, jika ada halaman proyek terpisah) */}
        <div className={`mt-16 ${animationClasses} ${inView ? animatedInClasses : revealAnimation}`} style={{ transitionDelay: `${0.1 * featuredProjects.length}s` }}>
          <Link href="/projects" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg transform hover:scale-105 inline-block">
            Lihat Semua Proyek
          </Link>
        </div>
      </div>
    </section>
  );
}