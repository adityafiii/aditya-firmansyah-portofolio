// src/components/HeroSection.tsx
'use client'; // Pastikan ini adalah baris pertama di file ini

import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react'; // Tambahkan useRef dan useEffect
import { useInView } from '@/hooks/useInView'; // Import useInView hook untuk scroll reveal awal

export default function HeroSection() {
  // Hook untuk scroll reveal saat halaman dimuat/digulir
  const [ref, inView] = useInView({ threshold: 0.1 });

  // Kelas untuk animasi scroll reveal
  const animationClasses = 'opacity-0 transform transition-all duration-1000 ease-out';
  const animatedInClasses = 'opacity-100 translate-y-0 translate-x-0';
  const revealY = 'translate-y-20'; // Muncul dari bawah

  // Untuk animasi wave pada teks
  const textContent = "ADITYA FIRMANSYAH";
  const characters = textContent.split(''); // Pecah kalimat menjadi array huruf
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]); // Ref untuk setiap span huruf
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 }); // Posisi kursor

  // Callback untuk onMouseMove pada container teks
  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    // Memperbarui posisi kursor relatif terhadap viewport
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Callback untuk onMouseLeave dari container teks
  const handleMouseLeave = () => {
    // Reset posisi kursor untuk mengembalikan semua huruf ke skala normal
    setMousePosition({ x: -100, y: -100 });
  };

  // Fungsi untuk menghitung skala berdasarkan jarak dari kursor
  const getScale = (charIndex: number) => {
    const charElement = charRefs.current[charIndex];
    if (!charElement) return 1;

    // Mendapatkan posisi elemen huruf
    const rect = charElement.getBoundingClientRect();
    const charCenterX = rect.left + rect.width / 2;
    const charCenterY = rect.top + rect.height / 2;

    // Menghitung jarak Euclidean dari kursor ke tengah huruf
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - charCenterX, 2) +
      Math.pow(mousePosition.y - charCenterY, 2)
    );

    // Menentukan radius efek zoom (dalam piksel)
    const zoomRadius = 100; // Sesuaikan radius ini untuk efek yang lebih lebar/sempit
    // Menghitung skala: semakin dekat, semakin besar
    // max(1, ...) memastikan skala tidak kurang dari 1
    // (1 - distance / zoomRadius) membuat skala berkurang seiring jarak bertambah
    const scale = Math.max(1, 1.2 - (distance / zoomRadius)); // Maksimal 1.2 (20% zoom)
    return scale;
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center text-white bg-gray-950 p-8 pt-24 md:pt-16 overflow-hidden">
      {/* Background Effect (opsional) */}
      <div className="absolute inset-0 z-0 opacity-20">
        {/* Anda bisa menambahkan pola atau gradasi di sini jika ingin */}
      </div>

      {/* Konten Utama: Teks dan Foto */}
      <div className="relative z-10 container mx-auto flex flex-col items-center gap-12 max-w-4xl" ref={ref}> {/* Ref untuk scroll reveal */}
        {/* Teks "Dit tolongin dit" dengan animasi wave */}
        <div 
          className={`flex-1 max-w-2xl text-center ${animationClasses} ${inView ? animatedInClasses : revealY}`} 
          style={{ transitionDelay: '0.2s' }} // Delay untuk teks setelah HeroSection terlihat
        >
          {/* PERUBAHAN DI SINI: Menerapkan onMouseMove dan onMouseLeave */}
          <h1 
            className="text-6xl sm:text-7xl lg:text-8xl font-extrabold leading-tight mb-8 text-blue-400 animate-pulse-subtle"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ display: 'inline-block', whiteSpace: 'nowrap' }} // Penting untuk layout huruf
          >
            {characters.map((char, index) => (
              <span
                key={index} // Menggunakan index sebagai key karena huruf bisa duplikat
                ref={el => (charRefs.current[index] = el)} // Mengaitkan ref ke setiap span huruf
                className="inline-block transition-transform duration-100 ease-out" // Transisi untuk smooth scaling
                style={{ transform: `scale(${getScale(index)})` }} // Menerapkan skala dinamis
              >
                {char === ' ' ? '\u00A0' : char} {/* Mengganti spasi dengan non-breaking space */}
              </span>
            ))}
          </h1>
        </div>

        {/* Foto Profil */}
        <div 
          className={`flex justify-center mt-12 md:mt-16 ${animationClasses} ${inView ? animatedInClasses : revealY}`} 
          style={{ transitionDelay: '0.4s' }} // Delay untuk foto setelah teks muncul
        >
          {/* Menambahkan animate-pulse-subtle */}
          <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl ring-4 ring-blue-500 ring-offset-4 ring-offset-black animate-pulse-subtle">
            <Image
              src="/images/Adet.png" // Menggunakan Logoo.png sebagai foto profil untuk saat ini
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