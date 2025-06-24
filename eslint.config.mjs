// eslint.config.js
// Menggunakan sintaks CommonJS (require, module.exports)
const { FlatCompat } = require("@eslint/eslintrc");
const path = require("path");
const { fileURLToPath } = require("url");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // TAMBAHKAN OBJEK KONFIGURASI INI UNTUK MENONAKTIFKAN ATURAN no-explicit-any
  {
    files: ["**/*.ts", "**/*.tsx"], // Terapkan aturan ini hanya untuk file TypeScript
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Menonaktifkan error 'Unexpected any'
    },
  },
];