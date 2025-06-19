// src/components/HeroSection.tsx
'use client'; // Pastikan ini adalah baris pertama di file ini

import Image from 'next/image';
import React, { useState, useRef, } from 'react'; // Tambahkan useRef dan useEffect
import { useInView } from '@/hooks/useInView'; // Import useInView hook untuk scroll reveal awal

export default function HeroSection() {
  // Hook untuk scroll reveal saat halaman dimuat/digulir
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  // Kelas untuk animasi scroll reveal
  const animationClasses = 'opacity-0 transform transition-all duration-1000 ease-out';
  const animatedInClasses = 'opacity-100 translate-y-0 translate-x-0';
  const revealY = 'translate-y-20'; // Muncul dari bawah

  // Untuk animasi wave pada teks
  const textContent = "ADITYA FIRMANSYAH";
  const characters = textContent.split(''); // Pecah kalimat menjadi array huruf

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center text-white bg-gray-950 p-8 pt-24 md:pt-16 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20"></div>

      {/* Konten Utama: Teks dan Foto */}
      {/* ref sekarang sudah benar tipenya */}
      <div className="relative z-10 container mx-auto flex flex-col items-center gap-12 max-w-4xl" ref={ref}>
        <div 
          className={`flex-1 max-w-2xl text-center ${animationClasses} ${inView ? animatedInClasses : revealY}`} 
          style={{ transitionDelay: '0.2s' }}
        >
          <h1 
            className="text-6xl sm:text-7xl lg:text-8xl font-extrabold leading-tight mb-8 text-blue-400"
            style={{ whiteSpace: 'nowrap' }} // Tambahkan kembali white-space: nowrap untuk animasi gelombang
          >
            {characters.map((char, index) => (
              <span
                key={index}
                className="inline-block animate-wave-text" 
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
        </div>

        <div 
          className={`flex justify-center mt-12 md:mt-16 ${animationClasses} ${inView ? animatedInClasses : revealY}`} 
          style={{ transitionDelay: '0.4s' }}
        >
          <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl ring-4 ring-blue-500 ring-offset-4 ring-offset-black animate-pulse-subtle">
            <Image
              src="/images/Logoo.png"
              alt="Foto Profil ADIT"
              width={500}
              height={500}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}