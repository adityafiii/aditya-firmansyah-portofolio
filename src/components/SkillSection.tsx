// src/components/SkillsSection.tsx
import React from 'react';

// Anda bisa membuat array objek untuk daftar skill agar lebih mudah dikelola
const skills = [
  { name: 'JavaScript (ES6+)', category: 'Bahasa Pemrograman' },
  { name: 'TypeScript', category: 'Bahasa Pemrograman' },
  { name: 'React.js', category: 'Framework Frontend' },
  { name: 'Next.js', category: 'Framework React' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Node.js', category: 'Backend Runtime' },
  { name: 'Express.js', category: 'Framework Backend' },
  { name: 'MongoDB', category: 'Database (NoSQL)' },
  { name: 'PostgreSQL', category: 'Database (SQL)' },
  { name: 'Git & GitHub', category: 'Version Control' },
  { name: 'RESTful APIs', category: 'Konsep' },
  { name: 'Responsif Design', category: 'Konsep' },
  { name: 'UI/UX Principles', category: 'Desain' },
  // Tambahkan skill Anda yang lain di sini
  // Contoh: { name: 'Figma', category: 'Tools Desain' },
  // Contoh: { name: 'Python', category: 'Bahasa Pemrograman' },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-8 bg-gray-900 text-white flex flex-col items-center">
      <div className="container mx-auto text-center max-w-5xl">
        <h2 className="text-4xl font-extrabold mb-12 text-blue-400 animate-fade-in-up">
          Keahlian Saya
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-fade-in-up"
              // Efek animasi berurutan: setiap kartu muncul dengan sedikit penundaan
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <h3 className="text-xl font-semibold mb-2 text-white">{skill.name}</h3>
              <p className="text-gray-400 text-sm">{skill.category}</p>
              {/* Anda bisa menambahkan ikon di sini nanti jika ingin visual */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}