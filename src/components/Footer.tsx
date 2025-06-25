import React from 'react';
import Link from 'next/link';

type FooterProps = {
  className?: string;
};

export default function Footer({ className = "" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`bg-[#2d2926] text-black py-12 px-8 shadow-[0_-16px_20px_-8px_rgba(0,0,0,0.35)] ${className}`}
    >
      <div className="container mx-auto text-center">
        {/* Navigasi Singkat */}
        <div className="flex justify-center space-x-6 mb-8 text-white text-lg">
          <Link href="/" className="hover:text-orange-500 transition-colors duration-200">
            Beranda
          </Link>
          <Link href="/about" className="hover:text-orange-500 transition-colors duration-200">
            Tentang
          </Link>
          <Link href="/pricing" className="hover:text-orange-500 transition-colors duration-200">
            Harga
          </Link>
          <Link href="/articles" className="hover:text-orange-500 transition-colors duration-200">
            Artikel
          </Link>
          <Link href="/contact" className="hover:text-orange-500 transition-colors duration-200">
            Kontak
          </Link>
        </div>

        {/* Ikon Media Sosial */}
        <div className="flex justify-center space-x-6 mb-8">
          {/* Link GitHub */}
          <a
            href="https://github.com/adityafiii"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-orange-500 transition-colors duration-200"
            aria-label="GitHub"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.417 2.865 8.19 6.83 9.504.5.092.682-.217.682-.483 0-.237-.008-.867-.013-1.7-2.782.6-3.37-1.343-3.37-1.343-.454-1.158-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.002.07 1.527 1.028 1.527 1.028.89 1.529 2.333 1.089 2.903.832.091-.645.353-1.089.65-1.334-2.22-.253-4.555-1.113-4.555-4.93 0-1.089.389-1.979 1.028-2.678-.109-.253-.448-1.268.092-2.647 0 0 .84-.268 2.75 1.022.795-.222 1.635-.333 2.475-.333.84 0 1.68.111 2.475.333 1.91-1.29 2.75-1.022 2.75-1.022.54 1.379.201 2.394.092 2.647.64.699 1.028 1.59 1.028 2.678 0 3.824-2.335 4.67-4.565 4.92.359.308.678.918.678 1.854 0 1.334-.014 2.41-.014 2.72.003.267.189.57.695.483C21.133 20.208 24 16.434 24 12.017 24 6.484 19.523 2 14 2h-2z" clipRule="evenodd" />
            </svg>
          </a>
          {/* Link LinkedIn */}
          <a
            href="https://linkedin.com/in/adityafirmansyah"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-orange-500 transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.693V14.004c0-.829-.028-1.892-1.153-1.892-1.154 0-1.334.903-1.334 1.838v6.502h-3.692V9.529h3.54v1.61c.49-.933 1.61-1.782 3.486-1.782 3.72 0 4.417 2.44 4.417 5.617v6.088zm3.033-14.86c0-1.802-1.47-3.272-3.272-3.272-1.801 0-3.271 1.47-3.271 3.272s1.47 3.272 3.271 3.272 3.272-1.47 3.272-3.272zM0 20.452h3.692V9.529H0V20.452z" />
            </svg>
          </a>
        </div>

        {/* Hak Cipta */}
        <p className="text-gray-500 text-sm">
          &copy; {currentYear} Aditya Firmansyah. Hak Cipta Dilindungi Undang-Undang.
        </p>
      </div>
    </footer>
  );
}