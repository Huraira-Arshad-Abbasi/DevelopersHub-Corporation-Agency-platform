"use client";

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Menu } from "lucide-react";

export default function Topbar () {
  const [admin, setAdmin] = useState(null)

  useEffect(() => {
    const fetchAdmin = async () =>{
      // fetch admin from local storage
      const data = localStorage.getItem("admin");
      if (data) {
      try {
        const parsedData = JSON.parse(data);
        setAdmin(parsedData);
      } catch (error) {
        console.error("Error parsing admin data:", error);
      }
    }
    }

    fetchAdmin()
  }, []);

  const router = useRouter()
  const pathname = usePathname()

  // Generate title from route
  const getTitle = () => {
    const parts = pathname.split('/').filter(Boolean)
    const last = parts[parts.length - 1]

    if (!last) return 'Dashboard'

    return last.charAt(0).toUpperCase() + last.slice(1)
  }



  // handle logout
  const handleLogout = () => {
    // remove token and redirect to login
    localStorage.removeItem('token')
    localStorage.removeItem("admin");
    window.location.href = '/admin/login'
  }

  return (
    <div className='flex items-center justify-between bg-white px-6 py-4 shadow-sm border-b'>
      {/* <div className="bg-white px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <Menu />
        </button>
      </div>  
    </div> */}
      {/* Left Side */}
      <div className='flex items-center gap-4'>
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className='text-sm bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300'
        >
          ← back
        </button>
      </div>
      {/* Title */}
      <h1 className='text-xl flex items-center gap-4 font-semibold'>
        {getTitle()}
      </h1>

      {/* Right Side */}
      <div className='flex items-center gap-4'>
        {/* Admin Name */}
        <span className='text-sm text-gray-600'>
          {admin?.name || "Admin"}
        </span>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className='bg-red-500 cursor-pointer text-white px-3 py-1 rounded-md text-sm hover:bg-red-600'
        >
          Logout
        </button>
      </div>
    </div>
  )
}
