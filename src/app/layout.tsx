// src/app/layout.tsx
import type { Metadata } from "next";
// Import font Truculenta
import { Truculenta } from "next/font/google"; 

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Konfigurasi font Truculenta
const truculenta = Truculenta({ 
  subsets: ["latin"],
  // Menyertakan semua weight yang tersedia dari Thin 100 hingga Black 900
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], 
  // Anda bisa menambahkan 'display: "swap"' atau 'variable: "--font-truculenta"' jika diperlukan
});

export const metadata: Metadata = {
  title: "Portfolio ADIT", // Ganti dengan nama Anda
  description: "Portfolio Pribadi ADIT - Web Developer", // Ganti dengan deskripsi Anda
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      {/* Terapkan kelas font Truculenta ke body */}
      <body className={`${truculenta.className} bg-black text-white`}>
        <Navbar />
        <div className="pt-16">
          {children}
        </div>
        {/* Tambahkan shadow-2xl ke komponen Footer untuk bayangan di atasnya */}
        <Footer /> {/* --- TAMBAHKAN FOOTER DI SINI --- */}
      </body>
    </html>
  );
}