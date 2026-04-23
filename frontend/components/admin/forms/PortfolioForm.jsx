"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PortfolioForm({ mode, onSubmit, initialData }) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    technologies: "",
    liveUrl: "",
  });
  const [file, setFile] = useState(null) // 🔥 NEW

  useEffect(() => {
    const fetchInitialData = async () => {
      if (mode === "edit" && initialData) {
        setForm({
          title: initialData.title || "",
          description: initialData.description || "",
          technologies: initialData.technologies?.join(", ") || "",
          liveUrl: initialData.liveUrl || "",
        });
      }
    };
    fetchInitialData();
  }, [initialData, mode]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = e => {
    setFile(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('technologies', form.technologies);
    formData.append('liveUrl', form.liveUrl);
    if (file) {
      formData.append('image', file);
    }
    onSubmit(formData);

    router.push("/admin/portfolio");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-4 max-w-xl"
    >
      <h2 className="text-xl font-bold">
        {mode === "edit" ? "Edit Project" : "Create Project"}
      </h2>

      {/* Title */}
      <input
        type="text"
        name="title"
        placeholder="Project Title"
        required
        value={form.title}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-md"
      />

      {/* Description */}
      <textarea
        name="description"
        placeholder="Description"
        rows="4"
        value={form.description}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-md"
      ></textarea>

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

      {/* Technologies */}
      <input
        type="text"
        name="technologies"
        placeholder="Technologies (comma separated)"
        value={form.technologies}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-md"
      />

      {/* Live URL */}
      <input
        type="text"
        name="liveUrl"
        placeholder="Live URL"
        value={form.liveUrl}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-md"
      />

      {/* Submit */}
      <button
        type="submit"
        className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-md"
      >
        {mode === "edit" ? "Update Project" : "Create Project"}
      </button>
    </form>
  );
}