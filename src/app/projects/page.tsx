'use client'; // Pastikan ini ada karena menggunakan hooks dan interaksi klien

import React, { useEffect, useState } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useInView } from '@/hooks/useInView';
import { featuredProjects } from '@/lib/data';

export default function ProjectsPage() {
  const [allProjects, setAllProjects] = useState<any[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("title"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const firestoreProjects: any[] = [];
      querySnapshot.forEach((doc) => {
        firestoreProjects.push({ id: doc.id, ...doc.data() });
      });

      // Gabungkan dengan featuredProjects (data lokal)
      const featuredProjectIds = new Set(featuredProjects.map(p => p.id));
      const uniqueFirestoreProjects = firestoreProjects.filter(fp => !featuredProjectIds.has(fp.id));
      const mergedProjects = [...featuredProjects, ...uniqueFirestoreProjects];

      setAllProjects(mergedProjects);
      setLoadingProjects(false);
    }, (error) => {
      console.error("Error fetching all projects from Firestore:", error);
      setLoadingProjects(false);
    });

    return () => unsubscribe();
  }, []);

  // Animasi scroll reveal
  const [heroRef, heroInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const [projectsListRef, projectsListInView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  const animationClasses = 'opacity-0 transform transition-all duration-1000 ease-out';
  const animatedInClasses = 'opacity-100 translate-y-0';
  const revealY = 'translate-y-20';

  if (loadingProjects) {
    return (
      <main className="min-h-screen pt-16 bg-gray-900 text-white flex items-center justify-center">
        <h1 className="text-4xl font-extrabold text-blue-400">Memuat Proyek...</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-16 bg-gray-900 text-white overflow-hidden">
      {/* Bagian Hero untuk Halaman Proyek */}
      <section 
        ref={heroRef}
        className="py-20 bg-gray-950 text-center"
      >
        <div className="container mx-auto px-8">
          <h1 
            className={`text-5xl font-extrabold mb-4 text-blue-400 ${animationClasses} ${heroInView ? animatedInClasses : revealY}`}
            style={{ transitionDelay: '0s' }}
          >
            Semua Proyek Saya
          </h1>
          <p 
            className={`text-xl text-gray-300 ${animationClasses} ${heroInView ? animatedInClasses : revealY}`}
            style={{ transitionDelay: '0.1s' }}
          >
            Lihat daftar lengkap karya-karya saya.
          </p>
        </div>
      </section>

      {/* Bagian Daftar Proyek Lengkap */}
      <section className="py-16 px-8 bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          {allProjects.length === 0 ? (
            <p className="text-gray-400 text-lg text-center">Belum ada proyek yang ditambahkan.</p>
          ) : (
            <div ref={projectsListRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {allProjects
                .filter(project => typeof project.imageUrl === "string" && project.imageUrl)
                .map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    className={`${animationClasses} ${projectsListInView ? animatedInClasses : revealY}`}
                    style={{ transitionDelay: `${0.1 * index}s` }}
                  />
                ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}