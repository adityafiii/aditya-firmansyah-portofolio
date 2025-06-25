// tailwind.config.ts
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
   theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        fadeInUp: { // Tetap ada untuk scroll reveal di halaman lain
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInRight: { // Tetap ada untuk scroll reveal di halaman lain
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSubtle: { // Tetap ada untuk foto profil
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.01)' },
        },
        // HAPUS keyframes waveScale (ini untuk animasi teks gelombang per huruf pada garis lurus)
        // waveScale: {
        //   '0%, 100%': { transform: 'scale(1) translateY(0px)' },
        //   '50%': { transform: 'scale(1.2) translateY(-10px)' },
        // },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards', // Tetap ada
        'fade-in-right': 'fadeInRight 0.6s ease-out forwards', // Tetap ada
        'fade-in-up-delay-100': 'fadeInUp 0.6s ease-out 0.1s forwards', // Tetap ada
        'fade-in-up-delay-200': 'fadeInUp 0.6s ease-out 0.2s forwards', // Tetap ada
        'fade-in-up-delay-300': 'fadeInUp 0.6s ease-out 0.3s forwards', // Tetap ada
        'fade-in-right-delay-400': 'fadeInRight 0.6s ease-out 0.4s forwards', // Tetap ada
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite', // Tetap ada untuk foto profil
        // HAPUS animation wave-text
        // 'wave-text': 'waveScale 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
export default config;