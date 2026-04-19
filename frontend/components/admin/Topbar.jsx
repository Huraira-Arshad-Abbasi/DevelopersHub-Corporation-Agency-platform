'use client'

import { useRouter, usePathname } from 'next/navigation'

export default function Topbar () {
  const router = useRouter()
  const pathname = usePathname()

  // Generate title from route
  const getTitle = () => {
    const parts = pathname.split('/').filter(Boolean)
    const last = parts[parts.length - 1]

    if (!last) return 'Dashboard'

    return last.charAt(0).toUpperCase() + last.slice(1)
  }

  return (
    <div className='flex items-center justify-between bg-white px-6 py-4 shadow-sm border-b'>
      {/* Left Side */}
      <div className='flex items-center gap-4'>
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className='text-sm bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300'
        >
          ← go back
        </button>
      </div>
      {/* Title */}
      <h1 className='text-xl flex items-center gap-4 font-semibold'>
        {getTitle()}
      </h1>

      {/* Right Side */}
      <div className='flex items-center gap-4'>
        {/* Admin Name */}
        <span className='text-sm text-gray-600'>Admin</span>

        {/* Logout Button */}
        <button
          onClick={() => router.push('/admin/login')}
          className='bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600'
        >
          Logout
        </button>
      </div>
    </div>
  )
}
