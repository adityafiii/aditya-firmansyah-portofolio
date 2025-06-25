'use client';

import React, { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function AdminDashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'projects' | 'articles' | 'messages'>('projects');

  // States untuk Proyek
  const [projects, setProjects] = useState<any[]>([]);
  const [newProject, setNewProject] = useState({ title: '', description: '', imageUrl: '', technologies: '' });
  const [editingProject, setEditingProject] = useState<any>(null);

  // States untuk Artikel
  const [articles, setArticles] = useState<any[]>([]);
  const [newArticle, setNewArticle] = useState({ title: '', content: '', author: '', date: '' });
  const [editingArticle, setEditingArticle] = useState<any>(null);

  // States untuk Pesan
  const [messages, setMessages] = useState<any[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  // Effect untuk autentikasi dan load data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/admin/login');
      } else {
        setUser(currentUser);
        Promise.all([fetchProjects(), fetchArticles(), fetchMessages()]).finally(() => setLoading(false));
      }
    });
    return () => unsubscribe();
  }, [router]);

  // --- PROJECTS ---
  const fetchProjects = async () => {
    try {
      const q = query(collection(db, "projects"), orderBy("title"));
      const querySnapshot = await getDocs(q);
      const projectsData = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects: ", error);
    }
  };

  const formatImageUrlForDb = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
      return url;
    }
    return `/images/${url}`;
  };

  const addProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const imageUrlToSave = formatImageUrlForDb(newProject.imageUrl);
      const docRef = await addDoc(collection(db, "projects"), {
        ...newProject,
        imageUrl: imageUrlToSave,
        technologies: newProject.technologies.split(',').map(tech => tech.trim()),
      });
      setNewProject({ title: '', description: '', imageUrl: '', technologies: '' });
      fetchProjects();
    } catch (error) {
      console.error("Error adding project: ", error);
    }
  };

  const updateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.id) return;
    try {
      const imageUrlToSave = formatImageUrlForDb(editingProject.imageUrl);
      const projectRef = doc(db, "projects", editingProject.id);
      await updateDoc(projectRef, {
        title: editingProject.title,
        description: editingProject.description,
        imageUrl: imageUrlToSave,
        technologies: editingProject.technologies.split(',').map((tech: string) => tech.trim()),
      });
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      console.error("Error updating project: ", error);
    }
  };

  const startEdit = (project: any) => {
    let displayImageUrl = project.imageUrl;
    if (project.imageUrl && project.imageUrl.startsWith('/images/')) {
      displayImageUrl = project.imageUrl.substring('/images/'.length);
    }
    setEditingProject({
      ...project,
      technologies: project.technologies.join(','),
      imageUrl: displayImageUrl
    });
  };

  const deleteProject = async (id: string) => {
    const yakin = window.confirm("Apakah Anda yakin ingin menghapus proyek ini?");
    if (!yakin) return;
    try {
      await deleteDoc(doc(db, "projects", id));
      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      console.error("Error deleting project: ", error);
    }
  };

  // --- ARTICLES ---
  const fetchArticles = async () => {
    try {
      const q = query(collection(db, "articles"), orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);
      const articlesData = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setArticles(articlesData);
    } catch (error) {
      console.error("Error fetching articles: ", error);
    }
  };

  const addArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "articles"), {
        ...newArticle,
        author: newArticle.author || user?.email || 'Admin',
        date: newArticle.date || new Date().toISOString().split('T')[0],
      });
      setNewArticle({ title: '', content: '', author: '', date: '' });
      fetchArticles();
    } catch (error) {
      console.error("Error adding article: ", error);
    }
  };

  const startEditArticle = (article: any) => {
    setEditingArticle(article);
  };
query
  const updateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle?.id) return;
    try {
      const articleRef = doc(db, "articles", editingArticle.id);
      await updateDoc(articleRef, {
        title: editingArticle.title,
        content: editingArticle.content,
        author: editingArticle.author,
        date: editingArticle.date,
      });
      setEditingArticle(null);
      fetchArticles();
    } catch (error) {
      console.error("Error updating article: ", error);
    }
  };

  const deleteArticle = async (id: string) => {
    const yakin = window.confirm("Apakah Anda yakin ingin menghapus artikel ini?");
    if (!yakin) return;
    try {
      await deleteDoc(doc(db, "articles", id));
      setArticles(articles.filter((article) => article.id !== id));
    } catch (error) {
      console.error("Error deleting article: ", error);
    }
  };

// --- MESSAGES ---
const fetchMessages = async () => {
  setLoadingMessages(true);
  try {
    const q = collection(db, "messages"); // tanpa orderBy agar aman jika ada data tanpa timestamp
    const querySnapshot = await getDocs(q);
    const messagesData = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    setMessages(messagesData);
  } catch (error) {
    console.error("Error fetching messages: ", error);
  }
  setLoadingMessages(false);
};

  const deleteMessage = async (id: string) => {
    const yakin = window.confirm("Apakah Anda yakin ingin menghapus pesan ini?");
    if (!yakin) return;
    try {
      await deleteDoc(doc(db, "messages", id));
      setMessages(messages.filter((msg) => msg.id !== id));
    } catch (error) {
      console.error("Error deleting message: ", error);
    }
  };
messages.length
  // --- LOGOUT ---
  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  if (loading) {
    return <main className="min-h-screen pt-16 bg-yellow-50 text-black flex items-center justify-center">Loading Admin Dashboard...</main>;
  }

  return (
    <main className="min-h-screen pt-16 bg-yellow-50 text-white p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-black text-center mb-8">Admin Dashboard</h1>
        <p className="text-black text-center mb-4">Selamat datang, {user?.email}!</p>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full mb-8 transition-colors"
        >
          Logout
        </button>

        {/* Tab Navigation */}
        <div className="mb-8 border-b border-black">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('projects')}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg
                ${activeTab === 'projects'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-300'}
                transition-colors duration-200
              `}
            >
              Kelola Proyek
            </button>
            <button
              onClick={() => setActiveTab('articles')}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg
                ${activeTab === 'articles'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-300'}
                transition-colors duration-200
              `}
            >
              Kelola Artikel
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg
                ${activeTab === 'messages'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-300'}
                transition-colors duration-200
              `}
            >
              Kelola Pesan
            </button>
          </nav>
        </div>

        {/* Konten Proyek */}
        {activeTab === 'projects' && (
          <div>
            {/* Form Tambah/Edit Proyek */}
            <div className="bg-[#2d2926] p-6 rounded-lg shadow-xl mb-8">
              <h2 className="text-4xl font-bold mb-4 text-white">
                {editingProject ? 'Edit Proyek' : 'Tambah Proyek Baru'}
              </h2>
              <form onSubmit={editingProject ? updateProject : addProject} className="space-y-4">
                <input
                  type="text"
                  placeholder="Judul Proyek"
                  value={editingProject ? editingProject.title : newProject.title}
                  onChange={(e) => editingProject ? setEditingProject({ ...editingProject, title: e.target.value }) : setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full p-2 rounded bg-yellow-50 border border-gray-600 text-black placeholder-gray-400"
                  required
                />
                <textarea
                  placeholder="Deskripsi Proyek"
                  value={editingProject ? editingProject.description : newProject.description}
                  onChange={(e) => editingProject ? setEditingProject({ ...editingProject, description: e.target.value }) : setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full p-2 rounded bg-yellow-50 border border-gray-600 text-black placeholder-gray-400 h-24 resize-y"
                  required
                ></textarea>
                <label className="block text-white text-sm font-bold mb-2">Nama File Gambar (misal: project1.png)</label>
                <input
                  type="text"
                  placeholder="NamaFile.ekstensi (ex: project1.png)"
                  value={editingProject ? editingProject.imageUrl : newProject.imageUrl}
                  onChange={(e) => {
                    if (editingProject) {
                      setEditingProject({ ...editingProject, imageUrl: e.target.value });
                    } else {
                      setNewProject({ ...newProject, imageUrl: e.target.value });
                    }
                  }}
                  className="w-full p-2 rounded bg-yellow-50 border border-gray-600 text-black placeholder-gray-400"
                  required
                />
                <input
                  type="text"
                  placeholder="Teknologi (dipisahkan koma, misal: React, Next.js, Tailwind CSS)"
                  value={editingProject ? editingProject.technologies : newProject.technologies}
                  onChange={(e) => editingProject ? setEditingProject({ ...editingProject, technologies: e.target.value }) : setNewProject({ ...newProject, technologies: e.target.value })}
                  className="w-full p-2 rounded bg-yellow-50 border border-gray-600 text-black placeholder-gray-400"
                />
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-yellow-50 hover:bg-orange-500 text-black font-semibold py-2 px-4 rounded-full flex-grow transition-colors"
                  >
                    {editingProject ? 'Update Proyek' : 'Tambah Proyek'}
                  </button>
                  {editingProject && (
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-full"
                    >
                      Batal
                    </button>
                  )}
                </div>
              </form>
            </div>

            <h2 className="text-4xl font-bold mb-4 text-black">Daftar Proyek Anda</h2>
            {projects.length === 0 ? (
              <p className="text-black">Tidak ada proyek.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-[#2d2926] p-4 rounded-lg shadow-md flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      <p className="text-white text-sm mt-1">{project.description}</p>
                      <p className="text-white text-xs mt-2 ">Tech: {project.technologies?.join(', ')}</p>
                      {project.imageUrl && (
                        <img src={project.imageUrl} alt={project.title} className="w-full h-32 object-cover mt-2 rounded" />
                      )}
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => startEdit(project)}
                        className="bg-yellow-50 hover:bg-yellow-100 text-black text-sm py-1 px-3 rounded-full"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded-full"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Konten Artikel */}
        {activeTab === 'articles' && (
          <div>
            <div className="bg-[#2d2926] p-6 rounded-lg shadow-xl mb-8">
              <h2 className="text-4xl font-bold mb-4 text-white">
                {editingArticle ? 'Edit Artikel' : 'Tambah Artikel Baru'}
              </h2>
              <form onSubmit={editingArticle ? updateArticle : addArticle} className="space-y-4">
                <input
                  type="text"
                  placeholder="Judul Artikel"
                  value={editingArticle ? editingArticle.title : newArticle.title}
                  onChange={(e) => editingArticle ? setEditingArticle({ ...editingArticle, title: e.target.value }) : setNewArticle({ ...newArticle, title: e.target.value })}
                  className="w-full p-2 rounded bg-yellow-50 border border-gray-600 text-black placeholder-gray-400"
                  required
                />
                <textarea
                  placeholder="Konten Artikel (Markdown)"
                  value={editingArticle ? editingArticle.content : newArticle.content}
                  onChange={(e) => editingArticle ? setEditingArticle({ ...editingArticle, content: e.target.value }) : setNewArticle({ ...newArticle, content: e.target.value })}
                  className="w-full p-2 rounded bg-yellow-50 border border-gray-600 text-black placeholder-gray-400 h-32 resize-y"
                  required
                ></textarea>
                <input
                  type="text"
                  placeholder="Penulis (Default: Admin)"
                  value={editingArticle ? editingArticle.author : (newArticle.author || user?.email || 'Admin')}
                  onChange={(e) => editingArticle ? setEditingArticle({ ...editingArticle, author: e.target.value }) : setNewArticle({ ...newArticle, author: e.target.value })}
                  className="w-full p-2 rounded bg-yellow-50 border border-gray-600 text-black placeholder-gray-400"
                />
                <input
                  type="date"
                  placeholder="Tanggal (YYYY-MM-DD)"
                  value={editingArticle ? editingArticle.date : (newArticle.date || new Date().toISOString().split('T')[0])}
                  onChange={(e) => editingArticle ? setEditingArticle({ ...editingArticle, date: e.target.value }) : setNewArticle({ ...newArticle, date: e.target.value })}
                  className="w-full p-2 rounded bg-yellow-50 border border-gray-600 text-black placeholder-gray-400"
                />
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-yellow-50 hover:bg-orange-500 text-black font-semibold py-2 px-4 rounded-full flex-grow transition-colors"
                  >
                    {editingArticle ? 'Update Artikel' : 'Tambah Artikel'}
                  </button>
                  {editingArticle && (
                    <button
                      type="button"
                      onClick={() => setEditingArticle(null)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full"
                    >
                      Batal
                    </button>
                  )}
                </div>
              </form>
            </div>

            <h2 className="text-4xl font-bold mb-4 text-black">Daftar Artikel Anda</h2>
            {articles.length === 0 ? (
              <p className="text-black">Tidak ada artikel.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <div key={article.id} className="bg-[#2d2926] p-4 rounded-lg shadow-md flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">{article.title}</h3>
                      <p className="text-white text-sm mt-1 line-clamp-3">{article.content}</p>
                      <p className="text-white text-xs mt-2">Oleh: {article.author} pada {article.date}</p>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => startEditArticle(article)}
                        className="bg-yellow-50 hover:bg-yellow-100 text-black text-sm py-1 px-3 rounded-full"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteArticle(article.id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded-full"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Konten Pesan Masuk */}
        {activeTab === 'messages' && (
  <div>
    <h2 className="text-4xl font-bold mb-4 text-black">Pesan Masuk</h2>
    {loadingMessages ? (
      <p className="text-black">Memuat pesan...</p>
    ) : messages.length === 0 ? (
      <p className="text-black">Tidak ada pesan masuk.</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {messages.map((message) => (
          <div key={message.id} className="bg-[#2d2926] p-4 rounded-lg shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Dari: {message.name}</h3>
              <p className="text-white text-sm mb-2">Email: {message.email}</p>
              <p className="text-white text-base">{message.message}</p>
              <p className="text-white text-xs mt-2">
                Dikirim: {
                  message.timestamp
                    ? typeof message.timestamp === 'object' && message.timestamp.seconds
                      ? new Date(message.timestamp.seconds * 1000).toLocaleString('id-ID')
                      : typeof message.timestamp === 'string'
                        ? message.timestamp
                        : '-'
                    : '-'
                }
              </p>
            </div>
            <div className="mt-4">
              <button
                onClick={() => deleteMessage(message.id)}
                className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded-full"
              >
                Hapus Pesan
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)}
      </div>
    </main>
  );
}
