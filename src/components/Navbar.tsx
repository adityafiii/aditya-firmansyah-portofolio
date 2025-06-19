'use client'; // Pastikan ini adalah baris pertama di file ini

import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image'; // Import komponen Image dari Next.js

export default function Navbar() {
  // State untuk mengontrol apakah menu overlay terbuka atau tertutup
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fungsi untuk menutup menu overlay setelah link navigasi diklik
  const handleNavLinkClick = () => {
    setIsMenuOpen(false); // Menutup menu setelah link diklik
  };

  // Array untuk link-link navigasi
  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang', href: '/about' },
    { name: 'Harga', href: '/pricing' },
    { name: 'Kontak', href: '/contact' },
  ];

  return (
    <nav className="bg-gray-950 p-4 fixed w-full z-20 top-0 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Nama Portfolio */}
        <Link href="/" onClick={handleNavLinkClick}>
          <Image
            src="/images/Logoo.png" // Path ke logo Anda
            alt="Logo ADIT Portfolio"
            width={100} // Sesuaikan lebar logo
            height={40} // Sesuaikan tinggi logo
            className="h-auto" // Memastikan tinggi otomatis menyesuaikan lebar
          />
        </Link>

        {/* Hamburger Menu Icon (SELALU TERLIHAT di semua ukuran layar) */}
        <div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2 transform hover:scale-110 transition-all duration-300"
            aria-label="Toggle menu"
          >
            {/* Ikon Tiga Garis (Hamburger) */}
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay (muncul saat hamburger diklik, dan sekarang bisa muncul di semua ukuran layar) */}
      <div
        className={`
          fixed inset-0 bg-gray-950 z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Tombol Tutup (X) */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-4 right-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2 transform hover:scale-110 transition-all duration-300"
          aria-label="Close menu"
        >
          {/* Ikon Tutup (X) */}
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Link Navigasi (dengan animasi masuk dari atas menggunakan transition) */}
        {navLinks.map((link, index) => (
          <Link
            key={link.name}
            href={link.href}
            className={`
              text-white text-5xl font-bold hover:text-blue-400 inline-block
              transform hover:scale-120
              transition-all duration-500 ease-out // Durasi transisi untuk animasi masuk
              ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20'} // Kondisi akhir vs awal
            `}
            // Menerapkan transition-delay secara kondisional
            style={{ transitionDelay: isMenuOpen ? `${0.1 + (index * 0.1)}s` : '0s' }}
            onClick={handleNavLinkClick}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}