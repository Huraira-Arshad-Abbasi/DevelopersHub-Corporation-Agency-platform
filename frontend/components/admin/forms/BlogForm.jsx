"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BlogForm({ mode , initialData, onSubmit }) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    content: "",
    slug: "",
    author: "Admin",
    tags: "",
    imageUrl: "",
    status: "draft",
  });

  // auto-generate slug from title
  const generateSlug = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  useEffect(() => {
    const fetchInitialData = async () => {
      if (mode === "edit" && initialData) {
        setForm(initialData);
      }
    };
    fetchInitialData();
  }, [initialData, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedForm = {
      ...form,
      [name]: value,
    };
    // auto-update slug when title changes
    if (name === "title") {
      updatedForm.slug = generateSlug(value);
    }
    setForm(updatedForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);

    router.push("/admin/blog");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-4 max-w-xl"
    >
      <h2 className="text-xl font-bold">
        {mode === "edit" ? "Edit Blog" : "Create Blog"}
      </h2>

      {/* Title */}
      <input
        type="text"
        name="title"
        placeholder="Title"
        required
        value={form.title}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-md"
      />

      {/* Slug */}
      <input
        type="text"
        name="slug"
        placeholder="Slug"
        value={form.slug}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-md"
      />

      {/* Content */}
      <textarea
        name="content"
        placeholder="Content"
        required
        rows="5"
        value={form.content}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-md"
      ></textarea>

      {/* Tags */}
      <input
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-md"
      />

      {/* Image */}
      <input
        type="text"
        name="imageUrl"
        placeholder="Image URL"
        value={form.imageUrl}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-md"
      />

      {/* Status */}
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-md"
      >
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>

      {/* Submit */}
      <button
        type="submit"
        className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-md"
      >
        {mode === "edit" ? "Update Blog" : "Create Blog"}
      </button>
    </form>
  );
}