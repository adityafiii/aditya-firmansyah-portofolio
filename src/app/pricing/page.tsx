// src/app/pricing/page.tsx
'use client'; // PENTING: Tambahkan directive ini karena menggunakan hook React
import Link from 'next/link';
import { useInView } from '@/hooks/useInView'; // Import hook useInView

export default function PricingPage() {
  const pricingPlans = [
    {
      name: 'Paket Dasar',
      price: 'Rp 5.000.000',
      description: 'Cocok untuk website pribadi atau startup kecil.',
      features: [
        'Desain Responsive (1 halaman)',
        'Integrasi SEO Dasar',
        'Waktu Pengerjaan: 2 Minggu',
        'Revisi: 1 Kali',
      ],
      buttonText: 'Pilih Paket Dasar',
      buttonLink: '/contact',
      isFeatured: false,
    },
    {
      name: 'Paket Standar',
      price: 'Rp 10.000.000',
      description: 'Ideal untuk bisnis kecil hingga menengah dengan kebutuhan lebih.',
      features: [
        'Desain Responsive (hingga 5 halaman)',
        'Integrasi Blog / Portofolio',
        'Optimasi Performa',
        'Waktu Pengerjaan: 4 Minggu',
        'Revisi: 2 Kali',
      ],
      buttonText: 'Pilih Paket Standar',
      buttonLink: '/contact',
      isFeatured: true, // Untuk highlight paket ini
    },
    {
      name: 'Paket Kustom',
      price: 'Mulai dari Rp 15.000.000',
      description: 'Solusi sesuai kebutuhan spesifik Anda dan skala besar.',
      features: [
        'Desain & Fitur Kustom',
        'Integrasi Database & API',
        'Dukungan Penuh',
        'Waktu Pengerjaan: Negosiasi',
        'Revisi: Tidak Terbatas',
      ],
      buttonText: 'Hubungi untuk Penawaran',
      buttonLink: '/contact',
      isFeatured: false,
    },
  ];

  // Kelas animasi dasar untuk semua bagian
  const animationClasses = 'opacity-0 transform transition-all duration-1000 ease-out'; // Durasi 1 detik
  const animatedInClasses = 'opacity-100 translate-y-0';
  const revealY = 'translate-y-20'; // Dari 20px ke bawah

  // Hooks untuk setiap section
  const [heroRef, heroInView] = useInView({ threshold: 0.1 });
  const [plansRef, plansInView] = useInView({ threshold: 0.1 });
  const [faqRef, faqInView] = useInView({ threshold: 0.1 });


  return (
    <main className="min-h-screen pt-16 bg-gray-900 text-white overflow-hidden"> {/* overflow-hidden di main */}
      {/* Bagian Hero untuk Halaman Pricing */}
      <section 
        ref={heroRef}
        className="py-20 bg-gray-950 text-center"
      >
        <div className="container mx-auto px-8">
          <h1 
            className={`text-5xl font-extrabold mb-4 text-blue-400 ${animationClasses} ${heroInView ? animatedInClasses : revealY}`}
            style={{ transitionDelay: '0s' }}
          >
            Harga Layanan
          </h1>
          <p 
            className={`text-xl text-gray-300 ${animationClasses} ${heroInView ? animatedInClasses : revealY}`}
            style={{ transitionDelay: '0.1s' }}
          >
            Pilih Paket yang Sesuai dengan Kebutuhan Anda
          </p>
        </div>
      </section>

      {/* Bagian Daftar Paket Harga */}
      <section 
        ref={plansRef}
        className="py-16 px-8 bg-gray-900"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.name}
                className={`
                  bg-gray-800 rounded-lg shadow-xl p-8 flex flex-col items-center text-center
                  transform hover:scale-105 transition-transform duration-300
                  ${plan.isFeatured ? 'border-4 border-blue-500 shadow-blue-500/50' : ''}
                  ${animationClasses} ${plansInView ? animatedInClasses : revealY}
                `}
                style={{ transitionDelay: `${0.2 * index}s` }} // Delay berurutan untuk setiap kartu
              >
                {plan.isFeatured && (
                  <span className="bg-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">
                    Paling Populer
                  </span>
                )}
                <h2 className="text-3xl font-bold mb-4 text-white">
                  {plan.name}
                </h2>
                <p className="text-4xl font-extrabold text-blue-400 mb-2">
                  {plan.price}
                </p>
                <p className="text-gray-300 mb-6">{plan.description}</p>
                
                <ul className="text-gray-300 text-lg mb-8 space-y-3 flex-grow">
                  {plan.features.map((feature, featIndex) => (
                    <li key={featIndex} className="flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.buttonLink}
                  className={`
                    mt-auto w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 shadow-lg transform hover:scale-105
                    ${plan.isFeatured ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white'}
                  `}
                >
                  {plan.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bagian FAQ atau Catatan Tambahan (Opsional) */}
      <section 
        ref={faqRef}
        className="py-16 px-8 bg-gray-800 text-center"
      >
        <div className="container mx-auto max-w-4xl text-gray-300">
          <h2 
            className={`text-3xl font-bold mb-6 text-white ${animationClasses} ${faqInView ? animatedInClasses : revealY}`}
            style={{ transitionDelay: '0s' }}
          >
            Pertanyaan Umum
          </h2>
          <div className={`text-left space-y-4 ${animationClasses} ${faqInView ? animatedInClasses : revealY}`} style={{ transitionDelay: '0.1s' }}>
            <h3 className="text-xl font-semibold text-blue-300">Bagaimana proses kerjanya?</h3>
            <p>
              Proses dimulai dengan konsultasi awal untuk memahami kebutuhan Anda, diikuti dengan proposal, pengembangan, revisi, dan peluncuran.
            </p>
            <h3 className="text-xl font-semibold text-blue-300">Apakah ada dukungan setelah peluncuran?</h3>
            <p>
              Ya, saya menyediakan dukungan pasca-peluncuran untuk memastikan website Anda berjalan lancar. Detail dukungan akan disepakati dalam proposal.
            </p>
            {/* Tambahkan lebih banyak FAQ */}
          </div>
        </div>
      </section>
    </main>
  );
}