"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt?: any;
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    async function fetchMessages() {
      const snapshot = await getDocs(collection(db, "messages"));
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message)));
    }
    fetchMessages();
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Pesan Kontak</h1>
      <ul className="space-y-4">
        {messages.map(msg => (
          <li key={msg.id} className="p-4 bg-yellow-50 rounded shadow">
            <div className="font-semibold">{msg.name} ({msg.email})</div>
            <div className="text-gray-700">{msg.message}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}