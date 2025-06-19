// src/hooks/useInView.ts
import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook untuk mendeteksi apakah sebuah elemen sedang terlihat di viewport (Intersection Observer).
 *
 * @param options Opsi Intersection Observer (root, rootMargin, threshold).
 * @returns [ref, isIntersecting] - ref untuk diattach ke elemen, isIntersecting true jika elemen terlihat.
 */
export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement>(null); // Ref untuk elemen yang akan diobservasi
  const [isIntersecting, setIsIntersecting] = useState(false); // State untuk menyimpan status terlihat atau tidak

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Ketika elemen memasuki atau keluar dari viewport
      setIsIntersecting(entry.isIntersecting);
    }, options); // Menerapkan opsi yang diberikan

    if (ref.current) {
      // Mulai observasi elemen
      observer.observe(ref.current);
    }

    // Cleanup function: hentikan observasi saat komponen di-unmount
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]); // Dependensi: opsi observer

  return [ref, isIntersecting] as const; // Mengembalikan ref dan status
}