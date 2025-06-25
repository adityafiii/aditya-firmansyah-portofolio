// src/lib/firebase.ts
// Pastikan Anda sudah menginstal firebase: npm install firebase

// Mengimpor fungsi-fungsi yang diperlukan dari Firebase SDK
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Untuk Firebase Authentication
import { getFirestore } from 'firebase/firestore'; // Untuk Firestore Database
import { getStorage } from 'firebase/storage';
// Konfigurasi Firebase Anda
const firebaseConfig = {
  apiKey: "AIzaSyBIAFZ60miTNY8PQS7hPaQwyAJuaVTaaxk", 
  authDomain: "adit-portfolio-admin.firebaseapp.com", 
  projectId: "adit-portfolio-admin", 
  storageBucket: "adit-portfolio-admin.appspot.com", // perbaiki: tambahkan ".appspot.com"
  messagingSenderId: "682443109237", 
  appId: "1:682443109237:web:d45e74039437d32189d93c"
};

// Inisialisasi aplikasi Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Inisialisasi layanan Firebase yang akan Anda gunakan
const auth = getAuth(app); // Objek untuk autentikasi
const db = getFirestore(app); // Objek untuk database Firestore

// Ekspor objek-objek ini agar bisa digunakan di komponen Next.js Anda
export { app, auth, db };