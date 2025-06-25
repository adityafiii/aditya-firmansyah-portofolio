// src/lib/data.ts

// Definisi tipe untuk struktur data proyek Anda.
// Ini membantu TypeScript memahami bentuk objek proyek.
export type Project = {
  id: string; // ID unik untuk setiap proyek
  title: string; // Judul proyek
  description: string; // Deskripsi singkat proyek
  imageUrl: string; // Path ke gambar/screenshot proyek (biasanya dari folder public/)
  technologies: string[]; // Daftar teknologi yang digunakan (array of strings)
  githubUrl?: string; // URL opsional ke repositori GitHub
  liveDemoUrl?: string; // URL opsional ke demo live proyek
};

// Array yang berisi proyek-proyek unggulan Anda.
// Saat ini hanya berisi satu entri untuk website portfolio ini sendiri.
export const featuredProjects: Project[] = [
  {
    id: 'my-personal-portfolio-website 1', // ID unik untuk proyek ini
    title: 'Website Portofolio Pribadi', // Judul proyek
    description: 'Website portofolio modern dan responsif yang dibangun untuk menampilkan proyek dan keahlian saya. Dilengkapi dengan panel admin untuk manajemen konten.', // Deskripsi proyek
    imageUrl: '/images/Proyek2.png', // <-- GANTI DENGAN PATH KE SCREENSHOT WEBSITE ANDA DI public/images/
    technologies: ['Next.js', 'React.js', 'Tailwind CSS', 'Firebase (Firestore, Auth)'], // Teknologi yang digunakan
    githubUrl: 'https://github.com/adityafiii/aditya-firmansyah-portofolio', // <-- GANTI DENGAN URL REPO GITHUB ANDA
    liveDemoUrl: 'https://aditya-firmansyah-portofolio.vercel.app', // <-- GANTI DENGAN URL LIVE WEBSITE ANDA DI VERCEL
  },
  {
    id: 'my-personal-portfolio-website 2', // ID unik untuk proyek ini
    title: 'Website Portofolio Pribadi', // Judul proyek
    description: 'Website portofolio modern dan responsif yang dibangun untuk menampilkan proyek dan keahlian saya. Dilengkapi dengan panel admin untuk manajemen konten.', // Deskripsi proyek
    imageUrl: '/images/Proyek2.png', // <-- GANTI DENGAN PATH KE SCREENSHOT WEBSITE ANDA DI public/images/
    technologies: ['Next.js', 'React.js', 'Tailwind CSS', 'Firebase (Firestore, Auth)'], // Teknologi yang digunakan
    githubUrl: 'https://github.com/adityafiii/aditya-firmansyah-portofolio', // <-- GANTI DENGAN URL REPO GITHUB ANDA
    liveDemoUrl: 'https://aditya-firmansyah-portofolio.vercel.app', // <-- GANTI DENGAN URL LIVE WEBSITE ANDA DI VERCEL
  },
  {
    id: 'my-personal-portfolio-website 3', // ID unik untuk proyek ini
    title: 'Website Portofolio Pribadi', // Judul proyek
    description: 'Website portofolio modern dan responsif yang dibangun untuk menampilkan proyek dan keahlian saya. Dilengkapi dengan panel admin untuk manajemen konten.', // Deskripsi proyek
    imageUrl: '/images/Proyek2.png', // <-- GANTI DENGAN PATH KE SCREENSHOT WEBSITE ANDA DI public/images/
    technologies: ['Next.js', 'React.js', 'Tailwind CSS', 'Firebase (Firestore, Auth)'], // Teknologi yang digunakan
    githubUrl: 'https://github.com/adityafiii/aditya-firmansyah-portofolio', // <-- GANTI DENGAN URL REPO GITHUB ANDA
    liveDemoUrl: 'https://aditya-firmansyah-portofolio.vercel.app', // <-- GANTI DENGAN URL LIVE WEBSITE ANDA DI VERCEL
  },
  // Jika Anda ingin menambahkan proyek lain di masa mendatang, tambahkan di sini.
  // Contoh:
  // {
  //   id: 'ecommerce-store-example',
  //   title: 'Contoh Toko Online',
  //   description: 'Situs e-commerce fiktif dengan fitur keranjang belanja dan checkout.',
  //   imageUrl: '/images/ecommerce.png',
  //   technologies: ['Next.js', 'Stripe', 'MongoDB'],
  //   githubUrl: 'https://github.com/adit/ecommerce',
  //   liveDemoUrl: 'https://ecommerce.vercel.app',
  // },
];