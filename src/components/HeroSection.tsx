'use client';

import Image from 'next/image';
import React from 'react';
import { useInView } from '@/hooks/useInView';
import AboutSection from './AboutSection'; // pastikan file ini ada

export default function HeroSection() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const animationClasses = 'opacity-0 transform transition-all duration-1000 ease-out';
  const animatedInClasses = 'opacity-100 translate-y-0 translate-x-0';
  const revealY = 'translate-y-20';

  const baseText = "ADITYA FIRMANSYAH";
  const textContent = `${baseText} • ${baseText} • ${baseText} • ${baseText} • ${baseText} • ${baseText} •`;

  // Ukuran lingkaran dan font untuk teks melingkar
  const textCircleRadius = 2000;
  const svgViewBoxSize = textCircleRadius * 2 + 20;
  const svgCenter = svgViewBoxSize / 2;

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center text-white bg-yellow-50 p-8 pt-24 md:pt-16 overflow-hidden">
      <div
        className="relative z-10 container mx-auto flex flex-col md:flex-row items-center gap-12 max-w-6xl"
        ref={ref}
      >
        {/* Kiri: Foto & SVG */}
        <div
          className={`relative flex items-center justify-center w-full md:w-1/2 ${animationClasses} ${inView ? animatedInClasses : revealY}`}
          style={{
            transitionDelay: '0.2s',
            width: 'min(90vw, 560px)',
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
                fontSize: '250px',
                textTransform: 'uppercase',
                letterSpacing: '6px',
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

        {/* Kanan: AboutSection */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <AboutSection />
        </div>
      </div>
    </section>
  );
}