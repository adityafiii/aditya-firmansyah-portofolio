// src/components/HeroSection.tsx
'use client'; // Pastikan ini adalah baris pertama di file ini

import Image from 'next/image';
import React from 'react'; // Hanya perlu 'React' karena tidak ada hook state/ref langsung di sini
import { useInView } from '@/hooks/useInView'; // Import useInView hook untuk scroll reveal awal

export default function HeroSection() {
  // Hook untuk scroll reveal saat halaman dimuat/digulir
  // Memberitahu TypeScript bahwa ref ini akan di-attach ke HTMLDivElement
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 }); 

  // Kelas untuk animasi scroll reveal
  const animationClasses = 'opacity-0 transform transition-all duration-1000 ease-out';
  const animatedInClasses = 'opacity-100 translate-y-0 translate-x-0';
  const revealY = 'translate-y-20'; // Muncul dari 20px di bawah

  // Untuk animasi wave pada teks
  const textContent = "ADITYA FIRMANSYAH";
  const characters = textContent.split('');

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center text-white bg-gray-950 p-8 pt-24 md:pt-16 overflow-hidden">
      {/* Background Effect (opsional) */}
      <div className="absolute inset-0 z-0 opacity-20">
        {/* Anda bisa menambahkan pola atau gradasi di sini jika ingin */}
      </div>

      {/* Konten Utama: Teks dan Foto */}
      <div className="relative z-10 container mx-auto flex flex-col items-center gap-12 max-w-4xl" ref={ref}> {/* Ref untuk scroll reveal */}
        {/* Teks "ADITYA FIRMANSYAH" dengan animasi gelombang terus-menerus */}
        <div 
          className={`flex-1 max-w-2xl text-center ${animationClasses} ${inView ? animatedInClasses : revealY}`} 
          style={{ transitionDelay: '0.2s' }} // Delay untuk teks setelah HeroSection terlihat
        >
          <h1 
            className="text-6xl sm:text-7xl lg:text-8xl font-extrabold leading-tight mb-8 text-blue-400"
            style={{ whiteSpace: 'nowrap' }} // Penting untuk mencegah teks pecah baris saat animasi gelombang
          >
            {characters.map((char, index) => (
              <span
                key={index} // Menggunakan index sebagai key karena ini animasi continuous
                className="inline-block animate-wave-text" // Terapkan animasi gelombang
                style={{ animationDelay: `${index * 0.05}s` }} // Delay untuk efek gelombang berurutan
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
          {/* Menerapkan animasi pulse yang halus pada foto */}
          <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl ring-4 ring-blue-500 ring-offset-4 ring-offset-black animate-pulse-subtle">
            <Image
              src="/images/Logoo.png" // Path ke file logo Anda, digunakan sebagai foto profil
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