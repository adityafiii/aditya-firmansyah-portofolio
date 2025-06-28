// src/lib/data.ts

// Definisi tipe untuk struktur data proyek Anda.
// Ini membantu TypeScript memahami bentuk objek proyek.
export type StorySection = {
  title: string;      // Judul utama atau subjudul
  content: string;    // Isi paragraf
};

export type projects = {
  id: string; // ID unik untuk setiap proyek
  title: string; // Judul proyek
  description: string; // Deskripsi singkat proyek
  imageUrl: string; // Path ke gambar/screenshot proyek (biasanya dari folder public/)
  technologies: string[]; // Daftar teknologi yang digunakan (array of strings)
  story?: StorySection[];
};

// Array yang berisi proyek-proyek unggulan Anda.
// Saat ini hanya berisi satu entri untuk website portfolio ini sendiri.
export const projects: projects[] = [
  {
    id: 'my-personal-portfolio-website2', // ID unik untuk proyek ini
    title: 'Website Portofolio Pribadi', // Judul proyek
    description: 'Website portofolio modern dan responsif yang dibangun untuk menampilkan proyek dan keahlian saya. Dilengkapi dengan panel admin untuk manajemen konten.', // Deskripsi proyek
    imageUrl: '/images/porto1.png', // <-- GANTI DENGAN PATH KE SCREENSHOT WEBSITE ANDA DI public/images/
    technologies: ['Next.js', 'React.js', 'Tailwind CSS', 'Firebase (Firestore, Auth)'], // Teknologi yang digunakan
    story: [
      {
        title: "Cerita di Balik Portofolio Ini: Inovasi dan Keahlian",
        content: `Selamat datang di portofolio digital saya! Website yang sedang Anda kunjungi ini adalah buah dari passion dan dedikasi saya dalam menciptakan pengalaman web yang modern dan interaktif. Ini bukan sekadar kumpulan halaman, tetapi juga merupakan salah satu proyek utama yang saya bangun sendiri dari nol.`,
      },
      {
        title: "Desain yang Memukau, Pengalaman yang Mulus",
        content: `Sejak awal, saya memvisualisasikan sebuah portofolio yang tidak hanya informatif tetapi juga memukau secara visual. Menggunakan teknologi terkini seperti Next.js dan Tailwind CSS, saya merancang antarmuka yang bersih, responsif, dan elegan. Setiap elemen didesain untuk tampil sempurna di berbagai perangkat, mulai dari desktop besar hingga ponsel pintar.

        Anda akan merasakan pengalaman menggulir yang dinamis, di mana elemen-elemen muncul dengan animasi halus saat Anda menjelajahi setiap bagian. Bahkan nama saya di halaman beranda pun dirancang untuk berinteraksi dengan Anda, menciptakan efek visual yang unik dan tak terlupakan. Navigasi melalui menu hamburger yang intuitif memastikan Anda dapat menemukan apa yang Anda cari dengan mudah dan cepat.`
      },
      {
        title: "Kecerdasan di Balik Layar: Konten yang Dinamis",
        content: `Untuk memastikan website ini selalu relevan dan mudah diperbarui, saya membangun sistem manajemen konten (CMS) yang cerdas. Ini didukung oleh Firebase, sebuah platform backend dari Google, yang memungkinkan saya untuk menambahkan, mengedit, dan menghapus proyek, artikel, atau bahkan mengelola pesan yang masuk dari formulir kontak—semuanya tanpa perlu menyentuh satu baris kode pun. Ini adalah bukti nyata kemampuan saya dalam membangun solusi web yang tidak hanya indah di depan tetapi juga efisien dan kuat di belakang layar.`,
      },
      {
        title: "Perjalanan Penuh Pembelajaran: Dari Ide Hingga Online",
        content: `Pembangunan portofolio ini adalah sebuah perjalanan yang intens dan penuh pembelajaran. Dimulai dengan fondasi Next.js dan Tailwind CSS, setiap fitur yang saya tambahkan—mulai dari animasi scroll-reveal yang halus di berbagai bagian, efek unik pada nama saya di halaman beranda, hingga pembangunan panel admin yang terintegrasi dengan Firebase—menghadirkan tantangannya sendiri.

        Saya menghadapi berbagai rintangan teknis, seperti masalah konfigurasi, error di lingkungan build, dan penyesuaian desain yang presisi. Setiap hambatan adalah kesempatan untuk mengasah kemampuan pemecahan masalah saya, belajar mendalami seluk-beluk framework, dan memahami pentingnya detail terkecil dalam pengembangan web. Proses ini mengajari saya banyak hal tentang ketekunan, debugging yang efektif, dan bagaimana mengubah konsep menjadi solusi digital yang berfungsi penuh.`,
      },
      {
        title: "Mengapa Portofolio Ini Berbeda?",
        content: `Portofolio ini bukan hanya sekadar showcase dari apa yang saya bisa, tetapi juga merupakan cerminan dari siapa saya sebagai pengembang web. Setiap baris kode, setiap animasi, dan setiap interaksi dirancang dengan penuh perhatian untuk menciptakan pengalaman pengguna yang luar biasa. Saya percaya bahwa sebuah portofolio harus lebih dari sekadar daftar proyek; itu harus menjadi pengalaman yang menginspirasi dan meninggalkan kesan mendalam.

        Dengan teknologi modern dan pendekatan desain yang inovatif, saya berharap portofolio ini dapat memberikan gambaran yang jelas tentang kemampuan saya dalam menciptakan solusi web yang tidak hanya fungsional tetapi juga estetis. Saya mengundang Anda untuk menjelajahi setiap sudutnya, merasakan inovasi di balik layar, dan melihat bagaimana saya dapat membantu mewujudkan visi digital Anda.
        
        Terima kasih telah berkunjung. Saya harap Anda menikmati pengalaman menjelajahi hasil karya saya ini!`,
      },
      // Tambahkan bagian lain sesuai kebutuhan
    ],

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