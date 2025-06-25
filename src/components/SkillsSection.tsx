// src/components/SkillsSection.tsx
'use client'; // PENTING: Tambahkan directive ini karena menggunakan hook useState/useEffect

import React from 'react';
import { useInView } from '@/hooks/useInView'; // Import hook useInView

// Anda bisa membuat array objek untuk daftar skill agar lebih mudah dikelola
const skills = [
  { name: 'TypeScript', category: 'Bahasa Pemrograman' },
  { name: 'Next.js', category: 'Framework React' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Git & GitHub', category: 'Version Control' },
  { name: 'Web Design', category: 'Desain' },
  { name: 'UI/UX Principles', category: 'Desain' },
  { name: 'Figma', category: 'Tools Desain' },
  { name: 'Firebase', category: 'Database' },
  
  // Tambahkan skill Anda yang lain di sini
];

export default function SkillsSection() {
  // Menggunakan hook useInView untuk mendeteksi visibilitas
  // threshold: 0.1 berarti 10% dari elemen harus terlihat untuk memicu
  const [ref, inView] = useInView({ threshold: 0.1 });

  // Kelas animasi dasar yang akan ditambahkan secara kondisional
  const animationClasses = 'opacity-0 transform transition-all duration-1000 ease-out';
  // Kelas ketika elemen terlihat (mengaktifkan animasi)
  const animatedInClasses = 'opacity-100 translate-y-0';
  // Kelas untuk animasi teks/kartu agar muncul dari bawah
  const revealAnimation = 'translate-y-10'; // Awalnya 10px ke bawah

  // Pastikan 'return' dan '(' dan '<section>' berada di baris yang sama
  return (<section 
      id="skills" 
      ref={ref} // Attach ref ke elemen section
      className="py-20 px-8 bg-white text-white flex flex-col items-center overflow-hidden" // overflow-hidden untuk mencegah scrollbar saat animasi
    >
      <div className="container mx-auto text-center max-w-5xl">
        <h2 
          className={`text-6xl font-extrabold mb-12 text-black ${animationClasses} ${inView ? animatedInClasses : revealAnimation}`}
        >
          Keahlian Saya
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`
                bg-[#2d2926] p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 
                transition-all duration-300 ${animationClasses} ${inView ? animatedInClasses : revealAnimation}
              `}
              // Delay animasi berurutan untuk setiap kartu skill
              style={{ transitionDelay: `${0.1 * index}s` }} 
            >
              <h3 className="text-xl font-semibold md:text-3xl mb-2 text-white">{skill.name}</h3>
              <p className="text-gray-400 text-sm">{skill.category}</p>
              {/* Anda bisa menambahkan ikon di sini nanti jika ingin visual */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}