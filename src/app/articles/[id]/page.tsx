'use client';

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ArticleDetailPage() {
  const params = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      const docRef = doc(db, "articles", params.id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setArticle({ id: docSnap.id, ...docSnap.data() });
      } else {
        setArticle(null);
      }
      setLoading(false);
    }
    fetchArticle();
  }, [params.id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!article) return notFound();

  return (
    <main className="min-h-screen pt-16 bg-yellow-50 text-black">
      <div className="container mx-auto py-12 px-4 max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <p className="mb-2 text-gray-700">Oleh: {article.author} | {article.date}</p>
        {article.imageUrl && (
          <img
            src={article.imageUrl.startsWith('http') ? article.imageUrl : `/images/${article.imageUrl}`}
            alt={article.title}
            className="rounded-lg shadow-lg max-w-xl w-full mb-6"
          />
        )}
        {article.sections && Array.isArray(article.sections) && article.sections.length > 0 ? (
          <div className="mt-6 space-y-6">
            {article.sections.map((section: any, idx: number) => (
              <div key={idx}>
                <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
                <p className="text-base">{section.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="prose prose-lg max-w-none text-black mt-6">
            Tidak ada konten.
          </div>
        )}
        {article.link && (
          <div className="mt-8">
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-full transition-colors"
            >
              Lihat Selengkapnya...
            </a>
          </div>
        )}
      </div>
    </main>
  );
}