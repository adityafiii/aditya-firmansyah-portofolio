// src/hooks/useInView.ts
import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook untuk mendeteksi apakah sebuah elemen sedang terlihat di viewport (Intersection Observer).
 *
 * @param options Opsi Intersection Observer (root, rootMargin, threshold).
 * @returns [ref, isIntersecting] - ref untuk diattach ke elemen, isIntersecting true jika elemen terlihat.
 */
// PERUBAHAN DI SINI: Membuat hook lebih generik dengan <T extends HTMLElement>
export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null); // Ref untuk elemen yang akan diobservasi, sekarang bertipe T
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    // Pastikan observer hanya dibuat sekali
    let observer: IntersectionObserver | null = null;

    if (ref.current) {
      observer = new IntersectionObserver(([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      }, options);
      observer.observe(ref.current);
    }

    return () => {
      if (observer && ref.current) { // Pastikan observer ada sebelum unobserve
        observer.unobserve(ref.current);
      }
    };
  }, [options]); // Dependensi: opsi observer

  return [ref, isIntersecting] as const;
}