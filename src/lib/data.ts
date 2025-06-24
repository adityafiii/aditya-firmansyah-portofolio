// src/lib/data.ts

// Definisi tipe untuk proyek Anda
export type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string; // Path ke gambar proyek di folder public
  technologies: string[];
  githubUrl?: string; // Opsional
  liveDemoUrl?: string; // Opsional
};

// Data proyek unggulan yang akan ditampilkan di halaman beranda
export const featuredProjects: Project[] = [
  {
    id: 'project-1',
    title: 'Website E-commerce Modern',
    description: 'Platform belanja online dengan fitur keranjang, checkout, dan manajemen produk.',
    imageUrl: '/images/project1.png', // Ganti dengan path gambar proyek Anda
    technologies: ['Next.js', 'Tailwind CSS', 'Stripe', 'MongoDB'],
    githubUrl: 'https://github.com/adit-dev/ecommerce-app', // Ganti dengan link repo Anda
    liveDemoUrl: 'https://ecommerce-demo.vercel.app', // Ganti dengan link demo Anda
  },
  {
    id: 'project-2',
    title: 'Aplikasi Manajemen Tugas',
    description: 'Aplikasi sederhana untuk mengatur dan melacak tugas harian dengan antarmuka yang bersih.',
    imageUrl: '/images/project2.png', // Ganti dengan path gambar proyek Anda
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    githubUrl: 'https://github.com/adit-dev/task-manager',
    liveDemoUrl: 'https://task-manager-demo.netlify.app',
  },
  {
    id: 'project-3',
    title: 'Landing Page Portofolio Desainer',
    description: 'Desain landing page yang menarik dan responsif untuk portofolio seorang desainer grafis.',
    imageUrl: '/images/project3.png', // Ganti dengan path gambar proyek Anda
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
    githubUrl: 'https://github.com/adit-dev/designer-portfolio',
    liveDemoUrl: 'https://designer-portfolio-demo.vercel.app',
  },
  // Tambahkan proyek unggulan lain di sini jika Anda ingin lebih dari 3 di beranda
];