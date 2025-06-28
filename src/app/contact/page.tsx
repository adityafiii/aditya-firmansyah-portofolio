'use client';
import React, { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { db } from '@/lib/firebase'; // Import db
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Import Firestore functions

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Mengirim...');
    try {
      // Logic untuk mengirim data form ke koleksi "messages" di Firestore
      const docRef = await addDoc(collection(db, "messages"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        timestamp: serverTimestamp(), // Menambahkan timestamp otomatis dari Firestore
      });
      console.log("Pesan dikirim dengan ID: ", docRef.id);
      setStatus('Pesan berhasil dikirim!');
      setFormData({ name: '', email: '', phone: '', message: '' }); // Reset form
    } catch (error) {
      console.error("Error saat mengirim pesan ke Firestore: ", error);
      setStatus('Terjadi kesalahan saat mengirim pesan.');
    }
  };

  return (
    <main className="min-h-screen pt-16 bg-yellow-50 text-white">
      {/* Hero section for the Contact page */}
      <section className="py-20 bg-bg-yellow-50 text-center">
        <div className="container mx-auto px-8">
          <h1 className="text-6xl font-extrabold mb-4 text-black animate-fade-in-up">
            Hubungi Saya
          </h1>
          <p className="text-2xl text-black animate-fade-in-up delay-100">
            Mari Berkolaborasi atau Sampaikan Pesan Anda
          </p>
        </div>
      </section>

      {/* Section containing the contact form and contact information */}
      <section className="py-16 px-8 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form Column */}
            <div className="animate-fade-in-left">
              <h2 className="text-3xl font-bold mb-6 text-black">Kirim Pesan</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-black text-sm font-bold mb-2">Nama Anda</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#2d2926] border-black focus:border-blue-500 transition-colors duration-200"
                    placeholder="Nama Lengkap Anda"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-black text-sm font-bold mb-2">Email Anda</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#2d2926] border-black focus:border-blue-500 transition-colors duration-200"
                    placeholder="nama@contoh.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-black text-sm font-bold mb-2">Nomor Telepon</label>
                  <div className="flex">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded-r w-full py-3 px-4 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#2d2926] border-black focus:border-blue-500 transition-colors duration-200"
                      placeholder="081234567890"
                      pattern="[0-9]{9,13}"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-black text-sm font-bold mb-2">Pesan Anda</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#2d2926] border-black focus:border-blue-500 transition-colors duration-200 resize-y"
                    placeholder="Tulis pesan Anda di sini..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-[#2d2926] border-black hover:bg-orange-500 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg transform hover:scale-105"
                  disabled={status === 'Mengirim...'}
                >
                  {status === 'Mengirim...' ? 'Mengirim...' : 'Kirim Pesan'}
                </button>
                {status && status !== 'Mengirim...' && (
                  <p className={`mt-4 text-center ${status.includes('berhasil') ? 'text-green-400' : 'text-red-400'}`}>
                    {status}
                  </p>
                )}
              </form>
            </div>

            {/* Contact Information Column */}
            <div className="animate-fade-in-right">
              <h2 className="text-3xl font-bold mb-6 text-black">Info Kontak</h2>
              <div className="space-y-6 text-lg text-black">
                <p className="flex items-center">
                  {/* SVG for Email Icon */}
                  <svg className="w-6 h-6 text-black mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.93 2.93a1 1 0 011.414 0L10 8.586l5.657-5.657a1 1 0 111.414 1.414L11.414 10l5.657 5.657a1 1 0 01-1.414 1.414L10 11.414l-5.657 5.657a1 1 0 01-1.414-1.414L8.586 10 2.93 4.343a1 1 0 010-1.414z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Email: <a href="mailto:namaanda@email.com" className="ml-2 text-black hover:underline">adityafirmansyah1325@email.com</a>
                </p>
                <p className="flex items-center">
                  {/* SVG for Phone Icon */}
                  <svg className="w-6 h-6 text-black mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 9a1 1 0 00-1 1v2a1 1 0 102 0v-2a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v2a1 1 0 102 0v-2a1 1 0 00-1-1z" clipRule="evenodd" fillRule="evenodd" />
                  </svg>
                  Telepon: <a href="tel:+628123456789" className="ml-2 text-black hover:underline">+62 821-3555-9223</a>
                </p>
                <div className="flex items-center space-x-4">
                  <p className="flex items-center">
                    {/* SVG for LinkedIn Icon */}
                    <svg className="w-6 h-6 text-black mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm2.707 6.293a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    LinkedIn:
                  </p>
                  <a href="https://linkedin.com/in/adityafiii" target="_blank" rel="noopener noreferrer" className="text-black hover:underline">Aditya Firmansyah</a>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="flex items-center">
                    {/* SVG for GitHub Icon */}
                    <svg className="w-6 h-6 text-black mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.418 2.866 8.192 6.839 9.516.5.092.682-.217.682-.483 0-.237-.008-.867-.013-1.7C4.804 17.518 4 16.5 4 16.5c-.47-.119-1.143-.364-1.49-.607-.309-.206-.755-.583-.056-.593.57-.008.87.525.87.525.507.87 1.332.617 1.654.473.05-.365.197-.617.359-.757C6.183 14.549 3.5 13.582 3.5 9.172c0-1.018.363-1.854.962-2.507-.097-.247-.418-1.171.09-2.441 0 0 .788-.25 2.56.96.75-.207 1.54-.31 2.33-.31.788 0 1.578.103 2.329.31 1.77-1.21 2.558-.96 2.558-.96.508 1.27.187 2.194.09 2.441.598.653.962 1.489.962 2.507 0 4.42-2.684 5.385-5.204 5.66.42.36.804 1.07.804 2.158 0 1.55-.014 2.808-.014 3.18 0 .267.18.577.688.483C17.136 18.192 20 14.418 20 10A10 10 0 0010 0z" clipRule="evenodd" />
                    </svg>
                    GitHub:
                  </p>
                  <a href="https://github.com/adityafiii" target="_blank" rel="noopener noreferrer" className="text-black hover:underline">adityafiii</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}