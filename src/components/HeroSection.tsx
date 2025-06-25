'use client';

import Image from 'next/image';
import React from 'react';
import { useInView } from '@/hooks/useInView';

export default function HeroSection() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const animationClasses = 'opacity-0 transform transition-all duration-1000 ease-out';
  const animatedInClasses = 'opacity-100 translate-y-0 translate-x-0';
  const revealY = 'translate-y-20';

  const baseText = "ADITYA FIRMANSYAH";
  const textContent = `${baseText} • ${baseText} • ${baseText} • ${baseText} • ${baseText} •`;

  // Ukuran lingkaran dan font untuk teks melingkar
const textCircleRadius = 1300; // Lingkaran teks lebih besar dari foto profil
const svgViewBoxSize = textCircleRadius * 2 + 20;
const svgCenter = svgViewBoxSize / 2;

  return (
  <section className="relative flex flex-col items-center justify-center min-h-screen text-center text-white bg-white p-8 pt-24 md:pt-16 overflow-hidden">
    {/* ... */}
    <div className="relative z-10 container mx-auto flex flex-col items-center gap-6 max-w-4xl" ref={ref}>
      <div
        className={`relative flex items-center justify-center ${animationClasses} ${inView ? animatedInClasses : revealY}`}
        style={{
          transitionDelay: '0.2s',
          width: 'min(90vw, 560px)', // Lebih besar dari foto profil
          height: 'min(90vw, 560px)'
        }}
      >
        {/* SVG untuk Teks Melingkar */}
        <svg
          className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
          viewBox={`0 0 ${svgViewBoxSize} ${svgViewBoxSize}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <path
              id="circlePath"
              d={`M ${svgCenter - textCircleRadius},${svgCenter} 
                  a ${textCircleRadius},${textCircleRadius} 0 1,0 ${textCircleRadius * 2},0 
                  a ${textCircleRadius},${textCircleRadius} 0 1,0 -${textCircleRadius * 2},0`}
              fill="none"
            />
          </defs>
          <text
            fill="currentColor"
            className="text-black font-extrabold"
            style={{
              fontSize: '204px', // Sesuaikan agar proporsional
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            <textPath href="#circlePath" startOffset="0%" textAnchor="start">
              {textContent}
            </textPath>
          </text>
        </svg>

        {/* Foto Profil */}
        <div className="relative z-0 w-64 h-64 sm:w-120 sm:h-120 rounded-full overflow-hidden shadow-2xl ring-4 ring-black ring-offset-black animate-pulse-subtle">
          <Image
            src="/images/Adet.png"
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