'use client'; // This is a Client Component because it uses client-side interactions (useState, useEffect)

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase'; // Import db object from your Firebase configuration
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'; // Firestore functions for fetching data
import { useInView } from '@/hooks/useInView'; // Import useInView hook for scroll animations

// Define the type for an Article
export type Article = {
  id: string;
  title: string;
  content?: string; // Optional, for backward compatibility
  author: string;
  date: string; // Date in YYYY-MM-DD format
  imageUrl?: string;
  sections?: { title: string; content: string }[];
};

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]); // State to store articles
  const [loadingArticles, setLoadingArticles] = useState(true); // Loading state

  // Fetch articles from Firestore on component mount
  useEffect(() => {
    // Create a query to the "articles" collection, ordered by date (newest first)
    const q = query(collection(db, "articles"), orderBy("date", "desc"));

    // onSnapshot listens for real-time updates to the articles collection
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedArticles: Article[] = [];
      querySnapshot.forEach((doc) => {
        // Map document data to Article type, adding the doc.id
        fetchedArticles.push({ id: doc.id, ...doc.data() } as Article);
      });
      setArticles(fetchedArticles); // Update articles state
      setLoadingArticles(false); // End loading
    }, (error) => {
      console.error("Error fetching articles from Firestore:", error);
      setLoadingArticles(false);
    });

    return () => unsubscribe(); // Clean up the listener when the component unmounts
  }, []);

  // useInView hooks for scroll animations
  const [heroRef, heroInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const animationClasses = 'opacity-0 transform transition-all duration-1000 ease-out';
  const animatedInClasses = 'opacity-100 translate-y-0';
  const revealY = 'translate-y-20';

  if (loadingArticles) {
    return (
      <main className="min-h-screen pt-16 bg-yellow-50 text-black flex items-center justify-center">
        <h1 className="text-4xl font-extrabold text-black">Memuat Artikel...</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-16 bg-yellow-50 text-white overflow-hidden">
      {/* Hero Section for Articles Page */}
      <section
        ref={heroRef}
        className="py-20 bg-yellow-50 text-center"
      >
        <div className="container mx-auto px-8">
          <h1
            className={`text-5xl font-extrabold mb-4 text-black ${animationClasses} ${heroInView ? animatedInClasses : revealY}`}
            style={{ transitionDelay: '0s' }}
          >
            Artikel
          </h1>
          <p
            className={`text-xl text-black ${animationClasses} ${heroInView ? animatedInClasses : revealY}`}
            style={{ transitionDelay: '0.1s' }}
          >
            Baca pemikiran dan panduan terbaru saya.
          </p>
        </div>
      </section>

      {/* List of Articles */}
      <section className="py-16 px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          {articles.length === 0 ? (
            <p className="text-black text-lg text-center">Belum ada artikel yang dipublikasikan.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <div key={article.id} className="bg-[#2d2926] p-4 rounded-lg shadow-md flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">{article.title}</h3>
                    {/* Tampilkan gambar jika ada */}
                    {article.imageUrl && (
                      <img
                        src={article.imageUrl.startsWith('http') ? article.imageUrl : `/images/${article.imageUrl}`}
                        alt={article.title}
                        className="w-full h-40 object-cover mt-2 rounded"
                      />
                    )}
                    {/* Tampilkan ringkasan dari section pertama, atau content lama */}
                    <p className="text-white text-sm mt-1 line-clamp-3">
                      {article.sections && Array.isArray(article.sections) && article.sections.length > 0
                        ? article.sections[0].content
                        : article.content}
                    </p>
                    <p className="text-white text-xs mt-2">Oleh: {article.author} pada {article.date}</p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Link
                      href={`/articles/${article.id}`}
                      className="bg-yellow-50 hover:bg-yellow-100 text-black text-sm py-1 px-3 rounded-full"
                    >
                      Baca selengkapnya
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}