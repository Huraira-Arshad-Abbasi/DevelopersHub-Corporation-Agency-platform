"use client";

import { useState, useEffect } from "react";
import { getBlogs, deleteBlog } from "@/lib/api";
import { Trash2, SquarePen, CirclePlusIcon } from "lucide-react";

import Link from "next/link";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await getBlogs();
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    await deleteBlog(id);
    setBlogs(blogs.filter((blog) => blog._id !== id));
  };


  if (loading) return <p>Loading blogs...</p>;
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog</h1>

        <Link
          href="/admin/blog/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          <CirclePlusIcon size={20} className="inline" /> Add Blog
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Tags</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="border-t">
                <td className="p-3">{blog.title}</td>
                <td className="p-3 text-gray-500">{blog.tags}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      blog.status === "published"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {blog.status}
                  </span>
                </td>

                <td className="p-3 flex gap-3">
                  <Link
                    href={`/admin/blog/edit/${blog._id}`}
                    className="text-blue-600 cursor-pointer hover:underline"
                  >
                    <SquarePen size={20} />
                    {/* Edit */}
                  </Link>

                  <button
                    onClick={() => handleDelete(blog._id)}
                   className="text-red-600 cursor-pointer hover:underline">
                    <Trash2 size={20} />
                    {/* Delete */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}