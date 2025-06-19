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

  const paragraph1 = `Halo! Saya ADIT, seorang **[Profesi Anda, misal: Pengembang Web Front-end]** yang berdedikasi dengan pengalaman dalam membangun aplikasi web yang modern dan efisien. Perjalanan saya di dunia teknologi dimulai sejak [tahun/usia Anda mulai tertarik], didorong oleh rasa ingin tahu yang tak ada habisnya tentang bagaimana teknologi dapat memecahkan masalah nyata dan menciptakan pengalaman pengguna yang luar biasa.`;
  const paragraph2 = `Saya memiliki keahlian mendalam dalam menggunakan teknologi seperti **React.js, Next.js, dan Tailwind CSS** untuk menciptakan antarmuka pengguna yang responsif, intuitif, dan menarik. Saya juga akrab dengan [sebutkan teknologi backend/database lain jika relevan, misal: Node.js, Express, MongoDB] yang memungkinkan saya untuk memahami dan berkontribusi pada seluruh stack pengembangan.`;
  const paragraph3 = `Saya percaya bahwa kunci dari sebuah proyek yang sukses adalah kombinasi dari kode yang bersih, desain yang baik, dan komunikasi yang efektif. Saya selalu siap untuk mempelajari hal baru dan menghadapi tantangan kompleks, dengan tujuan akhir menghasilkan solusi yang inovatif dan memberikan nilai nyata.`;

  // Pastikan 'return' dan '(' dan '<main>' berada di baris yang sama
  return (<main className="min-h-screen pt-16 bg-gray-900 text-white overflow-hidden"> {/* overflow-hidden di main */}
      {/* Bagian Hero untuk Halaman About */}
      <section 
        ref={heroRef} 
        className="py-20 bg-gray-950 text-center"
      >
        <div className="container mx-auto px-8">
          <h1 
            className={`text-5xl font-extrabold mb-4 text-blue-400 ${animationClasses} ${heroInView ? animatedInClasses : revealY}`}
            style={{ transitionDelay: '0s' }}
          >
            Tentang Saya
          </h1>
          <p 
            className={`text-xl text-gray-300 ${animationClasses} ${heroInView ? animatedInClasses : revealY}`}
            style={{ transitionDelay: '0.1s' }}
          >
            Mengenal Lebih Dekat Perjalanan dan Keahlian Saya
          </p>
        </div>
      </section>

      {/* Bagian Cerita/Narasi Utama */}
      <section 
        ref={storyRef}
        className="py-16 px-8 bg-gray-900"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Foto Profil */}
            <div className={`flex justify-center ${animationClasses} ${storyInView ? animatedInClasses : revealXLeft}`} style={{ transitionDelay: '0s' }}>
              <div className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl ring-4 ring-blue-500 ring-offset-4 ring-offset-black">
                <Image
                  src="/images/profile.jpg"
                  alt="Foto Profil ADIT"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </div>

            {/* Teks Cerita (tanpa animasi mengetik, kembali ke animasi reveal biasa) */}
            <div className={`text-lg leading-relaxed text-gray-300 ${animationClasses} ${storyInView ? animatedInClasses : revealXRight}`} style={{ transitionDelay: '0.1s' }}>
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
        className="py-16 px-8 bg-gray-800"
      >
        <div className="container mx-auto max-w-4xl">
          <h2 
            className={`text-4xl font-extrabold mb-10 text-blue-400 text-center ${animationClasses} ${experienceInView ? animatedInClasses : revealY}`}
            style={{ transitionDelay: '0s' }}
          >
            Pengalaman
          </h2>
          <div className="space-y-8">
            <div 
              className={`${animationClasses} ${experienceInView ? animatedInClasses : revealY}`} 
              style={{ transitionDelay: '0.1s' }}
            >
              <h3 className="text-2xl font-bold text-white">[Nama Jabatan/Posisi]</h3>
              <p className="text-blue-300 text-lg">[Nama Perusahaan/Organisasi] | [Kota, Negara] | [Tanggal Mulai] - [Tanggal Selesai]</p>
              <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                <li>Deskripsi tanggung jawab atau pencapaian utama 1.</li>
                <li>Deskripsi tanggung jawab atau pencapaian utama 2.</li>
              </ul>
            </div>
            <div 
              className={`${animationClasses} ${experienceInView ? animatedInClasses : revealY}`} 
              style={{ transitionDelay: '0.2s' }}
            >
              <h3 className="text-2xl font-bold text-white">[Nama Jabatan/Posisi]</h3>
              <p className="text-blue-300 text-lg">[Nama Perusahaan/Organisasi] | [Kota, Negara] | [Tanggal Mulai] - [Tanggal Selesai]</p>
              <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                <li>Deskripsi tanggung jawab atau pencapaian utama 1.</li>
                <li>Deskripsi tanggung jawab atau pencapaian utama 2.</li>
              </ul>
            </div>
            {/* Tambahkan lebih banyak pengalaman jika ada */}
          </div>
        </div>
      </section>

      {/* Bagian Pendidikan (Opsional) */}
      <section 
        ref={educationRef}
        className="py-16 px-8 bg-gray-900"
      >
        <div className="container mx-auto max-w-4xl">
          <h2 
            className={`text-4xl font-extrabold mb-10 text-blue-400 text-center ${animationClasses} ${educationInView ? animatedInClasses : revealY}`}
            style={{ transitionDelay: '0s' }}
          >
            Pendidikan
          </h2>
          <div className="space-y-8">
            <div 
              className={`${animationClasses} ${educationInView ? animatedInClasses : revealY}`} 
              style={{ transitionDelay: '0.1s' }}
            >
              <h3 className="text-2xl font-bold text-white">[Nama Gelar/Jurusan]</h3>
              <p className="text-blue-300 text-lg">[Nama Universitas/Institusi] | [Tahun Lulus]</p>
              <p className="text-gray-300 mt-2">Fokus pada [bidang studi terkait] dan proyek-proyek [sebutkan proyek terkait].</p>
            </div>
            {/* Tambahkan lebih banyak pendidikan jika ada */}
          </div>
        </div>
      </section>

      {/* Call to Action ke Halaman Kontak */}
      <section 
        ref={contactCTARef}
        className="py-16 px-8 bg-gray-800 text-center"
      >
        <div className="container mx-auto">
          <h2 
            className={`text-4xl font-bold mb-6 text-white ${animationClasses} ${contactCTAInView ? animatedInClasses : revealY}`}
            style={{ transitionDelay: '0s' }}
          >
            Tertarik untuk Bekerja Sama?
          </h2>
          <Link
            href="/contact"
            className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 inline-block ${animationClasses} ${contactCTAInView ? animatedInClasses : revealY}`}
            style={{ transitionDelay: '0.1s' }}
          >
            Hubungi Saya
          </Link>
        </div>
      </section>
    </main>
  );
}