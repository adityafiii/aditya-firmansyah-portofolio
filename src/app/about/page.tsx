// src/app/about/page.tsx
'use client'; // PENTING: Directive ini diperlukan karena menggunakan hook React
import Link from 'next/link';
import Image from 'next/image'; // Import Image dari next/image untuk optimasi gambar
import { useInView } from '@/hooks/useInView'; // Import hook useInView

export default function AboutPage() {
  // Kelas animasi dasar untuk semua bagian
  const animationClasses = 'opacity-0 transform transition-all duration-1500 ease-out'; // Durasi lebih panjang (1.5 detik)
  const animatedInClasses = 'opacity-100 translate-y-0 translate-x-0'; // Kondisi akhir animasi
  const revealY = 'translate-y-20'; // Mulai dari 20px di bawah
  const revealXLeft = '-translate-x-20'; // Mulai dari 20px di kiri
  const revealXRight = 'translate-x-20'; // Mulai dari 20px di kanan

  // Hooks untuk setiap section. Memberitahu TypeScript bahwa ref ini akan ke HTMLElement.
  const [heroRef, heroInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const [storyRef, storyInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const [experienceRef, experienceInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const [educationRef, educationInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const [contactCTARef, contactCTAInView] = useInView<HTMLElement>({ threshold: 0.1 });

  // Fungsi untuk mendapatkan durasi animasi mengetik (Jika ingin digunakan lagi, pastikan keyframes di tailwind.config.ts ada)
  // const getTypingAnimation = (textLength: number, delay: number) => {
  //   const duration = Math.max(textLength * 0.05, 1.5);
  //   const steps = textLength;
  //   return `typing ${duration}s steps(${steps}, end) forwards, blink-caret .75s step-end infinite ${delay}s`;
  // };

  const paragraph1 = `Halo! Saya ADITYA, Seorang Mahasiswa yang berdedikasi dengan pengalaman dalam membangun aplikasi web yang modern dan efisien. Perjalanan saya di dunia teknologi dimulai sejak 2025, didorong oleh rasa ingin tahu yang tak ada habisnya tentang bagaimana teknologi dapat memecahkan masalah nyata dan menciptakan pengalaman pengguna yang luar biasa.`;
  const paragraph2 = `Saya memiliki keahlian mendalam dalam menggunakan teknologi seperti React.js, Next.js, dan Tailwind CSS untuk menciptakan antarmuka pengguna yang responsif, intuitif, dan menarik. Saya juga akrab dengan Firebase, Github, Figma, dll yang memungkinkan saya untuk dapat lebih mudah membangun sebuah website yang terstruktur.`;
  const paragraph3 = `Saya percaya bahwa kunci dari sebuah proyek yang sukses adalah kombinasi dari kode yang bersih, desain yang baik, dan komunikasi yang efektif. Saya selalu siap untuk mempelajari hal baru dan menghadapi tantangan kompleks, dengan tujuan akhir menghasilkan solusi yang inovatif dan memberikan nilai nyata.`;

  // Pastikan 'return' dan '(' dan '<main>' berada di baris yang sama
  return (<main className="min-h-screen pt-16 bg-yellow-50 text-white overflow-hidden"> {/* overflow-hidden di main */}
      {/* Bagian Hero untuk Halaman About */}
      <section 
        ref={heroRef} 
        className="py-20 bg-yellow-50 text-center"
      >
        <div className="container mx-auto px-8">
          <h1 
            className={`text-5xl font-extrabold mb-4 text-black ${animationClasses} ${heroInView ? animatedInClasses : revealY}`}
            style={{ transitionDelay: '0s' }}
          >
            Tentang Saya
          </h1>
          <p 
            className={`text-xl text-black ${animationClasses} ${heroInView ? animatedInClasses : revealY}`}
            style={{ transitionDelay: '0.1s' }}
          >
            Mengenal Lebih Detail Tentang Diri Saya
          </p>
          <a
            href="/articles"
            className={`inline-block mt-6 bg-[#2d2926] hover:bg-orange-500 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-all duration-300 text-lg ${animationClasses} ${heroInView ? animatedInClasses : revealY}`}
            style={{ transitionDelay: '0.1s' }}
          >
            Artikel Saya
          </a>
        </div>
      </section>

      {/* Bagian Cerita/Narasi Utama */}
      <section 
        ref={storyRef}
        className="py-16 px-8 bg-white"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Foto Profil */}
            <div className={`flex justify-center ${animationClasses} ${storyInView ? animatedInClasses : revealXLeft}`} style={{ transitionDelay: '0s' }}>
              <div className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl ring-4 ring-black ring-offset-4 ring-offset-black">
                <Image
                  src="/images/Adet.jpg"
                  alt="Foto Profil ADIT"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </div>

            {/* Teks Cerita (tanpa animasi mengetik, kembali ke animasi reveal biasa) */}
            <div className={`text-lg leading-relaxed text-black ${animationClasses} ${storyInView ? animatedInClasses : revealXRight}`} style={{ transitionDelay: '0.1s' }}>
              <p className="mb-6">
                {/* Hapus span dan style animasi mengetik jika tidak dipakai */}
                {paragraph1}
              </p>
              <p className="mb-6" style={{ transitionDelay: '0.2s' }}>
                {paragraph2}
              </p>
              <p style={{ transitionDelay: '0.3s' }}>
                {paragraph3}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bagian Pengalaman (Opsional) */}
      <section 
        ref={experienceRef}
        className="py-16 px-8 bg-yellow-50"
      >
        <div className="container mx-auto max-w-4xl">
          <h2 
            className={`text-6xl font-extrabold mb-10 text-black text-center ${animationClasses} ${experienceInView ? animatedInClasses : revealY}`}
            style={{ transitionDelay: '0s' }}
          >
            Pengalaman
          </h2>
          <div className="space-y-8 text-center">
            <div 
              className={`${animationClasses} ${experienceInView ? animatedInClasses : revealY}`} 
              style={{ transitionDelay: '0.1s' }}
            >
              <h3 className="text-2xl font-bold text-black">Magang</h3>
              <p className="text-black text-lg">PT. Telkom Indonesia | Tanjungpinang, Indonesia</p>
              <ul className="list-disc list-inside text-black mt-2 space-y-1 inline-block text-left">
                <li>Berfokus Untuk Melakukan Pemasangan dan Konfigurasi Jaringan Wireless</li>
              </ul>
            </div>
            {/* Tambahkan lebih banyak pengalaman jika ada */}
          </div>
        </div>
      </section>

      {/* Bagian Pendidikan (Opsional) */}
      <section 
        ref={educationRef}
        className="py-16 px-8 bg-white"
      >
        <div className="container mx-auto max-w-4xl">
          <h2 
            className={`text-6xl font-extrabold mb-10 text-black text-center ${animationClasses} ${educationInView ? animatedInClasses : revealY}`}
            style={{ transitionDelay: '0s' }}
          >
            Pendidikan Terakhir
          </h2>
          <div className="space-y-8 text-center">
            <div 
              className={`${animationClasses} ${educationInView ? animatedInClasses : revealY}`} 
              style={{ transitionDelay: '0.1s' }}
            >
              <h3 className="text-2xl font-bold text-black">Teknik Komputer dan Jaringan (TKJ)</h3>
              <p className="text-black text-lg">SMK Negeri 4 Tanjungpinang | 2019 - 2022</p>
            </div>
            {/* Tambahkan lebih banyak pendidikan jika ada */}
          </div>
        </div>
      </section>

      {/* Call to Action ke Halaman Kontak */}
      <section 
        ref={contactCTARef}
        className="py-16 px-8 bg-yellow-50 text-center"
      >
        <div className="container mx-auto">
          <h2 
            className={`text-4xl font-bold mb-6 text-black ${animationClasses} ${contactCTAInView ? animatedInClasses : revealY}`}
            style={{ transitionDelay: '0s' }}
          >
            Tertarik untuk Bekerja Sama?
          </h2>
          <Link
            href="/contact"
            className={`bg-[#2d2926] hover:bg-orange-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 inline-block ${animationClasses} ${contactCTAInView ? animatedInClasses : revealY}`}
            style={{ transitionDelay: '0.1s' }}
          >
            Hubungi Saya
          </Link>
        </div>
      </section>
    </main>
  );
}