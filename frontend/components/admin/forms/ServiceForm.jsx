"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ServiceForm({ onSubmit, mode, initialData }) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    icon: "",
    isActive: true,
  });


  useEffect(() => {
    const fetchInitialData = async () => {
      if (mode === "edit" && initialData) {
        setForm(initialData);
      }
    };

    fetchInitialData();
  }, [initialData, mode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // submit data
    onSubmit(form);

    router.push("/admin/services");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-4 max-w-xl"
    >
      <h2 className="text-xl font-bold">
        {mode === "edit" ? "Edit Service" : "Create Service"}
      </h2>

      {/* Title */}
      <input
        type="text"
        name="title"
        placeholder="Service Title"
        required
        value={form.title}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-md"
      />

      {/* Description */}
      <textarea
        name="description"
        placeholder="Description"
        required
        rows="4"
        value={form.description}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-md"
      ></textarea>

      {/* Icon */}
      <input
        type="text"
        name="icon"
        placeholder="Icon (e.g. code, design)"
        value={form.icon}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-md"
      />

      {/* Active */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isActive"
          checked={form.isActive}
          onChange={handleChange}
        />
        Active
      </label>

      {/* Submit */}
      <button
        type="submit"
        className="bg-blue-600 text-white cursor-pointer hover:underline px-4 py-2 rounded-md"
      >
        {mode === "edit" ? "Update Service" : "Create Service"}
      </button>
    </form>
  );
}