"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";

export default function AdminLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/admin/login");
    } else {
      const setloadingFalse = () => setLoading(false);
      setloadingFalse();
    }
  }, [router]);

  if (loading) return <p className="p-4">Checking authentication...</p>;

  return (
    <div className="flex h-screen overflow-hidden">

      {/* 🔥 Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 🔥 Sidebar */}
      <div
        className={`
          fixed md:static z-50 h-full w-64 bg-white shadow-lg
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* 🔷 Right Section */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <Topbar />

        {/* Content */}
        <main className="p-4 md:p-6 bg-gray-100 flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* 🔥 Floating Button (Backup Navigation) */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed bottom-5 cursor-pointer right-5 md:hidden bg-blue-600 text-white p-1 px-2 rounded-md shadow-lg"
      >
        ☰
      </button>
    </div>
  );
}