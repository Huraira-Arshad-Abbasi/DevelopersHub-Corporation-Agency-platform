'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginAdmin } from '@/lib/api'

export default function Page () {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      setLoading(true)

      // call login API
      const res = await loginAdmin(form)
      // save token
      localStorage.setItem('token', res.data.token)
      // store admin info
      // store admin info
      localStorage.setItem(
        'admin',
        JSON.stringify({
          _id: res.data._id,
          name: res.data.name,
          email: res.data.email
        })
      )

      alert('Login successful!')

      // redirect after login
      router.push('/admin/dashboard')
    } catch (error) {
      console.error(error)
      alert(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center  justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold text-center mb-6'>Admin Login</h2>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type='email'
            name='email'
            placeholder='Email'
            required
            onChange={handleChange}
            className='w-full border px-4 py-2 rounded-md'
          />

          <input
            type='password'
            name='password'
            placeholder='Password'
            required
            onChange={handleChange}
            className='w-full border px-4 py-2 rounded-md'
          />

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-blue-600 disabled:bg-blue-200 text-white py-2 rounded-md hover:bg-blue-700'
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}
