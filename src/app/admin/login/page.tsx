// src/app/admin/login/page.tsx
'use client'; // This is a Client Component because it uses client-side interactions (useState, useRouter)

import React, { useState } from 'react';
import { auth } from '@/lib/firebase'; // Import auth object from Firebase configuration
import { signInWithEmailAndPassword } from 'firebase/auth'; // Firebase function for email/password login
import { useRouter } from 'next/navigation'; // Next.js hook for client-side navigation

export default function AdminLoginPage() {
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [error, setError] = useState(''); // State for displaying login errors
  const [loading, setLoading] = useState(false); // State for loading indicator during login
  const router = useRouter(); // Initialize Next.js router for navigation

  // Handles the login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission (page reload)
    setError(''); // Clear any previous errors
    setLoading(true); // Show loading indicator

    try {
      // Attempt to sign in user with email and password using Firebase Auth
      await signInWithEmailAndPassword(auth, email, password);
      // If login is successful, redirect the user to the admin dashboard
      router.push('/admin/dashboard'); 
    } catch (err: any) {
      // Catch and display any errors during login (e.g., wrong password, user not found)
      console.error("Login failed:", err);
      setError(err.message || "Login gagal. Periksa email/password Anda.");
    } finally {
      // Hide loading indicator regardless of success or failure
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-16 bg-yellow-50 text-white flex items-center justify-center">
      <div className="bg-[#2d2926] p-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-6 text-white">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 focus:border-blue-500"
              required // Make email field required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-300 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 focus:border-blue-500"
              required // Make password field required
            />
          </div>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="bg-yellow-50 hover:bg-orange-500 text-black hover:text-black font-semibold py-2 px-4 rounded-full w-full transition-colors"
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Login'}
          </button>
        </form>
      </div>
    </main>
  );
}