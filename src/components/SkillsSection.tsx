'use client';

import React, { useState } from 'react';
import { useInView } from '@/hooks/useInView';

const skills = [
  { 
    name: 'Web Development', 
    category: 'Web Development',
    description: 'Web development adalah proses membangun dan memelihara situs web atau aplikasi web. Ini mencakup semua hal yang terlibat dalam membuat sebuah situs agar terlihat menarik, berfungsi dengan baik, dan bisa diakses oleh pengguna di internet.'
  },
  { 
    name: 'Fotografi', 
    category: 'Visual Art',
    description: 'Fotografi adalah seni menangkap gambar menggunakan cahaya. Ini melibatkan kombinasi pengaturan kamera agar mendapatkan jenis foto yang di inginkan.'
  },
  { 
    name: 'Basket', 
    category: 'Sport',
    description: 'Bola basket adalah olahraga tim yang dimainkan oleh dua tim.. Tujuan utamanya adalah mencetak poin dengan cara melemparkan bola melalui ring lawan, sambil mencegah tim lawan melakukan hal yang sama. Ini adalah olahraga yang sangat dinamis, membutuhkan kombinasi kecepatan, kelincahan, koordinasi mata-tangan, dan strategi tim.'
  },
  { 
    name: 'Guitar', 
    category: 'Music',
    description: 'Gitar adalah alat musik berdawai yang dimainkan dengan cara dipetik, baik menggunakan jari maupun alat bantu bernama plektrum (pick). Skill saya di gitar bisa dibilang advanced karena saya bisa memainkan gitar pada tingkat fingerstyle.'
  },
  ];

export default function SkillsSection() {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const animationClasses = 'opacity-0 transform transition-all duration-1000 ease-out';
  const animatedInClasses = 'opacity-100 translate-y-0';
  const revealAnimation = 'translate-y-10';

  // Untuk menutup popup jika klik di luar modal
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (selectedIndex !== null) {
        const modal = document.getElementById('skill-modal');
        if (modal && !modal.contains(e.target as Node)) {
          setSelectedIndex(null);
        }
      }
    }
    if (selectedIndex !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedIndex]);

  return (
    <section 
      id="skills" 
      ref={ref}
      className="py-20 px-8 bg-white text-white flex flex-col items-center overflow-hidden"
    >
      <div className="container mx-auto text-center max-w-5xl">
        <h2 
          className={`text-6xl font-extrabold mb-12 text-black ${animationClasses} ${inView ? animatedInClasses : revealAnimation}`}
        >
          Keahlian Saya
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <button
              key={skill.name}
              type="button"
              className={`
                relative bg-[#2d2926] p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105
                transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500
                ${animationClasses} ${inView ? animatedInClasses : revealAnimation}
              `}
              style={{ transitionDelay: `${0.1 * index}s` }}
              onClick={() => setSelectedIndex(index)}
            >
              <h3 className="text-xl font-semibold md:text-3xl mb-2 text-white">{skill.name}</h3>
              <p className="text-gray-400 text-sm">{skill.category}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div
            id="skill-modal"
            className="bg-yellow-50 text-black rounded-xl shadow-2xl p-8 max-w-xs w-full relative animate-fade-in"
          >
            <h3 className="text-3xl font-bold mb-2">{skills[selectedIndex].name}</h3>
            <p className="text-black text-xl mb-6">{skills[selectedIndex].description}</p>
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl font-bold"
              onClick={() => setSelectedIndex(null)}
              aria-label="Tutup"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}