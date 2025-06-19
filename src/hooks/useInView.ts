// src/hooks/useInView.ts
import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook untuk mendeteksi apakah sebuah elemen sedang terlihat di viewport (Intersection Observer).
 *
 * @param options Opsi Intersection Observer (root, rootMargin, threshold).
 * @returns [ref, isIntersecting] - ref untuk diattach ke elemen, isIntersecting true jika elemen terlihat.
 */
// Membuat hook lebih generik untuk menerima tipe elemen HTML apa pun (misal: HTMLDivElement, HTMLElement)
export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null); // Ref untuk elemen yang akan diobservasi, bertipe T
  const [isIntersecting, setIsIntersecting] = useState(false); // State untuk menyimpan status terlihat atau tidak

  useEffect(() => {
    // Membuat salinan ref.current untuk digunakan dalam cleanup function.
    // Ini memperbaiki peringatan ESLint 'ref.current will likely have changed'.
    const currentElement = ref.current; 
    let observer: IntersectionObserver | null = null;

    if (currentElement) { // Gunakan salinan elemen di sini
      observer = new IntersectionObserver(([entry]) => {
        // Ketika elemen memasuki atau keluar dari viewport
        setIsIntersecting(entry.isIntersecting);
      }, options); // Menerapkan opsi yang diberikan
      observer.observe(currentElement); // Mulai observasi elemen
    }

    // Cleanup function: hentikan observasi saat komponen di-unmount atau dependensi berubah
    return () => {
      if (observer && currentElement) { // Pastikan observer dan elemen ada sebelum unobserve
        observer.unobserve(currentElement);
      }
    };
  }, [options]); // Dependensi: opsi observer

  return [ref, isIntersecting] as const; // Mengembalikan ref dan status
}