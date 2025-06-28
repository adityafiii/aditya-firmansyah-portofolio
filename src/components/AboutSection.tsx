// src/components/AboutSection.tsx
'use client'; // PENTING: Tambahkan directive ini karena menggunakan hook useState/useEffect

import React from 'react';
import Link from 'next/link';
import { useInView } from '@/hooks/useInView'; // Import hook useInView

export default function AboutSection() {
  // Menggunakan hook useInView untuk mendeteksi visibilitas
  // threshold: 0.1 berarti 10% dari elemen harus terlihat untuk memicu
  const [ref, inView] = useInView({ threshold: 0.1 });

  // Kelas animasi dasar yang akan ditambahkan secara kondisional
  const animationClasses = 'opacity-0 transform transition-all duration-1000 ease-out';
  // Kelas ketika elemen terlihat (mengaktifkan animasi)
  const animatedInClasses = 'opacity-100 translate-y-0';
  // Kelas untuk animasi teks agar muncul dari bawah
  const textAnimation = 'translate-y-10';

  return (
    <section 
      id="about" 
      ref={ref} // Attach ref ke elemen section
      className="py-20 px-8 bg-yellow-50 text-black flex flex-col items-center overflow-hidden" // overflow-hidden untuk mencegah scrollbar saat animasi
    >
      <div className="container mx-auto text-center max-w-4xl">
        <p 
          className={`text-lg md:text-3xl leading-relaxed mb-6 ${animationClasses} ${inView ? animatedInClasses : textAnimation}`} 
          style={{ transitionDelay: '0.1s' }} // Delay tambahan untuk p pertama
        >
          Seorang mahasiswa jurusan Teknik Informatika, yang memiliki kemampuan cukup untuk membangun website yang responsif, interaktif, dan intuitif. Saya memiliki skill yang memadai untuk mengubah ide menjadi solusi digital yang estetis.
          {/* Saya seorang **[Profesi Anda, misalnya: Pengembang Web Front-end]** dengan pengalaman dalam membangun aplikasi web yang responsif, intuitif, dan performa tinggi. Saya memiliki passion dalam mengubah ide menjadi solusi digital yang fungsional dan estetis. */}
        </p>
        {/* Tombol ke halaman About yang lebih detail */}
        <Link 
          href="/about" 
          className={`bg-[#2d2926] hover:bg-orange-500 md:text-2xl text-white font-semibold py-4 px-10 rounded-full shadow-md transform hover:scale-105 inline-block ${animationClasses} ${inView ? animatedInClasses : textAnimation}`}
          style={{ transitionDelay: '0.3s' }} // Delay tambahan untuk tombol
        >
          Lihat selengkapnya tentang saya!
        </Link>
      </div>
    </section>
  );
}