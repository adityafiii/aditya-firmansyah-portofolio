'use client';

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { projects as staticProjects } from "@/lib/data";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ProjectDetailPage() {
  const params = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      // Cek di Firestore dulu
      const docRef = doc(db, "projects", params.id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProject({ id: docSnap.id, ...docSnap.data() });
      } else {
        // Jika tidak ada di Firestore, cek di data.ts
        const staticProject = staticProjects.find(p => String(p.id) === params.id);
        setProject(staticProject || null);
      }
      setLoading(false);
    }
    fetchProject();
  }, [params.id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!project) return notFound();

  return (
    <main className="min-h-screen pt-16 bg-yellow-50 text-black text-center">
      <div className="container mx-auto py-12 px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6">{project.title}</h1>
        <div className="flex justify-center mb-8">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="rounded-lg shadow-lg max-w-xl w-full"
          />
        </div>
        <p className="text-lg mb-8">{project.description}</p>
        <div className="mb-4">
          {project.story && (
            <div className="mt-10 text-xl whitespace-pre-line leading-relaxed text-base text-justify space-y-8">
              {project.story.map((section: any, idx: number) => (
                <div key={idx}>
                  <h3 className="font-bold text-2xl mb-2">{section.title}</h3>
                  <p>{section.content}</p>
                </div>
              ))}
            </div>
          )}
          <h2 className="text-xl font-semibold mb-2 mt-8">Teknologi yang digunakan:</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {project.technologies?.map((tech: string, idx: number) => (
              <span key={idx} className="bg-black text-white px-3 py-1 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}