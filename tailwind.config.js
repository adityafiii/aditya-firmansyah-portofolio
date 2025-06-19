// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    // ...
  plugins: [
    require('@tailwindcss/line-clamp'), // Tambahkan baris ini
  ],
  
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
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.01)' },
        },
        // PERUBAHAN DI SINI: waveScale dibuat lebih berasa
        waveScale: {
          '0%, 100%': { transform: 'scale(1) translateY(0px)' },
          '50%': { transform: 'scale(1.2) translateY(-10px)' }, // Membesar 20% dan naik 10px
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.6s ease-out forwards',
        'fade-in-up-delay-100': 'fadeInUp 0.6s ease-out 0.1s forwards',
        'fade-in-up-delay-200': 'fadeInUp 0.6s ease-out 0.2s forwards',
        'fade-in-up-delay-300': 'fadeInUp 0.6s ease-out 0.3s forwards',
        'fade-in-right-delay-400': 'fadeInRight 0.6s ease-out 0.4s forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        // Animasi wave-text menggunakan waveScale
        'wave-text': 'waveScale 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
export default config;