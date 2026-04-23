'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function BlogForm ({ mode, initialData, onSubmit }) {
  const router = useRouter()

  const [form, setForm] = useState({
    title: '',
    content: '',
    slug: '',
    author: 'Admin',
    tags: '',
    status: 'draft'
  })

  const [file, setFile] = useState(null) // 🔥 NEW

  // auto-generate slug
  const generateSlug = title =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      const fromUpdate = () => {
        setForm({
          title: initialData.title || '',
          content: initialData.content || '',
          slug: initialData.slug || '',
          author: initialData.author || 'Admin',
          tags: initialData.tags?.join(', ') || '',
          status: initialData.status || 'draft'
        })
      }
      fromUpdate()
    }
  }, [initialData, mode])

  const handleChange = e => {
    const { name, value } = e.target

    let updatedForm = {
      ...form,
      [name]: value
    }

    if (name === 'title') {
      updatedForm.slug = generateSlug(value)
    }

    setForm(updatedForm)
  }

  // 🔥 FILE HANDLER
  const handleFileChange = e => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('title', form.title)
    formData.append('content', form.content)
    formData.append('slug', form.slug)
    formData.append('author', form.author)
    formData.append('tags', form.tags)
    formData.append('status', form.status)

    // 🔥 Important
    if (file) {
      formData.append('image', file)
    }

    await onSubmit(formData) // 🔥 send FormData

    router.push('/admin/blog')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white p-6 rounded-xl shadow-md space-y-4 max-w-xl'
    >
      <h2 className='text-xl font-bold'>
        {mode === 'edit' ? 'Edit Blog' : 'Create Blog'}
      </h2>

      {/* Title */}
      <input
        type='text'
        name='title'
        placeholder='Title'
        required
        value={form.title}
        onChange={handleChange}
        className='w-full border px-4 py-2 rounded-md'
      />

      {/* Slug */}
      <input
        type='text'
        name='slug'
        placeholder='Slug'
        value={form.slug}
        onChange={handleChange}
        className='w-full border px-4 py-2 rounded-md'
      />

      {/* Content */}
      <textarea
        name='content'
        placeholder='Content'
        required
        rows='5'
        value={form.content}
        onChange={handleChange}
        className='w-full border px-4 py-2 rounded-md'
      ></textarea>

      {/* Tags */}
      <input
        type='text'
        name='tags'
        placeholder='Tags (comma separated)'
        value={form.tags}
        onChange={handleChange}
        className='w-full border px-4 py-2 rounded-md'
      />

      {/* 🔥 Image Upload */}
      <div>
        <label className='block mb-2 font-medium'>Upload Image</label>

        <div className='flex items-center gap-3'>
          {/* Hidden Input */}
          <input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            id='fileUpload'
            className='hidden'
          />

          {/* Custom Button */}
          <label
            htmlFor='fileUpload'
            className='cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition'
          >
            Choose Image
          </label>

          {/* File Name */}
          {file && (
            <span className='text-sm text-gray-600 truncate max-w-xs'>
              {file.name}
            </span>
          )}
        </div>
      </div>

      {/* Status */}
      <select
        name='status'
        value={form.status}
        onChange={handleChange}
        className='w-full border px-4 py-2 rounded-md'
      >
        <option value='draft'>Draft</option>
        <option value='published'>Published</option>
      </select>

      {/* Submit */}
      <button
        type='submit'
        className='bg-blue-600 cursor-pointer hover:underline text-white px-4 py-2 rounded-md'
      >
        {mode === 'edit' ? 'Update Blog' : 'Create Blog'}
      </button>
    </form>
  )
}
