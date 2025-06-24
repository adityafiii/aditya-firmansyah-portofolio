// src/app/admin/dashboard/page.tsx
'use client'; // This is a Client Component because it uses client-side interactions (useState, useEffect)

import React, { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase'; // Import auth and db objects from Firebase configuration
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Firebase functions for auth state and logout
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'; // Firestore functions for CRUD
import { useRouter } from 'next/navigation'; // Next.js hook for client-side navigation

export default function AdminDashboardPage() {
  const [user, setUser] = useState<any>(null); // State to store the currently logged-in user
  const [loading, setLoading] = useState(true); // State for initial loading (auth check, data fetch)
  const [projects, setProjects] = useState<any[]>([]); // State to store portfolio projects from Firestore
  const [newProject, setNewProject] = useState({ title: '', description: '', imageUrl: '', technologies: '' }); // State for new project form
  const [editingProject, setEditingProject] = useState<any>(null); // State for the project being edited (null if not editing)
  const router = useRouter(); // Initialize Next.js router

  // Effect to listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        // If no user is logged in, redirect to the admin login page
        router.push('/admin/login');
      } else {
        setUser(currentUser); // Set the logged-in user
        fetchProjects(); // Fetch projects data once user is authenticated
      }
      setLoading(false); // End initial loading
    });
    return () => unsubscribe(); // Clean up the auth state listener when component unmounts
  }, [router]); // Re-run effect if router object changes (though it usually won't)

  // Function to fetch project data from Firestore
  const fetchProjects = async () => {
    setLoading(true);
    try {
      // Get all documents from the "projects" collection
      // IMPORTANT: Adjust the collection path "projects" if you use a different name
      const querySnapshot = await getDocs(collection(db, "projects")); 
      const projectsData = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() })); // Map documents to array of objects
      setProjects(projectsData); // Update projects state
    } catch (error) {
      console.error("Error fetching projects: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Handler to add a new project
  const addProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Add a new document to the "projects" collection
      const docRef = await addDoc(collection(db, "projects"), {
        ...newProject,
        // Convert technologies string (comma-separated) to an array
        technologies: newProject.technologies.split(',').map(tech => tech.trim()),
      });
      console.log("Project added with ID: ", docRef.id);
      setNewProject({ title: '', description: '', imageUrl: '', technologies: '' }); // Reset form fields
      fetchProjects(); // Refresh the project list
    } catch (error) {
      console.error("Error adding project: ", error);
    }
  };

  // Handler to start editing an existing project
  const startEdit = (project: any) => {
    // Set the editingProject state with the selected project's data
    // Convert technologies array back to a comma-separated string for the form field
    setEditingProject({ ...project, technologies: project.technologies.join(',') });
  };

  // Handler to update an existing project
  const updateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.id) return; // Ensure there's a project ID to update
    try {
      // Get a reference to the specific project document
      const projectRef = doc(db, "projects", editingProject.id);
      // Update the document with new data
      await updateDoc(projectRef, {
        title: editingProject.title,
        description: editingProject.description,
        imageUrl: editingProject.imageUrl,
        technologies: editingProject.technologies.split(',').map((tech: string) => tech.trim()),
      });
      console.log("Project updated!");
      setEditingProject(null); // Exit editing mode
      fetchProjects(); // Refresh the project list
    } catch (error) {
      console.error("Error updating project: ", error);
    }
  };

  // Handler to delete a project
  const deleteProject = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus proyek ini?")) { // Confirmation dialog
      try {
        // Delete the specific project document
        await deleteDoc(doc(db, "projects", id));
        console.log("Project deleted!");
        fetchProjects(); // Refresh the project list
      } catch (error) {
        console.error("Error deleting project: ", error);
      }
    }
  };

  // Handler for user logout
  const handleLogout = async () => {
    await signOut(auth); // Sign out the current user
    router.push('/admin/login'); // Redirect to login page
  };

  // Display loading state while authentication status and data are being fetched
  if (loading) {
    return <main className="min-h-screen pt-16 bg-gray-900 text-white flex items-center justify-center">Loading Admin Dashboard...</main>;
  }

  // Main dashboard UI
  return (
    <main className="min-h-screen pt-16 bg-gray-900 text-white p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-blue-400 mb-8">Admin Dashboard</h1>
        {/* Display logged-in user's email */}
        <p className="text-gray-300 mb-4">Selamat datang, {user?.email}!</p>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full mb-8 transition-colors"
        >
          Logout
        </button>

        {/* Form to Add/Edit Projects */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl mb-8">
          <h2 className="text-2xl font-bold mb-4 text-white">
            {editingProject ? 'Edit Proyek' : 'Tambah Proyek Baru'}
          </h2>
          <form onSubmit={editingProject ? updateProject : addProject} className="space-y-4">
            <input
              type="text"
              placeholder="Judul Proyek"
              value={editingProject ? editingProject.title : newProject.title}
              onChange={(e) => editingProject ? setEditingProject({ ...editingProject, title: e.target.value }) : setNewProject({ ...newProject, title: e.target.value })}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
              required
            />
            <textarea
              placeholder="Deskripsi Proyek"
              value={editingProject ? editingProject.description : newProject.description}
              onChange={(e) => editingProject ? setEditingProject({ ...editingProject, description: e.target.value }) : setNewProject({ ...newProject, description: e.target.value })}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400 h-24 resize-y"
              required
            ></textarea>
            <input
              type="text"
              placeholder="URL Gambar (misal: /images/project1.png)"
              value={editingProject ? editingProject.imageUrl : newProject.imageUrl}
              onChange={(e) => editingProject ? setEditingProject({ ...editingProject, imageUrl: e.target.value }) : setNewProject({ ...newProject, imageUrl: e.target.value })}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
              required
            />
            <input
              type="text"
              placeholder="Teknologi (dipisahkan koma, misal: React, Next.js, Tailwind CSS)"
              value={editingProject ? editingProject.technologies : newProject.technologies}
              onChange={(e) => editingProject ? setEditingProject({ ...editingProject, technologies: e.target.value }) : setNewProject({ ...newProject, technologies: e.target.value })}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
            />
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full flex-grow transition-colors"
              >
                {editingProject ? 'Update Proyek' : 'Tambah Proyek'}
              </button>
              {editingProject && (
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-full transition-colors"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List of Projects */}
        <h2 className="text-2xl font-bold mb-4 text-white">Daftar Proyek Anda</h2>
        {projects.length === 0 ? (
          <p className="text-gray-400">Tidak ada proyek.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <p className="text-gray-300 text-sm mt-1">{project.description}</p>
                  <p className="text-gray-400 text-xs mt-2">Tech: {project.technologies?.join(', ')}</p>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => startEdit(project)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded-full transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded-full transition-colors"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}