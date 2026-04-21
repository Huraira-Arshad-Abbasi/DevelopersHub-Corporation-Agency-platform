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

  useEffect(() => {
    const fetchInitialData = async () => {
      if (mode === "edit" && initialData) {
        setForm({
          ...initialData,
          technologies: initialData.technologies.join(", "),
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);

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

      {/* Image URL */}
      <input
        type="text"
        name="imageUrl"
        placeholder="Image URL"
        value={form.imageUrl}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-md"
      />

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